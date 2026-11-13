"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BlogPost, blogPosts as staticBlogPosts } from "../data/blogData";
import { getBlogPosts } from "../lib/sanity";
import CorporateFooter from "./CorporateFooter";

interface BlogViewProps {
  lang: "KR" | "EN";
}

export default function BlogView({ lang }: BlogViewProps) {
  const [posts, setPosts] = useState<BlogPost[]>(staticBlogPosts);

  useEffect(() => {
    async function loadPosts() {
      try {
        const cmsPosts = await getBlogPosts();
        if (cmsPosts && cmsPosts.length > 0) {
          setPosts(cmsPosts);
        }
      } catch (err) {
        console.error("Failed to load blog posts from Sanity CMS, using static fallback:", err);
      }
    }
    loadPosts();
  }, []);

  return (
    <section className="relative min-h-screen py-24 md:py-32 px-6 md:px-16 lg:px-20 bg-[#02060C] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8">
          <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-2">Blogs &amp; Essays</span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {lang === "KR" ? "블로그 & 에세이" : "Blogs & Essays"}
          </h1>
          <p className="text-zinc-400 text-sm mt-3">
            {lang === "KR" 
              ? "글로벌 정세, 거시 경제 및 기술 혁신과 관련된 지적 분석 컬럼과 인사이트 에세이 피드입니다."
              : "Analytical columns, macroeconomic insights, and technology reports by Tyler Rasch."}
          </p>
        </div>

        {/* Chronological List */}
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="p-6 sm:p-8 bg-white/[0.025] border border-white/10 rounded-3xl hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-300">
              <div className="flex justify-between items-center mb-3 gap-2 flex-wrap">
                <time className="text-zinc-400 font-mono text-xs block" dateTime={post.date}>
                  {post.date}
                </time>
                <span className="text-accent text-xs font-mono tracking-widest uppercase border border-accent/20 px-2.5 py-0.5 rounded-full">
                  {post.category[lang]}
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 hover:text-accent transition-colors leading-snug break-keep">
                <Link href={`/blog/${post.slug}`}>{post.title[lang]}</Link>
              </h2>

              {post.excerpt[lang] && (
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 break-keep">
                  {post.excerpt[lang]}
                </p>
              )}

              <Link
                href={`/blog/${post.slug}`}
                className="min-h-[36px] text-xs font-bold text-accent hover:underline inline-flex items-center gap-1.5"
              >
                {lang === "KR" ? "에세이 전문 읽기" : "Read Full Essay"} &rarr;
              </Link>
            </article>
          ))}
        </div>

        <CorporateFooter lang={lang} className="mt-24" />
      </div>
    </section>
  );
}
