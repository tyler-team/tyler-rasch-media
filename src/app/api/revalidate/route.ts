import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const querySecret = url.searchParams.get("secret");
    const headerSecret = req.headers.get("x-sanity-webhook-secret");
    const authHeader = req.headers.get("authorization");
    const bearerSecret = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    const providedSecret = querySecret || headerSecret || bearerSecret;
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

    if (expectedSecret && providedSecret !== expectedSecret) {
      return NextResponse.json({ message: "Invalid revalidation secret" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const slug = typeof body?.slug === "string" ? body.slug : body?.slug?.current;
    const docType = body?._type;

    // 1. Tag-based invalidation
    try {
      revalidateTag("press", "default");
    } catch {
      // In some Next.js versions tag invalidation without profile
      try {
        // @ts-ignore
        revalidateTag("press");
      } catch {
        // Continue if tag invalidation is no-op
      }
    }

    try {
      revalidateTag("blog", "default");
    } catch {
      try {
        // @ts-ignore
        revalidateTag("blog");
      } catch {}
    }

    // 2. Path-based invalidation for instant update
    revalidatePath("/ko/press");
    revalidatePath("/en/press");
    revalidatePath("/press");
    revalidatePath("/blog");
    revalidatePath("/");
    revalidatePath("/en");

    if (slug) {
      revalidatePath(`/ko/press/${slug}`);
      revalidatePath(`/en/press/${slug}`);
      revalidatePath(`/blog/${slug}`);
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: Date.now(),
      documentType: docType || "all",
      slug: slug || null,
    });
  } catch (err: any) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { message: "Error revalidating", error: err?.message || String(err) },
      { status: 500 }
    );
  }
}

// Also support GET for simple manual browser testing e.g. /api/revalidate?secret=xyz
export async function GET(req: NextRequest) {
  return POST(req);
}
