import { NextResponse } from "next/server";
import { STATE_COOKIE, cookieOptions, newState } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** يبدأ تسجيل الدخول: يولّد state ويحوّل المستخدم إلى Google */
export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const appUrl = process.env.APP_URL;

  if (!clientId || !appUrl) {
    console.error("[auth] GOOGLE_CLIENT_ID أو APP_URL غير مضبوط");
    return NextResponse.redirect(new URL("/login?e=config", request.url));
  }

  // state عشوائي يُحفظ في كوكي ويُقارن عند العودة — يمنع تزوير الطلب (CSRF)
  const state = newState();

  const authorize = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", `${appUrl}/api/auth/callback`);
  authorize.searchParams.set("response_type", "code");
  authorize.searchParams.set("scope", "openid email profile");
  authorize.searchParams.set("state", state);
  authorize.searchParams.set("prompt", "select_account");

  const response = NextResponse.redirect(authorize);
  response.cookies.set(STATE_COOKIE, state, { ...cookieOptions, maxAge: 600 });
  return response;
}
