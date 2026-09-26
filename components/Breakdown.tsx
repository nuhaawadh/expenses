"use client";

import { useState } from "react";
import { formatAmount } from "@/lib/format";
import type { CategoryTotal } from "@/lib/types";

type Side = "expense" | "income";

function Rows({ rows, side }: { rows: CategoryTotal[]; side: Side }) {
  const total = rows.reduce((sum, r) => sum + r.amount, 0);
  const largest = rows[0]?.amount ?? 0;

  if (rows.length === 0) {
    return (
      <p className="px-1 py-6 text-center text-[13.5px] text-faint">
        {side === "expense" ? "ما فيه مصروف هذا الشهر" : "ما فيه دخل هذا الشهر"}
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {rows.map((row) => {
        const share = total > 0 ? Math.round((row.amount / total) * 100) : 0;
        return (
          <li key={row.category}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="truncate text-[14px] text-ink">{row.category}</span>
              <span className="tnum shrink-0 text-[14px] text-ink">
                {formatAmount(row.amount)}
                <span className="ms-1 text-[11.5px] text-faint">ر.س</span>
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line-soft">
                <span
                  className={`block h-full rounded-full ${side === "income" ? "bg-income" : "bg-accent"}`}
                  style={{
                    width: `${largest > 0 ? Math.max(3, (row.amount / largest) * 100) : 0}%`,
                  }}
                />
              </span>
              <span className="tnum w-9 shrink-0 text-end text-[11.5px] text-faint">
                {share}%
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function Breakdown({
  expenses,
  income,
}: {
  expenses: CategoryTotal[];
  income: CategoryTotal[];
}) {
  const [side, setSide] = useState<Side>("expense");

  if (expenses.length === 0 && income.length === 0) return null;

  const rows = side === "expense" ? expenses : income;
  const total = rows.reduce((sum, r) => sum + r.amount, 0);

  const tab = (value: Side, label: string) => (
    <button
      type="button"
      onClick={() => setSide(value)}
      aria-pressed={side === value}
      className={`rounded-lg px-3 py-1.5 text-[13px] transition-colors ${
        side === value
          ? "bg-canvas font-medium text-ink"
          : "text-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );

  return (
    <section
      aria-label="تفصيل الفئات"
      className="rounded-xl border border-line bg-surface px-4 py-4"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex gap-1 rounded-xl border border-line p-1">
          {tab("expense", "وين راحت")}
          {tab("income", "وين جات")}
        </div>
        <p className="tnum text-[13px] text-muted">
          {formatAmount(total)}
          <span className="ms-1 text-[11.5px] text-faint">ر.س</span>
        </p>
      </div>

      <Rows rows={rows} side={side} />
    </section>
  );
}
