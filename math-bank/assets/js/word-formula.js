/*
 * 把 LaTeX 公式渲染成 PNG，供 Word 内嵌。
 * MathJax 的 tex-svg 包按需加载；渲染结果是 SVG 路径，再栅格化成透明 PNG。
 */
(function (root) {
  'use strict';

  var scriptPromise = null;
  var cache = Object.create(null);
  var SCRIPT_PATH = 'assets/vendor/mathjax/tex-svg.js';
  var SCALE = 4;
  var PX_PER_EX = 8;
  var MAX_WIDTH_PX = 600;

  function ensureMathJax() {
    if (root.MathJax && typeof root.MathJax.tex2svg === 'function') {
      return root.MathJax.startup && root.MathJax.startup.promise
        ? root.MathJax.startup.promise
        : Promise.resolve();
    }
    if (scriptPromise) return scriptPromise;

    root.MathJax = {
      startup: { typeset: false },
      tex: { packages: { '[+]': ['ams', 'newcommand', 'noerrors', 'noundefined'] } },
      svg: { fontCache: 'local' }
    };

    scriptPromise = new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = SCRIPT_PATH;
      script.async = true;
      script.onload = function () {
        var startup = root.MathJax && root.MathJax.startup;
        if (startup && startup.promise) {
          startup.promise.then(resolve, reject);
        } else {
          resolve();
        }
      };
      script.onerror = function () {
        scriptPromise = null;
        reject(new Error('MathJax 加载失败，无法把公式转成 Word 图片。'));
      };
      document.head.appendChild(script);
    });
    return scriptPromise;
  }

  function svgToPng(svg, widthPx, heightPx) {
    return new Promise(function (resolve, reject) {
      var clone = svg.cloneNode(true);
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      clone.setAttribute('width', String(Math.max(1, Math.round(widthPx * SCALE))));
      clone.setAttribute('height', String(Math.max(1, Math.round(heightPx * SCALE))));
      clone.style.color = '#111111';
      var source = new XMLSerializer().serializeToString(clone);
      var image = new Image();
      image.onload = function () {
        try {
          var canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(widthPx * SCALE));
          canvas.height = Math.max(1, Math.round(heightPx * SCALE));
          var context = canvas.getContext('2d');
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/png'));
        } catch (error) {
          reject(error);
        }
      };
      image.onerror = function () {
        reject(new Error('公式 SVG 转 PNG 失败。'));
      };
      image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
    });
  }

  async function render(latex, displayMode) {
    var source = String(latex == null ? '' : latex).trim();
    if (!source) throw new Error('空公式。');
    var key = (displayMode ? 'D:' : 'I:') + source;
    if (cache[key]) return cache[key];

    await ensureMathJax();
    if (!root.MathJax || typeof root.MathJax.tex2svg !== 'function') {
      throw new Error('MathJax 尚未就绪。');
    }

    var node;
    try {
      node = root.MathJax.tex2svg(source, { display: Boolean(displayMode) });
    } catch (error) {
      throw new Error('公式解析失败：' + source);
    }
    var svg = node && (node.tagName === 'svg' ? node : node.querySelector('svg'));
    if (!svg) throw new Error('公式没有生成 SVG。');

    var wEx = parseFloat(svg.getAttribute('width'));
    var hEx = parseFloat(svg.getAttribute('height'));
    if (!isFinite(wEx) || wEx <= 0 || !isFinite(hEx) || hEx <= 0) {
      throw new Error('公式尺寸无效。');
    }

    var widthPx = wEx * PX_PER_EX;
    var heightPx = hEx * PX_PER_EX;
    if (widthPx > MAX_WIDTH_PX) {
      var ratio = MAX_WIDTH_PX / widthPx;
      widthPx = MAX_WIDTH_PX;
      heightPx = heightPx * ratio;
    }
    widthPx = Math.max(8, widthPx);
    heightPx = Math.max(8, heightPx);

    var dataUrl = await svgToPng(svg, widthPx, heightPx);
    var result = {
      dataUrl: dataUrl,
      widthPx: widthPx,
      heightPx: heightPx,
      alt: source
    };
    cache[key] = result;
    return result;
  }

  root.TJWordFormula = {
    ensure: ensureMathJax,
    render: render
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
