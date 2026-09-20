import { NextResponse } from "next/server";

/**
 * البوابة الخادمية. هذا هو المكان الوحيد الذي يعرف رابط n8n والسر المشترك.
 * المتصفح لا يرى أياً منهما — ولذلك لا يحملان بادئة NEXT_PUBLIC_.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TIMEOUT_MS = 9_000; // أقل من حد Vercel (10 ثوانٍ) حتى نرد برسالة مفهومة بدل قطع الاتصال

type Body = { action: "add"; text: string } | { action: "list" };

function fail(error: string, status = 200) {
  return NextResponse.json({ success: false, data: null, error }, { status });
}

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const secret = process.env.N8N_SHARED_SECRET;

  if (!webhookUrl || !secret) {
    console.error("[expenses] N8N_WEBHOOK_URL أو N8N_SHARED_SECRET غير مضبوط");
    return fail("التطبيق غير مكتمل الإعداد. راجع متغيّرات البيئة.", 500);
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return fail("الطلب غير صالح.", 400);
  }

  if (body?.action !== "add" && body?.action !== "list") {
    return fail("إجراء غير معروف.", 400);
  }

  if (body.action === "add") {
    const text = typeof body.text === "string" ? body.text.trim() : "";
    if (!text) return fail("اكتب الحركة أولاً.", 400);
    if (text.length > 500) return fail("النص طويل جداً. اختصره في جملة واحدة.", 400);
    body = { action: "add", text };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-app-secret": secret,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: "no-store",
    });

    if (upstream.status === 401 || upstream.status === 403) {
      console.error("[expenses] رفض n8n المصادقة — السر المشترك لا يطابق");
      return fail("تعذّر الاتصال بالخدمة. راجع إعدادات الاتصال.", 502);
    }

    const payload = await upstream.json().catch(() => null);

    // نمرّر شكل العقد كما هو. لا نعيد بناءه هنا حتى يبقى للعقد مصدر واحد.
    if (!payload || typeof payload.success !== "boolean") {
      console.error("[expenses] رد غير متوقع من n8n، الحالة:", upstream.status);
      return fail("جاء رد غير متوقع من الخدمة. حاول مرة أخرى.", 502);
    }

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    console.error("[expenses] فشل الاتصال بـ n8n:", error);
    return fail(
      aborted
        ? "الطلب استغرق وقتاً أطول من المتوقع. حاول مرة أخرى."
        : "تعذّر الوصول إلى الخدمة. تحقق من اتصالك ثم حاول مرة أخرى.",
      504,
    );
  } finally {
    clearTimeout(timer);
  }
}
