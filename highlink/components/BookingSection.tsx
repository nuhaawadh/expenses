"use client";

import { motion } from "framer-motion";
import type { Content, Locale } from "@/lib/content";
import { site } from "@/lib/site";
import { BookingForm } from "./BookingForm";

/** Section 02 — appears once booking unlocks. */
export function BookingSection({ t, form, locale }: { t: Content["booking"]; form: Content["form"]; locale: Locale }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="px-4 py-8 md:py-16"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 text-center md:mb-8">
          <h2 id="booking-heading" tabIndex={-1} className="mb-3 scroll-mt-8 text-2xl font-semibold outline-none md:text-3xl">
            {t.title}
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted md:text-base">{t.body}</p>
        </div>
        <div className="overflow-hidden rounded-lg bg-white text-black shadow-xl">
          {site.bookingUrl ? (
            <iframe
              title={t.frameTitle}
              src={site.bookingUrl}
              loading="lazy"
              className="block min-h-[600px] w-full border-0 md:min-h-[700px]"
            />
          ) : (
            <BookingForm t={form} locale={locale} />
          )}
        </div>
      </div>
    </motion.section>
  );
}
