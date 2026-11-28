import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";

export const revalidate = 60;

const DISCIPLINE_META: Record<
  string,
  { tagClass: string; ko: string; en: string }
> = {
  macro: { tagClass: "cat-macro", ko: "거시경제 · 자본시장", en: "Macroeconomics & Capital" },
  geopolitics: { tagClass: "cat-geo", ko: "지정학 · 외교안보", en: "Geopolitics & Statecraft" },
  tech: { tagClass: "cat-tech", ko: "기술 · 에너지 공급망", en: "Tech & Energy Grids" },
  history: { tagClass: "cat-history", ko: "역사 · 사료 아카이브", en: "History & Archives" },
};

const REGION_META: Record<string, { ko: string; en: string }> = {
  "north-america": { ko: "북미 (North America)", en: "North America" },
  "europe-me": { ko: "유럽 · 중동 (Europe & ME)", en: "Europe & Middle East" },
  "asia-korea": { ko: "아시아 · 한국 (Asia & Korea)", en: "Asia & Korea" },
  "global-south": { ko: "글로벌 사우스 (Global South)", en: "Global South" },
};

const PUBLISHED_DOSSIERS_GROQ = `
  *[_type == "dossier" && status == "published" && !(_id in path("drafts.**"))] | order(coalesce(date, _createdAt) desc, dossierNo desc) {
    _id,
    dossierNo,
    lang,
    status,
    discipline,
    region,
    "date": coalesce(date, string::split(_createdAt, "T")[0]),
    readTime,
    title,
    thesis,
    summary,
    mechanismSteps,
    bodySections,
    mlaCitations,
    linkedYoutubeId
  }
`;

const UNLISTED_PREVIEW_GROQ = `
  *[_type == "dossier" && dossierNo == $dossierNo && previewToken == $previewToken && status in ["unlisted", "published"] && !(_id in path("drafts.**"))][0] {
    _id,
    dossierNo,
    lang,
    status,
    discipline,
    region,
    "date": coalesce(date, string::split(_createdAt, "T")[0]),
    readTime,
    title,
    thesis,
    summary,
    mechanismSteps,
    bodySections,
    mlaCitations,
    linkedYoutubeId
  }
`;

function normalizeDossier(doc: any) {
  const topic = DISCIPLINE_META[doc.discipline] ? doc.discipline : "macro";
  const region = REGION_META[doc.region] ? doc.region : "north-america";
  const lang = doc.lang === "en" ? "en" : "ko";
  const disc = DISCIPLINE_META[topic];
  const reg = REGION_META[region];
  const dateDisplay = String(doc.date || "").slice(0, 10).replace(/-/g, ".");

  const sections = Array.isArray(doc.bodySections) ? doc.bodySections : [];
  const bodyHtml = sections
    .map((sec: any) => {
      const h = sec?.heading ? `<h4>${String(sec.heading)}</h4>` : "";
      const p = sec?.paragraph ? `<p>${String(sec.paragraph)}</p>` : "";
      return `${h}${p}`;
    })
    .join("");

  return {
    id: `sanity-${doc._id}`,
    dossierNo: doc.dossierNo || "",
    code: `DOSSIER NO. ${doc.dossierNo || "2026-XX"}`,
    lang,
    status: doc.status || "published",
    isUnlistedPreview: doc.status === "unlisted",
    topic,
    topicLabel: { ko: disc.ko, en: disc.en },
    tagClass: disc.tagClass,
    region,
    regionLabel: { ko: reg.ko, en: reg.en },
    date: dateDisplay,
    readTime: doc.readTime || "10 MIN READ",
    title: doc.title || "",
    thesis: doc.thesis || "",
    summary: doc.summary || "",
    mechanismSteps: Array.isArray(doc.mechanismSteps) ? doc.mechanismSteps : [],
    bodyHtml,
    mlaSources: Array.isArray(doc.mlaCitations) ? doc.mlaCitations : [],
    linkedYoutubeId: doc.linkedYoutubeId || "",
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dossierNo = searchParams.get("dossier")?.trim() || "";
  const previewToken = searchParams.get("preview")?.trim() || "";

  try {
    const publishedDocs = await sanityClient.fetch<any[]>(
      PUBLISHED_DOSSIERS_GROQ,
      {},
      { next: { revalidate: 60, tags: ["dossier"] } }
    );

    const items = (publishedDocs || []).map(normalizeDossier);

    let previewItem = null;
    if (dossierNo && previewToken) {
      const rawPreview = await sanityClient.fetch<any>(
        UNLISTED_PREVIEW_GROQ,
        { dossierNo, previewToken },
        { cache: "no-store" }
      );
      if (rawPreview) {
        previewItem = normalizeDossier(rawPreview);
      }
    }

    const headers: Record<string, string> = {
      "Access-Control-Allow-Origin": "*",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": previewToken
        ? "no-store, max-age=0"
        : "public, s-maxage=60, stale-while-revalidate=300",
    };

    return NextResponse.json(
      { ok: true, count: items.length, items, previewItem },
      { headers }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message || "Failed to load dossiers",
        items: [],
        previewItem: null,
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-Robots-Tag": "noindex, nofollow",
        },
      }
    );
  }
}
