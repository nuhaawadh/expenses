"use client";

import { useEffect, useState } from "react";
import { formatAmount, formatStamp } from "@/lib/format";
import { CATEGORIES, type Entry, type EntryPatch } from "@/lib/types";

const field =
  "w-full rounded-lg border border-line bg-canvas px-3 py-2 text-[15px] outline-none focus:border-accent";
const label = "block text-[12.5px] text-muted mb-1";

export function EntryEditor({
  entry,
  busy,
  onSave,
  onDelete,
  onClose,
}: {
  entry: Entry;
  busy: boolean;
  onSave: (patch: EntryPatch) => void;
  onDelete: (reason: string) => void;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState(String(entry.amount));
  const [vat, setVat] = useState(String(entry.vat_amount));
  const [direction, setDirection] = useState(entry.direction);
  const [category, setCategory] = useState(entry.category);
  const [vendor, setVendor] = useState(entry.vendor);
  const [note, setNote] = useState(entry.note);
  const [date, setDate] = useState(entry.spent_at ?? "");
  const [confirming, setConfirming] = useState(false);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function save() {
    const patch: EntryPatch = {};
    const a = Number(amount);
    const v = Number(vat);

    if (Number.isFinite(a) && a !== entry.amount) patch.amount = a;
    if (Number.isFinite(v) && v !== entry.vat_amount) patch.vat_amount = v;
    if (direction !== entry.direction) patch.direction = direction;
    if (category !== entry.category) patch.category = category;
    if (vendor !== entry.vendor) patch.vendor = vendor;
    if (note !== entry.note) patch.note = note;
    if (date && date !== entry.spent_at) patch.spent_at = date;

    if (Object.keys(patch).length === 0) {
      onClose();
      return;
    }
    onSave(patch);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="تفاصيل الحركة"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-line bg-surface p-5 sm:rounded-2xl"
      >
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-[16px] font-semibold">تفاصيل الحركة</h2>
          <button onClick={onClose} className="text-[13px] text-muted">
            إغلاق
          </button>
        </div>

        {entry.raw_text ? (
          <p className="mb-4 rounded-lg bg-canvas px-3 py-2 text-[13px] text-muted">
            {entry.raw_text}
          </p>
        ) : null}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label} htmlFor="f-amount">
              المبلغ
            </label>
            <input
              id="f-amount"
              className={`${field} tnum`}
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className={label} htmlFor="f-vat">
              منها ضريبة
            </label>
            <input
              id="f-vat"
              className={`${field} tnum`}
              inputMode="decimal"
              value={vat}
              onChange={(e) => setVat(e.target.value)}
            />
          </div>
          <div>
            <label className={label} htmlFor="f-dir">
              النوع
            </label>
            <select
              id="f-dir"
              className={field}
              value={direction}
              onChange={(e) => setDirection(e.target.value as Entry["direction"])}
            >
              <option value="expense">صرف</option>
              <option value="income">دخل</option>
            </select>
          </div>
          <div>
            <label className={label} htmlFor="f-cat">
              التصنيف
            </label>
            <select
              id="f-cat"
              className={field}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className={label} htmlFor="f-vendor">
              الجهة
            </label>
            <input
              id="f-vendor"
              className={field}
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className={label} htmlFor="f-note">
              الوصف
            </label>
            <input
              id="f-note"
              className={field}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className={label} htmlFor="f-date">
              التاريخ
            </label>
            <input
              id="f-date"
              type="date"
              className={`${field} tnum`}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {(entry.tax_number || entry.invoice_number || entry.receipt_url) ? (
          <div className="mt-4 space-y-1 rounded-lg bg-canvas px-3 py-2.5 text-[12.5px] text-muted">
            {entry.invoice_number ? <p>رقم الفاتورة: {entry.invoice_number}</p> : null}
            {entry.tax_number ? (
              <p dir="ltr" className="tnum text-end">
                {entry.tax_number}
              </p>
            ) : null}
            {entry.receipt_url ? (
              <a
                href={entry.receipt_url}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-accent underline"
              >
                فتح صورة الفاتورة
              </a>
            ) : null}
          </div>
        ) : null}

        {entry.edited_at ? (
          <p className="mt-3 text-[12px] text-faint">
            آخر تعديل: {formatStamp(entry.edited_at)}
          </p>
        ) : null}

        {confirming ? (
          <div className="mt-5 rounded-lg border border-expense/40 bg-canvas p-3">
            <p className="text-[13px] text-ink">
              الحركة تبقى في الدفتر معلّمة كمحذوفة. اكتب السبب:
            </p>
            <input
              autoFocus
              className={`${field} mt-2`}
              placeholder="مثال: مكررة، أو سجلتها بالغلط"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="mt-3 flex gap-2">
              <button
                disabled={busy || reason.trim().length < 3}
                onClick={() => onDelete(reason.trim())}
                className="flex-1 rounded-lg bg-expense px-4 py-2 text-[14px] font-medium text-surface disabled:opacity-40"
              >
                {busy ? "يحذف…" : "تأكيد الحذف"}
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="rounded-lg border border-line px-4 py-2 text-[14px] text-muted"
              >
                تراجع
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 flex gap-2">
            <button
              disabled={busy}
              onClick={save}
              className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-[14px] font-medium text-on-accent disabled:opacity-40"
            >
              {busy ? "يحفظ…" : "حفظ التعديل"}
            </button>
            <button
              disabled={busy}
              onClick={() => setConfirming(true)}
              className="rounded-lg border border-line px-4 py-2.5 text-[14px] text-expense disabled:opacity-40"
            >
              حذف
            </button>
          </div>
        )}

        <p className="mt-3 text-center text-[11.5px] text-faint">
          الأصل: {formatAmount(entry.amount)} ر.س ·{" "}
          {entry.direction === "income" ? "دخل" : "صرف"}
        </p>
      </div>
    </div>
  );
}
