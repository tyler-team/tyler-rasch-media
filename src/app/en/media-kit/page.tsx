"use client";

import React, { useState } from "react";
import BioMatrix from "../../../components/BioMatrix";
import DataCheatSheet from "../../../components/DataCheatSheet";
import AssetVault from "../../../components/AssetVault";
import SubpageHeader from "../../../components/SubpageHeader";
import CorporateFooter from "../../../components/CorporateFooter";

export default function EnMediaKitPage() {
  const [lang, setLang] = useState<"KR" | "EN">("EN");

  const handleLangToggle = (targetLang: "KR" | "EN") => {
    setLang(targetLang);
    if (targetLang === "KR") {
      window.location.href = "/ko/press";
    }
  };

  return (
    <div className="min-h-screen bg-[#02060C] text-zinc-300 font-sans selection:bg-accent selection:text-black word-keep-all overflow-x-hidden">
      <SubpageHeader
        lang={lang}
        onLangChange={handleLangToggle}
        krHref="/ko/press"
        activeSection="media-kit"
      />

      {/* Main Content Container */}
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto space-y-16">
        
        {/* Title Banner */}
        <div className="border-b border-white/10 pb-8 max-w-4xl">
          <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-2">Self-Serve Journalism</span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Electronic Press Kit (EPK)
          </h1>
          <p className="text-zinc-400 text-sm mt-3">
            Instant downloads, operational metrics, and bio copy matrices with no email walls or portals.
          </p>
        </div>

        {/* Master Layer Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="min-w-0 w-full"><BioMatrix /></div>
          <div className="min-w-0 w-full"><AssetVault /></div>
        </div>

        <div className="max-w-6xl min-w-0 w-full">
          <DataCheatSheet />
        </div>

        <CorporateFooter lang="EN" className="mt-24" />
      </main>
    </div>
  );
}
