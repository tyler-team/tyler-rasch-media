import React from "react";
import { Metadata } from "next";
import { getPressReleases, getPressReleaseBySlug } from "../../../../lib/sanity";
import { notFound } from "next/navigation";
import EnPressArticleClient from "./EnPressArticleClient";

export async function generateStaticParams() {
  const releases = await getPressReleases();
  return releases
    .filter((pr) => pr.lang === "en")
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
  const release = await getPressReleaseBySlug(slug, "en");

  if (!release) {
    return {
      title: "Press Release Not Found | Tyler Media",
    };
  }

  const title = `${release.title} | Tyler Media Press Room`;
  const description =
    release.intro5W1H ||
    release.subtitle ||
    (typeof release.body?.[0] === "string"
      ? release.body[0]
      : "Official press release and announcement from Tyler Media.");
  const canonicalUrl = `https://www.tylerrasch.com/en/press/${release.slug}`;
  const targetSlug = release.translatedSlug || release.translationSlug;
  const ogImage = release.ogImageUrl || "https://www.tylerrasch.com/headshots/tyler_suit_thinking.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: targetSlug
        ? {
            "ko-KR": `https://www.tylerrasch.com/ko/press/${targetSlug}`,
          }
        : undefined,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Tyler Media",
      locale: "en_US",
      type: "article",
      publishedTime: release.date,
      authors: [release.byline || "Tyler Media PR"],
      images: [
        {
          url: ogImage,
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
      images: [ogImage],
    },
  };
}

export default async function EnPressArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const release = await getPressReleaseBySlug(slug, "en");
  if (!release) notFound();

  const ogImage = release.ogImageUrl || "https://www.tylerrasch.com/headshots/tyler_suit_thinking.jpg";

  // Google News compliant NewsArticle JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: release.title,
    description:
      release.intro5W1H ||
      release.subtitle ||
      (typeof release.body?.[0] === "string" ? release.body[0] : release.title),
    datePublished: release.date,
    dateModified: release._updatedAt || release.date,
    inLanguage: "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.tylerrasch.com/en/press/${release.slug}`,
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
    image: [ogImage],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EnPressArticleClient release={release} />
    </>
  );
}
