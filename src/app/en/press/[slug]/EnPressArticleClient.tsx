"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PressRelease } from "../../../../lib/sanity";
import SanityBlockRenderer, { renderFormattedText } from "../../../../components/SanityBlockRenderer";

export default function EnPressArticleClient({ release }: { release: PressRelease }) {
  const [lang, setLang] = useState<"KR" | "EN">("EN");

  const handleLangToggle = (targetLang: "KR" | "EN") => {
    setLang(targetLang);
    if (targetLang === "KR") {
      const targetSlug = release.translatedSlug || release.translationSlug;
      if (targetSlug) {
        window.location.href = `/ko/press/${targetSlug}`;
      } else {
        window.location.href = "/ko/press";
      }
    }
  };

  // Determine main body blocks and boilerplate
  const legacyAboutIndex = release.body.findIndex((p) => p === "About Tyler Media");
  const mainContent = legacyAboutIndex !== -1 ? release.body.slice(0, legacyAboutIndex) : release.body;

  // Boilerplate fallback from legacy array if not in top-level field
  let fallbackBoilerplate = "";
  if (legacyAboutIndex !== -1) {
    const section = release.body.slice(legacyAboutIndex);
    fallbackBoilerplate = section.map((item) => (typeof item === "string" ? item : "")).join("\n\n");
  }
  const effectiveBoilerplate = release.boilerplate || fallbackBoilerplate;

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
        <a href="/en/press" className="text-xs font-bold text-zinc-500 hover:text-accent transition-colors flex items-center gap-2 mb-8">
          &larr; Back to Newsroom
        </a>

        {/* Article header */}
        <header className="space-y-6 mb-12 pb-8 border-b border-white/10">
          <time className="text-zinc-500 font-mono text-xs block" dateTime={release.date}>
            Published Date: {release.date}
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

          {mainContent.map((block, index) => (
            <SanityBlockRenderer key={index} block={block} />
          ))}

          {/* Boilerplate Section */}
          {effectiveBoilerplate && (
            <div className="mt-16 p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6 glass">
              <h4 className="text-accent font-black text-xs uppercase tracking-widest">
                [About Tyler Media & Media Contact]
              </h4>
              <div className="text-zinc-400 text-xs leading-relaxed whitespace-pre-line font-sans space-y-2">
                {renderFormattedText(effectiveBoilerplate)}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
