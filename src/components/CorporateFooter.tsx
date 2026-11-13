"use client";

import React from "react";
import Link from "next/link";

interface CorporateFooterProps {
  lang?: "KR" | "EN";
  onCareersClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export default function CorporateFooter({
  lang = "KR",
  onCareersClick,
  className = "",
}: CorporateFooterProps) {
  return (
    <footer
      className={`pt-12 border-t border-white/10 text-[11px] text-zinc-600 tracking-wider break-keep ${className}`}
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div className="space-y-2 text-zinc-600">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-6 gap-y-1 text-zinc-600">
            {lang === "KR" ? (
              <>
                <span className="font-semibold">주식회사 큰미르(Knmir Inc.)</span>
                <span>대표자: RASCH TYLER JOSEF</span>
                <span>사업자등록번호: 116-81-96227</span>
              </>
            ) : (
              <>
                <span className="font-semibold">Knmir Inc. (주식회사 큰미르)</span>
                <span>CEO: RASCH TYLER JOSEF</span>
                <span>Business Reg: 116-81-96227</span>
              </>
            )}
          </div>
          <div className="text-zinc-600">
            {lang === "KR"
              ? "주소: 서울특별시 영등포구 영중로29길 2, B1"
              : "Address: B1, 2, Yeongjung-ro 29-gil, Yeongdeungpo-gu, Seoul, Republic of Korea"}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-zinc-600">
            <span>© 2026 Tyler Rasch Media</span>
            <Link
              href="/policy"
              className="text-zinc-600 hover:text-zinc-300 underline-offset-4 hover:underline transition-colors"
            >
              Privacy &amp; AI Policy
            </Link>
            <a
              href="/careers"
              onClick={onCareersClick}
              className="text-zinc-600 hover:text-zinc-300 underline-offset-4 hover:underline transition-colors"
            >
              {lang === "KR" ? "채용" : "Careers"}
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2 sm:gap-6 lg:gap-1.5 text-zinc-600 font-mono lowercase">
          <a
            href="mailto:request@tylerrasch.com"
            className="text-zinc-600 hover:text-accent transition-colors"
          >
            request@tylerrasch.com
          </a>
          <a
            href="mailto:press@tylerrasch.com"
            className="text-zinc-600 hover:text-accent transition-colors"
          >
            press@tylerrasch.com
          </a>
        </div>
      </div>
    </footer>
  );
}
