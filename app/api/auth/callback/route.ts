import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  STATE_COOKIE,
  cookieOptions,
  encodeSession,
} from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface GoogleClaims {
  sub?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  aud?: string;
  iss?: string;
}

/** يفكّ حمولة JWT بلا تحقق من التوقيع — انظر الملاحظة في الأسفل */
function readClaims(idToken: string): GoogleClaims | null {
  try {
    const payload = idToken.split(".")[1];
    if (!payload) return null;
    return JSON.parse(Buffer.from(payload, "base64url").toString()) as GoogleClaims;
  } catch {
    return null;
  }
}

function deny(request: Request, reason: string) {
  return NextResponse.redirect(new URL(`/login?e=${reason}`, request.url));
}

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const appUrl = process.env.APP_URL;

  if (!clientId || !clientSecret || !appUrl) {
    console.error("[auth] إعدادات Google ناقصة");
    return deny(request, "config");
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (url.searchParams.get("error")) return deny(request, "denied");
  if (!code || !state) return deny(request, "bad_request");

  const jar = await cookies();
  const savedState = jar.get(STATE_COOKIE)?.value;
  if (!savedState || savedState !== state) return deny(request, "state");

  let claims: GoogleClaims | null = null;

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: `${appUrl}/api/auth/callback`,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    });

    const payload = (await tokenResponse.json()) as { id_token?: string };
    if (!tokenResponse.ok || !payload.id_token) {
      console.error("[auth] فشل تبادل الرمز، الحالة:", tokenResponse.status);
      return deny(request, "exchange");
    }

    /*
     * لا نتحقق من توقيع الـ id_token لأنه لم يمر عبر المتصفح إطلاقاً:
     * جاء في رد مباشر من نقطة Google عبر TLS، في تبادل خادمي يحمل
     * client_secret. ومع ذلك نتحقق من aud و iss احتياطاً.
     */
    claims = readClaims(payload.id_token);
  } catch (error) {
    console.error("[auth] تعذّر الاتصال بـ Google:", error);
    return deny(request, "network");
  }

  if (!claims?.sub) return deny(request, "claims");
  if (claims.aud !== clientId) return deny(request, "aud");
  if (claims.iss !== "https://accounts.google.com" && claims.iss !== "accounts.google.com") {
    return deny(request, "iss");
  }
  if (claims.email && claims.email_verified === false) return deny(request, "unverified");

  console.log("[auth] دخول:", claims.sub, claims.email);

  const response = NextResponse.redirect(new URL("/", request.url));

  response.cookies.set(
    SESSION_COOKIE,
    encodeSession({
      sub: claims.sub,
      email: claims.email ?? "",
      name: claims.name ?? "",
    }),
    { ...cookieOptions, maxAge: SESSION_MAX_AGE },
  );

  response.cookies.set(STATE_COOKIE, "", { ...cookieOptions, maxAge: 0 });

  return response;
}
