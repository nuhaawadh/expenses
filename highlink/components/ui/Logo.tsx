/** HIGHLink wordmark: two linked nodes + type. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
        <circle cx="4" cy="10" r="3" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="18" cy="4" r="3" fill="var(--color-accent)" />
        <path d="M6.8 8.9 15.2 5.1" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span className="text-[17px] font-semibold tracking-[-0.035em]">
        HIGH<span className="font-normal text-mute">Link</span>
      </span>
    </span>
  );
}
