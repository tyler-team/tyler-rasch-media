import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tylerrasch.com"),
  title: {
    default: "Tyler Rasch Media | 타일러 라쉬 미디어 (원빅월드쇼 1BWS)",
    template: "%s | Tyler Rasch Media",
  },
  description:
    "대한민국 대표 글로벌 인텔리전스 IP 원빅월드쇼(1BWS) 및 리얼리타일러(Really Tyler)를 운영하는 타일러 미디어(주식회사 큰미르) 공식 B2B 파트너십 & 프레스 포털.",
  keywords: [
    "타일러 라쉬",
    "Tyler Rasch",
    "타일러 미디어",
    "Tyler Media",
    "주식회사 큰미르",
    "KNMIR INC",
    "1BWS",
    "원빅월드쇼",
    "One Big World Show",
    "Really Tyler",
    "리얼리타일러",
    "국제정세",
    "거시경제",
    "글로벌 공급망",
    "브랜디드 콘텐츠",
    "유튜브 PPL",
    "B2B 미디어 파트너십",
  ],
  authors: [{ name: "Tyler Media (KNMIR INC)", url: "https://www.tylerrasch.com" }],
  creator: "Tyler Media (주식회사 큰미르)",
  publisher: "Tyler Media (주식회사 큰미르)",
  alternates: {
    canonical: "https://www.tylerrasch.com",
    languages: {
      "ko-KR": "https://www.tylerrasch.com",
      "en-US": "https://www.tylerrasch.com/en",
      "x-default": "https://www.tylerrasch.com/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    alternateLocale: ["en_US"],
    url: "https://www.tylerrasch.com",
    siteName: "Tyler Rasch Media | 주식회사 큰미르",
    title: "Tyler Rasch Media | 타일러 라쉬 미디어 (1BWS / Really Tyler)",
    description:
      "매월 130만 명의 지적 오디언스가 몰입하는 글로벌 인텔리전스 IP 원빅월드쇼(1BWS) 및 135만+ 소셜 생태계 공식 B2B 브랜드 파트너십 솔루션.",
    images: [
      {
        url: "/headshots/tyler_suit_thinking.jpg",
        width: 1200,
        height: 630,
        alt: "Tyler Rasch Media — One Big World Show (1BWS)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tyler Rasch Media | 타일러 라쉬 미디어",
    description:
      "공식 B2B 미디어 & 파트너십 포트폴리오. 원빅월드쇼(1BWS), 리얼리타일러(Really Tyler) 브랜디드 콘텐츠 및 옴니채널 캠페인 솔루션.",
    images: ["/headshots/tyler_suit_thinking.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.tylerrasch.com/#organization",
      name: "Tyler Media (주식회사 큰미르 / KNMIR INC)",
      alternateName: ["Tyler Rasch Media", "타일러 미디어", "큰미르"],
      url: "https://www.tylerrasch.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.tylerrasch.com/headshots/tyler_suit_thinking.jpg",
      },
      founder: {
        "@id": "https://www.tylerrasch.com/#person",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "contact@tylerrasch.com",
          contactType: "sales",
          availableLanguage: ["Korean", "English"],
        },
        {
          "@type": "ContactPoint",
          email: "press@tylerrasch.com",
          contactType: "public relations",
          url: "https://www.tylerrasch.com/ko/press",
          availableLanguage: ["Korean", "English"],
        },
      ],
      sameAs: [
        "https://www.youtube.com/@원빅월드쇼",
        "https://www.youtube.com/@reallytylerofficial",
        "https://www.instagram.com/onebigworldshow",
        "https://www.instagram.com/tyleroninsta",
        "https://www.linkedin.com/in/tylerrasch/",
        "https://x.com/tylerrasch",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.tylerrasch.com/#person",
      name: "Tyler Rasch",
      alternateName: "타일러 라쉬",
      url: "https://www.tylerrasch.com",
      image: "https://www.tylerrasch.com/headshots/tyler_suit_thinking.jpg",
      jobTitle: "Founder, Chief Executive & Host of One Big World Show (1BWS)",
      knowsAbout: [
        "Geopolitics",
        "International Political Economy",
        "Macroeconomics",
        "Global Supply Chains",
        "Cross-Border Media Strategy",
      ],
      worksFor: {
        "@id": "https://www.tylerrasch.com/#organization",
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "University of Chicago",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Seoul National University",
        },
      ],
      sameAs: [
        "https://www.youtube.com/@원빅월드쇼",
        "https://www.youtube.com/@reallytylerofficial",
        "https://www.instagram.com/tyleroninsta",
        "https://www.threads.com/@tyleroninsta",
        "https://www.linkedin.com/in/tylerrasch/",
        "https://x.com/tylerrasch",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_MEASUREMENT_ID = "G-1ZNJ56WQHL";

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
