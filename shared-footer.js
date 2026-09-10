/**
 * 尚學文教 (SangSueh Education) - 官方全站共用旗艦頁尾模組 (Universal Shared Footer)
 * 供 index.html, courses.html, course-*.html, summer-2026.html 等所有頁面統一調用。
 *
 * 使用方式：
 * 1. 在頁面底部放置容器：<div id="site-footer-container"></div> 或保留 <footer class="site-footer">...</footer>
 * 2. 引入本腳本：<script src="./shared-footer.js"></script>
 * 3. 亦可隨時手動調用：window.renderSangSuehFooter()
 */
(function (global) {
  'use strict';

  const FOOTER_CSS = `
    /* ========================================================
       尚學文教官方品牌旗艦頁尾 (SangSueh Official Universal Footer)
       ======================================================== */
    .site-footer {
      background: #14201C !important;
      color: #E2ECE6 !important;
      padding: clamp(48px, 6vw, 80px) clamp(16px, 5vw, 60px) 36px !important;
      width: 100% !important;
      box-sizing: border-box !important;
      border-top: 3px solid #C96D45 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Noto Sans TC", "Microsoft JhengHei", sans-serif !important;
      line-height: 1.6 !important;
    }
    .footer-container {
      max-width: 1240px !important;
      margin: 0 auto !important;
      width: 100% !important;
    }
    .footer-top-grid {
      display: grid !important;
      grid-template-columns: minmax(280px, 1fr) minmax(320px, 1.4fr) !important;
      gap: clamp(36px, 6vw, 70px) !important;
      align-items: start !important;
    }
    
    /* 左側品牌資訊 (嚴格靠左對齊) */
    .footer-brand-col {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      text-align: left !important;
      gap: 16px !important;
    }
    .footer-logo-clean {
      height: 48px !important;
      max-height: 48px !important;
      width: auto !important;
      object-fit: contain !important;
      display: block !important;
      margin: 0 !important;
      padding: 0 !important;
      align-self: flex-start !important;
    }
    .footer-mission {
      display: flex !important;
      flex-direction: column !important;
      gap: 6px !important;
      margin: 0 !important;
      text-align: left !important;
      align-items: flex-start !important;
    }
    .brand-slogan-main {
      font-size: 16px !important;
      font-weight: 850 !important;
      color: #FFF !important;
      letter-spacing: 0.03em !important;
    }
    .brand-slogan-sub {
      color: #A3B8AF !important;
      font-size: 13.5px !important;
      line-height: 1.6 !important;
      margin: 0 !important;
    }
    .footer-badge {
      display: inline-block !important;
      background: rgba(232, 201, 104, 0.12) !important;
      color: #E8C968 !important;
      border: 1px solid rgba(232, 201, 104, 0.3) !important;
      padding: 7px 16px !important;
      border-radius: 999px !important;
      font-size: 12px !important;
      font-weight: 800 !important;
      letter-spacing: 0.05em !important;
      width: fit-content !important;
      margin-top: 4px !important;
    }

    /* 右側社群導航 (雙排格線、28px 真實官方 App 圖示) */
    .footer-social-col {
      display: flex !important;
      flex-direction: column !important;
      gap: 18px !important;
      text-align: left !important;
      align-items: flex-start !important;
    }
    .social-hub-title {
      font-size: 15px !important;
      font-weight: 850 !important;
      color: #FFF !important;
      letter-spacing: 0.05em !important;
      margin: 0 !important;
    }
    .social-links-clean-grid {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 14px 24px !important;
      width: 100% !important;
    }
    .social-clean-item {
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
      padding: 6px 0 !important;
      color: #E2ECE6 !important;
      text-decoration: none !important;
      background: transparent !important;
      border: none !important;
      transition: transform 0.2s ease !important;
    }
    .social-clean-item:hover {
      transform: translateX(4px) !important;
    }
    .social-app-icon {
      width: 28px !important;
      height: 28px !important;
      max-width: 28px !important;
      max-height: 28px !important;
      min-width: 28px !important;
      min-height: 28px !important;
      border-radius: 7px !important;
      object-fit: contain !important;
      flex-shrink: 0 !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25) !important;
      transition: transform 0.2s ease !important;
      display: block !important;
    }
    .social-clean-item:hover .social-app-icon {
      transform: scale(1.1) !important;
    }
    .social-clean-text {
      display: flex !important;
      flex-direction: column !important;
      gap: 2px !important;
      min-width: 0 !important;
    }
    .social-clean-text strong {
      font-size: 14px !important;
      font-weight: 800 !important;
      color: #FFF !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      transition: color 0.2s ease !important;
    }
    .social-clean-text small {
      font-size: 11.5px !important;
      color: #8BA297 !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      transition: color 0.2s ease !important;
    }
    .social-clean-item:hover .social-clean-text strong {
      color: #E8C968 !important;
    }
    .social-clean-item:hover .social-clean-text small {
      color: #D4B962 !important;
    }

    /* 頁尾底欄：接送學區與版權宣告 */
    .footer-bottom-bar {
      border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
      margin-top: clamp(36px, 5vw, 50px) !important;
      padding-top: 22px !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 8px !important;
      align-items: center !important;
      text-align: center !important;
      font-size: 12.5px !important;
      color: #83978E !important;
    }
    .footer-bottom-bar p {
      margin: 0 !important;
    }

    /* 響應式調整 */
    @media (max-width: 860px) {
      .footer-top-grid {
        grid-template-columns: 1fr !important;
        gap: 32px !important;
      }
      .social-links-clean-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
      }
    }
    @media (max-width: 520px) {
      .social-links-clean-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;

  const FOOTER_HTML = `
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-top-grid">
        <!-- 左欄：品牌資訊 -->
        <div class="footer-brand-col">
          <img class="footer-logo-clean" src="./shangxue-logo-transparent.png?v=20260906_v2" alt="尚學文教 Logo"/>
          <div class="footer-mission">
            <strong class="brand-slogan-main">開心學習・快樂成長</strong>
            <p class="brand-slogan-sub">#讓孩子今天比昨天成長以期望更好的明天💪</p>
          </div>
          <div class="footer-badge">跨領域學習 · 多元發展 · 跳脫傳統框架</div>
        </div>

        <!-- 右欄：社群與地圖 -->
        <div class="footer-social-col">
          <h3 class="social-hub-title">關注尚學文教社群 · 探索更多活動花絮與即時動態</h3>
          <div class="social-links-clean-grid">
            <a href="https://www.facebook.com/cms.edu/" target="_blank" rel="noopener" class="social-clean-item" aria-label="尚學文教 Facebook 粉絲專頁">
              <img src="./photos/icons/icon_facebook.svg" alt="Facebook" class="social-app-icon" width="28" height="28"/>
              <div class="social-clean-text">
                <strong>FB 粉絲專頁</strong>
                <small>尚學文教旗艦主頁 ↗</small>
              </div>
            </a>

            <a href="https://www.facebook.com/sunshueh.edu" target="_blank" rel="noopener" class="social-clean-item" aria-label="尚學文教 Facebook">
              <img src="./photos/icons/icon_facebook.svg" alt="Facebook" class="social-app-icon" width="28" height="28"/>
              <div class="social-clean-text">
                <strong>FB 尚學文教</strong>
                <small>日常學習與花絮 ↗</small>
              </div>
            </a>

            <a href="https://www.instagram.com/sangsueh_education/" target="_blank" rel="noopener" class="social-clean-item" aria-label="尚學文教 Instagram">
              <img src="./photos/icons/icon_instagram.svg" alt="Instagram" class="social-app-icon" width="28" height="28"/>
              <div class="social-clean-text">
                <strong>Instagram</strong>
                <small>@sangsueh_education ↗</small>
              </div>
            </a>

            <a href="https://www.threads.com/@sangsueh_education?hl=zh-tw" target="_blank" rel="noopener" class="social-clean-item" aria-label="尚學文教 Threads">
              <img src="./photos/icons/icon_threads.svg" alt="Threads" class="social-app-icon" width="28" height="28"/>
              <div class="social-clean-text">
                <strong>Threads</strong>
                <small>即時交流與教學札記 ↗</small>
              </div>
            </a>

            <a href="https://www.youtube.com/@sangsueh.education" target="_blank" rel="noopener" class="social-clean-item" aria-label="尚學文教 YouTube">
              <img src="./photos/icons/icon_youtube.svg" alt="YouTube" class="social-app-icon" width="28" height="28"/>
              <div class="social-clean-text">
                <strong>YouTube 頻道</strong>
                <small>精選活動紀錄影音 ↗</small>
              </div>
            </a>

            <a href="https://maps.app.goo.gl/XZvRkG2DrFg5kXQS6" target="_blank" rel="noopener" class="social-clean-item" aria-label="尚學文教 Google 地圖導航">
              <img src="./photos/icons/icon_googlemaps.svg" alt="Google Maps" class="social-app-icon" width="28" height="28"/>
              <div class="social-clean-text">
                <strong>Google 地圖導航</strong>
                <small>高雄楠梓旗艦教室 ↗</small>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- 頁尾底欄：接送學區與版權宣告 -->
      <div class="footer-bottom-bar">
        <div style="font-size: 13px; color: #A4B8B0; letter-spacing: 0.02em;">
          🏫 接送學區：右昌國小、莒光國小、加昌國小、屏山國小、援中國小、油廠國小
        </div>
        <p>© 2026 尚學文教 (SangSueh Education). All Rights Reserved.</p>
      </div>
    </div>
  </footer>
  `;

  function injectStyles() {
    if (!document.getElementById('sangsueh-universal-footer-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'sangsueh-universal-footer-styles';
      styleEl.textContent = FOOTER_CSS;
      document.head.appendChild(styleEl);
    }
  }

  /**
   * 全域通用函數：將官方頁尾注入至指定節點
   * @param {string} [targetSelector] - 選填，預設尋找 #site-footer-container 或 footer.site-footer
   */
  function renderFooter(targetSelector) {
    injectStyles();
    const selector = targetSelector || '#site-footer-container, footer.site-footer';
    const target = document.querySelector(selector);
    if (target) {
      target.outerHTML = FOOTER_HTML;
    }
  }

  // 暴露至全域物件 (window)
  global.renderSangSuehFooter = renderFooter;
  global.getSangSuehFooterHTML = function () { return FOOTER_HTML; };

  // 自動化掛載
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      renderFooter();
    });
  } else {
    renderFooter();
  }
})(typeof window !== 'undefined' ? window : this);
