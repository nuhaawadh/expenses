"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EntryList } from "@/components/EntryList";
import { Summary } from "@/components/Summary";
import type { AddData, ApiResult, Entry, ListData, Totals } from "@/lib/types";

const EMPTY_TOTALS: Totals = {
  today: 0,
  month: 0,
  income_month: 0,
  net_month: 0,
  count: 0,
  by_category: [],
};

const EXAMPLES = [
  "صرفت 20 ريال عند المصنع",
  "أمس دفعت 450 ريال إيجار المستودع",
  "استلمت 3000 ريال من متجر الرياض",
];

async function call<T>(body: unknown): Promise<ApiResult<T>> {
  try {
    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return (await res.json()) as ApiResult<T>;
  } catch {
    return {
      success: false,
      data: null,
      error: "تعذّر الاتصال. تحقّق من الشبكة ثم حاول مرة أخرى.",
    };
  }
}

export default function Page() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [totals, setTotals] = useState<Totals>(EMPTY_TOTALS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [newestId, setNewestId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const result = await call<ListData>({ action: "list" });
    if (result.success) {
      setEntries(result.data.entries);
      setTotals(result.data.totals);
      setLoadFailed(false);
    } else {
      setLoadFailed(true);
      setError(result.error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = text.trim();
    if (!value || saving) return;

    setSaving(true);
    setError(null);

    const result = await call<AddData>({ action: "add", text: value });

    if (result.success) {
      setText("");
      setNewestId(result.data.entry.id);
      // نعيد القراءة بدل الحقن محلياً حتى تبقى الإجماليات محسوبة في مكان واحد
      await refresh();
    } else {
      setError(result.error);
    }

    setSaving(false);
    inputRef.current?.focus();
  }

  const isEmpty = !loading && !loadFailed && entries.length === 0;

  return (
    <main className="mx-auto min-h-dvh w-full max-w-2xl px-4 pb-24 pt-8 sm:px-6">
      <header className="mb-7 flex items-baseline justify-between">
        <h1 className="text-lg font-semibold tracking-tight">الدفتر</h1>
        {totals.count > 0 ? (
          <p className="tnum text-[13px] text-faint">{totals.count} حركة</p>
        ) : null}
      </header>

      <form onSubmit={submit} className="mb-8">
        <div className="flex items-center gap-2 rounded-xl border border-line bg-surface p-1.5 focus-within:border-accent">
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={saving}
            maxLength={500}
            autoComplete="off"
            placeholder="اكتب حركة… مثال: صرفت 20 ريال عند المصنع"
            aria-label="حركة جديدة"
            className="w-full bg-transparent px-2.5 py-2 text-[15px] outline-none placeholder:text-faint disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={saving || text.trim().length === 0}
            className="shrink-0 rounded-lg bg-ink px-4 py-2 text-[14px] font-medium text-canvas transition-opacity disabled:opacity-35"
          >
            {saving ? "يسجّل…" : "سجّل"}
          </button>
        </div>

        {error ? (
          <p
            role="alert"
            className="mt-2.5 rounded-lg bg-accent-soft px-3 py-2 text-[13.5px] text-accent"
          >
            {error}
          </p>
        ) : null}
      </form>

      {loading ? (
        <div className="space-y-3" aria-busy="true" aria-label="جارٍ التحميل">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[76px] rounded-xl bg-line-soft" />
            ))}
          </div>
          <div className="h-40 rounded-xl bg-line-soft" />
        </div>
      ) : loadFailed ? (
        <div className="rounded-xl border border-line bg-surface px-5 py-10 text-center">
          <p className="text-[15px] text-ink">تعذّر تحميل الحركات</p>
          <button
            onClick={() => void refresh()}
            className="mt-3 rounded-lg border border-line px-4 py-1.5 text-[14px] text-muted"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : isEmpty ? (
        <div className="rounded-xl border border-dashed border-line px-5 py-12 text-center">
          <p className="text-[15px] text-ink">ابدأ بأول حركة</p>
          <p className="mx-auto mt-1.5 max-w-sm text-[13.5px] leading-relaxed text-muted">
            اكتبها بالعربي كما تقولها، والباقي يُستخرج تلقائياً.
          </p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {EXAMPLES.map((example) => (
              <li key={example}>
                <button
                  type="button"
                  onClick={() => {
                    setText(example);
                    inputRef.current?.focus();
                  }}
                  className="rounded-full border border-line px-3 py-1.5 text-[13px] text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {example}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="space-y-8">
          <Summary totals={totals} />
          <EntryList entries={entries} newestId={newestId} />
        </div>
      )}
    </main>
  );
}
