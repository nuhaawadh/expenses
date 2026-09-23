import { site } from "@/lib/site";
import { Logo } from "./ui/Logo";

const LINKS = [{ label: "Home", href: "#top" }, ...site.nav];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line pt-20 pb-10 md:pt-28">
      <div className="frame">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <Logo />
            <p className="mt-8 text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.04em]">
              AI Systems.
              <br />
              <span className="text-mute">Automation.</span>
              <br />
              <span className="text-dim">Scale.</span>
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="t-eyebrow">Navigate</p>
            <ul className="mt-6 space-y-1">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="inline-block py-1.5 text-[15px] text-mute transition-colors duration-300 hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="t-eyebrow">Contact</p>
            {site.email === "[EMAIL]" ? (
              <p className="mt-6 py-1.5 font-mono text-sm text-mute">[EMAIL]</p>
            ) : (
              <a href={`mailto:${site.email}`} className="mt-6 inline-block py-1.5 text-[15px] text-fg hover:text-accent">
                {site.email}
              </a>
            )}
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse gap-4 border-t border-line pt-8 text-[12px] text-dim md:mt-28 md:flex-row md:items-center md:justify-between">
          <p>© {year} HIGHLink. All rights reserved.</p>
          <p className="font-mono tracking-[0.14em]">AI SYSTEMS · AUTOMATION · AGENTS</p>
        </div>
      </div>
    </footer>
  );
}
