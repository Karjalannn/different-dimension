/*
 * 演示题：只在用户主动点击「载入演示题」时进入题库。
 * 内容均为基础自编题，可随意删除或改写，用来体验检索、组卷和 Word 导出。
 */
window.TJ_DEMO_QUESTIONS = [
  {
    id: 'demo-ch01-001',
    chapterId: 'ch01',
    type: '计算题',
    difficulty: 1,
    stem: '求极限\nlim_{x→0} (sin 3x) / x',
    answer: '3',
    solution: '当 x→0 时，sin 3x ~ 3x，所以\nlim_{x→0} (sin 3x) / x = lim_{x→0} (3x) / x = 3。',
    tags: ['等价无穷小', '极限'],
    source: '演示题（可删除）',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'demo-ch02-001',
    chapterId: 'ch02',
    type: '填空题',
    difficulty: 1,
    stem: '设 y = x^{2}e^{x}，求 y′。',
    answer: 'y′ = e^{x}(x^{2} + 2x)',
    solution: '由乘积求导法则：\ny′ = (x^{2})′e^{x} + x^{2}(e^{x})′ = 2xe^{x} + x^{2}e^{x} = e^{x}(x^{2} + 2x)。',
    tags: ['导数', '乘积法则'],
    source: '演示题（可删除）',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'demo-ch03-001',
    chapterId: 'ch03',
    type: '证明题',
    difficulty: 2,
    stem: '证明：当 x > 0 时，ln(1 + x) < x。',
    answer: '证明见解析。',
    solution: '设 f(x) = x − ln(1 + x)，x ≥ 0。\nf′(x) = 1 − 1/(1 + x) = x/(1 + x) > 0（x > 0）。\n所以 f 在 [0, +∞) 上单调递增，从而当 x > 0 时，\nf(x) > f(0) = 0，即 ln(1 + x) < x。',
    tags: ['单调性', '不等式'],
    source: '演示题（可删除）',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'demo-ch04-001',
    chapterId: 'ch04',
    type: '计算题',
    difficulty: 1,
    stem: '求不定积分 ∫ x cos x dx。',
    answer: 'x sin x + cos x + C',
    solution: '使用分部积分法。取 u = x，dv = cos x dx，则 du = dx，v = sin x。\n∫ x cos x dx = x sin x − ∫ sin x dx = x sin x + cos x + C。',
    tags: ['分部积分'],
    source: '演示题（可删除）',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'demo-ch05-001',
    chapterId: 'ch05',
    type: '计算题',
    difficulty: 1,
    stem: '计算定积分 ∫_{0}^{1} x^{2} dx。',
    answer: '1/3',
    solution: '由牛顿—莱布尼茨公式：\n∫_{0}^{1} x^{2} dx = [x^{3}/3]_{0}^{1} = 1/3。',
    tags: ['定积分', '牛顿—莱布尼茨公式'],
    source: '演示题（可删除）',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'demo-ch06-001',
    chapterId: 'ch06',
    type: '应用题',
    difficulty: 2,
    stem: '求由曲线 y = x^{2} 与直线 y = 1 所围成的平面图形的面积。',
    answer: '4/3',
    solution: '两曲线交于 x = ±1。在 [−1, 1] 上，1 ≥ x^{2}，故所求面积为\nS = ∫_{−1}^{1} (1 − x^{2}) dx = [x − x^{3}/3]_{−1}^{1} = 4/3。',
    tags: ['面积', '定积分应用'],
    source: '演示题（可删除）',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'demo-ch08-001',
    chapterId: 'ch08',
    type: '填空题',
    difficulty: 1,
    stem: '已知向量 a = (1, 2, −1)，b = (2, 0, 1)，求 a × b。',
    answer: '(2, −3, −4)',
    solution: '由向量积的坐标公式：\na × b = (2·1 − (−1)·0, (−1)·2 − 1·1, 1·0 − 2·2) = (2, −3, −4)。',
    tags: ['向量积'],
    source: '演示题（可删除）',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'demo-ch10-001',
    chapterId: 'ch10',
    type: '计算题',
    difficulty: 2,
    stem: '计算二重积分 ∬_{D} (x + y) dσ，其中 D = {(x, y) | 0 ≤ x ≤ 1, 0 ≤ y ≤ 1}。',
    answer: '1',
    solution: '区域 D 为矩形，可化为累次积分：\n∬_{D} (x + y) dσ = ∫_{0}^{1} dx ∫_{0}^{1} (x + y) dy\n= ∫_{0}^{1} (x + 1/2) dx = 1。',
    tags: ['二重积分', '累次积分'],
    source: '演示题（可删除）',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'demo-ch12-001',
    chapterId: 'ch12',
    type: '选择题',
    difficulty: 2,
    stem: '级数 ∑_{n=1}^{∞} 1/(n(n+1)) 的和为（　）。\nA. 1/2　　B. 1　　C. 2　　D. 发散',
    answer: 'B（1）',
    solution: '因为 1/(n(n+1)) = 1/n − 1/(n+1)，部分和\nS_{n} = 1 − 1/(n+1) → 1（n→∞），所以级数收敛且和为 1。',
    tags: ['级数', '裂项相消'],
    source: '演示题（可删除）',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  }
];
