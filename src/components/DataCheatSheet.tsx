"use client";

import React, { useState, useEffect } from "react";
import { operationalMetrics } from "../data/pressData";

export default function DataCheatSheet() {
  const [live1bwsSubsEn, setLive1bwsSubsEn] = useState<string>("880K+");

  useEffect(() => {
    let mounted = true;
    fetch("/api/1bws-stats")
      .then((res) => res.json())
      .then((data) => {
        if (mounted && data?.subscribers?.en) {
          setLive1bwsSubsEn(data.subscribers.en);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const categories = {
    reach: "Platform Reach & Scale",
    demographic: "Audience Demographics",
    logistics: "B2B Operational Logistics"
  };

  return (
    <div className="min-w-0 w-full bg-white/[0.025] border border-white/10 rounded-3xl p-5 sm:p-6 md:p-8 backdrop-blur-sm shadow-xl space-y-6">
      <div>
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <span className="w-2 h-2 bg-accent/60 rounded-full" />
          Hard-Data Cheat Sheet
        </h3>
        <p className="text-zinc-400 text-xs mt-1">Verified audience analytics, operational specifications, and logistics.</p>
      </div>

      {/* Mobile Stacked View (Zero horizontal overflow at 375px) */}
      <div className="sm:hidden space-y-6">
        {Object.entries(categories).map(([catKey, catLabel]) => {
          const metrics = operationalMetrics.filter((m) => m.category === catKey);
          return (
            <div key={catKey} className="rounded-2xl border border-white/10 bg-black/25 overflow-hidden">
              <div className="px-4 py-2.5 text-[11px] text-accent font-black tracking-wider uppercase bg-white/[0.04] border-b border-white/10">
                {catLabel}
              </div>
              <div className="divide-y divide-white/5">
                {metrics.map((metric, idx) => (
                  <div key={idx} className="px-4 py-3.5 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-zinc-400 text-[10px] font-mono">
                        {catKey.toUpperCase()}-{idx + 1}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-zinc-200 leading-snug break-keep">
                      {metric.label}
                    </div>
                    <div className="text-sm text-white font-mono font-bold break-words">
                      {metric.label === "YouTube Subscribers (1BWS / One Big World Show)"
                        ? live1bwsSubsEn
                        : metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tablet & Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto rounded-2xl border border-white/10 bg-black/20">
        <table className="w-full text-sm text-left align-top">
          <thead className="text-[10px] text-zinc-400 uppercase tracking-widest bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-5 py-3">Metric Code</th>
              <th className="px-5 py-3">Indicator Detail</th>
              <th className="px-5 py-3 text-right">Verified Data Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-300">
            {Object.entries(categories).map(([catKey, catLabel]) => {
              const metrics = operationalMetrics.filter((m) => m.category === catKey);
              return (
                <React.Fragment key={catKey}>
                  <tr className="bg-white/[0.02]">
                    <td className="px-5 py-2.5 text-xs text-accent font-black tracking-wider uppercase" colSpan={3}>
                      {catLabel}
                    </td>
                  </tr>
                  {metrics.map((metric, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 text-zinc-400 text-xs font-mono whitespace-nowrap">
                        {catKey.toUpperCase()}-{idx + 1}
                      </td>
                      <td className="px-5 py-4 font-bold text-zinc-200">
                        {metric.label}
                      </td>
                      <td className="px-5 py-4 text-right text-white font-mono font-bold text-sm">
                        {metric.label === "YouTube Subscribers (1BWS / One Big World Show)"
                          ? live1bwsSubsEn
                          : metric.value}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="text-[10px] text-zinc-500">
        * Data audited and updated quarterly. All metrics are sourced directly from verified Youtube Analytics, Instagram Professional Dashboards, and KNMIR Inc. corporate archives.
      </div>
    </div>
  );
}
