/** HIGHLink wordmark: two linked nodes + name. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span dir="ltr" className={`inline-flex items-center gap-3 text-fg ${className}`}>
      <svg viewBox="0 0 30 20" className="h-[0.75em] w-auto" fill="none" aria-hidden>
        <circle cx="5" cy="14" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="25" cy="6" r="4" fill="#2fd3ad" />
        <path d="M8.8 12.4 21.2 7.6" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span className="font-semibold tracking-[0.02em]">
        HIGH<span className="font-normal opacity-80">Link</span>
      </span>
    </span>
  );
}
