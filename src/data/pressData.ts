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
    date: "2026-05-15",
    lang: "ko",
    title: "타일러 미디어, 중소기업·스타트업 상생 위한 ‘무료 PPL 지원 프로그램’ 공식 론칭",
    subtitle: "마케팅비 부담 해소 선언... 연 4회 분기별 정기 심사 통해 콘텐츠 무료 노출 및 독점 혜택 제공",
    byline: "서울=타일러 미디어 홍보팀 김지혜 기자 (pr@tylermedia.com)",
    intro5W1H: "글로벌 미디어 솔루션을 선도하는 주식회사 큰미르(타일러 미디어)가 국내 우수 스타트업 및 소상공인의 마케팅 장벽을 전격 제거하기 위해 ‘SME/스타트업 무료 PPL 지원 프로그램’을 공식 출시하고 연중 상시 모집을 시작한다고 15일 밝혔다.",
    body: [
      "이번 상생 프로그램은 대한민국 비즈니스의 99%를 차지하지만 대기업 위주의 광고 단가 장벽과 복잡한 정부 지원 서류에 막혀 효과적인 브랜딩 기회를 얻지 못하던 창업 생태계에 새로운 대안을 제시하고자 기획되었다.",
      "최종 선정된 중소기업 및 스타트업에는 타일러 미디어의 공식 유튜브 채널 및 오리지널 콘텐츠 제작 시 상용 제품을 자연스럽게 노출하는 ‘무료 PPL 제작’ 기회가 제공된다. 또한, 향후 유료 광고 협업 시 활용할 수 있는 단가 우대 할인율 적용과 함께, 분기별 파트너사 전용 교류 모임(네트워킹) 초대권 등 강력한 서포트를 패키지로 공급한다.",
      "심사는 상시 접수 후 분기 첫 달(4, 7, 10, 1월) 1일부터 15일까지 진행되며, 1분기 접수건은 2분기 중 콘텐츠 제작 및 온에어를 신속하게 집행할 방침이다. 참가를 희망하는 사업체는 온라인 지원 창구를 통해 간편한 서류 자가 진단과 사업자등록 사본 제출을 거쳐 5분 만에 접수를 완료할 수 있다."
    ],
    boilerplate: "주식회사 큰미르(타일러 미디어)는 지식 아이콘 타일러 라쉬의 독창적인 시각과 깊이 있는 가치를 대중문화 콘텐츠 및 B2B 브랜드 파트너십을 통해 확산하는 통합 미디어 전문 기업입니다."
  },
  {
    slug: "tyler-media-1bws-transition",
    date: "2026-06-01",
    lang: "en",
    title: "Tyler Media Announces Strategic Transition of Tylerbolkkayo to 1BWS Framework",
    body: [
      "SEOUL, South Korea — Tyler Media (KNMIR Inc.) has officially announced the strategic restructuring of its flagship digital intellectual property, Tylerbolkkayo, transitioning the asset into the comprehensive 1BWS (One Big World Show) global affairs framework.",
      "The structural overhaul aligns the media network's digital distribution channels with macroeconomic analysis, geopolitical insights, and technology security reporting. The 1BWS framework is designed to deliver high-density strategic intelligence to cross-border enterprises and premium business audiences.",
      "Under the new format, Tyler Media will expand its collaborative corporate offerings, providing streamlined B2B advertising models, localized market translation services, and joint strategic research publications."
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
