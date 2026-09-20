export type Direction = "expense" | "income";

export interface Entry {
  id: number;
  /** YYYY-MM-DD بتوقيت الرياض — جاهز للعرض مباشرة */
  spent_at: string | null;
  amount: number;
  currency: string;
  direction: Direction;
  category: string;
  vendor: string;
  note: string;
  raw_text: string;
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
  by_category: CategoryTotal[];
}

export interface ListData {
  currency: string;
  entries: Entry[];
  totals: Totals;
}

export interface AddData {
  entry: Entry;
}

/**
 * شكل الرد الموحّد من العقد. `success` هو الفيصل — وليس رمز HTTP،
 * لأن فشل التحليل خطأ مستخدم يُعرض كما هو.
 */
export type ApiResult<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: string };
