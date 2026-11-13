import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/1BWS", "/1BWS/", "/1bws", "/1bws/", "/1BWS_EP21", "/1BWS_EP21/", "/1bws_ep21", "/1bws_ep21/", "/1BWS_EP19", "/1BWS_EP19/", "/1bws_ep19", "/1bws_ep19/", "/1bws-EP18", "/1bws-EP18/", "/1bws-ep18", "/1bws-ep18/", "/1BWS-EP18", "/1BWS-EP18/", "/1BWS_EP18", "/1BWS_EP18/", "/1bws_ep18", "/1bws_ep18/"],
    },
    sitemap: "https://www.tylerrasch.com/sitemap.xml",
  };
}
