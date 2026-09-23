import { NextResponse } from "next/server";
import { validate, type BookingRequest } from "@/lib/booking";
import { site } from "@/lib/site";

/**
 * Receives booking requests from the form and forwards them to
 * BOOKING_WEBHOOK_URL (e.g. an n8n webhook), with BOOKING_WEBHOOK_SECRET
 * sent as `x-booking-secret`. Neither value ever reaches the browser.
 */
export async function POST(req: Request) {
  let body: Partial<BookingRequest>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Bots fill every field; quietly accept and drop.
  if (body.fax) return NextResponse.json({ ok: true });

  const errors = validate(body);
  if (Object.keys(errors).length) return NextResponse.json({ error: "invalid", fields: errors }, { status: 400 });

  const url = process.env.BOOKING_WEBHOOK_URL;
  if (!url) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const trim = (v?: string) => (v ?? "").trim().slice(0, 2000);
  const payload = {
    date: body.date,
    time: body.time,
    timeZone: site.booking.timeZone,
    name: trim(body.name),
    email: trim(body.email),
    phone: trim(body.phone),
    company: trim(body.company),
    website: trim(body.website),
    teamSize: trim(body.teamSize),
    message: trim(body.message),
    locale: body.locale === "en" ? "en" : "ar",
    submittedAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.BOOKING_WEBHOOK_SECRET ? { "x-booking-secret": process.env.BOOKING_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return NextResponse.json({ error: "upstream" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
