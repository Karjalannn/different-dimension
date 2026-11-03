/*
 * 同济大学《高等数学》大章节（第七版目录）
 * 只按大章节分类：上册 1—7 章，下册 8—12 章。
 */
(function (root) {
  'use strict';

  var chapters = [
    { id: 'ch01', no: 1, title: '函数与极限', volume: '上册' },
    { id: 'ch02', no: 2, title: '导数与微分', volume: '上册' },
    { id: 'ch03', no: 3, title: '微分中值定理与导数的应用', volume: '上册' },
    { id: 'ch04', no: 4, title: '不定积分', volume: '上册' },
    { id: 'ch05', no: 5, title: '定积分', volume: '上册' },
    { id: 'ch06', no: 6, title: '定积分的应用', volume: '上册' },
    { id: 'ch07', no: 7, title: '微分方程', volume: '上册' },
    { id: 'ch08', no: 8, title: '向量代数与空间解析几何', volume: '下册' },
    { id: 'ch09', no: 9, title: '多元函数微分法及其应用', volume: '下册' },
    { id: 'ch10', no: 10, title: '重积分', volume: '下册' },
    { id: 'ch11', no: 11, title: '曲线积分与曲面积分', volume: '下册' },
    { id: 'ch12', no: 12, title: '无穷级数', volume: '下册' }
  ];

  var types = ['选择题', '填空题', '计算题', '证明题', '解答题', '应用题'];

  var difficulties = [
    { level: 1, label: '基础' },
    { level: 2, label: '中等' },
    { level: 3, label: '较难' }
  ];

  var chapterMap = Object.create(null);
  chapters.forEach(function (chapter) {
    chapterMap[chapter.id] = chapter;
  });

  root.TJ = root.TJ || {};
  root.TJ.chapters = chapters;
  root.TJ.chapterMap = chapterMap;
  root.TJ.types = types;
  root.TJ.difficulties = difficulties;
})(window);
