import React from "react";
import { pressReleases } from "../../../../data/pressData";
import { notFound } from "next/navigation";
import EnPressArticleClient from "./EnPressArticleClient";

export async function generateStaticParams() {
  return pressReleases.filter((pr) => pr.lang === "en").map((release) => ({
    slug: release.slug,
  }));
}

export default async function EnPressArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const release = pressReleases.find((pr) => pr.slug === slug && pr.lang === "en");
  if (!release) notFound();
  return <EnPressArticleClient release={release} />;
}
