/**
 * 尚學文教 (SangSueh Education) - 官方全站共用旗艦導覽列模組 (Universal Shared NavBar)
 * 供 index.html, courses.html, course-*.html, summer-2026.html 等所有頁面統一調用。
 *
 * 使用方式：
 * 1. 在頁面頂部放置容器：<div id="site-navbar-container"></div> 或保留 <header class="mook-header">...</header>
 * 2. 引入本腳本：<script src="./shared-navbar.js"></script>
 * 3. 亦可隨時手動調用：window.renderSangSuehNavbar(targetSelector, options)
 * 4. 或透過 MookUI 調用：MookUI.navbar(options, container)
 */
(function (global) {
  'use strict';

  const NAVBAR_CSS = `
    /* ========================================================
       尚學文教官方品牌旗艦導覽列 (SangSueh Official Universal NavBar)
       ======================================================== */
    .top-mook-bar {
      background: #24312E !important;
      color: #FFF !important;
      padding: 9px 16px !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      text-align: center !important;
      letter-spacing: 0.04em !important;
      border-bottom: 2px solid #E8C968 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Noto Sans TC", sans-serif !important;
    }
    .top-mook-bar a {
      color: #E8C968 !important;
      text-decoration: underline !important;
      margin-left: 6px !important;
      font-weight: 800 !important;
      transition: color 0.2s ease !important;
    }
    .top-mook-bar a:hover {
      color: #FFF !important;
    }

    .mook-header {
      background: rgba(247, 242, 232, 0.95) !important;
      -webkit-backdrop-filter: blur(10px) !important;
      backdrop-filter: blur(10px) !important;
      border-bottom: 1px solid rgba(36, 49, 46, 0.16) !important;
      position: sticky !important;
      top: 0 !important;
      z-index: 99 !important;
      padding: 0 clamp(16px, 5vw, 60px) !important;
      height: 70px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      font-family: -apple-system, BlinkMacSystemFont, "Noto Sans TC", sans-serif !important;
      box-sizing: border-box !important;
    }
    .mook-brand {
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
      text-decoration: none !important;
    }
    .mook-brand-logo {
      height: 48px !important;
      max-height: 48px !important;
      width: auto !important;
      object-fit: contain !important;
      display: block !important;
    }
    .mook-nav {
      display: flex !important;
      align-items: center !important;
      gap: 14px !important;
      font-size: 14px !important;
      font-weight: 850 !important;
    }
    .mook-nav > a {
      color: #24312E !important;
      position: relative !important;
      transition: color 0.2s ease !important;
      text-decoration: none !important;
      padding: 6px 4px !important;
      display: inline-flex !important;
      align-items: center !important;
      white-space: nowrap !important;
    }
    .mook-nav > a:hover {
      color: #C96D45 !important;
    }
    .nav-courses-link {
      color: #C96D45 !important;
      font-weight: 900 !important;
    }

    /* 桌面版「課程學程 ▾」懸停下拉選單 */
    .mook-dropdown-container {
      position: relative !important;
      display: inline-flex !important;
      align-items: center !important;
      height: 100% !important;
    }
    .mook-dropdown-trigger {
      color: #24312E !important;
      text-decoration: none !important;
      cursor: pointer !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 4px !important;
      padding: 6px 10px !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      font-weight: 850 !important;
      transition: all 0.2s ease !important;
      white-space: nowrap !important;
      border: 1px solid transparent !important;
    }
    .mook-dropdown-container:hover .mook-dropdown-trigger,
    .mook-dropdown-trigger:hover,
    .mook-dropdown-container.is-active .mook-dropdown-trigger {
      color: #C96D45 !important;
      background: rgba(201, 109, 69, 0.08) !important;
      border-color: rgba(201, 109, 69, 0.25) !important;
    }
    .dropdown-caret {
      font-size: 10px !important;
      transition: transform 0.25s ease !important;
      display: inline-block !important;
    }
    .mook-dropdown-container:hover .dropdown-caret,
    .mook-dropdown-container.is-active .dropdown-caret {
      transform: rotate(180deg) !important;
    }

    /* 下拉面板 */
    .mook-dropdown-menu {
      position: absolute !important;
      top: calc(100% + 12px) !important;
      left: 50% !important;
      transform: translateX(-50%) translateY(8px) !important;
      background: #FFFDF8 !important;
      border: 1.5px solid #24312E !important;
      border-radius: 16px !important;
      box-shadow: 0 18px 45px rgba(36, 49, 46, 0.18) !important;
      width: 760px !important;
      max-width: 90vw !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
      transition: opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.22s !important;
      z-index: 1000 !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
    }
    .mook-dropdown-container:hover .mook-dropdown-menu,
    .mook-dropdown-container:focus-within .mook-dropdown-menu,
    .mook-dropdown-container.is-active .mook-dropdown-menu {
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
      transform: translateX(-50%) translateY(0) !important;
    }
    /* 懸停安全區 (橋接空隙) */
    .mook-dropdown-menu::before {
      content: '' !important;
      position: absolute !important;
      top: -16px !important;
      left: 0 !important;
      right: 0 !important;
      height: 16px !important;
      background: transparent !important;
    }

    /* 下拉選單內部 3 欄式排版 */
    .dropdown-menu-inner {
      display: grid !important;
      grid-template-columns: 210px 210px 1fr !important;
      gap: 16px !important;
      padding: 18px 20px 14px 20px !important;
      background: #FFFDF8 !important;
      box-sizing: border-box !important;
    }
    .dropdown-col {
      display: flex !important;
      flex-direction: column !important;
      gap: 8px !important;
    }
    .dropdown-col-header {
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
      padding-bottom: 6px !important;
      border-bottom: 1.5px solid rgba(36, 49, 46, 0.12) !important;
      font-size: 13.5px !important;
      font-weight: 900 !important;
      color: #477B65 !important;
      letter-spacing: 0.02em !important;
    }
    .dropdown-col-header .dropdown-icon {
      font-size: 15px !important;
    }
    .dropdown-item {
      display: flex !important;
      flex-direction: column !important;
      gap: 2px !important;
      padding: 8px 10px !important;
      border-radius: 9px !important;
      text-decoration: none !important;
      transition: all 0.18s ease !important;
      background: #FFF !important;
      border: 1px solid rgba(36, 49, 46, 0.09) !important;
      box-sizing: border-box !important;
    }
    .dropdown-item:hover {
      background: #F7F2E8 !important;
      border-color: #C96D45 !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 3px 8px rgba(36, 49, 46, 0.06) !important;
    }
    .dropdown-item-title {
      font-size: 13px !important;
      font-weight: 850 !important;
      color: #24312E !important;
      line-height: 1.3 !important;
    }
    .dropdown-item:hover .dropdown-item-title {
      color: #C96D45 !important;
    }
    .dropdown-item-desc {
      font-size: 11px !important;
      font-weight: 500 !important;
      color: #63716D !important;
      line-height: 1.3 !important;
    }
    .dropdown-english-list {
      display: flex !important;
      flex-direction: column !important;
      gap: 6px !important;
    }

    /* 下拉面板底部快捷列 */
    .dropdown-menu-footer {
      background: #F7F2E8 !important;
      border-top: 1px solid rgba(36, 49, 46, 0.12) !important;
      padding: 10px 20px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      box-sizing: border-box !important;
    }
    .dropdown-footer-link {
      font-size: 12.5px !important;
      font-weight: 850 !important;
      color: #477B65 !important;
      text-decoration: none !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 6px !important;
      transition: color 0.2s ease !important;
    }
    .dropdown-footer-link:hover {
      color: #C96D45 !important;
    }
    .dropdown-footer-tag {
      font-size: 11px !important;
      font-weight: 700 !important;
      color: #71817D !important;
    }
    .btn-mook-summer {
      background: #EBF2EC !important;
      color: #477B65 !important;
      border: 1px dashed #477B65 !important;
      padding: 6px 14px !important;
      border-radius: 999px !important;
      font-size: 13px !important;
      font-weight: 800 !important;
      transition: all 0.2s ease !important;
      text-decoration: none !important;
      white-space: nowrap !important;
    }
    .btn-mook-summer:hover {
      background: #477B65 !important;
      color: #FFF !important;
    }
    .btn-mook-booking {
      background: #C96D45 !important;
      color: #FFF !important;
      padding: 9px 20px !important;
      border-radius: 8px !important;
      box-shadow: 3px 3px 0 #E8C968 !important;
      font-weight: 900 !important;
      transition: transform 0.2s ease, box-shadow 0.2s ease !important;
      text-decoration: none !important;
      white-space: nowrap !important;
    }
    .btn-mook-booking:hover {
      transform: translate(-1px, -1px) !important;
      box-shadow: 4px 4px 0 #E8C968 !important;
    }

    /* 手機版頂部 Header 快捷按鈕 */
    .mobile-header-actions {
      display: none !important;
    }
    .mobile-cta-btn {
      background: #C96D45 !important;
      color: #FFF !important;
      font-size: 12.5px !important;
      font-weight: 850 !important;
      padding: 6px 12px !important;
      border-radius: 999px !important;
      text-decoration: none !important;
      box-shadow: 0 2px 6px rgba(201, 109, 69, 0.3) !important;
      white-space: nowrap !important;
    }
    .mobile-menu-btn {
      background: #24312E !important;
      color: #FFF !important;
      border: 0 !important;
      font-size: 12px !important;
      font-weight: 850 !important;
      padding: 6px 12px !important;
      border-radius: 999px !important;
      display: flex !important;
      align-items: center !important;
      gap: 5px !important;
      cursor: pointer !important;
      white-space: nowrap !important;
    }

    @media (max-width: 900px) {
      .mook-header {
        height: 54px !important;
        padding: 0 14px !important;
      }
      .mook-brand-logo {
        height: 30px !important;
        max-height: 30px !important;
        width: auto !important;
      }
      .mook-nav {
        display: none !important;
      }
      .mobile-header-actions {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        flex-shrink: 0 !important;
      }
      .mobile-menu-btn {
        background: #24312E !important;
        color: #FFF !important;
        border: 0 !important;
        font-size: 12.5px !important;
        font-weight: 850 !important;
        padding: 6px 13px !important;
        border-radius: 999px !important;
        display: flex !important;
        align-items: center !important;
        gap: 5px !important;
        cursor: pointer !important;
        white-space: nowrap !important;
        box-shadow: 2px 2px 0 rgba(36,49,46,0.15) !important;
      }
      .mobile-cta-btn {
        background: #C96D45 !important;
        color: #FFF !important;
        font-size: 12px !important;
        font-weight: 850 !important;
        padding: 6px 11px !important;
        border-radius: 999px !important;
        text-decoration: none !important;
        box-shadow: 0 2px 6px rgba(201, 109, 69, 0.3) !important;
        white-space: nowrap !important;
      }
    }
    @media (max-width: 480px) {
      .top-mook-bar {
        font-size: 11.5px !important;
        padding: 6px 10px !important;
      }
      .mook-header {
        padding: 0 12px !important;
      }
      .mook-brand-logo {
        height: 34px !important;
      }
      .mobile-cta-btn {
        display: none !important; /* 在極小手機寬度隱藏頂部預約按鈕，確保目錄鈕完整顯眼不被擠壓，下方已有常駐吸底預約列 */
      }
    }

    /* ========================================================
       手機版抽屜式目錄 (支援 40% / 70% 雙視窗與自由手勢拖曳)
       ======================================================== */
    .mobile-drawer-overlay {
      position: fixed !important;
      inset: 0 !important;
      background: rgba(0, 0, 0, 0.65) !important;
      z-index: 999999 !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-end !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
      transition: opacity 0.25s ease, visibility 0.25s ease !important;
    }
    .mobile-drawer-overlay.active {
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
    }
    .mobile-drawer {
      width: 100% !important;
      background: #FFFDF8 !important;
      border-radius: 24px 24px 0 0 !important;
      height: 40vh;
      min-height: 180px !important;
      max-height: 75vh !important;
      display: flex !important;
      flex-direction: column !important;
      transform: translateY(100%) !important;
      transition: transform 0.28s cubic-bezier(0.2, 0.9, 0.3, 1), height 0.28s cubic-bezier(0.2, 0.9, 0.3, 1);
      box-shadow: 0 -10px 40px rgba(0,0,0,0.3) !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
      touch-action: pan-y !important;
    }
    .mobile-drawer-overlay.active .mobile-drawer {
      transform: translateY(0) !important;
    }
    .mobile-drawer.snap-40 {
      height: 40vh;
    }
    .mobile-drawer.snap-70,
    .mobile-drawer.expanded {
      height: 70vh;
    }
    .drawer-drag-pill {
      width: 44px !important;
      height: 5px !important;
      background: #D8D2C5 !important;
      border-radius: 999px !important;
      margin: 10px auto 4px !important;
      cursor: grab !important;
      flex-shrink: 0 !important;
      transition: background 0.2s, width 0.2s !important;
      touch-action: none !important;
    }
    .drawer-drag-pill:active {
      cursor: grabbing !important;
      background: #C96D45 !important;
      width: 52px !important;
    }
    .drawer-drag-pill:hover,
    .mobile-drawer.expanded .drawer-drag-pill,
    .mobile-drawer.snap-70 .drawer-drag-pill {
      background: #C96D45 !important;
    }

    /* 抽屜內部排版與元件樣式 */
    .drawer-header {
      padding: 12px 18px !important;
      border-bottom: 1.5px solid rgba(36, 49, 46, 0.1) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      flex-shrink: 0 !important;
      background: #FFFDF8 !important;
    }
    .drawer-title {
      font-size: 15px !important;
      font-weight: 900 !important;
      color: #24312E !important;
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
    }
    .drawer-close {
      background: rgba(36, 49, 46, 0.08) !important;
      border: 0 !important;
      width: 36px !important;
      height: 36px !important;
      border-radius: 50% !important;
      font-size: 16px !important;
      font-weight: 850 !important;
      color: #24312E !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: background 0.2s ease, transform 0.2s ease !important;
      touch-action: manipulation !important;
      -webkit-tap-highlight-color: transparent !important;
      z-index: 10 !important;
    }
    .drawer-close:hover {
      background: rgba(201, 109, 69, 0.2) !important;
      color: #C96D45 !important;
      transform: scale(1.05) !important;
    }
    .drawer-content {
      padding: 14px 18px 36px !important;
      overflow-y: auto !important;
      -webkit-overflow-scrolling: touch !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 16px !important;
      background: #FFFDF8 !important;
    }
    .drawer-group {
      display: flex !important;
      flex-direction: column !important;
      gap: 6px !important;
    }
    .drawer-group-title {
      font-size: 12px !important;
      font-weight: 900 !important;
      color: #477B65 !important;
      letter-spacing: 0.04em !important;
      padding-bottom: 5px !important;
      border-bottom: 1.5px dashed rgba(71, 123, 101, 0.3) !important;
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
      margin-bottom: 4px !important;
    }
    .drawer-link {
      display: flex !important;
      flex-direction: row !important;
      align-items: flex-start !important;
      gap: 12px !important;
      padding: 10px 12px !important;
      border-radius: 12px !important;
      text-decoration: none !important;
      color: #24312E !important;
      background: #FFF !important;
      border: 1px solid rgba(36, 49, 46, 0.08) !important;
      transition: all 0.18s ease !important;
      box-sizing: border-box !important;
    }
    .drawer-link:hover, .drawer-link:active {
      background: #F7F2E8 !important;
      border-color: #C96D45 !important;
      transform: translateX(2px) !important;
      box-shadow: 0 2px 8px rgba(36, 49, 46, 0.06) !important;
    }
    .drawer-link-icon {
      flex-shrink: 0 !important;
      width: 28px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding-top: 1px !important;
    }
    .drawer-link-icon .d-emoji {
      font-size: 16px !important;
      line-height: 1 !important;
      display: inline-block !important;
    }
    .drawer-link-icon .d-badge {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-size: 11px !important;
      font-weight: 850 !important;
      background: rgba(201, 109, 69, 0.1) !important;
      color: #C96D45 !important;
      border: 1px solid rgba(201, 109, 69, 0.28) !important;
      padding: 2px 6px !important;
      border-radius: 6px !important;
      line-height: 1.2 !important;
      letter-spacing: 0.02em !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: all 0.18s ease !important;
    }
    .drawer-link:hover .d-badge {
      background: #C96D45 !important;
      color: #FFF !important;
      border-color: #C96D45 !important;
    }
    .drawer-link-body {
      display: flex !important;
      flex-direction: column !important;
      gap: 3px !important;
      flex: 1 !important;
      min-width: 0 !important;
    }
    .drawer-link-body .d-name {
      font-size: 13.5px !important;
      font-weight: 850 !important;
      color: #24312E !important;
      line-height: 1.3 !important;
    }
    .drawer-link:hover .drawer-link-body .d-name {
      color: #C96D45 !important;
    }
    .drawer-link-body .d-sub {
      font-size: 11px !important;
      color: #63716D !important;
      font-weight: 500 !important;
      line-height: 1.3 !important;
    }
    .drawer-link.drawer-cta-link {
      border: 1.5px solid #C96D45 !important;
      background: rgba(201, 109, 69, 0.05) !important;
    }
    .drawer-link.drawer-cta-link .d-badge-cta {
      background: rgba(201, 109, 69, 0.15) !important;
      border-color: #C96D45 !important;
      font-size: 14px !important;
      padding: 1px 4px !important;
    }
    .drawer-link.drawer-cta-link .d-name {
      color: #C96D45 !important;
    }
  `;

  function injectStyles() {
    if (!document.getElementById('sangsueh-universal-navbar-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'sangsueh-universal-navbar-styles';
      styleEl.textContent = NAVBAR_CSS;
      document.head.appendChild(styleEl);
    }
  }

  /**
   * 產生桌面版「課程學程 ▾」懸停下拉選單 HTML
   */
  function generateCoursesDropdownHTML() {
    return `
    <div class="mook-dropdown-container" id="mook-courses-dropdown">
      <a href="./courses.html" class="mook-dropdown-trigger" aria-haspopup="true" aria-expanded="false" title="瀏覽 7 大專項課程與總覽">
        <span>課程學程</span>
        <span class="dropdown-caret">▾</span>
      </a>
      <div class="mook-dropdown-menu" role="menu">
        <div class="dropdown-menu-inner">
          <!-- 1. 安親課輔 -->
          <div class="dropdown-col">
            <div class="dropdown-col-header">
              <span class="dropdown-icon">🎒</span>
              <span class="dropdown-col-title">安親課輔</span>
            </div>
            <a href="./course-after-school.html" class="dropdown-item">
              <div class="dropdown-item-title">國小課後安親專頁</div>
              <div class="dropdown-item-desc">PBL 探索實作 × 四大常規扎根（小一～小六）</div>
            </a>
          </div>

          <!-- 2. 珠心算 -->
          <div class="dropdown-col">
            <div class="dropdown-col-header">
              <span class="dropdown-icon">🧮</span>
              <span class="dropdown-col-title">珠心算</span>
            </div>
            <a href="./course-abacus.html" class="dropdown-item">
              <div class="dropdown-item-title">珠心算思維專頁</div>
              <div class="dropdown-item-desc">專注靜心 × 腦內投影計算（大班～國小）</div>
            </a>
          </div>

          <!-- 3. 英語全系列 -->
          <div class="dropdown-col dropdown-col-wide">
            <div class="dropdown-col-header">
              <span class="dropdown-icon">🔤</span>
              <span class="dropdown-col-title">英語全系列</span>
            </div>
            <div class="dropdown-english-list">
              <a href="./course-english-kids.html" class="dropdown-item">
                <div class="dropdown-item-title">兒童生活美語</div>
                <div class="dropdown-item-desc">社區實境任務 × 自然拼讀（國小中低年級）</div>
              </a>
              <a href="./course-english-advanced.html" class="dropdown-item">
                <div class="dropdown-item-title">進階英語素養（國中先修）</div>
                <div class="dropdown-item-desc">閱讀素養 × 銜接斷崖突破（小五～國一）</div>
              </a>
              <a href="./course-grammar.html" class="dropdown-item">
                <div class="dropdown-item-title">國中文法閱讀精進</div>
                <div class="dropdown-item-desc">心智圖文法 × 會考錯題剖析（七～九年級）</div>
              </a>
              <a href="./courses.html#c6" class="dropdown-item">
                <div class="dropdown-item-title">全民英檢 GEPT</div>
                <div class="dropdown-item-desc">初級 / 中級全真模考實戰（國高中）</div>
              </a>
              <a href="./courses.html#c7" class="dropdown-item">
                <div class="dropdown-item-title">正規多益 TOEIC</div>
                <div class="dropdown-item-desc">高階 200 題極限配速衝刺（高中/升學證照）</div>
              </a>
            </div>
          </div>
        </div>

        <div class="dropdown-menu-footer">
          <a href="./courses.html" class="dropdown-footer-link">
            <span>📚 查看完整 7 大課程總覽與詳細課表</span>
            <span class="arrow">→</span>
          </a>
          <span class="dropdown-footer-tag">專任專職師資・堅持精緻小班</span>
        </div>
      </div>
    </div>`;
  }

  /**
   * 根據配置產生完整導覽列 HTML
   */
  function generateNavbarHTML(opts) {
    opts = opts || (typeof window !== 'undefined' && window.sangSuehNavbarOptions) || {};

    // 頂部通知條
    const topNotice = opts.topNotice || {
      show: true,
      text: '💡 專注常規勝過考卷刷題・精緻小班專職專任導師・諮詢專線 (07) 364-6570',
      linkText: '預約到班健檢 →',
      linkHref: 'https://docs.google.com/forms/d/e/1FAIpQLSc1BAJFgODdtTjtbdpeRYENubrBgTyIlZJ-Ar8qF0plnQbIKA/viewform'
    };

    let topNoticeHtml = '';
    if (topNotice.show !== false) {
      topNoticeHtml = `
      <div class="top-mook-bar">
        <span>${topNotice.text}</span>
        ${topNotice.linkHref ? `<a href="${topNotice.linkHref}" target="_blank" rel="noopener noreferrer">${topNotice.linkText}</a>` : ''}
      </div>`;
    }

    // 品牌 Logo
    const brand = opts.brand || {
      logo: './shangxue-logo-transparent.png?v=20260906_v2',
      alt: '尚學文教 Logo',
      href: './index.html'
    };

    // 導覽項目列表
    let navItemsHtml = '';

    // 首頁連結
    if (opts.includeHome !== false) {
      navItemsHtml += `<a href="./index.html">尚學首頁</a>\n`;
    }

    // 關於尚學連結
    if (opts.includeAbout !== false) {
      navItemsHtml += `<a href="./about.html">關於尚學</a>\n`;
    }

    // 「課程學程 ▾」核心下拉選單
    if (opts.includeCoursesDropdown !== false) {
      navItemsHtml += generateCoursesDropdownHTML() + '\n';
    }

    // 額外特定頁面自訂連結 (如首頁錨點)
    if (opts.extraNavLinks && Array.isArray(opts.extraNavLinks)) {
      opts.extraNavLinks.forEach(function (l) {
        const cls = l.className ? ` class="${l.className}"` : '';
        navItemsHtml += `<a href="${l.href}"${cls}>${l.text}</a>\n`;
      });
    } else if (opts.navLinks && Array.isArray(opts.navLinks)) {
      // 舊版配置相容：若有自訂連結，過濾已重複的基礎項目
      opts.navLinks.forEach(function (l) {
        if (l.text.includes('課程總覽') || l.text.includes('7大學程') || (l.href && l.href.includes('courses.html')) || l.text.includes('首頁') || l.text.includes('關於尚學')) return;
        const cls = l.className ? ` class="${l.className}"` : '';
        navItemsHtml += `<a href="${l.href}"${cls}>${l.text}</a>\n`;
      });
    }

    // 右側特殊按鈕
    const summerBtn = opts.summerBtn || {
      show: true,
      text: '🍉 2026 成果誌',
      href: './summer-2026.html'
    };
    if (summerBtn.show !== false) {
      navItemsHtml += `<a class="btn-mook-summer" href="${summerBtn.href}">${summerBtn.text}</a>\n`;
    }

    const bookingBtn = opts.bookingBtn || {
      show: true,
      text: '📝 預約參觀了解',
      href: 'https://docs.google.com/forms/d/e/1FAIpQLSc1BAJFgODdtTjtbdpeRYENubrBgTyIlZJ-Ar8qF0plnQbIKA/viewform'
    };
    if (bookingBtn.show !== false) {
      navItemsHtml += `<a class="btn-mook-booking" href="${bookingBtn.href}" target="_blank" rel="noopener noreferrer">${bookingBtn.text}</a>\n`;
    }

    // 手機端快捷按鈕
    const mobileActions = opts.mobileActions || {
      bookingText: '📝 預約參觀',
      bookingHref: 'https://docs.google.com/forms/d/e/1FAIpQLSc1BAJFgODdtTjtbdpeRYENubrBgTyIlZJ-Ar8qF0plnQbIKA/viewform',
      menuText: '☰ 目錄',
      menuId: 'mobile-menu-trigger'
    };

    const headerHtml = `
    <header class="mook-header">
      <a class="mook-brand" href="${brand.href}" title="尚學文教官方首頁">
        <img class="mook-brand-logo" src="${brand.logo}" alt="${brand.alt}"/>
      </a>

      <nav class="mook-nav">
        ${navItemsHtml}
      </nav>

      <div class="mobile-header-actions">
        <button class="mobile-menu-btn" type="button" id="${mobileActions.menuId}" onclick="window.openSangSuehDrawer && window.openSangSuehDrawer(event)" aria-label="展開導覽目錄">
          <span>☰</span> <span>${mobileActions.menuText.replace('☰ ', '')}</span>
        </button>
      </div>
    </header>`;

    return topNoticeHtml + headerHtml;
  }

  // ========================================================
  // 全域抽屜控制與手勢引擎 (支援自由手勢拖曳與 40% / 70% 雙視窗停靠)
  // ========================================================

  /**
   * 自動確保頁面存在抽屜式導覽 DOM 結構，若無則動態注入
   */
  function ensureDrawerExists(options) {
    if (typeof document === 'undefined') return;

    // 清除舊有或靜態硬編碼的 drawer-overlay，確保全站統一套用最新分類與修復後的點擊行為
    const oldOverlay = document.getElementById('drawer-overlay');
    if (oldOverlay) {
      oldOverlay.remove();
    }

    const brand = (options && options.brand) || {
      logo: './shangxue-logo-transparent.png?v=20260906_v2',
      alt: '尚學文教 Logo'
    };

    const drawerWrap = document.createElement('div');
    drawerWrap.innerHTML = `
    <div class="mobile-drawer-overlay" id="drawer-overlay" aria-hidden="true">
      <div class="mobile-drawer" id="mobile-drawer">
        <div class="drawer-drag-pill" id="drawer-drag-pill" title="向上滑動或點擊展開完整目錄" onclick="window.toggleSangSuehDrawerExpanded && window.toggleSangSuehDrawerExpanded(event)"></div>
        <div class="drawer-header">
          <div class="drawer-title">
            <img src="${brand.logo}" alt="${brand.alt}" style="height: 28px; width: auto;"/>
            <span>導覽目錄</span>
          </div>
          <button class="drawer-close" type="button" id="drawer-close-btn" aria-label="關閉目錄" onclick="window.closeSangSuehDrawer && window.closeSangSuehDrawer(event)">✕</button>
        </div>
        <div class="drawer-content">
          <!-- 認識尚學 -->
          <div class="drawer-group">
            <div class="drawer-group-title">🌟 認識尚學</div>
            <a class="drawer-link" href="./index.html">
              <div class="drawer-link-icon"><span class="d-emoji">🏠</span></div>
              <div class="drawer-link-body">
                <div class="d-name">尚學官方首頁</div>
              </div>
            </a>
            <a class="drawer-link" href="./about.html">
              <div class="drawer-link-icon"><span class="d-emoji">🌿</span></div>
              <div class="drawer-link-body">
                <div class="d-name">關於尚學・辦學理念</div>
              </div>
            </a>
            <a class="drawer-link" href="./courses.html">
              <div class="drawer-link-icon"><span class="d-emoji">📚</span></div>
              <div class="drawer-link-body">
                <div class="d-name">7 大核心學程總覽</div>
              </div>
            </a>
            <a class="drawer-link" href="./summer-2026.html">
              <div class="drawer-link-icon"><span class="d-emoji">🍉</span></div>
              <div class="drawer-link-body">
                <div class="d-name">2026 暑期雙月成果誌</div>
              </div>
            </a>
          </div>

          <!-- 安親課輔 -->
          <div class="drawer-group">
            <div class="drawer-group-title">🎒 安親課輔</div>
            <a class="drawer-link" href="./course-after-school.html">
              <div class="drawer-link-icon"><span class="d-badge">01</span></div>
              <div class="drawer-link-body">
                <div class="d-name">國小課後安親專頁</div>
                <div class="d-sub">PBL 探索實作 × 四大常規扎根（小一～小六）</div>
              </div>
            </a>
          </div>

          <!-- 珠心算 -->
          <div class="drawer-group">
            <div class="drawer-group-title">🧮 珠心算</div>
            <a class="drawer-link" href="./course-abacus.html">
              <div class="drawer-link-icon"><span class="d-badge">02</span></div>
              <div class="drawer-link-body">
                <div class="d-name">珠心算思維專頁</div>
                <div class="d-sub">專注靜心 × 腦內投影計算（大班～國小）</div>
              </div>
            </a>
          </div>

          <!-- 英語全系列 -->
          <div class="drawer-group">
            <div class="drawer-group-title">🔤 英語全系列</div>
            <a class="drawer-link" href="./course-english-kids.html">
              <div class="drawer-link-icon"><span class="d-badge">03</span></div>
              <div class="drawer-link-body">
                <div class="d-name">兒童生活美語</div>
                <div class="d-sub">社區實境任務 × 自然拼讀（國小中低年級）</div>
              </div>
            </a>
            <a class="drawer-link" href="./course-english-advanced.html">
              <div class="drawer-link-icon"><span class="d-badge">04</span></div>
              <div class="drawer-link-body">
                <div class="d-name">進階英語素養（國中先修）</div>
                <div class="d-sub">閱讀素養 × 銜接斷崖突破（小五～國一）</div>
              </div>
            </a>
            <a class="drawer-link" href="./course-grammar.html">
              <div class="drawer-link-icon"><span class="d-badge">05</span></div>
              <div class="drawer-link-body">
                <div class="d-name">國中文法閱讀精進</div>
                <div class="d-sub">心智圖文法 × 會考錯題剖析（七～九年級）</div>
              </div>
            </a>
            <a class="drawer-link" href="./courses.html#c6">
              <div class="drawer-link-icon"><span class="d-badge">06</span></div>
              <div class="drawer-link-body">
                <div class="d-name">全民英檢 GEPT</div>
                <div class="d-sub">初級 / 中級全真模考實戰（國高中）</div>
              </div>
            </a>
            <a class="drawer-link" href="./courses.html#c7">
              <div class="drawer-link-icon"><span class="d-badge">07</span></div>
              <div class="drawer-link-body">
                <div class="d-name">正規多益 TOEIC</div>
                <div class="d-sub">高階 200 題極限配速衝刺（高中/升學證照）</div>
              </div>
            </a>
          </div>

          <!-- 預約與諮詢 -->
          <div class="drawer-group">
            <div class="drawer-group-title">📞 預約與諮詢</div>
            <a class="drawer-link drawer-cta-link" href="https://docs.google.com/forms/d/e/1FAIpQLSc1BAJFgODdtTjtbdpeRYENubrBgTyIlZJ-Ar8qF0plnQbIKA/viewform" target="_blank" rel="noopener noreferrer">
              <div class="drawer-link-icon"><span class="d-badge d-badge-cta">📝</span></div>
              <div class="drawer-link-body">
                <div class="d-name">預約到班學力診斷與試聽</div>
                <div class="d-sub">精緻專屬小班制・即早預約保留席位</div>
              </div>
            </a>
            <a class="drawer-link" href="tel:073646570" style="color:#2D5846; font-weight:800;">
              <div class="drawer-link-icon"><span class="d-emoji">📞</span></div>
              <div class="drawer-link-body">
                <div class="d-name" style="color:#2D5846;">諮詢專線：(07) 364-6570</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>`;

    if (document.body) {
      document.body.appendChild(drawerWrap.firstElementChild);
      const closeBtn = document.getElementById('drawer-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
          if (e && e.preventDefault) e.preventDefault();
          if (e && e.stopPropagation) e.stopPropagation();
          global.closeSangSuehDrawer(e);
        });
        closeBtn.addEventListener('touchend', function (e) {
          if (e && e.preventDefault) e.preventDefault();
          if (e && e.stopPropagation) e.stopPropagation();
          global.closeSangSuehDrawer(e);
        });
      }
    }
  }

  global.openSangSuehDrawer = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    ensureDrawerExists();
    const overlay = document.getElementById('drawer-overlay');
    const drawer = document.getElementById('mobile-drawer') || document.querySelector('.mobile-drawer');
    if (overlay) {
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
    }
    if (drawer) {
      drawer.classList.remove('expanded', 'snap-70');
      drawer.classList.add('snap-40');
      drawer.style.transition = 'transform 0.28s cubic-bezier(0.2, 0.9, 0.3, 1), height 0.28s cubic-bezier(0.2, 0.9, 0.3, 1)';
      drawer.style.setProperty('height', '40vh', 'important');
      initDrawerGestures();
    }
    document.body.style.overflow = 'hidden';
  };

  global.closeSangSuehDrawer = function (e) {
    if (e && e.preventDefault && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    const overlay = document.getElementById('drawer-overlay');
    const drawer = document.getElementById('mobile-drawer') || document.querySelector('.mobile-drawer');
    if (overlay) {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
    }
    if (drawer) {
      drawer.classList.remove('expanded', 'snap-70');
      drawer.classList.add('snap-40');
      drawer.style.removeProperty('height');
    }
    document.body.style.overflow = '';
  };

  global.snapSangSuehDrawer = function (percent) {
    const drawer = document.getElementById('mobile-drawer') || document.querySelector('.mobile-drawer');
    if (!drawer) return;
    drawer.style.transition = 'height 0.28s cubic-bezier(0.2, 0.9, 0.3, 1), transform 0.28s cubic-bezier(0.2, 0.9, 0.3, 1)';
    drawer.classList.remove('snap-40', 'snap-70', 'expanded');
    if (percent === 70) {
      drawer.classList.add('snap-70', 'expanded');
      drawer.style.setProperty('height', '70vh', 'important');
    } else {
      drawer.classList.add('snap-40');
      drawer.style.setProperty('height', '40vh', 'important');
    }
  };

  global.toggleSangSuehDrawerExpanded = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const drawer = document.getElementById('mobile-drawer') || document.querySelector('.mobile-drawer');
    if (!drawer) return;
    if (drawer._justDragged) return; // 避免手勢放開瞬間觸發點擊事件導致狀態回彈
    const currentPct = drawer.getBoundingClientRect().height / window.innerHeight;
    if (currentPct >= 0.54) {
      global.snapSangSuehDrawer(40);
    } else {
      global.snapSangSuehDrawer(70);
    }
  };

  /**
   * 手勢拖曳引擎：支援即時 1:1 跟手滑動、邊界阻尼與 40% / 70% 雙視窗停靠
   */
  function initDrawerGestures() {
    const drawer = document.getElementById('mobile-drawer') || document.querySelector('.mobile-drawer');
    if (!drawer || drawer._gesturesInitialized) return;
    drawer._gesturesInitialized = true;

    let startY = 0;
    let startHeight = 0;
    let isDragging = false;
    let dragMode = null; // 'handle' | 'content'
    let lastY = 0;
    let lastTime = 0;
    let velocityY = 0;

    const content = drawer.querySelector('.drawer-content') || drawer;

    function onTouchStart(e) {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      const target = e.target;

      // 若使用者點擊右上角關閉按鈕，不要觸發拖曳手勢，直接放行給點擊/關閉邏輯
      if (target.closest && target.closest('#drawer-close-btn, .drawer-close')) {
        return;
      }

      const isHandle = target.closest('.drawer-drag-pill') || target.closest('.drawer-header');
      if (isHandle) {
        dragMode = 'handle';
      } else if (content && content.contains(target)) {
        dragMode = 'content';
      } else {
        dragMode = 'handle';
      }

      startY = touch.clientY;
      lastY = touch.clientY;
      lastTime = Date.now();
      startHeight = drawer.getBoundingClientRect().height;
      isDragging = false;
      velocityY = 0;
    }

    function onTouchMove(e) {
      if (dragMode === null || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const currentY = touch.clientY;
      const deltaY = currentY - startY; // > 0: 向下拉, < 0: 向上拉
      const contentScrollTop = content ? (content.scrollTop || 0) : 0;

      if (!isDragging) {
        if (dragMode === 'handle') {
          if (Math.abs(deltaY) > 10) {
            isDragging = true;
          }
        } else if (dragMode === 'content') {
          // 內容在頂部且向下拉，啟動抽屜滑動 (避免微小點擊抖動誤判為手勢拖曳)
          if (deltaY > 14 && contentScrollTop <= 0) {
            isDragging = true;
          }
          // 在 40% 視窗向上拉，啟動展開抽屜
          const currentPct = drawer.getBoundingClientRect().height / window.innerHeight;
          if (deltaY < -14 && currentPct < 0.60) {
            isDragging = true;
          }
        }
      }

      if (isDragging) {
        if (e.cancelable) e.preventDefault();

        const now = Date.now();
        const dt = now - lastTime;
        if (dt > 10) {
          velocityY = (currentY - lastY) / dt;
          lastY = currentY;
          lastTime = now;
        }

        drawer.style.transition = 'none';
        drawer.classList.remove('snap-40', 'snap-70', 'expanded');

        const vh = window.innerHeight;
        let newHeight = startHeight - deltaY;

        // 邊界阻尼手感 (16vh ~ 75vh 區間)
        const maxH = vh * 0.75;
        const minH = vh * 0.16;
        if (newHeight > maxH) {
          newHeight = maxH + (newHeight - maxH) * 0.22;
        } else if (newHeight < minH) {
          newHeight = minH - (minH - newHeight) * 0.3;
        }

        drawer.style.setProperty('height', Math.round(newHeight) + 'px', 'important');
      }
    }

    function onTouchEnd(e) {
      if (!isDragging) {
        dragMode = null;
        return;
      }
      isDragging = false;
      dragMode = null;
      drawer._justDragged = true;
      setTimeout(function () { drawer._justDragged = false; }, 260);

      const vh = window.innerHeight;
      const currentHeight = drawer.getBoundingClientRect().height;
      const currentPct = currentHeight / vh;

      drawer.style.transition = 'height 0.28s cubic-bezier(0.2, 0.9, 0.3, 1), transform 0.28s cubic-bezier(0.2, 0.9, 0.3, 1)';

      // 1. 快速向下滑甩或拉低至 22% 以下：關閉抽屜
      if (velocityY > 0.45 || currentPct < 0.22) {
        global.closeSangSuehDrawer();
        return;
      }

      // 2. 快速向上滑甩：直接吸附至 70%
      if (velocityY < -0.45) {
        global.snapSangSuehDrawer(70);
        return;
      }

      // 3. 停靠點吸附 (40% vs 70%，以 54% 為閥值)
      if (currentPct >= 0.54) {
        global.snapSangSuehDrawer(70);
      } else {
        global.snapSangSuehDrawer(40);
      }
    }

    drawer.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
  }

  // 全域委派監聽：支援所有按鈕與點擊交互
  document.addEventListener('click', function (e) {
    // 1. 桌面版 / 平板點選「課程學程」下拉選單觸發鈕支援
    const dropdownTrigger = e.target.closest('.mook-dropdown-trigger');
    if (dropdownTrigger) {
      const container = dropdownTrigger.closest('.mook-dropdown-container');
      if (container && window.innerWidth > 900) {
        if (!container.classList.contains('is-active')) {
          e.preventDefault();
          container.classList.add('is-active');
        } else {
          // 若已展開再次點擊，允許直接進入 courses.html
        }
      }
    } else {
      document.querySelectorAll('.mook-dropdown-container.is-active').forEach(function(el) {
        el.classList.remove('is-active');
      });
    }

    const trigger = e.target.closest('#mobile-menu-trigger, .mobile-menu-btn');
    if (trigger) {
      if (e && e.preventDefault) e.preventDefault();
      global.openSangSuehDrawer(e);
      return;
    }
    const closeBtn = e.target.closest('#drawer-close-btn, .drawer-close');
    if (closeBtn) {
      if (e && e.preventDefault) e.preventDefault();
      global.closeSangSuehDrawer(e);
      return;
    }
    const overlay = document.getElementById('drawer-overlay');
    if (e.target === overlay) {
      if (e && e.preventDefault) e.preventDefault();
      global.closeSangSuehDrawer(e);
      return;
    }
    const dragPill = e.target.closest('#drawer-drag-pill, .drawer-drag-pill');
    if (dragPill) {
      if (e && e.preventDefault) e.preventDefault();
      global.toggleSangSuehDrawerExpanded(e);
      return;
    }
    const link = e.target.closest('.drawer-link');
    if (link) {
      const href = link.getAttribute('href');
      // Case 1: 本頁內錨點平滑滾動
      if (href && href.startsWith('#')) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          if (e && e.preventDefault) e.preventDefault();
          global.closeSangSuehDrawer();
          const headerOffset = 80;
          const pos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: pos, behavior: 'smooth' });
          return;
        }
      }
      // Case 2: 跨頁連結、電話或表單連結：順暢關閉抽屜，絕不阻擋瀏覽器預設跳轉！
      global.closeSangSuehDrawer();
      return;
    }
  });

  // DOM 載入完成後自動初始化手勢監聽與支援網址 hash 快速預覽
  if (typeof window !== 'undefined') {
    function setupDrawer() {
      initDrawerGestures();
      if (window.location) {
        if (window.location.hash === '#open-drawer' || window.location.hash === '#drawer-40') {
          setTimeout(function() { global.openSangSuehDrawer(); }, 120);
        } else if (window.location.hash === '#open-drawer-70' || window.location.hash === '#drawer-70') {
          setTimeout(function() {
            global.openSangSuehDrawer();
            global.snapSangSuehDrawer(70);
          }, 120);
        }
      }
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupDrawer);
    } else {
      setupDrawer();
    }
  }

  /**
   * 全域通用函數：將官方導覽列注入至指定容器
   * @param {string} [targetSelector] - 選填，預設尋找 #site-navbar-container 或 header.mook-header
   * @param {Object} [options] - 選填，自訂導覽項目與按鈕
   */
  function renderNavbar(targetSelector, options) {
    injectStyles();
    const selector = targetSelector || '#site-navbar-container, header.mook-header[data-auto-mount="true"]';
    const target = document.querySelector(selector);
    const html = generateNavbarHTML(options);
    if (target) {
      target.outerHTML = html;
    }
    ensureDrawerExists(options);
    return html;
  }

  // 暴露至全域物件 (window)
  global.renderSangSuehNavbar = renderNavbar;
  global.getSangSuehNavbarHTML = generateNavbarHTML;

  // 自動化掛載
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      const container = document.getElementById('site-navbar-container');
      if (container) {
        renderNavbar('#site-navbar-container');
      }
    });
  } else {
    const container = document.getElementById('site-navbar-container');
    if (container) {
      renderNavbar('#site-navbar-container');
    }
  }

})(typeof window !== 'undefined' ? window : this);
