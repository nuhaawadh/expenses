export type Direction = "expense" | "income";

export const CATEGORIES = [
  "مواد خام",
  "رواتب",
  "نقل",
  "إيجار",
  "مرافق",
  "تسويق",
  "معدات",
  "صيانة",
  "ضيافة",
  "رسوم",
  "مبيعات",
  "أخرى",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Entry {
  id: number;
  /** YYYY-MM-DD بتوقيت الرياض — جاهز للعرض مباشرة */
  spent_at: string | null;
  amount: number;
  vat_amount: number;
  currency: string;
  direction: Direction;
  category: string;
  vendor: string;
  tax_number: string;
  invoice_number: string;
  note: string;
  raw_text: string;
  source: "text" | "receipt";
  receipt_url: string;
  deleted: boolean;
  deleted_at: string | null;
  delete_reason: string;
  edited_at: string | null;
  created_at: string | null;
}

export interface CategoryTotal {
  category: string;
  amount: number;
}

export interface Totals {
  today: number;
  month: number;
  income_month: number;
  net_month: number;
  count: number;
  vat_month: number;
  /** الرصيد التراكمي لكل الحركات حتى نهاية الشهر المعروض */
  balance: number;
  prev: { expense: number; income: number; net: number };
  /** نسبة التغيّر عن الشهر السابق، وnull حين لا يوجد شهر سابق للمقارنة */
  change: { expense: number | null; income: number | null };
  /** المصروف حسب الفئة للشهر المعروض، تنازلياً */
  by_category: CategoryTotal[];
  /** الدخل حسب الفئة للشهر المعروض، تنازلياً */
  income_by_category: CategoryTotal[];
}

export interface LedgerData {
  month: string;
  months: string[];
  currency: string;
  entries: Entry[];
  deleted_entries: Entry[];
  totals: Totals;
}

export interface AddData {
  entry: Entry & { receipt_saved?: boolean };
}

export interface MutateData {
  id: number;
  updated?: boolean;
  deleted?: boolean;
}

/** شكل الرد الموحّد. `success` هو الفيصل، لا رمز HTTP. */
export type ApiResult<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: string };

export interface EntryPatch {
  amount?: number;
  vat_amount?: number;
  direction?: Direction;
  category?: string;
  spent_at?: string;
  vendor?: string;
  note?: string;
}
