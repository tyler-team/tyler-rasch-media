import React from "react";
import { Metadata } from "next";
import { getPressReleases } from "../../../lib/sanity";
import { pressReleases as staticPressReleases } from "../../../data/pressData";
import EnPressPageClient from "./EnPressPageClient";

export const metadata: Metadata = {
  title: "Press Room & Media Kit | Tyler Media",
  description:
    "Official announcements, corporate releases, downloadable press kit (EPK), and media inquiries for Tyler Media.",
  alternates: {
    canonical: "https://www.tylerrasch.com/en/press",
    languages: {
      "ko-KR": "https://www.tylerrasch.com/ko/press",
    },
  },
  openGraph: {
    title: "Press Room & Media Kit | Tyler Media",
    description:
      "Official announcements, corporate releases, downloadable press kit (EPK), and media inquiries for Tyler Media.",
    url: "https://www.tylerrasch.com/en/press",
    siteName: "Tyler Media",
    locale: "en_US",
    type: "website",
  },
};

export default async function EnPressPage() {
  let releases = await getPressReleases();

  // Fallback to static press releases if CMS has no records yet
  if (!releases || releases.length === 0) {
    releases = staticPressReleases;
  }

  return <EnPressPageClient initialReleases={releases} />;
}
