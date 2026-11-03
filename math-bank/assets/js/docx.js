/*
 * 客户端的 .docx 生成器（无外部依赖，完全离线）。
 * 只生成组题所需的简单版式：标题、姓名栏、题目、留白、答案与解析、页脚页码。
 * 公式以文本形式呈现，支持本应用的上下标标记。
 */
(function (root, factory) {
  var richtext = root.TJText;
  if (!richtext && typeof require === 'function') {
    try { richtext = require('./richtext.js'); } catch (error) { richtext = null; }
  }
  var api = factory(richtext);
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.TJDocx = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (TJText) {
  'use strict';

  if (!TJText) {
    throw new Error('TJText 未加载，无法生成 Word。');
  }

  var XML_HEADER = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
  var W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
  var R_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  var PKG_REL_NS = 'http://schemas.openxmlformats.org/package/2006/relationships';

  function escapeXml(value) {
    return String(value == null ? '' : value)
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  function runProperties(options) {
    options = options || {};
    var font = options.font || '宋体';
    var latin = options.latin || 'Times New Roman';
    var parts = [];
    parts.push('<w:rFonts w:ascii="' + latin + '" w:hAnsi="' + latin + '" w:eastAsia="' + font + '" w:cs="' + latin + '"/>');
    if (options.bold) parts.push('<w:b/><w:bCs/>');
    if (options.italic) parts.push('<w:i/><w:iCs/>');
    if (options.color) parts.push('<w:color w:val="' + options.color + '"/>');
    var size = options.size || 24;
    parts.push('<w:sz w:val="' + size + '"/><w:szCs w:val="' + size + '"/>');
    if (options.verticalAlign) {
      parts.push('<w:vertAlign w:val="' + options.verticalAlign + '"/>');
    }
    return '<w:rPr>' + parts.join('') + '</w:rPr>';
  }

  function runs(text, options) {
    options = options || {};
    var segments = TJText.parse(text);
    return segments.map(function (segment) {
      if (segment.type === 'break') {
        return '<w:r><w:br/></w:r>';
      }
      var segmentOptions = {};
      Object.keys(options).forEach(function (key) { segmentOptions[key] = options[key]; });
      if (segment.type === 'sup') segmentOptions.verticalAlign = 'superscript';
      if (segment.type === 'sub') segmentOptions.verticalAlign = 'subscript';
      if (!segment.text) return '';
      return '<w:r>' + runProperties(segmentOptions) +
        '<w:t xml:space="preserve">' + escapeXml(segment.text) + '</w:t></w:r>';
    }).join('');
  }

  function imageRun(image, context) {
    if (!context) return runs(image.alt || '', {});
    var id = context.images.length + 1;
    var relId = 'rIdImg' + id;
    var fileName = 'formula' + id + '.png';
    context.images.push({ id: id, relId: relId, fileName: fileName, dataUrl: image.dataUrl });
    var cx = Math.max(1, Math.round(Number(image.widthPx || 12) * 9525));
    var cy = Math.max(1, Math.round(Number(image.heightPx || 12) * 9525));
    return '<w:r><w:drawing>' +
      '<wp:inline distT="0" distB="0" distL="0" distR="0">' +
      '<wp:extent cx="' + cx + '" cy="' + cy + '"/>' +
      '<wp:docPr id="' + id + '" name="Formula ' + id + '"/>' +
      '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">' +
      '<pic:pic>' +
      '<pic:nvPicPr><pic:cNvPr id="' + id + '" name="' + fileName + '"/><pic:cNvPicPr/></pic:nvPicPr>' +
      '<pic:blipFill><a:blip r:embed="' + relId + '"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>' +
      '<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="' + cx + '" cy="' + cy + '"/></a:xfrm>' +
      '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>' +
      '<a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill>' +
      '<a:ln><a:noFill/></a:ln></pic:spPr>' +
      '</pic:pic></a:graphicData></a:graphic>' +
      '</wp:inline></w:drawing></w:r>';
  }

  function partsToXml(parts, options, context) {
    if (!Array.isArray(parts) || !parts.length) return '';
    return parts.map(function (part) {
      if (part && part.type === 'image') return imageRun(part, context);
      return runs(part && part.text ? part.text : '', options);
    }).join('');
  }

  function fieldHasContent(question, field) {
    if (String(question[field] == null ? '' : question[field]).trim()) return true;
    var parts = question[field + 'Parts'];
    return Array.isArray(parts) && parts.length > 0;
  }

  function paragraph(content, options) {
    options = options || {};
    var pPr = [];
    if (options.keepNext) pPr.push('<w:keepNext/>');
    if (options.keepLines) pPr.push('<w:keepLines/>');
    if (options.borderBottom) {
      pPr.push('<w:pBdr><w:bottom w:val="single" w:sz="8" w:space="4" w:color="333333"/></w:pBdr>');
    }
    if (options.spacing !== false) {
      var before = options.before == null ? 0 : options.before;
      var after = options.after == null ? 0 : options.after;
      var line = options.line == null ? 360 : options.line;
      var lineRule = options.lineRule || 'auto';
      pPr.push('<w:spacing w:before="' + before + '" w:after="' + after +
        '" w:line="' + line + '" w:lineRule="' + lineRule + '"/>');
    }
    if (options.indentLeft || options.hanging) {
      var indentLeft = options.indentLeft || 0;
      pPr.push('<w:ind w:left="' + indentLeft + '"' +
        (options.hanging ? ' w:hanging="' + options.hanging + '"' : '') + '/>');
    }
    if (options.align) {
      pPr.push('<w:jc w:val="' + options.align + '"/>');
    }
    return '<w:p>' + (pPr.length ? '<w:pPr>' + pPr.join('') + '</w:pPr>' : '') +
      (content || '') + '</w:p>';
  }

  function pageBreakParagraph() {
    return '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
  }

  function formatDate(value) {
    var date = value instanceof Date ? value : new Date(value || Date.now());
    if (isNaN(date.getTime())) date = new Date();
    return date.getFullYear() + ' 年 ' + (date.getMonth() + 1) + ' 月 ' + date.getDate() + ' 日';
  }

  function buildDocument(paper, context) {
    var questions = Array.isArray(paper.questions) ? paper.questions : [];
    var title = String(paper.title || '高等数学练习卷').trim() || '高等数学练习卷';
    var subtitle = String(paper.subtitle || '').trim();
    var includeAnswers = Boolean(paper.includeAnswers);
    var includeSolutions = includeAnswers && Boolean(paper.includeSolutions);
    var showSolutions = includeSolutions && questions.some(function (question) {
      return fieldHasContent(question, 'solution');
    });
    var includeSpace = paper.includeSpace !== false;
    var generatedAt = paper.generatedAt || new Date().toISOString();
    var body = [];

    body.push(paragraph(
      runs(title, { font: '黑体', latin: 'Times New Roman', size: 44, bold: true }),
      { align: 'center', before: 240, after: 120, line: 300, keepNext: true }
    ));

    if (subtitle) {
      body.push(paragraph(
        runs(subtitle, { font: '楷体', size: 24, color: '555555' }),
        { align: 'center', after: 80, line: 320, keepNext: true }
      ));
    }

    body.push(paragraph(
      runs('共 ' + questions.length + ' 道题　·　' + formatDate(generatedAt),
        { font: '宋体', size: 19, color: '777777' }),
      { align: 'center', after: 120, line: 280, keepNext: true }
    ));

    body.push(paragraph(
      runs('姓名：________________　　学号：________________　　班级：________________',
        { font: '宋体', size: 21 }),
      { align: 'center', after: 140, line: 300, keepNext: true }
    ));

    body.push(paragraph('', {
      borderBottom: true,
      after: 80,
      spacing: false
    }));

    questions.forEach(function (question, index) {
      var stemParts = Array.isArray(question.stemParts) ? question.stemParts : null;
      var content = runs((index + 1) + '．', { font: '宋体', bold: true }) +
        (stemParts
          ? runs(' ', { font: '宋体' }) + partsToXml(stemParts, { font: '宋体' }, context)
          : runs(' ' + String(question.stem || ''), { font: '宋体' }));
      body.push(paragraph(content, {
        keepLines: true,
        keepNext: includeSpace,
        before: index === 0 ? 180 : 260,
        after: 120,
        line: 360,
        indentLeft: 360,
        hanging: 360,
        align: 'left'
      }));
      if (includeSpace) {
        body.push(paragraph('', {
          after: 80,
          line: 720,
          lineRule: 'exact'
        }));
      }
    });

    if (includeAnswers) {
      body.push(pageBreakParagraph());
      body.push(paragraph(
        runs(showSolutions ? '参考答案与解析' : '参考答案',
          { font: '黑体', size: 32, bold: true }),
        { align: 'center', before: 120, after: 220, line: 320, keepNext: true }
      ));

      questions.forEach(function (question, index) {
        var answer = String(question.answer == null ? '' : question.answer).trim() || '略';
        var answerParts = Array.isArray(question.answerParts) ? question.answerParts : null;
        var answerRuns = runs((index + 1) + '．', { font: '宋体', bold: true }) +
          runs('【答案】', { font: '黑体', bold: true }) +
          (answerParts ? partsToXml(answerParts, { font: '宋体' }, context) : runs(answer, { font: '宋体' }));
        if (showSolutions) {
          var solution = String(question.solution == null ? '' : question.solution).trim();
          var solutionParts = Array.isArray(question.solutionParts) ? question.solutionParts : null;
          if (solutionParts || solution) {
            answerRuns += runs('\n【解析】', { font: '黑体', bold: true }) +
              (solutionParts ? partsToXml(solutionParts, { font: '宋体' }, context) : runs(solution, { font: '宋体' }));
          }
        }
        body.push(paragraph(answerRuns, {
          keepLines: true,
          before: 100,
          after: 160,
          line: 360,
          indentLeft: 360,
          hanging: 360,
          align: 'left'
        }));
      });
    }

    body.push('<w:sectPr>' +
      '<w:footerReference w:type="default" r:id="rId1"/>' +
      '<w:pgSz w:w="11906" w:h="16838"/>' +
      '<w:pgMar w:top="1440" w:right="1588" w:bottom="1440" w:left="1588" w:header="851" w:footer="720" w:gutter="0"/>' +
      '<w:cols w:space="425"/>' +
      '<w:docGrid w:linePitch="312"/>' +
      '</w:sectPr>');

    return XML_HEADER +
      '<w:document xmlns:w="' + W_NS + '" xmlns:r="' + R_NS + '" ' +
      'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" ' +
      'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" ' +
      'xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">' +
      '<w:body>' +
      body.join('') +
      '</w:body></w:document>';
  }

  function buildStyles() {
    return XML_HEADER +
      '<w:styles xmlns:w="' + W_NS + '">' +
      '<w:docDefaults><w:rPrDefault><w:rPr>' +
      '<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体" w:cs="Times New Roman"/>' +
      '<w:sz w:val="24"/><w:szCs w:val="24"/>' +
      '<w:lang w:val="en-US" w:eastAsia="zh-CN"/>' +
      '</w:rPr></w:rPrDefault>' +
      '<w:pPrDefault><w:pPr><w:spacing w:line="360" w:lineRule="auto"/></w:pPr></w:pPrDefault>' +
      '</w:docDefaults>' +
      '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>' +
      '</w:styles>';
  }

  function buildFooter() {
    return XML_HEADER +
      '<w:ftr xmlns:w="' + W_NS + '">' +
      '<w:p><w:pPr><w:jc w:val="center"/></w:pPr>' +
      '<w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/><w:sz w:val="18"/><w:color w:val="808080"/></w:rPr><w:t xml:space="preserve">— </w:t></w:r>' +
      '<w:r><w:fldChar w:fldCharType="begin"/></w:r>' +
      '<w:r><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r>' +
      '<w:r><w:fldChar w:fldCharType="separate"/></w:r>' +
      '<w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/><w:sz w:val="18"/><w:color w:val="808080"/></w:rPr><w:t>1</w:t></w:r>' +
      '<w:r><w:fldChar w:fldCharType="end"/></w:r>' +
      '<w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/><w:sz w:val="18"/><w:color w:val="808080"/></w:rPr><w:t xml:space="preserve"> —</w:t></w:r>' +
      '</w:p></w:ftr>';
  }

  function buildCore(paper) {
    var timestamp = new Date(paper.generatedAt || Date.now());
    if (isNaN(timestamp.getTime())) timestamp = new Date();
    var iso = timestamp.toISOString();
    return XML_HEADER +
      '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" ' +
      'xmlns:dc="http://purl.org/dc/elements/1.1/" ' +
      'xmlns:dcterms="http://purl.org/dc/terms/" ' +
      'xmlns:dcmitype="http://purl.org/dc/dcmitype/" ' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
      '<dc:title>' + escapeXml(paper.title || '高等数学练习卷') + '</dc:title>' +
      '<dc:creator>高等数学题库</dc:creator>' +
      '<cp:lastModifiedBy>高等数学题库</cp:lastModifiedBy>' +
      '<dcterms:created xsi:type="dcterms:W3CDTF">' + iso + '</dcterms:created>' +
      '<dcterms:modified xsi:type="dcterms:W3CDTF">' + iso + '</dcterms:modified>' +
      '</cp:coreProperties>';
  }

  function buildContentTypes() {
    return XML_HEADER +
      '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Default Extension="png" ContentType="image/png"/>' +
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
      '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
      '<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>' +
      '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>' +
      '</Types>';
  }

  function buildRootRels() {
    return XML_HEADER +
      '<Relationships xmlns="' + PKG_REL_NS + '">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
      '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>' +
      '</Relationships>';
  }

  function buildDocumentRels(images) {
    var relationships = [];
    relationships.push('<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>');
    (images || []).forEach(function (image) {
      relationships.push('<Relationship Id="' + image.relId + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/' + image.fileName + '"/>');
    });
    return XML_HEADER +
      '<Relationships xmlns="' + PKG_REL_NS + '">' +
      relationships.join('') +
      '</Relationships>';
  }

  function decodeDataUrl(dataUrl) {
    var text = String(dataUrl || '');
    var comma = text.indexOf(',');
    if (comma === -1) throw new Error('公式图片数据无效。');
    var base64 = text.slice(comma + 1);
    if (typeof atob === 'function') {
      var binary = atob(base64);
      var bytes = new Uint8Array(binary.length);
      for (var i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
      return bytes;
    }
    if (typeof Buffer !== 'undefined') {
      return new Uint8Array(Buffer.from(base64, 'base64'));
    }
    throw new Error('当前环境无法解码公式图片。');
  }

  var crcTable = (function () {
    var table = new Uint32Array(256);
    for (var n = 0; n < 256; n += 1) {
      var c = n;
      for (var k = 0; k < 8; k += 1) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[n] = c >>> 0;
    }
    return table;
  })();

  function crc32(bytes) {
    var crc = 0xFFFFFFFF;
    for (var i = 0; i < bytes.length; i += 1) {
      crc = crcTable[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  function dosDateTime(date) {
    var d = date instanceof Date && !isNaN(date.getTime()) ? date : new Date();
    var year = Math.max(1980, d.getFullYear());
    var dosTime = (d.getHours() << 11) | (d.getMinutes() << 5) | Math.floor(d.getSeconds() / 2);
    var dosDate = ((year - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    return { time: dosTime & 0xFFFF, date: dosDate & 0xFFFF };
  }

  function concatBytes(chunks) {
    var total = chunks.reduce(function (sum, chunk) { return sum + chunk.length; }, 0);
    var output = new Uint8Array(total);
    var offset = 0;
    chunks.forEach(function (chunk) {
      output.set(chunk, offset);
      offset += chunk.length;
    });
    return output;
  }

  function makeZip(files) {
    var encoder = new TextEncoder();
    var now = dosDateTime(new Date());
    var localParts = [];
    var centralParts = [];
    var offset = 0;

    files.forEach(function (file) {
      var nameBytes = encoder.encode(file.name);
      var dataBytes = typeof file.data === 'string' ? encoder.encode(file.data) : file.data;
      var crc = crc32(dataBytes);
      var localHeader = new Uint8Array(30 + nameBytes.length);
      var localView = new DataView(localHeader.buffer);
      localView.setUint32(0, 0x04034B50, true);
      localView.setUint16(4, 20, true);
      localView.setUint16(6, 0x0800, true);
      localView.setUint16(8, 0, true);
      localView.setUint16(10, now.time, true);
      localView.setUint16(12, now.date, true);
      localView.setUint32(14, crc, true);
      localView.setUint32(18, dataBytes.length, true);
      localView.setUint32(22, dataBytes.length, true);
      localView.setUint16(26, nameBytes.length, true);
      localView.setUint16(28, 0, true);
      localHeader.set(nameBytes, 30);
      localParts.push(localHeader, dataBytes);

      var centralHeader = new Uint8Array(46 + nameBytes.length);
      var centralView = new DataView(centralHeader.buffer);
      centralView.setUint32(0, 0x02014B50, true);
      centralView.setUint16(4, 20, true);
      centralView.setUint16(6, 20, true);
      centralView.setUint16(8, 0x0800, true);
      centralView.setUint16(10, 0, true);
      centralView.setUint16(12, now.time, true);
      centralView.setUint16(14, now.date, true);
      centralView.setUint32(16, crc, true);
      centralView.setUint32(20, dataBytes.length, true);
      centralView.setUint32(24, dataBytes.length, true);
      centralView.setUint16(28, nameBytes.length, true);
      centralView.setUint16(30, 0, true);
      centralView.setUint16(32, 0, true);
      centralView.setUint16(34, 0, true);
      centralView.setUint16(36, 0, true);
      centralView.setUint32(38, 0, true);
      centralView.setUint32(42, offset, true);
      centralHeader.set(nameBytes, 46);
      centralParts.push(centralHeader);

      offset += localHeader.length + dataBytes.length;
    });

    var centralDirectory = concatBytes(centralParts);
    var endRecord = new Uint8Array(22);
    var endView = new DataView(endRecord.buffer);
    endView.setUint32(0, 0x06054B50, true);
    endView.setUint16(4, 0, true);
    endView.setUint16(6, 0, true);
    endView.setUint16(8, files.length, true);
    endView.setUint16(10, files.length, true);
    endView.setUint32(12, centralDirectory.length, true);
    endView.setUint32(16, offset, true);
    endView.setUint16(20, 0, true);

    return concatBytes(localParts.concat([centralDirectory, endRecord]));
  }

  function buildPaperDocx(paper) {
    var payload = paper || {};
    var questions = Array.isArray(payload.questions) ? payload.questions : [];
    if (!questions.length) {
      throw new Error('试卷中没有题目。');
    }

    var context = { images: [] };
    var documentXml = buildDocument(payload, context);
    var files = [
      { name: '[Content_Types].xml', data: buildContentTypes() },
      { name: '_rels/.rels', data: buildRootRels() },
      { name: 'word/document.xml', data: documentXml },
      { name: 'word/styles.xml', data: buildStyles() },
      { name: 'word/footer1.xml', data: buildFooter() },
      { name: 'word/_rels/document.xml.rels', data: buildDocumentRels(context.images) },
      { name: 'docProps/core.xml', data: buildCore(payload) }
    ];
    context.images.forEach(function (image) {
      files.push({
        name: 'word/media/' + image.fileName,
        data: decodeDataUrl(image.dataUrl)
      });
    });
    return makeZip(files);
  }

  return {
    buildPaperDocx: buildPaperDocx,
    buildDocumentXml: function (paper) { return buildDocument(paper || {}, null); },
    escapeXml: escapeXml
  };
});
