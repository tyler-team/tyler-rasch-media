import React from "react";
import { Metadata } from "next";
import { getBlogPosts, getBlogPostBySlug, urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import BlogArticleClient from "./BlogArticleClient";

type PageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "에세이를 찾을 수 없습니다 | 타일러 미디어",
    };
  }

  const title = `${post.title.KR} | Tyler Media Insights`;
  const description = post.excerpt.KR || post.excerpt.EN || `${post.title.KR} - 타일러 미디어 공식 에세이`;
  const canonicalUrl = `https://www.tylerrasch.com/blog/${post.slug}`;
  const ogImage = post.ogImageSource
    ? urlFor(post.ogImageSource).width(1200).height(630).fit("crop").auto("format").url()
    : post.ogImageUrl || "https://www.tylerrasch.com/og-press-default.jpg";

  return {
    title,
    description: description.slice(0, 160),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      alternateLocale: ["en_US"],
      url: canonicalUrl,
      siteName: "Tyler Media (타일러 미디어)",
      title: post.title.KR,
      description: description.slice(0, 160),
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: post._updatedAt || new Date(post.date).toISOString(),
      authors: [post.author || "Tyler Rasch"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title.KR,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.KR,
      description: description.slice(0, 160),
      images: [ogImage],
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const plainTextBodyKR = Array.isArray(post.body?.KR)
    ? post.body.KR.map((b: any) => (typeof b === "string" ? b : b._type === "textBlock" ? b.text : ""))
        .filter(Boolean)
        .join("\n\n")
    : "";

  const ogImage = post.ogImageSource
    ? urlFor(post.ogImageSource).width(1200).height(630).fit("crop").auto("format").url()
    : post.ogImageUrl || "https://www.tylerrasch.com/og-press-default.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.KR,
    alternativeHeadline: post.title.EN || undefined,
    description: post.excerpt.KR || post.excerpt.EN || post.title.KR,
    articleBody: plainTextBodyKR,
    datePublished: new Date(post.date).toISOString(),
    dateModified: post._updatedAt || new Date(post.date).toISOString(),
    inLanguage: ["ko-KR", "en-US"],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.tylerrasch.com/blog/${post.slug}`,
    },
    image: [ogImage],
    author: {
      "@type": "Person",
      name: post.author || "Tyler Rasch",
      url: "https://www.tylerrasch.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Tyler Media (KNMIR INC)",
      url: "https://www.tylerrasch.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.tylerrasch.com/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleClient post={post} />
    </>
  );
}
