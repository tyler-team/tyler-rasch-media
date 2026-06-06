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
    slug: "tyler-rasch-climate-forum-keynote",
    date: "2026-06-02",
    lang: "en",
    title: "Tyler Rasch to Deliver Keynote Address at the 2026 Global Green Horizon Forum",
    body: [
      "SEOUL, South Korea — Tyler Rasch, leading environmental advocate and founder of Tyler Media, has been confirmed as a keynote speaker for the upcoming 2026 Global Green Horizon Forum. The forum, gathering key ESG leaders and policymakers worldwide, will address structural transformations in resource neutrality.",
      "Rasch will speak on 'The Economics of Daily Climate Choices,' offering a pragmatic analysis of how modern consumer platforms can facilitate green conversions without placing undue burdens on individuals. Drawing from his extensive B2B sustainability campaigns with top-tier brands like Cooper Vision and LG Electronics, he plans to call on conglomerates to redefine operational packaging systems.",
      "The speech will be livestreamed globally on June 21st, 2026, via the forum's official channels. Following the keynote, Tyler Rasch will participate in a private round-table discussion focusing on local government policy implementations for circular economic models."
    ]
  }
];

export const epkBios: EPKBios = {
  short: "Tyler Rasch is a leading media personality, environmental activist, and bilingual intellectual in South Korea. Known for his analytical depth and sharp social commentary, he serves as a strategic growth partner for global brands, specializing in environmental sustainability and structural innovation campaigns.",
  
  medium: "Tyler Rasch is a prominent American intellectual, media figure, and environmental advocate based in Seoul, South Korea. Armed with a deep understanding of Korean culture and systems, Tyler has spent over a decade translating complex global issues—ranging from climate action and resource neutrality to interdisciplinary humanities—into highly engaging, accessible media narratives. As the founder of Tyler Media, he collaborates with multinational enterprises to implement authentic ESG campaigns and structural branding initiatives.",
  
  long: "Tyler Rasch is South Korea's most trusted international voice, renowned for his work as a bilingual broadcaster, environmental strategist, and public intellectual. After receiving his Bachelor's degree in International Studies from the University of Chicago and a Master's degree in International Relations from Seoul National University, Tyler entered South Korea's media landscape, immediately establishing himself as a key intellectual presence. Over the past decade, he has authored best-selling books on climate action, hosted prime-time educational programs, and designed innovative B2B marketing models. As Chief Executive and Creative Director at Tyler Media (KNMIR Inc.), Tyler continues to bridge cultural and economic gaps, helping enterprises navigate macro crises like the 2026 AI transition and climate neutrality through contextual sustainability campaigns, structural reform advice, and high-impact media production."
};

export const operationalMetrics: OperationalMetric[] = [
  { label: "Active Channels Reach", value: "3.2M+", category: "reach" },
  { label: "YouTube Subscribers", value: "165K+", category: "reach" },
  { label: "Instagram Followers", value: "240K+", category: "reach" },
  { label: "Primary Demographic", value: "25 - 44 Years (68%)", category: "demographic" },
  { label: "Gender Engagement", value: "Female 58% | Male 42%", category: "demographic" },
  { label: "B2B Campaign Track Record", value: "45+ Corporate Projects", category: "logistics" },
  { label: "Operational HQ", value: "Seoul, South Korea", category: "logistics" },
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
