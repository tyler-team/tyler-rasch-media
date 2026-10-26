import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { pressReleases as staticPressReleases, PressRelease } from "@/data/pressData";
import { blogPosts as staticBlogPosts, BlogPost } from "@/data/blogData";

export { type PressRelease } from "@/data/pressData";
export { type BlogPost } from "@/data/blogData";

export const sanityClient = createClient({
  projectId: "ix8f0bbf",
  dataset: "production",
  apiVersion: "2026-06-07",
  useCdn: typeof window !== "undefined",
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

const BLOG_POST_GROQ = `
  *[_type == "blogPost" && defined(slug.current) && !(_id in path("drafts.**"))] | order(date desc) {
    _id,
    _updatedAt,
    "slug": slug.current,
    date,
    author,
    category,
    "title": blogTitle,
    excerpt,
    body,
    "ogImageSource": coalesce(body.KR[_type == "image"][0], body.EN[_type == "image"][0]),
    "ogImageUrl": coalesce(body.KR[_type == "image"][0].asset->url, body.EN[_type == "image"][0].asset->url)
  }
`;

// In-memory client-side deduplication cache (60s TTL) to prevent redundant browser API calls
let clientPressCache: { data: PressRelease[]; expiresAt: number } | null = null;
let clientPressInFlight: Promise<PressRelease[]> | null = null;
let clientBlogCache: { data: BlogPost[]; expiresAt: number } | null = null;
let clientBlogInFlight: Promise<BlogPost[]> | null = null;
const CLIENT_CACHE_TTL_MS = 60_000;

export async function getPressReleases(): Promise<PressRelease[]> {
  if (typeof window !== "undefined") {
    if (clientPressCache && Date.now() < clientPressCache.expiresAt) {
      return clientPressCache.data;
    }
    if (clientPressInFlight) {
      return clientPressInFlight;
    }
  }

  const fetchPromise = (async () => {
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

      const result = [...cmsReleases, ...mergedStatic].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      if (typeof window !== "undefined") {
        clientPressCache = { data: result, expiresAt: Date.now() + CLIENT_CACHE_TTL_MS };
      }
      return result;
    } catch (error) {
      console.error("[Sanity Fetch Error] Falling back to staticPressReleases:", error);
      return staticPressReleases;
    } finally {
      if (typeof window !== "undefined") {
        clientPressInFlight = null;
      }
    }
  })();

  if (typeof window !== "undefined") {
    clientPressInFlight = fetchPromise;
  }
  return fetchPromise;
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

// Fetch all blog posts with draft filtering, deduplication, and fallback
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (typeof window !== "undefined") {
    if (clientBlogCache && Date.now() < clientBlogCache.expiresAt) {
      return clientBlogCache.data;
    }
    if (clientBlogInFlight) {
      return clientBlogInFlight;
    }
  }

  const fetchPromise = (async () => {
    try {
      const cmsPosts = await sanityClient.fetch<BlogPost[]>(
        BLOG_POST_GROQ,
        {},
        {
          next: { tags: ["blog"] },
        }
      );

      if (!cmsPosts || cmsPosts.length === 0) {
        return staticBlogPosts;
      }

      const cmsSlugs = new Set(cmsPosts.map((p) => p.slug));
      const mergedStatic = staticBlogPosts.filter((sp) => !cmsSlugs.has(sp.slug));

      const result = [...cmsPosts, ...mergedStatic].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      if (typeof window !== "undefined") {
        clientBlogCache = { data: result, expiresAt: Date.now() + CLIENT_CACHE_TTL_MS };
      }
      return result;
    } catch (error) {
      console.error("[Sanity Fetch Error] Falling back to staticBlogPosts:", error);
      return staticBlogPosts;
    } finally {
      if (typeof window !== "undefined") {
        clientBlogInFlight = null;
      }
    }
  })();

  if (typeof window !== "undefined") {
    clientBlogInFlight = fetchPromise;
  }
  return fetchPromise;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const allPosts = await getBlogPosts();
  return allPosts.find((p) => p.slug === slug) || null;
}
