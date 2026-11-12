/* ==========================================================================
   One Big World Show (1BWS / 원빅월드쇼) — Interactive Application Logic
   Bilingual (KR/EN), Media Hub, Dossier Slide-Over, Panels, Modals
   ========================================================================== */

let currentLang = 'ko';
let currentPlatformFilter = 'all';
let currentTopicFilter = 'all';
let currentRegionFilter = 'all';
let activeEpisodeId = 'ep-1';
let isPlayingSim = false;
let activeReplaceSlotEl = null;
let activeDossierMlaSources = [];

/* --- 1. Bilingual Dictionary (KR / EN) --- */
const i18nDict = {
  ko: {
    'topbar.edition': '1BWS GLOBAL EDITION — VOL. 2026',
    'topbar.dateline': 'SEOUL · WASHINGTON · BRUSSELS · SINGAPORE',
    'topbar.primarySource': '1차 사료 교차 검증 저널리즘 (MLA 9TH ED.)',
    'nav.subbrand': '원빅월드쇼 · 1BWS',
    'nav.mastheadTag': '1차 사료 기반 설명 저널리즘 · PRIMARY SOURCE ARCHIVE',
    'nav.manifesto': 'Manifesto',
    'nav.mediaHub': 'Broadcast',
    'nav.intelligence': 'Dossiers',
    'nav.cast': 'Panels',
    'nav.press': 'Press',
    'nav.store': 'Store',
    'nav.getInvolved': 'Participate',
    'nav.partnerships': 'Partnerships',
    'nav.newsletterBtn': '뉴스레터 구독',
    'hero.rubricSub': '1차 사료 기반 글로벌 설명 저널리즘',
    'hero.lensBadge': '핵심 프레임 →',
    'hero.issueStamp': '1BWS EDITORIAL FLAGSHIP · TYLER MEDIA',
    'hero.headlineKr': '단편적인 뉴스를 넘어, <mark class="vox-highlight">거대한 세계의 판을 읽다</mark> — 원빅월드쇼 (1BWS)',
    'hero.subcopy': '거시경제와 자본의 이동, 지정학적 단층선, 기술·에너지 공급망, 그리고 역사와 문화의 맥락까지. 원빅월드쇼(1BWS)는 2차 인용을 배제하고 직접 검증한 1차 사료(Primary Sources)와 다각도의 시선으로 하나의 세계가 작동하는 구조적 메커니즘을 해부합니다.',
    'hero.ctaPrimary': '최신 에피소드 시청하기 →',
    'hero.ctaSecondary': '1BWS 편집 선언문 (Manifesto) 열람',
    'hero.stat1Label': 'ANALYTICAL LENS',
    'hero.stat1Val': 'Global Macro & Realpolitik',
    'hero.stat2Label': 'RESEARCH STANDARD',
    'hero.stat2Val': 'MLA 1차 사료 교차 검증',
    'hero.stat3Label': 'EDITORIAL CADENCE',
    'hero.stat3Val': '주간 심층 다큐 & 도시에',
    'hero.hotspotHint': 'INDEX OF THEMES',
    'hero.hotspotDefault': 'I. 통화와 자본의 질서 — 지정학적 전환기마다 재편되는 기축통화 체제, 국채 시장, 그리고 글로벌 유동성의 기저 흐름을 추적합니다.',
    'manifesto.headerTitle': 'THE 1BWS MANIFESTO & EDITORIAL CHARTER — 원빅월드쇼 저널리즘 선언문',
    'manifesto.title': '“세상은 단절된 사건들의 나열이 아니라, 치밀하게 맞물린 하나의 시스템(One Big World)입니다.”',
    'manifesto.p1': '오늘날의 미디어 환경은 파편화된 속보 경쟁과 확증 편향 알고리즘에 갇혀 사건의 표피만을 소비합니다. 그러나 한 국가의 입법 보고서 한 줄은 지구 반대편의 환율과 자본시장을 움직이고, 해협의 안보 위기는 글로벌 에너지 공급망과 통화 정책의 궤도를 동시에 수정합니다.',
    'manifesto.p2': '<strong>원빅월드쇼(One Big World Show / 1BWS)</strong>는 타일러 라쉬(Tyler Rasch)와 분야별 애널리스트·에디터들이 구축한 <strong>글로벌 지식 저널리즘 & 리얼폴리틱 미디어</strong>입니다. 우리는 자극적인 논평이나 단순 외신 번역을 지양하고, 각국 중앙은행 문건, 의회 속기록, 조약 원문, 학술 논문 등 검증 가능한 1차 사료(Primary Sources)를 직접 해독하여 입체적인 시각을 제시합니다.',
    'manifesto.pillar1': '<strong>01. 구조적 매크로 프리즘 (Structural Macro Prism):</strong> 파편화된 현상 이면에서 자본과 통화, 공급망과 국가 안보가 맞물려 돌아가는 구조적 인과관계를 입체적으로 분석합니다.',
    'manifesto.pillar2': '<strong>02. 1차 사료 우선주의 (Primary-Source Mandate):</strong> 모든 심층 에피소드와 인텔리전스 도시에(Dossier)는 MLA 학술 표준에 준하는 원문 서지 정보를 투명하게 공개합니다.',
    'manifesto.pillar3': '<strong>03. 다극화 시대의 교차 검증 (Multi-Polar Perspective):</strong> 단일 진영의 프레임을 넘어 북미, 유럽·중동, 아시아·한국, 글로벌 사우스의 이해관계를 교차 검증합니다.',
    'media.sectionTitle': 'Multi-Platform Media Hub',
    'media.sectionSubtitle': '유튜브 심층 탐사 다큐멘터리부터 무삭제 라운드테이블 팟캐스트, 핵심 브리핑 클립까지 — 에피소드별 3줄 핵심 요약과 연관 1차 사료 브리프를 한곳에서 탐색하세요.',
    'media.playEpisode': '에피소드 스트리밍 재생',
    'media.summaryHeader': '3줄 핵심 해설 (3-LINE EXPLAINER)',
    'media.tagsHeader': 'KEY REGIONS & SUBJECTS',
    'media.relatedBriefBtn': '연관 리서치 도시에 열람 (MLA 1차 사료 포함) →',
    'media.tabAll': '전체 포맷 (All)',
    'media.tabYoutube': '1BWS 심층분석 (YouTube)',
    'media.tabPodcast': '1BWS 풀 팟캐스트',
    'media.tabShorts': '핵심 브리핑 클립 (Shorts)',
    'dossier.sectionTitle': '1BWS Intelligence Dossier',
    'dossier.sectionSubtitle': '영상화 여부와 관계없이 원빅월드쇼 리서치 데스크가 발행하는 심층 분석 페이퍼, 정책 브리프, 1차 사료(MLA) 검증 아카이브입니다. 각 문건을 클릭하면 리더 뷰에서 전문과 원문 출처를 열람할 수 있습니다.',
    'dossier.filterTopicLabel': 'DISCIPLINE',
    'dossier.topicAll': '전체 분야',
    'dossier.topicMacro': '거시경제 · 자본시장',
    'dossier.topicGeo': '지정학 · 외교안보',
    'dossier.topicTech': '기술 · 에너지 공급망',
    'dossier.topicHistory': '역사 · 사료 아카이브',
    'dossier.filterRegionLabel': 'REGION',
    'dossier.regionAll': '전체 지역',
    'dossier.regionNA': '북미 (North America)',
    'dossier.regionEUME': '유럽 · 중동 (Europe & ME)',
    'dossier.regionAsia': '아시아 · 한국 (Asia & Korea)',
    'dossier.regionSouth': '글로벌 사우스 (Global South)',
    'dossier.downloadPdfBtn': 'PDF / 인쇄',
    'dossier.mlaHeader': 'VERIFIED PRIMARY SOURCES — MLA 9TH EDITION BIBLIOGRAPHY',
    'cast.sectionTitle': 'Panels',
    'cast.sectionSubtitle': '원빅월드쇼 메인 패널 타일러 라쉬(Tyler Rasch)와 거시경제·지정학·기술·역사 각 분과의 패널 및 객원 연구원 라인업입니다.',
    'cast.joinCrewBtn': '객원 패널 · 리서처 지원하기 →',
    'newsletter.headline': '매주 방송에서 다 다루지 못한 1차 사료 원문과 데스크 노트를 서재로 보내드립니다.',
    'newsletter.subcopy': '알고리즘의 소음 없이 매주 화요일 오전 7시, 원빅월드쇼(1BWS) 편집국이 엄선한 글로벌 거시 지표, 지정학 도시에 요약본, 그리고 원문 PDF 레퍼런스를 이메일로 받아보세요.',
    'newsletter.submitBtn': '뉴스레터 구독하기 →',
    'newsletter.igTitle': '1BWS 공식 인스타그램 공지채널 (Broadcast)',
    'newsletter.igDesc': '별도의 가입 절차 없이 원빅월드쇼 독자 커뮤니티에 합류하세요. 차기 에피소드 취재 노트, 실시간 사료 팩트체크, 독자 리서치 설문이 업데이트됩니다.',
    'newsletter.igBtn': '인스타그램 공지채널 입장하기 ↗',
    'press.sectionTitle': 'Press & Media Room',
    'press.sectionSubtitle': '국내외 주요 언론에 인용된 원빅월드쇼(1BWS)의 분석 리포트와 타일러 미디어(Tyler Media) 공식 국·영문 보도자료 아카이브입니다.',
    'press.downloadKitBtn': 'Official 1BWS Press Kit 다운로드 →',
    'press.cardTitle': '1BWS 공식 브랜드 에셋 & 프레스킷',
    'press.cardDesc': '언론 인용, 학술 세미나, 대외 파트너십 표기 시 아래 공식 워드마크 및 인장(Seal) 가이드를 준수해 주시기 바랍니다.',
    'press.instantDownloadBtn': '프레스킷 패키지 열람 및 다운로드',
    'store.sectionTitle': '1BWS Curated Editions',
    'store.sectionSubtitle': '원빅월드쇼 편집국이 발간하는 연감(Almanac), 아날로그 리서치 노트, 큐레이션 도서 박스 및 공식 에디토리얼 굿즈입니다. 클릭 시 네이버 스마트스토어로 이동합니다.',
    'store.visitStoreBtn': '네이버 스마트스토어 전체 보기 ↗',
    'inbound.sectionTitle': 'Editorial Submissions & Fellowships',
    'inbound.sectionSubtitle': '원빅월드쇼의 저널리즘은 현장 전문가와 독자들의 집단지성으로 깊어집니다. 검증 가능한 1차 사료를 제보하거나, 글로벌 판을 함께 해독할 에디토리얼 크루로 합류하세요.',
    'inbound.tipsTitle': '편집국 제보 & 1차 사료 기고',
    'inbound.tipsDesc': '원빅월드쇼가 심층 취재해야 할 글로벌 어젠다, 현업 전문가의 데이터 인사이트, 또는 학술 논문·정책 문건을 데스크에 전달해 주세요.',
    'inbound.tipsCheck1': '제보자 신원 비공개 원칙 및 익명 접수 완벽 보장',
    'inbound.tipsCheck2': '원문 PDF, 통계 데이터셋, 공공 문건 직접 첨부 지원',
    'inbound.tipsCheck3': '채택 시 에피소드 공식 자문 크레딧 및 도시에 공동 기고 연계',
    'inbound.tipsBtn': '제보 및 사료 접수 데스크 열기 →',
    'inbound.careersTitle': '온에어 패널 · 리포터 & 에디터 채용',
    'inbound.careersDesc': '타일러 라쉬와 함께 세계의 구조적 맥락을 브리핑할 분야별 객원 패널(Guest Panel), 한·영 바이링구얼 리포터, 리서치 에디터를 상시 모집합니다.',
    'inbound.careersCheck1': '객원 패널 (Guest Panel) — 거시경제·지정학·기술·역사 분야 현업 전문가 및 연구자',
    'inbound.careersCheck2': 'On-Air Reporter / Anchor — 한·영 바이링구얼 브리핑 및 팩트체크 진행',
    'inbound.careersCheck3': 'Research Editor & Strategic Intern — 1차 사료 해독 및 미디어 비즈니스',
    'inbound.careersBtn': '모집 직군 확인 및 포트폴리오 제출 →',
    'b2b.title': 'Institutional & Brand Partnerships',
    'b2b.subtitle': '대한민국과 글로벌 의사결정권자들이 신뢰하는 지식 저널리즘 IP, 원빅월드쇼(1BWS)와 함께 깊이 있는 브랜드 내러티브와 지적 권위를 구축하십시오.',
    'b2b.metric1Val': '88만+',
    'b2b.metric1Sub': '구독자 · 글로벌 지식 오디언스 (LIVE)',
    'b2b.metric2Val': '3,550만+',
    'b2b.metric2Sub': '최근 90일 멀티플랫폼 누적 조회수',
    'b2b.metric3Val': '69.8%',
    'b2b.metric3Sub': '25–54세 핵심 비즈니스 의사결정층',
    'b2b.metric4Val': '60.6%',
    'b2b.metric4Sub': '심층 콘텐츠 반복 시청 및 리텐션',
    'b2b.mediaKitBtn': '2026 공식 미디어킷 & 레이트카드 요청',
    'b2b.partnershipBtn': '브랜드 파트너십 · 스폰서십 문의하기 →',
    'footer.missionText': 'BEYOND THE HEADLINES, DECODING THE ONE BIG WORLD. 단편적인 뉴스를 넘어 1차 사료(Primary Sources)와 입체적 시선으로 세계의 메커니즘을 해독하는 글로벌 지식 저널리즘 미디어, 원빅월드쇼.',
    'footer.archTitle': '1BWS DIGITAL ECOSYSTEM ARCHITECTURE',
    'footer.archDesc': 'www.onebigworldshow.com 플래그십 포털을 중심으로 연동되는 도메인 아키텍처:',
    'footer.ethicsSummary': '원빅월드쇼는 엄격한 1차 사료 교차 검증, 투명한 AI 리서치 보조 도구 활용 공개, 그리고 인간 수석 에디터의 최종 원문 대조 데스크 검수 원칙을 준수합니다.',
    'footer.ethicsBtn': 'Journalistic Standards, Information Integrity & AI Disclosure Policy (편집 원칙 및 AI 윤리 정책)'
  },
  en: {
    'topbar.edition': '1BWS GLOBAL EDITION — VOL. 2026',
    'topbar.dateline': 'SEOUL · WASHINGTON · BRUSSELS · SINGAPORE',
    'topbar.primarySource': 'PRIMARY SOURCE VERIFIED JOURNALISM (MLA 9TH ED.)',
    'nav.subbrand': '원빅월드쇼 · 1BWS',
    'nav.mastheadTag': 'EXPLANATORY REALPOLITIK & PRIMARY SOURCE ARCHIVE',
    'nav.manifesto': 'Manifesto',
    'nav.mediaHub': 'Broadcast',
    'nav.intelligence': 'Dossiers',
    'nav.cast': 'Panels',
    'nav.press': 'Press',
    'nav.store': 'Store',
    'nav.getInvolved': 'Participate',
    'nav.partnerships': 'Partnerships',
    'nav.newsletterBtn': 'Subscribe Brief',
    'hero.rubricSub': 'PRIMARY-SOURCE EXPLANATORY JOURNALISM',
    'hero.lensBadge': 'THE LENS →',
    'hero.issueStamp': '1BWS EDITORIAL FLAGSHIP · TYLER MEDIA',
    'hero.headlineKr': 'Decoding the <mark class="vox-highlight">Structural Mechanisms</mark> of Our Interconnected World — One Big World Show (1BWS)',
    'hero.subcopy': 'Across global macroeconomics, geopolitical fault lines, technology and energy supply chains, and historical context—1BWS bypasses secondary commentary to dissect how our interconnected world operates through verified primary sources.',
    'hero.ctaPrimary': 'Watch Latest Episode →',
    'hero.ctaSecondary': 'Read the 1BWS Editorial Charter',
    'hero.stat1Label': 'ANALYTICAL LENS',
    'hero.stat1Val': 'Global Macro & Realpolitik',
    'hero.stat2Label': 'RESEARCH STANDARD',
    'hero.stat2Val': 'MLA Primary Source Verified',
    'hero.stat3Label': 'EDITORIAL CADENCE',
    'hero.stat3Val': 'Weekly Documentaries & Dossiers',
    'hero.hotspotHint': 'INDEX OF THEMES',
    'hero.hotspotDefault': 'I. Monetary & Capital Order — Tracing sovereign debt architectures, reserve currency realignments, and global liquidity cycles.',
    'manifesto.headerTitle': 'THE 1BWS MANIFESTO & EDITORIAL CHARTER',
    'manifesto.title': '“The world is not a sequence of isolated headlines—it is One Big Interconnected System.”',
    'manifesto.p1': 'Modern media ecosystems are trapped in breaking-news velocity and algorithmic echo chambers. Yet a single clause in a legislative filing shifts exchange rates and capital markets across oceans, while a maritime chokepoint crisis reshapes global energy supply chains and monetary policy trajectories simultaneously.',
    'manifesto.p2': '<strong>One Big World Show (1BWS)</strong> is a Global Knowledge & Realpolitik Media network led by Tyler Rasch and domain analysts. We bypass secondary commentary and directly examine central bank filings, parliamentary transcripts, treaties, and academic primary sources.',
    'manifesto.pillar1': '<strong>01. Structural Macro Prism:</strong> Tracing the deeper causal mechanisms linking capital flows, monetary architecture, industrial supply chains, and statecraft.',
    'manifesto.pillar2': '<strong>02. Primary-Source Mandate:</strong> Every investigative episode and intelligence dossier publishes a complete academic MLA 9th Edition primary bibliography.',
    'manifesto.pillar3': '<strong>03. Multi-Polar Cross-Verification:</strong> Examining North America, Europe & the Middle East, Asia & Korea, and the Global South beyond single-narrative frames.',
    'media.sectionTitle': 'Multi-Platform Media Hub',
    'media.sectionSubtitle': 'From full-length YouTube investigative documentaries to uncut roundtable podcasts and concise briefing clips — explore executive summaries and linked primary-source dossiers.',
    'media.playEpisode': 'Stream Featured Episode',
    'media.summaryHeader': '3-LINE EXECUTIVE EXPLAINER',
    'media.tagsHeader': 'KEY REGIONS & SUBJECTS',
    'media.relatedBriefBtn': 'Read Associated Dossier (with MLA Sources) →',
    'media.tabAll': 'All Formats',
    'media.tabYoutube': '1BWS Deep-Dive (YouTube)',
    'media.tabPodcast': '1BWS Full Podcast',
    'media.tabShorts': 'Short-Form Briefings',
    'dossier.sectionTitle': '1BWS Intelligence Dossier',
    'dossier.sectionSubtitle': 'High-density policy briefs, structural breakdowns, and MLA primary-source verified monographs published by the 1BWS Research Desk. Select any dossier to open the full reader.',
    'dossier.filterTopicLabel': 'DISCIPLINE',
    'dossier.topicAll': 'All Disciplines',
    'dossier.topicMacro': 'Macroeconomics & Capital',
    'dossier.topicGeo': 'Geopolitics & Statecraft',
    'dossier.topicTech': 'Tech & Energy Grids',
    'dossier.topicHistory': 'History & Archives',
    'dossier.filterRegionLabel': 'REGION',
    'dossier.regionAll': 'All Regions',
    'dossier.regionNA': 'North America',
    'dossier.regionEUME': 'Europe & Middle East',
    'dossier.regionAsia': 'Asia & Korea',
    'dossier.regionSouth': 'Global South',
    'dossier.downloadPdfBtn': 'PDF / PRINT',
    'dossier.mlaHeader': 'VERIFIED PRIMARY SOURCES — MLA 9TH EDITION BIBLIOGRAPHY',
    'cast.sectionTitle': 'Panels',
    'cast.sectionSubtitle': 'Meet 1BWS Main Panel Tyler Rasch alongside our roster of panels and visiting fellows across macroeconomics, geopolitics, technology, and history.',
    'cast.joinCrewBtn': 'Apply for Guest Panels & Fellowships →',
    'newsletter.headline': 'Receive the Primary Sources and Desk Notes Behind Every Episode.',
    'newsletter.subcopy': 'Dispatched every Tuesday at 7 AM KST without algorithmic noise: global macro indicators, geopolitical dossier abstracts, and direct primary-document references.',
    'newsletter.submitBtn': 'Subscribe to Dispatch →',
    'newsletter.igTitle': '1BWS Official Instagram Broadcast Channel',
    'newsletter.igDesc': 'Join our reader community directly without sign-up walls. Receive studio research notes, live primary-source fact-checks, and editorial polls.',
    'newsletter.igBtn': 'Join Instagram Broadcast Channel ↗',
    'press.sectionTitle': 'Press & Media Room',
    'press.sectionSubtitle': 'Domestic and international media citations of One Big World Show (1BWS) investigations and official bilingual press releases from Tyler Media.',
    'press.downloadKitBtn': 'Download Official 1BWS Press Kit →',
    'press.cardTitle': '1BWS Brand Specifications & Press Kit',
    'press.cardDesc': 'Please adhere to our official wordmark and seal guidelines for press citations, academic panels, and institutional partnerships.',
    'press.instantDownloadBtn': 'Open Full Press Kit Package',
    'store.sectionTitle': '1BWS Curated Editions',
    'store.sectionSubtitle': 'Annual almanacs, analyst field notebooks, curated book boxes, and official editorial editions. Selecting any item opens the product on Naver Smart Store.',
    'store.visitStoreBtn': 'View All on Naver Smart Store ↗',
    'inbound.sectionTitle': 'Editorial Submissions & Fellowships',
    'inbound.sectionSubtitle': '1BWS journalism is enriched by field practitioners and readers. Submit verifiable primary sources or apply to join our editorial desk.',
    'inbound.tipsTitle': 'Submit a Tip & Primary Sources',
    'inbound.tipsDesc': 'Share global agendas 1BWS should investigate, domain practitioner insights, or primary papers and official filings with our desk.',
    'inbound.tipsCheck1': 'Strict source confidentiality and anonymous submission protection',
    'inbound.tipsCheck2': 'Direct upload support for PDFs, statistical datasets, and public filings',
    'inbound.tipsCheck3': 'Advisory credit on broadcast episodes and joint dossier publication opportunities',
    'inbound.tipsBtn': 'Open Source Submission Desk →',
    'inbound.careersTitle': 'On-Air Panels, Reporters & Editors',
    'inbound.careersDesc': 'Rolling recruitment for Guest Panels, bilingual On-Air Reporters, and Research Editors to dissect global mechanisms alongside Tyler Rasch.',
    'inbound.careersCheck1': 'Guest Panel — Practitioners & scholars in Macro, Geopolitics, Tech, and History',
    'inbound.careersCheck2': 'On-Air Reporter / Anchor — KR/EN bilingual briefing and primary fact-checking',
    'inbound.careersCheck3': 'Research Editor & Strategic Intern — Primary source analysis and media strategy',
    'inbound.careersBtn': 'View Positions & Submit Portfolio →',
    'b2b.title': 'Institutional & Brand Partnerships',
    'b2b.subtitle': 'Build enduring intellectual authority alongside One Big World Show (1BWS), the global knowledge journalism IP trusted by decision-makers.',
    'b2b.metric1Val': '880K+',
    'b2b.metric1Sub': 'Subscribers · Global Knowledge Audience (LIVE)',
    'b2b.metric2Val': '35.5M+',
    'b2b.metric2Sub': '90-Day Cross-Platform Views',
    'b2b.metric3Val': '69.8%',
    'b2b.metric3Sub': 'Ages 25–54 Core Decision-Makers',
    'b2b.metric4Val': '60.6%',
    'b2b.metric4Sub': 'Documentary-Grade Viewer Retention',
    'b2b.mediaKitBtn': 'Request 2026 Media Kit & Rate Card',
    'b2b.partnershipBtn': 'Inquire About Brand Partnerships →',
    'footer.missionText': 'BEYOND THE HEADLINES, DECODING THE ONE BIG WORLD. Dissecting global mechanisms through verified primary sources and multi-polar perspectives.',
    'footer.archTitle': '1BWS DIGITAL ECOSYSTEM ARCHITECTURE',
    'footer.archDesc': 'Modular domain architecture anchored by www.onebigworldshow.com:',
    'footer.ethicsSummary': 'One Big World Show enforces strict primary-source cross-verification, transparent AI research assistance disclosure, and final human editor sign-off.',
    'footer.ethicsBtn': 'Journalistic Standards, Information Integrity & AI Disclosure Policy'
  }
};

/* --- 2. Plate I Thematic Index Data (Subtle, Erudite Framing) --- */
const hotspotData = {
  usd: {
    ko: 'I. 통화와 자본의 질서 — 지정학적 전환기마다 재편되는 기축통화 체제, 국채 시장, 그리고 글로벌 유동성의 기저 흐름을 추적합니다.',
    en: 'I. Monetary & Capital Order — Tracing sovereign debt architectures, reserve currency realignments, and global liquidity cycles.'
  },
  congress: {
    ko: 'II. 입법과 리얼폴리틱 — 각국 의회 법안 원문, 조약 문서, 외교 전문 등 1차 사료를 직접 해독하여 권력과 제도의 작동 원리를 분석합니다.',
    en: 'II. Legislation & Realpolitik — Reading primary legislative texts, treaties, and diplomatic filings to decode how institutional power operates.'
  },
  space: {
    ko: 'III. 기술 패권과 공급망 — AI 데이터센터 전력망, 차세대 원전, 반도체 및 핵심광물 공급망이 국가 안보와 직결되는 현장을 해부합니다.',
    en: 'III. Frontier Tech & Supply Chains — Dissecting how power grids, nuclear energy, semiconductors, and critical minerals reshape security.'
  },
  binoculars: {
    ko: 'IV. 사료 검증과 거시적 시야 — 단편적인 속보 너머의 역사적 평행이론과 구조적 맥락을 포착하는 1BWS의 아카이브 저널리즘을 상징합니다.',
    en: 'IV. Primary Archive & Deep Perspective — Connecting declassified historical records with contemporary structural shifts.'
  }
};

/* --- 3. Section 2: Multi-Platform Episodes Dataset (episode-thumb-1 ~ 6) --- */
const episodesData = [
  {
    id: 'ep-1',
    slot: 'episode-thumb-1',
    platform: 'youtube',
    platformLabel: { ko: '1BWS 심층분석 · YouTube', en: '1BWS Deep-Dive · YouTube' },
    code: 'DISPATCH 01 · GEOPOLITICS & MARITIME',
    date: '2026.11.02',
    duration: '14:31',
    views: { ko: '조회수 15.8만회', en: '157.6K Views' },
    chapter: { ko: 'CH.01: 제1도련선 돌파와 부산항의 전략적 부상', en: 'CH.01: First Island Chain & Busan Port’s Rise' },
    youtubeId: 'dUWffWSGPwQ',
    startSeconds: 28,
    youtubeUrl: 'https://www.youtube.com/watch?v=dUWffWSGPwQ&t=28s',
    thumbImg: '/1BWS/assets/ep-1-thumb.jpg',
    title: {
      ko: '미중 패권 전쟁의 반전, 대한민국에 역대급 기회가 터졌다!',
      en: 'Plot Twist in the US-China Hegemony War: Korea’s Historic Strategic Opportunity'
    },
    desc: {
      ko: '러시아의 163년 만의 블라디보스토크·두만강 개방, 중국 해운 물류망(LOGINK) 안보 논란, 그리고 미 해군 MRO 및 서방 신뢰 항만으로서 부산항이 맞이한 지정학적 대반전.',
      en: 'Russia opening Vladivostok & the Tumen River after 163 years, China’s LOGINK logistics security debate, and Busan Port’s rise as a Western trusted port & US Navy MRO hub.'
    },
    summary: {
      ko: [
        '1. 러시아가 163년 만에 블라디보스토크 항구 사용권과 두만강 하구 항행길을 중국에 개방하며 제1도련선과 동해 안보 지형이 급변하고 있습니다.',
        '2. 중국의 글로벌 해운 물류 데이터 플랫폼(LOGINK) 확산에 맞서 미국과 서방 동맹국이 ‘신뢰할 수 있는 항만 네트워크(Trusted Port)’ 재편에 나섰습니다.',
        '3. 미 해군 함정 유지·보수·정비(MRO) 전진기지이자 동북아 핵심 환적 허브로서 부산항과 한국 조선·해운 생태계가 맞이한 역대급 지정학적 기회를 분석합니다.'
      ],
      en: [
        '1. Russia’s decision to grant China access to Vladivostok Port and the Tumen River after 163 years reshapes the First Island Chain and East Sea security architecture.',
        '2. In response to China’s state-backed LOGINK shipping data network, the US and allies are restructuring supply chains around Trusted Port networks.',
        '3. We analyze how Busan Port and Korean shipyards are capturing a historic strategic opportunity as the premier US Navy MRO and Indo-Pacific transshipment hub.'
      ]
    },
    tags: ['US-China Realpolitik', 'Maritime Hegemony', 'Busan Port & MRO', 'First Island Chain', 'Supply Chain Security'],
    relatedBriefId: 'brief-3',
    artTheme: { bg: '#242e3d', accent: '#00c262', badge: 'FEATURED · GEOPOLITICS', roman: 'I' }
  },
  {
    id: 'ep-2',
    slot: 'episode-thumb-2',
    platform: 'youtube',
    platformLabel: { ko: '1BWS 심층분석 · YouTube', en: '1BWS Deep-Dive · YouTube' },
    code: 'EP.141 · TECH & ENERGY REALPOLITIK',
    date: '2026.10.20',
    duration: '41:05',
    views: { ko: '조회수 94만회', en: '940K Views' },
    chapter: { ko: 'CH.03: SMR 소형모듈원전과 빅테크 전력망', en: 'CH.03: SMR Nuclear Deals & Hyperscaler Grids' },
    title: {
      ko: 'AI 산업의 진짜 병목은 칩이 아니라 ‘전력망’이다: 빅테크의 원자력 직계약과 한국 전력기기 밸류체인',
      en: 'The True AI Bottleneck Is the Power Grid: Big Tech Nuclear PPAs & Korea’s Grid Equipment Surge'
    },
    desc: {
      ko: '미국 연방에너지규제위원회(FERC) 문건으로 본 데이터센터 전력 전쟁과 초고압 변압기·SMR 지정학.',
      en: 'Inside FERC filings on hyperscale data center load growth, nuclear PPAs, and Korean grid exports.'
    },
    summary: {
      ko: [
        '1. 미 연방에너지규제위원회(FERC) 기각 결정문 원문을 통해 빅테크 데이터센터의 원전 직결(Co-location) 갈등을 분석합니다.',
        '2. 북미 노후 송전망 교체 주기와 맞물려 한국 초고압 변압기·전선 산업이 맞이한 구조적 슈퍼사이클을 데이터로 검증합니다.',
        '3. 차세대 소형모듈원전(SMR) 표준 경쟁에서 한·미 에너지 공급망 협력이 갖는 지정학적 레버리지를 짚어봅니다.'
      ],
      en: [
        '1. Primary FERC dockets reveal intense regulatory battles over co-locating AI data centers directly at nuclear plants.',
        '2. North America’s aging grid replacement cycle has triggered a structural supercycle for Korean ultra-high-voltage transformers.',
        '3. Evaluating the US-ROK nuclear supply chain partnership in the race to standardize SMR deployment.'
      ]
    },
    tags: ['North America', 'Korea Grid', 'AI & Nuclear', 'FERC Filings', 'Supply Chain'],
    relatedBriefId: 'brief-2',
    artTheme: { bg: '#004d26', accent: '#c2601c', badge: 'ISSUE 141 · ENERGY', roman: 'II' }
  },
  {
    id: 'ep-3',
    slot: 'episode-thumb-3',
    platform: 'podcast',
    platformLabel: { ko: '1BWS 풀 팟캐스트', en: '1BWS Full Podcast' },
    code: 'POD.88 · UNCUT ROUNDTABLE',
    date: '2026.10.16',
    duration: '1:18:40',
    views: { ko: '청취 62만회', en: '620K Listens' },
    chapter: { ko: 'CH.04: 북극항로와 해운 보험의 지정학', en: 'CH.04: Arctic Shipping Lanes & Maritime Insurance' },
    title: {
      ko: '[무삭제 라운드테이블] 수에즈·호르무즈 너머 북극항로가 열린다: 해양 패권의 이동과 부산항의 미래',
      en: '[Uncut Roundtable] Beyond Suez & Hormuz—The Arctic Route Opens: Maritime Hegemony & Busan Port'
    },
    desc: {
      ko: '타일러 라쉬와 해양안보·국제통상 전문가 3인의 78분 심층 대담 및 런던 로이즈 보험 요율 사료 분석.',
      en: '78-minute uncut roundtable dissecting Lloyd’s maritime war-risk filings and Arctic shipping treaties.'
    },
    summary: {
      ko: [
        '1. 런던 로이즈(Lloyd’s) 해상 전쟁보험 할증료 추이를 통해 홍해·중동 해협 위기가 글로벌 물류비에 미친 실제 비용을 계산합니다.',
        '2. 러시아·중국·북유럽이 각축전을 벌이는 북극항로(NSR) 쇄빙선 데이터와 동북아 물류 허브 지형 변화를 추적합니다.',
        '3. 조선업 슈퍼사이클과 해양 안보가 교차하는 지점에서 한국이 취해야 할 리얼폴리틱 전략을 토론합니다.'
      ],
      en: [
        '1. Tracking Lloyd’s maritime war-risk premiums to quantify the true inflationary cost of Red Sea chokepoints.',
        '2. Analyzing Northern Sea Route (NSR) icebreaker transit data and the shifting logistics hub of Northeast Asia.',
        '3. Debating Korea’s shipbuilding leverage at the intersection of commercial trade and naval realpolitik.'
      ]
    },
    tags: ['Europe & ME', 'East Asia', 'Maritime Geopolitics', 'Roundtable'],
    relatedBriefId: 'brief-3',
    artTheme: { bg: '#4d150b', accent: '#00c262', badge: 'PODCAST 88 · MARITIME', roman: 'III' }
  },
  {
    id: 'ep-4',
    slot: 'episode-thumb-4',
    platform: 'youtube',
    platformLabel: { ko: '1BWS 심층분석 · YouTube', en: '1BWS Deep-Dive · YouTube' },
    code: 'EP.140 · EUROPEAN REALPOLITIK',
    date: '2026.10.11',
    duration: '37:52',
    views: { ko: '조회수 89만회', en: '890K Views' },
    chapter: { ko: 'CH.01: 드라기 리포트 400페이지 원문 해독', en: 'CH.01: Decoding the 400-Page Draghi Report' },
    title: {
      ko: '유럽 경제는 왜 미·중 사이에서 길을 잃었나? 마리오 드라기 ‘유럽 경쟁력 보고서’ 400페이지 완전 해부',
      en: 'Why Europe Lost Its Edge Between the US & China: Decoding Mario Draghi’s 400-Page Competitiveness Report'
    },
    desc: {
      ko: 'EU 집행위원회 공식 보고서 원문을 바탕으로 유럽 제조업·방산·에너지 위기의 구조적 원인을 진단합니다.',
      en: 'A primary-source breakdown of the European Commission’s Draghi Report on energy, defense, and tech.'
    },
    summary: {
      ko: [
        '1. 마리오 드라기 전 ECB 총재가 작성한 EU 경쟁력 보고서 원문의 핵심 차트 12개를 한국어 최초로 완벽 번역·해설합니다.',
        '2. 미국 대비 2~3배 높은 산업용 가스·전기 요금이 독일 화학·자동차 산업의 탈유럽화를 촉발한 과정을 추적합니다.',
        '3. 유럽의 공동 방산 조달 확대가 한국 방위산업 및 글로벌 공급망에 주는 기회와 규제 장벽을 짚어봅니다.'
      ],
      en: [
        '1. Translating and analyzing 12 core charts directly from Mario Draghi’s European Commission report.',
        '2. How industrial electricity and gas prices 2–3x higher than the US triggered German manufacturing deindustrialization.',
        '3. Assessing opportunities and protectionist barriers for Korean defense exports amid EU joint procurement.'
      ]
    },
    tags: ['European Union', 'Industrial Policy', 'Draghi Report', 'Energy Asymmetry'],
    relatedBriefId: 'brief-4',
    artTheme: { bg: '#242e3d', accent: '#c2601c', badge: 'ISSUE 140 · EUROPE', roman: 'IV' }
  },
  {
    id: 'ep-5',
    slot: 'episode-thumb-5',
    platform: 'shorts',
    platformLabel: { ko: '핵심 브리핑 클립 · Shorts', en: 'Briefing Clip · Shorts' },
    code: 'CLIP.310 · 90-SEC BRIEFING',
    date: '2026.10.08',
    duration: '01:28',
    views: { ko: '조회수 245만회', en: '2.45M Views' },
    chapter: { ko: '핵심 요약: 리튬 삼각지대와 글로벌 사우스', en: 'Key Takeaway: Lithium Triangle & Global South' },
    title: {
      ko: '[90초 브리핑] 남미 ‘리튬 삼각지대’가 자원 민족주의를 선언한 진짜 이유 — 지도 한 장으로 읽는 핵심광물 지정학',
      en: '[90s Briefing] Why South America’s Lithium Triangle Pivoted to Resource Nationalism — Mapped'
    },
    desc: {
      ko: '칠레·아르헨티나·볼리비아 광물 협정 원문 요약 및 글로벌 배터리 공급망 하이라이트 클립.',
      en: 'Concise briefing clip summarizing primary mining decrees in Chile, Argentina, and Bolivia.'
    },
    summary: {
      ko: [
        '1. 칠레 국가리튬전략(ENL) 법령 원문에 명시된 민관 합작 지분 51% 조항의 핵심 의미를 90초 만에 정리합니다.',
        '2. 미 인플레이션 감축법(IRA) 핵심광물 요건과 중국의 남미 제련소 선점 전략이 충돌하는 현장을 포착합니다.',
        '3. 한국 배터리·양극재 기업들의 공급망 다변화 현황을 객관적인 데이터로 짚어봅니다.'
      ],
      en: [
        '1. Summarizing Chile’s National Lithium Strategy (51% state equity mandate) from primary decrees in 90 seconds.',
        '2. Mapping the collision between US IRA critical mineral rules and Chinese refining investments in Latin America.',
        '3. Visualizing how Korean battery makers navigate Global South resource nationalism.'
      ]
    },
    tags: ['Global South', 'Critical Minerals', 'Short Briefing', 'Supply Chain'],
    relatedBriefId: 'brief-5',
    artTheme: { bg: '#864413', accent: '#ffffff', badge: 'BRIEF 310 · MINERALS', roman: 'V' }
  },
  {
    id: 'ep-6',
    slot: 'episode-thumb-6',
    platform: 'podcast',
    platformLabel: { ko: '1BWS 풀 팟캐스트', en: '1BWS Full Podcast' },
    code: 'POD.87 · HISTORICAL ARCHIVE',
    date: '2026.10.02',
    duration: '1:04:15',
    views: { ko: '청취 58만회', en: '580K Listens' },
    chapter: { ko: 'CH.02: 1971 닉슨 쇼크 기밀해제 테이프', en: 'CH.02: 1971 Nixon Shock Declassified Tapes' },
    title: {
      ko: '1971년 캠프 데이비드의 72시간: 금태환 정지 기밀해제 녹취록으로 읽는 현대 통화 체제의 기원',
      en: '72 Hours at Camp David (1971): Reading the Declassified Nixon Tapes on the Birth of the Modern Monetary Era'
    },
    desc: {
      ko: '미 국립문서기록관리청(NARA) 기밀해제 녹취록 원문 분석 및 2026년 현재 통상·통화 질서와의 구조적 평행이론.',
      en: 'Reading verbatim from NARA declassified Camp David transcripts and drawing structural parallels to 2026.'
    },
    summary: {
      ko: [
        '1. 1971년 8월 13~15일 캠프 데이비드 회의의 미 국립문서기록관리청(NARA) 기밀해제 대화록을 직접 낭독·분석합니다.',
        '2. 폴 볼커와 존 코널리 재무장관이 설계한 ‘10% 수입부가세’와 금태환 정지가 오늘날 관세·환율 협상의 원형임을 밝힙니다.',
        '3. 브레튼우즈 이후 55년간 이어진 명목화폐(Fiat) 체제의 팽창과 현대 준비자산 다변화의 역사적 맥락을 조망합니다.'
      ],
      en: [
        '1. Reading verbatim from NARA declassified transcripts of the August 1971 Camp David monetary summit.',
        '2. How John Connally’s 10% import surcharge and gold window closure became the blueprint for modern tariff leverage.',
        '3. Connecting 55 years of post-Bretton Woods monetary history to contemporary sovereign reserve diversification.'
      ]
    },
    tags: ['History & Archive', 'NARA Primary Docs', 'Bretton Woods', 'Podcast'],
    relatedBriefId: 'brief-6',
    artTheme: { bg: '#4d150b', accent: '#c2601c', badge: 'PODCAST 87 · ARCHIVE', roman: 'VI' }
  }
];

/* --- 4. Section 3: Intelligence Dossiers Dataset (with MLA Primary Sources) --- */
const dossiersData = [
  {
    id: 'brief-1',
    code: 'DOSSIER NO. 2026-42',
    topic: 'macro',
    topicLabel: { ko: '거시경제 · 자본시장', en: 'Macroeconomics & Capital' },
    tagClass: '',
    region: 'na',
    regionLabel: { ko: '북미 (North America)', en: 'North America' },
    date: '2026.10.27',
    readTime: '9 MIN READ',
    title: {
      ko: '스테이블코인의 국채 수요 흡수 메커니즘: 미 재무부 차입자문위원회(TBAC) 문건으로 본 디지털 통화 지정학',
      en: 'Stablecoins and Sovereign Debt Demand: Inside TBAC Filings and Digital Monetary Architecture'
    },
    p1: {
      ko: '미 연방준비제도(Fed)의 양적긴축(QT)과 외국 중앙은행의 미 국채 보유 비중 변화 속에서도 단기 국채(T-Bills) 수요가 견조하게 유지되는 배경에는 규제된 스테이블코인 발행사들의 구조적 매수세가 자리 잡고 있습니다.',
      en: 'Even amid Federal Reserve quantitative tightening and shifting foreign official holdings, short-term US Treasury bill demand has found a structural buyer: regulated stablecoin issuers.'
    },
    p2: {
      ko: '본 도시에(Dossier)는 미 재무부 차입자문위원회(TBAC) 발표 원문과 의회 법안을 대조하여, 국채 담보형 민간 디지털 통화가 어떻게 글로벌 단기 자금 시장과 신흥국 통화 주권을 재편하는지 해부합니다.',
      en: 'Cross-referencing US Treasury Borrowing Advisory Committee (TBAC) decks with legislative texts, this dossier decodes how private digital tokens reshape sovereign debt demand.'
    },
    fullBody: {
      ko: `
        <h4>1. 핵심 문제의식: 왜 워싱턴은 소매용 CBDC 대신 국채 담보 스테이블코인을 제도화했는가?</h4>
        <p>2024~2026년 사이 미국의 통화 및 디지털 자산 입법 기류는 결정적 전환점을 맞았습니다. 중앙은행이 직접 발행하는 소매용 CBDC는 금융중개 기능 약화 우려로 입법이 제한된 반면, 미 단기 국채(T-Bills)와 역레포(RRP)를 100% 준비금으로 강제하는 민간 스테이블코인 프레임워크는 초당적 합의를 확보했습니다.</p>
        <h4>2. 1차 사료 검증: TBAC 보고서 속 단기 국채 흡수 구조</h4>
        <p>미 재무부 차입자문위원회(TBAC)가 공개한 분기별 프레젠테이션 사료에 따르면, 주요 발행사들의 미 단기 국채 보유량은 주요국 정부의 단기채 보유 규모와 맞먹는 수준으로 성장했습니다. 전 세계 시장 참여자들이 디지털 결제 수단을 보유할 때마다 해당 유동성이 재정적자를 메우는 단기 국채 수요로 자동 전환되는 구조입니다.</p>
        <h4>3. 개방형 자본시장과 통화 정책에 대한 시사점</h4>
        <p>이러한 구조는 한국을 비롯한 개방형 자본시장에 중요한 정책적 과제를 던집니다. 역외 디지털 결제 수요가 자본 유출입 변동성으로 이어질 위험을 정밀하게 모니터링하는 동시에, 기관용 결제 인프라와 국내 자본시장의 제도적 경쟁력을 고도화해야 합니다.</p>
      `,
      en: `
        <h4>1. Executive Thesis: Why Washington Pivoted from Retail CBDCs to Treasury-Backed Frameworks</h4>
        <p>Between 2024 and 2026, US monetary legislation underwent a decisive pivot. While retail Central Bank Digital Currencies (CBDCs) faced legislative hurdles over banking disintermediation concerns, bipartisan frameworks mandated 100% backing in short-term US Treasury bills (T-Bills) and repos for regulated private issuers.</p>
        <h4>2. Primary Source Analysis: Inside the TBAC Presentation Decks</h4>
        <p>According to primary presentation decks released by the US Treasury Borrowing Advisory Committee (TBAC), aggregate T-Bill holdings by private token issuers now rival the short-term holdings of major sovereigns, channeling global settlement liquidity into financing US fiscal deficits.</p>
        <h4>3. Strategic Implications for Open Capital Markets</h4>
        <p>For open export economies like South Korea, this architecture requires balancing cross-border capital flow oversight with the modernization of domestic institutional settlement infrastructure.</p>
      `
    },
    mlaSources: [
      'United States, Department of the Treasury, Treasury Borrowing Advisory Committee (TBAC). "Digital Money and Treasury Market Demand." Report to the Secretary of the Treasury, U.S. Department of the Treasury, 30 Oct. 2024, home.treasury.gov/policy-issues/financing-the-government.',
      'Bank for International Settlements (BIS). "Stablecoins versus Tokenised Deposits: Implications for the Singleness of Money." BIS Annual Economic Report, June 2025, pp. 85–114.',
      'Bank of Korea (한국은행). "글로벌 스테이블코인 규제 동향 및 통화주권 파급영향 분석 (Analysis of Global Stablecoin Regulation and Monetary Sovereignty)." 지급결제조사자료, vol. 2026-2, 2026, pp. 1–48.'
    ]
  },
  {
    id: 'brief-2',
    code: 'DOSSIER NO. 2026-41',
    topic: 'tech',
    topicLabel: { ko: '기술 · 에너지 공급망', en: 'Tech & Energy Grids' },
    tagClass: '',
    region: 'na',
    regionLabel: { ko: '북미 (North America)', en: 'North America' },
    date: '2026.10.20',
    readTime: '11 MIN READ',
    title: {
      ko: 'FERC 기각 결정문(Docket ER24-2172) 해독: 빅테크 데이터센터의 원전 전력 직결 갈등과 북미 그리드 병목',
      en: 'Decoding FERC Docket ER24-2172: Hyperscale Data Centers, Nuclear Co-Location, and Grid Bottlenecks'
    },
    p1: {
      ko: '초거대 AI 클러스터가 기가와트(GW) 단위의 기저부하 전력을 요구하면서, 주요 하이퍼스케일러들은 기존 송전망 대기열을 우회해 원자력 발전소 부지 내 직접 연결(Behind-the-Meter)을 추진하고 있습니다.',
      en: 'As frontier AI clusters demand gigawatt-scale baseload power, hyperscalers have sought behind-the-meter co-location directly at nuclear power stations to bypass multi-year grid interconnection queues.'
    },
    p2: {
      ko: '미국 연방에너지규제위원회(FERC)의 서스케하나 원전 관련 결정문 원문을 분석하여, 가계 전기요금 인상 우려와 AI 인프라 안보 논리가 충돌하는 현장을 짚고 한국 전력기기 산업의 구조적 수혜를 검증합니다.',
      en: 'Analyzing the primary FERC order on the Susquehanna nuclear facility, we examine the clash between household grid reliability and AI infrastructure—and why Korean transformer exports are surging.'
    },
    fullBody: {
      ko: `
        <h4>1. FERC Docket No. ER24-2172 원문 핵심 분석</h4>
        <p>미 연방에너지규제위원회(FERC)는 탈렌 에너지(Talen Energy)의 서스케하나 원전과 데이터센터 간 송전망 비용 분담 논란이 일었던 수정 상호연결 협정(ISA)을 기각했습니다. 원문 결정문의 핵심은 기저부하 원전 전력이 특정 데이터센터에 배타적으로 직결될 경우 PJM 전력망 전체의 예비율이 하락하고 일반 소비자의 송전망 유지비 부담이 증가한다는 점입니다.</p>
        <h4>2. 7년 대기열에 갇힌 북미 송전망과 초고압 변압기 쇼티지</h4>
        <p>미국 로렌스 버클리 국립연구소(LBNL) 1차 통계에 따르면, 신규 발전 및 부하 설비가 미국 송전망에 연결되기까지 걸리는 평균 대기 기간은 5~7년에 달합니다. 특히 345kV 이상 초고압 변압기의 리드타임은 3년 이상으로 늘어났으며, 이는 한국 중전기 제조사들이 북미 유틸리티 기업들과 장기 공급계약을 체결하는 핵심 동력이 되었습니다.</p>
      `,
      en: `
        <h4>1. Primary Analysis of FERC Docket No. ER24-2172</h4>
        <p>The Federal Energy Regulatory Commission (FERC) rejected the amended Interconnection Service Agreement (ISA) at the Susquehanna nuclear plant, citing grid reliability risks and cost shifts to retail ratepayers across the PJM Interconnection.</p>
        <h4>2. The 7-Year Interconnection Queue & Transformer Bottleneck</h4>
        <p>Primary data from Lawrence Berkeley National Laboratory (LBNL) confirms that grid interconnection queues now exceed 5–7 years, with lead times for extra-high-voltage (345kV+) power transformers stretching beyond 36 months—driving multi-year backlogs for South Korean grid hardware manufacturers.</p>
      `
    },
    mlaSources: [
      'United States, Federal Energy Regulatory Commission (FERC). "PJM Interconnection, L.L.C., Order Rejecting Amended Interconnection Service Agreement." Docket No. ER24-2172-000, 1 Nov. 2024, elibrary.ferc.gov.',
      'Rand, Joseph, et al. "Queued Up: Characteristics of Power Plants Seeking Transmission Interconnection." Lawrence Berkeley National Laboratory, Apr. 2025, emp.lbl.gov/queues.',
      'International Energy Agency (IEA). "Electricity 2026: Analysis and Forecast to 2028—Data Centres and AI Load Growth." IEA Publications, Jan. 2026.'
    ]
  },
  {
    id: 'brief-3',
    code: 'DOSSIER NO. 2026-39',
    topic: 'geopolitics',
    topicLabel: { ko: '지정학 · 외교안보', en: 'Geopolitics & Statecraft' },
    tagClass: 'earth-tag',
    region: 'asia',
    regionLabel: { ko: '아시아 · 한국 (Asia & Korea)', en: 'Asia & Korea' },
    date: '2026.10.16',
    readTime: '10 MIN READ',
    title: {
      ko: '북극항로(NSR) 쇄빙선 항적 데이터와 해상 전쟁보험 요율로 본 유라시아 해운 지정학의 재편',
      en: 'Arctic Shipping (NSR) Icebreaker Telemetry & War-Risk Insurance: Eurasia’s New Maritime Geopolitics'
    },
    p1: {
      ko: '수에즈 운하 및 바브엘만데브 해협의 상시적 안보 불안으로 인해 런던 해상 보험 시장의 전쟁위험 할증료(War Risk Premium)가 구조화되면서, 여름·가을철 북극항로(Northern Sea Route)의 전략적 가치가 빠르게 재평가되고 있습니다.',
      en: 'Persistent security disruptions in the Red Sea have structurally elevated London maritime war-risk premiums, accelerating the strategic revaluation of the Arctic Northern Sea Route (NSR).'
    },
    p2: {
      ko: '노르웨이 북극물류센터(CHNL)의 1차 항적 통계와 국제해사기구(IMO) 극지규약 문건을 대조하여, 에너지 운반선 및 컨테이너선의 북극 통항 증가가 한국 조선업과 부산항에 갖는 전략적 함의를 도출합니다.',
      en: 'Combining CHNL vessel telemetry with IMO Polar Code filings, we assess how Arctic LNG and container transits impact Korean shipbuilders and Northeast Asian port hubs.'
    },
    fullBody: {
      ko: `
        <h4>1. 해협 지정학의 비용화: 로이즈 합동전쟁위원회(JWC) 구역 지정</h4>
        <p>해상 운송의 자유는 군사력뿐 아니라 ‘보험 요율’에 의해 결정됩니다. 런던 로이즈 합동전쟁위원회(JWC)가 지정한 고위험 해역 공고문에 따르면, 선박 가액 대비 전쟁보험료율이 상승할수록 선주들은 희망봉 우회 또는 대체 항로를 모색하게 됩니다.</p>
        <h4>2. 북극항로(NSR) 물동량 데이터와 한국의 레버리지</h4>
        <p>북극항로 정보센터(CHNL)의 선박 자동식별장치(AIS) 1차 데이터를 보면 원유·LNG 및 벌크 화물의 동서 통항량이 역대 최고치를 경신했습니다. 극지 운항 기술과 고부가 선박 건조 역량을 보유한 한국 조선 생태계와 동북아 기점 항만인 부산항은 지정학적 리스크와 상업적 기회를 동시에 정밀 관리해야 합니다.</p>
      `,
      en: `
        <h4>1. Pricing Chokepoint Risk: Lloyd’s Joint War Committee Filings</h4>
        <p>Freedom of navigation is governed not only by navies but by actuarial tables. Primary circulars from the Lloyd’s Market Association Joint War Committee (JWC) illustrate how war-risk hull premiums force structural rerouting.</p>
        <h4>2. AIS Telemetry on the Northern Sea Route & Korean Shipbuilding</h4>
        <p>Primary AIS transit logs compiled by the Center for High North Logistics (CHNL) show record eastbound hydrocarbon and bulk shipments, placing South Korea’s ice-class shipyards and Busan Port at a pivotal geopolitical crossroads.</p>
      `
    },
    mlaSources: [
      'Centre for High North Logistics (CHNL). "Northern Sea Route Transit Statistics and Vessel AIS Analysis 2025–2026." CHNL Information Office, Nord University, 2026, arctic-lio.com.',
      'Joint War Committee (JWC). "Hull War, Piracy, Terrorism and Related Perils Listed Areas (JWLA-032)." Lloyd’s Market Association, London, 2025.',
      'International Maritime Organization (IMO). "International Code for Ships Operating in Polar Waters (Polar Code)." Resolution MSC.385(94), IMO, London.'
    ]
  },
  {
    id: 'brief-4',
    code: 'DOSSIER NO. 2026-38',
    topic: 'macro',
    topicLabel: { ko: '거시경제 · 자본시장', en: 'Macroeconomics & Capital' },
    tagClass: '',
    region: 'eume',
    regionLabel: { ko: '유럽 · 중동 (Europe & ME)', en: 'Europe & Middle East' },
    date: '2026.10.11',
    readTime: '12 MIN READ',
    title: {
      ko: '마리오 드라기 ‘유럽 경쟁력 미래 보고서’ 원문 해부: 에너지 고비용 구조와 유럽 방산·산업정책의 전환',
      en: 'Dissecting Mario Draghi’s EU Competitiveness Report: Energy Asymmetry & Industrial Policy'
    },
    p1: {
      ko: '마리오 드라기 전 유럽중앙은행(ECB) 총재가 유럽연합 집행위원회에 제출한 400페이지 분량의 보고서는 유럽이 겪고 있는 저성장이 단순한 경기 순환이 아니라 기술·에너지·안보의 구조적 위기임을 1차 데이터로 고발합니다.',
      en: 'Mario Draghi’s 400-page report to the European Commission documents with stark primary data that Europe’s stagnation is not cyclical, but a structural crisis of energy cost, tech scale, and fragmented defense.'
    },
    p2: {
      ko: '보고서 파트 B(심층 섹터 분석)의 전력 도매가격 격차 및 공동 채권 발행 제안을 중심으로, 유럽의 산업 보호주의와 방산 내재화가 글로벌 무역 질서에 미칠 파장을 분석합니다.',
      en: 'Focusing on Part B of the primary text, we analyze industrial power price gaps, joint Eurobond proposals, and how European defense localization affects global trade.'
    },
    fullBody: {
      ko: `
        <h4>1. 드라기 리포트 핵심 진단: 3대 축의 동시 붕괴</h4>
        <p>보고서 원문은 지난 20년간 유럽의 번영을 지탱했던 세 가지 기둥—러시아산 값싼 파이프라인 가스, 중국이라는 거대 수출 시장, 미국의 안보 우산—이 동시에 사라졌다고 명시합니다. 유럽 산업용 전기요금은 미국 대비 158%, 천연가스 가격은 345% 높은 수준에 고착화되었습니다.</p>
        <h4>2. 연간 8,000억 유로 투자 제언과 정치적 딜레마</h4>
        <p>드라기는 2차 세계대전 직후 마셜플랜의 2배를 웃도는 GDP 대비 4.5%(연간 8,000억 유로)의 추가 투자를 촉구했으나, 독일 등 재정 건전성 중시 국가들과의 공동 채권 합의는 여전히 난항을 겪고 있습니다.</p>
      `,
      en: `
        <h4>1. The Three Vanished Pillars of European Prosperity</h4>
        <p>The primary text opens by stating that Europe’s three historical tailwinds—inexpensive Russian pipeline gas, surging Chinese import demand, and the US security umbrella—have simultaneously evaporated. EU industrial electricity prices remain 158% above US levels.</p>
        <h4>2. The €800 Billion Annual Investment Gap</h4>
        <p>Draghi calls for €750–800 billion in annual investment (roughly 4.5% of EU GDP, surpassing the post-WWII Marshall Plan in relative terms), sparking fierce debate between Brussels and fiscal hawks in Berlin.</p>
      `
    },
    mlaSources: [
      'Draghi, Mario. "The Future of European Competitiveness: Part A (A Competitiveness Strategy for Europe) & Part B (In-Depth Analysis and Recommendations)." European Commission, Sept. 2024, commission.europa.eu.',
      'Eurostat. "Electricity and Gas Price Statistics for Industrial Consumers in the European Union." Publications Office of the European Union, 2026.',
      'European Defence Agency (EDA). "Defence Data 2025–2026: Key Findings and Collaborative Procurement Metrics." EDA, Brussels, 2026.'
    ]
  },
  {
    id: 'brief-5',
    code: 'DOSSIER NO. 2026-36',
    topic: 'geopolitics',
    topicLabel: { ko: '지정학 · 외교안보', en: 'Geopolitics & Statecraft' },
    tagClass: 'earth-tag',
    region: 'south',
    regionLabel: { ko: '글로벌 사우스 (Global South)', en: 'Global South' },
    date: '2026.10.08',
    readTime: '8 MIN READ',
    title: {
      ko: '남미 리튬 삼각지대의 자원 민족주의 법제화: 칠레 국가리튬전략(ENL) 원문과 핵심광물 공급망 지각변동',
      en: 'Resource Nationalism in the Lithium Triangle: Chile’s National Lithium Strategy & Supply Chain Shifts'
    },
    p1: {
      ko: '전 세계 리튬 매장량의 약 56%가 집중된 남미 리튬 삼각지대(칠레·아르헨티나·볼리비아)가 단순 원광 수출국에서 벗어나 제련·양극재 가치사슬 내재화를 요구하는 국가 개입 정책을 시행하고 있습니다.',
      en: 'Holding roughly 56% of global lithium reserves, South America’s Lithium Triangle has shifted from raw brine export to state-guided value-chain localization.'
    },
    p2: {
      ko: '칠레 광업부의 국가리튬전략(Estrategia Nacional del Litio) 공식 문건과 국영구리공사(Codelco) 합작 계약서를 분석하여, 글로벌 배터리 기업들의 광물 조달 공식이 어떻게 바뀌고 있는지 추적합니다.',
      en: 'Examining primary decrees from Chile’s Ministry of Mining and Codelco joint-venture agreements, we map the new rules of engagement for global battery manufacturers.'
    },
    fullBody: {
      ko: `
        <h4>1. 칠레 국가리튬전략(ENL) 법령 원문 해독</h4>
        <p>칠레 정부가 발표한 국가리튬전략 원문은 아타카마 염호 등 전략적 염호 개발 시 국영기업(Codelco, ENAMI)이 지분 과반(50%+1주)을 확보하는 민관 합작 모델을 의무화하고, 환경 영향을 줄이는 직접리튬추출(DLE) 기술 도입을 조건으로 부과했습니다.</p>
        <h4>2. 미·중 핵심광물 경쟁 속 글로벌 사우스의 비동맹 레버리지</h4>
        <p>남미 자원 부국들은 미국의 FTA 기반 인플레이션 감축법(IRA) 보조금 혜택과 중국 기업의 대규모 제련 인프라 투자 사이에서 실리적 등거리 외교를 구사하며 협상력을 극대화하고 있습니다.</p>
      `,
      en: `
        <h4>1. Decoding Chile’s National Lithium Strategy (ENL)</h4>
        <p>Primary documents from the Chilean Ministry of Mining mandate majority state participation (50% + 1 share via Codelco or ENAMI) in strategic salars and require the adoption of Direct Lithium Extraction (DLE) technologies.</p>
        <h4>2. Non-Aligned Leverage in the Global South</h4>
        <p>Rather than choosing sides, Latin American resource states leverage US FTA-linked IRA tax credits against Chinese downstream refining capital to extract technology transfers.</p>
      `
    },
    mlaSources: [
      'Gobierno de Chile, Ministerio de Minería. "Estrategia Nacional del Litio: Por el Bien de Chile." Santiago, Apr. 2023 / Updated Implementation Decrees 2025, gob.cl/litio.',
      'United States Geological Survey (USGS). "Mineral Commodity Summaries 2026: Lithium." U.S. Department of the Interior, Jan. 2026, pp. 108–109.',
      'Corporación Nacional del Cobre de Chile (Codelco). "Acuerdo de Asociación Codelco-SQM para el Salar de Atacama." Hecho Esencial, Comisión para el Mercado Financiero (CMF), May 2024.'
    ]
  },
  {
    id: 'brief-6',
    code: 'DOSSIER NO. 2026-34',
    topic: 'history',
    topicLabel: { ko: '역사 · 사료 아카이브', en: 'History & Archives' },
    tagClass: 'archive-tag',
    region: 'na',
    regionLabel: { ko: '북미 (North America)', en: 'North America' },
    date: '2026.10.02',
    readTime: '14 MIN READ',
    title: {
      ko: '[역사 아카이브] 1971년 캠프 데이비드 기밀해제 문건(FRUS)으로 읽는 닉슨 쇼크와 브레튼우즈 이후의 통화 질서',
      en: '[Historical Archive] The 1971 Camp David Transcripts (FRUS): The Nixon Shock & Post-Bretton Woods Order'
    },
    p1: {
      ko: '1971년 8월 15일 리처드 닉슨 대통령의 금태환 일시 정지 선언과 10% 일괄 수입관세 부과는 제2차 세계대전 이후 지속된 브레튼우즈 체제를 종식시키고 오늘날의 변동환율 및 명목화폐 시대를 열었습니다.',
      en: 'On August 15, 1971, President Richard Nixon closed the gold window and imposed a 10% across-the-board import surcharge—ending Bretton Woods and inaugurating the modern floating-rate monetary era.'
    },
    p2: {
      ko: '미 국무부 외교문서집(FRUS) 제3권에 수록된 캠프 데이비드 비밀회의 속기록 원문을 통해, 패권국이 대외 수지 적자와 통화 조정 부담을 동맹국에 전가하는 역사적 메커니즘을 복원합니다.',
      en: 'Drawing directly from Foreign Relations of the United States (FRUS) transcripts of the secret Camp David weekend, we reconstruct how a hegemon externalizes monetary adjustment onto allies.'
    },
    fullBody: {
      ko: `
        <h4>1. 1971년 8월 13일 오후 3시 15분, 캠프 데이비드 로렐 롯지 속기록</h4>
        <p>미 국무부 외교문서집(FRUS, 1969–1976, Vol. III) 원문 속기록에서 존 코널리 재무장관은 금 창구 폐쇄와 10% 수입부가세를 동시에 단행할 것을 강력히 주장했습니다. 아서 번즈 연준 의장이 교역국들의 보복 관세와 외환시장 혼란을 경고했으나, 행정부는 관세를 협상 지렛대로 삼는 정치적 결단을 택했습니다.</p>
        <h4>2. 1971년과 2026년의 구조적 평행이론</h4>
        <p>당시 주요 교역국의 통화 절상을 압박하며 관세를 지렛대로 삼았던 통상 리얼폴리틱은 55년이 지난 오늘날 보편 관세 논의, 산업 보조금 정책, 그리고 글로벌 중앙은행들의 준비자산 다변화 흐름과 깊이 공명합니다.</p>
      `,
      en: `
        <h4>1. Inside Laurel Lodge: August 13, 1971, 3:15 PM</h4>
        <p>Primary transcripts in Foreign Relations of the United States (FRUS, 1969–1976, Vol. III) capture Treasury Secretary John Connally arguing for simultaneous gold suspension and a 10% import surcharge over the warnings of Fed Chairman Arthur Burns.</p>
        <h4>2. Structural Parallels Between 1971 and 2026</h4>
        <p>Washington’s use of tariff leverage to force currency and industrial realignment in 1971 provides the indispensable historical template for decoding today’s trade realpolitik and central bank reserve diversification.</p>
      `
    },
    mlaSources: [
      'United States, Department of State. "Foreign Relations of the United States, 1969–1976, Volume III, Foreign Economic Policy; International Monetary Policy, 1969–1972." Edited by Bruce F. Duncombe, U.S. Government Printing Office, 2001, Document 168 (Camp David Transcripts), history.state.gov.',
      'Nixon, Richard. "Address to the Nation Outlining a New Economic Policy: \'The Challenge of Peace.\'" 15 Aug. 1971, Richard Nixon Presidential Library and Museum, National Archives (NARA).',
      'Irwin, Douglas A. "The Nixon Shock after Forty Years: The Import Surcharge Revisited." World Trade Review, vol. 12, no. 1, 2013, pp. 29–56.'
    ]
  }
];

/* --- 5. Section 4: Panels Dataset (host-tyler + cast-member-1 ~ 4) --- */
const hostTylerData = {
  slot: 'host-tyler',
  photo: '/1BWS/assets/host-tyler.jpg',
  role: { ko: '메인 패널', en: 'MAIN PANEL' },
  name: { ko: '타일러 라쉬 (Tyler Rasch)', en: 'Tyler Rasch (타일러 라쉬)' },
  sections: {
    ko: [
      {
        heading: 'GLOBAL INSIGHT & PUBLIC TRUST',
        items: [
          '원빅월드쇼 메인 패널',
          '시카고대학교 국제학 학사 · 서울대학교 정치외교학 석사',
          '미 상원 법사위원회 · 주미 한국대사관 경력'
        ]
      },
      {
        heading: 'ESG & SUSTAINABILITY',
        items: [
          '도서 『두 번째 지구는 없다』 베스트셀러 저자',
          'WWF · FSC 공식 앰버서더',
          'JTBC · tvN 주요 프로그램 출연'
        ]
      }
    ],
    en: [
      {
        heading: 'GLOBAL INSIGHT & PUBLIC TRUST',
        items: [
          'Main Panel, One Big World Show (1BWS)',
          'B.A. in International Studies, University of Chicago · M.A. in Political Science & International Relations, Seoul National University',
          'Former Staff Experience at the U.S. Senate Committee on the Judiciary & Embassy of the Republic of Korea in the U.S.'
        ]
      },
      {
        heading: 'ESG & SUSTAINABILITY',
        items: [
          'Bestselling Author of "There Is No Second Earth" (『두 번째 지구는 없다』)',
          'Official Ambassador for WWF & FSC',
          'Featured Panelist on Major JTBC & tvN Broadcast Programs'
        ]
      }
    ]
  },
  featuredEpId: 'ep-1',
  featuredEpTitle: {
    ko: '대표 진행 회차: 미중 패권 전쟁의 반전, 대한민국에 역대급 기회가 터졌다! 시청하기 →',
    en: 'Featured Episode: Watch Plot Twist in the US-China Hegemony War: Korea’s Historic Strategic Opportunity →'
  }
};

const castMembersData = [
  {
    id: 'cast-1',
    slot: 'cast-member-1',
    photo: '/1BWS/assets/cast-sujan.jpg',
    role: { ko: '패널 · 남아시아 · 글로벌 사우스', en: 'PANEL · SOUTH ASIA & GLOBAL SOUTH' },
    name: { ko: '수잔 샤키야 (Sujan Shakya)', en: 'Sujan Shakya (수잔 샤키야)' },
    shortBio: {
      ko: '남아시아·히말라야 지정학, 인구 구조 변화, 그리고 글로벌 사우스의 산업·인프라 전환을 현지의 입체적 시선으로 해독하는 패널.',
      en: 'Decoding South Asian geopolitics, demographic shifts, and Global South infrastructure transitions with on-the-ground context.'
    },
    details: {
      ko: [
        '· 주요 활동: 원빅월드쇼(1BWS) 글로벌 시사 패널',
        '· 담당 분야: 남아시아·인도·네팔 지정학, 신흥국 인구통계 및 자원·인프라 지정학 분석',
        '· 대표 출연: 남아시아 지정학 재편 및 글로벌 사우스 핵심광물·인구 지형 브리핑'
      ],
      en: [
        '· Role: 1BWS Global Affairs Panel',
        '· Coverage: South Asian Geopolitics, Emerging Market Demographics & Infrastructure',
        '· Featured In: South Asia & Global South Geopolitical Realignment Briefings'
      ]
    },
    epId: 'ep-5',
    accent: '#004d26',
    badgeCode: 'PANEL I · GLOBAL SOUTH'
  },
  {
    id: 'cast-2',
    slot: 'cast-member-2',
    photo: '/1BWS/assets/cast-samy.jpg',
    role: { ko: '패널 · 중동 · 지중해 지정학', en: 'PANEL · MENA & GEOPOLITICS' },
    name: { ko: '새미 라샤드 (Samy Rashad)', en: 'Samy Rashad (새미 라샤드)' },
    shortBio: {
      ko: '서구 중심의 외신 프레임을 넘어 중동·북아프리카(MENA) 현지 사료와 아랍권 자본 이동, 해협 안보의 이면을 짚어내는 패널.',
      en: 'Analyzing Middle East & North Africa (MENA) geopolitics, sovereign wealth flows, and maritime chokepoints beyond Western frames.'
    },
    details: {
      ko: [
        '· 주요 활동: 원빅월드쇼(1BWS) 중동·아랍권 패널 및 연구자',
        '· 담당 분야: 중동 안보 동맹 구상, 수에즈·홍해 해양 지정학, 걸프 국부펀드 자본 이동 분석',
        '· 대표 출연: POD.88 수에즈·호르무즈 해협 지정학 및 아랍 자본 지각변동 심층 분석'
      ],
      en: [
        '· Role: 1BWS MENA Panel & Regional Analyst',
        '· Coverage: Middle East Security Alliances, Suez/Red Sea Chokepoints, Gulf Capital Flows',
        '· Featured In: POD.88 Maritime Geopolitics & MENA Capital Realignment'
      ]
    },
    epId: 'ep-3',
    accent: '#242e3d',
    badgeCode: 'PANEL II · MENA & MACRO'
  },
  {
    id: 'cast-3',
    slot: 'cast-member-3',
    role: { ko: '패널 · 기술 · 에너지 공급망', en: 'PANEL · TECH & ENERGY SUPPLY CHAIN' },
    name: { ko: '기술 · 에너지 애널리스트', en: 'Tech & Energy Analyst' },
    shortBio: {
      ko: 'AI 데이터센터 전력망, 차세대 원전(SMR), 반도체 및 핵심광물(리튬·희토류) 공급망 지정학을 추적하는 패널.',
      en: 'Tracking AI hyperscaler power grids, SMR nuclear deployment, semiconductors, and critical mineral supply chains.'
    },
    details: {
      ko: [
        '· 주요 이력: 에너지·반도체 산업 엔지니어 및 기술 안보 자문위원',
        '· 담당 분야: FERC 전력망 규제 문건, 북미 변압기 공급망, 글로벌 사우스 핵심광물 협정 분석',
        '· 대표 출연: EP.141 빅테크 원자력 직계약과 전력망 병목 해부'
      ],
      en: [
        '· Background: Energy & Semiconductor Supply Chain Engineer / Tech Policy Advisor',
        '· Coverage: FERC grid dockets, SMR nuclear standardization, Global South critical minerals',
        '· Featured In: EP.141 AI Power Grid Bottlenecks & Nuclear PPAs'
      ]
    },
    epId: 'ep-2',
    accent: '#864413',
    badgeCode: 'PANEL III · TECH'
  },
  {
    id: 'cast-4',
    slot: 'cast-member-4',
    role: { ko: '패널 · 객원 연구원 & 리포터진', en: 'PANEL · VISITING FELLOWS & REPORTERS' },
    name: { ko: '객원 패널 & 리포터진', en: 'Guest Panels & Reporters' },
    shortBio: {
      ko: '해양안보, 유럽·중동 지역학, 국제통상 등 매주 이슈에 맞춰 합류하는 현업 전문가 패널 및 바이링구얼 리포터 그룹.',
      en: 'Rotating roster of regional scholars, maritime security practitioners, and bilingual on-air reporters.'
    },
    details: {
      ko: [
        '· 구성: 전·현직 외교관, 산업계 임원, 대학 교수 및 1BWS 공개 채용 리포터/앵커',
        '· 담당 분야: 지역별(북미·유럽·중동·아시아·글로벌 사우스) 심층 브리핑 및 팩트체크',
        '· 상시 지원: 하단 Participate 섹션을 통해 객원 패널 및 리포터 상시 지원 가능'
      ],
      en: [
        '· Composition: Former diplomats, industry executives, scholars, and 1BWS bilingual reporters',
        '· Coverage: Regional deep-dives across Europe, Middle East, East Asia, and the Global South',
        '· Open Desk: Apply anytime via the Participate section to join as Guest Panel or Reporter'
      ]
    },
    epId: 'ep-3',
    accent: '#4d150b',
    badgeCode: 'PANEL IV · FELLOWS'
  }
];

/* --- 6. Section 6: Press & Media Room Dataset --- */
const pressItemsData = [
  {
    outlet: 'OFFICIAL PR',
    isOfficial: true,
    date: '2026.10.24',
    title: {
      ko: '[보도자료] 타일러 미디어, 글로벌 지식 저널리즘 포털 ‘원빅월드쇼(1BWS)’ 및 1차 사료 아카이브 ‘인텔리전스 도시에’ 공식 런칭',
      en: '[Press Release] Tyler Media Launches Official 1BWS Editorial Portal & Primary-Source Intelligence Dossier Archive'
    },
    meta: { ko: 'Tyler Media Corporate Communications · 국/영문 동시 배포', en: 'Tyler Media Corporate Communications · Dual KR/EN Release' }
  },
  {
    outlet: 'MEDIA & ECON',
    isOfficial: false,
    date: '2026.10.18',
    title: {
      ko: '“유튜브를 넘어선 에디토리얼 싱크탱크”… 원빅월드쇼(1BWS), 미 재무부·유럽 집행위 1차 사료 해독으로 오피니언 리더층 사로잡다',
      en: '“Beyond YouTube into an Editorial Think Tank”: How One Big World Show (1BWS) Captivates Decision-Makers with Primary Sources'
    },
    meta: { ko: '미디어·경제 섹션 심층 기획 인용 보도', en: 'Featured Media & Macroeconomics Industry Coverage' }
  },
  {
    outlet: 'GLOBAL REVIEW',
    isOfficial: false,
    date: '2026.09.29',
    title: {
      ko: '타일러 라쉬와 원빅월드쇼(1BWS)의 실험: 검증된 1차 문헌과 입체적 시선으로 다극화 시대의 지정학을 번역하다',
      en: 'Tyler Rasch and the 1BWS Experiment: Translating Multi-Polar Geopolitics Through Verified Primary Documentation'
    },
    meta: { ko: '글로벌 저널리즘 & 지식 미디어 스페셜 리포트', en: 'Global Journalism & Knowledge Media Special Report' }
  },
  {
    outlet: 'OFFICIAL PR',
    isOfficial: true,
    date: '2026.09.12',
    title: {
      ko: '[보도자료] 원빅월드쇼(1BWS), 최근 90일 누적 조회수 3,550만 돌파 및 2026 기관·브랜드 다큐멘터리 파트너십 프로그램 공개',
      en: '[Press Release] 1BWS Surpasses 35.5M 90-Day Views, Unveils 2026 Institutional & Branded Documentary Partnership Program'
    },
    meta: { ko: 'Tyler Media Strategic Partnerships · 공식 지표 발표', en: 'Tyler Media Strategic Partnerships · Official Metrics Release' }
  }
];

/* --- 7. Section 7: 1BWS Curated Editions Dataset (store-item-1 ~ 4) --- */
const storeItemsData = [
  {
    id: 'store-1',
    slot: 'store-item-1',
    badge: 'NEW EDITION',
    badgeClass: 'badge-green',
    cat: 'PRINT MONOGRAPH & ATLAS',
    title: {
      ko: '1BWS 2026 글로벌 리얼폴리틱 연감 & 1차 사료 아틀라스 (양장본)',
      en: '1BWS 2026 Global Realpolitik Almanac & Primary Source Atlas (Hardcover)'
    },
    price: '₩38,000',
    url: 'https://smartstore.naver.com/',
    editionNo: 'VOL. I',
    subLabel: 'HARDCOVER ALMANAC'
  },
  {
    id: 'store-2',
    slot: 'store-item-2',
    badge: 'ARCHIVAL OBJECT',
    badgeClass: 'badge-orange',
    cat: 'EDITORIAL APPAREL',
    title: {
      ko: '1BWS 에디토리얼 헤비웨이트 스웨트셔츠 (딥 슬레이트 / 포레스트 그린)',
      en: '1BWS Editorial Heavyweight Crewneck (Deep Slate / Forest Green)'
    },
    price: '₩69,000',
    url: 'https://smartstore.naver.com/',
    editionNo: 'EDITION 02',
    subLabel: 'HEAVYWEIGHT COTTON'
  },
  {
    id: 'store-3',
    slot: 'store-item-3',
    badge: 'LIMITED',
    badgeClass: 'badge-orange',
    cat: 'ANALYST STATIONERY',
    title: {
      ko: '1BWS 아날로그 리서치 필드 노트 & 아카이브 인덱스 에디션',
      en: '1BWS Analyst Field Notebook & Archival Index Set'
    },
    price: '₩24,000',
    url: 'https://smartstore.naver.com/',
    editionNo: 'EDITION 03',
    subLabel: 'ARCHIVAL PAPER'
  },
  {
    id: 'store-4',
    slot: 'store-item-4',
    badge: 'CURATED',
    badgeClass: 'badge-green',
    cat: 'MONTHLY BOOK DISPATCH',
    title: {
      ko: '타일러 & 원빅월드쇼 편집국 선정 ‘이달의 지정학·거시경제 필독서’ 큐레이션 박스',
      en: 'Tyler & 1BWS Editors’ Curated Geopolitics & Macro Book Box'
    },
    price: '₩54,000',
    url: 'https://smartstore.naver.com/',
    editionNo: 'VOL. IV',
    subLabel: 'BOOK & DOSSIER BOX'
  }
];

/* --- 8. Vox × Broadsheet Halftone & Monograph SVG Artwork Generators --- */
function generateEpisodeArtworkSVG(ep) {
  const patId = `halftone-${ep.id}`;
  return `
    <svg viewBox="0 0 640 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="${patId}" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.15" fill="#ffffff" fill-opacity="0.11" />
        </pattern>
      </defs>
      <rect width="640" height="360" fill="${ep.artTheme.bg}" />
      <rect width="640" height="360" fill="url(#${patId})" />
      <!-- Broadsheet Registration & Meridian Framing -->
      <g stroke="#ffffff" stroke-opacity="0.16" stroke-width="1" fill="none">
        <rect x="28" y="24" width="584" height="312" />
        <line x1="28" y1="70" x2="612" y2="70" />
        <line x1="28" y1="300" x2="612" y2="300" />
        <circle cx="492" cy="185" r="96" />
        <circle cx="492" cy="185" r="58" stroke-dasharray="4 4" />
        <line x1="376" y1="185" x2="608" y2="185" />
        <line x1="492" y1="74" x2="492" y2="296" />
      </g>
      <!-- Vox Marker Stamp Tag -->
      <rect x="48" y="36" width="186" height="22" fill="#F7E354" />
      <text x="58" y="51" font-family="JetBrains Mono, monospace" font-weight="700" font-size="10.5" letter-spacing="1.4" fill="#111111">${ep.artTheme.badge}</text>
      <text x="592" y="51" text-anchor="end" font-family="JetBrains Mono, monospace" font-weight="600" font-size="10.5" letter-spacing="1.6" fill="#E6E0D2">1BWS PRESS</text>
      <!-- Editorial Roman Numeral & Monograph Typography -->
      <text x="52" y="176" font-family="Newsreader, Georgia, serif" font-style="italic" font-weight="700" font-size="84" fill="#ffffff">${ep.artTheme.roman}.</text>
      <rect x="52" y="196" width="128" height="4" fill="#F7E354" />
      <text x="52" y="232" font-family="JetBrains Mono, monospace" font-weight="600" font-size="12" letter-spacing="1.5" fill="#F7E354">${ep.code}</text>
      <text x="52" y="258" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="15" letter-spacing="0.4" fill="#ffffff">One Big World Show · PRIMARY SOURCE DISPATCH</text>
      <!-- Bottom Colophon -->
      <text x="52" y="322" font-family="JetBrains Mono, monospace" font-weight="500" font-size="10.5" letter-spacing="1.2" fill="#E6E0D2">PUBLISHED ${ep.date} · MLA 9TH ED. VERIFIED</text>
    </svg>
  `;
}

function generatePortraitCollageSVG(slotName, badgeText, titleText, accentColor) {
  const patId = `desk-ht-${slotName}`;
  const romanNum = slotName.includes('3') ? 'III' : 'IV';
  const deskLabel = slotName.includes('3') ? 'SPECIALIST ANALYST DESK' : 'VISITING FELLOWS & OPEN DESK';
  return `
    <svg viewBox="0 0 360 450" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="${patId}" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="#ffffff" fill-opacity="0.12" />
        </pattern>
      </defs>
      <rect width="360" height="450" fill="#1A212B" />
      <rect width="360" height="450" fill="url(#${patId})" />
      <!-- Crisp Print Plate Frame -->
      <rect x="22" y="22" width="316" height="406" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1.2" />
      <line x1="22" y1="68" x2="338" y2="68" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1" />
      <line x1="22" y1="348" x2="338" y2="348" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1" />
      <!-- Top Vox Stamp -->
      <rect x="38" y="35" width="168" height="20" fill="#F7E354" />
      <text x="46" y="49" font-family="JetBrains Mono, monospace" font-weight="700" font-size="9.5" letter-spacing="1.4" fill="#111111">${badgeText}</text>
      <!-- Center Broadsheet Monograph Emblem (Intentional Typographic Desk Plate) -->
      <circle cx="180" cy="204" r="78" fill="${accentColor}" fill-opacity="0.88" stroke="#F7E354" stroke-width="1.5" />
      <circle cx="180" cy="204" r="64" fill="none" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1" stroke-dasharray="3 3" />
      <text x="180" y="222" text-anchor="middle" font-family="Newsreader, Georgia, serif" font-style="italic" font-weight="700" font-size="56" fill="#ffffff">${romanNum}</text>
      <text x="180" y="314" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="9.5" letter-spacing="2" fill="#E6E0D2">${deskLabel}</text>
      <!-- Footer Caption -->
      <text x="38" y="378" font-family="JetBrains Mono, monospace" font-weight="700" font-size="10" letter-spacing="1.6" fill="#F7E354">1BWS PANELS · EDITORIAL ROSTER</text>
      <text x="38" y="404" font-family="Newsreader, Noto Serif KR, serif" font-weight="700" font-size="15.5" fill="#ffffff">${titleText}</text>
    </svg>
  `;
}

function generateStoreItemSVG(item) {
  const patId = `store-ht-${item.id}`;
  return `
    <svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="${patId}" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill="#111111" fill-opacity="0.09" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="#E6E0D2" />
      <rect width="400" height="400" fill="url(#${patId})" />
      <!-- Hard Offset Ink Book Shadow + Monograph Cover -->
      <rect x="74" y="50" width="260" height="308" fill="#111111" />
      <rect x="66" y="42" width="260" height="308" fill="#FAF8F2" stroke="#111111" stroke-width="2" />
      <rect x="78" y="54" width="236" height="284" fill="none" stroke="#111111" stroke-width="1" />
      <line x1="78" y1="102" x2="314" y2="102" stroke="#111111" stroke-width="1" />
      <line x1="78" y1="286" x2="314" y2="286" stroke="#111111" stroke-width="1" />
      <text x="196" y="83" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="700" font-size="10" letter-spacing="1.8" fill="#111111">One Big World Show · 1BWS</text>
      <rect x="142" y="152" width="108" height="42" fill="#F7E354" />
      <text x="196" y="182" text-anchor="middle" font-family="Newsreader, Georgia, serif" font-style="italic" font-weight="700" font-size="32" fill="#111111">${item.editionNo}</text>
      <line x1="152" y1="210" x2="240" y2="210" stroke="#111111" stroke-width="1.5" />
      <text x="196" y="236" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="700" font-size="10" letter-spacing="1.8" fill="#004D26">${item.subLabel}</text>
      <text x="196" y="315" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="600" font-size="9" letter-spacing="1.5" fill="#222933">TYLER MEDIA PUBLICATIONS</text>
    </svg>
  `;
}

/* --- 9. Render Functions for All Dynamic Sections --- */
function renderFeaturedEpisode() {
  const ep = episodesData.find(e => e.id === activeEpisodeId) || episodesData[0];
  document.getElementById('featuredEpCode').textContent = ep.code;
  document.getElementById('featuredEpDate').textContent = `PUBLISHED: ${ep.date} · RUNTIME: ${ep.duration}`;
  document.getElementById('featuredPlatformLabel').textContent = ep.platformLabel[currentLang];
  document.getElementById('featuredViewsLabel').textContent = ep.views[currentLang];
  document.getElementById('featuredEpTitle').textContent = ep.title[currentLang];
  document.getElementById('playerChapterLabel').textContent = ep.chapter[currentLang];

  const startSec = ep.startSeconds || 0;
  const startFormatted = startSec > 0
    ? `${String(Math.floor(startSec / 60)).padStart(2, '0')}:${String(startSec % 60).padStart(2, '0')}`
    : '00:00';
  document.getElementById('playerTimecode').textContent = isPlayingSim
    ? `STREAMING / ${ep.duration}`
    : `${startFormatted} / ${ep.duration}`;

  const directLink = document.getElementById('playerYoutubeDirectLink');
  if (directLink) {
    directLink.href = ep.youtubeUrl || 'https://www.youtube.com/@1BWS';
  }

  const playOverlayBtn = document.getElementById('featuredPlayBtn');
  const stage = document.getElementById('featuredVideoStage');

  if (isPlayingSim && ep.youtubeId) {
    if (playOverlayBtn) playOverlayBtn.style.display = 'none';
    stage.innerHTML = `
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/${ep.youtubeId}?start=${startSec}&autoplay=1&rel=0"
        title="${ep.title[currentLang]}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        style="position:absolute;inset:0;width:100%;height:100%;border:0;z-index:2;"
      ></iframe>
    `;
  } else {
    if (playOverlayBtn) playOverlayBtn.style.display = 'flex';
    stage.innerHTML = ep.thumbImg
      ? `<img src="${ep.thumbImg}" alt="${ep.title[currentLang]}" width="1280" height="720" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;display:block;" />`
      : generateEpisodeArtworkSVG(ep);
  }

  const summaryList = document.getElementById('featuredSummaryList');
  summaryList.innerHTML = ep.summary[currentLang].map((line, idx) => {
    const cleanText = line.replace(/^\d+\.\s*/, '');
    return `
      <li>
        <span class="vox-step-num">0${idx + 1}</span>
        <span class="vox-step-text">${cleanText}</span>
      </li>
    `;
  }).join('');

  const tagsContainer = document.getElementById('featuredTagsContainer');
  tagsContainer.innerHTML = ep.tags.map(t => `<span class="ep-tag">${t}</span>`).join('');

  const relatedBtn = document.getElementById('openRelatedBriefBtn');
  relatedBtn.setAttribute('data-brief-id', ep.relatedBriefId);
}

function renderEpisodeGrid() {
  const grid = document.getElementById('episodeCardsGrid');
  const filtered = currentPlatformFilter === 'all'
    ? episodesData
    : episodesData.filter(ep => ep.platform === currentPlatformFilter);

  grid.innerHTML = filtered.map((ep, idx) => {
    const isActive = ep.id === activeEpisodeId;
    const dispatchNum = String(idx + 1).padStart(2, '0');
    return `
    <article class="episode-card ${isActive ? 'active-episode' : ''}" data-ep-id="${ep.id}">
      <div class="ep-card-meta-strip">
        <span class="ep-strip-left">
          <span class="ep-dispatch-num">#${dispatchNum}</span>
          <span>${ep.platformLabel[currentLang]}</span>
        </span>
        <span class="ep-strip-duration">${ep.duration}</span>
      </div>
      <div class="episode-thumb-slot" data-asset-slot="${ep.slot}">
        ${isActive ? `<span class="ep-active-marker">${currentLang === 'ko' ? '▶ 재생 대기' : '▶ ON CONSOLE'}</span>` : ''}
        <div class="slot-visual-holder" style="width:100%;height:100%;">
          ${ep.thumbImg
            ? `<img src="${ep.thumbImg}" alt="${ep.title[currentLang]}" width="640" height="360" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;display:block;" />`
            : generateEpisodeArtworkSVG(ep)}
        </div>
        <button type="button" class="slot-replace-trigger" data-slot-target="${ep.slot}">Replace Image</button>
      </div>
      <div class="episode-card-body">
        <div>
          <div class="ep-card-kicker">
            ${ep.code} · ${ep.date}
          </div>
          <h3 class="episode-card-title">${ep.title[currentLang]}</h3>
          <p class="episode-card-desc">${ep.desc[currentLang]}</p>
        </div>
        <div class="episode-card-footer">
          <span>${ep.views[currentLang]}</span>
          <span class="ep-select-cta">${isActive ? (currentLang === 'ko' ? '현재 선택됨 ✓' : 'LOADED ✓') : (currentLang === 'ko' ? '플레이어 로드 →' : 'LOAD DISPATCH →')}</span>
        </div>
      </div>
    </article>
  `;
  }).join('');

  grid.querySelectorAll('.episode-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.slot-replace-trigger')) return;
      activeEpisodeId = card.getAttribute('data-ep-id');
      isPlayingSim = false;
      document.getElementById('playBtnIcon').textContent = '▶';
      document.getElementById('playBtnLabel').textContent = i18nDict[currentLang]['media.playEpisode'];
      document.getElementById('playerMiniToggle').textContent = '▶ PLAY';
      document.getElementById('playerTimelineProgress').style.width = '18%';
      renderFeaturedEpisode();
      renderEpisodeGrid();
      document.getElementById('featuredVideoViewport').scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast(currentLang === 'ko' ? '선택한 에피소드가 브로드캐스트 플레이어에 로드되었습니다.' : 'Episode loaded into Broadcast Console.');
    });
  });
}

function renderDossierGrid() {
  const grid = document.getElementById('dossierCardsGrid');
  const filtered = dossiersData.filter(d => {
    const matchTopic = currentTopicFilter === 'all' || d.topic === currentTopicFilter;
    const matchRegion = currentRegionFilter === 'all' || d.region === currentRegionFilter;
    return matchTopic && matchRegion;
  });

  document.getElementById('dossierCountReadout').textContent =
    currentLang === 'ko'
      ? `총 ${dossiersData.length}건 중 ${filtered.length}건의 도시에 표시`
      : `SHOWING ${filtered.length} OF ${dossiersData.length} DOSSIERS`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; background: var(--bg-paper-light); border: var(--rule-hairline); padding: 40px; text-align: center;">
        <p style="font-family: var(--font-serif); font-size: 1.05rem; margin-bottom: 16px;">
          ${currentLang === 'ko' ? '선택한 분과 및 지역 조건에 해당하는 도시에 문건이 없습니다.' : 'No dossiers match this exact Discipline and Region combination.'}
        </p>
        <button type="button" id="resetDossierFilterBtn" class="btn-primary-editorial" style="padding: 10px 20px; font-size: 0.84rem;">
          ${currentLang === 'ko' ? '필터 초기화 (전체 아카이브 보기)' : 'Reset Filters (Show All)'}
        </button>
      </div>
    `;
    const resetBtn = document.getElementById('resetDossierFilterBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        currentTopicFilter = 'all';
        currentRegionFilter = 'all';
        document.querySelectorAll('#topicFilterGroup .dossier-filter-btn').forEach(b => b.classList.toggle('active', b.dataset.topic === 'all'));
        document.querySelectorAll('#regionFilterGroup .dossier-filter-btn').forEach(b => b.classList.toggle('active', b.dataset.region === 'all'));
        renderDossierGrid();
      });
    }
    return;
  }

  const useAsymmetricLead = filtered.length >= 3;

  grid.innerHTML = filtered.map((d, idx) => {
    const isLead = useAsymmetricLead && idx === 0;
    return `
    <article class="dossier-card ${isLead ? 'dossier-lead-card' : ''}" data-brief-id="${d.id}">
      <div>
        <div class="dossier-card-top">
          <div class="dossier-top-badges">
            ${isLead ? `<span class="lead-dossier-stamp">${currentLang === 'ko' ? '★ 커버스토리 · LEAD DOSSIER' : '★ COVER DOSSIER'}</span>` : ''}
            <span class="dossier-cat-tag ${d.tagClass}">${d.topicLabel[currentLang]}</span>
          </div>
          <span class="dossier-region-badge">${d.regionLabel[currentLang]}</span>
        </div>
        <div class="dossier-code-line">
          <span>${d.code}</span>
          <span>·</span>
          <span>MLA 9TH ED. VERIFIED</span>
        </div>
        <h3 class="dossier-title">${d.title[currentLang]}</h3>
        ${isLead
          ? `<div class="dossier-lead-columns">
               <div class="dossier-why-callout">
                 <span class="why-badge">${currentLang === 'ko' ? '핵심 테제 · WHY IT MATTERS' : 'WHY IT MATTERS'}</span>
                 <p class="dossier-summary-p">${d.p1[currentLang]}</p>
               </div>
               <p class="dossier-summary-p">${d.p2[currentLang]}</p>
             </div>`
          : `<p class="dossier-summary-p">${d.p1[currentLang]}</p>
             <p class="dossier-summary-p">${d.p2[currentLang]}</p>`
        }
      </div>
      <div class="dossier-meta-footer">
        <span>${d.date} · ${d.readTime}</span>
        <span class="dossier-read-cta">${currentLang === 'ko' ? '전문 및 1차 사료 열람 →' : 'Read Full Dossier →'}</span>
      </div>
    </article>
  `;
  }).join('');

  grid.querySelectorAll('.dossier-card').forEach(card => {
    card.addEventListener('click', () => {
      openDossierSlideover(card.getAttribute('data-brief-id'));
    });
  });
}

function openDossierSlideover(briefId) {
  const d = dossiersData.find(item => item.id === briefId) || dossiersData[0];
  activeDossierMlaSources = d.mlaSources || [];
  document.getElementById('drawerDossierCode').textContent = `${d.code} · ${d.topicLabel[currentLang]}`;
  document.getElementById('drawerReadTime').textContent = `${d.regionLabel[currentLang]} · ${d.date} · ${d.readTime}`;
  document.getElementById('drawerArticleBody').innerHTML = `
    <h2 id="drawerArticleTitle">${d.title[currentLang]}</h2>
    <div class="drawer-vox-abstract">
      <div class="vox-abstract-kicker">${currentLang === 'ko' ? 'THE BIG PICTURE · 핵심 요약 브리핑' : 'THE BIG PICTURE · EXECUTIVE BRIEFING'}</div>
      <p>${d.p1[currentLang]} ${d.p2[currentLang]}</p>
    </div>
    ${d.fullBody[currentLang]}
  `;
  document.getElementById('drawerMlaList').innerHTML = d.mlaSources.map(src => `<li>${src}</li>`).join('');
  const scrollContainer = document.getElementById('drawerScrollContainer');
  if (scrollContainer) scrollContainer.scrollTop = 0;
  const progressBar = document.getElementById('drawerReadingProgress');
  if (progressBar) progressBar.style.width = '0%';
  const backdrop = document.getElementById('dossierSlideoverBackdrop');
  backdrop.classList.add('open');
  backdrop.setAttribute('aria-hidden', 'false');
}

function renderCastSection() {
  const hostContainer = document.getElementById('hostTylerCard');
  const expandLabel = currentLang === 'ko' ? '약력 및 대표 에피소드 상세 보기' : 'View Full Biography & Featured Episode';

  hostContainer.innerHTML = `
    <div class="host-photo-slot" data-asset-slot="${hostTylerData.slot}">
      <span class="portrait-plate-tag">MAIN PANEL · 1BWS</span>
      <div class="slot-visual-holder" style="width:100%;height:100%;">
        ${hostTylerData.photo
          ? `<img src="${hostTylerData.photo}" alt="${hostTylerData.name[currentLang]}" width="480" height="600" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:center top;" />`
          : generatePortraitCollageSVG(hostTylerData.slot, 'MAIN PANEL', 'Tyler Rasch (타일러 라쉬)', '#004d26')}
      </div>
      <button type="button" class="slot-replace-trigger" data-slot-target="${hostTylerData.slot}">Replace Image</button>
    </div>
    <div class="host-info-col">
      <div>
        <span class="host-role-kicker">${hostTylerData.role[currentLang]}</span>
        <h3 class="host-name-title">${hostTylerData.name[currentLang]}</h3>
        <div class="host-Structured-bio">
          ${hostTylerData.sections[currentLang].map(sec => `
            <div class="host-bio-group">
              <h4 class="host-bio-group-title">${sec.heading}</h4>
              <ul class="host-bio-bullet-list">
                ${sec.items.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="host-bio-footer">
        <a href="#media-hub" class="bio-ep-link" data-jump-ep="${hostTylerData.featuredEpId}">
          ${hostTylerData.featuredEpTitle[currentLang]}
        </a>
        <a href="https://www.tylerrasch.com" target="_blank" rel="noopener noreferrer" class="bio-ep-link bio-archive-link">
          ${currentLang === 'ko' ? '타일러 라쉬 공식 아카이브 (tylerrasch.com) ↗' : 'Official Archive (tylerrasch.com) ↗'}
        </a>
      </div>
    </div>
  `;

  const grid = document.getElementById('castMembersGrid');
  grid.innerHTML = castMembersData.map(m => `
    <article class="cast-card">
      <div class="cast-member-slot" data-asset-slot="${m.slot}">
        ${m.photo ? `<span class="portrait-plate-tag">${m.badgeCode}</span>` : ''}
        <div class="slot-visual-holder" style="width:100%;height:100%;">
          ${m.photo
            ? `<img src="${m.photo}" alt="${m.name[currentLang]}" width="360" height="450" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:center top;" />`
            : generatePortraitCollageSVG(m.slot, m.badgeCode, m.name[currentLang], m.accent)}
        </div>
        <button type="button" class="slot-replace-trigger" data-slot-target="${m.slot}">Replace Image</button>
      </div>
      <div class="cast-card-content">
        <div>
          <div class="cast-role-tag">${m.role[currentLang]}</div>
          <h3 class="cast-member-name">${m.name[currentLang]}</h3>
          <p class="cast-short-bio">${m.shortBio[currentLang]}</p>
        </div>
        <div>
          <button type="button" class="btn-expand-bio" data-bio-toggle="bio-${m.id}">
            <span>${expandLabel}</span>
            <span>+</span>
          </button>
          <div class="expandable-bio-panel" id="bio-${m.id}">
            <ul class="bio-detail-list">
              ${m.details[currentLang].map(d => `<li>${d}</li>`).join('')}
            </ul>
            <a href="#media-hub" class="bio-ep-link" data-jump-ep="${m.epId}">
              ${currentLang === 'ko' ? '대표 참여 에피소드 재생 →' : 'Watch Featured Episode →'}
            </a>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('[data-bio-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-bio-toggle');
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.toggle('open');
    });
  });

  document.querySelectorAll('[data-jump-ep]').forEach(link => {
    link.addEventListener('click', () => {
      activeEpisodeId = link.getAttribute('data-jump-ep');
      renderFeaturedEpisode();
      renderEpisodeGrid();
    });
  });
}

function renderPressSection() {
  const container = document.getElementById('pressListContainer');
  container.innerHTML = pressItemsData.map((item, idx) => `
    <article class="press-item-row">
      <span class="press-outlet-badge ${item.isOfficial ? 'pr-official' : ''}">${item.outlet}</span>
      <div>
        <h3 class="press-item-title">${item.title[currentLang]}</h3>
        <div class="press-item-meta">${item.date} · ${item.meta[currentLang]}</div>
      </div>
      <button type="button" class="btn-secondary-editorial" style="padding: 8px 14px; font-size: 0.76rem;" data-press-idx="${idx}">
        ${currentLang === 'ko' ? '전문 열람 ↗' : 'Read Release ↗'}
      </button>
    </article>
  `).join('');

  container.querySelectorAll('[data-press-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = pressItemsData[Number(btn.getAttribute('data-press-idx'))];
      openUniversalModal(
        `${item.outlet} — ${item.date}`,
        `
          <h3 style="font-family: var(--font-serif); font-size: 1.35rem; margin-bottom: 12px;">${item.title[currentLang]}</h3>
          <p style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--brown-warm); margin-bottom: 18px;">${item.meta[currentLang]}</p>
          <p style="margin-bottom: 18px; line-height: 1.75; color: var(--bg-deep-slate);">
            ${currentLang === 'ko'
              ? '원빅월드쇼(One Big World Show / 1BWS)와 타일러 미디어(Tyler Media)는 검증된 1차 사료(Primary Sources)를 기반으로 거시경제, 지정학, 기술·에너지, 역사 분야의 심층 다큐멘터리와 도시에(Dossier) 리포트를 발행하고 있습니다. 본 보도자료의 고해상도 스틸컷과 공식 워드마크 에셋은 Press Kit 패키지에서 내려받으실 수 있습니다.'
              : 'One Big World Show (1BWS) and Tyler Media publish primary-source verified journalism across macroeconomics, geopolitics, technology, and history. High-resolution studio stills and official brand marks are available in the 1BWS Press Kit.'}
          </p>
          <div style="background: var(--bg-paper-light); border: var(--rule-hairline); padding: 14px; font-family: var(--font-mono); font-size: 0.76rem;">
            Press & Media Desk: <strong>request@tylerrasch.com</strong> · Official Portal: <strong>www.onebigworldshow.com</strong>
          </div>
        `
      );
    });
  });
}

function renderStoreSection() {
  const grid = document.getElementById('storeItemsGrid');
  grid.innerHTML = storeItemsData.map(item => `
    <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="store-item-card">
      <div class="store-thumb-slot" data-asset-slot="${item.slot}">
        <span class="store-status-badge ${item.badgeClass}">${item.badge}</span>
        <div class="slot-visual-holder" style="width:100%;height:100%;">
          ${generateStoreItemSVG(item)}
        </div>
        <button type="button" class="slot-replace-trigger" data-slot-target="${item.slot}">Replace Image</button>
      </div>
      <div class="store-card-body">
        <div>
          <div class="store-item-cat">${item.cat}</div>
          <h3 class="store-item-title">${item.title[currentLang]}</h3>
        </div>
        <div class="store-price-row">
          <span class="store-price">${item.price}</span>
          <span class="store-outlink-tag">SMART STORE ↗</span>
        </div>
      </div>
    </a>
  `).join('');

  grid.querySelectorAll('.slot-replace-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      triggerSlotFileReplace(btn.getAttribute('data-slot-target'));
    });
  });
}

/* --- 10. Universal Modals (Tips, Careers, B2B, Press Kit, Ethics Policy) --- */
function openUniversalModal(title, bodyHtml) {
  document.getElementById('universalModalTitle').textContent = title;
  document.getElementById('universalModalBody').innerHTML = bodyHtml;
  const backdrop = document.getElementById('universalModalBackdrop');
  backdrop.classList.add('open');
  backdrop.setAttribute('aria-hidden', 'false');
}

function closeUniversalModal() {
  const backdrop = document.getElementById('universalModalBackdrop');
  backdrop.classList.remove('open');
  backdrop.setAttribute('aria-hidden', 'true');
}

function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 3600);
}

function triggerSlotFileReplace(slotName) {
  activeReplaceSlotEl = document.querySelector(`[data-asset-slot="${slotName}"]`);
  document.getElementById('slotFileInput').click();
}

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18nDict[lang] && i18nDict[lang][key]) {
      el.innerHTML = i18nDict[lang][key];
    }
  });

  const activeHotspot = document.querySelector('.collage-hotspot.active');
  if (activeHotspot) {
    const key = activeHotspot.getAttribute('data-hotspot');
    document.getElementById('collageHotspotReadout').textContent = hotspotData[key][lang];
  }

  renderFeaturedEpisode();
  renderEpisodeGrid();
  renderDossierGrid();
  renderCastSection();
  renderPressSection();
  renderStoreSection();
  bindSlotReplaceButtons();
}

function bindSlotReplaceButtons() {
  document.querySelectorAll('.slot-replace-trigger').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      triggerSlotFileReplace(btn.getAttribute('data-slot-target'));
    };
  });
}

async function fetchLiveChannelStats() {
  const apiUrl = window.location.protocol === 'file:'
    ? 'https://www.tylerrasch.com/api/1bws-stats'
    : '/api/1bws-stats';

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) return;
    const data = await res.json();
    if (!data) return;

    if (data.subscribers) {
      if (data.subscribers.ko) i18nDict.ko['b2b.metric1Val'] = data.subscribers.ko;
      if (data.subscribers.en) i18nDict.en['b2b.metric1Val'] = data.subscribers.en;
      const metric1El = document.querySelector('[data-i18n="b2b.metric1Val"]');
      if (metric1El) {
        metric1El.textContent = i18nDict[currentLang]['b2b.metric1Val'];
      }
    }

    if (data.featuredVideoViews) {
      const ep1 = episodesData.find(e => e.id === 'ep-1');
      if (ep1) {
        if (data.featuredVideoViews.ko) ep1.views.ko = data.featuredVideoViews.ko;
        if (data.featuredVideoViews.en) ep1.views.en = data.featuredVideoViews.en;
      }
      renderFeaturedEpisode();
      renderEpisodeGrid();
    }
  } catch (_) {
    // Gracefully keep fallback values if offline
  }
}

/* --- 11. DOMContentLoaded Initialization & Event Listeners --- */
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage('ko');
  fetchLiveChannelStats();

  // Language Switcher (KR / EN)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.getAttribute('data-lang')));
  });

  // Asset Slot Overlay Inspector Toggle (Hidden unless ?slots=1 or Shift+Alt+S)
  const slotToggleBtn = document.getElementById('toggleSlotInspectorBtn');
  if (window.location.search.includes('slots=1')) {
    slotToggleBtn.classList.remove('is-hidden-devtools');
  }
  const toggleAssetSlots = () => {
    slotToggleBtn.classList.remove('is-hidden-devtools');
    const isShowing = document.body.classList.toggle('show-asset-slots');
    slotToggleBtn.classList.toggle('active', isShowing);
    slotToggleBtn.textContent = isShowing ? 'Asset Slots: On' : 'Asset Slots: Off';
  };
  slotToggleBtn.addEventListener('click', toggleAssetSlots);
  window.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.altKey && (e.key === 'S' || e.key === 's')) {
      e.preventDefault();
      toggleAssetSlots();
    }
  });

  // File Input Handler for Testing Custom Images in Any data-asset-slot
  document.getElementById('slotFileInput').addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file || !activeReplaceSlotEl) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const existingImg = activeReplaceSlotEl.querySelector('img');
      const holder = activeReplaceSlotEl.querySelector('.slot-visual-holder');
      if (existingImg) {
        existingImg.src = ev.target.result;
      } else if (holder) {
        holder.innerHTML = `<img src="${ev.target.result}" alt="Custom Slot Asset" style="width:100%;height:100%;object-fit:cover;" />`;
      }
      showToast(`Slot [${activeReplaceSlotEl.getAttribute('data-asset-slot')}] image updated.`);
    };
    reader.readAsDataURL(file);
  });

  // Mobile Menu Toggle + Auto-Close on Section Click
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenuEl = document.getElementById('navMenu');
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navMenuEl.classList.toggle('mobile-open');
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenuBtn.textContent = isOpen ? 'CLOSE ✕' : 'INDEX ☰';
  });
  navMenuEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenuEl.classList.contains('mobile-open')) {
        navMenuEl.classList.remove('mobile-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.textContent = 'INDEX ☰';
      }
    });
  });

  // Hero Plate I Thematic Index Tabs
  document.querySelectorAll('.collage-hotspot').forEach(pin => {
    pin.addEventListener('click', () => {
      document.querySelectorAll('.collage-hotspot').forEach(p => p.classList.remove('active'));
      pin.classList.add('active');
      const key = pin.getAttribute('data-hotspot');
      document.getElementById('collageHotspotReadout').textContent = hotspotData[key][currentLang];
    });
  });

  // Section 1 Manifesto Inline Accordion Drawer
  const manifestoDrawer = document.getElementById('manifestoDrawer');
  document.getElementById('toggleManifestoBtn').addEventListener('click', () => {
    const open = manifestoDrawer.classList.toggle('open');
    manifestoDrawer.setAttribute('aria-expanded', String(open));
    if (open) manifestoDrawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  document.getElementById('closeManifestoDrawerBtn').addEventListener('click', () => {
    manifestoDrawer.classList.remove('open');
  });

  // Section 2 Broadcast Player Controls & Tabs
  const togglePlay = () => {
    isPlayingSim = !isPlayingSim;
    document.getElementById('playBtnIcon').textContent = isPlayingSim ? '⏸' : '▶';
    document.getElementById('playBtnLabel').textContent = isPlayingSim
      ? (currentLang === 'ko' ? '스트리밍 재생 중' : 'Streaming Active')
      : i18nDict[currentLang]['media.playEpisode'];
    document.getElementById('playerMiniToggle').textContent = isPlayingSim ? '⏸ PAUSE' : '▶ PLAY';
    document.getElementById('playerTimelineProgress').style.width = isPlayingSim ? '68%' : '38%';
    renderFeaturedEpisode();
  };
  document.getElementById('featuredPlayBtn').addEventListener('click', togglePlay);
  document.getElementById('playerMiniToggle').addEventListener('click', togglePlay);

  document.getElementById('openRelatedBriefBtn').addEventListener('click', (e) => {
    openDossierSlideover(e.currentTarget.getAttribute('data-brief-id'));
  });

  document.querySelectorAll('.media-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.media-tab-btn').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentPlatformFilter = tab.getAttribute('data-platform');
      renderEpisodeGrid();
    });
  });

  // Section 3 Topic & Region Filters + Slideover Close
  document.querySelectorAll('#topicFilterGroup .dossier-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#topicFilterGroup .dossier-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTopicFilter = btn.getAttribute('data-topic');
      renderDossierGrid();
    });
  });

  document.querySelectorAll('#regionFilterGroup .dossier-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#regionFilterGroup .dossier-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentRegionFilter = btn.getAttribute('data-region');
      renderDossierGrid();
    });
  });

  document.getElementById('closeSlideoverBtn').addEventListener('click', () => {
    document.getElementById('dossierSlideoverBackdrop').classList.remove('open');
  });
  document.getElementById('dossierSlideoverBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'dossierSlideoverBackdrop') {
      e.currentTarget.classList.remove('open');
    }
  });
  document.getElementById('downloadDossierPdfBtn').addEventListener('click', () => {
    showToast(currentLang === 'ko' ? '1BWS 인텔리전스 도시에 리포트(MLA 사료 포함) 인쇄 뷰를 실행합니다.' : 'Preparing 1BWS Dossier PDF Report with MLA Sources...');
    window.print();
  });

  const drawerScrollContainer = document.getElementById('drawerScrollContainer');
  const drawerReadingProgress = document.getElementById('drawerReadingProgress');
  if (drawerScrollContainer && drawerReadingProgress) {
    drawerScrollContainer.addEventListener('scroll', () => {
      const maxScroll = drawerScrollContainer.scrollHeight - drawerScrollContainer.clientHeight;
      const pct = maxScroll > 0 ? Math.min(100, Math.max(0, (drawerScrollContainer.scrollTop / maxScroll) * 100)) : 0;
      drawerReadingProgress.style.width = `${pct.toFixed(1)}%`;
    }, { passive: true });
  }

  const copyMlaBtn = document.getElementById('copyMlaCitationsBtn');
  if (copyMlaBtn) {
    copyMlaBtn.addEventListener('click', async () => {
      const plainText = activeDossierMlaSources
        .map((src, idx) => `${idx + 1}. ${src.replace(/<[^>]+>/g, '')}`)
        .join('\n');
      try {
        await navigator.clipboard.writeText(plainText);
        showToast(currentLang === 'ko' ? 'MLA 9판 1차 사료 서지 정보가 클립보드에 복사되었습니다.' : 'MLA 9th Edition Bibliography copied to clipboard.');
      } catch (_) {
        showToast(currentLang === 'ko' ? '서지 정보가 선택되었습니다.' : 'Bibliography ready to copy.');
      }
    });
  }

  // Section 5 Newsletter Form
  document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmailInput').value;
    document.getElementById('newsletterFeedback').textContent =
      currentLang === 'ko'
        ? `[${email}] 구독이 등록되었습니다. 매주 화요일 오전 7시 1BWS 주간 브리프가 발송됩니다.`
        : `[${email}] Subscribed. You will receive the 1BWS Weekly Intelligence Dispatch every Tuesday.`;
    document.getElementById('newsletterEmailInput').value = '';
    showToast(currentLang === 'ko' ? '1BWS 주간 인텔리전스 브리프 구독이 완료되었습니다.' : 'Subscribed to 1BWS Weekly Intelligence Dispatch.');
  });

  // Section 6 Press Kit Modal
  const openPressKitModal = () => {
    openUniversalModal(
      'OFFICIAL 1BWS PRESS KIT & BRAND SPECIFICATIONS',
      `
        <p style="margin-bottom: 18px; color: var(--bg-deep-slate); line-height: 1.7;">
          ${currentLang === 'ko'
            ? '언론사 및 대외 파트너를 위한 원빅월드쇼(One Big World Show / 1BWS) 공식 워드마크·인장 3종 및 미디어 팩트시트입니다. 개별 에셋을 클릭하여 다운로드하실 수 있습니다.'
            : 'Official One Big World Show (1BWS) brand marks and media fact sheet for journalists, academic panels, and external partners.'}
        </p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
          <a href="/1BWS/assets/logo-transparent.png" download="1BWS-Logo-Transparent.png" style="background: var(--bg-paper-light); border: var(--rule-hairline); padding: 16px; text-align: center;">
            <img src="/1BWS/assets/logo-transparent.png" alt="Transparent Logo" style="height: 48px; margin: 0 auto 10px;" />
            <div style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 600;">Transparent Mark (PNG)</div>
          </a>
          <a href="/1BWS/assets/logo-standard.png" download="1BWS-Logo-Standard-White.png" style="background: var(--pure-white); border: var(--rule-hairline); padding: 16px; text-align: center;">
            <img src="/1BWS/assets/logo-standard.png" alt="Standard Logo" style="height: 48px; margin: 0 auto 10px;" />
            <div style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 600;">Primary Light (PNG)</div>
          </a>
          <a href="/1BWS/assets/logo-circle-dark.png" download="1BWS-Official-Seal-Dark.png" style="background: var(--bg-paper-light); border: var(--rule-hairline); padding: 16px; text-align: center;">
            <img src="/1BWS/assets/logo-circle-dark.png" alt="Dark Circle Seal" style="height: 48px; margin: 0 auto 10px;" />
            <div style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 600;">Official Seal (PNG)</div>
          </a>
        </div>
        <div style="background: var(--bg-paper-light); border: var(--rule-hairline); padding: 14px; font-family: var(--font-mono); font-size: 0.74rem; color: var(--bg-deep-slate);">
          <div>PRODUCER: Tyler Media (타일러 미디어) · EXECUTIVE PRODUCER: Tyler Rasch (타일러 라쉬)</div>
          <div>PRESS DESK: request@tylerrasch.com · PORTAL: www.onebigworldshow.com</div>
        </div>
      `
    );
  };
  document.getElementById('openPressKitModalBtn').addEventListener('click', openPressKitModal);
  document.getElementById('triggerPressKitDownloadBtn').addEventListener('click', openPressKitModal);

  // Section 8 Modal 1: Editorial Tip & Primary Resource Submission
  document.getElementById('openTipsModalBtn').addEventListener('click', () => {
    openUniversalModal(
      'EDITORIAL TIP & PRIMARY SOURCE SUBMISSION DESK',
      `
        <form id="tipsModalForm">
          <div class="form-group">
            <label class="form-label">DISCIPLINE (제보 분과)</label>
            <select class="form-control" required>
              <option value="macro">Macroeconomics & Capital Markets (거시경제 · 자본시장)</option>
              <option value="geo">Geopolitics & Foreign Policy (지정학 · 외교안보)</option>
              <option value="tech">Tech, AI Grid & Energy Supply Chain (기술 · 에너지 공급망)</option>
              <option value="history">Historical Archives & Declassified Filings (역사 · 기밀해제 사료)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">SUBMISSION SUMMARY & PRIMARY SOURCE CONTEXT (제보 요지 및 1차 사료 설명)</label>
            <textarea class="form-control" rows="4" placeholder="원빅월드쇼가 취재해야 할 핵심 이슈와 검증 가능한 1차 사료(논문, 법안 번호, 공공 통계, 현업 인사이트)를 기재해 주세요." required></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">ATTACH PRIMARY DOCUMENT / DATASET (PDF, DOCX, CSV, ZIP 첨부)</label>
            <input type="file" class="form-control" />
          </div>
          <div class="form-group">
            <label class="form-label">CONTACT OR ANONYMOUS PREFERENCE (회신 이메일 또는 익명 요청)</label>
            <input type="text" class="form-control" placeholder="익명 희망 시 'ANONYMOUS' 입력" />
          </div>
          <button type="submit" class="btn-primary-editorial" style="width: 100%;">편집국 데스크로 접수하기 →</button>
        </form>
      `
    );
    document.getElementById('tipsModalForm').addEventListener('submit', (e) => {
      e.preventDefault();
      closeUniversalModal();
      showToast('제보 및 첨부 사료가 1BWS 리서치 데스크에 접수되었습니다.');
    });
  });

  // Section 8 Modal 2: On-Air Panel, Reporter & Crew Recruitment
  document.getElementById('openCareersModalBtn').addEventListener('click', () => {
    openUniversalModal(
      '1BWS EDITORIAL FELLOWSHIP & CAREERS APPLICATION',
      `
        <form id="careersModalForm">
          <div class="form-group">
            <label class="form-label">SELECT POSITION (지원 직군 선택)</label>
            <select class="form-control" required>
              <option value="panel">Guest Panel (분야별 현업 전문가 · 연구자 객원 패널)</option>
              <option value="anchor">On-Air Reporter / Anchor (한·영 바이링구얼 리포터)</option>
              <option value="researcher">Research Editor / Analyst (1차 사료 해독 및 도시에 집필)</option>
              <option value="biz">Strategic & Brand Partnership Intern (미디어 비즈니스 · PR 인턴)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">APPLICANT NAME & EMAIL (성함 및 이메일)</label>
            <input type="text" class="form-control" placeholder="성함 / email@domain.com" required />
          </div>
          <div class="form-group">
            <label class="form-label">DOMAIN EXPERTISE & PITCH (전문 분야 및 1BWS 기획 제안)</label>
            <textarea class="form-control" rows="3" placeholder="본인의 연구/현업 전문성과 원빅월드쇼에서 함께 다루고 싶은 글로벌 주제를 적어주세요." required></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">CV / PORTFOLIO / SAMPLE UPLOAD (이력서 및 포트폴리오 첨부)</label>
            <input type="file" class="form-control" />
          </div>
          <button type="submit" class="btn-primary-editorial" style="width: 100%;">지원서 및 포트폴리오 제출하기 →</button>
        </form>
      `
    );
    document.getElementById('careersModalForm').addEventListener('submit', (e) => {
      e.preventDefault();
      closeUniversalModal();
      showToast('지원서 및 포트폴리오가 타일러 미디어 에디토리얼 데스크로 접수되었습니다.');
    });
  });

  // Section 9 B2B Media Kit & Brand Partnership Modals
  const openB2BModal = (mode) => {
    openUniversalModal(
      mode === 'kit'
        ? '2026 OFFICIAL 1BWS MEDIA KIT & RATE CARD REQUEST'
        : 'INSTITUTIONAL & BRAND PARTNERSHIP INQUIRY',
      `
        <div style="background: var(--bg-paper-light); color: var(--pure-black); padding: 14px 16px; border-left: 2px solid var(--green-forest); margin-bottom: 18px; font-family: var(--font-mono); font-size: 0.72rem;">
          <div style="color: var(--green-forest); font-weight: 600; margin-bottom: 2px;">1BWS AUDIENCE BENCHMARK (LIVE)</div>
          <div>${i18nDict.en['b2b.metric1Val']} Subscribers · 35.5M+ 90-Day Views · 69.8% Ages 25–54 Decision Makers · 60.6% Retention</div>
        </div>
        <form id="b2bModalForm">
          <div class="form-group">
            <label class="form-label">ORGANIZATION / BRAND (기업 · 기관명)</label>
            <input type="text" class="form-control" placeholder="Organization / Brand Name" required />
          </div>
          <div class="form-group">
            <label class="form-label">WORK EMAIL & CONTACT PERSON (담당자 성함 및 직무 이메일)</label>
            <input type="email" class="form-control" placeholder="partner@organization.com" required />
          </div>
          <div class="form-group">
            <label class="form-label">PARTNERSHIP SCOPE (희망 협업 형태)</label>
            <select class="form-control">
              <option>Branded Investigative Documentary Episode (브랜디드 심층 다큐멘터리)</option>
              <option>1BWS Intelligence Dossier & Monograph Sponsorship (리서치 도시에 스폰서십)</option>
              <option>Editorial Segment Sponsorship (정규 코너 협찬)</option>
              <option>Request 2026 Official Media Kit & Rate Card PDF Only (미디어킷 · 단가표 요청)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">CAMPAIGN TIMELINE & BRIEF (캠페인 일정 및 문의 내용)</label>
            <textarea class="form-control" rows="3" placeholder="희망 온에어 시기 및 주요 아젠다를 입력해 주세요. (직접 문의: request@tylerrasch.com)"></textarea>
          </div>
          <button type="submit" class="btn-primary-editorial" style="width: 100%;">타일러 미디어 파트너십 데스크로 전송 →</button>
        </form>
      `
    );
    document.getElementById('b2bModalForm').addEventListener('submit', (e) => {
      e.preventDefault();
      closeUniversalModal();
      showToast('파트너십 및 미디어킷 요청이 타일러 미디어 비즈니스 데스크에 접수되었습니다.');
    });
  };
  document.getElementById('openMediaKitReqBtn').addEventListener('click', () => openB2BModal('kit'));
  document.getElementById('openB2BInquiryBtn').addEventListener('click', () => openB2BModal('inquiry'));

  // Section 10 Footer Journalistic Standards, Information Integrity & AI Disclosure Policy Modal
  document.getElementById('openEthicsPolicyModalBtn').addEventListener('click', () => {
    openUniversalModal(
      'JOURNALISTIC STANDARDS, INFORMATION INTEGRITY & AI DISCLOSURE POLICY',
      `
        <div style="display: grid; gap: 16px; font-size: 0.9rem; line-height: 1.72; color: var(--bg-deep-slate);">
          <div style="background: var(--bg-paper-light); border: var(--rule-hairline); padding: 18px;">
            <h4 style="font-family: var(--font-serif); color: var(--pure-black); margin-bottom: 6px; font-size: 1.05rem;">
              1. 1차 사료 검증 원칙 (Primary-Source Verification Mandate)
            </h4>
            <p>원빅월드쇼(One Big World Show / 1BWS)는 익명의 전언이나 단일 2차 외신 인용에 의존하지 않습니다. 모든 에피소드와 도시에(Dossier)는 각국 정부 관보, 의회 법안 원문, 중앙은행 통계, 국제기구 보고서, 동료 심사를 거친 학술 논문 등 복수의 독립된 1차 사료 교차 검증을 거치며 MLA 9판 서지 양식으로 출처를 투명하게 공개합니다.</p>
          </div>
          <div style="background: var(--bg-paper-light); border: var(--rule-hairline); padding: 18px;">
            <h4 style="font-family: var(--font-serif); color: var(--pure-black); margin-bottom: 6px; font-size: 1.05rem;">
              2. 투명한 AI 활용 및 인간 에디터 최종 검수 원칙 (Transparent AI Assistance & Human-in-the-Loop)
            </h4>
            <p>1BWS 리서치팀은 다국어 방대한 외교 문건 검색, 데이터셋 분류, 초벌 번역 보조 과정에 한해 AI 도구를 활용할 수 있습니다. 그러나 <strong>모든 수치 대조, 맥락 해석, 스크립트 집필 및 최종 발행 승인은 반드시 타일러 라쉬 총괄 프로듀서와 인간 수석 에디터(Human Editor-in-Chief)의 직접 원문 대조 검수</strong>를 거칩니다. AI가 생성한 합성 이미지나 음성은 다큐멘터리 증거 사료로 절대 사용하지 않습니다.</p>
          </div>
          <div style="background: var(--bg-paper-light); border: var(--rule-hairline); padding: 18px;">
            <h4 style="font-family: var(--font-serif); color: var(--pure-black); margin-bottom: 6px; font-size: 1.05rem;">
              3. 편집권 독립 및 정정 보도 원칙 (Editorial Independence & Errata)
            </h4>
            <p>브랜드 파트너십(B2B) 콘텐츠는 상단에 명확히 협찬 고지를 표기하며, 파트너사의 이해관계가 1차 사료의 사실관계와 충돌할 경우 편집국은 사실을 우선합니다. 발행 후 중대한 사실 오류가 확인될 경우 24시간 이내에 도시에 아카이브와 방송 공지에 정정 내역(Errata)을 투명하게 기록합니다.</p>
          </div>
        </div>
      `
    );
  });

  // Universal Modal Close Triggers
  document.getElementById('closeUniversalModalBtn').addEventListener('click', closeUniversalModal);
  document.getElementById('universalModalBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'universalModalBackdrop') closeUniversalModal();
  });

  // Floating Seal Scroll-to-Top & Sticky Header Scroll Spy
  document.getElementById('scrollToTopSealBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    document.getElementById('stickyHeader').classList.toggle('scrolled', window.scrollY > 20);
    let currentSectionId = 'hero-manifesto';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 160) {
        currentSectionId = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-section') === currentSectionId);
    });
  });
});
