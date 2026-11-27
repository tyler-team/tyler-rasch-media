import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/1BWS", "/1BWS/", "/1bws", "/1bws/", "/1BWS_EP18", "/1BWS_EP18/", "/1bws_EP18", "/1bws_EP18/", "/1bWS_EP18", "/1bWS_EP18/", "/1bws_ep18", "/1bws_ep18/", "/1BWS_EP21", "/1BWS_EP21/", "/1bws_EP21", "/1bws_EP21/", "/1bWS_EP21", "/1bWS_EP21/", "/1bws_ep21", "/1bws_ep21/", "/1BWS_EP22", "/1BWS_EP22/", "/1bws_EP22", "/1bws_EP22/", "/1bWS_EP22", "/1bWS_EP22/", "/1bws_ep22", "/1bws_ep22/", "/1BWS_EP23", "/1BWS_EP23/", "/1bws_EP23", "/1bws_EP23/", "/1bWS_EP23", "/1bWS_EP23/", "/1bws_ep23", "/1bws_ep23/", "/1BWS_EP25", "/1BWS_EP25/", "/1bws_EP25", "/1bws_EP25/", "/1bWS_EP25", "/1bWS_EP25/", "/1bws_ep25", "/1bws_ep25/"],
    },
    sitemap: "https://www.tylerrasch.com/sitemap.xml",
  };
}
