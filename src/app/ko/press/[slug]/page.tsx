import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPressReleases, getPressReleaseBySlug, urlFor } from "@/lib/sanity";
import KoPressArticleClient from "@/components/KoPressArticleClient";

type PageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = true;

export async function generateStaticParams() {
  const releases = await getPressReleases();
  return releases.filter((r) => r.lang === "ko").map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const release = await getPressReleaseBySlug(slug, "ko");
  if (!release) return { title: "보도자료를 찾을 수 없습니다 | 타일러 미디어" };

  const description = release.intro5W1H || release.subtitle || `${release.title} - 타일러 미디어 공식 보도자료`;
  const canonicalUrl = `https://www.tylerrasch.com/ko/press/${release.slug}`;
  const ogImage = release.ogImageSource
    ? urlFor(release.ogImageSource).width(1200).height(630).fit("crop").auto("format").url()
    : release.ogImageUrl || "https://www.tylerrasch.com/og-press-default.jpg";

  const alternatesLanguages: Record<string, string> | undefined = release.translatedSlug
    ? {
        "ko-KR": release.lang === "ko" ? canonicalUrl : `https://www.tylerrasch.com/ko/press/${release.translatedSlug}`,
        "en-US": release.lang === "en" ? canonicalUrl : `https://www.tylerrasch.com/en/press/${release.translatedSlug}`,
        "x-default": release.lang === "en" ? canonicalUrl : `https://www.tylerrasch.com/en/press/${release.translatedSlug}`,
      }
    : undefined;

  return {
    title: `${release.title} | 타일러 미디어 뉴스룸`,
    description: description.slice(0, 160),
    alternates: { canonical: canonicalUrl, languages: alternatesLanguages },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: canonicalUrl,
      siteName: "Tyler Media (타일러 미디어)",
      title: release.title,
      description: description.slice(0, 160),
      publishedTime: new Date(release.date).toISOString(),
      modifiedTime: release._updatedAt || new Date(release.date).toISOString(),
      authors: ["Tyler Rasch", "Tyler Media Communications"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: release.title }],
    },
    twitter: { card: "summary_large_image", title: release.title, description: description.slice(0, 160), images: [ogImage] },
  };
}

export default async function KoPressArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const allReleases = await getPressReleases();
  const release = allReleases.find((r) => r.slug === slug && r.lang === "ko") || allReleases.find((r) => r.slug === slug);
  if (!release) notFound();

  const plainTextBody = Array.isArray(release.body)
    ? release.body
        .map((b: any) => (typeof b === "string" ? b : b._type === "textBlock" ? b.text : ""))
        .filter(Boolean)
        .join("\n\n")
    : "";

  const ogImage = release.ogImageSource
    ? urlFor(release.ogImageSource).width(1200).height(630).fit("crop").auto("format").url()
    : release.ogImageUrl || "https://www.tylerrasch.com/og-press-default.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: release.title,
    alternativeHeadline: release.subtitle || undefined,
    description: release.intro5W1H || release.subtitle || release.title,
    articleBody: plainTextBody,
    datePublished: new Date(release.date).toISOString(),
    dateModified: release._updatedAt || new Date(release.date).toISOString(),
    inLanguage: "ko-KR",
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.tylerrasch.com/ko/press/${release.slug}` },
    image: [ogImage],
    author: { "@type": "Person", name: "Tyler Rasch", url: "https://www.tylerrasch.com" },
    publisher: { "@type": "Organization", name: "Tyler Media (KNMIR INC)", url: "https://www.tylerrasch.com", logo: { "@type": "ImageObject", url: "https://www.tylerrasch.com/logo.png" } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <KoPressArticleClient allReleases={allReleases} release={release} />
    </>
  );
}
