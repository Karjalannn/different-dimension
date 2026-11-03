/*
 * 公式渲染：文本中可用 $...$、$$...$$、\(...\)、\[...\] 写 LaTeX。
 * 数学片段交给离线 KaTeX，非数学片段继续走 TJText（换行 + 上下标）。
 */
(function (root, factory) {
  var api = factory(root);
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.TJMath = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  var FALLBACK = root.TJText || {
    escapeHtml: function (value) {
      return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    },
    toHtml: function (value) { return String(value == null ? '' : value); }
  };

  function escapeHtml(value) {
    return FALLBACK.escapeHtml(value);
  }

  function katexRender(source, displayMode) {
    var katex = root.katex;
    if (!katex || typeof katex.renderToString !== 'function') {
      return '<span class="math-error">' + escapeHtml(source) + '</span>';
    }
    try {
      return katex.renderToString(source, {
        displayMode: Boolean(displayMode),
        throwOnError: false,
        strict: 'ignore',
        trust: false,
        output: 'htmlAndMathml'
      });
    } catch (error) {
      return '<span class="math-error" title="' + escapeHtml(error && error.message ? error.message : '公式解析失败') + '">' +
        escapeHtml(source) + '</span>';
    }
  }

  function mathHtml(source, displayMode) {
    var html = katexRender(source, displayMode);
    return '<span class="math-inline' + (displayMode ? ' math-display' : '') + '">' + html + '</span>';
  }

  function textHtml(source) {
    return FALLBACK.toHtml(source);
  }

  function findClosing(text, start, open, close) {
    var index = start;
    while (index < text.length) {
      var found = text.indexOf(close, index);
      if (found === -1) return -1;
      // 跳过被反斜杠转义的结束符
      var slashes = 0;
      var cursor = found - 1;
      while (cursor >= 0 && text.charAt(cursor) === '\\') {
        slashes += 1;
        cursor -= 1;
      }
      if (slashes % 2 === 0) return found;
      index = found + close.length;
    }
    return -1;
  }

  function parse(input) {
    var text = String(input == null ? '' : input);
    var segments = [];
    var buffer = '';
    var i = 0;

    function flushText() {
      if (buffer) {
        segments.push({ type: 'text', text: buffer });
        buffer = '';
      }
    }

    while (i < text.length) {
      var ch = text.charAt(i);

      if (ch === '\\' && text.charAt(i + 1) === '$') {
        buffer += '$';
        i += 2;
        continue;
      }

      var displayMode = false;
      var open = '';
      var close = '';

      if (text.slice(i, i + 2) === '$$') {
        open = '$$';
        close = '$$';
        displayMode = true;
      } else if (ch === '$') {
        open = '$';
        close = '$';
        displayMode = false;
      } else if (text.slice(i, i + 2) === '\\(') {
        open = '\\(';
        close = '\\)';
        displayMode = false;
      } else if (text.slice(i, i + 2) === '\\[') {
        open = '\\[';
        close = '\\]';
        displayMode = true;
      }

      if (open) {
        var contentStart = i + open.length;
        var end = findClosing(text, contentStart, open, close);
        if (end !== -1) {
          flushText();
          segments.push({ type: 'math', text: text.slice(contentStart, end), display: displayMode });
          i = end + close.length;
          continue;
        }
      }

      buffer += ch;
      i += 1;
    }

    flushText();
    return segments;
  }

  function toHtml(input) {
    return parse(input).map(function (segment) {
      if (segment.type === 'text') return textHtml(segment.text);
      return mathHtml(segment.text, segment.display);
    }).join('');
  }

  function toPlain(input) {
    var text = String(input == null ? '' : input);
    return text
      .replace(/\\\$/g, '$')
      .replace(/\$\$([\s\S]*?)\$\$/g, '$1')
      .replace(/\$([^$\n]*?)\$/g, '$1')
      .replace(/\\\(([\s\S]*?)\\\)/g, '$1')
      .replace(/\\\[([\s\S]*?)\\\]/g, '$1')
      .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)')
      .replace(/\\sqrt\{([^{}]*)\}/g, '√($1)')
      .replace(/\\(sin|cos|tan|cot|sec|csc|ln|log|lim|sum|int|infty|pi|alpha|beta|gamma|theta|lambda|mu|sigma|phi|omega|to|le|ge|ne|in|cdot|times)/g, function (_, command) {
        var map = {
          sin: 'sin', cos: 'cos', tan: 'tan', cot: 'cot', sec: 'sec', csc: 'csc',
          ln: 'ln', log: 'log', lim: 'lim', sum: '∑', int: '∫', infty: '∞',
          pi: 'π', alpha: 'α', beta: 'β', gamma: 'γ', theta: 'θ', lambda: 'λ',
          mu: 'μ', sigma: 'σ', phi: 'φ', omega: 'ω', to: '→', le: '≤',
          ge: '≥', ne: '≠', in: '∈', cdot: '·', times: '×'
        };
        return map[command] || command;
      })
      .replace(/\\[a-zA-Z]+/g, '')
      .replace(/[{}]/g, '');
  }

  /*
   * 修正早期线性文本转换中常见的写法：
   * e^(-x)、x^(1/3)、cosx、\lim (x→0) → e^{-x}、x^{1/3}、\cos x、\lim_{x→0}
   * 只处理 $...$ 内的数学片段，普通中文/英文保持原样。
   */
  function polishMath(input) {
    var s = String(input == null ? '' : input);
    var previous = null;
    while (previous !== s) {
      previous = s;
      s = s.replace(/\^\(([^()]*)\)/g, '^{$1}');
    }
    s = s.replace(/(?<!\\)(?<![A-Za-z])(arcsin|arccos|arctan|sinh|cosh|tanh|sin|cos|tan|cot|sec|csc|ln|lg|log)(?=[A-Za-z0-9(])/g, '\\$1 ');
    s = s.replace(/\\lim\s*\(([^()]*(?:\\to|→)[^()]*)\)/g, '\\lim_{$1}');
    return s;
  }

  function polish(input) {
    return parse(input).map(function (segment) {
      if (segment.type === 'text') return segment.text.replace(/\$/g, '\\$');
      var content = polishMath(segment.text);
      return segment.display ? '$$' + content + '$$' : '$' + content + '$';
    }).join('');
  }

  return {
    parse: parse,
    toHtml: toHtml,
    toPlain: toPlain,
    polish: polish,
    escapeHtml: escapeHtml
  };
});

// 页面加载时先把常用数学字体预热，避免公式首次出现时短暂回退到系统字体。
if (typeof document !== 'undefined' && document.fonts && document.fonts.load) {
  try {
    document.fonts.load('16px "KaTeX_Main"').catch(function () { /* 字体不可用时不阻断渲染 */ });
  } catch (error) { /* ignore */ }
}
