"use client";

import { useEffect, useRef, useState } from "react";

function CameraIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2a1 1 0 0 0 .83-.45l.94-1.4A1 1 0 0 1 9.3 4.7h5.4a1 1 0 0 1 .83.45l.94 1.4a1 1 0 0 0 .83.45h2.2A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function GalleryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3.2"
        y="4.8"
        width="17.6"
        height="14.4"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="8.6" cy="9.8" r="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m3.8 16.6 4.3-3.9a1.6 1.6 0 0 1 2.2.06l3 3.06m0 0 2-1.9a1.6 1.6 0 0 1 2.2 0l2.7 2.5m-6.9-.6 2.6 2.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
  const [pickerOpen, setPickerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!pickerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPickerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pickerOpen]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = text.trim();
    if (!value || busy) return;
    onSubmitText(value);
    setText("");
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    // تفريغ القيمة يسمح باختيار نفس الصورة مرة أخرى لو احتاجت إعادة
    event.target.value = "";
    setPickerOpen(false);
    if (file) onSubmitReceipt(file);
  }

  const option =
    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14px] text-ink transition-colors hover:bg-canvas";

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
          placeholder="اكتب حركة… مثال: صرفت 20 ريال قهوة"
          aria-label="حركة جديدة"
          className="w-full min-w-0 bg-transparent px-2.5 py-2 text-[15px] outline-none placeholder:text-faint disabled:opacity-60"
        />

        {/*
         * مدخلان منفصلان عمداً: capture="environment" يفتح الكاميرا مباشرة
         * على الجوال ويتخطّى الاستوديو، وبدونه يفتح المنتقي. فالخيار الواحد
         * يمنع أحد الطريقين دائماً.
         */}
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFile}
        />
        <input
          ref={galleryRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />

        <div className="relative">
          <button
            type="button"
            disabled={busy}
            onClick={() => setPickerOpen((v) => !v)}
            aria-label="إضافة فاتورة"
            aria-expanded={pickerOpen}
            className="flex shrink-0 items-center justify-center rounded-lg border border-line px-3 py-2 text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-35"
          >
            <CameraIcon />
          </button>

          {pickerOpen ? (
            <>
              <button
                type="button"
                aria-hidden="true"
                tabIndex={-1}
                onClick={() => setPickerOpen(false)}
                className="fixed inset-0 z-10 cursor-default"
              />
              <div className="absolute end-0 top-12 z-20 w-52 rounded-xl border border-line bg-surface p-1.5 shadow-lg">
                <button
                  type="button"
                  className={option}
                  onClick={() => cameraRef.current?.click()}
                >
                  <CameraIcon />
                  تصوير الفاتورة
                </button>
                <button
                  type="button"
                  className={option}
                  onClick={() => galleryRef.current?.click()}
                >
                  <GalleryIcon />
                  اختيار من الاستوديو
                </button>
              </div>
            </>
          ) : null}
        </div>

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
