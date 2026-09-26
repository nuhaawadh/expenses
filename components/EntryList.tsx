"use client";

import { useState } from "react";
import { formatAmount, formatRecorded, formatStamp, groupByDay } from "@/lib/format";
import type { Entry } from "@/lib/types";

function Amount({ entry }: { entry: Entry }) {
  const income = entry.direction === "income";
  return (
    // dir="ltr" ضروري: علامة +/− محايدة اتجاهياً، وبدونها يعيد RTL ترتيبها فتظهر بعد الرقم
    <p
      dir="ltr"
      className={`tnum shrink-0 text-[15px] font-medium ${income ? "text-income" : "text-ink"}`}
    >
      {income ? "+" : "−"}
      {formatAmount(entry.amount)}
    </p>
  );
}

function Row({
  entry,
  isNew,
  onOpen,
}: {
  entry: Entry;
  isNew: boolean;
  onOpen: (entry: Entry) => void;
}) {
  const title = entry.note || entry.vendor || entry.raw_text || "حركة";
  const meta = [
    entry.category,
    entry.vendor && entry.vendor !== title ? entry.vendor : null,
    formatRecorded(entry.created_at, entry.spent_at) || null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <li className={isNew ? "rise" : undefined}>
      <button
        type="button"
        onClick={() => onOpen(entry)}
        className="flex w-full items-baseline gap-3 px-4 py-3 text-start transition-colors hover:bg-line-soft"
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] text-ink">
            {title}
            {entry.source === "receipt" ? (
              <span
                className="ms-1.5 align-middle text-[11px] text-accent"
                title="مسجّلة من فاتورة"
              >
                ⬚
              </span>
            ) : null}
          </p>
          <p className="mt-0.5 truncate text-[12.5px] text-faint">
            {meta}
            {entry.vat_amount > 0 ? ` · ضريبة ${formatAmount(entry.vat_amount)}` : ""}
            {entry.edited_at ? " · معدّلة" : ""}
          </p>
        </div>
        <Amount entry={entry} />
      </button>
    </li>
  );
}

export function EntryList({
  entries,
  deleted,
  newestId,
  onOpen,
}: {
  entries: Entry[];
  deleted: Entry[];
  newestId: number | null;
  onOpen: (entry: Entry) => void;
}) {
  const [showDeleted, setShowDeleted] = useState(false);
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
                  onOpen={onOpen}
                />
              ))}
            </ul>
          </div>
        );
      })}

      {deleted.length > 0 ? (
        <div>
          <button
            type="button"
            onClick={() => setShowDeleted((v) => !v)}
            className="flex w-full items-baseline justify-between px-1 py-1 text-[13px] text-muted"
          >
            <span>محذوفة ({deleted.length})</span>
            <span className="text-faint">{showDeleted ? "إخفاء" : "عرض"}</span>
          </button>

          {showDeleted ? (
            <ul className="mt-2 divide-y divide-line-soft overflow-hidden rounded-xl border border-dashed border-line">
              {deleted.map((entry) => (
                <li key={entry.id} className="px-4 py-3">
                  <div className="flex items-baseline gap-3">
                    <p className="min-w-0 flex-1 truncate text-[14px] text-muted line-through">
                      {entry.note || entry.vendor || entry.raw_text}
                    </p>
                    <p dir="ltr" className="tnum shrink-0 text-[14px] text-faint line-through">
                      {formatAmount(entry.amount)}
                    </p>
                  </div>
                  <p className="mt-1 text-[12px] text-faint">
                    {entry.delete_reason}
                    {entry.deleted_at ? ` — ${formatStamp(entry.deleted_at)}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
