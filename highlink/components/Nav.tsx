"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { anchors } from "@/lib/site";
import { ease } from "@/lib/motion";
import type { Dict } from "@/lib/i18n";
import type { LangSwitch as LS } from "./HomePage";
import { Logo } from "./ui/Logo";
import { LangSwitch } from "./ui/LangSwitch";

export function Nav({ t, langSwitch }: { t: Dict; langSwitch: LS }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease, delay: 0.5 }}
        className={`transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
          scrolled || open ? "border-line bg-ink/70 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <nav className="frame flex h-16 items-center justify-between md:h-[72px]" aria-label="Primary">
          <a href="#top" className="relative z-10" aria-label={t.common.homeAria} onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
            {t.nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[13px] text-mute transition-colors duration-300 hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LangSwitch s={langSwitch} />
            <a
              href={anchors.primary}
              className="hidden h-10 items-center rounded-full bg-fg px-5 text-[13px] font-medium text-ink transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(95,212,180,0.5),0_8px_32px_-6px_rgba(95,212,180,0.45)] sm:inline-flex"
            >
              {t.cta.primary} <span aria-hidden className="ms-2 inline-block rtl:-scale-x-100">→</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.common.closeMenu : t.common.openMenu}
              className="relative z-10 grid h-11 w-11 place-items-center rounded-full ring-1 ring-inset ring-line-2 lg:hidden"
            >
              <span className="relative block h-2.5 w-4">
                <span
                  className={`absolute left-0 h-px w-4 bg-fg transition-transform duration-500 ${open ? "top-1/2 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-px w-4 bg-fg transition-transform duration-500 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 top-16 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div className="frame flex h-full flex-col justify-between pb-10 pt-10">
              <ul className="space-y-1">
                {[{ label: t.common.home, href: "#top" }, ...t.nav].map((l, i) => (
                  <motion.li
                    key={l.href + l.label}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease, delay: 0.05 + i * 0.05 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-[2.5rem] font-medium leading-tight tracking-[-0.04em] rtl:leading-[1.35]"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href={anchors.primary}
                onClick={() => setOpen(false)}
                className="inline-flex h-14 items-center justify-center rounded-full bg-fg text-[15px] font-medium text-ink"
              >
                {t.cta.primary} <span aria-hidden className="ms-2 inline-block rtl:-scale-x-100">→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
