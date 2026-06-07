import React from "react";
import { getPressReleases } from "../../../lib/sanity";
import { pressReleases as staticPressReleases } from "../../../data/pressData";
import KoPressPageClient from "./KoPressPageClient";

export default async function KoPressPage() {
  let releases = await getPressReleases();
  
  // Fallback to static press releases if CMS has no records yet
  if (!releases || releases.length === 0) {
    releases = staticPressReleases;
  }

  return <KoPressPageClient initialReleases={releases} />;
}
