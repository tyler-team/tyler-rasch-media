"use client";

import React from "react";
import { operationalMetrics } from "../data/pressData";

export default function DataCheatSheet() {
  const categories = {
    reach: "Platform Reach & Scale",
    demographic: "Audience Demographics",
    logistics: "B2B Operational Logistics"
  };

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-xl space-y-6">
      <div>
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <span className="w-2 h-2 bg-accent/60 rounded-full" />
          Hard-Data Cheat Sheet
        </h3>
        <p className="text-zinc-500 text-xs mt-1">Verified audience analytics, operational specifications, and logistics.</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-black/20">
        <table className="w-full text-sm text-left align-top min-w-[500px]">
          <thead className="text-[10px] text-zinc-500 uppercase tracking-widest bg-white/5 border-b border-white/5">
            <tr>
              <th className="px-6 py-3">Metric Category</th>
              <th className="px-6 py-3">Indicator Detail</th>
              <th className="px-6 py-3 text-right">Verified Data Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-400">
            {Object.entries(categories).map(([catKey, catLabel]) => {
              const metrics = operationalMetrics.filter((m) => m.category === catKey);
              return (
                <React.Fragment key={catKey}>
                  <tr className="bg-white/[0.01]">
                    <td className="px-6 py-2.5 text-xs text-accent font-black tracking-wider uppercase" colSpan={3}>
                      {catLabel}
                    </td>
                  </tr>
                  {metrics.map((metric, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-6 py-4.5 text-zinc-600 text-xs font-mono">
                        {catKey.toUpperCase()}-{idx + 1}
                      </td>
                      <td className="px-6 py-4.5 font-bold text-zinc-300">
                        {metric.label}
                      </td>
                      <td className="px-6 py-4.5 text-right text-white font-mono font-bold text-sm">
                        {metric.value}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="text-[9px] text-zinc-600">
        * Data audited and updated quarterly. All metrics are sourced directly from verified Youtube Analytics, Instagram Professional Dashboards, and KNMIR Inc. corporate archives.
      </div>
    </div>
  );
}
