import type { Metadata } from "next";
import Home from "../page";
import { getPressReleases } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Press Room & EPK | Tyler Rasch (타일러 라쉬)",
  description:
    "Official Press Room, Electronic Press Kit (EPK), press releases, and downloadable media assets for Tyler Rasch and Tyler Media.",
  alternates: {
    canonical: "https://www.tylerrasch.com/press",
    languages: {
      "ko-KR": "https://www.tylerrasch.com/ko/press",
      "en-US": "https://www.tylerrasch.com/en/press",
      "x-default": "https://www.tylerrasch.com/en/press",
    },
  },
  openGraph: {
    title: "Press Room & EPK | Tyler Rasch (타일러 라쉬)",
    description:
      "Official Press Room, Electronic Press Kit (EPK), press releases, and downloadable media assets for Tyler Rasch and Tyler Media.",
    url: "https://www.tylerrasch.com/press",
    type: "website",
  },
};

export default async function EmbeddedPressPage() {
  const releases = await getPressReleases();
  return <Home initialView="press" releases={releases} />;
}

