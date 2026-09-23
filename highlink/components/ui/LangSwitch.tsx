import type { LangSwitch as LS } from "../HomePage";

/** Link to the same page in the other language. */
export function LangSwitch({ s, className = "" }: { s: LS; className?: string }) {
  return (
    <a
      href={s.href}
      hrefLang={s.lang}
      lang={s.lang}
      aria-label={s.aria}
      className={`inline-flex h-10 items-center rounded-full px-4 text-[13px] text-mute ring-1 ring-inset ring-line-2 transition-colors duration-300 hover:text-fg hover:ring-fg/40 ${className}`}
    >
      {s.label}
    </a>
  );
}
