"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BlogPost } from "../../../data/blogData";

export default function BlogArticleClient({ post }: { post: BlogPost }) {
  const [lang, setLang] = useState<"KR" | "EN">("KR");
  const [exportRatio, setExportRatio] = useState<"1x1" | "9x16">("1x1");
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = exportRatio === "1x1" ? post.socialExcerpts.ratio1x1 : post.socialExcerpts.ratio9x16;

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
            onClick={() => setLang("KR")}
            className={`relative z-10 flex-1 py-1 text-xs font-black transition-colors ${lang === "KR" ? "text-black" : "text-zinc-500"}`}
          >
            KR
          </button>
          <button
            onClick={() => setLang("EN")}
            className={`relative z-10 flex-1 py-1 text-xs font-black transition-colors ${lang === "EN" ? "text-black" : "text-zinc-500"}`}
          >
            EN
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="pt-32 pb-32 px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side: Article Body */}
        <div className="lg:col-span-7 space-y-12">
          <a href="/" className="text-xs font-bold text-zinc-500 hover:text-accent transition-colors flex items-center gap-2">
            &larr; 홈으로 돌아가기 (Back to Home)
          </a>

          <header className="space-y-4 pb-8 border-b border-white/10">
            <div className="flex justify-between items-center text-xs text-zinc-500 font-mono">
              <span className="uppercase tracking-widest text-accent text-[10px] font-bold">
                {lang === "KR" ? post.category.KR : post.category.EN}
              </span>
              <span>{post.date}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight break-keep">
              {lang === "KR" ? post.title.KR : post.title.EN}
            </h1>
            <div className="text-xs text-zinc-500 font-mono">
              By {post.author}
            </div>
          </header>

          <article className="space-y-8 text-zinc-300 text-base leading-relaxed break-keep">
            <p className="font-bold text-white text-lg leading-relaxed bg-white/[0.01] border-l-2 border-accent p-4 rounded-r-xl">
              {lang === "KR" ? post.excerpt.KR : post.excerpt.EN}
            </p>

            {(lang === "KR" ? post.body.KR : post.body.EN).map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </article>
        </div>

        {/* Right Side: Social Exporter Panel */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32 self-start">
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-xl space-y-6">
            <div>
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Social Media Exporter
              </h3>
              <p className="text-zinc-500 text-xs mt-1">Export key quotes in perfect ratios for carousels (LinkedIn / Instagram).</p>
            </div>

            {/* Ratio Toggle */}
            <div className="flex bg-white/5 p-1 rounded-xl w-full max-w-xs">
              <button
                onClick={() => { setExportRatio("1x1"); setActiveSlide(0); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  exportRatio === "1x1" ? "bg-accent text-accent-foreground font-black" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                1:1 Ratio
              </button>
              <button
                onClick={() => { setExportRatio("9x16"); setActiveSlide(0); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  exportRatio === "9x16" ? "bg-accent text-accent-foreground font-black" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                9:16 Ratio
              </button>
            </div>

            {/* Simulated Mobile/Card Canvas */}
            <div className="flex justify-center items-center py-4 bg-black/45 rounded-2xl border border-white/5 relative">
              <div
                className={`bg-gradient-to-br from-[#0A192F] to-[#02060C] border border-accent/20 rounded-2xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300 ${
                  exportRatio === "1x1" ? "w-64 h-64 aspect-square" : "w-56 h-[380px]"
                }`}
              >
                {/* Branding Indicator */}
                <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-accent font-black">
                  <span>TYLER MEDIA</span>
                  <span>SLIDE {activeSlide + 1}/{slides.length}</span>
                </div>

                {/* Main Quote Content */}
                <div className="my-auto">
                  <p className="text-white font-bold text-sm md:text-base leading-relaxed whitespace-pre-line word-keep-all">
                    &ldquo;{slides[activeSlide]}&rdquo;
                  </p>
                </div>

                {/* Footer Brand */}
                <div className="text-[7px] text-zinc-600 font-mono tracking-wider flex justify-between items-center border-t border-white/5 pt-2">
                  <span>@tylerbolkkayo</span>
                  <span>www.tylerrasch.com</span>
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={handlePrevSlide}
                className="px-3 py-2 text-xs font-bold text-white bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
              >
                &larr; Prev
              </button>
              <span className="text-xs text-zinc-500 font-mono">Slide {activeSlide + 1} of {slides.length}</span>
              <button
                onClick={handleNextSlide}
                className="px-3 py-2 text-xs font-bold text-white bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
              >
                Next &rarr;
              </button>
            </div>

            {/* Copy Slide Button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(slides[activeSlide]);
                alert("Slide quote copied to clipboard!");
              }}
              className="w-full py-3 text-xs font-bold text-accent-foreground bg-accent rounded-xl hover:scale-102 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              Copy Active Slide Text
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
