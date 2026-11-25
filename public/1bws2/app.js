(() => {
  const D = window.BWS_DATA;

  const state = {
    tier: "free",          // "free" | "black"
    activeTab: "home",     // "home" | "videos" | "reports" | "news" | "perks" | "store" | "profile"
    briefingCadence: "24h",// "24h" | "weekly" | "special"
    audioPlaying: false,
    audioProgress: 34,
    videoFilter: "all",    // "all" | "yt_alpha" | "black"
    selectedVideoId: "sWJuXdeJB4Q",
    videoCut: "main",      // "main" | "alpha"
    sidebarTab: "sources", // "sources" | "questions"
    selectedReportId: "rep-1",
    savedIds: ["rep-1"],
    userTopics: ["글로벌 매크로", "AI · 테크 소유권", "공급망 · 방산"],
    myQuestions: [],
    claimedPerks: [],
    surveyVoted: null,
    cartCount: 0,
    modal: null,           // null | "pricing" | "qr"
    pricingBuyer: "b2c",   // "b2c" | "b2b"
    pricingCycle: "annual",// "monthly" | "annual"
    qrInput: "",
    b2bSubmitted: false,
    toast: null
  };

  let toastTimer = null;
  let audioTimer = null;

  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showToast(msg) {
    state.toast = msg;
    renderToast();
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      state.toast = null;
      renderToast();
    }, 3200);
  }

  function logoLockupHtml(size = "sm", paper = false) {
    const textLogo = paper ? "./assets/logos/1bws_logo_text_black.svg" : "./assets/logos/1bws_logo_text_white.svg";
    if (size === "emblem") {
      return `
        <div class="hb-emblem">
          <img class="globe" src="./assets/logos/1bws_logo_globe.svg" alt="1BWS Globe" />
          <img class="word" src="${textLogo}" alt="1BWS Wordmark" />
        </div>
      `;
    }
    return `
      <div class="brand-lockup">
        <img class="brand-globe" src="./assets/logos/1bws_logo_globe.svg" alt="1BWS Globe" />
        <img class="brand-wordmark" src="${textLogo}" alt="1BWS" />
      </div>
    `;
  }

  function renderHeader() {
    const isBlack = state.tier === "black";
    const tabs = [
      { id: "home", label: "홈" },
      { id: "morning", label: "모닝리포트" },
      { id: "videos", label: "1BWS 비디오" },
      { id: "reports", label: "리포트" },
      { id: "news", label: "뉴스 비교", badge: '<span class="nav-beta">BETA</span>' },
      { id: "perks", label: "BLACK 혜택", badge: '<span class="orange-dot"></span>' },
      { id: "store", label: "스토어 · 포럼", badge: state.cartCount > 0 ? `<span class="cart-badge">${state.cartCount}</span>` : "" }
    ];

    return `
      <header class="topbar">
        <div class="topbar-inner">
          <button class="brand-btn" data-action="switch-tab" data-tab="home">
            ${logoLockupHtml("sm")}
            <div class="brand-text-wrap">
              <div class="brand-title-row">
                <span class="brand-name">ONE BIG WORLD SHOW</span>
                ${isBlack ? '<span class="black-pill">BLACK</span>' : ''}
              </div>
              <span class="brand-sub">GLOBAL MACRO · GEOPOLITICS · TECH</span>
            </div>
          </button>

          <nav class="nav-tabs" aria-label="Primary Navigation">
            ${tabs.map(t => `
              <button class="nav-tab ${state.activeTab === t.id ? "active" : ""}" data-action="switch-tab" data-tab="${t.id}">
                <span>${t.label}</span>${t.badge || ""}
              </button>
            `).join("")}
          </nav>

          <div class="top-actions">
            <div class="tier-switcher ${isBlack ? "is-black" : ""}" title="유료/무료 상태 실시간 전환 데모">
              <button class="ts-opt ${!isBlack ? "active-free" : ""}" data-action="switch-tier" data-tier="free">FREE 무료</button>
              <button class="ts-opt ${isBlack ? "active-black" : ""}" data-action="switch-tier" data-tier="black">BLACK 유료</button>
            </div>
            <button class="btn-ghost" data-action="open-modal" data-modal="qr">코드 입력 (QR)</button>
            ${isBlack
              ? `<button class="btn-primary-emerald" data-action="switch-tab" data-tab="profile">MY 프로필</button>`
              : `<button class="btn-primary-orange" data-action="open-modal" data-modal="pricing">구독하기</button>`
            }
          </div>
        </div>
      </header>
    `;
  }

  function renderDemoContextBar() {
    const isBlack = state.tier === "black";
    return `
      <div class="demo-context-bar ${isBlack ? "black-mode" : ""}">
        <div>
          ${isBlack
            ? `<strong>● 1BWS BLACK 멤버십 활성 중:</strong> 무료 광고가 제거되었으며, <strong>BLACK 독점 영상 · 리포트 전문(Full Text) · 인포그래픽 · PERKS</strong>가 모두 열려 있습니다.`
            : `<strong>○ FREE (베이직) 모드:</strong> 무료 사용자 화면입니다. 상단 <strong>[BLACK 유료]</strong> 스위치나 <strong>[코드 입력(BOOK2026)]</strong>으로 유료 전환 경험을 즉시 확인해 보세요.`
          }
        </div>
        <button class="sh-link" data-action="switch-tier" data-tier="${isBlack ? "free" : "black"}">
          ${isBlack ? "무료 화면으로 보기 ⇄" : "BLACK 모드로 즉시 전환 →"}
        </button>
      </div>
    `;
  }

  /* ==================== VIEW 1: HOME ==================== */
  function renderHome() {
    const b = D.briefings["24h"];
    const isBlack = state.tier === "black";
    const featuredVideos = D.videos.slice(0, 3);
    const totalVotes = D.survey.options.reduce((s, o) => s + o.votes + (state.surveyVoted === o.id ? 1 : 0), 0);

    return `
      ${renderDemoContextBar()}

      <!-- HOME HERO: COMPACT MORNING REPORT TEASER -->
      <section class="home-morning-teaser">
        <div class="hmt-left">
          <div class="hb-brand">
            ${logoLockupHtml("emblem")}
            <div>
              <div class="live-tag"><span class="pulse-dot"></span> TODAY'S 모닝리포트 · ${b.tag}</div>
              <h1 class="hb-headline">${b.title}</h1>
            </div>
          </div>
          <div class="hmt-chips">
            ${b.bullets.map(item => `<span class="hmt-chip"><strong>${item.cat}</strong></span>`).join("")}
            <span class="hmt-meta">오디오 요약 ${b.audioDuration} · 1BWS 에디터 데스크 발행</span>
          </div>
        </div>
        <div class="hmt-actions">
          <button class="btn-primary-emerald" data-action="switch-tab" data-tab="morning">모닝리포트 전체 보기 →</button>
          <button class="btn-ghost" data-action="switch-tab" data-tab="reports">오늘의 심층 리포트</button>
        </div>
      </section>

      <!-- FREE-ONLY AD BANNER (HIDDEN IN BLACK MODE) -->
      ${!isBlack ? `
        <div class="free-only-ad">
          <div class="ad-left">
            <span class="ad-tag" style="display:inline-block;padding:3px 8px;border-radius:4px;background:rgba(255,127,35,0.14);border:1px solid rgba(255,127,35,0.45);color:var(--orange);font-family:var(--font-mono);font-size:10.5px;font-weight:700;margin-bottom:4px;">PARTNER SPOTLIGHT</span>
            <div class="ad-copy">
              <strong>1BWS 파트너 브랜드 소식</strong>
              <p>글로벌 테크·금융·라이프스타일 파트너 소식 (1BWS BLACK 멤버십 이용 시 광고가 표시되지 않습니다)</p>
            </div>
          </div>
          <button class="btn-primary-orange" data-action="open-modal" data-modal="pricing">광고 없이 보기 →</button>
        </div>
      ` : ""}

      <!-- 12/3 STEVEN LEVY INTERVIEW — PRIVATE MEMBER QUESTION BOX -->
      <section class="steven-levy-box">
        <div class="sl-head">
          <div>
            <div class="live-tag" style="color:var(--orange);">UPCOMING EXCLUSIVE INTERVIEW · 12/3(목)</div>
            <h2 style="font-size:19px;font-weight:800;margin:4px 0 4px;">스티븐 레비(Steven Levy) 단독 인터뷰 — BLACK 멤버 사전 질문 접수</h2>
            <p style="font-size:13px;color:var(--ink-secondary);">실리콘밸리 최장수 테크 저널리스트(WIRED 수석 에디터)에게 직접 묻고 싶은 질문을 남겨주세요. 제출된 질문은 제작진에게만 비공개로 전달됩니다.</p>
          </div>
          <span class="black-pill" style="font-size:11px;padding:4px 10px;flex-shrink:0;">BLACK ONLY · 비공개 접수</span>
        </div>
        ${isBlack ? `
          <form class="sl-form" data-action="submit-question">
            <textarea class="q-input" name="question" rows="2" placeholder="12/3 스티븐 레비 인터뷰에서 다뤄줬으면 하는 질문을 입력해 주세요 (다른 회원에게는 공개되지 않습니다)..." required></textarea>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
              <span style="font-size:11.5px;color:var(--ink-muted);">🔒 비공개 접수 · 내 질문만 본인 계정에 기록됩니다 (${state.myQuestions.length}건 제출됨)</span>
              <button type="submit" class="btn-primary-emerald">제작진에게 질문 보내기</button>
            </div>
          </form>
        ` : `
          <div class="sl-locked">
            <span>🔒 <strong>1BWS BLACK 유료 멤버</strong>만 12/3 스티븐 레비 인터뷰 사전 질문을 비공개로 제출할 수 있습니다.</span>
            <div style="display:flex;gap:8px;flex-shrink:0;">
              <button class="btn-primary-orange" data-action="open-modal" data-modal="pricing">BLACK 구독하기</button>
              <button class="btn-ghost" data-action="open-modal" data-modal="qr">코드 입력</button>
            </div>
          </div>
        `}
      </section>

      <!-- 1BWS VIDEOS STRIP -->
      <div class="section-header">
        <div class="sh-title-group">
          <h2>1BWS 비디오 · 확장 에디션 &amp; <code>BLACK</code></h2>
          <p>공개 본편과 핵심 원문 자료, 플랫폼 독점 심층 인터뷰를 한 곳에서 시청하세요.</p>
        </div>
        <button class="sh-link" data-action="switch-tab" data-tab="videos">전체 6편 보기 →</button>
      </div>

      <div class="grid-3">
        ${featuredVideos.map(v => {
          const locked = v.type === "black" && !isBlack;
          return `
            <article class="card card-clickable" data-action="open-video" data-id="${v.id}">
              <div class="thumb-wrap ${locked ? "is-locked" : ""}">
                <img src="${v.thumb}" alt="${esc(v.title)}" />
                <span class="thumb-badge-tl ${v.type === "black" ? "badge-orange" : "badge-emerald"}">
                  ${v.type === "black" ? "BLACK EXCLUSIVE" : "1BWS 에디션"}
                </span>
                <span class="thumb-dur">${v.duration}</span>
                ${locked ? '<div class="lock-center"><span class="lock-chip">🔒 BLACK 전용</span></div>' : ""}
              </div>
              <div class="card-pad">
                <div class="card-meta"><span>${v.region}</span><span>${v.views} · ${v.alphaDur}</span></div>
                <h3 class="card-title">${v.title}</h3>
                <p class="card-desc">${v.desc}</p>
              </div>
            </article>
          `;
        }).join("")}
      </div>

      <!-- OUR REPORTS STRIP -->
      <div class="section-header">
        <div class="sh-title-group">
          <h2>Our Reports · 텍스트 + 인포그래픽 리포트</h2>
          <p>Free 회원은 핵심 요약(Preview)까지, BLACK 멤버는 전문(Full Text)과 인포그래픽 전체를 열람합니다.</p>
        </div>
        <button class="sh-link" data-action="switch-tab" data-tab="reports">리포트 리더 열기 →</button>
      </div>

      <div class="grid-2">
        ${D.reports.map(r => `
          <article class="card report-card card-clickable" data-action="open-report" data-id="${r.id}">
            <div>
              <div class="rc-top">
                <span class="rc-cat">${r.category}</span>
                <span class="thumb-badge-tl ${isBlack ? "badge-emerald" : "badge-orange"}" style="position:static;">
                  ${isBlack ? "FULL TEXT UNLOCKED" : "PREVIEW + PAYWALL"}
                </span>
              </div>
              <h3 class="rc-title">${r.title}</h3>
              <p class="card-desc">${r.summary[0]}</p>
            </div>
            <div class="rc-foot">
              <span>${r.date} · ${r.readTime}</span>
              <strong style="color:${isBlack ? "var(--emerald)" : "var(--orange)"};">
                ${isBlack ? "전문 읽기 →" : "미리보기 & 잠금해제 →"}
              </strong>
            </div>
          </article>
        `).join("")}
      </div>

      <!-- BOTTOM 2-COLUMN: 자체홍보 & SURVEY -->
      <div class="section-header">
        <div class="sh-title-group">
          <h2>커뮤니티 참여 &amp; 1BWS 캘린더</h2>
          <p>단행본 QR 온보딩, 비공개 오프라인 살롱, 오디언스 주제 투표</p>
        </div>
      </div>

      <div class="grid-2">
        <section class="card promo-card">
          <div>
            <span class="live-tag" style="color:var(--orange);">1BWS BOOKS &amp; LIVE SALON</span>
            <h3 style="font-size:18px; font-weight:800; margin:6px 0 10px;">단행본 출간 &amp; 2027 서울 비공개 살롱</h3>
            <div class="promo-list">
              <div class="promo-item">
                <div>
                  <strong style="font-size:13.5px;">📖 2026 단행본 (위즈덤하우스)</strong>
                  <p style="font-size:12px; color:var(--ink-secondary);">내지 QR 코드 입력 시 BLACK 멤버십 1개월 무료 전환</p>
                </div>
                <button class="btn-ghost" data-action="open-modal" data-modal="qr">QR 등록</button>
              </div>
              <div class="promo-item">
                <div>
                  <strong style="font-size:13.5px;">🏛️ 2027.02 반얀트리 서울 70인 비공개 살롱</strong>
                  <p style="font-size:12px; color:var(--ink-secondary);">글로벌 현업자 대담 &amp; VIP 리셉션 (BLACK 회원 20% 선예매)</p>
                </div>
                <button class="btn-ghost" data-action="switch-tab" data-tab="store">자세히</button>
              </div>
            </div>
          </div>
        </section>

        <section class="card survey-card">
          <span class="live-tag">SURVEY · 오디언스 수요 조사</span>
          <h3 style="font-size:17px; font-weight:800; margin:6px 0 4px;">${D.survey.question}</h3>
          <p style="font-size:12px; color:var(--ink-secondary);">클릭하면 실시간으로 비중이 반영되며 다음 제작 기획에 반영됩니다.</p>
          <div class="survey-opts">
            ${D.survey.options.map(opt => {
              const count = opt.votes + (state.surveyVoted === opt.id ? 1 : 0);
              const pct = Math.round((count / totalVotes) * 100);
              const isVoted = state.surveyVoted === opt.id;
              return `
                <button class="survey-opt ${isVoted ? "voted" : ""}" data-action="vote-survey" data-id="${opt.id}">
                  ${state.surveyVoted ? `<div class="survey-bar" style="width:${pct}%"></div>` : ""}
                  <span>${isVoted ? "✓ " : ""}${opt.label}</span>
                  <span style="font-family:var(--font-mono); font-size:12px; color:${isVoted ? "var(--emerald)" : "var(--ink-secondary)"};">
                    ${state.surveyVoted ? `${pct}%` : "투표"}
                  </span>
                </button>
              `;
            }).join("")}
          </div>
        </section>
      </div>
    `;
  }

  /* ==================== VIEW 1B: MORNING REPORT (DEDICATED) ==================== */
  function renderMorningReport() {
    const b = D.briefings[state.briefingCadence];
    const isBlack = state.tier === "black";

    return `
      ${renderDemoContextBar()}

      <section class="hero-briefing">
        <div class="hb-top">
          <div class="hb-brand">
            ${logoLockupHtml("emblem")}
            <div>
              <div class="live-tag"><span class="pulse-dot"></span> WHAT HAPPENED? · 모닝리포트 (${b.tag})</div>
              <h1 class="hb-headline">${b.title}</h1>
            </div>
          </div>

          <div class="cadence-tabs">
            <button class="cadence-btn ${state.briefingCadence === "24h" ? "active" : ""}" data-action="switch-cadence" data-cadence="24h">24h 업데이트</button>
            <button class="cadence-btn ${state.briefingCadence === "weekly" ? "active" : ""}" data-action="switch-cadence" data-cadence="weekly">1주간</button>
            <button class="cadence-btn is-special ${state.briefingCadence === "special" ? "active" : ""}" data-action="switch-cadence" data-cadence="special">특별이슈</button>
          </div>
        </div>

        <div class="hb-body">
          <ul class="hb-bullets">
            ${b.bullets.map(item => `
              <li class="hb-bullet">
                <span class="hb-cat ${state.briefingCadence === "special" ? "special" : ""}">${item.cat}</span>
                <span class="hb-txt">${item.text}</span>
              </li>
            `).join("")}
          </ul>

          <div class="audio-box">
            <div class="audio-meta">
              <span>AUDIO BRIEFING · 출근길 10분 맥락 요약</span>
              <span style="color:var(--emerald);">${state.audioPlaying ? "PLAYING" : "READY"}</span>
            </div>
            <div class="audio-title">${b.audioTitle}</div>
            <div class="audio-controls">
              <button class="play-btn" data-action="toggle-audio" aria-label="Play Audio Briefing">${state.audioPlaying ? "❚❚" : "▶"}</button>
              <div class="progress-track"><div class="progress-fill" style="width:${state.audioProgress}%"></div></div>
              <span class="audio-time">${b.audioDuration}</span>
            </div>
            <div style="font-size:12px; color:var(--ink-secondary); display:flex; justify-content:space-between; border-top:1px solid var(--border); padding-top:10px;">
              <span>1BWS 에디터 데스크 검증 완료</span>
              <button class="sh-link" data-action="switch-tab" data-tab="reports">관련 심층 리포트 →</button>
            </div>
          </div>
        </div>
      </section>

      <div class="section-header">
        <div class="sh-title-group">
          <h2>권역별 핵심 시그널 · Morning Pulse</h2>
          <p>오늘 출근길에 반드시 체크해야 할 4대 매크로·산업 변곡점</p>
        </div>
        <button class="sh-link" data-action="switch-tab" data-tab="news">뉴스 비교(Beta) 보기 →</button>
      </div>

      <div class="morning-pulse-grid">
        ${D.morningPulse.map(p => `
          <div class="card" style="padding:16px;">
            <div class="card-meta" style="margin-bottom:6px;"><span style="color:var(--emerald);">${p.region}</span></div>
            <div style="font-size:15px;font-weight:800;margin-bottom:6px;">${p.signal}</div>
            <p class="card-desc">${p.note}</p>
          </div>
        `).join("")}
      </div>

      <div class="section-header">
        <div class="sh-title-group">
          <h2>지난 모닝리포트 아카이브</h2>
          <p>${isBlack ? "1BWS BLACK 권한으로 모든 과거 브리핑과 오디오 요약을 제한 없이 열람합니다." : "최근 7일 아카이브 무료 제공 · 전체 아카이브 검색은 BLACK 전용"}</p>
        </div>
      </div>

      <div class="grid-3">
        ${D.morningArchive.map(a => `
          <article class="card card-clickable" style="padding:18px;display:flex;flex-direction:column;justify-content:space-between;gap:12px;" data-action="switch-tab" data-tab="reports">
            <div>
              <div class="card-meta"><span>${a.date}</span><span style="color:var(--orange);">${a.tag}</span></div>
              <h3 class="card-title" style="margin-top:6px;">${a.title}</h3>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--ink-secondary);border-top:1px solid var(--border);padding-top:10px;">
              <span>${a.readTime}</span>
              <span style="color:var(--emerald);font-weight:700;">읽기 →</span>
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  /* ==================== VIEW 2: VIDEOS ==================== */
  function renderVideos() {
    const isBlack = state.tier === "black";
    const list = D.videos.filter(v => state.videoFilter === "all" || v.type === state.videoFilter);
    const cur = D.videos.find(v => v.id === state.selectedVideoId) || D.videos[0];
    const isLocked = (cur.type === "black" && !isBlack) || (cur.type === "yt_alpha" && state.videoCut === "alpha" && !isBlack);

    return `
      ${renderDemoContextBar()}

      <div class="filter-row">
        <button class="filter-pill ${state.videoFilter === "all" ? "active" : ""}" data-action="filter-videos" data-filter="all">전체 (${D.videos.length})</button>
        <button class="filter-pill ${state.videoFilter === "yt_alpha" ? "active" : ""}" data-action="filter-videos" data-filter="yt_alpha">공개 본편 + 확장 자료</button>
        <button class="filter-pill ${state.videoFilter === "black" ? "active" : ""}" data-action="filter-videos" data-filter="black">BLACK 독점 영상 (유료)</button>
      </div>

      <div class="video-stage">
        <div class="player-shell">
          <div class="player-screen">
            <img src="${cur.thumb}" alt="${esc(cur.title)}" style="${isLocked ? "filter:blur(7px) brightness(0.45);transform:scale(1.04);" : ""}" />
            ${isLocked ? `
              <div class="paywall-video-overlay">
                <img src="./assets/logos/1bws_logo_globe.svg" style="width:52px;height:52px;" alt="1BWS Globe" />
                <span class="black-pill" style="font-size:11px;padding:3px 10px;">1BWS BLACK EXCLUSIVE</span>
                <h3 style="font-size:20px;font-weight:800;max-width:460px;">
                  ${cur.type === "yt_alpha" ? "1BWS 플랫폼 전용 확장 컷 구간입니다" : "BLACK 멤버 전용 1차 현업자 오리지널 영상입니다"}
                </h3>
                <p style="font-size:13.5px;color:var(--ink-secondary);max-width:440px;">
                  유튜브 외부의 고밀도 비공개 대담·무편집 Q&amp;A와 1차 사료 브리프를 광고 없이 시청하세요.
                </p>
                <div style="display:flex;gap:10px;margin-top:6px;">
                  <button class="btn-primary-orange" data-action="open-modal" data-modal="pricing">BLACK 구독 시작</button>
                  <button class="btn-ghost" data-action="open-modal" data-modal="qr">단행본 QR 코드 입력</button>
                </div>
              </div>
            ` : `
              <div class="play-hud">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span class="thumb-badge-tl ${cur.type === "black" ? "badge-orange" : "badge-emerald"}" style="position:static;">
                    ${cur.type === "black" ? "1BWS BLACK · 1080p HD" : (state.videoCut === "alpha" ? "1BWS 확장 컷 · 1080p HD" : "1BWS 에디션 · 1080p HD")}
                  </span>
                  <span class="thumb-dur" style="position:static;">${cur.duration}</span>
                </div>
                <div style="display:flex;align-items:center;gap:12px;background:rgba(6,8,13,0.78);padding:10px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.14);">
                  <span style="width:32px;height:32px;border-radius:50%;background:var(--emerald);color:#04120B;display:inline-flex;align-items:center;justify-content:center;font-weight:900;">▶</span>
                  <div style="flex:1;">
                    <div style="font-size:12.5px;font-weight:700;">스트리밍 준비 완료 · 1080p HD</div>
                    <div style="height:4px;background:rgba(255,255,255,0.16);border-radius:99px;margin-top:5px;"><div style="width:32%;height:100%;background:var(--emerald);border-radius:99px;"></div></div>
                  </div>
                </div>
              </div>
            `}
          </div>

          <div class="player-info">
            <div class="card-meta"><span>${cur.region}</span><span>${cur.views} · ${cur.alphaDur}</span></div>
            <h2 style="font-size:19px;font-weight:800;line-height:1.35;margin-bottom:6px;">${cur.title}</h2>
            <p class="card-desc">${cur.desc}</p>
            ${cur.type === "yt_alpha" ? `
              <div class="cut-switcher">
                <button class="cut-btn ${state.videoCut === "main" ? "active" : ""}" data-action="toggle-video-cut" data-cut="main">공개 본편 (무료)</button>
                <button class="cut-btn ${state.videoCut === "alpha" ? "active" : ""}" data-action="toggle-video-cut" data-cut="alpha">
                  ${isBlack ? "✓ 1BWS 확장 컷 (잠금해제)" : "🔒 1BWS 확장 컷 (BLACK)"}
                </button>
              </div>
            ` : ""}
          </div>
        </div>

        <!-- SIDEBAR: CORE SOURCES & 12/3 STEVEN LEVY PRIVATE QUESTION BOX -->
        <aside class="sidebar-panel">
          <div class="sp-tabs">
            <button class="sp-tab ${state.sidebarTab === "sources" ? "active" : ""}" data-action="switch-sidebar-tab" data-tab="sources">핵심 자료실 (${cur.alphaNotes.length})</button>
            <button class="sp-tab ${state.sidebarTab === "questions" ? "active" : ""}" data-action="switch-sidebar-tab" data-tab="questions">12/3 인터뷰 질문</button>
          </div>
          <div class="sp-body">
            ${state.sidebarTab === "sources" ? `
              ${cur.alphaNotes.map((n, idx) => `
                <div class="source-item">
                  <strong>${idx === 0 || isBlack ? n.title : `🔒 ${n.title}`}</strong>
                  <p style="color:var(--ink-secondary);">${idx === 0 || isBlack ? n.detail : "BLACK 멤버십 구독 시 1차 원문 자료 및 PDF 브리프를 바로 열람할 수 있습니다."}</p>
                </div>
              `).join("")}
              <div class="source-item" style="margin-top:auto;border-color:rgba(1,255,127,0.28);background:rgba(1,255,127,0.04);">
                <strong style="color:var(--emerald);">연계 모닝리포트 &amp; 심층 리포트</strong>
                <p style="color:var(--ink-secondary);margin-bottom:8px;">이 영상의 핵심 데이터와 인포그래픽을 텍스트 리포트로 이어서 확인하세요.</p>
                <div style="display:flex;gap:8px;">
                  <button class="btn-ghost" style="font-size:11.5px;padding:5px 10px;" data-action="switch-tab" data-tab="morning">모닝리포트</button>
                  <button class="btn-ghost" style="font-size:11.5px;padding:5px 10px;border-color:var(--emerald);color:var(--emerald);" data-action="switch-tab" data-tab="reports">심층 리포트 →</button>
                </div>
              </div>
            ` : `
              <div class="source-item" style="border-color:rgba(255,127,35,0.35);background:rgba(255,127,35,0.06);">
                <strong style="color:var(--orange);">12/3(목) 스티븐 레비(Steven Levy) 인터뷰</strong>
                <p style="color:var(--ink-secondary);">BLACK 멤버 사전 질문을 비공개로 접수합니다. 다른 회원의 질문은 공개되지 않습니다.</p>
              </div>
              ${isBlack ? `
                <form class="q-form" data-action="submit-question">
                  <textarea class="q-input" name="question" rows="3" placeholder="스티븐 레비에게 직접 묻고 싶은 질문을 남겨주세요..." required></textarea>
                  <button type="submit" class="btn-primary-emerald" style="width:100%;">제작진에게 비공개 질문 보내기</button>
                </form>
                ${state.myQuestions.length > 0 ? `
                  <div style="font-size:11.5px;color:var(--ink-muted);margin-top:6px;">내가 제출한 질문 (본인에게만 표시)</div>
                  ${state.myQuestions.map(q => `
                    <div class="q-item">
                      <span>${esc(q.text)}</span>
                      <span style="font-family:var(--font-mono);font-size:10.5px;color:var(--emerald);flex-shrink:0;">접수됨</span>
                    </div>
                  `).join("")}
                ` : `<p style="font-size:12px;color:var(--ink-muted);text-align:center;padding:8px 0;">아직 제출한 질문이 없습니다.</p>`}
              ` : `
                <div class="source-item" style="text-align:center;padding:18px 14px;">
                  <strong style="display:block;margin-bottom:6px;">🔒 BLACK 멤버 전용 질문 접수</strong>
                  <p style="color:var(--ink-secondary);margin-bottom:12px;">유료 멤버십 활성화 후 12/3 스티븐 레비 인터뷰 질문을 비공개로 제출하실 수 있습니다.</p>
                  <button class="btn-primary-orange" style="width:100%;" data-action="open-modal" data-modal="pricing">BLACK 구독 시작 →</button>
                </div>
              `}
            `}
          </div>
        </aside>
      </div>

      <h3 style="font-size:16px;font-weight:800;margin-bottom:12px;">영상 라이브러리</h3>
      <div class="grid-3">
        ${list.map(v => {
          const locked = v.type === "black" && !isBlack;
          return `
            <article class="card card-clickable" data-action="open-video" data-id="${v.id}" style="${v.id === cur.id ? "border-color:var(--emerald);" : ""}">
              <div class="thumb-wrap ${locked ? "is-locked" : ""}">
                <img src="${v.thumb}" alt="${esc(v.title)}" />
                <span class="thumb-badge-tl ${v.type === "black" ? "badge-orange" : "badge-emerald"}">${v.type === "black" ? "BLACK EXCLUSIVE" : "1BWS 에디션"}</span>
                <span class="thumb-dur">${v.duration}</span>
                ${locked ? '<div class="lock-center"><span class="lock-chip">🔒 BLACK</span></div>' : ""}
              </div>
              <div class="card-pad">
                <div class="card-meta"><span>${v.region}</span><span>${v.views}</span></div>
                <h4 class="card-title">${v.title}</h4>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  /* ==================== VIEW 3: REPORTS (LIGHT PAPER READER) ==================== */
  function renderReports() {
    const isBlack = state.tier === "black";
    const rep = D.reports.find(r => r.id === state.selectedReportId) || D.reports[0];
    const isSaved = state.savedIds.includes(rep.id);

    return `
      ${renderDemoContextBar()}

      <div class="report-selector">
        ${D.reports.map(r => `
          <button class="rep-sel-btn ${r.id === rep.id ? "active" : ""}" data-action="select-report" data-id="${r.id}">
            ${r.category} · ${r.title.slice(0, 22)}...
          </button>
        `).join("")}
      </div>

      <article class="paper-reader">
        <div class="paper-masthead">
          <div class="pm-left">
            <img class="pm-logo" src="./assets/logos/1bws_logo_text_black.svg" alt="1BWS Wordmark" />
            <span class="pm-badge">OUR REPORTS · TEXT + INFOGRAPHIC</span>
          </div>
          <button class="btn-ghost" style="background:#F1F5F9;color:#0B0F17;border-color:#CBD5E1;" data-action="toggle-save" data-id="${rep.id}">
            ${isSaved ? "★ 저장됨" : "☆ 리포트 저장"}
          </button>
        </div>

        <div class="paper-meta-line">${rep.category} · ${rep.date} · ${rep.readTime}</div>
        <h1 class="paper-title">${rep.title}</h1>

        <div class="paper-summary-box">
          <h4>EXECUTIVE SUMMARY · FREE PREVIEW</h4>
          <ul>
            ${rep.summary.map(s => `<li>${s}</li>`).join("")}
          </ul>
        </div>

        <div class="paper-prose">
          ${rep.previewHtml}
          ${rep.svg1}
        </div>

        <div class="paywall-zone">
          <div class="paper-prose ${!isBlack ? "paywall-blur" : ""}">
            ${rep.fullHtml}
            ${rep.svg2}
          </div>

          ${!isBlack ? `
            <div class="paywall-gate-card">
              <img class="pw-watermark" src="./assets/logos/1bws_logo_globe.svg" alt="1BWS Watermark" />
              <span class="black-pill" style="font-size:10.5px;">1BWS BLACK FULL TEXT</span>
              <h3 style="font-size:21px;font-weight:800;margin:8px 0 6px;">여기서부터 1BWS BLACK 전문(Full Text)입니다</h3>
              <p style="font-size:13.5px;color:#CBD5E1;max-width:560px;line-height:1.55;">
                월 ₩15,000(연간 구독 시 월 ₩12,000)으로 심층 리포트 전문, 시나리오 인포그래픽, 독점 인터뷰 영상, 광고 없는 모닝리포트 및 파트너 PERKS를 모두 이용하세요.
              </p>
              <div class="pw-actions">
                <button class="btn-primary-orange" data-action="open-modal" data-modal="pricing">BLACK 구독 시작 →</button>
                <button class="btn-ghost" data-action="open-modal" data-modal="qr">단행본 QR / B2B 코드 입력</button>
                <button class="btn-ghost" data-action="switch-tier" data-tier="black" style="border-color:var(--emerald);color:var(--emerald);">데모: 즉시 잠금 해제</button>
              </div>
            </div>
          ` : `
            <div style="margin-top:18px;padding:12px 16px;border-radius:8px;background:#ECFDF5;border:1px solid #6EE7B7;color:#065F46;font-size:13px;font-weight:600;display:flex;justify-content:space-between;align-items:center;">
              <span>✓ 1BWS BLACK 회원 권한으로 리포트 전문 및 인포그래픽 2종이 모두 열람되었습니다.</span>
              <button class="btn-ghost" style="background:#FFFFFF;color:#0B0F17;border-color:#A7F3D0;" data-action="copy-text" data-text="https://onebigworldshow.com/reports/${rep.id}">링크 복사</button>
            </div>
          `}
        </div>
      </article>
    `;
  }

  /* ==================== VIEW 4: NEWS COMPARISON (BETA) ==================== */
  function renderNews() {
    return `
      ${renderDemoContextBar()}

      <div class="beta-banner">
        <div>
          <strong style="color:var(--emerald);font-family:var(--font-mono);">BETA · 글로벌 언론 보도 비교</strong>
          <div style="color:var(--ink-primary);margin-top:2px;">글로벌 주요 이슈에 대한 미국·유럽·아시아/한국 매체의 보도 프레임을 한눈에 비교합니다.</div>
        </div>
        <span class="nav-beta">3개 권역 프레임 비교</span>
      </div>

      ${D.newsClusters.map(c => `
        <article class="card news-cluster">
          <div class="card-meta"><span>${c.topic}</span><span>3개 권역 비교 분석</span></div>
          <h3 style="font-size:18px;font-weight:800;">${c.title}</h3>
          <div style="display:flex;gap:14px;font-family:var(--font-mono);font-size:11px;color:var(--ink-secondary);margin-bottom:4px;">
            <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#3B82F6;margin-right:5px;"></span>US ${c.ratios.us}%</span>
            <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--emerald);margin-right:5px;"></span>EU ${c.ratios.eu}%</span>
            <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--orange);margin-right:5px;"></span>KOREA / ASIA ${c.ratios.asia}%</span>
          </div>
          <div class="coverage-bar">
            <div style="width:${c.ratios.us}%;background:#3B82F6;" title="US"></div>
            <div style="width:${c.ratios.eu}%;background:var(--emerald);" title="EU"></div>
            <div style="width:${c.ratios.asia}%;background:var(--orange);" title="Korea/Asia"></div>
          </div>
          <div style="font-size:13px;color:var(--ink-primary);padding:10px 12px;border-radius:8px;background:rgba(1,255,127,0.07);border:1px solid rgba(1,255,127,0.22);">
            <strong style="color:var(--emerald);">1BWS 에디터 맥락:</strong> ${c.editorNote}
          </div>
          <div class="outlet-grid">
            ${c.outlets.map(o => `
              <div class="outlet-box">
                <div class="region">${o.region}</div>
                <p style="color:var(--ink-secondary);line-height:1.45;">${o.stance}</p>
              </div>
            `).join("")}
          </div>
        </article>
      `).join("")}
    `;
  }

  /* ==================== VIEW 5: PERKS ==================== */
  function renderPerks() {
    const isBlack = state.tier === "black";
    return `
      ${renderDemoContextBar()}

      <div class="section-header" style="margin-top:6px;">
        <div class="sh-title-group">
          <h2>BLACK PERKS · 멤버 전용 파트너 제휴 혜택</h2>
          <p>외부 파트너사 % 우대, 전용 쿠폰 코드 및 오프라인 살롱 우선 예매 혜택 (BLACK 멤버 전용)</p>
        </div>
        <span class="black-pill" style="font-size:11px;padding:5px 10px;">연간 예상 혜택 가치 ₩380,000+</span>
      </div>

      <div class="grid-2">
        ${D.perks.map(p => {
          const claimed = state.claimedPerks.includes(p.id);
          return `
            <article class="perk-card">
              <div>
                <div class="card-meta"><span style="color:var(--orange);">${p.partner}</span><span class="black-pill">BLACK ONLY</span></div>
                <div class="perk-discount">${p.discount}</div>
                <h3 style="font-size:17px;font-weight:800;margin:6px 0;">${p.title}</h3>
                <p class="card-desc">${p.desc}</p>
              </div>
              <div>
                ${!isBlack ? `
                  <button class="btn-primary-orange" style="width:100%;padding:10px;" data-action="open-modal" data-modal="pricing">🔒 BLACK 멤버 전용 · 혜택 열기</button>
                ` : claimed ? `
                  <div class="coupon-box">
                    <span>발급 코드: ${p.code}</span>
                    <button class="btn-ghost" style="padding:4px 9px;font-size:11.5px;" data-action="copy-text" data-text="${p.code}">복사 ✓</button>
                  </div>
                ` : `
                  <button class="btn-primary-emerald" style="width:100%;padding:10px;" data-action="claim-perk" data-id="${p.id}">전용 쿠폰 코드 발급받기</button>
                `}
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  /* ==================== VIEW 6: STORE & EVENTS ==================== */
  function renderStore() {
    return `
      ${renderDemoContextBar()}

      <div class="section-header" style="margin-top:6px;">
        <div class="sh-title-group">
          <h2>오프라인 포럼 &amp; 북콘서트 티켓팅</h2>
          <p>1BWS 출연 패널과 직접 호흡하는 비공개 살롱 및 단행본 강연 일정</p>
        </div>
      </div>

      <div class="grid-2">
        ${D.events.map(ev => `
          <article class="card" style="padding:20px;display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
            <div>
              <span class="black-pill">${ev.tag}</span>
              <h3 style="font-size:18px;font-weight:800;margin:8px 0 4px;">${ev.title}</h3>
              <div style="font-family:var(--font-mono);font-size:11.5px;color:var(--emerald);margin-bottom:8px;">${ev.date}</div>
              <p class="card-desc">${ev.desc}</p>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid var(--border);">
              <strong style="font-size:13px;color:var(--orange);">${ev.price}</strong>
              <button class="btn-ghost" data-action="add-cart" data-title="${esc(ev.title)}">사전 알림 / 예매 신청</button>
            </div>
          </article>
        `).join("")}
      </div>

      <div class="section-header">
        <div class="sh-title-group">
          <h2>1BWS 큐레이션 스토어 &amp; <code>1₿₩$</code> 굿즈</h2>
          <p>단행본(플랫폼 QR 수록) 및 브랜드 에디션 굿즈</p>
        </div>
      </div>

      <div class="grid-3">
        ${D.storeItems.map(item => `
          <article class="card">
            <div class="merch-thumb">
              <img src="./assets/logos/1bws_logo_globe.svg" style="width:70px;height:70px;position:absolute;opacity:0.25;" alt="1BWS Globe" />
              <img src="./assets/logos/1bws_logo_text_white.svg" style="width:86px;position:relative;z-index:2;" alt="1BWS Mark" />
              <span class="thumb-badge-tl badge-dark">${item.badge}</span>
            </div>
            <div class="card-pad">
              <h3 class="card-title">${item.title}</h3>
              <p class="card-desc" style="min-height:42px;">${item.desc}</p>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">
                <strong style="font-family:var(--font-display);font-size:17px;">${item.price}</strong>
                <button class="btn-primary-emerald" data-action="add-cart" data-title="${esc(item.title)}">장바구니 담기</button>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  /* ==================== VIEW 7: PROFILE & PERSONALIZATION ==================== */
  function renderProfile() {
    const isBlack = state.tier === "black";
    const topics = ["글로벌 매크로", "AI · 테크 소유권", "공급망 · 방산", "자본 · 디지털 자산", "글로벌 유통 · 소비", "북미 · 지정학"];
    const savedReports = D.reports.filter(r => state.savedIds.includes(r.id));

    return `
      ${renderDemoContextBar()}

      <div class="grid-2">
        <section class="card" style="padding:22px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
            <div>
              <div class="card-meta" style="margin-bottom:2px;">MEMBER PROFILE</div>
              <h2 style="font-size:20px;font-weight:800;">내 계정 &amp; 관심 분야 개인화</h2>
            </div>
            <span class="${isBlack ? "black-pill" : "nav-beta"}" style="font-size:11px;padding:4px 10px;">
              ${isBlack ? "1BWS BLACK · 광고 제거 활성" : "FREE BASIC"}
            </span>
          </div>

          <p class="card-desc" style="margin-bottom:12px;">선택한 주제에 맞춰 <strong>모닝리포트</strong> 및 추천 리포트 피드가 우선 정렬됩니다.</p>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;">
            ${topics.map(t => `
              <button class="topic-chip ${state.userTopics.includes(t) ? "selected" : ""}" data-action="toggle-topic" data-topic="${t}">
                ${state.userTopics.includes(t) ? "✓ " : "+ "}${t}
              </button>
            `).join("")}
          </div>

          <div style="border-top:1px solid var(--border);padding-top:14px;display:flex;justify-content:space-between;align-items:center;font-size:12.5px;color:var(--ink-secondary);">
            <span>약정 없이 언제든 원클릭으로 간편 해지 가능</span>
            <button class="btn-ghost" data-action="cancel-confirm" style="color:#FCA5A5;border-color:rgba(248,113,113,0.35);">구독 해지 / 계정 관리</button>
          </div>
        </section>

        <section class="card" style="padding:22px;">
          <div class="card-meta">SAVED &amp; MY QUESTIONS</div>
          <h3 style="font-size:18px;font-weight:800;margin-bottom:12px;">저장한 리포트 (${savedReports.length})</h3>
          ${savedReports.length === 0 ? `<p class="card-desc">저장된 리포트가 없습니다.</p>` : savedReports.map(r => `
            <div class="promo-item" style="margin-bottom:8px;">
              <span style="font-size:13px;font-weight:600;">${r.title}</span>
              <button class="btn-ghost" data-action="open-report" data-id="${r.id}">열기</button>
            </div>
          `).join("")}

          <h3 style="font-size:16px;font-weight:800;margin:16px 0 8px;">12/3 스티븐 레비 인터뷰 — 내가 제출한 질문 (${state.myQuestions.length})</h3>
          ${state.myQuestions.length === 0 ? `<p class="card-desc">아직 제출한 질문이 없습니다. (다른 회원의 질문은 비공개입니다)</p>` : state.myQuestions.map(q => `
            <div class="q-item" style="margin-bottom:6px;">
              <span>${esc(q.text)}</span>
              <span style="font-family:var(--font-mono);font-size:11px;color:var(--emerald);">비공개 접수됨</span>
            </div>
          `).join("")}
        </section>
      </div>
    `;
  }

  /* ==================== MODALS ==================== */
  function renderModal() {
    if (!state.modal) return "";

    if (state.modal === "pricing") {
      const annual = state.pricingCycle === "annual";
      return `
        <div class="modal-backdrop" data-action="backdrop-close">
          <div class="modal-card">
            <div class="modal-head">
              <div>
                <span class="live-tag" style="color:var(--orange);">ONEBIGWORLDSHOW.COM · WEB CHECKOUT</span>
                <h2 style="font-size:21px;font-weight:800;margin-top:3px;">1BWS 멤버십 구독 안내</h2>
              </div>
              <button class="modal-close" data-action="close-modal">✕</button>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
              <div class="cadence-tabs">
                <button class="cadence-btn ${state.pricingBuyer === "b2c" ? "active" : ""}" data-action="switch-buyer" data-buyer="b2c">👤 개인 구독 (B2C)</button>
                <button class="cadence-btn is-special ${state.pricingBuyer === "b2b" ? "active" : ""}" data-action="switch-buyer" data-buyer="b2b">🏢 기업 · 팀 구독 (B2B)</button>
              </div>
              ${state.pricingBuyer === "b2c" ? `
                <div class="cadence-tabs">
                  <button class="cadence-btn ${!annual ? "active" : ""}" data-action="switch-cycle" data-cycle="monthly">월간 결제</button>
                  <button class="cadence-btn ${annual ? "active" : ""}" data-action="switch-cycle" data-cycle="annual">연간 결제 (20% ↓)</button>
                </div>
              ` : ""}
            </div>

            ${state.pricingBuyer === "b2c" ? `
              <div class="pricing-grid">
                <div class="plan-card">
                  <div>
                    <span class="nav-beta">FREE</span>
                    <h3 style="font-size:18px;font-weight:800;margin-top:6px;">Free Basic</h3>
                    <div class="plan-price">₩0</div>
                    <ul class="plan-list">
                      <li>✓ 모닝리포트 (24h · 1주간 · 특별이슈 요약)</li>
                      <li>✓ 공개 본편 영상 + 기본 사료 링크</li>
                      <li>✓ Our Reports 핵심 요약 (Preview)</li>
                      <li>• 파트너 브랜드 배너 포함</li>
                    </ul>
                  </div>
                  <button class="btn-ghost" data-action="switch-tier-close" data-tier="free">무료 모드로 계속 보기</button>
                </div>

                <div class="plan-card featured">
                  <div>
                    <span class="black-pill">BLACK MEMBERSHIP</span>
                    <h3 style="font-size:18px;font-weight:800;margin-top:6px;">1BWS BLACK</h3>
                    <div class="plan-price" style="color:var(--orange);">${annual ? "₩12,000" : "₩15,000"} <span style="font-size:13px;color:var(--ink-secondary);font-weight:500;">/ 월 ${annual ? "(연 ₩144,000)" : ""}</span></div>
                    <ul class="plan-list">
                      <li>✓ <strong style="color:#fff;">모든 광고 완전 제거 (Ad-Free)</strong></li>
                      <li>✓ BLACK 독점 영상 &amp; 1BWS 확장 컷 무제한</li>
                      <li>✓ Our Reports 전문(Full Text) + 인포그래픽 전체</li>
                      <li>✓ 12/3 스티븐 레비 등 인터뷰 사전 질문 · 파트너 제휴 혜택 · 살롱 선예매</li>
                    </ul>
                  </div>
                  <button class="btn-primary-orange" style="padding:11px;" data-action="activate-black">BLACK 체험 즉시 활성화 →</button>
                </div>
              </div>
            ` : `
              <div class="plan-card featured" style="margin-top:14px;">
                <div>
                  <span class="black-pill">B2B CORPORATE · 10 SEATS+</span>
                  <h3 style="font-size:19px;font-weight:800;margin-top:6px;">기업 · 임직원 팀 라이선스</h3>
                  <p class="card-desc" style="margin:6px 0 12px;">전략기획실·리서치팀·해외사업부 등 10석 이상 단체 구독 시 <strong>전자세금계산서 발행</strong> 및 임직원 전용 <strong>일괄 등록 코드</strong>를 발급해 드립니다.</p>
                  <ul class="plan-list" style="margin-bottom:14px;">
                    <li>✓ 전 임직원 1BWS BLACK 풀 액세스 (월 ₩11,000/석~ · 볼륨 할인)</li>
                    <li>✓ 2027 반얀트리 서울 비공개 포럼 VIP 좌석 우선 배정 협의</li>
                  </ul>
                  ${state.b2bSubmitted ? `
                    <div style="padding:12px;border-radius:8px;background:var(--emerald-soft);border:1px solid var(--emerald);color:var(--emerald);font-size:13px;font-weight:700;">
                      ✓ 기업 구독 견적 요청이 접수되었습니다. (데모: 아래 버튼으로 팀 시트 체험 가능)
                    </div>
                  ` : `
                    <form class="q-form" data-action="submit-b2b">
                      <div class="grid-2" style="gap:10px;">
                        <input class="q-input" name="company" placeholder="기업명 / 부서" required />
                        <input class="q-input" name="email" type="email" placeholder="업무용 이메일" required />
                      </div>
                      <button type="submit" class="btn-primary-orange" style="padding:10px;">세금계산서 · 단체 견적 요청하기</button>
                    </form>
                  `}
                </div>
              </div>
            `}

            <p style="font-size:11.5px;color:var(--ink-muted);margin-top:14px;text-align:center;">
              웹 정기결제 (국내외 카드 · 간편결제 지원) · 모바일 앱 출시 시 동일 계정 자동 연동
            </p>
          </div>
        </div>
      `;
    }

    if (state.modal === "qr") {
      return `
        <div class="modal-backdrop" data-action="backdrop-close">
          <div class="modal-card" style="max-width:520px;">
            <div class="modal-head">
              <div>
                <span class="live-tag">DYNAMIC QR &amp; CODE REDEEM</span>
                <h2 style="font-size:19px;font-weight:800;margin-top:3px;">단행본 QR · B2B 시트 코드 등록</h2>
              </div>
              <button class="modal-close" data-action="close-modal">✕</button>
            </div>
            <p class="card-desc">2026 단행본 내지에 수록된 QR 코드(<code>onebigworldshow.com/b/...</code>) 또는 기업 단체 코드를 입력해 <strong>1BWS BLACK</strong> 권한을 즉시 활성화합니다.</p>
            <div class="qr-chips">
              <button class="qr-chip" data-action="fill-qr" data-code="BOOK2026">BOOK2026 (단행본 독자 1개월)</button>
              <button class="qr-chip" data-action="fill-qr" data-code="B2BTEAM">B2BTEAM (기업 시트 코드)</button>
            </div>
            <form class="q-form" data-action="redeem-qr">
              <input class="q-input" id="qr-code-input" name="code" value="${esc(state.qrInput)}" placeholder="코드 입력 (예: BOOK2026)" required />
              <button type="submit" class="btn-primary-emerald" style="padding:11px;">코드 적용 및 BLACK 활성화</button>
            </form>
          </div>
        </div>
      `;
    }
    return "";
  }

  function renderToast() {
    const root = document.getElementById("toast-root");
    if (!root) return;
    root.innerHTML = state.toast ? `<div class="toast">${esc(state.toast)}</div>` : "";
  }

  function render() {
    const views = {
      home: renderHome,
      morning: renderMorningReport,
      videos: renderVideos,
      reports: renderReports,
      news: renderNews,
      perks: renderPerks,
      store: renderStore,
      profile: renderProfile
    };
    const app = document.getElementById("app");
    app.innerHTML = `
      ${renderHeader()}
      <main class="main-wrap">${(views[state.activeTab] || renderHome)()}</main>
      <footer class="site-footer">
        <div class="footer-inner">
          <div style="display:flex;align-items:center;gap:10px;">
            <img src="./assets/logos/1bws_logo_text_white.svg" style="height:16px;opacity:0.85;" alt="1BWS" />
            <span>© 2026 타일러 미디어 (Tyler Media) · onebigworldshow.com</span>
          </div>
          <span>Contact: <a href="mailto:request@tylerrasch.com" style="color:#CBD5E1;text-decoration:underline;">request@tylerrasch.com</a></span>
        </div>
      </footer>
    `;
    document.getElementById("modal-root").innerHTML = renderModal();
    renderToast();
  }

  function startAudioLoop() {
    clearInterval(audioTimer);
    if (!state.audioPlaying) return;
    audioTimer = setInterval(() => {
      state.audioProgress = state.audioProgress >= 100 ? 0 : state.audioProgress + 2;
      const fill = document.querySelector(".progress-fill");
      if (fill) fill.style.width = `${state.audioProgress}%`;
    }, 500);
  }

  document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;

    if (action === "switch-tab") {
      state.activeTab = target.dataset.tab;
      window.scrollTo({ top: 0, behavior: "smooth" });
      render();
    } else if (action === "switch-tier") {
      state.tier = target.dataset.tier;
      showToast(state.tier === "black" ? "1BWS BLACK 유료 모드가 활성화되었습니다 (광고 제거 · 전문 잠금해제)" : "FREE 무료 모드로 전환되었습니다");
      render();
    } else if (action === "switch-tier-close") {
      state.tier = target.dataset.tier;
      state.modal = null;
      render();
    } else if (action === "switch-cadence") {
      state.briefingCadence = target.dataset.cadence;
      render();
    } else if (action === "toggle-audio") {
      state.audioPlaying = !state.audioPlaying;
      startAudioLoop();
      render();
    } else if (action === "open-video") {
      state.selectedVideoId = target.dataset.id;
      state.videoCut = "main";
      state.activeTab = "videos";
      window.scrollTo({ top: 0, behavior: "smooth" });
      render();
    } else if (action === "filter-videos") {
      state.videoFilter = target.dataset.filter;
      render();
    } else if (action === "toggle-video-cut") {
      state.videoCut = target.dataset.cut;
      render();
    } else if (action === "switch-sidebar-tab") {
      state.sidebarTab = target.dataset.tab;
      render();
    } else if (action === "upvote-question") {
      const id = Number(target.dataset.id);
      const q = state.submittedQuestions.find(x => x.id === id);
      if (q) {
        q.liked = !q.liked;
        q.votes += q.liked ? 1 : -1;
        render();
      }
    } else if (action === "open-report") {
      state.selectedReportId = target.dataset.id;
      state.activeTab = "reports";
      window.scrollTo({ top: 0, behavior: "smooth" });
      render();
    } else if (action === "select-report") {
      state.selectedReportId = target.dataset.id;
      render();
    } else if (action === "toggle-save") {
      const id = target.dataset.id;
      if (state.savedIds.includes(id)) {
        state.savedIds = state.savedIds.filter(x => x !== id);
        showToast("저장이 해제되었습니다");
      } else {
        state.savedIds.push(id);
        showToast("내 프로필에 리포트가 저장되었습니다");
      }
      render();
    } else if (action === "vote-survey") {
      state.surveyVoted = target.dataset.id;
      showToast("투표가 반영되었습니다. 제작 기획에 참고하겠습니다!");
      render();
    } else if (action === "claim-perk") {
      state.claimedPerks.push(target.dataset.id);
      showToast("BLACK 전용 쿠폰 코드가 발급되었습니다!");
      render();
    } else if (action === "add-cart") {
      state.cartCount += 1;
      showToast(`장바구니에 담았습니다: ${target.dataset.title}`);
      render();
    } else if (action === "toggle-topic") {
      const t = target.dataset.topic;
      if (state.userTopics.includes(t)) {
        state.userTopics = state.userTopics.filter(x => x !== t);
      } else {
        state.userTopics.push(t);
      }
      showToast("맞춤 추천 피드에 관심 주제가 반영되었습니다");
      render();
    } else if (action === "open-modal") {
      state.modal = target.dataset.modal;
      render();
    } else if (action === "close-modal") {
      state.modal = null;
      render();
    } else if (action === "backdrop-close") {
      if (e.target.classList.contains("modal-backdrop")) {
        state.modal = null;
        render();
      }
    } else if (action === "switch-buyer") {
      state.pricingBuyer = target.dataset.buyer;
      render();
    } else if (action === "switch-cycle") {
      state.pricingCycle = target.dataset.cycle;
      render();
    } else if (action === "activate-black") {
      state.tier = "black";
      state.modal = null;
      showToast("🎉 1BWS BLACK 체험이 활성화되었습니다!");
      render();
    } else if (action === "fill-qr") {
      state.qrInput = target.dataset.code;
      const inp = document.getElementById("qr-code-input");
      if (inp) inp.value = state.qrInput;
    } else if (action === "copy-text") {
      navigator.clipboard?.writeText(target.dataset.text).catch(() => {});
      showToast(`클립보드에 복사되었습니다: ${target.dataset.text}`);
    } else if (action === "cancel-confirm") {
      showToast("데모 안내: 실제 서비스에서는 위약금 없이 1클릭 즉시 해지가 지원됩니다.");
    }
  });

  document.addEventListener("submit", (e) => {
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
    const action = form.dataset.action;
    if (!action) return;
    e.preventDefault();

    if (action === "submit-question") {
      const val = new FormData(form).get("question")?.toString().trim();
      if (val) {
        state.myQuestions.unshift({ id: Date.now(), text: val });
        showToast("✓ 12/3 스티븐 레비 인터뷰 질문이 제작진에게 비공개로 접수되었습니다!");
        render();
      }
    } else if (action === "redeem-qr") {
      const code = new FormData(form).get("code")?.toString().trim().toUpperCase();
      state.tier = "black";
      state.modal = null;
      state.qrInput = "";
      showToast(`✓ 코드 [${code}] 적용 완료 — 1BWS BLACK이 활성화되었습니다!`);
      render();
    } else if (action === "submit-b2b") {
      state.b2bSubmitted = true;
      showToast("기업 단체 구독 문의가 접수되었습니다!");
      render();
    }
  });

  render();
})();
