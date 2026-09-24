import { formatAmount, formatMonthLabel } from "@/lib/format";
import type { Totals } from "@/lib/types";

function Change({ value, invert = false }: { value: number | null; invert?: boolean }) {
  if (value === null || value === 0) return null;

  const up = value > 0;
  // ارتفاع الصرف سيّئ، وارتفاع الدخل جيّد
  const good = invert ? !up : up;

  return (
    <span
      dir="ltr"
      className={`tnum text-[12px] ${good ? "text-income" : "text-expense"}`}
    >
      {up ? "▲" : "▼"} {formatAmount(Math.abs(value))}%
    </span>
  );
}

function Tile({
  label,
  value,
  tone = "ink",
  foot,
}: {
  label: string;
  value: number;
  tone?: "ink" | "income" | "expense";
  foot?: React.ReactNode;
}) {
  const toneClass =
    tone === "income" ? "text-income" : tone === "expense" ? "text-expense" : "text-ink";

  return (
    <div className="rounded-xl border border-line bg-surface px-3.5 py-3">
      <p className="text-[12.5px] text-muted">{label}</p>
      <p className={`tnum mt-1 text-xl font-semibold tracking-tight ${toneClass}`}>
        {formatAmount(value)}
        <span className="ms-1 text-[12px] font-normal text-faint">ر.س</span>
      </p>
      {foot ? <p className="mt-0.5">{foot}</p> : null}
    </div>
  );
}

export function Summary({ totals, month }: { totals: Totals; month: string }) {
  const top = totals.by_category.slice(0, 5);
  const largest = top[0]?.amount ?? 0;
  const negative = totals.balance < 0;

  return (
    <section aria-label="الملخّص" className="space-y-3">
      <div className="rounded-xl border border-line bg-surface px-4 py-4">
        <p className="text-[12.5px] text-muted">الرصيد الجاري</p>
        <p
          className={`tnum mt-1 text-3xl font-semibold tracking-tight ${negative ? "text-expense" : "text-ink"}`}
        >
          {formatAmount(totals.balance)}
          <span className="ms-1.5 text-[14px] font-normal text-faint">ر.س</span>
        </p>
        <p className="mt-1 text-[12px] text-faint">
          {negative
            ? "الصرف تجاوز الدخل منذ بداية التسجيل"
            : `كل الدخل ناقص كل الصرف حتى نهاية ${formatMonthLabel(month)}`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile
          label="صرف الشهر"
          value={totals.month}
          foot={<Change value={totals.change.expense} invert />}
        />
        <Tile
          label="دخل الشهر"
          value={totals.income_month}
          tone="income"
          foot={<Change value={totals.change.income} />}
        />
        <Tile
          label="صافي الشهر"
          value={totals.net_month}
          tone={totals.net_month < 0 ? "expense" : "income"}
        />
        <Tile
          label="ضريبة مدفوعة"
          value={totals.vat_month}
          foot={
            totals.vat_month === 0 ? (
              <span className="text-[12px] text-faint">من الفواتير</span>
            ) : null
          }
        />
      </div>

      {top.length > 0 ? (
        <div className="rounded-xl border border-line bg-surface px-4 py-4">
          <h2 className="text-[12.5px] text-muted">أعلى التصنيفات</h2>
          <ul className="mt-3 space-y-2.5">
            {top.map((row) => (
              <li key={row.category} className="flex items-center gap-3">
                <span className="w-[72px] shrink-0 truncate text-[13px] text-ink">
                  {row.category}
                </span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line-soft">
                  <span
                    className="block h-full rounded-full bg-accent"
                    style={{
                      width: `${largest > 0 ? Math.max(4, (row.amount / largest) * 100) : 0}%`,
                    }}
                  />
                </span>
                <span className="tnum w-20 shrink-0 text-end text-[13px] text-muted">
                  {formatAmount(row.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
