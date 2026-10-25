import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "Insights & Columns (블로그 및 칼럼) | Tyler Rasch (타일러 라쉬)",
  description:
    "In-depth columns, global macro analysis, cross-cultural communication insights, and essays by Tyler Rasch and Tyler Media.",
  alternates: {
    canonical: "https://www.tylerrasch.com/blog",
  },
  openGraph: {
    title: "Insights & Columns (블로그 및 칼럼) | Tyler Rasch (타일러 라쉬)",
    description:
      "In-depth columns, global macro analysis, cross-cultural communication insights, and essays by Tyler Rasch and Tyler Media.",
    url: "https://www.tylerrasch.com/blog",
    type: "website",
  },
};

export default function EmbeddedBlogPage() {
  return <Home initialView="blog" />;
}

