import React from "react";
import { pressReleases } from "../../../../data/pressData";
import { notFound } from "next/navigation";
import KoPressArticleClient from "./KoPressArticleClient";

export async function generateStaticParams() {
  return pressReleases.filter((pr) => pr.lang === "ko").map((release) => ({
    slug: release.slug,
  }));
}

export default async function KoPressArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const release = pressReleases.find((pr) => pr.slug === slug && pr.lang === "ko");
  if (!release) notFound();
  return <KoPressArticleClient release={release} />;
}
