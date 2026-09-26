import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

const MESSAGES: Record<string, string> = {
  config: "الإعداد غير مكتمل. راجع متغيّرات البيئة.",
  denied: "أُلغي تسجيل الدخول.",
  state: "انتهت صلاحية المحاولة. جرّب مرة أخرى.",
  exchange: "تعذّر إكمال تسجيل الدخول مع Google.",
  network: "تعذّر الوصول إلى Google. تحقّق من اتصالك.",
  unverified: "هذا البريد غير موثّق في Google.",
  bad_request: "طلب غير صالح.",
  claims: "رد غير متوقع من Google.",
  aud: "رد غير متوقع من Google.",
  iss: "رد غير متوقع من Google.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>;
}) {
  if (await getSession()) redirect("/");

  const { e } = await searchParams;
  const error = e ? (MESSAGES[e] ?? "تعذّر تسجيل الدخول. حاول مرة أخرى.") : null;

  return (
    <main className="flex min-h-dvh items-center justify-center px-5">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-semibold tracking-tight">الدفتر</h1>
        <p className="mx-auto mt-2 max-w-xs text-[14.5px] leading-relaxed text-muted">
          سجّل مصروفاتك بجملة عربية واحدة، أو صوّر الفاتورة — واعرف وين راحت فلوسك.
        </p>

        <a
          href="/api/auth/login"
          className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-xl bg-accent px-4 py-3 text-[15px] font-medium text-on-accent"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
            />
            <path
              fill="currentColor"
              d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
              opacity=".8"
            />
            <path
              fill="currentColor"
              d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z"
              opacity=".6"
            />
            <path
              fill="currentColor"
              d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
              opacity=".9"
            />
          </svg>
          المتابعة بحساب Google
        </a>

        {error ? (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-accent-soft px-3 py-2 text-[13.5px] text-accent"
          >
            {error}
          </p>
        ) : null}

        <p className="mt-8 text-[12.5px] leading-relaxed text-faint">
          بالمتابعة أنت توافق على{" "}
          <a href="/terms" className="underline">
            شروط الاستخدام
          </a>{" "}
          و{" "}
          <a href="/privacy" className="underline">
            سياسة الخصوصية
          </a>
          .
        </p>
      </div>
    </main>
  );
}
