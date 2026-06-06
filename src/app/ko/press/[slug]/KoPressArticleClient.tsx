"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PressRelease, pressReleases } from "../../../../data/pressData";

export default function KoPressArticleClient({ release }: { release: PressRelease }) {
  const [lang, setLang] = useState<"KR" | "EN">("KR");

  const handleLangToggle = (targetLang: "KR" | "EN") => {
    setLang(targetLang);
    if (targetLang === "EN") {
      const enRelease = pressReleases.find((pr) => pr.slug === release.slug && pr.lang === "en");
      if (enRelease) {
        window.location.href = `/en/press/${release.slug}`;
      } else {
        window.location.href = "/en/press";
      }
    }
  };

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
            onClick={() => handleLangToggle("KR")}
            className={`relative z-10 flex-1 py-1 text-xs font-black transition-colors ${lang === "KR" ? "text-black" : "text-zinc-500"}`}
          >
            KR
          </button>
          <button
            onClick={() => handleLangToggle("EN")}
            className={`relative z-10 flex-1 py-1 text-xs font-black transition-colors ${lang === "EN" ? "text-black" : "text-zinc-500"}`}
          >
            EN
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="pt-32 pb-32 px-6 md:px-12 max-w-3xl mx-auto">
        <a href="/ko/press" className="text-xs font-bold text-zinc-500 hover:text-accent transition-colors flex items-center gap-2 mb-8">
          &larr; 보도자료 목록으로 돌아가기
        </a>

        {/* Article header */}
        <header className="space-y-6 mb-12 pb-8 border-b border-white/10">
          <time className="text-zinc-500 font-mono text-xs block" dateTime={release.date}>
            배포일시: {release.date}
          </time>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
            {release.title}
          </h1>
          {release.subtitle && (
            <h2 className="text-lg text-zinc-400 font-semibold leading-relaxed">
              - {release.subtitle}
            </h2>
          )}
          {release.byline && (
            <div className="text-xs text-zinc-500 italic font-mono pt-2">
              {release.byline}
            </div>
          )}
        </header>

        {/* Article content */}
        <article className="space-y-8 text-zinc-300 text-base leading-relaxed">
          {release.intro5W1H && (
            <p className="font-bold text-white text-lg leading-relaxed bg-white/[0.01] border-l-2 border-accent p-4 rounded-r-xl">
              {release.intro5W1H}
            </p>
          )}

          {release.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {release.boilerplate && (
            <div className="mt-16 p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">[회사 소개 보일러플레이트]</h4>
              <p className="text-zinc-400 text-xs leading-relaxed">{release.boilerplate}</p>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
