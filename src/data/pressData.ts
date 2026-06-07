export interface PressRelease {
  slug: string;
  date: string;
  lang: "ko" | "en";
  title: string;
  subtitle?: string; // 소제목 (Korean domestic PR style)
  byline?: string;   // 기자 및 배포처 바이라인 (Korean domestic PR style)
  intro5W1H?: string; // 5W1H introduction paragraph (Korean domestic PR style)
  body: string[];    // Main content paragraphs
  boilerplate?: string; // 배포 기업 보도자료 꼬리말 (Boilerplate)
}

export interface EPKBios {
  short: string;
  medium: string;
  long: string;
}

export interface OperationalMetric {
  label: string;
  value: string;
  category: "reach" | "demographic" | "logistics";
}

export interface DownloadableAsset {
  name: string;
  type: string;
  url: string;
  description: string;
}

export const pressReleases: PressRelease[] = [
  {
    slug: "tyler-media-sme-program-launch",
    date: "2026-06-07",
    lang: "ko",
    title: "타일러 미디어, 소상공인·스타트업 성장을 위한 ‘무료 PPL 지원 프로그램’ 전격 가동",
    subtitle: "사업가 및 방송인 타일러 라쉬, 서울푸드 박람회서 상생 플랫폼 비전 제시 예고",
    byline: "이현지(Hyunji Lee) Lead (2026년 06월 07일, 서울)",
    intro5W1H: "이현지(Hyunji Lee) Lead (2026년 06월 07일, 서울) -- 타일러 미디어가 지난 1일부터 국내 소상공인과 스타트업의 자생력을 높이기 위한 ‘SME·스타트업 지원 프로그램’을 본격 가동했다.",
    body: [
      "본 프로그램은 마케팅 예산 부족으로 성장에 제약을 겪는 독립 브랜드를 발굴해 미디어 플랫폼 ‘타일러볼까요’ 내 무료 PPL 노출 및 광고 단가 할인, 분기별 네트워킹 참여 기회를 제공하는 상생 프로젝트다. 대기업 중심으로 편향된 마케팅 생태계에서 중소기업의 진입 문턱을 낮추겠다는 취지다.",
      "타일러 미디어는 오는 6월 9일부터 12일까지 진행되는 ‘서울푸드 박람회’ 현장에서 본 프로그램을 공식 소개하고 유망 파트너사 발굴에 나선다.",
      "사업가 및 방송인 타일러 라쉬가 이끄는 타일러 미디어는 뉴미디어 플랫폼 타일러볼까요를 통해 고품격 지식 엔터테인먼트를 제공하고 있으며, 상세 내용은 공식 홈페이지(tylerrasch.com) 및 문의처(pr@tylerrasch.com)에서 확인 가능하다."
    ]
  },
  {
    slug: "tyler-media-sme-program-launch-en",
    date: "2026-06-07",
    lang: "en",
    title: "Tyler Media launches zero-cost product placement program for SMEs to counter corporate marketing concentration",
    body: [
      "SEOUL, South Korea — June 7, 2026 — Tyler Media initiated the SME & Startup Support Program on June 1 to provide independent businesses with free product placement (PPL) on the digital media platform Tylerbolkkayo. The company will detail the initiative to industry stakeholders at the Seoul Food exhibition from June 9 to 12.",
      "The program addresses structural imbalances within the South Korean digital marketing sector, where large conglomerates and major agencies dictate market visibility. By offering zero-cost PPL within its original video series, Tyler Media lowers the barrier to entry for independent brands and startups that lack substantial marketing budgets. The initiative ensures that all eligible applicants, regardless of final selection for the PPL, receive discounted advertising rates for future campaigns.",
      "To build a sustainable business ecosystem, Tyler Media integrates quarterly networking events for participating companies. Eligibility is strictly limited to independent entities; franchises and subsidiaries of large corporations are excluded. This framework guarantees that media resources are allocated directly to small and medium enterprises (SMEs) that require operational leverage to scale. Applications are accepted on a rolling basis throughout the year, with centralized reviews conducted quarterly.",
      "The current macroeconomic environment, characterized by sustained high interest rates and operational costs, presents high customer acquisition hurdles for emerging brands. Tyler Media's program mitigates these marketing expenses, allowing founders to direct capital toward product development and core operations. Market data indicates that direct media partnerships offering content integration without upfront fees provide critical structural support for startups navigating restrictive funding environments.",
      "About Tyler Media",
      "Tyler Media is an independent digital media venture based in Seoul, operating the premium knowledge entertainment platform Tylerbolkkayo. The company was founded by entrepreneur and broadcaster Tyler Rasch, a University of Chicago and Seoul National University alumnus recognized for his analysis of geopolitics, macroeconomics, and global cultural trends. Tyler Media produces high-production, data-driven content connecting complex global agendas with localized market insights.",
      "Media Contact:",
      "Hyunji Lee, lead",
      "Tyler Media PR",
      "pr@tylerrasch.com",
      "tylerrasch.com"
    ]
  }
];

export const epkBios: EPKBios = {
  short: "Tyler Rasch is a Global Macro/Geopolitical Intellectual, Cross-Border Media Innovator, and Serial Entrepreneur based in Seoul. He holds a B.A. from the University of Chicago and an M.A. from Seoul National University, specializing in translating complex global intelligence into localized market capture for premium audiences.",
  medium: "Tyler Rasch is a prominent Global Macro/Geopolitical Intellectual, Cross-Border Media Innovator, and Serial Entrepreneur. Armed with academic foundations from the University of Chicago (B.A. in International Studies) and Seoul National University (M.A. in International Relations / Political Science), Tyler has spent over a decade in South Korea translating complex global macroeconomic and technology security trends into localized market capture. As the founder of Tyler Media, he bridges international corporate ecosystems and premium audiences.",
  long: "Tyler Rasch is a Global Macro/Geopolitical Intellectual, Cross-Border Media Innovator, and Serial Entrepreneur based in Seoul, South Korea. He received his Bachelor's degree in International Studies from the University of Chicago and his Master's degree in International Relations (Political Science) from Seoul National University. Over the past decade, Tyler has established himself as a prominent intellectual presence in South Korea's media landscape, translating complex global intelligence, macroeconomics, and technology security trends into localized market capture for premium audiences. As Chief Executive and Creative Director at Tyler Media (KNMIR Inc.), he leads cross-border enterprise initiatives, B2B strategic partnerships, and the SME & Startup PR Support Program."
};

export const operationalMetrics: OperationalMetric[] = [
  { label: "YouTube Subscribers (Tylerbolkkayo)", value: "677K+", category: "reach" },
  { label: "Total YouTube Channel Views", value: "63M+", category: "reach" },
  { label: "SME & Startup PR Support Program", value: "Ecosystem integration with partners like D.CAMP", category: "logistics" },
  { label: "Operational HQ", value: "Seoul, South Korea", category: "logistics" },
  { label: "Core Topic Coverage", value: "Global Affairs, Macroeconomics, Tech Security", category: "demographic" },
  { label: "Active Partnership Scale", value: "SMEs & Global Conglomerates", category: "logistics" }
];

export const downloadableAssets: DownloadableAsset[] = [
  {
    name: "Vector Logo Package",
    type: "ZIP (SVG / EPS)",
    url: "/assets/tyler-media-logos.zip",
    description: "High-contrast brand assets including official primary and secondary vector logos."
  },
  {
    name: "Standard Press Headshot",
    type: "JPG (16:9 / Landscape)",
    url: "/headshots/tyler_suit_thinking.jpg",
    description: "Official publication headshot in professional attire (high-resolution landscape orientation)."
  },
  {
    name: "Social Media Headshot",
    type: "JPG (9:16 / Portrait)",
    url: "/headshots/tyler_crossed_arms_front.jpg",
    description: "Official publication headshot optimized for portrait mobile screens and bio sidebars."
  },
  {
    name: "B-Roll Video Footage Package",
    type: "ZIP (1080p MP4)",
    url: "/assets/tyler-media-broll.zip",
    description: "Self-serve clean B-roll footage including corporate walk-throughs, speaking segments, and natural overlays."
  }
];
