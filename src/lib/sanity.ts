import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { pressReleases as staticPressReleases, PressRelease } from "@/data/pressData";

export { type PressRelease } from "@/data/pressData";

export const sanityClient = createClient({
  projectId: "ix8f0bbf",
  dataset: "production",
  apiVersion: "2026-06-07",
  useCdn: false,
  perspective: "published",
});

const builder = createImageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);

export type SanityContentBlock =
  | string
  | {
      _type: "textBlock";
      text: string;
    }
  | {
      _type: "image";
      asset: { _ref: string; _type: string };
      caption?: string;
      alt?: string;
    }
  | {
      _type: "videoEmbed";
      url: string;
      caption?: string;
    };

export interface BlogPost {
  slug: string;
  date: string;
  author: string;
  category: {
    KR: string;
    EN: string;
  };
  title: {
    KR: string;
    EN: string;
  };
  excerpt: {
    KR: string;
    EN: string;
  };
  body: {
    KR: SanityContentBlock[];
    EN: SanityContentBlock[];
  };
}

const PRESS_RELEASE_GROQ = `
  *[_type == "pressRelease" && defined(slug.current) && !(_id in path("drafts.**"))] | order(date desc) {
    _id,
    _updatedAt,
    "slug": slug.current,
    date,
    lang,
    title,
    subtitle,
    byline,
    intro5W1H,
    body,
    boilerplate,
    "translatedSlug": coalesce(
      translationRef->slug.current,
      *[_type == "pressRelease" && !(_id in path("drafts.**")) && translationRef._ref == ^._id][0].slug.current
    ),
    "translationSlug": coalesce(
      translationRef->slug.current,
      *[_type == "pressRelease" && !(_id in path("drafts.**")) && translationRef._ref == ^._id][0].slug.current
    ),
    "translatedLang": coalesce(
      translationRef->lang,
      *[_type == "pressRelease" && !(_id in path("drafts.**")) && translationRef._ref == ^._id][0].lang
    ),
    "ogImageSource": body[_type == "image"][0],
    "ogImageUrl": body[_type == "image"][0].asset->url
  }
`;

export async function getPressReleases(): Promise<PressRelease[]> {
  try {
    const cmsReleases = await sanityClient.fetch<PressRelease[]>(
      PRESS_RELEASE_GROQ,
      {},
      {
        next: {
          tags: ["press"],
        },
      }
    );

    if (!cmsReleases || cmsReleases.length === 0) {
      return staticPressReleases;
    }

    const cmsSlugs = new Set(cmsReleases.map((r) => `${r.lang}:${r.slug}`));
    const mergedStatic = staticPressReleases.filter(
      (sr) => !cmsSlugs.has(`${sr.lang}:${sr.slug}`)
    );

    return [...cmsReleases, ...mergedStatic].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("[Sanity Fetch Error] Falling back to staticPressReleases:", error);
    return staticPressReleases;
  }
}

export async function getPressReleaseBySlug(
  slug: string,
  lang: "ko" | "en"
): Promise<PressRelease | null> {
  const allReleases = await getPressReleases();
  return (
    allReleases.find((r) => r.slug === slug && r.lang === lang) ||
    allReleases.find((r) => r.slug === slug) ||
    null
  );
}

// Fetch all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost"] | order(date desc) {
    "slug": slug.current,
    date,
    author,
    category,
    "title": blogTitle,
    excerpt,
    body
  }`;
  return await sanityClient.fetch(query, {}, {
    next: { tags: ["blog"] },
  });
}
