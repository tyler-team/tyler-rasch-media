import React from "react";
import { getPressReleases } from "../../../lib/sanity";
import { pressReleases as staticPressReleases } from "../../../data/pressData";
import EnPressPageClient from "./EnPressPageClient";

export default async function EnPressPage() {
  let releases = await getPressReleases();

  // Fallback to static press releases if CMS has no records yet
  if (!releases || releases.length === 0) {
    releases = staticPressReleases;
  }

  return <EnPressPageClient initialReleases={releases} />;
}
