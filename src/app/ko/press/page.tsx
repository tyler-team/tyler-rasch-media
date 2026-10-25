import React from "react";
import { Metadata } from "next";
import { getPressReleases } from "../../../lib/sanity";
import { pressReleases as staticPressReleases } from "../../../data/pressData";
import KoPressPageClient from "./KoPressPageClient";

export const metadata: Metadata = {
  title: "보도자료 (Press Releases) | Tyler Media",
  description: "타일러 미디어의 국내 공식 발표 자료 및 미디어 보도 인덱스 피드입니다.",
  alternates: {
    canonical: "https://www.tylerrasch.com/ko/press",
    languages: {
      "en-US": "https://www.tylerrasch.com/en/press",
    },
  },
  openGraph: {
    title: "보도자료 (Press Releases) | Tyler Media",
    description: "타일러 미디어의 국내 공식 발표 자료 및 미디어 보도 인덱스 피드입니다.",
    url: "https://www.tylerrasch.com/ko/press",
    siteName: "Tyler Media",
    locale: "ko_KR",
    type: "website",
  },
};

export default async function KoPressPage() {
  let releases = await getPressReleases();

  // Fallback to static press releases if CMS has no records yet
  if (!releases || releases.length === 0) {
    releases = staticPressReleases;
  }

  return <KoPressPageClient initialReleases={releases} />;
}
