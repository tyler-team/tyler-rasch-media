"use client";

import React from "react";
import { downloadableAssets } from "../data/pressData";

export default function AssetVault() {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-xl space-y-6">
      <div>
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <span className="w-2 h-2 bg-accent rounded-full" />
          Digital Asset Vault
        </h3>
        <p className="text-zinc-500 text-xs mt-1">Direct, un-gated access to high-contrast logos, headshots, and clean media B-roll.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {downloadableAssets.map((asset, idx) => (
          <div
            key={idx}
            className="p-5 bg-black/25 border border-white/5 hover:border-accent/30 rounded-2xl flex flex-col justify-between gap-4 transition-all duration-300 group"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-zinc-500 tracking-widest uppercase py-0.5 px-2 border border-zinc-800 rounded-full">
                  {asset.type}
                </span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" title="CDN Ready" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-accent transition-colors">
                {asset.name}
              </h4>
              <p className="text-zinc-500 text-xs mt-1 leading-relaxed break-keep">
                {asset.description}
              </p>
            </div>

            <a
              href={asset.url}
              download
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-white/5 border border-white/10 rounded-xl hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Asset
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
