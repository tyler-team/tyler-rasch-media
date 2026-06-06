"use client";

import React, { useState } from "react";
import { epkBios } from "../data/pressData";

export default function BioMatrix() {
  const [activeTab, setActiveTab] = useState<"short" | "medium" | "long">("medium");
  const [copied, setCopied] = useState(false);

  const getBioText = () => {
    return epkBios[activeTab];
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getBioText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4 mb-6">
        <div>
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Dynamic Bio Matrix
          </h3>
          <p className="text-zinc-500 text-xs mt-1">Select bio length and click copy to capture the exact word count.</p>
        </div>
        
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="px-4 py-2 text-xs font-bold text-accent-foreground bg-accent rounded-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3" />
              </svg>
              Copy Text
            </>
          )}
        </button>
      </div>

      {/* Tab Selectors */}
      <div className="flex bg-white/5 p-1 rounded-xl mb-6 w-full max-w-sm">
        {(["short", "medium", "long"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all capitalize ${
              activeTab === tab
                ? "bg-white/10 text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab} Bio
          </button>
        ))}
      </div>

      {/* Bio Text Display Area */}
      <div className="bg-black/20 border border-white/5 rounded-2xl p-6 min-h-[160px] flex items-center">
        <p className="text-zinc-300 text-sm leading-relaxed word-keep-all select-all font-mono">
          {getBioText()}
        </p>
      </div>
      
      {/* Word Count Indicator */}
      <div className="text-[10px] text-zinc-600 mt-3 text-right">
        Word Count: ~{getBioText().split(/\s+/).length} words
      </div>
    </div>
  );
}
