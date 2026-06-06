"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { pressReleases } from "../../../data/pressData";

export default function KoPressPage() {
  const [lang, setLang] = useState<"KR" | "EN">("KR");
  const koReleases = pressReleases.filter((pr) => pr.lang === "ko");

  const handleLangToggle = (targetLang: "KR" | "EN") => {
    setLang(targetLang);
    if (targetLang === "EN") {
      window.location.href = "/en/press";
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

      {/* Main Content */}
      <main className="pt-32 pb-32 px-6 md:px-12 max-w-4xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8">
          <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-2">Press & Media</span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            보도자료 (Press Releases)
          </h1>
          <p className="text-zinc-500 text-sm mt-3">타일러 미디어의 국내 공식 발표 자료 및 보도 인덱스 피드입니다.</p>
        </div>

        {/* Chronological List */}
        <div className="space-y-8">
          {koReleases.map((release) => (
            <article key={release.slug} className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl hover:border-accent/20 hover:bg-white/[0.02] transition-all duration-300">
              <time className="text-zinc-600 font-mono text-xs block mb-3" dateTime={release.date}>
                {release.date}
              </time>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 hover:text-accent transition-colors leading-snug">
                <a href={`/ko/press/${release.slug}`}>{release.title}</a>
              </h2>

              {release.subtitle && (
                <p className="text-zinc-400 text-sm mb-4 font-medium leading-relaxed">
                  {release.subtitle}
                </p>
              )}

              <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-6">
                {release.intro5W1H}
              </p>

              <a
                href={`/ko/press/${release.slug}`}
                className="text-xs font-bold text-accent hover:underline flex items-center gap-1.5"
              >
                보도자료 전문 읽기 &rarr;
              </a>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
