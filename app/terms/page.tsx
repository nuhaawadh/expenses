import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "شروط الاستخدام — الدفتر",
  description: "ما الذي يقدّمه الدفتر، وما الذي لا يقدّمه.",
};

const LAST_UPDATED = "٢٦ سبتمبر ٢٠٢٦";

export default function TermsPage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-2xl px-5 pb-20 pt-10 sm:px-6">
      <a href="/" className="text-[13px] text-muted">
        ← الدفتر
      </a>

      <h1 className="mt-5 text-2xl font-semibold tracking-tight">شروط الاستخدام</h1>
      <p className="mt-1 text-[13px] text-faint">آخر تحديث: {LAST_UPDATED}</p>

      <div className="mt-8 space-y-7 text-[15px] leading-[1.9] text-ink">
        <section>
          <h2 className="mb-2 text-[17px] font-semibold">ما هو الدفتر</h2>
          <p className="text-muted">
            أداة لتسجيل المصروفات والدخل بجملة عربية أو بصورة فاتورة، وعرض
            إجمالياتك. تُقدَّم من <span className="text-ink">Highlink</span>.
          </p>
        </section>

        <section className="rounded-xl border border-line bg-surface p-4">
          <h2 className="mb-2 text-[17px] font-semibold">ما هو ليس الدفتر</h2>
          <ul className="list-disc space-y-1.5 ps-5 text-muted">
            <li>ليس نظاماً محاسبياً معتمداً ولا بديلاً عن محاسب.</li>
            <li>
              لا يُصدر فواتير ضريبية ولا يتوافق مع متطلبات الفوترة الإلكترونية
              لدى هيئة الزكاة والضريبة والجمارك. هو <span className="text-ink">يقرأ</span>{" "}
              الفواتير ولا يُصدرها.
            </li>
            <li>لا يقدّم استشارات مالية أو ضريبية أو استثمارية.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-[17px] font-semibold">دقة الاستخراج</h2>
          <p className="text-muted">
            يستخدم الدفتر نماذج ذكاء اصطناعي لقراءة جملتك أو فاتورتك، وهي{" "}
            <span className="text-ink">قد تخطئ</span> — خصوصاً في أسماء الجهات
            والصور غير الواضحة. المبالغ والتصنيفات المستخرجة اقتراح يحتاج
            مراجعتك، ولذلك كل حركة قابلة للتعديل.
          </p>
          <p className="mt-2 text-muted">
            أنت مسؤول عن صحة ما يُسجَّل في دفترك وعن أي قرار تبنيه عليه.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[17px] font-semibold">حسابك</h2>
          <p className="text-muted">
            الدخول عبر حساب Google، وأنت مسؤول عن حماية وصولك إليه. الحساب
            لشخص واحد، ولا يجوز مشاركته.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[17px] font-semibold">الاستخدام المقبول</h2>
          <p className="text-muted">
            يُمنع رفع محتوى مخالف للنظام أو لا تملك حقه، ومحاولة الوصول إلى
            بيانات مستخدمين آخرين، وإرسال طلبات آلية مكثّفة. قد نوقف أي حساب
            يخالف ذلك.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[17px] font-semibold">الاشتراك</h2>
          <p className="text-muted">
            الخدمة في مرحلة تجريبية وتُقدَّم مجاناً حالياً. عند تفعيل الاشتراك
            المدفوع ستُحدَّث هذه الشروط بتفاصيل السعر والتجديد والاسترداد، وسيُخطَر
            المشتركون قبل السريان.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[17px] font-semibold">التوفّر والمسؤولية</h2>
          <p className="text-muted">
            نبذل جهداً معقولاً لإبقاء الخدمة متاحة وبياناتك محفوظة، لكنها
            تُقدَّم كما هي بلا ضمان انقطاع أو فقدان. احتفظ بنسخك الخاصة مما
            يهمّك.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[17px] font-semibold">التواصل</h2>
          <p className="text-muted">
            <a href="mailto:highlink.sa@gmail.com" dir="ltr" className="text-accent underline">
              highlink.sa@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
