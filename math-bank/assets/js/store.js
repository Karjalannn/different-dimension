/*
 * 题库的本地存储层。
 * 数据保存在当前浏览器的 localStorage 中；同一份 HTML 路径对应同一份数据。
 * 清空浏览器站点数据、更换浏览器或移动文件夹都可能让数据不可见，请定期导出 JSON。
 */
(function (root) {
  'use strict';

  var KEY = 'tj-math-bank.state.v1';
  var SEEN_KEY = 'tj-math-bank.builtin-seen.v1';
  var VERSION = 1;
  var storageAvailable = false;

  try {
    var probe = '__tj_math_bank_probe__';
    root.localStorage.setItem(probe, '1');
    root.localStorage.removeItem(probe);
    storageAvailable = true;
  } catch (error) {
    storageAvailable = false;
  }

  function normalizeQuestion(raw) {
    if (!raw || typeof raw !== 'object') return null;
    if (!raw.id || !raw.stem || !raw.chapterId) return null;
    if (!root.TJ.chapterMap || !root.TJ.chapterMap[raw.chapterId]) return null;
    return raw;
  }

  function load() {
    if (!storageAvailable) {
      return {
        questions: [],
        savedAt: null,
        available: false,
        error: '浏览器禁用了本地存储，本次改动只保留在内存中。',
        dropped: 0
      };
    }

    var raw;
    try {
      raw = root.localStorage.getItem(KEY);
    } catch (error) {
      return {
        questions: [],
        savedAt: null,
        available: false,
        error: '读取本地存储失败：' + error.message,
        dropped: 0
      };
    }

    if (!raw) {
      return { questions: [], savedAt: null, available: true, error: null, dropped: 0 };
    }

    try {
      var parsed = JSON.parse(raw);
      var list = Array.isArray(parsed) ? parsed : (parsed && Array.isArray(parsed.questions) ? parsed.questions : null);
      if (!list) throw new Error('数据格式无法识别');
      var valid = [];
      var dropped = 0;
      list.forEach(function (item) {
        var question = normalizeQuestion(item);
        if (question) valid.push(question);
        else dropped += 1;
      });
      return {
        questions: valid,
        savedAt: parsed && parsed.savedAt ? parsed.savedAt : null,
        available: true,
        error: null,
        dropped: dropped
      };
    } catch (error) {
      return {
        questions: [],
        savedAt: null,
        available: true,
        error: '本地题库读取失败：' + error.message,
        dropped: 0
      };
    }
  }

  function save(questions) {
    if (!storageAvailable) {
      return { ok: false, error: '浏览器禁用了本地存储，请及时导出 JSON 备份。' };
    }
    try {
      var payload = {
        version: VERSION,
        savedAt: new Date().toISOString(),
        questions: questions
      };
      root.localStorage.setItem(KEY, JSON.stringify(payload));
      return { ok: true, savedAt: payload.savedAt, error: null };
    } catch (error) {
      var message = error && error.name === 'QuotaExceededError'
        ? '本地存储空间不足。请先导出 JSON 备份，再清理部分题目。'
        : '写入本地存储失败：' + (error && error.message ? error.message : '未知错误');
      return { ok: false, error: message };
    }
  }

  /*
   * 记录已经出现过的内置题目 id。
   * 新增的内置题可以在刷新后自动补入；用户删掉过的内置题因为 id 已记录，
   * 不会被下一次自动同步重新加回来。
   */
  function loadBuiltinSeen() {
    if (!storageAvailable) return null;
    try {
      var raw = root.localStorage.getItem(SEEN_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return null;
      return parsed.filter(function (id) { return typeof id === 'string'; });
    } catch (error) {
      return null;
    }
  }

  function saveBuiltinSeen(ids) {
    if (!storageAvailable) return false;
    try {
      var seen = [];
      (ids || []).forEach(function (id) {
        if (typeof id === 'string' && seen.indexOf(id) === -1) seen.push(id);
      });
      root.localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
      return true;
    } catch (error) {
      return false;
    }
  }

  function usageBytes(questions) {
    try {
      return new Blob([JSON.stringify({
        version: VERSION,
        savedAt: new Date().toISOString(),
        questions: questions
      })]).size;
    } catch (error) {
      return JSON.stringify(questions).length * 2;
    }
  }

  root.TJStore = {
    KEY: KEY,
    SEEN_KEY: SEEN_KEY,
    VERSION: VERSION,
    storageAvailable: storageAvailable,
    load: load,
    save: save,
    loadBuiltinSeen: loadBuiltinSeen,
    saveBuiltinSeen: saveBuiltinSeen,
    usageBytes: usageBytes
  };
})(window);
