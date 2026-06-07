import React from "react";
import { getPressReleases } from "../../../../lib/sanity";
import { pressReleases as staticPressReleases } from "../../../../data/pressData";
import { notFound } from "next/navigation";
import EnPressArticleClient from "./EnPressArticleClient";

async function getReleases() {
  const releases = await getPressReleases();
  return releases && releases.length > 0 ? releases : staticPressReleases;
}

export async function generateStaticParams() {
  const releases = await getReleases();
  return releases.filter((pr) => pr.lang === "en").map((release) => ({
    slug: release.slug,
  }));
}

export default async function EnPressArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const releases = await getReleases();
  const release = releases.find((pr) => pr.slug === slug && pr.lang === "en");
  if (!release) notFound();
  return <EnPressArticleClient release={release} />;
}
