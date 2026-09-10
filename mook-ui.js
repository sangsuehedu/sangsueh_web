/**
 * ========================================================
 * 尚學文教 (SangSueh Education) - 日系 Mook 手帳組件庫 (MookUI)
 * 承襲官方首頁 (index.html) 100% 原始視覺 DNA
 *
 * 提供模組化函數，可供課後安親專頁、珠心算、英語等各學程詳情頁調用：
 * - MookUI.badge(options)
 * - MookUI.sectionHeader(options)
 * - MookUI.hero(options)
 * - MookUI.notebookSheets(options)
 * - MookUI.flowchartTimeline(options)
 * - MookUI.gradeTabs(options)
 * - MookUI.bundlingCards(options)
 * - MookUI.teacherNote(options)
 * - MookUI.escortBox(options)
 * - MookUI.coursesHubBanner(options)
 * - MookUI.testimonials(options)
 * - MookUI.faq(options)
 * - MookUI.bookingTicket(options)
 * - MookUI.mobileSticky(options)
 * - MookUI.drawer(options)
 * - MookUI.initTabs()
 * - MookUI.initDrawer()
 * - MookUI.initLightbox()
 * - MookUI.initSmoothScroll()
 * ========================================================
 */

(function (global) {
  'use strict';

  var MookUI = {};

  // 輔助工具：掛載至容器或回傳字串
  function mountOrReturn(html, container) {
    if (container) {
      var el = typeof container === 'string' ? document.querySelector(container) : container;
      if (el) {
        el.innerHTML = html;
      }
    }
    return html;
  }

  /**
   * 0. 旗艦導覽系統 (Universal NavBar & Top Notice Bar)
   * @param {Object} opts {
   *   topNotice: { text, linkText, linkHref, show },
   *   brand: { logo, alt, href },
   *   navLinks: [ { text, href, className } ],
   *   summerBtn: { text, href, show },
   *   bookingBtn: { text, href, show },
   *   mobileActions: { bookingText, bookingHref, menuText, menuId }
   * }
   * @param {string|HTMLElement} container (可選)
   */
  MookUI.navbar = function (opts, container) {
    if (typeof global.getSangSuehNavbarHTML === 'function') {
      return mountOrReturn(global.getSangSuehNavbarHTML(opts), container);
    }
    opts = opts || {};
    var topNotice = opts.topNotice || {
      show: true,
      text: '💡 專注常規勝過考卷刷題・精緻小班專職專任導師・諮詢專線 (07) 364-6570',
      linkText: '預約到班健檢 →',
      linkHref: 'https://docs.google.com/forms/d/e/1FAIpQLSc1BAJFgODdtTjtbdpeRYENubrBgTyIlZJ-Ar8qF0plnQbIKA/viewform'
    };

    var topNoticeHtml = '';
    if (topNotice.show !== false) {
      topNoticeHtml = '<div class="top-mook-bar">' +
        '<span>' + topNotice.text + '</span>' +
        (topNotice.linkHref ? '<a href="' + topNotice.linkHref + '" target="_blank" rel="noopener noreferrer">' + topNotice.linkText + '</a>' : '') +
      '</div>';
    }

    var brand = opts.brand || {
      logo: './shangxue-logo-transparent.png?v=20260906_v2',
      alt: '尚學文教 Logo',
      href: './index.html'
    };

    var navLinks = opts.navLinks || [
      { text: '← 返回課程總覽', href: './courses.html', className: 'nav-courses-link' },
      { text: '探究式理解', href: '#inquiry' },
      { text: '常規堅持', href: '#pillars' },
      { text: '年級分流', href: '#grades' },
      { text: '一日作息', href: '#routine' },
      { text: '接送學區', href: '#escort' }
    ];

    var navItemsHtml = '';
    navLinks.forEach(function (l) {
      var cls = l.className ? ' class="' + l.className + '"' : '';
      navItemsHtml += '<a href="' + l.href + '"' + cls + '>' + l.text + '</a>\n';
    });

    var summerBtn = opts.summerBtn || {
      show: true,
      text: '🍉 2026 成果誌',
      href: './summer-2026.html'
    };
    if (summerBtn.show !== false) {
      navItemsHtml += '<a class="btn-mook-summer" href="' + summerBtn.href + '">' + summerBtn.text + '</a>\n';
    }

    var bookingBtn = opts.bookingBtn || {
      show: true,
      text: '📝 預約參觀了解',
      href: 'https://docs.google.com/forms/d/e/1FAIpQLSc1BAJFgODdtTjtbdpeRYENubrBgTyIlZJ-Ar8qF0plnQbIKA/viewform'
    };
    if (bookingBtn.show !== false) {
      navItemsHtml += '<a class="btn-mook-booking" href="' + bookingBtn.href + '" target="_blank" rel="noopener noreferrer">' + bookingBtn.text + '</a>\n';
    }

    var mobileActions = opts.mobileActions || {
      bookingText: '📝 預約參觀',
      bookingHref: 'https://docs.google.com/forms/d/e/1FAIpQLSc1BAJFgODdtTjtbdpeRYENubrBgTyIlZJ-Ar8qF0plnQbIKA/viewform',
      menuText: '☰ 目錄',
      menuId: 'mobile-menu-trigger'
    };

    var headerHtml = '<header class="mook-header">' +
      '<a class="mook-brand" href="' + brand.href + '" title="尚學文教官方首頁">' +
        '<img class="mook-brand-logo" src="' + brand.logo + '" alt="' + brand.alt + '"/>' +
      '</a>' +
      '<nav class="mook-nav">' +
        navItemsHtml +
      '</nav>' +
      '<div class="mobile-header-actions">' +
        '<a class="mobile-cta-btn" href="' + mobileActions.bookingHref + '" target="_blank" rel="noopener noreferrer">' +
          mobileActions.bookingText +
        '</a>' +
        '<button class="mobile-menu-btn" type="button" id="' + mobileActions.menuId + '" aria-label="展開導覽目錄">' +
          mobileActions.menuText +
        '</button>' +
      '</div>' +
    '</header>';

    return mountOrReturn(topNoticeHtml + headerHtml, container);
  };

  /**
   * 1. 膠囊章標籤 (Badge Pill)
   * @param {Object} opts { icon, text, year, theme }
   */
  MookUI.badge = function (opts) {
    opts = opts || {};
    var icon = opts.icon ? '<span>' + opts.icon + '</span> ' : '';
    var text = opts.text || 'SPECIAL FEATURE';
    var year = opts.year ? ' <span class="year">• ' + opts.year + '</span>' : '';
    var customStyle = opts.style ? ' style="' + opts.style + '"' : '';
    return '<div class="mook-badge"' + customStyle + '>' + icon + '<span>' + text + '</span>' + year + '</div>';
  };

  /**
   * 2. 區塊標準標頭 (Section Header)
   * @param {Object} opts { badgeText, badgeYear, badgeIcon, title, subtitle, kicker }
   */
  MookUI.sectionHeader = function (opts) {
    opts = opts || {};
    var badgeHtml = '';
    if (opts.badgeText || opts.kicker) {
      badgeHtml = MookUI.badge({
        text: opts.badgeText || opts.kicker,
        year: opts.badgeYear,
        icon: opts.badgeIcon
      });
    }
    var titleHtml = opts.title ? '<h2 class="mook-section-title">' + opts.title + '</h2>' : '';
    var subHtml = opts.subtitle ? '<p class="mook-section-subtitle">' + opts.subtitle + '</p>' : '';

    return '<div class="mook-section-header">' + badgeHtml + titleHtml + subHtml + '</div>';
  };

  /**
   * 3. HERO 雜誌卷頭 (Hero Mook)
   * @param {Object} opts {
   *   badge: { text, year, icon },
   *   title: string,
   *   highlightText: string,
   *   subtitle: string,
   *   primaryCta: { text, href, icon },
   *   secondaryCta: { text, href, icon },
   *   stamps: [ { num, label, sub } ],
   *   polaroidMain: { img, caption, stampText, alt },
   *   polaroidSub: { img, caption, alt }
   * }
   * @param {string|HTMLElement} container (可選)
   */
  MookUI.hero = function (opts, container) {
    opts = opts || {};

    // 標題
    var titleContent = opts.title || '';
    if (opts.highlightText && titleContent.indexOf('class="highlight"') === -1) {
      titleContent = titleContent.replace(
        opts.highlightText,
        '<span class="highlight">' + opts.highlightText + '</span>'
      );
    }

    // 按鈕
    var actionsHtml = '';
    if (opts.primaryCta || opts.secondaryCta) {
      actionsHtml += '<div class="hero-mook-actions">';
      if (opts.primaryCta) {
        var pIcon = opts.primaryCta.icon ? '<span>' + opts.primaryCta.icon + '</span> ' : '';
        actionsHtml += '<a class="btn-mook-primary" href="' + (opts.primaryCta.href || '#') + '" target="_blank" rel="noopener noreferrer">' + pIcon + opts.primaryCta.text + '</a>';
      }
      if (opts.secondaryCta) {
        var sIcon = opts.secondaryCta.icon ? '<span>' + opts.secondaryCta.icon + '</span> ' : '';
        actionsHtml += '<a class="btn-mook-secondary" href="' + (opts.secondaryCta.href || '#') + '">' + sIcon + opts.secondaryCta.text + '</a>';
      }
      actionsHtml += '</div>';
    }

    // 4 印章信任列
    var stampsHtml = '';
    if (opts.stamps && opts.stamps.length > 0) {
      stampsHtml += '<div class="hero-stamps-bar">';
      opts.stamps.forEach(function (s) {
        stampsHtml += '<div class="stamp-item-card">' +
          '<div style="font-family:\'Noto Serif TC\',serif; font-size:18px; font-weight:900; color:var(--orange); line-height:1.2;">' + (s.num || '') + '</div>' +
          '<strong>' + (s.label || '') + '</strong>' +
          '<small>' + (s.sub || '') + '</small>' +
        '</div>';
      });
      stampsHtml += '</div>';
    }

    // 照片雙拼貼
    var collageHtml = '';
    if (opts.polaroidMain) {
      collageHtml += '<div class="hero-collage-wrap">';
      
      // 主拍立得
      var pMain = opts.polaroidMain;
      collageHtml += '<div class="hero-polaroid-main polaroid-card">' +
        '<div class="washi-tape washi-tape-orange" style="top:-11px; left:25px; width:75px; transform:rotate(-3deg);"></div>' +
        '<img src="' + pMain.img + '" alt="' + (pMain.alt || pMain.caption || '') + '" loading="eager"/>' +
        (pMain.caption ? '<div class="polaroid-caption">' + pMain.caption + '</div>' : '') +
        (pMain.stampText ? '<div class="vintage-stamp">' + pMain.stampText + '</div>' : '<div class="vintage-stamp">SANG SUEH<br/>SINCE 1986</div>') +
      '</div>';

      // 次拍立得 (可選)
      if (opts.polaroidSub) {
        var pSub = opts.polaroidSub;
        collageHtml += '<div class="hero-polaroid-sub polaroid-card">' +
          '<div class="washi-tape washi-tape-yellow" style="top:-10px; right:20px; width:65px; transform:rotate(2deg);"></div>' +
          '<img src="' + pSub.img + '" alt="' + (pSub.alt || pSub.caption || '') + '" loading="lazy"/>' +
          (pSub.caption ? '<div class="polaroid-caption">' + pSub.caption + '</div>' : '') +
        '</div>';
      }

      collageHtml += '</div>';
    }

    var badgeHtml = opts.badge ? MookUI.badge(opts.badge) : '';

    var html = '<section class="hero-mook">' +
      '<div class="hero-mook-grid">' +
        '<div class="hero-mook-text">' +
          badgeHtml +
          '<h1 class="hero-mook-title">' + titleContent + '</h1>' +
          (opts.subtitle ? '<p class="hero-mook-desc">' + opts.subtitle + '</p>' : '') +
          actionsHtml +
          stampsHtml +
        '</div>' +
        '<div class="hero-mook-visual">' +
          collageHtml +
        '</div>' +
      '</div>' +
    '</section>';

    return mountOrReturn(html, container);
  };

  /**
   * 4. 活頁手帳便箋網格 (Notebook Sheets Grid)
   * @param {Object} opts {
   *   header: { badgeText, badgeYear, title, subtitle },
   *   sheets: [
   *     {
   *       tapeColor: 'orange'|'green'|'yellow',
   *       problemTitle: string,
   *       problemDesc: string,
   *       solutionSeal: string,
   *       arrowText: string,
   *       solutionText: string,
   *       polaroid: { img, caption, alt }
   *     }
   *   ]
   * }
   * @param {string|HTMLElement} container
   */
  MookUI.notebookSheets = function (opts, container) {
    opts = opts || {};
    var headerHtml = opts.header ? MookUI.sectionHeader(opts.header) : '';

    var sheetsHtml = '<div class="notebook-sheets-grid">';
    (opts.sheets || []).forEach(function (s, idx) {
      var tapeClass = s.tapeColor ? 'washi-tape-' + s.tapeColor : 'washi-tape-orange';
      var tapeRotation = idx % 2 === 0 ? '-2deg' : '2deg';
      var sealText = s.solutionSeal || '深度解法';
      var arrowText = s.arrowText || '✦ 尚學引導';

      // 拍立得照片欄位
      var polaroidHtml = '';
      if (s.polaroid) {
        polaroidHtml = '<div class="sheet-polaroid polaroid-card">' +
          '<span class="paper-clip">📎</span>' +
          '<img src="' + s.polaroid.img + '" alt="' + (s.polaroid.alt || s.polaroid.caption || '') + '" loading="lazy"/>' +
          (s.polaroid.caption ? '<div class="polaroid-caption">' + s.polaroid.caption + '</div>' : '') +
        '</div>';
      }

      sheetsHtml += '<div class="notebook-sheet">' +
        '<div class="binder-holes">' +
          '<div class="binder-hole"></div>' +
          '<div class="binder-hole"></div>' +
          '<div class="binder-hole"></div>' +
          '<div class="binder-hole"></div>' +
        '</div>' +
        '<div class="washi-tape ' + tapeClass + ' sheet-tape" style="transform:rotate(' + tapeRotation + ');"></div>' +
        '<div class="sheet-header-wide">' +
          '<h3 class="sheet-title">' + s.problemTitle + '</h3>' +
          '<p class="sheet-problem-desc">' + s.problemDesc + '</p>' +
        '</div>' +
        '<div class="sheet-body-row">' +
          '<div class="sheet-solution-wrap">' +
            '<span class="stamp-solution-seal">' + sealText + '</span>' +
            '<div class="handwritten-arrow">' + arrowText + '</div>' +
            '<p class="sheet-solution-text">' + s.solutionText + '</p>' +
          '</div>' +
          polaroidHtml +
        '</div>' +
      '</div>';
    });
    sheetsHtml += '</div>';

    var html = '<section class="pain-section-mook">' +
      '<div style="max-width:1240px; margin:0 auto;">' +
        headerHtml +
        sheetsHtml +
      '</div>' +
    '</section>';

    return mountOrReturn(html, container);
  };

  /**
   * 5. 流程圖作息時間軸 (Flowchart Timeline)
   * @param {Object} opts {
   *   header: { badgeText, badgeYear, title, subtitle },
   *   tracks: [
   *     {
   *       title: string,
   *       color: 'orange'|'blue'|'green',
   *       steps: [
   *         { time: string, title: string, desc: string, icon: string }
   *       ]
   *     }
   *   ],
   *   disclaimer: string
   * }
   * @param {string|HTMLElement} container
   */
  MookUI.flowchartTimeline = function (opts, container) {
    opts = opts || {};
    var headerHtml = opts.header ? MookUI.sectionHeader(opts.header) : '';

    var tracksHtml = '';
    (opts.tracks || []).forEach(function (tr) {
      var colorClass = tr.color === 'blue' ? 'track-blue' : (tr.color === 'green' ? 'track-green' : 'track-orange');
      
      tracksHtml += '<div class="flowchart-track-header ' + colorClass + '">' +
        '<span>' + (tr.color === 'blue' ? '📘' : '📙') + '</span> ' + tr.title +
      '</div>';

      tracksHtml += '<div class="flowchart-timeline ' + colorClass + '">';
      (tr.steps || []).forEach(function (step, sIdx) {
        var isLast = sIdx === tr.steps.length - 1;
        tracksHtml += '<div class="flow-step ' + (isLast ? 'flow-step-last' : '') + '">' +
          '<div class="flow-node">' +
            '<div class="flow-icon">' + (step.icon || '⏰') + '</div>' +
            (!isLast ? '<div class="flow-line"></div>' : '') +
          '</div>' +
          '<div class="flow-card">' +
            '<div class="flow-head">' +
              '<span class="flow-stamp">' + step.time + '</span>' +
              '<h4 class="flow-title">' + step.title + '</h4>' +
            '</div>' +
            '<p class="flow-desc">' + step.desc + '</p>' +
          '</div>' +
        '</div>';
      });
      tracksHtml += '</div>';
    });

    var disclaimerHtml = opts.disclaimer ?
      '<p class="routine-disclaimer-note">※ ' + opts.disclaimer + '</p>' : '';

    var html = '<section class="routine-mook-section">' +
      '<div style="max-width:1240px; margin:0 auto;">' +
        headerHtml +
        tracksHtml +
        disclaimerHtml +
      '</div>' +
    '</section>';

    return mountOrReturn(html, container);
  };

  /**
   * 6. 年級分流 TAB 切換卡片 (Grade Differentiation Tabs)
   */
  MookUI.gradeTabs = function (opts, container) {
    opts = opts || {};
    var headerHtml = opts.header ? MookUI.sectionHeader(opts.header) : '';

    var navButtons = '<div class="tab-nav">';
    var panesHtml = '';

    (opts.tabs || []).forEach(function (t, idx) {
      var isActive = t.active || idx === 0;
      var activeClass = isActive ? ' active' : '';
      navButtons += '<button class="tab-btn' + activeClass + '" type="button" data-target="' + t.id + '">' + t.btnText + '</button>';

      var pointsHtml = '<ul class="tab-points-list">';
      (t.points || []).forEach(function (pt) {
        pointsHtml += '<li class="tab-point-item">' +
          '<span class="tab-point-badge">' + pt.num + '</span>' +
          '<div class="tab-point-text">' +
            '<strong>' + pt.title + '</strong>' +
            '<p>' + pt.desc + '</p>' +
          '</div>' +
        '</li>';
      });
      pointsHtml += '</ul>';

      var visualHtml = '';
      if (t.visual) {
        visualHtml = '<div class="tab-visual-side">' +
          '<img src="' + t.visual.img + '" alt="' + (t.visual.caption || '') + '" loading="lazy"/>' +
          (t.visual.caption ? '<div class="tab-visual-caption">' + t.visual.caption + '</div>' : '') +
        '</div>';
      }

      panesHtml += '<div class="tab-pane' + activeClass + '" id="' + t.id + '">' +
        '<div class="tab-content-grid">' +
          pointsHtml +
          visualHtml +
        '</div>' +
      '</div>';
    });
    navButtons += '</div>';

    var html = '<section class="mook-section-tab" style="padding:80px 6vw; background:var(--paper-warm); border-bottom:2px dashed var(--border-dashed);" id="grades">' +
      '<div style="max-width:1180px; margin:0 auto;">' +
        headerHtml +
        navButtons +
        panesHtml +
      '</div>' +
    '</section>';

    return mountOrReturn(html, container);
  };

  /**
   * 7. 課後一站式多元加選 (Bundling Cards)
   */
  MookUI.bundlingCards = function (opts, container) {
    opts = opts || {};
    var headerHtml = opts.header ? MookUI.sectionHeader(opts.header) : '';

    var cardsHtml = '<div class="bundling-grid">';
    (opts.cards || []).forEach(function (c) {
      cardsHtml += '<div class="bundling-card">' +
        '<span class="bundling-tag ' + (c.tagClass || 'tag-english') + '">' + c.tag + '</span>' +
        '<h4>' + c.title + '</h4>' +
        '<p>' + c.desc + '</p>' +
        (c.linkText ? '<small style="font-weight:700; color:var(--blue);">' + c.linkText + '</small>' : '') +
      '</div>';
    });
    cardsHtml += '</div>';

    var quoteHtml = opts.quote ?
      '<div class="bundling-convenience-bar"><span>🌟 ' + opts.quote + '</span></div>' : '';

    var html = '<section class="bundling-section-wrap" style="padding:80px 6vw; background:var(--paper); border-bottom:2px dashed var(--border-dashed);">' +
      '<div style="max-width:1180px; margin:0 auto;">' +
        headerHtml +
        cardsHtml +
        quoteHtml +
      '</div>' +
    '</section>';

    return mountOrReturn(html, container);
  };

  /**
   * 8. 活頁導師札記 (Teacher Note Sheet)
   */
  MookUI.teacherNote = function (opts, container) {
    opts = opts || {};
    var tapeClass = opts.tapeColor ? 'washi-tape-' + opts.tapeColor : 'washi-tape-yellow';

    var html = '<section style="padding:70px 6vw; background:var(--paper-warm); border-bottom:2px dashed var(--border-dashed);">' +
      '<div style="max-width:960px; margin:0 auto;">' +
        '<div class="notebook-sheet" style="padding:36px 36px 30px 54px;">' +
          '<div class="binder-holes">' +
            '<div class="binder-hole"></div>' +
            '<div class="binder-hole"></div>' +
            '<div class="binder-hole"></div>' +
            '<div class="binder-hole"></div>' +
          '</div>' +
          '<div class="washi-tape ' + tapeClass + ' sheet-tape" style="left:80px; width:100px; transform:rotate(-1.5deg);"></div>' +
          '<div class="sheet-title" style="font-size:19px; color:var(--ink); margin-bottom:16px;">' +
            opts.title +
          '</div>' +
          '<blockquote style="margin:0 0 20px; font-size:15px; color:var(--ink-soft); line-height:1.9; font-style:italic; border-left:3px solid var(--orange); padding-left:18px;">' +
            opts.quote +
          '</blockquote>' +
          '<div style="text-align:right; font-family:\'Noto Serif TC\',serif; font-size:13.5px; font-weight:800; color:var(--orange);">' +
            opts.author +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';

    return mountOrReturn(html, container);
  };

  /**
   * 9. 放學安心接送分流盒 (Escort Mook Box)
   */
  MookUI.escortBox = function (opts, container) {
    opts = opts || {};
    var headerHtml = opts.header ? MookUI.sectionHeader(opts.header) : '';

    var walkSchoolsHtml = '';
    (opts.walkCol.schools || []).forEach(function (sch) {
      walkSchoolsHtml += '<span class="school-tag-pill">🏫 ' + sch + '</span>';
    });

    var busSchoolsHtml = '';
    (opts.busCol.schools || []).forEach(function (sch) {
      busSchoolsHtml += '<span class="school-tag-pill bus-pill">🏫 ' + sch + '</span>';
    });

    var html = '<section style="padding:80px 6vw; background:var(--paper-cream); border-bottom:2px dashed var(--border-dashed);" id="escort">' +
      '<div style="max-width:1180px; margin:0 auto;">' +
        headerHtml +
        '<div class="escort-mook-box">' +
          '<div class="escort-group escort-walk">' +
            '<h3>' + opts.walkCol.title + '</h3>' +
            '<p>' + opts.walkCol.desc + '</p>' +
            '<div class="school-tags-row">' + walkSchoolsHtml + '</div>' +
          '</div>' +
          '<div class="escort-group escort-bus">' +
            '<h3>' + opts.busCol.title + '</h3>' +
            '<p>' + opts.busCol.desc + '</p>' +
            '<div class="school-tags-row">' + busSchoolsHtml + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';

    return mountOrReturn(html, container);
  };

  /**
   * 10. 課程總覽導流橫幅 (Courses Hub Banner)
   */
  MookUI.coursesHubBanner = function (opts, container) {
    opts = opts || {};
    var html = '<div class="courses-hub-banner">' +
      '<div class="courses-hub-text">' +
        '<h3>' + (opts.title || '探索更多學程：珠心算・兒童美語・文理精進') + '</h3>' +
        '<p>' + (opts.desc || '除課後安親外，尚學亦提供全方位多元學力深耕學程，歡迎前往課程總覽頁面查看！') + '</p>' +
      '</div>' +
      '<a class="btn-hub-jump" href="' + (opts.btnHref || './courses.html') + '">' + (opts.btnText || '瀏覽全方位課程總覽 →') + '</a>' +
    '</div>';

    return mountOrReturn(html, container);
  };

  /**
   * 11. 家長口碑見證 (Testimonials Mook Grid)
   */
  MookUI.testimonials = function (opts, container) {
    opts = opts || {};
    var headerHtml = opts.header ? MookUI.sectionHeader(opts.header) : '';

    var cardsHtml = '<div class="testimonials-mook-grid">';
    (opts.cards || []).forEach(function (c) {
      cardsHtml += '<div class="testimonial-mook-card">' +
        '<div>' +
          '<div class="mook-quote-bracket">“</div>' +
          '<p class="mook-quote-content">' + c.quote + '</p>' +
        '</div>' +
        '<div class="mook-quote-footer">' +
          '<div class="mook-author-stamp">' + (c.authorInitial || '家') + '</div>' +
          '<div class="mook-author-info">' +
            '<strong>' + c.authorName + '</strong>' +
            '<small>' + c.authorRole + '</small>' +
          '</div>' +
        '</div>' +
      '</div>';
    });
    cardsHtml += '</div>';

    var html = '<section class="testimonials-mook-section" id="testimonials">' +
      '<div style="max-width:1240px; margin:0 auto;">' +
        headerHtml +
        cardsHtml +
      '</div>' +
    '</section>';

    return mountOrReturn(html, container);
  };

  /**
   * 12. 日系 Q&A 卡片 (FAQ Mook Grid)
   */
  MookUI.faq = function (opts, container) {
    opts = opts || {};
    var headerHtml = opts.header ? MookUI.sectionHeader(opts.header) : '';

    var faqsHtml = '<div class="faq-mook-grid">';
    (opts.faqs || []).forEach(function (f) {
      faqsHtml += '<div class="faq-mook-item">' +
        '<h4>' + f.q + '</h4>' +
        '<p>' + f.a + '</p>' +
      '</div>';
    });
    faqsHtml += '</div>';

    var html = '<section class="faq-mook-section" id="faq">' +
      '<div style="max-width:1240px; margin:0 auto;">' +
        headerHtml +
        faqsHtml +
      '</div>' +
    '</section>';

    return mountOrReturn(html, container);
  };

  /**
   * 13. 復古參訪雙線預約卡 (Booking Ticket Card)
   */
  MookUI.bookingTicket = function (opts, container) {
    opts = opts || {};
    var badgeHtml = opts.badge ? MookUI.badge(opts.badge) : '';

    var giftHtml = '';
    if (opts.gift) {
      giftHtml = '<div class="booking-gift-pill">' +
        '<div class="booking-gift-icon">🎁</div>' +
        '<div class="booking-gift-text">' +
          '<strong>' + opts.gift.title + '</strong>' +
          '<p>' + opts.gift.desc + '</p>' +
        '</div>' +
      '</div>';
    }

    var telHtml = '';
    if (opts.telNumber) {
      telHtml = '<a class="btn-mook-secondary" href="tel:' + opts.telNumber.replace(/[^0-9]/g, '') + '" style="padding:15px 28px; font-size:16px;">' +
        '<span>📞</span> ' + (opts.telText || '撥打專線 ' + opts.telNumber) +
      '</a>';
    }

    var noteHtml = opts.note ?
      '<p style="font-size:12.5px; color:var(--ink-soft); margin-top:20px; opacity:0.85;">' + opts.note + '</p>' : '';

    var html = '<section class="booking-mook-section" id="booking">' +
      '<div class="booking-ticket-card">' +
        badgeHtml +
        '<h3 style="font-family:\'Noto Serif TC\',serif; font-size:clamp(22px, 3vw, 34px); font-weight:900; margin:10px 0 14px; color:var(--ink);">' +
          (opts.title || '預約參觀課堂環境・免費學力健檢') +
        '</h3>' +
        '<p style="font-size:15px; color:var(--ink-soft); max-width:680px; margin:0 auto 20px; line-height:1.75;">' +
          (opts.desc || '堅持小班制專職專任導師全程引導。誠摯邀請爸爸媽媽帶著孩子親臨現場感受溫暖專業氛圍！') +
        '</p>' +
        giftHtml +
        '<div style="display:flex; flex-wrap:wrap; justify-content:center; gap:14px; margin-top:24px;">' +
          '<a class="btn-mook-ticket" href="' + (opts.ctaHref || 'https://docs.google.com/forms/d/e/1FAIpQLSc1BAJFgODdtTjtbdpeRYENubrBgTyIlZJ-Ar8qF0plnQbIKA/viewform') + '" target="_blank" rel="noopener noreferrer">' +
            '<span>📝</span> ' + (opts.ctaText || '立即線上填單預約參觀') +
          '</a>' +
          telHtml +
        '</div>' +
        noteHtml +
      '</div>' +
    '</section>';

    return mountOrReturn(html, container);
  };

  /**
   * 14. 手機底部常駐列 (Mobile Sticky Bar)
   */
  MookUI.mobileSticky = function (opts, container) {
    opts = opts || {};
    var telClean = (opts.telNumber || '073646570').replace(/[^0-9]/g, '');

    var html = '<div class="mobile-mook-sticky">' +
      '<div class="mobile-mook-inner">' +
        '<a class="btn-sticky-phone" href="tel:' + telClean + '">' +
          '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>' +
          '<span>' + (opts.telText || '電話諮詢') + '</span>' +
        '</a>' +
        '<a class="btn-sticky-form" href="' + (opts.ctaHref || 'https://docs.google.com/forms/d/e/1FAIpQLSc1BAJFgODdtTjtbdpeRYENubrBgTyIlZJ-Ar8qF0plnQbIKA/viewform') + '" target="_blank" rel="noopener noreferrer">' +
          '<span>📝 ' + (opts.ctaText || '預約參觀與健檢') + '</span>' +
        '</a>' +
      '</div>' +
    '</div>';

    return mountOrReturn(html, container);
  };

  /**
   * 15. 手機抽屜選單模組 (Drawer Sheet)
   */
  MookUI.drawer = function (opts, container) {
    opts = opts || {};
    var groupsHtml = '';
    (opts.groups || []).forEach(function (g) {
      groupsHtml += '<div class="drawer-group">' +
        '<div class="drawer-group-title">' + g.title + '</div>';
      (g.links || []).forEach(function (l) {
        var hClass = l.isHighlight ? ' drawer-highlight' : '';
        var targetAttr = l.target ? ' target="' + l.target + '" rel="noopener noreferrer"' : '';
        groupsHtml += '<a class="drawer-link' + hClass + '" href="' + l.href + '"' + targetAttr + '>' +
          '<span class="d-num">' + (l.icon || '✦') + '</span>' + l.text +
        '</a>';
      });
      groupsHtml += '</div>';
    });

    var html = '<div class="mobile-drawer-overlay" id="drawer-overlay" aria-hidden="true">' +
      '<div class="mobile-drawer" id="mobile-drawer">' +
        '<div class="drawer-drag-pill" id="drawer-drag-pill" title="向上滑動或點擊展開完整目錄"></div>' +
        '<div class="drawer-header">' +
          '<div class="drawer-title">' +
            '<img src="./shangxue-logo-transparent.png?v=20260906_v2" alt="尚學文教" style="height:28px; width:auto;"/>' +
            '<span>導覽目錄</span>' +
          '</div>' +
          '<button class="drawer-close" type="button" id="drawer-close-btn" aria-label="關閉目錄">✕</button>' +
        '</div>' +
        '<div class="drawer-content">' +
          groupsHtml +
        '</div>' +
      '</div>' +
    '</div>';

    return mountOrReturn(html, container);
  };

  // ========================================================
  // 互動行為初始化 (Event Handlers & Interactivity)
  // ========================================================

  MookUI.initTabs = function () {
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var parent = btn.closest('.mook-section-tab') || document;
        parent.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
        parent.querySelectorAll('.tab-pane').forEach(function (p) { p.classList.remove('active'); });

        btn.classList.add('active');
        var targetId = btn.getAttribute('data-target');
        var targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  };

  MookUI.initDrawer = function () {
    var menuTrigger = document.getElementById('mobile-menu-trigger');
    var drawerOverlay = document.getElementById('drawer-overlay');
    var drawer = document.getElementById('mobile-drawer');
    var drawerCloseBtn = document.getElementById('drawer-close-btn');
    var dragPill = document.getElementById('drawer-drag-pill');
    var drawerContent = drawer ? drawer.querySelector('.drawer-content') : null;

    function openDrawer(e) {
      if (e) e.preventDefault();
      if (drawer) drawer.classList.remove('expanded');
      if (drawerOverlay) {
        drawerOverlay.classList.add('active');
        drawerOverlay.setAttribute('aria-hidden', 'false');
      }
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer(e) {
      if (e) e.preventDefault();
      if (drawerOverlay) {
        drawerOverlay.classList.remove('active');
        drawerOverlay.setAttribute('aria-hidden', 'true');
      }
      if (drawer) drawer.classList.remove('expanded');
      document.body.style.overflow = '';
    }

    function expandDrawer() {
      if (drawer && !drawer.classList.contains('expanded')) {
        drawer.classList.add('expanded');
      }
    }

    if (menuTrigger) menuTrigger.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', function (e) {
        if (e.target === drawerOverlay) closeDrawer(e);
      });
    }

    if (dragPill) {
      dragPill.addEventListener('click', function () {
        if (drawer) drawer.classList.toggle('expanded');
      });
    }

    if (drawer) {
      var touchStartY = 0;
      drawer.addEventListener('touchstart', function (e) {
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      drawer.addEventListener('touchmove', function (e) {
        var touchY = e.touches[0].clientY;
        if (touchStartY - touchY > 25) {
          expandDrawer();
        }
      }, { passive: true });
    }

    if (drawerContent) {
      drawerContent.addEventListener('scroll', function () {
        if (drawerContent.scrollTop > 10) {
          expandDrawer();
        }
      }, { passive: true });
    }

    document.querySelectorAll('.drawer-link').forEach(function (link) {
      link.addEventListener('click', function () {
        closeDrawer();
      });
    });
  };

  MookUI.initLightbox = function () {
    var lbModal = document.getElementById('mook-lightbox-modal');
    if (!lbModal) {
      var modalHtml = '<div class="lightbox-modal" id="mook-lightbox-modal" style="position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.85); z-index:10000; display:none; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(6px);">' +
        '<div style="position:relative; max-width:90vw; max-height:90vh; display:flex; flex-direction:column; align-items:center;">' +
          '<button type="button" id="mook-lightbox-close" style="position:absolute; top:-40px; right:0; background:none; border:none; color:#FFF; font-size:32px; cursor:pointer; padding:4px;">✕</button>' +
          '<img id="mook-lightbox-img" src="" alt="" style="max-width:100%; max-height:80vh; object-fit:contain; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,0.5);"/>' +
          '<div id="mook-lightbox-caption" style="color:#FFF; font-family:\'Noto Serif TC\',serif; font-size:14px; margin-top:10px; text-align:center;"></div>' +
        '</div>' +
      '</div>';
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      lbModal = document.getElementById('mook-lightbox-modal');
    }

    var lbImg = document.getElementById('mook-lightbox-img');
    var lbCaption = document.getElementById('mook-lightbox-caption');
    var lbClose = document.getElementById('mook-lightbox-close');

    function openLb(src, caption) {
      if (!lbModal || !lbImg) return;
      lbImg.src = src;
      if (lbCaption) lbCaption.textContent = caption || '';
      lbModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeLb() {
      if (!lbModal) return;
      lbModal.style.display = 'none';
      document.body.style.overflow = '';
    }

    if (lbClose) lbClose.addEventListener('click', closeLb);
    if (lbModal) {
      lbModal.addEventListener('click', function (e) {
        if (e.target === lbModal) closeLb();
      });
    }

    document.querySelectorAll('.polaroid-card img, .hero-polaroid-main img, .hero-polaroid-sub img, .tab-visual-side img').forEach(function (img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () {
        var captionEl = img.parentElement.querySelector('.polaroid-caption') ||
                        img.parentElement.querySelector('.tab-visual-caption');
        var capText = captionEl ? captionEl.textContent : img.alt;
        openLb(img.src, capText);
      });
    });
  };

  MookUI.initSmoothScroll = function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId && targetId !== '#' && document.querySelector(targetId)) {
          e.preventDefault();
          var targetEl = document.querySelector(targetId);
          var offset = 80;
          var bodyRect = document.body.getBoundingClientRect().top;
          var elementRect = targetEl.getBoundingClientRect().top;
          var elementPosition = elementRect - bodyRect;
          var offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  MookUI.initAll = function () {
    MookUI.initTabs();
    MookUI.initDrawer();
    MookUI.initLightbox();
    MookUI.initSmoothScroll();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', MookUI.initAll);
  } else {
    MookUI.initAll();
  }

  global.MookUI = MookUI;

})(typeof window !== 'undefined' ? window : this);
