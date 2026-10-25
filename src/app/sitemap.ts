import { MetadataRoute } from "next";
import { getPressReleases, getBlogPosts } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.tylerrasch.com";
  const [releases, blogPosts] = await Promise.all([
    getPressReleases(),
    getBlogPosts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/ko/press`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/en/press`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/en/media-kit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/press`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/sme-startup-program`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];

  const pressRoutes: MetadataRoute.Sitemap = releases.map((release) => {
    const langPrefix = release.lang === "en" ? "en" : "ko";
    return {
      url: `${baseUrl}/${langPrefix}/press/${release.slug}`,
      lastModified: release._updatedAt ? new Date(release._updatedAt) : new Date(release.date),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...pressRoutes, ...blogRoutes];
}
