import type { MetadataRoute } from "next";
import { getPressReleases, getBlogPosts } from "../lib/sanity";
import { pressReleases as staticPressReleases } from "../data/pressData";
import { blogPosts as staticBlogPosts } from "../data/blogData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.tylerrasch.com";
  const now = new Date();

  // Core static landing pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ko/press`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/press`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sme-startup-program`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Fetch Press Releases (with fallback)
  let pressList = staticPressReleases;
  try {
    const cmsReleases = await getPressReleases();
    if (cmsReleases && cmsReleases.length > 0) {
      pressList = cmsReleases;
    }
  } catch (e) {
    console.error("Sitemap failed to fetch press releases from CMS:", e);
  }

  const pressRoutes: MetadataRoute.Sitemap = pressList.map((release) => {
    const prefix = release.lang === "en" ? "/en/press" : "/ko/press";
    return {
      url: `${baseUrl}${prefix}/${release.slug}`,
      lastModified: release.date ? new Date(release.date) : now,
      changeFrequency: "weekly",
      priority: 0.85,
    };
  });

  // Fetch Blog Posts (with fallback)
  let blogList = staticBlogPosts;
  try {
    const cmsBlogs = await getBlogPosts();
    if (cmsBlogs && cmsBlogs.length > 0) {
      blogList = cmsBlogs;
    }
  } catch (e) {
    console.error("Sitemap failed to fetch blogs from CMS:", e);
  }

  const blogRoutes: MetadataRoute.Sitemap = blogList.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...pressRoutes, ...blogRoutes];
}
