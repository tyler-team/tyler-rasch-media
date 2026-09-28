"use client";

import React from "react";
import { motion } from "framer-motion";
import { blogPosts } from "../data/blogData";
import { pressReleases } from "../data/pressData";

export default function PressBlogSection({ lang = "KR" }: { lang?: "KR" | "EN" }) {
  const targetLang = (lang === "EN" ? "en" : "ko") as "en" | "ko";
  const latestPress = pressReleases.filter(pr => pr.lang === targetLang).slice(0, 2);
  const latestBlogs = blogPosts.slice(0, 2);

  return (
    <section className="relative py-32 px-8 md:px-20 border-b border-white/5 overflow-hidden bg-white/[0.005]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[300px] bg-accent/2 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-none uppercase tracking-tighter italic">
              Newsroom & Insights
            </h2>
            <p className="text-accent text-sm font-mono tracking-widest uppercase mt-4">
              {lang === "KR" ? "최신 공식 보도자료 및 글로벌 지적 에세이" : "Latest Press Releases & Analytical Essays"}
            </p>
          </div>
          <div className="w-20 h-1 bg-accent/30 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Column 1: Press Release Portal */}
          <div className="space-y-8">
            <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full" />
                {lang === "KR" ? "보도자료 (PRESS RELEASE)" : "PRESS RELEASE"}
              </h3>
              <div className="flex gap-4 text-xs font-bold font-mono">
                <a href={lang === "KR" ? "/press" : "/en/press"} className="text-zinc-500 hover:text-accent transition-colors">
                  {lang === "KR" ? "뉴스룸 바로가기 →" : "VIEW NEWSROOM →"}
                </a>
              </div>
            </div>

            <div className="space-y-6">
              {latestPress.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-accent/20 transition-all hover:bg-white/[0.02] duration-300 flex flex-col justify-between gap-4 group"
                >
                  <div>
                    <div className="flex justify-between items-center text-xs text-zinc-500 font-mono mb-2">
                      <span>{item.date}</span>
                      <span className="uppercase tracking-widest text-accent text-[9px] border border-accent/25 px-1.5 py-0.5 rounded">
                        {lang === "KR" ? "공식 보도" : "OFFICIAL"}
                      </span>
                    </div>
                    <a
                      href={item.lang === "ko" ? `/ko/press/${item.slug}` : `/en/press/${item.slug}`}
                      className="text-base font-bold text-white group-hover:text-accent transition-colors leading-snug break-keep block mb-2"
                    >
                      {item.title}
                    </a>
                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 break-keep">
                      {item.subtitle || item.body[0]}
                    </p>
                  </div>

                  <a
                    href={item.lang === "ko" ? `/ko/press/${item.slug}` : `/en/press/${item.slug}`}
                    className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors flex items-center gap-2"
                  >
                    {lang === "KR" ? "보도자료 전문 읽기 →" : "Read Release →"}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Blog Commentary Portal */}
          <div className="space-y-8">
            <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-accent/60 rounded-full" />
                {lang === "KR" ? "인사이트 & 에세이" : "COMMENTARY & ESSAYS"}
              </h3>
              <a href="/blog" className="text-xs font-bold font-mono text-zinc-500 hover:text-accent transition-colors">
                {lang === "KR" ? "에세이 바로가기 →" : "VIEW ESSAYS →"}
              </a>
            </div>

            <div className="space-y-6">
              {latestBlogs.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-accent/20 transition-all hover:bg-white/[0.02] duration-300 flex flex-col justify-between gap-4 group"
                >
                  <div>
                    <div className="flex justify-between items-center text-xs text-zinc-500 font-mono mb-2">
                      <span>{item.date}</span>
                      <span className="uppercase tracking-widest text-[9px] text-zinc-400">
                        {item.category[lang]}
                      </span>
                    </div>
                    <a
                      href={`/blog/${item.slug}`}
                      className="text-base font-bold text-white group-hover:text-accent transition-colors leading-snug break-keep block mb-2"
                    >
                      {item.title[lang]}
                    </a>
                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 break-keep">
                      {item.excerpt[lang]}
                    </p>
                  </div>

                  <a
                    href={`/blog/${item.slug}`}
                    className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors flex items-center gap-2"
                  >
                    {lang === "KR" ? "에세이 전문 읽기 →" : "Read Essay →"}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
