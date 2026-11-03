/* ============================================================
   高等数学题库 · 应用逻辑
   无框架、无外部请求，双击 index.html 即可运行。
   ============================================================ */
(function () {
  'use strict';

  var CHAPTERS = window.TJ.chapters;
  var CHAPTER_MAP = window.TJ.chapterMap;
  var TYPES = window.TJ.types;
  var DIFFICULTIES = window.TJ.difficulties;
  var DIFFICULTY_MAP = {};
  DIFFICULTIES.forEach(function (item) { DIFFICULTY_MAP[item.level] = item.label; });
  var STORE = window.TJStore;
  var DOCX = window.TJDocx;
  var TEXT = window.TJText;
  var MATH = window.TJMath;
  var escapeHtml = TEXT.escapeHtml;
  var toHtml = MATH ? MATH.toHtml : TEXT.toHtml;
  var toPlain = TEXT.toPlain;
  var mathToPlain = MATH ? MATH.toPlain : TEXT.toPlain;
  var polishLatex = MATH && MATH.polish ? MATH.polish : function (value) { return value; };

  var VIEWS = ['bank', 'compose', 'data'];
  var BANK_INDEX = {};
  CHAPTERS.forEach(function (chapter) { BANK_INDEX[chapter.id] = chapter; });

  var TYPE_ALIASES = {
    '选择': '选择题', '单选': '选择题', '多选': '选择题', '单项选择题': '选择题', '多项选择题': '选择题',
    '填空': '填空题',
    '计算': '计算题',
    '证明': '证明题',
    '解答': '解答题',
    '应用': '应用题'
  };

  var DIFFICULTY_ALIASES = {
    '基础': 1, '简单': 1, '容易': 1, '易': 1, '低': 1,
    '中等': 2, '中': 2, '一般': 2, '普通': 2,
    '较难': 3, '难': 3, '困难': 3, '高': 3
  };

  var CHINESE_NUMBERS = {
    '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6,
    '七': 7, '八': 8, '九': 9, '十': 10, '十一': 11, '十二': 12
  };

  var state = {
    questions: [],
    view: 'bank',
    storageAvailable: true,
    lastSavedAt: null,
    bankFilter: {
      chapter: 'all',
      type: 'all',
      difficulty: 'all',
      query: '',
      sort: 'chapter'
    },
    expandedAnswers: new Set(),
    compose: {
      chapters: new Set(CHAPTERS.map(function (chapter) { return chapter.id; })),
      types: new Set(TYPES),
      difficulties: new Set(DIFFICULTIES.map(function (item) { return item.level; })),
      count: 10,
      title: '高等数学练习卷',
      subtitle: '',
      includeAnswers: false,
      includeSolutions: false,
      includeSpace: true,
      items: [],
      composedAt: null,
      requestedCount: 0,
      shortfall: 0
    },
    confirmHandler: null
  };

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function uniqueId() {
    return 'q_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  }

  function pad2(value) {
    return String(value).padStart(2, '0');
  }

  function formatFullDate(value) {
    var date = new Date(value);
    if (isNaN(date.getTime())) date = new Date();
    return date.getFullYear() + ' 年 ' + (date.getMonth() + 1) + ' 月 ' + date.getDate() + ' 日';
  }

  function formatShortDate(value) {
    var date = new Date(value);
    if (isNaN(date.getTime())) return '';
    return (date.getMonth() + 1) + '月' + date.getDate() + '日';
  }

  function formatSavedAt(value) {
    var date = new Date(value);
    if (isNaN(date.getTime())) return '';
    return formatFullDate(date) + ' ' + pad2(date.getHours()) + ':' + pad2(date.getMinutes());
  }

  function formatRelative(value) {
    var date = new Date(value);
    if (isNaN(date.getTime())) return '';
    var diff = Date.now() - date.getTime();
    if (diff < 0) return formatShortDate(value);
    if (diff < 60 * 1000) return '刚刚';
    if (diff < 60 * 60 * 1000) return Math.floor(diff / 60000) + ' 分钟前';
    if (diff < 24 * 60 * 60 * 1000) return Math.floor(diff / 3600000) + ' 小时前';
    if (diff < 7 * 24 * 60 * 60 * 1000) return Math.floor(diff / 86400000) + ' 天前';
    return formatShortDate(value);
  }

  function formatBytes(bytes) {
    if (!bytes) return '0 KB';
    if (bytes < 1024) return bytes + ' B';
    return (bytes / 1024).toFixed(bytes < 102400 ? 1 : 0) + ' KB';
  }

  function dateStamp() {
    var date = new Date();
    return date.getFullYear() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate());
  }

  function sanitizeFilename(value, fallback) {
    var name = String(value == null ? '' : value)
      .replace(/[\\/:*?"<>|\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 60);
    return name || fallback;
  }

  function downloadBlob(filename, blob) {
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  function downloadJson(filename, payload) {
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    downloadBlob(filename, blob);
  }

  function toast(message, type) {
    var region = $('#toast-region');
    if (!region) return;
    while (region.children.length >= 3) {
      region.removeChild(region.firstElementChild);
    }
    var element = document.createElement('div');
    element.className = 'toast toast--' + (type || 'info');
    element.setAttribute('role', 'status');
    element.textContent = message;
    region.appendChild(element);
    window.requestAnimationFrame(function () {
      element.classList.add('is-visible');
    });
    window.setTimeout(function () {
      element.classList.remove('is-visible');
      window.setTimeout(function () { element.remove(); }, 230);
    }, 3400);
  }

  function showStorageWarning(message) {
    var warning = $('#storage-warning');
    $('#storage-warning-text').textContent = message || '当前浏览器无法保存题库，请及时导出备份。';
    warning.hidden = false;
    state.storageAvailable = false;
  }

  function hideStorageWarning() {
    $('#storage-warning').hidden = true;
  }

  function persistBank() {
    var result = STORE.save(state.questions);
    if (result.ok) {
      state.storageAvailable = true;
      state.lastSavedAt = result.savedAt;
      hideStorageWarning();
      updateStorageMeta();
      return true;
    }
    showStorageWarning(result.error);
    toast('未能写入本地存储，请立即导出 JSON 备份。', 'error');
    return false;
  }

  function updateStorageMeta() {
    var target = $('#storage-meta');
    if (!target) return;
    if (!state.storageAvailable) {
      target.textContent = '当前环境无法使用本地存储；已修改的内容只在本次打开期间有效。';
    } else if (state.lastSavedAt) {
      target.textContent = '上次保存：' + formatSavedAt(state.lastSavedAt) + ' · 数据只保存在当前浏览器';
    } else if (state.questions.length) {
      target.textContent = '题库当前只存在于内存中，尚未成功写入本地存储。';
    } else {
      target.textContent = '尚未保存过题库。新录入的题目会自动写入当前浏览器。';
    }
  }

  function showImportReport(html, isError) {
    var report = $('#import-report');
    report.innerHTML = html;
    report.hidden = false;
    report.classList.toggle('is-error', Boolean(isError));
  }

  function showFormError(message) {
    var error = $('#question-form-error');
    error.textContent = message;
    error.hidden = false;
  }

  function hideFormError() {
    $('#question-form-error').hidden = true;
  }

  /* --------------------------- 视图与导航 --------------------------- */

  function normalizeView(value) {
    return VIEWS.indexOf(value) !== -1 ? value : 'bank';
  }

  function switchView(view, options) {
    options = options || {};
    view = normalizeView(view);
    var changed = state.view !== view;
    state.view = view;

    $$('.nav-tab').forEach(function (tab) {
      var active = tab.getAttribute('data-view') === view;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-current', active ? 'page' : 'false');
    });

    $$('[data-view-panel]').forEach(function (panel) {
      var active = panel.getAttribute('data-view-panel') === view;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });

    if (view === 'compose') {
      updateComposeAvailability();
      renderPaper();
    } else if (view === 'data') {
      renderData();
      updateBuiltinInfo();
    }

    if (changed && !options.initial) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function navigate(view) {
    view = normalizeView(view);
    if (location.hash === '#' + view) {
      switchView(view);
      return;
    }
    location.hash = view;
  }

  function handleRoute() {
    var raw = location.hash.replace(/^#/, '');
    var view = normalizeView(raw);
    if (raw !== view) {
      try {
        history.replaceState(null, '', '#' + view);
      } catch (error) {
        location.hash = view;
      }
    }
    switchView(view);
  }

  /* --------------------------- 统计与筛选 --------------------------- */

  function getChapterCounts() {
    var counts = {};
    CHAPTERS.forEach(function (chapter) { counts[chapter.id] = 0; });
    state.questions.forEach(function (question) {
      if (counts[question.chapterId] != null) counts[question.chapterId] += 1;
    });
    return counts;
  }

  function getTypeCounts() {
    var counts = {};
    TYPES.forEach(function (type) { counts[type] = 0; });
    state.questions.forEach(function (question) {
      if (counts[question.type] != null) counts[question.type] += 1;
    });
    return counts;
  }

  function getDifficultyCounts() {
    var counts = { 1: 0, 2: 0, 3: 0 };
    state.questions.forEach(function (question) {
      var level = Number(question.difficulty);
      if (counts[level] != null) counts[level] += 1;
    });
    return counts;
  }

  function updateOverview() {
    var covered = CHAPTERS.filter(function (chapter) {
      return state.questions.some(function (question) { return question.chapterId === chapter.id; });
    }).length;
    var typeCount = {};
    state.questions.forEach(function (question) { typeCount[question.type] = true; });
    var usedTypes = Object.keys(typeCount).length;
    $('#overview-total').textContent = state.questions.length;
    $('#overview-covered').textContent = covered;
    $('#overview-types').textContent = usedTypes;
    $('#nav-bank-count').textContent = state.questions.length;
  }

  function findQuestion(id) {
    for (var i = 0; i < state.questions.length; i += 1) {
      if (state.questions[i].id === id) return state.questions[i];
    }
    return null;
  }

  function hasActiveBankFilters() {
    var filter = state.bankFilter;
    return filter.chapter !== 'all'
      || filter.type !== 'all'
      || filter.difficulty !== 'all'
      || filter.query.trim() !== ''
      || filter.sort !== 'chapter';
  }

  function getFilteredQuestions() {
    var filter = state.bankFilter;
    var query = filter.query.trim().toLowerCase();
    var results = state.questions.filter(function (question) {
      if (filter.chapter !== 'all' && question.chapterId !== filter.chapter) return false;
      if (filter.type !== 'all' && question.type !== filter.type) return false;
      if (filter.difficulty !== 'all' && Number(question.difficulty) !== Number(filter.difficulty)) return false;
      if (!query) return true;
      var chapter = CHAPTER_MAP[question.chapterId];
      var haystack = [
        question.stem,
        question.answer,
        question.solution,
        question.stemPlain,
        question.answerPlain,
        question.solutionPlain,
        question.source,
        (question.tags || []).join(' '),
        question.type,
        chapter ? chapter.title : ''
      ].join('\n').toLowerCase();
      return haystack.indexOf(query) !== -1;
    });

    results.sort(function (a, b) {
      if (filter.sort === 'newest') {
        return (Date.parse(b.updatedAt) || 0) - (Date.parse(a.updatedAt) || 0);
      }
      if (filter.sort === 'difficulty') {
        var diff = (Number(a.difficulty) || 0) - (Number(b.difficulty) || 0);
        if (diff !== 0) return diff;
      }
      var chapterA = CHAPTER_MAP[a.chapterId] ? CHAPTER_MAP[a.chapterId].no : 99;
      var chapterB = CHAPTER_MAP[b.chapterId] ? CHAPTER_MAP[b.chapterId].no : 99;
      if (chapterA !== chapterB) return chapterA - chapterB;
      return (Date.parse(b.updatedAt) || 0) - (Date.parse(a.updatedAt) || 0);
    });

    return results;
  }

  function buildFilterContext() {
    var filter = state.bankFilter;
    var parts = [];
    if (filter.query.trim()) parts.push('搜索「' + filter.query.trim() + '」');
    if (filter.chapter !== 'all' && CHAPTER_MAP[filter.chapter]) {
      parts.push('第 ' + CHAPTER_MAP[filter.chapter].no + ' 章 · ' + CHAPTER_MAP[filter.chapter].title);
    }
    if (filter.type !== 'all') parts.push(filter.type);
    if (filter.difficulty !== 'all') parts.push('难度：' + DIFFICULTY_MAP[Number(filter.difficulty)]);
    if (filter.sort === 'newest') parts.push('按最近更新');
    if (filter.sort === 'difficulty') parts.push('按难度');
    return parts.length ? parts.join(' · ') : '全部章节 · 按章节顺序';
  }

  /* --------------------------- 题库渲染 --------------------------- */

  function renderChapterNav() {
    var counts = getChapterCounts();
    var nav = $('#chapter-nav');
    var total = state.questions.length;
    $('#chapter-count-all').textContent = total;
    $('#chapter-total-label').textContent = total + ' 道';

    nav.innerHTML = ['上册', '下册'].map(function (volume) {
      var visibleChapters = CHAPTERS.filter(function (chapter) { return chapter.volume === volume; });
      var start = visibleChapters[0].no;
      var end = visibleChapters[visibleChapters.length - 1].no;
      var buttons = visibleChapters.map(function (chapter) {
        return '<button class="chapter-item" type="button" data-chapter-filter="' + chapter.id + '">' +
          '<span class="chapter-no">' + pad2(chapter.no) + '</span>' +
          '<span class="chapter-name" title="' + escapeHtml(chapter.title) + '">' + escapeHtml(chapter.title) + '</span>' +
          '<span class="chapter-count">' + counts[chapter.id] + '</span>' +
          '</button>';
      }).join('');
      return '<div class="chapter-group">' +
        '<p class="chapter-group-title">' + volume + ' <span>' + pad2(start) + '—' + pad2(end) + '</span></p>' +
        '<div class="chapter-group-items">' + buttons + '</div>' +
        '</div>';
    }).join('');

    updateChapterActive();
    updateOverview();
  }

  function updateChapterActive() {
    $$('[data-chapter-filter]').forEach(function (button) {
      var active = button.getAttribute('data-chapter-filter') === state.bankFilter.chapter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function renderDifficulty(level) {
    var safeLevel = clamp(Number(level) || 1, 1, 3);
    return '<span class="difficulty" data-level="' + safeLevel + '" title="' + DIFFICULTY_MAP[safeLevel] + '">' +
      '<span class="difficulty-bars" aria-hidden="true"><i></i><i></i><i></i></span>' +
      DIFFICULTY_MAP[safeLevel] +
      '</span>';
  }

  function renderQuestionCard(question) {
    var chapter = CHAPTER_MAP[question.chapterId] || { no: '?', title: '未分类', volume: '' };
    var answerText = String(question.answer || '').trim();
    var solutionText = String(question.solution || '').trim();
    var hasContent = Boolean(answerText || solutionText);
    var expanded = state.expandedAnswers.has(question.id);
    var tags = Array.isArray(question.tags) ? question.tags.filter(Boolean) : [];
    var updated = question.updatedAt ? formatRelative(question.updatedAt) : '';
    var taxonomy = '';

    if (tags.length) {
      taxonomy += tags.slice(0, 8).map(function (tag) {
        return '<span class="tag">' + escapeHtml(tag) + '</span>';
      }).join('');
    }
    if (question.source) {
      taxonomy += '<span class="q-source" title="' + escapeHtml(question.source) + '">' + escapeHtml(question.source) + '</span>';
    }

    var answerHtml = '';
    if (expanded && hasContent) {
      answerHtml = '<div class="q-answer">';
      if (answerText) {
        answerHtml += '<div class="q-answer-block"><span class="q-answer-label">答案</span>' +
          '<div class="q-answer-text">' + toHtml(answerText) + '</div></div>';
      }
      if (solutionText) {
        answerHtml += '<div class="q-answer-block"><span class="q-answer-label">解析</span>' +
          '<div class="q-answer-text">' + toHtml(solutionText) + '</div></div>';
      }
      answerHtml += '</div>';
    }

    return '<article class="question-card" data-question-id="' + escapeHtml(question.id) + '">' +
      '<div class="q-top">' +
      '<span class="chapter-badge' + (chapter.volume === '下册' ? ' is-lower' : '') + '">' +
      '<span class="badge-no">' + (chapter.no === '?' ? '' : '第 ' + chapter.no + ' 章') + '</span>' +
      escapeHtml(chapter.title) + '</span>' +
      '<span class="type-badge">' + escapeHtml(question.type || '未分类') + '</span>' +
      renderDifficulty(question.difficulty) +
      (updated ? '<span class="q-updated">' + escapeHtml(updated) + '</span>' : '') +
      '</div>' +
      '<div class="q-stem">' + toHtml(question.stem) + '</div>' +
      '<div class="q-footer">' +
      '<div class="q-taxonomy">' + taxonomy + '</div>' +
      '<div class="q-actions">' +
      (hasContent ? '<button class="link-btn" type="button" data-action="toggle-answer" aria-expanded="' + expanded + '">' +
        (expanded ? '收起' : (answerText ? '答案' : '解析')) + '</button>' : '') +
      '<button class="link-btn" type="button" data-action="edit">编辑</button>' +
      '<button class="link-btn is-danger" type="button" data-action="delete">删除</button>' +
      '</div></div>' +
      answerHtml +
      '</article>';
  }

  function renderBankEmptyState() {
    var demoCount = Array.isArray(window.TJ_DEMO_QUESTIONS) ? window.TJ_DEMO_QUESTIONS.length : 0;
    var builtinCount = Array.isArray(window.TJ_BUILTIN_QUESTIONS) ? window.TJ_BUILTIN_QUESTIONS.length : 0;
    var actions = '<button class="btn btn-primary" type="button" data-empty-action="add">新增第一道题</button>';
    if (demoCount) {
      actions += '<button class="btn btn-secondary" type="button" data-empty-action="demo">载入演示题（' + demoCount + ' 道）</button>';
    }
    if (builtinCount) {
      actions += '<button class="btn btn-secondary" type="button" data-empty-action="builtin">合并内置题库（' + builtinCount + ' 道）</button>';
    }
    actions += '<button class="btn btn-quiet" type="button" data-empty-action="import">导入 JSON</button>';

    return '<div class="empty-state">' +
      '<div class="empty-glyph" aria-hidden="true">∫</div>' +
      '<h2>题库还是空的</h2>' +
      '<p>先把第一道题收进来。题目会保存在当前浏览器里，也可以从已有的 JSON 文件导入。</p>' +
      '<div class="empty-actions">' + actions + '</div>' +
      '<p class="empty-note">按同济大学《高等数学》十二章分类 · 支持随机组题与 Word 导出</p>' +
      '</div>';
  }

  function renderBankNoMatchState() {
    return '<div class="empty-state">' +
      '<div class="empty-glyph" aria-hidden="true">∅</div>' +
      '<h2>没有找到符合条件的题目</h2>' +
      '<p>换一个关键词，或者放宽章节、题型和难度筛选。</p>' +
      '<div class="empty-actions">' +
      '<button class="btn btn-secondary" type="button" data-empty-action="reset">清除筛选</button>' +
      '<button class="btn btn-quiet" type="button" data-empty-action="add">新增题目</button>' +
      '</div></div>';
  }

  function renderBank() {
    var questions = getFilteredQuestions();
    var total = state.questions.length;
    var query = state.bankFilter.query.trim();
    var summary;

    if (!total) {
      summary = '题库为空';
    } else if (questions.length === total) {
      summary = '共 ' + total + ' 道题';
    } else {
      summary = '找到 ' + questions.length + ' 道题 · 共 ' + total + ' 道';
    }
    $('#result-summary').textContent = summary;
    $('#filter-context').textContent = buildFilterContext();
    $('#btn-clear-search').hidden = !query;
    $('#btn-reset-filters').disabled = !hasActiveBankFilters();

    var list = $('#question-list');
    if (!total) {
      list.innerHTML = renderBankEmptyState();
      return;
    }
    if (!questions.length) {
      list.innerHTML = renderBankNoMatchState();
      return;
    }
    list.innerHTML = questions.map(renderQuestionCard).join('');
  }

  function setChapterFilter(chapterId) {
    if (chapterId !== 'all' && !CHAPTER_MAP[chapterId]) chapterId = 'all';
    state.bankFilter.chapter = chapterId;
    updateChapterActive();
    renderBank();
  }

  function resetBankFilters() {
    state.bankFilter.chapter = 'all';
    state.bankFilter.type = 'all';
    state.bankFilter.difficulty = 'all';
    state.bankFilter.query = '';
    state.bankFilter.sort = 'chapter';
    $('#search-input').value = '';
    $('#filter-type').value = 'all';
    $('#filter-difficulty').value = 'all';
    $('#filter-sort').value = 'chapter';
    updateChapterActive();
    renderBank();
  }

  /* --------------------------- 题目弹窗 --------------------------- */

  function populateStaticSelects() {
    $('#filter-type').innerHTML = '<option value="all">全部题型</option>' + TYPES.map(function (type) {
      return '<option value="' + escapeHtml(type) + '">' + escapeHtml(type) + '</option>';
    }).join('');

    $('#question-chapter').innerHTML = CHAPTERS.map(function (chapter) {
      return '<option value="' + chapter.id + '">第 ' + chapter.no + ' 章 · ' + escapeHtml(chapter.title) + '</option>';
    }).join('');

    $('#question-type').innerHTML = TYPES.map(function (type) {
      return '<option value="' + escapeHtml(type) + '">' + escapeHtml(type) + '</option>';
    }).join('');

    $('#question-difficulty').innerHTML = DIFFICULTIES.map(function (item) {
      return '<option value="' + item.level + '">' + escapeHtml(item.label) + '</option>';
    }).join('');
  }

  function renderMathPreview() {
    var preview = $('#question-math-preview');
    var body = $('#question-math-preview-body');
    if (!preview || !body) return;
    var sections = [
      { label: '题干', value: $('#question-stem').value.trim() },
      { label: '答案', value: $('#question-answer').value.trim() },
      { label: '解析', value: $('#question-solution').value.trim() }
    ].filter(function (section) { return section.value; });
    if (!sections.length) {
      preview.hidden = true;
      body.innerHTML = '';
      return;
    }
    body.innerHTML = sections.map(function (section) {
      return '<div class="math-preview-section">' +
        '<div class="math-preview-label">' + escapeHtml(section.label) + '</div>' +
        '<div class="math-preview-content">' + toHtml(section.value) + '</div>' +
        '</div>';
    }).join('');
    preview.hidden = false;
  }

  function openQuestionDialog(question) {
    var isEdit = Boolean(question);
    var dialog = $('#question-dialog');
    var defaultChapter = state.bankFilter.chapter !== 'all' ? state.bankFilter.chapter : CHAPTERS[0].id;
    if (dialog.open) return;

    $('#question-form').reset();
    hideFormError();
    $('#question-dialog-title').textContent = isEdit ? '编辑题目' : '新增题目';
    $('#question-id').value = isEdit ? question.id : '';
    $('#question-chapter').value = isEdit ? question.chapterId : defaultChapter;
    $('#question-type').value = isEdit ? question.type : '计算题';
    $('#question-difficulty').value = isEdit ? String(question.difficulty) : '1';
    $('#question-stem').value = isEdit ? question.stem : '';
    $('#question-answer').value = isEdit ? (question.answer || '') : '';
    $('#question-solution').value = isEdit ? (question.solution || '') : '';
    $('#question-source').value = isEdit ? (question.source || '') : '';
    $('#question-tags').value = isEdit && Array.isArray(question.tags) ? question.tags.join(', ') : '';
    renderMathPreview();
    dialog.showModal();
    window.setTimeout(function () { $('#question-stem').focus(); }, 40);
  }

  function parseTags(value) {
    var seen = {};
    return String(value || '')
      .split(/[,，、;；]/)
      .map(function (tag) { return tag.trim(); })
      .filter(function (tag) {
        if (!tag || seen[tag]) return false;
        seen[tag] = true;
        return true;
      })
      .slice(0, 20);
  }

  function handleQuestionSubmit(event) {
    event.preventDefault();
    hideFormError();

    var id = $('#question-id').value.trim();
    var chapterId = $('#question-chapter').value;
    var type = $('#question-type').value;
    var difficulty = Number($('#question-difficulty').value);
    var stem = polishLatex($('#question-stem').value.trim());
    var answer = polishLatex($('#question-answer').value.trim());
    var solution = polishLatex($('#question-solution').value.trim());
    var source = $('#question-source').value.trim();
    var tags = parseTags($('#question-tags').value);

    if (!CHAPTER_MAP[chapterId]) {
      showFormError('请选择有效的章节。');
      $('#question-chapter').focus();
      return;
    }
    if (TYPES.indexOf(type) === -1) {
      showFormError('请选择有效的题型。');
      $('#question-type').focus();
      return;
    }
    if (!DIFFICULTY_MAP[difficulty]) {
      showFormError('请选择有效的难度。');
      $('#question-difficulty').focus();
      return;
    }
    if (!stem) {
      showFormError('题干不能为空。');
      $('#question-stem').focus();
      return;
    }

    var existing = id ? findQuestion(id) : null;
    var now = new Date().toISOString();
    var hasLatex = function (value) {
      return /\$|\\\(|\\\[/.test(String(value || ''));
    };
    var question = {
      id: existing ? existing.id : uniqueId(),
      chapterId: chapterId,
      type: type,
      difficulty: difficulty,
      stem: stem,
      answer: answer,
      solution: solution,
      tags: tags,
      source: source,
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now
    };
    if (existing && existing.stemPlain) {
      question.stemPlain = stem === existing.stem ? existing.stemPlain : mathToPlain(stem);
    } else if (hasLatex(stem)) {
      question.stemPlain = mathToPlain(stem);
    }
    if (existing && existing.answerPlain) {
      question.answerPlain = answer === (existing.answer || '') ? existing.answerPlain : mathToPlain(answer);
    } else if (hasLatex(answer)) {
      question.answerPlain = mathToPlain(answer);
    }
    if (existing && existing.solutionPlain) {
      question.solutionPlain = solution === (existing.solution || '') ? existing.solutionPlain : mathToPlain(solution);
    } else if (hasLatex(solution)) {
      question.solutionPlain = mathToPlain(solution);
    }

    if (existing) {
      var index = state.questions.indexOf(existing);
      state.questions[index] = question;
    } else {
      state.questions.push(question);
    }

    var saved = persistBank();
    $('#question-dialog').close();
    refreshAll();
    toast(saved ? (existing ? '题目已更新。' : '题目已保存。') : '题目已修改，但未能写入本地存储。', saved ? 'success' : 'warn');
  }

  function closeQuestionDialog() {
    $('#question-dialog').close();
  }

  /* --------------------------- 确认框 --------------------------- */

  function openConfirm(options) {
    var dialog = $('#confirm-dialog');
    if (dialog.open) return;
    $('#confirm-title').textContent = options.title || '确认操作';
    $('#confirm-message').textContent = options.message || '';
    var detail = $('#confirm-detail');
    if (options.detail) {
      detail.textContent = options.detail;
      detail.hidden = false;
    } else {
      detail.textContent = '';
      detail.hidden = true;
    }
    $('#confirm-footnote').textContent = options.footnote || '';
    var ok = $('#confirm-ok');
    ok.className = 'btn ' + (options.danger ? 'btn-danger' : 'btn-primary');
    ok.textContent = options.confirmLabel || '确认';
    state.confirmHandler = options.onConfirm || null;
    dialog.showModal();
    window.setTimeout(function () {
      var focusTarget = options.danger ? $('#confirm-cancel') : $('#confirm-ok');
      if (focusTarget && dialog.open) focusTarget.focus();
    }, 30);
  }

  function closeConfirm() {
    state.confirmHandler = null;
    $('#confirm-dialog').close();
  }

  function handleConfirm() {
    var handler = state.confirmHandler;
    state.confirmHandler = null;
    $('#confirm-dialog').close();
    if (handler) {
      try {
        handler();
      } catch (error) {
        console.error(error);
        toast('操作失败：' + error.message, 'error');
      }
    }
  }

  function requestDeleteQuestion(question) {
    openConfirm({
      title: '删除题目',
      message: '确定删除这道题吗？',
      detail: toPlain(question.stem).slice(0, 120) + (toPlain(question.stem).length > 120 ? '…' : ''),
      confirmLabel: '删除',
      danger: true,
      footnote: '删除后请记得导出备份',
      onConfirm: function () {
        state.questions = state.questions.filter(function (item) { return item.id !== question.id; });
        state.expandedAnswers.delete(question.id);
        var saved = persistBank();
        refreshAll();
        toast(saved ? '题目已删除。' : '题目已从列表中移除，但未能写入本地存储。', saved ? 'info' : 'warn');
      }
    });
  }

  /* --------------------------- 组题 --------------------------- */

  function renderComposeFilters() {
    var chapterCounts = getChapterCounts();
    var typeCounts = getTypeCounts();
    var difficultyCounts = getDifficultyCounts();

    $('#compose-chapters').innerHTML = CHAPTERS.map(function (chapter) {
      var checked = state.compose.chapters.has(chapter.id) ? ' checked' : '';
      return '<label class="chapter-check" title="' + escapeHtml(chapter.title) + '">' +
        '<input type="checkbox" data-compose-chapter="' + chapter.id + '"' + checked + '>' +
        '<span class="chapter-check-text">' +
        '<span class="chapter-check-name">' + escapeHtml(chapter.title) + '</span>' +
        '<small>第 ' + chapter.no + ' 章 · ' + chapterCounts[chapter.id] + ' 道</small>' +
        '</span></label>';
    }).join('');

    $('#compose-types').innerHTML = TYPES.map(function (type) {
      var checked = state.compose.types.has(type) ? ' checked' : '';
      return '<label class="type-check"><input type="checkbox" data-compose-type="' + escapeHtml(type) + '"' + checked + '>' +
        '<span>' + escapeHtml(type) + '</span><small>' + typeCounts[type] + '</small></label>';
    }).join('');

    $('#compose-difficulties').innerHTML = DIFFICULTIES.map(function (item) {
      var checked = state.compose.difficulties.has(item.level) ? ' checked' : '';
      return '<label class="difficulty-check"><input type="checkbox" data-compose-difficulty="' + item.level + '"' + checked + '>' +
        '<span>' + escapeHtml(item.label) + '</span><small>' + difficultyCounts[item.level] + '</small></label>';
    }).join('');
  }

  function getComposePool() {
    return state.questions.filter(function (question) {
      return state.compose.chapters.has(question.chapterId)
        && state.compose.types.has(question.type)
        && state.compose.difficulties.has(Number(question.difficulty));
    });
  }

  function parseCountInput() {
    var raw = $('#compose-count').value.trim();
    var value = Number(raw);
    return Number.isInteger(value) && value >= 1 && value <= 999 ? value : null;
  }

  function updateComposeButtonLabel() {
    var button = $('#btn-compose');
    var label = state.compose.items.length ? '重新抽题' : '随机组卷';
    button.innerHTML = label + ' <span class="btn-arrow" aria-hidden="true">→</span>';
  }

  function updateComposeAvailability() {
    var pool = getComposePool();
    var requested = parseCountInput();
    var hint = $('#compose-availability-hint');
    var warning = false;

    $('#available-count').textContent = pool.length;
    $('#available-count-inline').textContent = pool.length;

    if (!state.questions.length) {
      hint.textContent = '题库为空。先到「题库」新增或导入题目，就能开始组卷。';
      warning = true;
    } else if (!pool.length) {
      hint.textContent = '当前筛选没有可用题目，请至少选择一个有题的章节、题型和难度。';
      warning = true;
    } else if (requested == null) {
      hint.textContent = '请输入 1—999 之间的抽取数量。';
      warning = true;
    } else if (requested > pool.length) {
      hint.textContent = '符合条件的题目只有 ' + pool.length + ' 道，本次会全部抽取。';
      warning = true;
    } else {
      hint.textContent = '将从 ' + pool.length + ' 道符合条件题目中随机抽取 ' + requested + ' 道，不重复。';
    }

    hint.classList.toggle('is-warning', warning);
    $('#btn-compose').disabled = pool.length === 0;
    updateComposeButtonLabel();
  }

  function shuffle(array) {
    var copy = array.slice();
    for (var i = copy.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function composePaper() {
    if (!state.questions.length) {
      toast('题库为空，先新增或导入题目。', 'warn');
      navigate('bank');
      return;
    }
    var requested = parseCountInput();
    if (requested == null) {
      toast('请输入 1—999 之间的题目数量。', 'warn');
      $('#compose-count').focus();
      return;
    }
    var pool = getComposePool();
    if (!pool.length) {
      toast('当前筛选下没有可用题目，请调整章节、题型或难度。', 'warn');
      return;
    }

    var selected = shuffle(pool).slice(0, Math.min(requested, pool.length));
    state.compose.items = selected.map(function (question) { return question.id; });
    state.compose.composedAt = new Date().toISOString();
    state.compose.requestedCount = requested;
    state.compose.shortfall = Math.max(0, requested - selected.length);
    state.compose.includeAnswers = $('#opt-show-answers').checked;
    state.compose.includeSolutions = state.compose.includeAnswers && $('#opt-show-solutions').checked;
    state.compose.includeSpace = $('#opt-answer-space').checked;
    renderPaper();
    updateComposeButtonLabel();

    if (state.compose.shortfall > 0) {
      toast('可用题目只有 ' + pool.length + ' 道，本次已全部选入。', 'warn');
    } else {
      toast('已随机抽取 ' + selected.length + ' 道题。', 'success');
    }

    if (window.matchMedia('(max-width: 960px)').matches) {
      window.setTimeout(function () {
        var toolbar = $('.preview-toolbar');
        var header = $('.site-header');
        if (!toolbar) return;
        var top = toolbar.getBoundingClientRect().top + window.scrollY - (header ? header.offsetHeight : 0) - 10;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }, 80);
    }
  }

  function getPaperItems() {
    var byId = {};
    state.questions.forEach(function (question) { byId[question.id] = question; });
    var items = [];
    var ids = [];
    state.compose.items.forEach(function (id) {
      if (byId[id]) {
        items.push(byId[id]);
        ids.push(id);
      }
    });
    if (ids.length !== state.compose.items.length) {
      state.compose.items = ids;
    }
    return items;
  }

  function updatePaperHeading() {
    var title = $('#paper-title-input').value.trim() || '高等数学练习卷';
    var subtitle = $('#paper-subtitle-input').value.trim();
    $('#paper-view-title').textContent = title;
    $('#paper-view-subtitle').textContent = subtitle;
    $('#paper-view-subtitle').hidden = !subtitle;
    var items = getPaperItems();
    $('#paper-meta-line').textContent = '共 ' + items.length + ' 道题 · ' +
      formatFullDate(state.compose.composedAt || new Date());
  }

  function renderPaper() {
    var items = getPaperItems();
    var hasPaper = items.length > 0;
    var paper = $('#paper');
    var empty = $('#paper-empty');
    var controls = ['#btn-clear-paper', '#btn-print-paper', '#btn-export-word'];

    $('#btn-compose').disabled = getComposePool().length === 0;
    updateComposeButtonLabel();

    if (!hasPaper) {
      state.compose.items = [];
      state.compose.composedAt = null;
      state.compose.requestedCount = 0;
      state.compose.shortfall = 0;
      paper.hidden = true;
      empty.hidden = false;
      $('#paper-body').innerHTML = '';
      $('#paper-answers').innerHTML = '';
      $('#paper-answers').hidden = true;
      controls.forEach(function (selector) { $(selector).hidden = true; });
      return;
    }

    paper.hidden = false;
    empty.hidden = true;
    controls.forEach(function (selector) { $(selector).hidden = false; });
    updatePaperHeading();

    var includeSpace = $('#opt-answer-space').checked;
    var shortfallHtml = '';
    if (state.compose.shortfall > 0) {
      shortfallHtml = '<p class="paper-shortfall no-print">当前条件共有 ' + items.length +
        ' 道题，已全部选入（原计划抽取 ' + state.compose.requestedCount + ' 道）。</p>';
    }

    $('#paper-body').innerHTML = shortfallHtml + items.map(function (question, index) {
      var chapter = CHAPTER_MAP[question.chapterId];
      var tag = chapter ? '<span class="paper-q-tag">第 ' + chapter.no + ' 章</span>' : '';
      return '<div class="paper-q" data-paper-index="' + index + '">' +
        '<div class="paper-q-main">' +
        '<span class="paper-q-no">' + (index + 1) + '.</span>' +
        '<div class="paper-q-text">' + toHtml(question.stem) + tag + '</div>' +
        '</div>' +
        '<div class="paper-q-actions no-print">' +
        '<button type="button" data-paper-action="replace" data-index="' + index + '">换一题</button>' +
        '<button type="button" data-paper-action="remove" data-index="' + index + '">移除</button>' +
        '</div>' +
        (includeSpace ? '<div class="paper-answer-space" aria-hidden="true"></div>' : '') +
        '</div>';
    }).join('');

    var answers = $('#paper-answers');
    if ($('#opt-show-answers').checked) {
      var includeSolutions = $('#opt-show-solutions').checked;
      var showSolutions = includeSolutions && items.some(function (question) {
        return String(question.solution || '').trim() !== '';
      });
      var answerHtml = '<h2>' + (showSolutions ? '参考答案与解析' : '参考答案') + '</h2>';
      items.forEach(function (question, index) {
        var answer = String(question.answer || '').trim() || '略';
        var solution = String(question.solution || '').trim();
        answerHtml += '<div class="paper-answer-item">' +
          '<span class="paper-answer-no">' + (index + 1) + '.</span> ' +
          '<span class="paper-answer-label">答案</span> ' + toHtml(answer);
        if (showSolutions && solution) {
          answerHtml += '<br><span class="paper-answer-label">解析</span> ' +
            '<span class="paper-answer-solution">' + toHtml(solution) + '</span>';
        }
        answerHtml += '</div>';
      });
      answers.innerHTML = answerHtml;
      answers.hidden = false;
    } else {
      answers.innerHTML = '';
      answers.hidden = true;
    }
  }

  function replacePaperItem(index) {
    var items = getPaperItems();
    if (!items[index]) return;
    var current = items[index];
    var selected = {};
    state.compose.items.forEach(function (id) { selected[id] = true; });
    var available = getComposePool().filter(function (question) { return !selected[question.id]; });
    if (!available.length) {
      toast('没有其他符合条件的题目可以替换。', 'warn');
      return;
    }
    var sameChapter = available.filter(function (question) { return question.chapterId === current.chapterId; });
    var candidates = sameChapter.length ? sameChapter : available;
    var next = candidates[Math.floor(Math.random() * candidates.length)];
    state.compose.items[index] = next.id;
    renderPaper();
    toast('已换一题。', 'info');
  }

  function removePaperItem(index) {
    if (!state.compose.items[index]) return;
    state.compose.items.splice(index, 1);
    state.compose.shortfall = 0;
    renderPaper();
    toast('已从试卷中移除。', 'info');
  }

  function clearPaper() {
    state.compose.items = [];
    state.compose.composedAt = null;
    state.compose.requestedCount = 0;
    state.compose.shortfall = 0;
    renderPaper();
  }

  function containsLatex(value) {
    return /\$|\\\(|\\\[/.test(String(value || ''));
  }

  function mergeTextPart(parts, text) {
    if (!text) return;
    var last = parts[parts.length - 1];
    if (last && last.type === 'text') {
      last.text += text;
    } else {
      parts.push({ type: 'text', text: text });
    }
  }

  async function buildWordParts(text) {
    var source = String(text || '');
    if (!source.trim() || !containsLatex(source)) return null;
    if (!MATH || typeof MATH.parse !== 'function') return null;
    if (!window.TJWordFormula || typeof window.TJWordFormula.render !== 'function') {
      throw new Error('公式转图片模块未加载。');
    }
    var segments = MATH.parse(source);
    var parts = [];
    for (var i = 0; i < segments.length; i += 1) {
      var segment = segments[i];
      if (segment.type === 'text') {
        mergeTextPart(parts, segment.text);
      } else {
        var image = await window.TJWordFormula.render(segment.text, segment.display);
        parts.push({
          type: 'image',
          dataUrl: image.dataUrl,
          widthPx: image.widthPx,
          heightPx: image.heightPx,
          alt: image.alt
        });
      }
    }
    return parts.some(function (part) { return part.type === 'image'; }) ? parts : null;
  }

  function wordPlain(question, field) {
    var plain = question[field + 'Plain'];
    if (plain != null && plain !== '') return plain;
    var value = String(question[field] || '');
    if (containsLatex(value) && MATH && typeof MATH.toPlain === 'function') {
      return MATH.toPlain(value);
    }
    return value;
  }

  async function exportWord() {
    var items = getPaperItems();
    if (!items.length) {
      toast('请先生成一份试卷。', 'warn');
      return;
    }
    var button = $('#btn-export-word');
    var originalButton = button ? button.innerHTML : '';
    if (button) {
      button.disabled = true;
      button.textContent = '生成中…';
    }

    try {
      var prepared = [];
      var imageFallbacks = 0;
      for (var i = 0; i < items.length; i += 1) {
        var question = items[i];
        var parts = null;
        if (containsLatex(question.stem) || containsLatex(question.answer) || containsLatex(question.solution)) {
          try {
            parts = {
              stem: await buildWordParts(question.stem),
              answer: await buildWordParts(question.answer),
              solution: await buildWordParts(question.solution)
            };
          } catch (error) {
            console.warn('公式图片生成失败，回退到原文：', question.id, error);
            parts = null;
            imageFallbacks += 1;
          }
        }
        prepared.push({
          stem: wordPlain(question, 'stem'),
          answer: wordPlain(question, 'answer'),
          solution: wordPlain(question, 'solution'),
          stemParts: parts ? parts.stem : null,
          answerParts: parts ? parts.answer : null,
          solutionParts: parts ? parts.solution : null
        });
        if (button && items.length > 1) {
          button.textContent = '生成中 ' + (i + 1) + '/' + items.length;
        }
      }

      var title = $('#paper-title-input').value.trim() || '高等数学练习卷';
      var subtitle = $('#paper-subtitle-input').value.trim();
      var includeAnswers = $('#opt-show-answers').checked;
      var includeSolutions = includeAnswers && $('#opt-show-solutions').checked;
      var payload = {
        title: title,
        subtitle: subtitle,
        generatedAt: state.compose.composedAt || new Date().toISOString(),
        includeAnswers: includeAnswers,
        includeSolutions: includeSolutions,
        includeSpace: $('#opt-answer-space').checked,
        questions: prepared
      };

      var bytes = DOCX.buildPaperDocx(payload);
      var blob = new Blob([bytes], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
      var filename = sanitizeFilename(title, '高等数学练习卷') + '-' + dateStamp() + '.docx';
      downloadBlob(filename, blob);
      if (imageFallbacks) {
        toast('Word 已生成，但有 ' + imageFallbacks + ' 道题的公式未能转成图片，已回退到原文。', 'warn');
      } else {
        toast('Word 文件已生成，请在下载文件夹中查看。', 'success');
      }
    } catch (error) {
      console.error(error);
      toast('Word 导出失败：' + error.message, 'error');
    } finally {
      if (button) {
        button.disabled = false;
        button.innerHTML = originalButton;
      }
    }
  }

  function printPaper() {
    if (!getPaperItems().length) {
      toast('请先生成一份试卷。', 'warn');
      return;
    }
    window.print();
  }

  /* --------------------------- 数据页 --------------------------- */

  function renderData() {
    var chapterCounts = getChapterCounts();
    var typeSet = {};
    state.questions.forEach(function (question) { typeSet[question.type] = true; });
    var covered = CHAPTERS.filter(function (chapter) { return chapterCounts[chapter.id] > 0; }).length;
    var typeCount = Object.keys(typeSet).length;
    $('#data-total').textContent = state.questions.length;
    $('#data-covered').textContent = covered + ' / ' + CHAPTERS.length;
    $('#data-types').textContent = typeCount + ' / ' + TYPES.length;
    $('#data-usage').textContent = formatBytes(STORE.usageBytes(state.questions));

    var distribution = $('#chapter-distribution');
    if (!state.questions.length) {
      distribution.innerHTML = '<p class="data-note">还没有题目。导入或新增后，这里会显示各章节的分布。</p>';
    } else {
      var max = Math.max.apply(null, CHAPTERS.map(function (chapter) { return chapterCounts[chapter.id]; }));
      distribution.innerHTML = CHAPTERS.map(function (chapter) {
        var count = chapterCounts[chapter.id];
        var width = max ? Math.round(count / max * 100) : 0;
        return '<div class="bar-row">' +
          '<span class="bar-no">' + pad2(chapter.no) + '</span>' +
          '<span class="bar-chapter" title="' + escapeHtml(chapter.title) + '">' + escapeHtml(chapter.title) + '</span>' +
          '<span class="bar-track"><span class="bar-fill" style="width:' + width + '%"></span></span>' +
          '<strong class="bar-count">' + count + '</strong>' +
          '</div>';
      }).join('');
    }
    updateStorageMeta();
  }

  function updateBuiltinInfo() {
    var count = Array.isArray(window.TJ_BUILTIN_QUESTIONS) ? window.TJ_BUILTIN_QUESTIONS.length : 0;
    var note = $('#builtin-note');
    var button = $('#btn-merge-builtin');
    if (count) {
      note.textContent = '内置题库当前有 ' + count + ' 道题。新增的内置题刷新后自动补入；点「合并」可更新同 id 的题目。';
      button.disabled = false;
    } else {
      note.textContent = '内置题库当前为空。把题目写入 data/questions.js 后刷新页面即可。';
      button.disabled = true;
    }
  }

  function exportBank() {
    if (!state.questions.length) {
      toast('题库为空，暂无可导出的题目。', 'warn');
      return;
    }
    var payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      count: state.questions.length,
      questions: state.questions
    };
    downloadJson('高数题库-' + dateStamp() + '.json', payload);
    toast('已导出 ' + state.questions.length + ' 道题。', 'success');
  }

  function downloadTemplate() {
    var payload = {
      version: 1,
      questions: [
        {
          id: 'sample-ch01-001',
          chapter: '第1章',
          type: '计算题',
          difficulty: '基础',
          stem: '求极限 lim_{x→0} (sin 3x) / x',
          answer: '3',
          solution: '当 x→0 时，sin 3x ~ 3x，因此原式 = 3。',
          tags: ['极限', '等价无穷小'],
          source: '示例'
        },
        {
          id: 'sample-ch10-001',
          chapter: 'ch10',
          type: '计算题',
          difficulty: '中等',
          stem: '计算二重积分 ∬_{D} (x + y) dσ，其中 D = {(x, y) | 0 ≤ x ≤ 1, 0 ≤ y ≤ 1}。',
          answer: '1',
          solution: '化为累次积分：∬_{D}(x + y)dσ = ∫_{0}^{1}dx∫_{0}^{1}(x + y)dy = 1。',
          tags: ['二重积分'],
          source: '示例'
        }
      ]
    };
    downloadJson('题库导入模板.json', payload);
    toast('导入模板已下载。', 'success');
  }

  function normalizeChapter(value) {
    if (value == null) return null;
    var raw = String(value).trim();
    if (!raw) return null;
    if (CHAPTER_MAP[raw]) return raw;

    var directNumber = raw.match(/^0?(\d{1,2})$/);
    if (directNumber) {
      var no = Number(directNumber[1]);
      if (no >= 1 && no <= CHAPTERS.length) return CHAPTERS[no - 1].id;
    }

    var numbered = raw.match(/第\s*([一二三四五六七八九十\d]{1,3})\s*章/);
    if (numbered) {
      var token = numbered[1];
      var number = /^\d+$/.test(token) ? Number(token) : CHINESE_NUMBERS[token];
      if (number >= 1 && number <= CHAPTERS.length) return CHAPTERS[number - 1].id;
    }

    var match = CHAPTERS.filter(function (chapter) {
      return chapter.title === raw || raw.indexOf(chapter.title) !== -1 || chapter.title.indexOf(raw) !== -1;
    });
    return match.length === 1 ? match[0].id : null;
  }

  function normalizeType(value) {
    if (value == null) return null;
    var raw = String(value).trim();
    if (!raw) return null;
    if (TYPES.indexOf(raw) !== -1) return raw;
    if (TYPE_ALIASES[raw]) return TYPE_ALIASES[raw];
    if (/题$/.test(raw) && TYPE_ALIASES[raw.slice(0, -1)]) return TYPE_ALIASES[raw.slice(0, -1)];
    return null;
  }

  function normalizeDifficulty(value) {
    if (value == null || value === '') return null;
    if (typeof value === 'number' && value >= 1 && value <= 3) return Math.floor(value);
    if (typeof value === 'number' && value >= 4 && value <= 5) return 3;
    var raw = String(value).trim();
    if (/^[1-3]$/.test(raw)) return Number(raw);
    if (/^[45]$/.test(raw)) return 3;
    if (DIFFICULTY_ALIASES[raw]) return DIFFICULTY_ALIASES[raw];
    if (/^基础|简单|容易|易/.test(raw)) return 1;
    if (/^中等|一般|普通/.test(raw)) return 2;
    if (/^较难|难|困难/.test(raw)) return 3;
    return null;
  }

  function toText(value) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (Array.isArray(value)) return value.map(toText).filter(Boolean).join('\n');
    return '';
  }

  function toIsoDate(value, fallback) {
    if (!value) return fallback;
    var date = new Date(value);
    return isNaN(date.getTime()) ? fallback : date.toISOString();
  }

  function normalizeImportPayload(payload) {
    var list;
    if (Array.isArray(payload)) {
      list = payload;
    } else if (payload && Array.isArray(payload.questions)) {
      list = payload.questions;
    } else {
      throw new Error('JSON 顶层应为题目数组，或包含 questions 数组的对象。');
    }
    if (!list.length) {
      throw new Error('没有找到任何题目。');
    }

    var normalized = [];
    var errors = [];
    var warnings = [];
    var now = new Date().toISOString();
    var usedIds = {};
    state.questions.forEach(function (question) { usedIds[question.id] = true; });
    var incomingIds = {};

    list.forEach(function (raw, index) {
      var label = '第 ' + (index + 1) + ' 条';
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
        errors.push(label + '：不是题目对象。');
        return;
      }
      var stem = toText(raw.stem != null ? raw.stem : (raw.question != null ? raw.question : (raw.content != null ? raw.content : raw.title))).trim();
      if (!stem) {
        errors.push(label + '：缺少题干（stem / question）。');
        return;
      }
      var rawChapter = raw.chapterId != null ? raw.chapterId
        : (raw.chapter != null ? raw.chapter : raw.chapterName);
      var chapterId = normalizeChapter(rawChapter);
      if (!chapterId) {
        errors.push(label + '：章节无法识别，请使用 ch01 或「第1章」。');
        return;
      }

      var type = normalizeType(raw.type);
      if (!type) {
        type = '解答题';
        warnings.push(label + '：题型缺失或无法识别，已按「解答题」导入。');
      }
      var difficulty = normalizeDifficulty(raw.difficulty);
      if (difficulty == null) {
        difficulty = 2;
        warnings.push(label + '：难度缺失或无法识别，已按「中等」导入。');
      }

      var id = raw.id == null ? '' : String(raw.id).trim();
      if (id && !/^[A-Za-z0-9_-]{1,80}$/.test(id)) {
        warnings.push(label + '：id 只能包含字母、数字、下划线和连字符，已自动生成新 id。');
        id = '';
      }
      if (!id) {
        do { id = uniqueId(); } while (usedIds[id]);
      } else if (incomingIds[id]) {
        warnings.push(label + '：导入数据中 id「' + id + '」重复，已自动生成新 id。');
        do { id = uniqueId(); } while (usedIds[id] || incomingIds[id]);
      }
      usedIds[id] = true;
      incomingIds[id] = true;

      var tagsValue = raw.tags;
      var tags;
      if (Array.isArray(tagsValue)) {
        tags = tagsValue.map(function (tag) { return String(tag).trim(); }).filter(Boolean);
      } else {
        tags = String(tagsValue || '').split(/[,，、;；]/).map(function (tag) { return tag.trim(); }).filter(Boolean);
      }
      tags = tags.filter(function (tag, tagIndex) { return tags.indexOf(tag) === tagIndex; }).slice(0, 20);

      normalized.push({
        id: id,
        chapterId: chapterId,
        type: type,
        difficulty: difficulty,
        stem: stem,
        answer: toText(raw.answer).trim(),
        solution: toText(raw.solution != null ? raw.solution : (raw.analysis != null ? raw.analysis : raw.explanation)).trim(),
        tags: tags,
        source: toText(raw.source != null ? raw.source : raw.origin).trim(),
        createdAt: toIsoDate(raw.createdAt, now),
        updatedAt: now
      });
    });

    return { questions: normalized, errors: errors, warnings: warnings };
  }

  function getSelectedImportMode() {
    var checked = document.querySelector('input[name="import-mode"]:checked');
    return checked && checked.value === 'replace' ? 'replace' : 'merge';
  }

  function applyImport(normalized, mode, sourceLabel) {
    var added = 0;
    var updated = 0;

    if (mode === 'replace') {
      state.questions = normalized.questions.slice();
      added = state.questions.length;
    } else {
      var byId = {};
      var next = state.questions.slice();
      next.forEach(function (question, index) { byId[question.id] = index; });
      normalized.questions.forEach(function (question) {
        if (Object.prototype.hasOwnProperty.call(byId, question.id)) {
          next[byId[question.id]] = question;
          updated += 1;
        } else {
          byId[question.id] = next.length;
          next.push(question);
          added += 1;
        }
      });
      state.questions = next;
    }

    var saved = persistBank();
    if (sourceLabel === '内置题库') rememberBuiltinSeen(normalized.questions);
    applyLatexMigrations();
    refreshAll();

    var report = '<strong>导入完成</strong><p>' +
      (sourceLabel ? escapeHtml(sourceLabel) + '：' : '') +
      (mode === 'replace'
        ? '已覆盖原题库，导入 ' + added + ' 道题。'
        : '新增 ' + added + ' 道题' + (updated ? '，更新 ' + updated + ' 道题' : '') + '。') +
      '当前题库共 ' + state.questions.length + ' 道。</p>';

    if (normalized.errors.length) {
      report += '<p>跳过 ' + normalized.errors.length + ' 条未通过校验的数据：</p><ul>' +
        normalized.errors.slice(0, 6).map(function (message) { return '<li>' + escapeHtml(message) + '</li>'; }).join('') +
        (normalized.errors.length > 6 ? '<li>……另有 ' + (normalized.errors.length - 6) + ' 条</li>' : '') +
        '</ul>';
    }
    if (normalized.warnings.length) {
      report += '<p>有 ' + normalized.warnings.length + ' 条提示：</p><ul>' +
        normalized.warnings.slice(0, 6).map(function (message) { return '<li>' + escapeHtml(message) + '</li>'; }).join('') +
        (normalized.warnings.length > 6 ? '<li>……另有 ' + (normalized.warnings.length - 6) + ' 条</li>' : '') +
        '</ul>';
    }
    if (!saved) {
      report += '<p>注意：本次改动未能写入浏览器存储，请立即导出备份。</p>';
    }
    showImportReport(report, false);
    toast(saved ? '导入完成。' : '题目已导入到内存，但未能写入本地存储。', saved ? 'success' : 'warn');
    window.setTimeout(function () {
      var target = $('#import-report');
      if (target && !target.hidden) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 90);
  }

  function prepareImport(text, sourceLabel) {
    var cleaned = String(text || '').replace(/^\uFEFF/, '');
    if (!cleaned.trim()) {
      toast('没有可导入的内容。', 'warn');
      return;
    }
    var parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (error) {
      showImportReport('<strong>导入失败</strong><p>JSON 格式有误：' +
        escapeHtml(error.message) + '</p>', true);
      toast('JSON 格式有误，请检查后重试。', 'error');
      return;
    }

    var normalized;
    try {
      normalized = normalizeImportPayload(parsed);
    } catch (error) {
      showImportReport('<strong>导入失败</strong><p>' + escapeHtml(error.message) + '</p>', true);
      toast('导入失败：' + error.message, 'error');
      return;
    }

    if (!normalized.questions.length) {
      var errorList = normalized.errors.slice(0, 8).map(function (message) {
        return '<li>' + escapeHtml(message) + '</li>';
      }).join('');
      showImportReport('<strong>没有可导入的题目</strong><ul>' + errorList + '</ul>', true);
      toast('没有通过校验的题目。', 'error');
      return;
    }

    var mode = getSelectedImportMode();
    var countNow = state.questions.length;
    var detailLines = [];
    if (mode === 'replace') {
      detailLines.push('覆盖模式会删除当前题库中的 ' + countNow + ' 道题。');
    }
    if (normalized.errors.length) {
      detailLines.push('有 ' + normalized.errors.length + ' 条数据未通过校验，将被跳过。');
    }
    if (normalized.warnings.length) {
      detailLines.push('有 ' + normalized.warnings.length + ' 条格式提示，导入时会自动修正。');
    }
    detailLines.push('来源：' + (sourceLabel || '粘贴的 JSON'));

    openConfirm({
      title: mode === 'replace' ? '覆盖题库并导入' : '导入题库',
      message: '解析到 ' + normalized.questions.length + ' 道可用题目。确定以「' +
        (mode === 'replace' ? '覆盖' : '合并') + '」方式导入吗？',
      detail: detailLines.join('\n'),
      confirmLabel: mode === 'replace' ? '覆盖并导入' : '确认导入',
      danger: mode === 'replace',
      footnote: '导入后仍可继续编辑',
      onConfirm: function () {
        applyImport(normalized, mode, sourceLabel);
        $('#import-file').value = '';
        if (sourceLabel !== '内置题库' && sourceLabel !== '粘贴的 JSON') {
          $('#import-text').value = '';
        } else if (sourceLabel === '粘贴的 JSON') {
          $('#import-text').value = '';
        }
      }
    });
  }

  function readImportFile(file) {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      toast('文件超过 8 MB，建议拆分后再导入。', 'error');
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      prepareImport(String(reader.result || ''), file.name);
    };
    reader.onerror = function () {
      showImportReport('<strong>读取失败</strong><p>无法读取所选文件。</p>', true);
      toast('无法读取文件。', 'error');
    };
    reader.readAsText(file, 'utf-8');
  }

  function loadDemoQuestions() {
    var demo = Array.isArray(window.TJ_DEMO_QUESTIONS) ? window.TJ_DEMO_QUESTIONS : [];
    if (!demo.length) {
      toast('演示题数据不可用。', 'warn');
      return;
    }
    var normalized;
    try {
      normalized = normalizeImportPayload(demo);
    } catch (error) {
      toast('演示题载入失败：' + error.message, 'error');
      return;
    }
    var existing = {};
    state.questions.forEach(function (question) { existing[question.id] = true; });
    var fresh = normalized.questions.filter(function (question) { return !existing[question.id]; });
    if (!fresh.length) {
      toast('演示题已经在题库中。', 'info');
      return;
    }
    state.questions = state.questions.concat(fresh);
    var saved = persistBank();
    refreshAll();
    toast(saved ? '已加入 ' + fresh.length + ' 道演示题。' : '演示题已加入内存，但未能保存。', saved ? 'success' : 'warn');
  }

  function requestBuiltinMerge() {
    var builtin = Array.isArray(window.TJ_BUILTIN_QUESTIONS) ? window.TJ_BUILTIN_QUESTIONS : [];
    if (!builtin.length) {
      toast('内置题库为空。可把题目写入 data/questions.js 后刷新页面。', 'info');
      return;
    }
    var normalized;
    try {
      normalized = normalizeImportPayload(builtin);
    } catch (error) {
      toast('内置题库解析失败：' + error.message, 'error');
      return;
    }
    if (!normalized.questions.length) {
      toast('内置题库里没有可用题目。', 'warn');
      return;
    }
    openConfirm({
      title: '合并内置题库',
      message: '内置题库有 ' + normalized.questions.length + ' 道题。合并后，相同 id 会覆盖当前版本。',
      detail: '如果你已经修改过同名题目，请先导出备份。',
      confirmLabel: '合并',
      footnote: '这个操作不会删除其他题目',
      onConfirm: function () {
        applyImport(normalized, 'merge', '内置题库');
      }
    });
  }

  function requestClearBank() {
    if (!state.questions.length) {
      toast('题库已经是空的。', 'info');
      return;
    }
    openConfirm({
      title: '清空题库',
      message: '确定删除当前浏览器中的全部 ' + state.questions.length + ' 道题吗？',
      detail: '这个操作不可撤销。建议先在「导出与备份」中下载 JSON。',
      confirmLabel: '清空题库',
      danger: true,
      footnote: '只影响当前浏览器',
      onConfirm: function () {
        state.questions = [];
        state.expandedAnswers.clear();
        state.compose.items = [];
        state.compose.composedAt = null;
        state.compose.requestedCount = 0;
        state.compose.shortfall = 0;
        var saved = persistBank();
        refreshAll();
        toast(saved ? '题库已清空。' : '题库已清空，但未能写入本地存储。', saved ? 'info' : 'warn');
      }
    });
  }

  /* --------------------------- 全量刷新 --------------------------- */

  function refreshAll() {
    renderChapterNav();
    renderBank();
    renderComposeFilters();
    updateComposeAvailability();
    renderPaper();
    renderData();
    updateBuiltinInfo();
    updateStorageMeta();
  }

  /* --------------------------- 内置题同步 --------------------------- */

  function getBuiltinRaw() {
    return Array.isArray(window.TJ_BUILTIN_QUESTIONS) ? window.TJ_BUILTIN_QUESTIONS : [];
  }

  function rememberBuiltinSeen(questions) {
    var seen = STORE.loadBuiltinSeen() || [];
    (questions || []).forEach(function (question) {
      if (question && question.id && seen.indexOf(question.id) === -1) seen.push(question.id);
    });
    STORE.saveBuiltinSeen(seen);
  }

  /*
   * 内置题库同步规则：
   * - 第一次打开：全部载入；
   * - 已有题库：只补入从未出现过的新题；
   * - 用户删掉过的内置题（id 已记录）不再自动加回；
   * - 主动清空题库后不自动重新载入，需要到「数据」页手动合并。
   * 修改已有内置题的内容仍需手动「合并内置题库」。
   */
  function syncBuiltinQuestions(loaded) {
    if (loaded.error) return;
    var raw = getBuiltinRaw();
    if (!raw.length) return;

    var normalized;
    try {
      normalized = normalizeImportPayload(raw);
    } catch (error) {
      console.warn('内置题库未能读取：', error);
      return;
    }
    if (!normalized.questions.length) return;

    var firstRun = !loaded.savedAt && !state.questions.length;
    var canAutoAdd = firstRun || state.questions.length > 0;
    var seen = STORE.loadBuiltinSeen();
    var seenMap = Object.create(null);
    (seen || []).forEach(function (id) { seenMap[id] = true; });

    var present = Object.create(null);
    state.questions.forEach(function (question) { present[question.id] = true; });

    var toAdd = [];
    if (canAutoAdd) {
      normalized.questions.forEach(function (question) {
        if (present[question.id]) return;
        if (!firstRun && seenMap[question.id]) return;
        toAdd.push(question);
      });
    }

    if (toAdd.length) {
      state.questions = state.questions.concat(toAdd);
      var saveResult = STORE.save(state.questions);
      if (saveResult.ok) {
        state.lastSavedAt = saveResult.savedAt;
      } else if (loaded.available) {
        showStorageWarning(saveResult.error);
      }
    }

    var seenIds = seen ? seen.slice() : [];
    normalized.questions.forEach(function (question) {
      if (seenIds.indexOf(question.id) === -1) seenIds.push(question.id);
    });
    STORE.saveBuiltinSeen(seenIds);
  }

  /*
   * 第一批内置题曾按中等/较难录入；用户确认它们都是教材基础题。
   * 这里做一次性的难度修正，只改内置题的 difficulty，不动题干和其他字段，
   * 也不会影响之后用户手动设置的新难度。
   */
  function applyBasicDifficultyMigration() {
    var flagKey = 'tj-math-bank.difficulty-basic.v1';
    var firstBatchIds = {
      'ch01-001': true, 'ch01-002': true, 'ch01-003': true, 'ch01-004': true, 'ch01-005': true,
      'ch01-006': true, 'ch01-007': true, 'ch01-008': true, 'ch01-009': true, 'ch01-010': true
    };
    try {
      if (window.localStorage.getItem(flagKey) === '1') return;

      var changed = false;
      state.questions.forEach(function (question) {
        if (firstBatchIds[question.id] && Number(question.difficulty) !== 1) {
          question.difficulty = 1;
          question.updatedAt = new Date().toISOString();
          changed = true;
        }
      });

      if (changed) {
        var result = STORE.save(state.questions);
        if (!result.ok) {
          showStorageWarning(result.error);
          return;
        }
        state.lastSavedAt = result.savedAt;
      }
      window.localStorage.setItem(flagKey, '1');
    } catch (error) {
      console.warn('难度修正未能完成：', error);
    }
  }

  /*
   * 第一章至第三章从线性文本迁移为 LaTeX。
   * 只替换仍与迁移前原文一致的题目；用户改过的题目保持原样，避免覆盖。
   */
  function applyLatexMigrations() {
    var maps = [
      window.TJ_CH01_LATEX,
      window.TJ_CH02_LATEX,
      window.TJ_CH03_LATEX
    ].filter(Boolean);
    var changed = false;
    maps.forEach(function (map) {
      state.questions.forEach(function (question) {
        var entry = map[question.id];
        if (!entry) return;
        var stem = String(question.stem || '');
        var answer = String(question.answer || '');
        var solution = String(question.solution || '');
        var alreadyMigrated = stem === entry.stem && answer === entry.answer && solution === entry.solution;
        var stillPlain = stem === entry.plainStem && answer === entry.plainAnswer && solution === entry.plainSolution;

        if (alreadyMigrated) {
          if (question.stemPlain !== entry.plainStem ||
              question.answerPlain !== entry.plainAnswer ||
              question.solutionPlain !== entry.plainSolution) {
            question.stemPlain = entry.plainStem;
            question.answerPlain = entry.plainAnswer;
            question.solutionPlain = entry.plainSolution;
            changed = true;
          }
          return;
        }

        if (!stillPlain) return; // 用户改过内容，交给用户自己维护

        question.stem = entry.stem;
        question.answer = entry.answer;
        question.solution = entry.solution;
        question.stemPlain = entry.plainStem;
        question.answerPlain = entry.plainAnswer;
        question.solutionPlain = entry.plainSolution;
        changed = true;
      });
    });

    // 修正早期转换留下的 e^(-x)、cosx、\lim (x→0) 等写法；对已有本地数据也生效。
    state.questions.forEach(function (question) {
      ['stem', 'answer', 'solution'].forEach(function (field) {
        var original = String(question[field] || '');
        var fixed = polishLatex(original);
        if (fixed !== original) {
          question[field] = fixed;
          changed = true;
        }
      });
    });

    if (changed) {
      var result = STORE.save(state.questions);
      if (!result.ok) {
        showStorageWarning(result.error);
        return;
      }
      state.lastSavedAt = result.savedAt;
    }
  }

  /* --------------------------- 事件绑定 --------------------------- */

  function bindEvents() {
    $$('.nav-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        navigate(tab.getAttribute('data-view'));
      });
    });
    window.addEventListener('hashchange', handleRoute);
    $('#brand-home').addEventListener('click', function (event) {
      event.preventDefault();
      navigate('bank');
    });

    $('#btn-add-question').addEventListener('click', function () { openQuestionDialog(null); });

    $('.chapter-scroll').addEventListener('click', function (event) {
      var button = event.target.closest('[data-chapter-filter]');
      if (button) setChapterFilter(button.getAttribute('data-chapter-filter'));
    });

    $('#search-input').addEventListener('input', function (event) {
      state.bankFilter.query = event.target.value;
      renderBank();
    });
    $('#btn-clear-search').addEventListener('click', function () {
      state.bankFilter.query = '';
      $('#search-input').value = '';
      renderBank();
      $('#search-input').focus();
    });
    $('#filter-type').addEventListener('change', function (event) {
      state.bankFilter.type = event.target.value;
      renderBank();
    });
    $('#filter-difficulty').addEventListener('change', function (event) {
      state.bankFilter.difficulty = event.target.value;
      renderBank();
    });
    $('#filter-sort').addEventListener('change', function (event) {
      state.bankFilter.sort = event.target.value;
      renderBank();
    });
    $('#btn-reset-filters').addEventListener('click', resetBankFilters);

    $('#question-list').addEventListener('click', function (event) {
      var emptyAction = event.target.closest('[data-empty-action]');
      if (emptyAction) {
        var action = emptyAction.getAttribute('data-empty-action');
        if (action === 'add') openQuestionDialog(null);
        if (action === 'demo') loadDemoQuestions();
        if (action === 'builtin') requestBuiltinMerge();
        if (action === 'reset') resetBankFilters();
        if (action === 'import') {
          navigate('data');
          window.setTimeout(function () {
            $('#import-text').scrollIntoView({ behavior: 'smooth', block: 'center' });
            $('#import-text').focus({ preventScroll: true });
          }, 100);
        }
        return;
      }

      var card = event.target.closest('.question-card');
      if (!card) return;
      var id = card.getAttribute('data-question-id');
      var question = findQuestion(id);
      if (!question) return;
      var actionButton = event.target.closest('[data-action]');
      if (!actionButton) return;
      var questionAction = actionButton.getAttribute('data-action');
      if (questionAction === 'toggle-answer') {
        if (state.expandedAnswers.has(id)) state.expandedAnswers.delete(id);
        else state.expandedAnswers.add(id);
        renderBank();
      } else if (questionAction === 'edit') {
        openQuestionDialog(question);
      } else if (questionAction === 'delete') {
        requestDeleteQuestion(question);
      }
    });

    $('#compose-chapters').addEventListener('change', function (event) {
      var input = event.target.closest('input[data-compose-chapter]');
      if (!input) return;
      var id = input.getAttribute('data-compose-chapter');
      if (input.checked) state.compose.chapters.add(id);
      else state.compose.chapters.delete(id);
      updateComposeAvailability();
    });
    $('#compose-types').addEventListener('change', function (event) {
      var input = event.target.closest('input[data-compose-type]');
      if (!input) return;
      var type = input.getAttribute('data-compose-type');
      if (input.checked) state.compose.types.add(type);
      else state.compose.types.delete(type);
      updateComposeAvailability();
    });
    $('#compose-difficulties').addEventListener('change', function (event) {
      var input = event.target.closest('input[data-compose-difficulty]');
      if (!input) return;
      var level = Number(input.getAttribute('data-compose-difficulty'));
      if (input.checked) state.compose.difficulties.add(level);
      else state.compose.difficulties.delete(level);
      updateComposeAvailability();
    });

    $$('[data-chapter-scope]').forEach(function (button) {
      button.addEventListener('click', function () {
        var scope = button.getAttribute('data-chapter-scope');
        state.compose.chapters.clear();
        if (scope === 'all') {
          CHAPTERS.forEach(function (chapter) { state.compose.chapters.add(chapter.id); });
        } else if (scope === 'upper' || scope === 'lower') {
          CHAPTERS.filter(function (chapter) { return chapter.volume === (scope === 'upper' ? '上册' : '下册'); })
            .forEach(function (chapter) { state.compose.chapters.add(chapter.id); });
        }
        renderComposeFilters();
        updateComposeAvailability();
      });
    });

    $('#compose-count').addEventListener('input', updateComposeAvailability);
    $('#compose-count').addEventListener('change', function () {
      var value = parseCountInput();
      if (value == null) {
        $('#compose-count').value = '1';
      }
      updateComposeAvailability();
    });
    $$('[data-count-step]').forEach(function (button) {
      button.addEventListener('click', function () {
        var step = Number(button.getAttribute('data-count-step'));
        var current = parseCountInput() || 1;
        $('#compose-count').value = String(clamp(current + step, 1, 999));
        updateComposeAvailability();
      });
    });

    $('#btn-compose').addEventListener('click', composePaper);

    $('#paper-title-input').addEventListener('input', function (event) {
      state.compose.title = event.target.value;
      if (state.compose.items.length) updatePaperHeading();
    });
    $('#paper-subtitle-input').addEventListener('input', function (event) {
      state.compose.subtitle = event.target.value;
      if (state.compose.items.length) updatePaperHeading();
    });
    $('#opt-show-answers').addEventListener('change', function (event) {
      state.compose.includeAnswers = event.target.checked;
      var solutions = $('#opt-show-solutions');
      var row = $('#opt-solutions-row');
      if (!event.target.checked) {
        solutions.checked = false;
        state.compose.includeSolutions = false;
      }
      solutions.disabled = !event.target.checked;
      row.classList.toggle('is-disabled', !event.target.checked);
      if (state.compose.items.length) renderPaper();
    });
    $('#opt-show-solutions').addEventListener('change', function (event) {
      state.compose.includeSolutions = event.target.checked;
      if (state.compose.items.length) renderPaper();
    });
    $('#opt-answer-space').addEventListener('change', function (event) {
      state.compose.includeSpace = event.target.checked;
      if (state.compose.items.length) renderPaper();
    });

    $('#paper-body').addEventListener('click', function (event) {
      var button = event.target.closest('[data-paper-action]');
      if (!button) return;
      var index = Number(button.getAttribute('data-index'));
      if (button.getAttribute('data-paper-action') === 'replace') replacePaperItem(index);
      if (button.getAttribute('data-paper-action') === 'remove') removePaperItem(index);
    });
    $('#btn-clear-paper').addEventListener('click', clearPaper);
    $('#btn-print-paper').addEventListener('click', printPaper);
    $('#btn-export-word').addEventListener('click', exportWord);

    $('#btn-export-json').addEventListener('click', exportBank);
    $('#btn-export-template').addEventListener('click', downloadTemplate);
    $('#btn-load-demo').addEventListener('click', loadDemoQuestions);
    $('#btn-merge-builtin').addEventListener('click', requestBuiltinMerge);
    $('#btn-clear-bank').addEventListener('click', requestClearBank);

    $('#import-file').addEventListener('change', function (event) {
      var file = event.target.files && event.target.files[0];
      readImportFile(file);
      event.target.value = '';
    });
    var dropzone = $('#dropzone');
    ['dragenter', 'dragover'].forEach(function (eventName) {
      dropzone.addEventListener(eventName, function (event) {
        event.preventDefault();
        event.stopPropagation();
        dropzone.classList.add('is-dragover');
      });
    });
    ['dragleave', 'drop'].forEach(function (eventName) {
      dropzone.addEventListener(eventName, function (event) {
        event.preventDefault();
        event.stopPropagation();
        dropzone.classList.remove('is-dragover');
      });
    });
    dropzone.addEventListener('drop', function (event) {
      var files = event.dataTransfer && event.dataTransfer.files;
      if (files && files.length) readImportFile(files[0]);
    });
    dropzone.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        $('#import-file').click();
      }
    });
    $('#btn-import-text').addEventListener('click', function () {
      prepareImport($('#import-text').value, '粘贴的 JSON');
    });

    $$('[data-close-question]').forEach(function (button) {
      button.addEventListener('click', closeQuestionDialog);
    });
    $('#question-form').addEventListener('submit', handleQuestionSubmit);
    $('#question-dialog').addEventListener('close', hideFormError);
    ['question-stem', 'question-answer', 'question-solution'].forEach(function (id) {
      $('#' + id).addEventListener('input', renderMathPreview);
    });
    $('#question-form').addEventListener('keydown', function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        $('#question-form').requestSubmit();
      }
    });

    $('#confirm-ok').addEventListener('click', handleConfirm);
    $('#confirm-cancel').addEventListener('click', closeConfirm);
    $('#confirm-close').addEventListener('click', closeConfirm);
    $('#confirm-dialog').addEventListener('cancel', function () {
      state.confirmHandler = null;
    });
    $('#confirm-dialog').addEventListener('click', function (event) {
      if (event.target === $('#confirm-dialog')) closeConfirm();
    });

    window.addEventListener('storage', function (event) {
      if (event.key !== STORE.KEY) return;
      var loaded = STORE.load();
      if (loaded.error) {
        toast('其他标签页的题库更新读取失败。', 'warn');
        return;
      }
      state.questions = loaded.questions;
      state.lastSavedAt = loaded.savedAt;
      refreshAll();
      toast('题库已在其他标签页更新。', 'info');
    });
  }

  /* --------------------------- 启动 --------------------------- */

  function init() {
    populateStaticSelects();
    var loaded = STORE.load();
    state.questions = loaded.questions || [];
    state.storageAvailable = loaded.available;
    state.lastSavedAt = loaded.savedAt;

    syncBuiltinQuestions(loaded);
    applyBasicDifficultyMigration();
    applyLatexMigrations();

    bindEvents();
    refreshAll();

    if (!loaded.available) {
      showStorageWarning(loaded.error);
    } else if (loaded.error) {
      showStorageWarning(loaded.error);
      toast(loaded.error, 'error');
    }
    if (loaded.dropped) {
      toast('读取本地题库时跳过了 ' + loaded.dropped + ' 条格式不完整的数据。', 'warn');
    }

    var rawHash = location.hash.replace(/^#/, '');
    var initialView = rawHash ? normalizeView(rawHash) : 'bank';
    if (!rawHash || initialView !== rawHash) {
      try {
        history.replaceState(null, '', '#' + initialView);
      } catch (error) {
        // file:// 等环境下如果替换失败，不影响主流程。
      }
    }
    switchView(initialView, { initial: true });
    updateStorageMeta();
  }

  try {
    init();
  } catch (error) {
    console.error(error);
    document.body.insertAdjacentHTML('afterbegin',
      '<div class="storage-warning" style="margin:20px;display:block" role="alert">' +
      '<strong>页面初始化失败：</strong>' + escapeHtml(error.message) +
      '。请用最新版 Chrome / Edge 打开，并确认所有文件完整。</div>');
  }
})();
