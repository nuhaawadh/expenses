import { formatAmount } from "@/lib/format";
import type { Plan } from "@/lib/types";

/**
 * لا يظهر إلا حين يكون فيه ما يستحق الانتباه: تجربة توشك تنتهي،
 * أو تجربة منتهية، أو سقف فواتير قارب. غير ذلك يبقى الدفتر نظيفاً.
 */
export function PlanBanner({ plan }: { plan: Plan | null }) {
  if (!plan || plan.status === "active") return null;

  const receiptsLeft = plan.receipts_cap - plan.receipts_used;
  const receiptsLow = receiptsLeft <= 30 && receiptsLeft > 0;
  const receiptsOut = receiptsLeft <= 0;

  // ننبّه قبل الوصول للحد اليومي لا بعده — الرفض المفاجئ تجربة سيئة
  const textsLeft = plan.texts_cap - plan.texts_today;
  const textsLow = textsLeft <= 10 && textsLeft > 0;
  const textsOut = textsLeft <= 0;

  const expired = plan.status === "expired";
  const endingSoon =
    plan.status === "trial" && plan.days_left !== null && plan.days_left <= 7;

  if (!expired && !endingSoon && !receiptsLow && !receiptsOut && !textsLow && !textsOut) {
    return null;
  }

  const urgent = expired || receiptsOut || textsOut;

  return (
    <div
      role="status"
      className={`mb-5 rounded-xl border px-4 py-3 text-[13.5px] leading-relaxed ${
        urgent
          ? "border-expense/40 bg-accent-soft text-ink"
          : "border-line bg-surface text-muted"
      }`}
    >
      {expired ? (
        <p>
          <span className="font-medium text-ink">انتهت فترة التجربة.</span>{" "}
          دفترك محفوظ وتقدر تقرأه وتعدّله، لكن التسجيل متوقف. للاستمرار{" "}
          <a href="mailto:highlink.sa@gmail.com" className="text-accent underline">
            تواصل معنا
          </a>
          .
        </p>
      ) : endingSoon ? (
        <p>
          باقي{" "}
          <span className="tnum font-medium text-ink">{plan.days_left}</span>{" "}
          {plan.days_left === 1 ? "يوم" : plan.days_left === 2 ? "يومان" : "أيام"} من
          التجربة المجانية.
        </p>
      ) : null}

      {receiptsOut ? (
        <p className={expired ? "mt-1.5" : undefined}>
          <span className="font-medium text-ink">وصلت حد الفواتير</span> (
          <span className="tnum">{formatAmount(plan.receipts_cap)}</span>). التسجيل
          بالكتابة ما زال متاحاً.
        </p>
      ) : receiptsLow ? (
        <p className={endingSoon ? "mt-1.5" : undefined}>
          باقي <span className="tnum font-medium text-ink">{receiptsLeft}</span> فاتورة
          من أصل <span className="tnum">{formatAmount(plan.receipts_cap)}</span>.
        </p>
      ) : null}

      {textsOut ? (
        <p className="mt-1.5">
          <span className="font-medium text-ink">وصلت حد اليوم</span> (
          <span className="tnum">{plan.texts_cap}</span> حركة). يتجدد عند منتصف الليل —
          والتعديل والقراءة ما زالا متاحين.
        </p>
      ) : textsLow ? (
        <p className="mt-1.5">
          باقي <span className="tnum font-medium text-ink">{textsLeft}</span> من حركات
          اليوم. يتجدد العداد عند منتصف الليل.
        </p>
      ) : null}
    </div>
  );
}
