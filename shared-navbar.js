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
      gap: 20px !important;
      font-size: 14px !important;
      font-weight: 800 !important;
    }
    .mook-nav a {
      color: #24312E !important;
      position: relative !important;
      transition: color 0.2s ease !important;
      text-decoration: none !important;
    }
    .mook-nav a:hover {
      color: #C96D45 !important;
    }
    .nav-courses-link {
      color: #C96D45 !important;
      font-weight: 900 !important;
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
      .mook-nav {
        display: none !important;
      }
      .mobile-header-actions {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
      }
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
   * 根據配置產生完整導覽列 HTML
   */
  function generateNavbarHTML(opts) {
    opts = opts || {};

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
    const navLinks = opts.navLinks || [
      { text: '← 返回課程總覽', href: './courses.html', className: 'nav-courses-link' },
      { text: '探究式理解', href: '#inquiry' },
      { text: '常規堅持', href: '#pillars' },
      { text: '年級分流', href: '#grades' },
      { text: '一日作息', href: '#routine' },
      { text: '接送學區', href: '#escort' }
    ];

    let navItemsHtml = '';
    navLinks.forEach(function (l) {
      const cls = l.className ? ` class="${l.className}"` : '';
      navItemsHtml += `<a href="${l.href}"${cls}>${l.text}</a>\n`;
    });

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
        <a class="mobile-cta-btn" href="${mobileActions.bookingHref}" target="_blank" rel="noopener noreferrer">
          ${mobileActions.bookingText}
        </a>
        <button class="mobile-menu-btn" type="button" id="${mobileActions.menuId}" aria-label="展開導覽目錄">
          ${mobileActions.menuText}
        </button>
      </div>
    </header>`;

    return topNoticeHtml + headerHtml;
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
