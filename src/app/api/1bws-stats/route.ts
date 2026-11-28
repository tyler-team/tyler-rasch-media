import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";

export const revalidate = 300; // Revalidate every 5 minutes

const SITE_METRICS_GROQ = `*[_type == "siteMetrics" && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0] {
  subscribersKo,
  subscribersEn,
  views90dKo,
  views90dEn,
  decisionMakersPct,
  retentionPct,
  updatedAt
}`;

const FEATURED_VIDEO_ID = "dUWffWSGPwQ";
const CHANNEL_ID = "UCHKDlM4UOmtEBhwDTg8lqJQ";

function formatKoViews(views: number): string {
  if (views >= 10000) {
    const man = (views / 10000).toFixed(1).replace(/\.0$/, "");
    return `조회수 ${man}만회`;
  }
  return `조회수 ${views.toLocaleString("ko-KR")}회`;
}

function formatEnViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(2).replace(/\.00$/, "")}M Views`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1).replace(/\.0$/, "")}K Views`;
  }
  return `${views.toLocaleString("en-US")} Views`;
}

export async function GET() {
  try {
    const [resKo, resEn] = await Promise.all([
      fetch(`https://www.youtube.com/watch?v=${FEATURED_VIDEO_ID}`, {
        headers: {
          "Accept-Language": "ko-KR,ko;q=0.9",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        },
        next: { revalidate: 300 },
      }),
      fetch(`https://www.youtube.com/watch?v=${FEATURED_VIDEO_ID}`, {
        headers: {
          "Accept-Language": "en-US,en;q=0.9",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        },
        next: { revalidate: 300 },
      }),
    ]);

    const [htmlKo, htmlEn] = await Promise.all([resKo.text(), resEn.text()]);

    const subKoMatch = htmlKo.match(
      /"subscriberCountText":\{"accessibility":\{"accessibilityData":\{"label":"([^"]+)"\}\},"simpleText":"([^"]+)"\}/
    );
    const subEnMatch = htmlEn.match(
      /"subscriberCountText":\{"accessibility":\{"accessibilityData":\{"label":"([^"]+)"\}\},"simpleText":"([^"]+)"\}/
    );
    const viewCountMatch = htmlKo.match(/"viewCount":"(\d+)"/);

    // e.g. "구독자 88만명" -> "88만+"
    const rawSubKo = subKoMatch ? subKoMatch[2] : "구독자 88만명";
    const subDisplayKo = rawSubKo
      .replace(/^구독자\s*/, "")
      .replace(/명$/, "+");

    // e.g. "880K subscribers" -> "880K+"
    const rawSubEn = subEnMatch ? subEnMatch[2] : "880K subscribers";
    const subDisplayEn = rawSubEn.replace(/\s*subscribers$/i, "+");

    const rawViews = viewCountMatch ? Number(viewCountMatch[1]) : 157597;

    let cmsMetrics: any = null;
    try {
      cmsMetrics = await sanityClient.fetch(SITE_METRICS_GROQ, {}, { next: { revalidate: 300 } });
    } catch (_) {
      cmsMetrics = null;
    }

    return NextResponse.json(
      {
        ok: true,
        channelId: CHANNEL_ID,
        featuredVideoId: FEATURED_VIDEO_ID,
        subscribers: {
          ko: cmsMetrics?.subscribersKo || subDisplayKo,
          en: cmsMetrics?.subscribersEn || subDisplayEn,
          rawKo: rawSubKo,
          rawEn: rawSubEn,
        },
        featuredVideoViews: {
          raw: rawViews,
          ko: formatKoViews(rawViews),
          en: formatEnViews(rawViews),
        },
        kpis: {
          views90d: {
            ko: cmsMetrics?.views90dKo || "3,550만+",
            en: cmsMetrics?.views90dEn || "35.5M+",
          },
          decisionMakersPct: cmsMetrics?.decisionMakersPct || "69.8%",
          retentionPct: cmsMetrics?.retentionPct || "60.6%",
        },
        updatedAt: cmsMetrics?.updatedAt || new Date().toISOString(),
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          "X-Robots-Tag": "noindex, nofollow",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        subscribers: { ko: "88만+", en: "880K+" },
        featuredVideoViews: {
          raw: 157597,
          ko: "조회수 15.8만회",
          en: "157.6K Views",
        },
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
