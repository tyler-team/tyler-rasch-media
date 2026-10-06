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
  metadataBase: new URL("https://tylerrasch.com"),
  title: {
    default: "Tyler Rasch Media | 타일러 라쉬 미디어",
    template: "%s | Tyler Rasch Media",
  },
  description:
    "공식 B2B 미디어 & 파트너십 포트폴리오. 타일러 라쉬(주식회사 큰미르)와 함께하는 오리지널 브랜디드 콘텐츠(1BWS, Really Tyler), 브랜드 파트너십 및 기업 강연 솔루션.",
  keywords: [
    "타일러 라쉬",
    "Tyler Rasch",
    "타일러",
    "주식회사 큰미르",
    "큰미르",
    "1BWS",
    "원빅월드쇼",
    "Really Tyler",
    "리얼리타일러",
    "B2B 미디어",
    "브랜디드 콘텐츠",
    "기업 강연",
    "PPL",
  ],
  authors: [{ name: "주식회사 큰미르 (Tyler Rasch Media)" }],
  creator: "주식회사 큰미르",
  publisher: "주식회사 큰미르",
  alternates: {
    canonical: "https://tylerrasch.com",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    alternateLocale: ["en_US"],
    url: "https://tylerrasch.com",
    siteName: "Tyler Rasch Media | 주식회사 큰미르",
    title: "Tyler Rasch Media | 타일러 라쉬 미디어",
    description:
      "공식 B2B 미디어 & 파트너십 포트폴리오. 타일러 라쉬(주식회사 큰미르)와 함께하는 오리지널 브랜디드 콘텐츠(1BWS, Really Tyler), 브랜드 파트너십 및 기업 강연 솔루션.",
    images: [
      {
        url: "/headshots/headshot-1.jpg",
        width: 1200,
        height: 630,
        alt: "Tyler Rasch Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tyler Rasch Media | 타일러 라쉬 미디어",
    description:
      "공식 B2B 미디어 & 파트너십 포트폴리오. 타일러 라쉬(주식회사 큰미르)와 함께하는 오리지널 브랜디드 콘텐츠, 브랜드 파트너십 및 기업 강연 솔루션.",
    images: ["/headshots/headshot-1.jpg"],
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
      "@id": "https://tylerrasch.com/#organization",
      "name": "주식회사 큰미르",
      "alternateName": "Tyler Rasch Media",
      "url": "https://tylerrasch.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tylerrasch.com/headshots/headshot-1.jpg",
      },
      "founder": {
        "@id": "https://tylerrasch.com/#person",
      },
      "sameAs": [
        "https://www.youtube.com/@1bws_official",
        "https://www.youtube.com/@reallytyler",
        "https://www.instagram.com/tyleroninsta",
        "https://www.linkedin.com/in/tyler-rasch-87a41634/",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://tylerrasch.com/#person",
      "name": "Tyler Rasch",
      "alternateName": "타일러 라쉬",
      "url": "https://tylerrasch.com",
      "jobTitle": "Author, Broadcaster & Keynote Speaker",
      "worksFor": {
        "@id": "https://tylerrasch.com/#organization",
      },
      "alumniOf": [
        {
          "@type": "CollegeOrUniversity",
          "name": "University of Chicago",
        },
        {
          "@type": "CollegeOrUniversity",
          "name": "Seoul National University",
        },
      ],
      "sameAs": [
        "https://www.youtube.com/@1bws_official",
        "https://www.youtube.com/@reallytyler",
        "https://www.instagram.com/tyleroninsta",
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
