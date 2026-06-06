import React from "react";
import { blogPosts } from "../../../data/blogData";
import { notFound } from "next/navigation";
import BlogArticleClient from "./BlogArticleClient";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogArticleClient post={post} />;
}
