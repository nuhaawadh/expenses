import { NextResponse } from "next/server";
import { SESSION_COOKIE, cookieOptions } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST فقط: خروج عبر GET يسمح بإخراج المستخدم برابط في صفحة أخرى */
export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url), 303);
  response.cookies.set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  return response;
}
