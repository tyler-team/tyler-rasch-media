import React from "react";
import { Metadata } from "next";
import { getPressReleases } from "../../../../lib/sanity";
import { pressReleases as staticPressReleases } from "../../../../data/pressData";
import { notFound } from "next/navigation";
import KoPressArticleClient from "./KoPressArticleClient";

async function getReleases() {
  const releases = await getPressReleases();
  return releases && releases.length > 0 ? releases : staticPressReleases;
}

export async function generateStaticParams() {
  const releases = await getReleases();
  return releases
    .filter((pr) => pr.lang === "ko")
    .map((release) => ({
      slug: release.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const releases = await getReleases();
  const release = releases.find((pr) => pr.slug === slug && pr.lang === "ko");

  if (!release) {
    return {
      title: "보도자료를 찾을 수 없습니다 | Tyler Media",
    };
  }

  const title = `${release.title} | Tyler Media Newsroom`;
  const description =
    release.intro5W1H || release.subtitle || "타일러 미디어 공식 보도자료 및 공지사항입니다.";
  const canonicalUrl = `https://www.tylerrasch.com/ko/press/${release.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: release.translationSlug
        ? {
            "en-US": `https://www.tylerrasch.com/en/press/${release.translationSlug}`,
          }
        : undefined,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Tyler Media",
      locale: "ko_KR",
      type: "article",
      publishedTime: release.date,
      authors: [release.byline || "Tyler Media PR"],
      images: [
        {
          url: "https://www.tylerrasch.com/headshots/tyler_suit_thinking.jpg",
          width: 1200,
          height: 630,
          alt: release.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.tylerrasch.com/headshots/tyler_suit_thinking.jpg"],
    },
  };
}

export default async function KoPressArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const releases = await getReleases();
  const release = releases.find((pr) => pr.slug === slug && pr.lang === "ko");
  if (!release) notFound();

  // Google News compliant NewsArticle JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: release.title,
    description: release.intro5W1H || release.subtitle || release.title,
    datePublished: release.date,
    dateModified: release.date,
    inLanguage: "ko-KR",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.tylerrasch.com/ko/press/${release.slug}`,
    },
    author: [
      {
        "@type": "Person",
        name: release.byline || "Tyler Media PR",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Tyler Media (KNMIR INC)",
      logo: {
        "@type": "ImageObject",
        url: "https://www.tylerrasch.com/headshots/tyler_suit_thinking.jpg",
      },
    },
    image: ["https://www.tylerrasch.com/headshots/tyler_suit_thinking.jpg"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <KoPressArticleClient release={release} />
    </>
  );
}
