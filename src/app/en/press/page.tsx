"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { pressReleases } from "../../../data/pressData";
import BioMatrix from "../../../components/BioMatrix";
import DataCheatSheet from "../../../components/DataCheatSheet";
import AssetVault from "../../../components/AssetVault";

export default function EnPressPage() {
  const [lang, setLang] = useState<"KR" | "EN">("EN");
  const enReleases = pressReleases.filter((pr) => pr.lang === "en");

  const handleLangToggle = (targetLang: "KR" | "EN") => {
    setLang(targetLang);
    if (targetLang === "KR") {
      window.location.href = "/ko/press";
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
      <main className="pt-32 pb-32 px-6 md:px-12 max-w-6xl mx-auto space-y-24">
        
        {/* Title Banner */}
        <div className="border-b border-white/10 pb-8 max-w-4xl">
          <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-2">Newsroom & EPK</span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            English Press Room & EPK
          </h1>
          <p className="text-zinc-500 text-sm mt-3">
            Self-serve assets, operational logistics, and official announcements for journalists and partners.
          </p>
        </div>

        {/* 1. THE EVERGREEN MASTER LAYER (Pinned to Top) */}
        <section className="space-y-12">
          <div className="border-l-2 border-accent pl-4">
            <h2 className="text-white font-black text-xl md:text-2xl tracking-wider uppercase">
              Evergreen Master Layer
            </h2>
            <p className="text-zinc-500 text-xs">Self-serve operational kits and copyable brand bios.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <BioMatrix />
            <AssetVault />
          </div>

          <div className="max-w-6xl">
            <DataCheatSheet />
          </div>
        </section>

        {/* 2. CHRONOLOGICAL RELEASE FEED (Below Master Layer) */}
        <section className="space-y-12 pt-12 border-t border-white/10">
          <div className="border-l-2 border-accent/40 pl-4">
            <h2 className="text-white font-black text-xl md:text-2xl tracking-wider uppercase">
              Corporate Announcements
            </h2>
            <p className="text-zinc-500 text-xs">Official chronological announcements index feed.</p>
          </div>

          {enReleases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {enReleases.map((release) => (
                <article key={release.slug} className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl hover:border-accent/20 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <time className="text-zinc-600 font-mono text-xs block mb-3" dateTime={release.date}>
                      {release.date}
                    </time>
                    <h3 className="text-lg font-bold text-white mb-4 leading-snug hover:text-accent transition-colors">
                      <a href={`/en/press/${release.slug}`}>{release.title}</a>
                    </h3>
                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3 mb-6">
                      {release.body[0]}
                    </p>
                  </div>
                  <a
                    href={`/en/press/${release.slug}`}
                    className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
                  >
                    View Announcement &rarr;
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-zinc-600 text-sm font-mono py-12 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.005]">
              No active announcements found in English locale.
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
