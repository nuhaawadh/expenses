import { formatAmount, groupByDay } from "@/lib/format";
import type { Entry } from "@/lib/types";

function Row({ entry, isNew }: { entry: Entry; isNew: boolean }) {
  const income = entry.direction === "income";
  const title = entry.note || entry.vendor || entry.raw_text;

  return (
    <li
      className={`flex items-baseline gap-3 px-4 py-3 ${isNew ? "rise" : ""}`}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] text-ink">{title}</p>
        <p className="mt-0.5 truncate text-[12.5px] text-faint">
          {entry.category}
          {entry.vendor && entry.vendor !== title ? ` · ${entry.vendor}` : ""}
        </p>
      </div>
      {/* dir="ltr" ضروري: علامة +/− محايدة اتجاهياً، وبدونها يعيد RTL ترتيبها فتظهر بعد الرقم */}
      <p
        dir="ltr"
        className={`tnum shrink-0 text-[15px] font-medium ${income ? "text-income" : "text-ink"}`}
      >
        {income ? "+" : "−"}
        {formatAmount(entry.amount)}
      </p>
    </li>
  );
}

export function EntryList({
  entries,
  newestId,
}: {
  entries: Entry[];
  newestId: number | null;
}) {
  const groups = groupByDay(entries);

  return (
    <section aria-label="الحركات" className="space-y-5">
      {groups.map((group) => {
        const dayTotal = group.items.reduce(
          (sum, e) => sum + (e.direction === "income" ? 0 : e.amount),
          0,
        );

        return (
          <div key={group.key ?? "unknown"}>
            <div className="mb-2 flex items-baseline justify-between px-1">
              <h2 className="text-[13px] font-medium text-muted">{group.label}</h2>
              {dayTotal > 0 ? (
                <span className="tnum text-[12.5px] text-faint">
                  {formatAmount(dayTotal)} ر.س
                </span>
              ) : null}
            </div>
            <ul className="divide-y divide-line-soft overflow-hidden rounded-xl border border-line bg-surface">
              {group.items.map((entry) => (
                <Row
                  key={entry.id}
                  entry={entry}
                  isNew={entry.id === newestId}
                />
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
