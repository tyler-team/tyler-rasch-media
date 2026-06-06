"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import BioMatrix from "../../../components/BioMatrix";
import DataCheatSheet from "../../../components/DataCheatSheet";
import AssetVault from "../../../components/AssetVault";

export default function EnMediaKitPage() {
  const [lang, setLang] = useState<"KR" | "EN">("EN");

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
      <main className="pt-32 pb-32 px-6 md:px-12 max-w-6xl mx-auto space-y-16">
        
        {/* Title Banner */}
        <div className="border-b border-white/10 pb-8 max-w-4xl">
          <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-2">Self-Serve Journalism</span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Electronic Press Kit (EPK)
          </h1>
          <p className="text-zinc-500 text-sm mt-3">
            Instant downloads, operational metrics, and bio copy matrices with no email walls or portals.
          </p>
        </div>

        {/* Master Layer Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <BioMatrix />
          <AssetVault />
        </div>

        <div className="max-w-6xl">
          <DataCheatSheet />
        </div>

      </main>
    </div>
  );
}
