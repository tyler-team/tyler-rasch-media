import React from "react";
import { getBlogPosts } from "../../../lib/sanity";
import { blogPosts as staticBlogPosts } from "../../../data/blogData";
import { notFound } from "next/navigation";
import BlogArticleClient from "./BlogArticleClient";

async function getPosts() {
  const posts = await getBlogPosts();
  return posts && posts.length > 0 ? posts : staticBlogPosts;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogArticleClient post={post} />;
}
