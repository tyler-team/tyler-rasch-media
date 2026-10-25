import { MetadataRoute } from "next";
import { getPressReleases } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.tylerrasch.com";
  const releases = await getPressReleases();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/ko/press`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/en/press`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
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

  return [...staticRoutes, ...pressRoutes];
}
