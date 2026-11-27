import { NextResponse } from "next/server";
import { getPressReleases, isEnglishPressRelease } from "@/lib/sanity";

export const revalidate = 60;

export async function GET() {
  try {
    const releases = await getPressReleases();
    const items = (releases || []).map((pr: any) => {
      const isEn = isEnglishPressRelease(pr);
      const lang = isEn ? "en" : "ko";
      const slug = pr.slug || "";
      return {
        id: pr._id || slug,
        slug,
        lang,
        category: pr.category || "episode",
        date: (pr.date || "").slice(0, 10).replace(/-/g, "."),
        isoDate: (pr.date || "").slice(0, 10),
        title: pr.title || "",
        subtitle: pr.subtitle || "",
        highlights: Array.isArray(pr.highlights) ? pr.highlights : [],
        intro5W1H: pr.intro5W1H || "",
        heroImageUrl: pr.heroImageUrl || pr.ogImageUrl || "",
        youtubeUrl: pr.youtubeUrl || "",
        url: `/${lang}/press/${slug}`,
      };
    });

    return NextResponse.json(
      { ok: true, count: items.length, items },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Failed to load press releases", items: [] },
      { status: 500 }
    );
  }
}
