"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SubpageHeaderProps {
  lang: "KR" | "EN";
  onLangChange?: (target: "KR" | "EN") => void;
  krHref?: string;
  enHref?: string;
  activeSection?: "press" | "media-kit" | "blog" | "policy";
}

export default function SubpageHeader({
  lang,
  onLangChange,
  krHref,
  enHref,
  activeSection,
}: SubpageHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: "home",
      label: lang === "KR" ? "홈" : "Overview",
      href: lang === "EN" ? "/en" : "/",
    },
    {
      id: "packages",
      label: lang === "KR" ? "파트너십" : "Partnership",
      href: "/#packages",
    },
    {
      id: "sme",
      label: lang === "KR" ? "SME 지원" : "SME Program",
      href: "/sme-startup-program",
    },
    {
      id: "press",
      label: lang === "KR" ? "보도자료" : "Newsroom",
      href: lang === "KR" ? "/ko/press" : "/en/press",
    },
    {
      id: "media-kit",
      label: lang === "KR" ? "미디어 키트" : "Media Kit",
      href: "/en/media-kit",
    },
    {
      id: "blog",
      label: lang === "KR" ? "에세이" : "Essays",
      href: "/blog",
    },
    {
      id: "careers",
      label: lang === "KR" ? "채용" : "Careers",
      href: "/careers",
    },
    {
      id: "contact",
      label: lang === "KR" ? "문의하기" : "Inquire",
      href: "/#contact",
    },
  ];

  const handleLangClick = (target: "KR" | "EN", e?: React.MouseEvent) => {
    if (target === "KR" && krHref) {
      if (onLangChange) {
        e?.preventDefault();
        onLangChange("KR");
      }
      return;
    }
    if (target === "EN" && enHref) {
      if (onLangChange) {
        e?.preventDefault();
        onLangChange("EN");
      }
      return;
    }
    onLangChange?.(target);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#02060C]/90 backdrop-blur-md border-b border-white/10 z-50 px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        <Link
          href={lang === "EN" ? "/en" : "/"}
          className="font-black text-base sm:text-xl tracking-tighter leading-none text-white hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          TYLER RASCH <span className="text-accent">MEDIA</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-5 xl:gap-6 text-[11px] font-bold uppercase tracking-widest"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`whitespace-nowrap transition-colors py-2 ${
                  isActive ? "text-accent" : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="h-9 w-24 p-0.5 bg-white/5 border border-white/10 rounded-full relative flex items-center">
            <motion.div
              animate={{ x: lang === "EN" ? "100%" : "0%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] bg-accent rounded-full shadow-[0_0_15px_rgba(0,229,255,0.3)]"
            />
            {krHref ? (
              <a
                href={krHref}
                onClick={(e) => handleLangClick("KR", e)}
                className={`relative z-10 flex-1 h-full flex items-center justify-center text-xs font-black transition-colors ${
                  lang === "KR" ? "text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                KR
              </a>
            ) : (
              <button
                type="button"
                onClick={() => handleLangClick("KR")}
                className={`relative z-10 flex-1 h-full flex items-center justify-center text-xs font-black transition-colors cursor-pointer ${
                  lang === "KR" ? "text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                KR
              </button>
            )}

            {enHref ? (
              <a
                href={enHref}
                onClick={(e) => handleLangClick("EN", e)}
                className={`relative z-10 flex-1 h-full flex items-center justify-center text-xs font-black transition-colors ${
                  lang === "EN" ? "text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                EN
              </a>
            ) : (
              <button
                type="button"
                onClick={() => handleLangClick("EN")}
                className={`relative z-10 flex-1 h-full flex items-center justify-center text-xs font-black transition-colors cursor-pointer ${
                  lang === "EN" ? "text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                EN
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-11 h-11 -mr-2 flex items-center justify-center rounded-full text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-[#02060C]/98 backdrop-blur-xl lg:hidden px-6 py-8 overflow-y-auto"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`min-h-[44px] flex items-center px-3 rounded-xl text-base font-bold uppercase tracking-widest transition-colors ${
                      isActive
                        ? "text-accent bg-white/[0.04]"
                        : "text-zinc-300 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
