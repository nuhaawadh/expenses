"use client";

import { useRef, useState } from "react";

export function Composer({
  busy,
  stage,
  onSubmitText,
  onSubmitReceipt,
}: {
  busy: boolean;
  /** ما يجري الآن، لعرضه أثناء الانتظار */
  stage: string | null;
  onSubmitText: (text: string) => void;
  onSubmitReceipt: (file: File) => void;
}) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = text.trim();
    if (!value || busy) return;
    onSubmitText(value);
    setText("");
  }

  return (
    <form onSubmit={submit}>
      <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface p-1.5 focus-within:border-accent">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={busy}
          maxLength={500}
          autoComplete="off"
          placeholder="اكتب حركة… مثال: صرفت 20 ريال عند المصنع"
          aria-label="حركة جديدة"
          className="w-full min-w-0 bg-transparent px-2.5 py-2 text-[15px] outline-none placeholder:text-faint disabled:opacity-60"
        />

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (file) onSubmitReceipt(file);
          }}
        />

        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          title="صوّر فاتورة"
          aria-label="صوّر فاتورة"
          className="shrink-0 rounded-lg border border-line px-3 py-2 text-[15px] text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-35"
        >
          ⬚
        </button>

        <button
          type="submit"
          disabled={busy || text.trim().length === 0}
          className="shrink-0 rounded-lg bg-accent px-4 py-2 text-[14px] font-medium text-on-accent transition-opacity disabled:opacity-35"
        >
          {busy ? "…" : "سجّل"}
        </button>
      </div>

      {stage ? (
        <p className="mt-2 flex items-center gap-2 px-1 text-[13px] text-muted">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          {stage}
        </p>
      ) : null}
    </form>
  );
}
