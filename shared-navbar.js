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
  global.openSangSuehDrawer = function (e) {
    if (e && e.preventDefault) e.preventDefault();
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
    if (e && e.preventDefault) e.preventDefault();
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
          if (Math.abs(deltaY) > 4) {
            isDragging = true;
          }
        } else if (dragMode === 'content') {
          // 內容在頂部且向下拉，啟動抽屜滑動
          if (deltaY > 6 && contentScrollTop <= 0) {
            isDragging = true;
          }
          // 在 40% 視窗向上拉，啟動展開抽屜
          const currentPct = drawer.getBoundingClientRect().height / window.innerHeight;
          if (deltaY < -6 && currentPct < 0.60) {
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
    const trigger = e.target.closest('#mobile-menu-trigger, .mobile-menu-btn');
    if (trigger) {
      global.openSangSuehDrawer(e);
      return;
    }
    const closeBtn = e.target.closest('#drawer-close-btn, .drawer-close');
    if (closeBtn) {
      global.closeSangSuehDrawer(e);
      return;
    }
    const overlay = document.getElementById('drawer-overlay');
    if (e.target === overlay) {
      global.closeSangSuehDrawer(e);
      return;
    }
    const dragPill = e.target.closest('#drawer-drag-pill, .drawer-drag-pill');
    if (dragPill) {
      global.toggleSangSuehDrawerExpanded(e);
      return;
    }
    const link = e.target.closest('.drawer-link');
    if (link) {
      global.closeSangSuehDrawer(e);
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
