import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية — الدفتر",
  description: "ما الذي يجمعه الدفتر، وأين يُحفظ، ومن يطّلع عليه.",
};

const LAST_UPDATED = "٢٦ سبتمبر ٢٠٢٦";

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-2xl px-5 pb-20 pt-10 sm:px-6">
      <a href="/" className="text-[13px] text-muted">
        ← الدفتر
      </a>

      <h1 className="mt-5 text-2xl font-semibold tracking-tight">سياسة الخصوصية</h1>
      <p className="mt-1 text-[13px] text-faint">آخر تحديث: {LAST_UPDATED}</p>

      <div className="mt-8 space-y-7 text-[15px] leading-[1.9] text-ink">
        <section>
          <h2 className="mb-2 text-[17px] font-semibold">ما الذي نجمعه</h2>
          <ul className="list-disc space-y-1.5 ps-5 text-muted">
            <li>
              <span className="text-ink">من حساب Google:</span> اسمك، بريدك
              الإلكتروني، ومعرّفك الثابت لدى Google. لا نطّلع على كلمة مرورك ولا
              على بريدك ولا ملفاتك.
            </li>
            <li>
              <span className="text-ink">ما تسجّله بنفسك:</span> نص الحركة كما
              كتبته، والمبلغ والتاريخ والتصنيف والجهة.
            </li>
            <li>
              <span className="text-ink">صور الفواتير:</span> إن اخترت تصوير
              فاتورة، تُحفظ الصورة ويُربط رابطها بالحركة.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-[17px] font-semibold">كيف نستخدمها</h2>
          <p className="text-muted">
            لتشغيل الدفتر فقط: حفظ حركاتك، حساب إجمالياتك، وعرضها لك. لا نستخدم
            بياناتك المالية للإعلانات، ولا نبيعها، ولا نشاركها مع أي جهة لأغراض
            تسويقية.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[17px] font-semibold">من يطّلع عليها</h2>
          <p className="text-muted">
            لتحويل جملتك أو صورة فاتورتك إلى بيانات منظّمة، يُرسَل نص الحركة أو
            صورة الفاتورة إلى مزوّد نماذج الذكاء الاصطناعي{" "}
            <span className="text-ink">Anthropic</span> لمعالجتها وإرجاع النتيجة.
            لا يُرسَل اسمك ولا بريدك مع هذا الطلب.
          </p>
          <p className="mt-2 text-muted">
            وتسجيل الدخول يتم عبر <span className="text-ink">Google</span>، وفق
            سياسة خصوصيتها.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[17px] font-semibold">أين تُحفظ</h2>
          <p className="text-muted">
            على خوادم نديرها، وصور الفواتير في تخزين سحابي خاص بالخدمة. بياناتك
            معزولة عن بيانات أي مستخدم آخر ومرتبطة بمعرّف حسابك وحده.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[17px] font-semibold">الحذف</h2>
          <p className="text-muted">
            حذف الحركة في الدفتر هو <span className="text-ink">حذف منطقي</span>:
            تبقى في سجلّك معلّمة كمحذوفة مع سبب الحذف ووقته، ولا تدخل في أي
            إجمالي. هذا مقصود حتى يبقى الدفتر أميناً وقابلاً للمراجعة.
          </p>
          <p className="mt-2 text-muted">
            ولحذف حسابك وكل بياناتك نهائياً، راسلنا وسيُنفّذ الطلب خلال ثلاثين
            يوماً.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[17px] font-semibold">التواصل</h2>
          <p className="text-muted">
            لأي سؤال عن خصوصيتك:{" "}
            <a href="mailto:highlink.sa@gmail.com" dir="ltr" className="text-accent underline">
              highlink.sa@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
