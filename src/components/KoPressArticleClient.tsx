"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PressRelease } from "@/data/pressData";
import SanityBlockRenderer, { renderFormattedText } from "./SanityBlockRenderer";

const CATEGORY_LABELS_KR: Record<string, string> = {
  episode: "1BWS 에피소드",
  "1BWS Episode": "1BWS 에피소드",
  interview: "독점 인터뷰",
  partnership: "기업·파트너십",
  sme: "중소기업·스타트업 상생",
};

export default function KoPressArticleClient({
  release,
  allReleases,
}: {
  release: PressRelease;
  allReleases?: PressRelease[];
}) {
  const [lang, setLang] = useState<"KR" | "EN">("KR");

  const targetEnSlug =
    release.translatedSlug ||
    allReleases?.find(
      (pr) =>
        pr.lang === "en" &&
        (pr.slug === release.slug ||
          pr.slug === `${release.slug}-en` ||
          pr.translatedSlug === release.slug)
    )?.slug;

  const enSwitchHref = targetEnSlug ? `/en/press/${targetEnSlug}` : "/en/press";

  const handleLangToggle = (targetLang: "KR" | "EN") => {
    setLang(targetLang);
    if (targetLang === "EN") {
      window.location.href = enSwitchHref;
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
          <a
            href={enSwitchHref}
            onClick={(e) => {
              e.preventDefault();
              handleLangToggle("EN");
            }}
            className={`relative z-10 flex-1 py-1 text-xs font-black text-center transition-colors ${lang === "EN" ? "text-black" : "text-zinc-500"}`}
          >
            EN
          </a>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="pt-32 pb-32 px-6 md:px-12 max-w-3xl mx-auto">
        <a href="/ko/press" className="text-xs font-bold text-zinc-500 hover:text-accent transition-colors flex items-center gap-2 mb-8">
          &larr; 보도자료 목록으로 돌아가기
        </a>

        {/* Article header */}
        <header className="space-y-6 mb-12 pb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            <time className="text-zinc-500 font-mono text-xs block" dateTime={release.date}>
              배포일시: {release.date}
            </time>
            {release.category && CATEGORY_LABELS_KR[release.category] && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent border border-accent/30 px-2.5 py-0.5 rounded-full">
                {CATEGORY_LABELS_KR[release.category]}
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
            {release.title}
          </h1>
          {release.subtitle && (
            <h2 className="text-lg text-zinc-400 font-semibold leading-relaxed">
              - {release.subtitle}
            </h2>
          )}
          {release.highlights && release.highlights.length > 0 && (
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                핵심 요약 (Executive Highlights)
              </div>
              <ul className="space-y-2 text-sm text-zinc-200 font-medium leading-relaxed">
                {release.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-accent font-bold mt-0.5">•</span>
                    <span>{renderFormattedText(h)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {release.byline && (
            <div className="text-xs text-zinc-500 italic font-mono pt-2">
              {release.byline}
            </div>
          )}
        </header>

        {/* Article content */}
        <article className="space-y-8 text-zinc-300 text-base leading-relaxed">
          {release.heroImage?.asset &&
            !release.body?.some(
              (b: any) =>
                b?._type === "image" &&
                b?.asset?._ref &&
                b?.asset?._ref === release.heroImage?.asset?._ref
            ) && (
              <SanityBlockRenderer block={{ ...release.heroImage, _type: "image" }} />
            )}

          {release.intro5W1H && (
            <p className="font-bold text-white text-lg leading-relaxed bg-white/[0.01] border-l-2 border-accent p-4 rounded-r-xl">
              {release.intro5W1H}
            </p>
          )}

          <SanityBlockRenderer blocks={release.body} />

          {release.youtubeUrl &&
            !release.body?.some(
              (b: any) => b?._type === "videoEmbed" && b?.url === release.youtubeUrl
            ) && (
              <SanityBlockRenderer
                block={{
                  _type: "videoEmbed",
                  url: release.youtubeUrl,
                  caption: release.youtubeCaption,
                }}
              />
            )}

          {release.boilerplate && (
            <div className="mt-16 p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">[회사 소개 및 미디어 연락처]</h4>
              <div className="text-zinc-400 text-xs leading-relaxed whitespace-pre-line">
                {renderFormattedText(release.boilerplate)}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
