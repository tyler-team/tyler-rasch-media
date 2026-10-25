import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type: string;
  slug?: { current?: string };
  lang?: "ko" | "en";
  translatedSlug?: string;
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return new NextResponse("Missing SANITY_REVALIDATE_SECRET", { status: 500 });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret);
    if (!isValidSignature) {
      return new NextResponse(JSON.stringify({ message: "Invalid signature" }), { status: 401 });
    }
    if (!body?._type) {
      return new NextResponse(JSON.stringify({ message: "Bad Request" }), { status: 400 });
    }

    try {
      revalidateTag("press", "default");
    } catch {
      (revalidateTag as any)("press");
    }
    revalidatePath("/");
    revalidatePath("/en");
    revalidatePath("/ko/press");
    revalidatePath("/en/press");
    revalidatePath("/sitemap.xml");

    if (body.slug?.current) {
      revalidatePath(`/ko/press/${body.slug.current}`);
      revalidatePath(`/en/press/${body.slug.current}`);
    }
    if (body.translatedSlug) {
      revalidatePath(`/ko/press/${body.translatedSlug}`);
      revalidatePath(`/en/press/${body.translatedSlug}`);
    }

    return NextResponse.json({ revalidated: true, now: Date.now(), slug: body.slug?.current ?? null });
  } catch (err: any) {
    console.error("[Webhook Error]:", err);
    return new NextResponse(err.message, { status: 500 });
  }
}
