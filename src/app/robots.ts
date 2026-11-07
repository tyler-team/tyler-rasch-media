import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/1BWS", "/1BWS/", "/1bws", "/1bws/", "/buyeuropean", "/buyeuropean/", "/BuyEuropean", "/BuyEuropean/"],
    },
    sitemap: "https://www.tylerrasch.com/sitemap.xml",
  };
}
