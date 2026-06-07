"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BlogPost } from "../../../lib/sanity";

export default function BlogArticleClient({ post }: { post: BlogPost }) {
  const [lang, setLang] = useState<"KR" | "EN">("KR");

  return (
    <div className="min-h-screen bg-[#02060C] text-zinc-300 font-sans selection:bg-accent selection:text-black word-keep-all">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#02060C]/90 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6 md:px-12">
        <a href="/" className="font-black text-xl tracking-tighter leading-none text-white hover:opacity-80 transition-opacity">
          TYLER <span className="text-accent">MEDIA</span>
        </a>
        <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-full relative w-24">
          <motion.div
            animate={{ x: lang === "EN" ? "100%" : "0%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] bg-accent rounded-full"
          />
          <button
            onClick={() => setLang("KR")}
            className={`relative z-10 flex-1 py-1 text-xs font-black transition-colors ${lang === "KR" ? "text-black" : "text-zinc-500"}`}
          >
            KR
          </button>
          <button
            onClick={() => setLang("EN")}
            className={`relative z-10 flex-1 py-1 text-xs font-black transition-colors ${lang === "EN" ? "text-black" : "text-zinc-500"}`}
          >
            EN
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="pt-32 pb-32 px-6 md:px-12 max-w-3xl mx-auto">
        <div className="space-y-12">
          <a href="/blog" className="text-xs font-bold text-zinc-500 hover:text-accent transition-colors flex items-center gap-2">
            &larr; 블로그 목록으로 돌아가기 (Back to Blog)
          </a>

          <header className="space-y-4 pb-8 border-b border-white/10">
            <div className="flex justify-between items-center text-xs text-zinc-500 font-mono">
              <span className="uppercase tracking-widest text-accent text-[10px] font-bold">
                {lang === "KR" ? post.category.KR : post.category.EN}
              </span>
              <span>{post.date}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight break-keep">
              {lang === "KR" ? post.title.KR : post.title.EN}
            </h1>
            <div className="text-xs text-zinc-500 font-mono">
              By {post.author}
            </div>
          </header>

          <article className="space-y-8 text-zinc-300 text-base leading-relaxed break-keep">
            <p className="font-bold text-white text-lg leading-relaxed bg-white/[0.01] border-l-2 border-accent p-4 rounded-r-xl">
              {lang === "KR" ? post.excerpt.KR : post.excerpt.EN}
            </p>

            {(lang === "KR" ? post.body.KR : post.body.EN).map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </article>
        </div>
      </main>
    </div>
  );
}
