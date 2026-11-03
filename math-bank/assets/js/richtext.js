/*
 * 轻量数学文本格式：换行 + 上下标
 * 支持 x^{2}、a_{n}、x^2、a_n；\^ 与 \_ 表示原样字符。
 * 不解析 LaTeX 命令，其余公式使用 Unicode 数学符号。
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.TJText = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function parseScript(input, index) {
    var next = input.charAt(index + 1);
    if (next === '{') {
      var end = input.indexOf('}', index + 2);
      if (end !== -1) {
        return { content: input.slice(index + 2, end), end: end + 1 };
      }
      return null;
    }
    if (/^[0-9]/.test(next)) {
      var digits = input.slice(index + 1).match(/^[0-9]+/);
      if (digits) {
        return { content: digits[0], end: index + 1 + digits[0].length };
      }
    }
    if (/^[+\-−]/.test(next) && /^[0-9]/.test(input.charAt(index + 2))) {
      var signed = input.slice(index + 1).match(/^[+\-−][0-9]+/);
      if (signed) {
        return { content: signed[0], end: index + 1 + signed[0].length };
      }
    }
    if (next && !/\s/.test(next)) {
      return { content: next, end: index + 2 };
    }
    return null;
  }

  /*
   * 返回片段数组：
   * { type: 'text', text } / { type: 'sup', text } / { type: 'sub', text } / { type: 'break' }
   */
  function parse(input) {
    var text = String(input == null ? '' : input);
    var segments = [];
    var buffer = '';
    var i = 0;

    function flush() {
      if (buffer) {
        segments.push({ type: 'text', text: buffer });
        buffer = '';
      }
    }

    while (i < text.length) {
      var ch = text.charAt(i);

      if (ch === '\\' && (text.charAt(i + 1) === '^' || text.charAt(i + 1) === '_')) {
        buffer += text.charAt(i + 1);
        i += 2;
        continue;
      }

      if (ch === '^' || ch === '_') {
        var script = parseScript(text, i);
        if (script) {
          flush();
          segments.push({
            type: ch === '^' ? 'sup' : 'sub',
            text: script.content
          });
          i = script.end;
          continue;
        }
      }

      if (ch === '\r') {
        i += 1;
        continue;
      }

      if (ch === '\n') {
        flush();
        segments.push({ type: 'break' });
        i += 1;
        continue;
      }

      buffer += ch;
      i += 1;
    }

    flush();
    return segments;
  }

  function toHtml(input) {
    return parse(input).map(function (segment) {
      if (segment.type === 'break') return '<br>';
      if (segment.type === 'sup') return '<sup>' + escapeHtml(segment.text) + '</sup>';
      if (segment.type === 'sub') return '<sub>' + escapeHtml(segment.text) + '</sub>';
      return escapeHtml(segment.text);
    }).join('');
  }

  function toPlain(input) {
    return parse(input).map(function (segment) {
      if (segment.type === 'break') return '\n';
      return segment.text;
    }).join('');
  }

  return {
    parse: parse,
    toHtml: toHtml,
    toPlain: toPlain,
    escapeHtml: escapeHtml
  };
});
