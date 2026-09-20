import { formatAmount } from "@/lib/format";
import type { Totals } from "@/lib/types";

function Tile({
  label,
  value,
  tone = "ink",
  hint,
}: {
  label: string;
  value: string;
  tone?: "ink" | "income" | "expense";
  hint?: string;
}) {
  const toneClass =
    tone === "income"
      ? "text-income"
      : tone === "expense"
        ? "text-expense"
        : "text-ink";

  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-3.5">
      <p className="text-[13px] text-muted">{label}</p>
      <p className={`tnum mt-1.5 text-2xl font-semibold tracking-tight ${toneClass}`}>
        {value}
        <span className="ms-1 text-[13px] font-normal text-faint">ر.س</span>
      </p>
      {hint ? <p className="mt-0.5 text-[12px] text-faint">{hint}</p> : null}
    </div>
  );
}

export function Summary({ totals }: { totals: Totals }) {
  const net = totals.net_month;
  const topCategories = totals.by_category.slice(0, 4);
  const largest = topCategories[0]?.amount ?? 0;

  return (
    <section aria-label="الملخّص" className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile label="صرف اليوم" value={formatAmount(totals.today)} />
        <Tile label="صرف الشهر" value={formatAmount(totals.month)} />
        <Tile
          label="دخل الشهر"
          value={formatAmount(totals.income_month)}
          tone="income"
        />
        <Tile
          label="صافي الشهر"
          value={formatAmount(net)}
          tone={net < 0 ? "expense" : "income"}
          hint={net < 0 ? "الصرف أعلى من الدخل" : undefined}
        />
      </div>

      {topCategories.length > 0 ? (
        <div className="rounded-xl border border-line bg-surface px-4 py-4">
          <h2 className="text-[13px] text-muted">أعلى التصنيفات هذا الشهر</h2>
          <ul className="mt-3 space-y-2.5">
            {topCategories.map((row) => (
              <li key={row.category} className="flex items-center gap-3">
                <span className="w-20 shrink-0 truncate text-[13px] text-ink">
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
