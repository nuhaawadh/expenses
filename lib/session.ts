import { cookies } from "next/headers";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * جلسة موقّعة داخل كوكي، بلا أي حزمة خارجية.
 *
 * الكوكي = payload.signature حيث التوقيع HMAC-SHA256 بمفتاح من البيئة.
 * المتصفح يقدر يقرأ المحتوى لكن ما يقدر يزوّره بلا المفتاح — وهذا يكفي
 * لأن الكوكي لا يحمل أسراراً، فقط هوية المستخدم.
 */

export const SESSION_COOKIE = "dftr_session";
export const STATE_COOKIE = "dftr_state";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // ثلاثون يوماً

export interface Session {
  /** معرّف Google الثابت — لا يتغيّر ولو غيّر المستخدم بريده */
  sub: string;
  email: string;
  name: string;
  exp: number;
}

function secret(): string {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) {
    throw new Error("AUTH_SECRET غير مضبوط أو أقصر من 32 حرفاً");
  }
  return value;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function encodeSession(data: Omit<Session, "exp">): string {
  const session: Session = {
    ...data,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function decodeSession(token: string | undefined): Session | null {
  if (!token) return null;

  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;

  const payload = token.slice(0, dot);
  const given = Buffer.from(token.slice(dot + 1));
  const expected = Buffer.from(sign(payload));

  // مقارنة ثابتة الزمن: المقارنة العادية تسرّب طول البادئة المطابقة
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString(),
    ) as Session;

    if (!session?.sub || typeof session.exp !== "number") return null;
    if (session.exp < Math.floor(Date.now() / 1000)) return null;

    return session;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const jar = await cookies();
  return decodeSession(jar.get(SESSION_COOKIE)?.value);
}

export function newState(): string {
  return randomBytes(24).toString("base64url");
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
};
