"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pressReleases } from "../../../data/pressData";
import BioMatrix from "../../../components/BioMatrix";
import DataCheatSheet from "../../../components/DataCheatSheet";
import AssetVault from "../../../components/AssetVault";

export default function EnPressPage() {
  const [lang, setLang] = useState<"KR" | "EN">("EN");
  const [showEPK, setShowEPK] = useState(false);
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
      <main className="pt-32 pb-32 px-6 md:px-12 max-w-4xl mx-auto space-y-12">
        
        {/* Title Banner */}
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-2">Press & Media</span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Press Room
            </h1>
            <p className="text-zinc-500 text-sm mt-3">
              Official announcements, business news, and media assets for partners.
            </p>
          </div>

          <button
            onClick={() => setShowEPK(!showEPK)}
            className="px-6 py-3 bg-white/5 border border-white/10 text-white hover:border-accent/30 hover:bg-white/10 rounded-full font-bold text-xs tracking-wider transition-all whitespace-nowrap self-start md:self-end shadow-lg flex items-center gap-2 group cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:animate-ping" />
            {showEPK ? "Hide Media Kit / EPK" : "Open Media Kit / EPK"}
          </button>
        </div>

        {/* Conditionally Expanded EPK section */}
        <AnimatePresence>
          {showEPK && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 border-b border-white/10 pb-16 overflow-hidden"
            >
              <div className="border-l-2 border-accent pl-4">
                <h2 className="text-white font-black text-xl md:text-2xl tracking-wider uppercase">
                  Media Kit & Electronic Press Kit (EPK)
                </h2>
                <p className="text-zinc-500 text-xs mt-1">Self-serve copyable bios, digital assets, and key operations data.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <BioMatrix />
                <AssetVault />
              </div>

              <div className="max-w-4xl">
                <DataCheatSheet />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Chronological List */}
        <div className="space-y-8">
          {enReleases.length > 0 ? (
            enReleases.map((release) => (
              <article key={release.slug} className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl hover:border-accent/20 hover:bg-white/[0.02] transition-all duration-300">
                <time className="text-zinc-600 font-mono text-xs block mb-3" dateTime={release.date}>
                  {release.date}
                </time>
                
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 hover:text-accent transition-colors leading-snug">
                  <a href={`/en/press/${release.slug}`}>{release.title}</a>
                </h2>

                {release.subtitle && (
                  <p className="text-zinc-400 text-sm mb-4 font-medium leading-relaxed">
                    {release.subtitle}
                  </p>
                )}

                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-6">
                  {release.intro5W1H || release.body[0]}
                </p>

                <a
                  href={`/en/press/${release.slug}`}
                  className="text-xs font-bold text-accent hover:underline flex items-center gap-1.5"
                >
                  View Announcement &rarr;
                </a>
              </article>
            ))
          ) : (
            <div className="text-zinc-600 text-sm font-mono py-12 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.005]">
              No active announcements found in English locale.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
