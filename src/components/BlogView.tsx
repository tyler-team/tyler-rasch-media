"use client";

import React from "react";
import { BlogPost, blogPosts } from "../data/blogData";

interface BlogViewProps {
  lang: "KR" | "EN";
}

export default function BlogView({ lang }: BlogViewProps) {
  return (
    <section className="relative min-h-screen py-32 px-8 md:px-20 bg-[#02060C] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8">
          <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-2">Blogs & Essays</span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {lang === "KR" ? "블로그 & 에세이" : "Blogs & Essays"}
          </h1>
          <p className="text-zinc-500 text-sm mt-3">
            {lang === "KR" 
              ? "글로벌 정세, 거시 경제 및 기술 혁신과 관련된 지적 분석 컬럼과 인사이트 에세이 피드입니다."
              : "Analytical columns, macroeconomic insights, and technology reports by Tyler Rasch."}
          </p>
        </div>

        {/* Chronological List */}
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl hover:border-accent/20 hover:bg-white/[0.02] transition-all duration-300">
              <div className="flex justify-between items-center mb-3">
                <time className="text-zinc-600 font-mono text-xs block" dateTime={post.date}>
                  {post.date}
                </time>
                <span className="text-accent text-xs font-mono tracking-widest uppercase border border-accent/20 px-2.5 py-0.5 rounded-full">
                  {post.category[lang]}
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 hover:text-accent transition-colors leading-snug">
                <a href={`/blog/${post.slug}`}>{post.title[lang]}</a>
              </h2>

              <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-6">
                {post.excerpt[lang]}
              </p>

              <a
                href={`/blog/${post.slug}`}
                className="text-xs font-bold text-accent hover:underline flex items-center gap-1.5"
              >
                {lang === "KR" ? "에세이 전문 읽기" : "Read Full Essay"} &rarr;
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
