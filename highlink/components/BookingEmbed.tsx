import { site } from "@/lib/site";

/**
 * Scheduling embed. Set `site.bookingUrl` (Calendly, Cal.com, SavvyCal…)
 * and this renders a lazy iframe; until then it shows a placeholder panel.
 */
export function BookingEmbed() {
  if (site.bookingUrl) {
    return (
      <div className="overflow-hidden rounded-[14px] bg-ink-2 ring-1 ring-inset ring-line-2">
        <iframe
          src={site.bookingUrl}
          title="Book a solutions call with HIGHLink"
          loading="lazy"
          className="h-[720px] w-full"
        />
      </div>
    );
  }

  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="relative overflow-hidden rounded-[14px] bg-ink-2/80 ring-1 ring-inset ring-line-2">
      <div className="flex items-center justify-between border-b border-line px-5 py-4 md:px-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Solutions call</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Select a date</span>
      </div>

      <div aria-hidden className="grid gap-8 p-5 opacity-40 md:grid-cols-[1fr_180px] md:p-8">
        <div>
          <div className="grid grid-cols-7 gap-1.5 text-center font-mono text-[10px] text-dim">
            {days.map((d, i) => (
              <span key={i} className="py-2">
                {d}
              </span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1.5">
            {Array.from({ length: 35 }).map((_, i) => (
              <span
                key={i}
                className={`aspect-square rounded-md ${
                  [9, 11, 16, 18, 23, 25].includes(i) ? "ring-1 ring-inset ring-accent/50" : "bg-white/[0.025]"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="hidden space-y-2 md:block">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="block h-10 rounded-md ring-1 ring-inset ring-line-2" />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 top-[53px] grid place-items-center bg-gradient-to-b from-transparent via-ink-2/60 to-ink-2/80">
        <div className="text-center">
          <p className="font-mono text-sm tracking-[0.14em] text-fg">[BOOKING CALENDAR]</p>
          <p className="mt-3 text-[13px] text-dim">Scheduling embed loads here.</p>
        </div>
      </div>
    </div>
  );
}
