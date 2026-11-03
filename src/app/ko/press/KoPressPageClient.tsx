"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PressRelease, getPressReleases, isKoreanPressRelease } from "../../../lib/sanity";

const CATEGORY_LABELS_KR: Record<string, string> = {
  episode: "1BWS 에피소드",
  interview: "독점 인터뷰",
  partnership: "기업·파트너십",
  sme: "중소기업·스타트업 상생",
};

const getSnippet = (release: PressRelease) => {
  if (release.intro5W1H) return release.intro5W1H;
  if (release.highlights && release.highlights.length > 0) return release.highlights.join(" · ");
  if (release.subtitle) return release.subtitle;
  const firstText = release.body?.find(
    (b: any) => typeof b === "string" || b?._type === "textBlock"
  );
  if (!firstText) return "";
  if (typeof firstText === "string") return firstText;
  if (firstText._type === "textBlock") return firstText.text;
  return "";
};

export default function KoPressPageClient({ initialReleases }: { initialReleases: PressRelease[] }) {
  const [lang, setLang] = useState<"KR" | "EN">("KR");
  const [releases, setReleases] = useState<PressRelease[]>(initialReleases);

  useEffect(() => {
    let mounted = true;
    getPressReleases()
      .then((fresh) => {
        if (mounted && fresh && fresh.length > 0) {
          setReleases(fresh);
        }
      })
      .catch(console.error);
    return () => {
      mounted = false;
    };
  }, []);

  const koReleases = releases.filter((pr) => isKoreanPressRelease(pr));

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
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <time className="text-zinc-600 font-mono text-xs block" dateTime={release.date}>
                  {release.date}
                </time>
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent border border-accent/25 px-2.5 py-0.5 rounded-full">
                  {release.category && CATEGORY_LABELS_KR[release.category]
                    ? CATEGORY_LABELS_KR[release.category]
                    : "공식 보도자료"}
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 hover:text-accent transition-colors leading-snug">
                <Link href={`/ko/press/${release.slug}`}>{release.title}</Link>
              </h2>

              {release.subtitle && (
                <p className="text-zinc-400 text-sm mb-4 font-medium leading-relaxed">
                  {release.subtitle}
                </p>
              )}

              <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-6">
                {getSnippet(release)}
              </p>

              <Link
                href={`/ko/press/${release.slug}`}
                className="text-xs font-bold text-accent hover:underline flex items-center gap-1.5"
              >
                보도자료 전문 읽기 &rarr;
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
