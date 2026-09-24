import { NextResponse } from "next/server";

/**
 * البوابة الخادمية. هذا هو المكان الوحيد الذي يعرف رابط n8n والسر المشترك.
 * المتصفح لا يرى أياً منهما — ولذلك لا يحملان بادئة NEXT_PUBLIC_.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** قراءة الفاتورة تستغرق أطول من الحد الافتراضي؛ هذا يرفع سقف تنفيذ الدالة. */
export const maxDuration = 60;

/** الإجراءات السريعة ترد خلال ثوانٍ؛ الفاتورة تحتاج رؤية ورفعاً. */
const TIMEOUT_FAST_MS = 12_000;
const TIMEOUT_RECEIPT_MS = 50_000;

const ACTIONS = ["add", "add_receipt", "list", "update", "delete"] as const;
type Action = (typeof ACTIONS)[number];

function fail(error: string, status = 200) {
  return NextResponse.json({ success: false, data: null, error }, { status });
}

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** يبني الحمولة المرسلة إلى n8n، أو يعيد رسالة خطأ للمستخدم. */
function buildPayload(body: Record<string, unknown>): { payload: object } | { error: string } {
  const action = body.action as Action;

  if (action === "add") {
    const text = str(body.text, 500);
    if (!text) return { error: "اكتب الحركة أولاً." };
    return { payload: { action, text } };
  }

  if (action === "add_receipt") {
    const imageBase64 = typeof body.imageBase64 === "string" ? body.imageBase64 : "";
    if (!imageBase64) return { error: "ما وصلت أي صورة." };
    const mimeType = str(body.mimeType, 40) || "image/jpeg";
    return { payload: { action, imageBase64, mimeType } };
  }

  if (action === "list") {
    const month = str(body.month, 7);
    return { payload: /^\d{4}-\d{2}$/.test(month) ? { action, month } : { action } };
  }

  const id = Number(body.id);
  if (!Number.isInteger(id) || id <= 0) return { error: "رقم الحركة غير صالح." };

  if (action === "update") {
    const patch = (body.patch ?? {}) as Record<string, unknown>;
    if (Object.keys(patch).length === 0) return { error: "ما فيه أي تعديل مطلوب." };
    return { payload: { action, id, patch } };
  }

  // delete
  const reason = str(body.reason, 200);
  if (reason.length < 3) return { error: "اكتب سبب الحذف." };
  return { payload: { action, id, reason } };
}

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const secret = process.env.N8N_SHARED_SECRET;

  if (!webhookUrl || !secret) {
    console.error("[ledger] N8N_WEBHOOK_URL أو N8N_SHARED_SECRET غير مضبوط");
    return fail("التطبيق غير مكتمل الإعداد. راجع متغيّرات البيئة.", 500);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return fail("الطلب غير صالح.", 400);
  }

  if (!ACTIONS.includes(body?.action as Action)) {
    return fail("إجراء غير معروف.", 400);
  }

  const built = buildPayload(body);
  if ("error" in built) return fail(built.error, 400);

  const isReceipt = body.action === "add_receipt";
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(),
    isReceipt ? TIMEOUT_RECEIPT_MS : TIMEOUT_FAST_MS,
  );

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-app-secret": secret,
      },
      body: JSON.stringify(built.payload),
      signal: controller.signal,
      cache: "no-store",
    });

    if (upstream.status === 401 || upstream.status === 403) {
      console.error("[ledger] رفض n8n المصادقة — السر المشترك لا يطابق");
      return fail("تعذّر الاتصال بالخدمة. راجع إعدادات الاتصال.", 502);
    }

    const payload = await upstream.json().catch(() => null);

    // نمرّر شكل العقد كما هو حتى يبقى للعقد مصدر واحد.
    if (!payload || typeof payload.success !== "boolean") {
      console.error("[ledger] رد غير متوقع من n8n، الحالة:", upstream.status);
      return fail("جاء رد غير متوقع من الخدمة. حاول مرة أخرى.", 502);
    }

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    console.error("[ledger] فشل الاتصال بـ n8n:", error);
    return fail(
      aborted
        ? isReceipt
          ? "قراءة الفاتورة استغرقت وقتاً طويلاً. جرّب صورة أوضح، أو سجّلها بالكتابة."
          : "الطلب استغرق وقتاً أطول من المتوقع. حاول مرة أخرى."
        : "تعذّر الوصول إلى الخدمة. تحقق من اتصالك ثم حاول مرة أخرى.",
      504,
    );
  } finally {
    clearTimeout(timer);
  }
}
