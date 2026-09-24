/**
 * `ar-SA` يستخدم التقويم الهجري والأرقام العربية الهندية افتراضياً.
 * للمحاسبة نريد ميلادي وأرقاماً لاتينية، فنفرضهما صراحةً في اسم اللغة.
 */
const LOCALE_NUM = "ar-SA-u-nu-latn";
const LOCALE_DATE = "ar-SA-u-ca-gregory-nu-latn";
const TZ = "Asia/Riyadh";

const money = new Intl.NumberFormat(LOCALE_NUM, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatAmount(value: number): string {
  return money.format(value);
}

const dayLong = new Intl.DateTimeFormat(LOCALE_DATE, {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: TZ,
});

const monthLong = new Intl.DateTimeFormat(LOCALE_DATE, {
  month: "long",
  year: "numeric",
  timeZone: TZ,
});

const dateTimeShort = new Intl.DateTimeFormat(LOCALE_DATE, {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  timeZone: TZ,
});

/** يحوّل `YYYY-MM-DD` إلى "اليوم" / "أمس" / "الأحد 14 سبتمبر" */
export function formatDayLabel(isoDate: string | null): string {
  if (!isoDate) return "بلا تاريخ";

  const today = todayKey();
  if (isoDate === today) return "اليوم";
  if (isoDate === shiftKey(today, -1)) return "أمس";

  // ظهراً بالتوقيت العالمي حتى لا ينزلق اليوم عند التحويل لتوقيت الرياض
  return dayLong.format(new Date(`${isoDate}T12:00:00Z`));
}

/** يحوّل `YYYY-MM` إلى "سبتمبر 2026" */
export function formatMonthLabel(month: string): string {
  if (!/^\d{4}-\d{2}$/.test(month)) return month;
  return monthLong.format(new Date(`${month}-15T12:00:00Z`));
}

export function formatStamp(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : dateTimeShort.format(d);
}

/** تاريخ اليوم بتوقيت الرياض بصيغة YYYY-MM-DD */
export function todayKey(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function currentMonthKey(): string {
  return todayKey().slice(0, 7);
}

function shiftKey(key: string, days: number): string {
  const d = new Date(`${key}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** يجمع الحركات في مجموعات حسب اليوم، محافظاً على ترتيب المدخلات */
export function groupByDay<T extends { spent_at: string | null }>(
  entries: T[],
): { key: string | null; label: string; items: T[] }[] {
  const groups: { key: string | null; label: string; items: T[] }[] = [];

  for (const entry of entries) {
    const last = groups[groups.length - 1];
    if (last && last.key === entry.spent_at) {
      last.items.push(entry);
    } else {
      groups.push({
        key: entry.spent_at,
        label: formatDayLabel(entry.spent_at),
        items: [entry],
      });
    }
  }

  return groups;
}
