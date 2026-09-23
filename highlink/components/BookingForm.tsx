"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import type { Content, Locale } from "@/lib/content";
import { formatDate, formatTime, slotTimes, upcomingDays, validate, type BookingRequest, type Day } from "@/lib/booking";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error" | "offline" | "preview";
type Fields = Pick<BookingRequest, "name" | "email" | "phone" | "company" | "website" | "teamSize" | "message">;
const EMPTY: Fields = { name: "", email: "", phone: "", company: "", website: "", teamSize: "", message: "" };
const PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === "1";

/** Built-in booking form: pick a day and time, leave details, send a request. */
export function BookingForm({ t, locale }: { t: Content["form"]; locale: Locale }) {
  const [days, setDays] = useState<Day[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [f, setF] = useState<Fields>(EMPTY);
  const [fax, setFax] = useState("");
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [status, setStatus] = useState<Status>("idle");
  const times = slotTimes();

  // Dates depend on "today", so they are computed in the browser only.
  useEffect(() => setDays(upcomingDays(locale)), [locale]);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setF((prev) => ({ ...prev, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const req: BookingRequest = { ...f, date, time, timeZone: site.booking.timeZone, locale, fax };
    const found = validate(req);
    setErrors(found);
    if (Object.values(found).some(Boolean)) {
      const first = document.querySelector<HTMLElement>("[data-booking-form] [aria-invalid='true']");
      first?.focus();
      return;
    }
    if (PREVIEW) {
      setStatus("preview");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(req),
      });
      setStatus(res.ok ? "success" : res.status === 503 ? "offline" : "error");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setDate("");
    setTime("");
    setF(EMPTY);
  };

  const when = date && time ? `${formatDate(date, locale)} · ${formatTime(time, locale)} (${t.timezone})` : "";

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[420px] flex-col items-center justify-center gap-3 p-6 text-center md:p-10"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-cta text-white" aria-hidden>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5L20 7" />
          </svg>
        </span>
        <h3 className="text-xl font-semibold md:text-2xl">{t.successTitle}</h3>
        <p className="text-black/70">{t.successBody}</p>
        <p className="font-semibold">{when}</p>
        <button type="button" onClick={reset} className="mt-4 text-sm text-cta underline underline-offset-2">
          {t.another}
        </button>
      </motion.div>
    );
  }

  return (
    <form data-booking-form noValidate onSubmit={submit} className="grid gap-8 p-5 text-start md:grid-cols-2 md:gap-10 md:p-10">
      {/* Day + time */}
      <div className="flex flex-col gap-6">
        <fieldset>
          <legend className="mb-3 text-sm font-semibold">{t.dateLabel}</legend>
          <div role="radiogroup" aria-label={t.dateLabel} className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {days.length === 0
              ? Array.from({ length: 8 }).map((_, i) => <span key={i} className="h-[68px] animate-pulse rounded-lg bg-black/5" />)
              : days.map((d) => {
                  const on = d.iso === date;
                  return (
                    <button
                      key={d.iso}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => {
                        setDate(d.iso);
                        setErrors((p) => ({ ...p, slot: undefined }));
                      }}
                      className={`flex h-[68px] flex-col items-center justify-center rounded-lg border text-sm transition-colors ${
                        on ? "border-cta bg-cta text-white" : "border-field bg-white hover:border-cta"
                      }`}
                    >
                      <span className={on ? "text-white/85" : "text-black/60"}>{d.weekday}</span>
                      <span className="text-lg leading-tight font-semibold">{d.day}</span>
                      <span className={`text-xs ${on ? "text-white/85" : "text-black/60"}`}>{d.month}</span>
                    </button>
                  );
                })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 flex w-full items-baseline justify-between gap-3 text-sm font-semibold">
            {t.timeLabel}
            <span className="text-xs font-normal text-black/55">{t.timezone}</span>
          </legend>
          <AnimatePresence mode="wait" initial={false}>
            {date ? (
              <motion.div
                key={date}
                role="radiogroup"
                aria-label={t.timeLabel}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-3 gap-2 sm:grid-cols-4"
              >
                {times.map((tm) => {
                  const on = tm === time;
                  return (
                    <button
                      key={tm}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => {
                        setTime(tm);
                        setErrors((p) => ({ ...p, slot: undefined }));
                      }}
                      className={`h-11 rounded-lg border text-sm tabular-nums transition-colors ${
                        on ? "border-cta bg-cta font-semibold text-white" : "border-field bg-white hover:border-cta"
                      }`}
                    >
                      {formatTime(tm, locale)}
                    </button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.p key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg bg-black/[0.03] p-4 text-sm text-black/60">
                {t.noDate}
              </motion.p>
            )}
          </AnimatePresence>
          {errors.slot && (
            <p role="alert" className="mt-2 text-sm text-red-700">
              {t.pickSlot}
            </p>
          )}
        </fieldset>
      </div>

      {/* Details */}
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-3 text-sm font-semibold">{t.details}</legend>
        <Field label={t.name} error={errors.name && t[errors.name]}>
          {(p) => <input {...p} type="text" autoComplete="name" value={f.name} onChange={set("name")} />}
        </Field>
        <Field label={t.email} error={errors.email && t[errors.email]}>
          {(p) => <input {...p} type="email" dir="ltr" autoComplete="email" inputMode="email" value={f.email} onChange={set("email")} />}
        </Field>
        <Field label={t.phone} error={errors.phone && t[errors.phone]}>
          {(p) => (
            <input {...p} type="tel" dir="ltr" autoComplete="tel" inputMode="tel" placeholder="+966 5x xxx xxxx" value={f.phone} onChange={set("phone")} />
          )}
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t.company} error={errors.company && t[errors.company]}>
            {(p) => <input {...p} type="text" autoComplete="organization" value={f.company} onChange={set("company")} />}
          </Field>
          <Field label={t.teamSize} error={errors.teamSize && t[errors.teamSize]}>
            {(p) => (
              <select {...p} value={f.teamSize} onChange={set("teamSize")}>
                <option value="" disabled>
                  {t.choose}
                </option>
                {t.teamOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>
        <Field label={t.website}>
          {(p) => <input {...p} type="url" dir="ltr" autoComplete="url" inputMode="url" placeholder="https://" value={f.website} onChange={set("website")} />}
        </Field>
        <Field label={t.message}>
          {(p) => <textarea {...p} rows={3} value={f.message} onChange={set("message")} className={`${p.className} h-auto py-3`} />}
        </Field>

        {/* Honeypot, hidden from people and assistive tech. */}
        <input
          type="text"
          name="fax"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={fax}
          onChange={(e) => setFax(e.target.value)}
          className="absolute -z-10 h-0 w-0 opacity-0"
        />

        {when && (
          <p className="rounded-lg bg-cta/[0.07] px-4 py-3 text-sm">
            <span className="text-black/60">{t.selected}: </span>
            <span className="font-semibold">{when}</span>
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-1 inline-flex min-h-14 w-full items-center justify-center rounded-lg bg-cta px-7 py-4 text-base font-semibold text-white shadow-lg transition-colors hover:bg-cta-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cta disabled:opacity-70"
        >
          {status === "sending" ? t.sending : t.submit}
        </button>

        <AnimatePresence>
          {(status === "error" || status === "offline" || status === "preview") && (
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`rounded-lg px-4 py-3 text-sm ${status === "preview" ? "bg-cta/[0.07] text-black" : "bg-red-50 text-red-800"}`}
            >
              {status === "preview" ? t.previewNote : status === "offline" ? t.errorOffline : t.errorGeneric}
            </motion.p>
          )}
        </AnimatePresence>
      </fieldset>
    </form>
  );
}

type FieldProps = {
  id: string;
  className: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  required?: boolean;
};

function Field({ label, error, children }: { label: string; error?: string; children: (p: FieldProps) => React.ReactNode }) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errId : undefined,
        className: `h-12 w-full rounded-lg border bg-white px-3.5 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-cta focus:ring-2 focus:ring-cta/25 ${
          error ? "border-red-600" : "border-field"
        }`,
      })}
      {error && (
        <p id={errId} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
