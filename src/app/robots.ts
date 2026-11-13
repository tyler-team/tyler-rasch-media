import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/1BWS", "/1BWS/", "/1bws", "/1bws/", "/1BWS_EP21", "/1BWS_EP21/", "/1bws_EP21", "/1bws_EP21/", "/1bws_ep21", "/1bws_ep21/", "/1BWS_EP19", "/1BWS_EP19/", "/1bws_EP19", "/1bws_EP19/", "/1bWS_EP19", "/1bWS_EP19/", "/1bws_ep19", "/1bws_ep19/", "/1BWS_EP18", "/1BWS_EP18/", "/1bws_EP18", "/1bws_EP18/", "/1bws_ep18", "/1bws_ep18/", "/1BWS_EP20", "/1BWS_EP20/", "/1bws_EP20", "/1bws_EP20/", "/1bWS_EP20", "/1bWS_EP20/", "/1bws_ep20", "/1bws_ep20/", "/1BWS_EP18_2", "/1BWS_EP18_2/", "/1bws_EP18_2", "/1bws_EP18_2/", "/1bws_ep18_2", "/1bws_ep18_2/"],
    },
    sitemap: "https://www.tylerrasch.com/sitemap.xml",
  };
}
