import { site } from "./site";
import type { Locale } from "./content";

/** A bookable day: ISO date (YYYY-MM-DD) in the business time zone. */
export type Day = { iso: string; weekday: string; day: string; month: string };

const intlLocale = (l: Locale) => (l === "ar" ? "ar-SA-u-ca-gregory-nu-latn" : "en-US");

/** Noon UTC on a calendar date, so formatting never slips across midnight. */
const atNoon = (iso: string) => new Date(`${iso}T12:00:00Z`);

/** Today's calendar date in the business time zone. */
function todayIso() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: site.booking.timeZone }).format(new Date());
}

/** The next `daysAhead` working days, starting tomorrow. */
export function upcomingDays(locale: Locale): Day[] {
  const { workDays, daysAhead } = site.booking;
  const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(intlLocale(locale), { ...o, timeZone: "UTC" });
  const wd = fmt({ weekday: "short" }), d = fmt({ day: "numeric" }), m = fmt({ month: "short" });
  const days: Day[] = [];
  const cursor = atNoon(todayIso());
  while (days.length < daysAhead) {
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    if (!(workDays as readonly number[]).includes(cursor.getUTCDay())) continue;
    days.push({ iso: cursor.toISOString().slice(0, 10), weekday: wd.format(cursor), day: d.format(cursor), month: m.format(cursor) });
  }
  return days;
}

/** Slot start times as "HH:mm". */
export function slotTimes(): string[] {
  const { firstSlot, lastSlot, slotMinutes } = site.booking;
  const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
  const out: string[] = [];
  for (let t = toMin(firstSlot); t <= toMin(lastSlot); t += slotMinutes)
    out.push(`${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`);
  return out;
}

export function formatTime(hhmm: string, locale: Locale) {
  return new Intl.DateTimeFormat(intlLocale(locale), { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(
    new Date(`1970-01-01T${hhmm}:00Z`),
  );
}

export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(intlLocale(locale), { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(
    atNoon(iso),
  );
}

/** Shape sent to /api/booking and forwarded to the webhook. */
export type BookingRequest = {
  date: string;
  time: string;
  timeZone: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  teamSize: string;
  message: string;
  locale: Locale;
  /** Honeypot: real visitors leave this empty. */
  fax?: string;
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const phoneDigits = (p: string) => p.replace(/[^\d]/g, "").length;

/** Server- and client-side validation. Returns field → error key. */
export function validate(r: Partial<BookingRequest>) {
  const e: Partial<Record<keyof BookingRequest | "slot", "required" | "invalidEmail" | "invalidPhone" | "pickSlot">> = {};
  if (!r.date || !/^\d{4}-\d{2}-\d{2}$/.test(r.date) || !r.time || !/^\d{2}:\d{2}$/.test(r.time)) e.slot = "pickSlot";
  if (!r.name?.trim()) e.name = "required";
  if (!r.email?.trim()) e.email = "required";
  else if (!EMAIL_RE.test(r.email.trim())) e.email = "invalidEmail";
  if (!r.phone?.trim()) e.phone = "required";
  else if (phoneDigits(r.phone) < 7 || phoneDigits(r.phone) > 15) e.phone = "invalidPhone";
  if (!r.company?.trim()) e.company = "required";
  if (!r.teamSize?.trim()) e.teamSize = "required";
  return e;
}
