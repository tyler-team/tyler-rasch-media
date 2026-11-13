"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BlogPost } from "../../../lib/sanity";
import SanityBlockRenderer from "../../../components/SanityBlockRenderer";
import SubpageHeader from "../../../components/SubpageHeader";
import CorporateFooter from "../../../components/CorporateFooter";

export default function BlogArticleClient({ post }: { post: BlogPost }) {
  const [lang, setLang] = useState<"KR" | "EN">("KR");

  return (
    <div className="min-h-screen bg-[#02060C] text-zinc-300 font-sans selection:bg-accent selection:text-black word-keep-all overflow-x-hidden">
      <SubpageHeader lang={lang} onLangChange={setLang} activeSection="blog" />

      {/* Main Content Layout */}
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto">
        <div className="space-y-12">
          <Link href="/blog" className="min-h-[44px] text-xs font-bold text-zinc-400 hover:text-accent transition-colors inline-flex items-center gap-2">
            &larr; {lang === "KR" ? "블로그 목록으로 돌아가기" : "Back to Essays"}
          </Link>

          <header className="space-y-4 pb-8 border-b border-white/10">
            <div className="flex justify-between items-center text-xs text-zinc-400 font-mono">
              <span className="uppercase tracking-widest text-accent text-[10px] font-bold">
                {lang === "KR" ? post.category.KR : post.category.EN}
              </span>
              <span>{post.date}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight break-keep">
              {lang === "KR" ? post.title.KR : post.title.EN}
            </h1>
            <div className="text-xs text-zinc-400 font-mono">
              By {post.author}
            </div>
          </header>

          <article className="space-y-8 text-zinc-300 text-base leading-relaxed break-keep">
            <p className="font-bold text-white text-lg leading-relaxed bg-white/[0.02] border-l-2 border-accent p-4 rounded-r-xl">
              {lang === "KR" ? post.excerpt.KR : post.excerpt.EN}
            </p>

            <SanityBlockRenderer blocks={lang === "KR" ? post.body.KR : post.body.EN} />
          </article>
        </div>

        <CorporateFooter lang={lang} className="mt-24" />
      </main>
    </div>
  );
}

