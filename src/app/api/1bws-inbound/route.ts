import { NextRequest, NextResponse } from "next/server";

const ALLOWED_DESKS = new Set(["tips", "careers", "b2b", "newsletter"]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const desk = String(body?.desk || "").toLowerCase();
    if (!ALLOWED_DESKS.has(desk)) {
      return NextResponse.json(
        { ok: false, error: "Invalid inbound desk" },
        { status: 400 }
      );
    }

    const payload = {
      source: "1bws-portal",
      desk,
      submittedAt: new Date().toISOString(),
      data: body?.data || {},
    };

    let forwarded = false;
    const webhookUrl = process.env.N8N_1BWS_INBOUND_WEBHOOK_URL;
    if (webhookUrl) {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      forwarded = res.ok;
    }

    return NextResponse.json(
      { ok: true, desk, forwarded, receivedAt: payload.submittedAt },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-Robots-Tag": "noindex, nofollow",
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Invalid request payload" },
      { status: 400 }
    );
  }
}
