"use client";

import { useCallback, useEffect, useState } from "react";
import { Breakdown } from "@/components/Breakdown";
import { Composer } from "@/components/Composer";
import { EntryEditor } from "@/components/EntryEditor";
import { EntryList } from "@/components/EntryList";
import { Summary } from "@/components/Summary";
import { currentMonthKey, formatMonthLabel } from "@/lib/format";
import { prepareReceipt } from "@/lib/image";
import type {
  AddData,
  ApiResult,
  Entry,
  EntryPatch,
  LedgerData,
  MutateData,
  Totals,
} from "@/lib/types";

const EMPTY_TOTALS: Totals = {
  today: 0,
  month: 0,
  income_month: 0,
  net_month: 0,
  count: 0,
  vat_month: 0,
  balance: 0,
  prev: { expense: 0, income: 0, net: 0 },
  change: { expense: null, income: null },
  by_category: [],
  income_by_category: [],
};

const EXAMPLES = [
  "صرفت 45 ريال قهوة",
  "دفعت 320 فاتورة الكهرباء",
  "جاني الراتب 12000",
];

async function call<T>(body: unknown): Promise<ApiResult<T>> {
  try {
    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // الجلسة انتهت — نعيد تحميل الصفحة فيتكفّل الخادم بالتحويل لصفحة الدخول
    if (res.status === 401) {
      window.location.href = "/login";
      return { success: false, data: null, error: "جلستك انتهت." };
    }

    return (await res.json()) as ApiResult<T>;
  } catch {
    return {
      success: false,
      data: null,
      error: "تعذّر الاتصال. تحقّق من الشبكة ثم حاول مرة أخرى.",
    };
  }
}

export function Ledger({ user }: { user: { name: string; email: string } }) {
  const [month, setMonth] = useState(currentMonthKey());
  const [months, setMonths] = useState<string[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [deleted, setDeleted] = useState<Entry[]>([]);
  const [totals, setTotals] = useState<Totals>(EMPTY_TOTALS);

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [newestId, setNewestId] = useState<number | null>(null);
  const [editing, setEditing] = useState<Entry | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const refresh = useCallback(async (which: string) => {
    setLoading(true);
    const result = await call<LedgerData>({ action: "list", month: which });
    if (result.success) {
      setEntries(result.data.entries);
      setDeleted(result.data.deleted_entries);
      setTotals(result.data.totals);
      setMonths(result.data.months);
      setLoadFailed(false);
    } else {
      setLoadFailed(true);
      setError(result.error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh(month);
  }, [refresh, month]);

  /** كل تغيير يعيد القراءة بدل تحديث الحالة محلياً، فتبقى الحسابات في مكان واحد */
  async function after(result: ApiResult<unknown>, onOk?: () => void) {
    if (result.success) {
      setError(null);
      onOk?.();
      await refresh(month);
    } else {
      setError(result.error);
    }
  }

  async function addText(text: string) {
    setBusy(true);
    setStage("يقرأ الجملة…");
    setError(null);
    setNotice(null);

    const result = await call<AddData>({ action: "add", text });
    await after(result, () => {
      if (result.success) setNewestId(result.data.entry.id);
    });

    setBusy(false);
    setStage(null);
  }

  async function addReceipt(file: File) {
    setBusy(true);
    setError(null);
    setNotice(null);

    try {
      setStage("يجهّز الصورة…");
      const image = await prepareReceipt(file);

      setStage("يقرأ الفاتورة… قد يأخذ لحظات");
      const result = await call<AddData>({
        action: "add_receipt",
        imageBase64: image.base64,
        mimeType: image.mimeType,
      });

      await after(result, () => {
        if (!result.success) return;
        setNewestId(result.data.entry.id);
        if (result.data.entry.receipt_saved === false) {
          setNotice("سُجّلت البيانات، لكن الصورة ما انحفظت.");
        }
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "تعذّرت قراءة الصورة.");
    }

    setBusy(false);
    setStage(null);
  }

  async function saveEdit(patch: EntryPatch) {
    if (!editing) return;
    setBusy(true);
    const result = await call<MutateData>({ action: "update", id: editing.id, patch });
    await after(result, () => setEditing(null));
    setBusy(false);
  }

  async function removeEntry(reason: string) {
    if (!editing) return;
    setBusy(true);
    const result = await call<MutateData>({ action: "delete", id: editing.id, reason });
    await after(result, () => setEditing(null));
    setBusy(false);
  }

  const isEmpty = !loading && !loadFailed && entries.length === 0 && deleted.length === 0;
  const monthOptions = months.includes(month) ? months : [month, ...months];

  return (
    <main className="mx-auto min-h-dvh w-full max-w-2xl px-4 pb-24 pt-8 sm:px-6">
      <header className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold tracking-tight">الدفتر</h1>

          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="حسابي"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[12px] font-medium text-on-accent"
            >
              {(user.name || user.email || "؟").trim().charAt(0).toUpperCase()}
            </button>

            {menuOpen ? (
              <>
                <button
                  className="fixed inset-0 z-10 cursor-default"
                  aria-hidden="true"
                  tabIndex={-1}
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute start-0 top-9 z-20 w-56 rounded-xl border border-line bg-surface p-3 text-start shadow-lg">
                  <p className="truncate text-[13.5px] text-ink">{user.name || "—"}</p>
                  <p dir="ltr" className="truncate text-[12px] text-faint">
                    {user.email}
                  </p>
                  <form action="/api/auth/logout" method="post" className="mt-3">
                    <button
                      type="submit"
                      className="w-full rounded-lg border border-line px-3 py-1.5 text-[13.5px] text-muted"
                    >
                      تسجيل الخروج
                    </button>
                  </form>
                </div>
              </>
            ) : null}
          </div>
        </div>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          aria-label="اختر الشهر"
          className="rounded-lg border border-line bg-surface px-2.5 py-1.5 text-[13px] text-ink outline-none focus:border-accent"
        >
          {monthOptions.map((m) => (
            <option key={m} value={m}>
              {formatMonthLabel(m)}
            </option>
          ))}
        </select>
      </header>

      <div className="mb-7">
        <Composer
          busy={busy}
          stage={stage}
          onSubmitText={addText}
          onSubmitReceipt={addReceipt}
        />

        {error ? (
          <p
            role="alert"
            className="mt-2.5 rounded-lg bg-accent-soft px-3 py-2 text-[13.5px] text-accent"
          >
            {error}
          </p>
        ) : null}

        {notice ? (
          <p className="mt-2.5 rounded-lg border border-line px-3 py-2 text-[13px] text-muted">
            {notice}
          </p>
        ) : null}
      </div>

      {loading ? (
        <div className="space-y-3" aria-busy="true" aria-label="جارٍ التحميل">
          <div className="h-[104px] rounded-xl bg-line-soft" />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[72px] rounded-xl bg-line-soft" />
            ))}
          </div>
          <div className="h-40 rounded-xl bg-line-soft" />
        </div>
      ) : loadFailed ? (
        <div className="rounded-xl border border-line bg-surface px-5 py-10 text-center">
          <p className="text-[15px] text-ink">تعذّر تحميل الدفتر</p>
          <button
            onClick={() => void refresh(month)}
            className="mt-3 rounded-lg border border-line px-4 py-1.5 text-[14px] text-muted"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : isEmpty ? (
        <div className="rounded-xl border border-dashed border-line px-5 py-12 text-center">
          <p className="text-[15px] text-ink">
            ما فيه حركات في {formatMonthLabel(month)}
          </p>
          <p className="mx-auto mt-1.5 max-w-sm text-[13.5px] leading-relaxed text-muted">
            اكتب الحركة بالعربي كما تقولها، أو صوّر الفاتورة وخلّها تُقرأ تلقائياً.
          </p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {EXAMPLES.map((example) => (
              <li key={example}>
                <button
                  type="button"
                  onClick={() => void addText(example)}
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
          <Summary totals={totals} month={month} />
          <Breakdown
            expenses={totals.by_category}
            income={totals.income_by_category}
          />
          <EntryList
            entries={entries}
            deleted={deleted}
            newestId={newestId}
            onOpen={setEditing}
          />
        </div>
      )}

      {editing ? (
        <EntryEditor
          entry={editing}
          busy={busy}
          onSave={saveEdit}
          onDelete={removeEntry}
          onClose={() => setEditing(null)}
        />
      ) : null}
    </main>
  );
}
