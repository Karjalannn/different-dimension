/*
 * ch01 题目迁移为 LaTeX。
 * plain* 为迁移前原文，公式图片生成失败时回退。
 */
window.TJ_CH01_LATEX = {
  "ch01-001": {
    "stem": "设数列 $\\{x_{n}\\}$ 的一般项 $x_{n} = (1/n)\\cdot \\cos (n\\pi /2)$。问 $\\lim_{n\\to \\infty } x_{n} = ?$ 求出 $N$，使当 $n > N$ 时，$x_{n}$ 与其极限之差的绝对值小于正数 $\\varepsilon$。当 $\\varepsilon = 0.001$ 时，求出 $N$。",
    "answer": "$\\lim_{n\\to \\infty } x_{n} = 0$；对任意 $\\varepsilon > 0$，可取 $N = [1/\\varepsilon ]$（$[\\cdot ]$ 表示取整）。当 $\\varepsilon = 0.001$ 时，$N = 1000$。",
    "solution": "$\\lim_{n\\to \\infty } x_{n} = 0$。证明如下：\n\n因为\n$|x_{n} - 0| = |(1/n)\\cdot \\cos (n\\pi /2)| \\le 1/n$，\n\n要使 $|x_{n} - 0| < \\varepsilon$，只要 $1/n < \\varepsilon$，即 $n > 1/\\varepsilon$。\n所以对任意 $\\varepsilon > 0$（不妨设 $\\varepsilon < 1$），取 $N = [1/\\varepsilon ]$（$[\\cdot ]$ 表示取整），则当 $n > N$ 时，就有 $|x_{n} - 0| < \\varepsilon$。\n\n当 $\\varepsilon = 0.001$ 时，取 $N = [1/\\varepsilon ] = 1000$。\n即若 $\\varepsilon = 0.001$，只要 $n > 1000$，就有 $|x_{n} - 0| < 0.001$。",
    "plainStem": "设数列 {x_{n}} 的一般项 x_{n} = (1/n)·cos(nπ/2)。问 lim_{n→∞} x_{n} = ? 求出 N，使当 n > N 时，x_{n} 与其极限之差的绝对值小于正数 ε。当 ε = 0.001 时，求出 N。",
    "plainAnswer": "lim_{n→∞} x_{n} = 0；对任意 ε > 0，可取 N = [1/ε]（[·] 表示取整）。当 ε = 0.001 时，N = 1000。",
    "plainSolution": "lim_{n→∞} x_{n} = 0。证明如下：\n\n因为\n|x_{n} − 0| = |(1/n)·cos(nπ/2)| ≤ 1/n，\n\n要使 |x_{n} − 0| < ε，只要 1/n < ε，即 n > 1/ε。\n所以对任意 ε > 0（不妨设 ε < 1），取 N = [1/ε]（[·] 表示取整），则当 n > N 时，就有 |x_{n} − 0| < ε。\n\n当 ε = 0.001 时，取 N = [1/ε] = 1000。\n即若 ε = 0.001，只要 n > 1000，就有 |x_{n} − 0| < 0.001。"
  },
  "ch01-002": {
    "stem": "根据数列极限的定义证明：$\\lim_{n\\to \\infty } 1/n^{2} = 0$。",
    "answer": "$\\lim_{n\\to \\infty } 1/n^{2} = 0$。对任意 $\\varepsilon > 0$（不妨设 $\\varepsilon < 1$），可取 $N = [1/\\sqrt{\\varepsilon }]$（$[\\cdot ]$ 表示取整）。",
    "solution": "因为要使\n$|1/n^{2} - 0| = 1/n^{2} < \\varepsilon$，\n只要 $n > 1/\\sqrt{\\varepsilon }$。\n所以对任意 $\\varepsilon > 0$（不妨设 $\\varepsilon < 1$），取 $N = [1/\\sqrt{\\varepsilon }]$，则当 $n > N$ 时，就有\n$|1/n^{2} - 0| < \\varepsilon$，\n即 $\\lim_{n\\to \\infty } 1/n^{2} = 0$。",
    "plainStem": "根据数列极限的定义证明：lim_{n→∞} 1/n^{2} = 0。",
    "plainAnswer": "lim_{n→∞} 1/n^{2} = 0。对任意 ε > 0（不妨设 ε < 1），可取 N = [1/√ε]（[·] 表示取整）。",
    "plainSolution": "因为要使\n|1/n^{2} − 0| = 1/n^{2} < ε，\n只要 n > 1/√ε。\n所以对任意 ε > 0（不妨设 ε < 1），取 N = [1/√ε]，则当 n > N 时，就有\n|1/n^{2} − 0| < ε，\n即 lim_{n→∞} 1/n^{2} = 0。"
  },
  "ch01-003": {
    "stem": "根据数列极限的定义证明：$\\lim_{n\\to \\infty } (3n + 1)/(2n + 1) = 3/2$。",
    "answer": "$\\lim_{n\\to \\infty } (3n + 1)/(2n + 1) = 3/2$。对任意 $\\varepsilon > 0$（不妨设 $\\varepsilon < 1/4$），可取 $N = [1/(4\\varepsilon )]$（$[\\cdot ]$ 表示取整）。",
    "solution": "因为\n$|(3n + 1)/(2n + 1) - 3/2| = 1/[2(2n + 1)] < 1/(4n)$，\n要使 $|(3n + 1)/(2n + 1) - 3/2| < \\varepsilon$，只要 $1/(4n) < \\varepsilon$，即 $n > 1/(4\\varepsilon )$。\n所以对任意 $\\varepsilon > 0$（不妨设 $\\varepsilon < 1/4$），取 $N = [1/(4\\varepsilon )]$，则当 $n > N$ 时，就有\n$|(3n + 1)/(2n + 1) - 3/2| < \\varepsilon$，\n即 $\\lim_{n\\to \\infty } (3n + 1)/(2n + 1) = 3/2$。",
    "plainStem": "根据数列极限的定义证明：lim_{n→∞} (3n + 1)/(2n + 1) = 3/2。",
    "plainAnswer": "lim_{n→∞} (3n + 1)/(2n + 1) = 3/2。对任意 ε > 0（不妨设 ε < 1/4），可取 N = [1/(4ε)]（[·] 表示取整）。",
    "plainSolution": "因为\n|(3n + 1)/(2n + 1) − 3/2| = 1/[2(2n + 1)] < 1/(4n)，\n要使 |(3n + 1)/(2n + 1) − 3/2| < ε，只要 1/(4n) < ε，即 n > 1/(4ε)。\n所以对任意 ε > 0（不妨设 ε < 1/4），取 N = [1/(4ε)]，则当 n > N 时，就有\n|(3n + 1)/(2n + 1) − 3/2| < ε，\n即 lim_{n→∞} (3n + 1)/(2n + 1) = 3/2。"
  },
  "ch01-004": {
    "stem": "根据数列极限的定义证明：$\\lim_{n\\to \\infty } (\\sqrt{n^{2} + a^{2}})/n = 1$。",
    "answer": "$\\lim_{n\\to \\infty } (\\sqrt{n^{2} + a^{2}})/n = 1$。当 $a = 0$ 时，可取任意 $N$（如 $N = 1$）；当 $a \\ne 0$ 时，对任意 $\\varepsilon > 0$，若 $\\varepsilon \\ge a^{2}/2$，取 $N = 1$；若 $0 < \\varepsilon < a^{2}/2$，可取 $N = [|a|/\\sqrt{2\\varepsilon }]$（$[\\cdot ]$ 表示取整）。",
    "solution": "当 $a = 0$ 时，所给数列为常数列 $1$，结论显然成立。\n以下设 $a \\ne 0$。因为\n$|(\\sqrt{n^{2} + a^{2}})/n - 1| = (\\sqrt{n^{2} + a^{2}} - n)/n\n= a^{2}/[n(\\sqrt{n^{2} + a^{2}} + n)] < a^{2}/(2n^{2})$。\n要使 $|(\\sqrt{n^{2} + a^{2}})/n - 1| < \\varepsilon$，只要 $a^{2}/(2n^{2}) < \\varepsilon$，即 $n > |a|/\\sqrt{2\\varepsilon }$。\n若 $\\varepsilon \\ge a^{2}/2$，取 $N = 1$；当 $n > 1$ 时，$|(\\sqrt{n^{2} + a^{2}})/n - 1| < a^{2}/(2n^{2}) \\le a^{2}/8 < \\varepsilon$。\n因此不妨设 $\\varepsilon < a^{2}/2$，取 $N = [|a|/\\sqrt{2\\varepsilon }]$，则当 $n > N$ 时，就有\n$|(\\sqrt{n^{2} + a^{2}})/n - 1| < \\varepsilon$，\n即 $\\lim_{n\\to \\infty } (\\sqrt{n^{2} + a^{2}})/n = 1$。",
    "plainStem": "根据数列极限的定义证明：lim_{n→∞} (√(n^{2} + a^{2}))/n = 1。",
    "plainAnswer": "lim_{n→∞} (√(n^{2} + a^{2}))/n = 1。当 a = 0 时，可取任意 N（如 N = 1）；当 a ≠ 0 时，对任意 ε > 0，若 ε ≥ a^{2}/2，取 N = 1；若 0 < ε < a^{2}/2，可取 N = [|a|/√(2ε)]（[·] 表示取整）。",
    "plainSolution": "当 a = 0 时，所给数列为常数列 1，结论显然成立。\n以下设 a ≠ 0。因为\n|(√(n^{2} + a^{2}))/n − 1| = (√(n^{2} + a^{2}) − n)/n\n= a^{2}/[n(√(n^{2} + a^{2}) + n)] < a^{2}/(2n^{2})。\n要使 |(√(n^{2} + a^{2}))/n − 1| < ε，只要 a^{2}/(2n^{2}) < ε，即 n > |a|/√(2ε)。\n若 ε ≥ a^{2}/2，取 N = 1；当 n > 1 时，|(√(n^{2} + a^{2}))/n − 1| < a^{2}/(2n^{2}) ≤ a^{2}/8 < ε。\n因此不妨设 ε < a^{2}/2，取 N = [|a|/√(2ε)]，则当 n > N 时，就有\n|(√(n^{2} + a^{2}))/n − 1| < ε，\n即 lim_{n→∞} (√(n^{2} + a^{2}))/n = 1。"
  },
  "ch01-005": {
    "stem": "根据数列极限的定义证明：$\\lim_{n\\to \\infty } 0.999\\ldots 9 = 1$（小数点后 $n$ 个 $9$）。",
    "answer": "$\\lim_{n\\to \\infty } 0.999\\ldots 9 = 1$。对任意 $\\varepsilon > 0$（不妨设 $\\varepsilon < 1$），可取 $N = [\\lg (1/\\varepsilon )]$（$[\\cdot ]$ 表示取整，$\\lg$ 表示以 $10$ 为底的对数）。",
    "solution": "小数点后 $n$ 个 $9$ 的数为 $0.999\\ldots 9 = 1 - 1/10^{n}$。因为\n$|0.999\\ldots 9 - 1| = 1/10^{n}$，\n要使 $|0.999\\ldots 9 - 1| < \\varepsilon$，只要 $1/10^{n} < \\varepsilon$，即 $n > \\lg (1/\\varepsilon )$。\n所以对任意 $\\varepsilon > 0$（不妨设 $\\varepsilon < 1$），取 $N = [\\lg (1/\\varepsilon )]$，则当 $n > N$ 时，就有\n$|0.999\\ldots 9 - 1| < \\varepsilon$，\n即 $\\lim_{n\\to \\infty } 0.999\\ldots 9 = 1$。",
    "plainStem": "根据数列极限的定义证明：lim_{n→∞} 0.999…9 = 1（小数点后 n 个 9）。",
    "plainAnswer": "lim_{n→∞} 0.999…9 = 1。对任意 ε > 0（不妨设 ε < 1），可取 N = [lg(1/ε)]（[·] 表示取整，lg 表示以 10 为底的对数）。",
    "plainSolution": "小数点后 n 个 9 的数为 0.999…9 = 1 − 1/10^{n}。因为\n|0.999…9 − 1| = 1/10^{n}，\n要使 |0.999…9 − 1| < ε，只要 1/10^{n} < ε，即 n > lg(1/ε)。\n所以对任意 ε > 0（不妨设 ε < 1），取 N = [lg(1/ε)]，则当 n > N 时，就有\n|0.999…9 − 1| < ε，\n即 lim_{n→∞} 0.999…9 = 1。"
  },
  "ch01-006": {
    "stem": "若 $\\lim_{n\\to \\infty } u_{n} = a$，证明 $\\lim_{n\\to \\infty } |u_{n}| = |a|$。并举例说明：如果数列 $\\{|x_{n}|\\}$ 有极限，但数列 $\\{x_{n}\\}$ 未必有极限。",
    "answer": "$\\lim_{n\\to \\infty } |u_{n}| = |a|$。反之不成立，例如 $x_{n} = (-1)^{n}$：数列 $\\{|x_{n}|\\}$ 的极限为 $1$，但数列 $\\{x_{n}\\}$ 没有极限。",
    "solution": "因为 $\\lim_{n\\to \\infty } u_{n} = a$，所以 $\\forall \\varepsilon > 0$，$\\exists N$，当 $n > N$ 时，有 $|u_{n} - a| < \\varepsilon$，从而由绝对值不等式\n$| |u_{n}| - |a| | \\le |u_{n} - a| < \\varepsilon$，\n故 $\\lim_{n\\to \\infty } |u_{n}| = |a|$。\n\n但由 $\\lim_{n\\to \\infty } |u_{n}| = |a|$，并不能推得 $\\lim_{n\\to \\infty } u_{n} = a$。例如，考虑数列 $\\{(-1)^{n}\\}$，虽然\n$\\lim_{n\\to \\infty } |(-1)^{n}| = 1$，\n但 $\\{(-1)^{n}\\}$ 没有极限。",
    "plainStem": "若 lim_{n→∞} u_{n} = a，证明 lim_{n→∞} |u_{n}| = |a|。并举例说明：如果数列 {|x_{n}|} 有极限，但数列 {x_{n}} 未必有极限。",
    "plainAnswer": "lim_{n→∞} |u_{n}| = |a|。反之不成立，例如 x_{n} = (−1)^{n}：数列 {|x_{n}|} 的极限为 1，但数列 {x_{n}} 没有极限。",
    "plainSolution": "因为 lim_{n→∞} u_{n} = a，所以 ∀ ε > 0，∃ N，当 n > N 时，有 |u_{n} − a| < ε，从而由绝对值不等式\n| |u_{n}| − |a| | ≤ |u_{n} − a| < ε，\n故 lim_{n→∞} |u_{n}| = |a|。\n\n但由 lim_{n→∞} |u_{n}| = |a|，并不能推得 lim_{n→∞} u_{n} = a。例如，考虑数列 {(−1)^{n}}，虽然\nlim_{n→∞} |(−1)^{n}| = 1，\n但 {(−1)^{n}} 没有极限。"
  },
  "ch01-007": {
    "stem": "求极限 $\\lim_{x\\to 0} \\tan (3x)/(2x)$。",
    "answer": "$3/2$",
    "solution": "当 $x\\to 0$ 时，$\\tan (3x) \\sim 3x$，所以\n$\\lim_{x\\to 0} \\tan (3x)/(2x) = \\lim_{x\\to 0} (3x)/(2x) = 3/2$。",
    "plainStem": "求极限 lim_{x→0} tan(3x)/(2x)。",
    "plainAnswer": "3/2",
    "plainSolution": "当 x→0 时，tan(3x) ~ 3x，所以\nlim_{x→0} tan(3x)/(2x) = lim_{x→0} (3x)/(2x) = 3/2。"
  },
  "ch01-008": {
    "stem": "求极限 $\\lim_{x\\to 0} \\sin (x^{n})/(\\sin x)^{m}$，其中 $n$、$m$ 为正整数。",
    "answer": "$0$（$n > m$）；$1$（$n = m$）；$\\infty$（$n < m$，此时无界，不是有限极限）。",
    "solution": "当 $x\\to 0$ 时，$\\sin (x^{n}) \\sim x^{n}$，$\\sin x \\sim x$，所以 $(\\sin x)^{m} \\sim x^{m}$。因此\n$\\lim_{x\\to 0} \\sin (x^{n})/(\\sin x)^{m} = \\lim_{x\\to 0} x^{n-m}$。\n当 $n > m$ 时，极限为 $0$；\n当 $n = m$ 时，极限为 $1$；\n当 $n < m$ 时，$x^{n-m}$ 无界，按教材记法极限为 $\\infty$（它不是有限极限）。",
    "plainStem": "求极限 lim_{x→0} sin(x^{n})/(sin x)^{m}，其中 n、m 为正整数。",
    "plainAnswer": "0（n > m）；1（n = m）；∞（n < m，此时无界，不是有限极限）。",
    "plainSolution": "当 x→0 时，sin(x^{n}) ~ x^{n}，sin x ~ x，所以 (sin x)^{m} ~ x^{m}。因此\nlim_{x→0} sin(x^{n})/(sin x)^{m} = lim_{x→0} x^{n-m}。\n当 n > m 时，极限为 0；\n当 n = m 时，极限为 1；\n当 n < m 时，x^{n-m} 无界，按教材记法极限为 ∞（它不是有限极限）。"
  },
  "ch01-009": {
    "stem": "求极限 $\\lim_{x\\to 0} (\\tan x - \\sin x)/\\sin^{3} x$。",
    "answer": "$1/2$",
    "solution": "因为 $\\tan x - \\sin x = \\sin x(1/\\cos x - 1) = \\sin x(1 - \\cos x)/\\cos x$，所以\n原式 $= \\lim_{x\\to 0} (1 - \\cos x)/(\\cos x \\sin^{2} x)$。\n又 $1 - \\cos x \\sim x^{2}/2$，$\\sin^{2} x \\sim x^{2}$，$\\cos x \\to 1$，因此\n原式 $= \\lim_{x\\to 0} (x^{2}/2)/x^{2} = 1/2$。",
    "plainStem": "求极限 lim_{x→0} (tan x − sin x)/sin^{3} x。",
    "plainAnswer": "1/2",
    "plainSolution": "因为 tan x − sin x = sin x(1/cos x − 1) = sin x(1 − cos x)/cos x，所以\n原式 = lim_{x→0} (1 − cos x)/(cos x sin^{2} x)。\n又 1 − cos x ~ x^{2}/2，sin^{2} x ~ x^{2}，cos x → 1，因此\n原式 = lim_{x→0} (x^{2}/2)/x^{2} = 1/2。"
  },
  "ch01-010": {
    "stem": "求极限 $\\lim_{x\\to 0} (\\sin x - \\tan x)/[(\\sqrt[3]{1 + x^{2}} - 1)(\\sqrt{1 + \\sin x} - 1)]$。",
    "answer": "$-3$",
    "solution": "当 $x\\to 0$ 时，\n$\\sin x - \\tan x = \\sin x(1 - \\sec x) \\sim x\\cdot (-x^{2}/2) = -x^{3}/2$；\n$\\sqrt[3]{1 + x^{2}} - 1 \\sim x^{2}/3$；\n$\\sqrt{1 + \\sin x} - 1 \\sim \\sin x/2 \\sim x/2$。\n因此\n原式 $= \\lim_{x\\to 0} (-x^{3}/2)/[(x^{2}/3)(x/2)] = \\lim_{x\\to 0} (-x^{3}/2)/(x^{3}/6) = -3$。",
    "plainStem": "求极限 lim_{x→0} (sin x − tan x)/[(∛(1 + x^{2}) − 1)(√(1 + sin x) − 1)]。",
    "plainAnswer": "−3",
    "plainSolution": "当 x→0 时，\nsin x − tan x = sin x(1 − sec x) ~ x·(−x^{2}/2) = −x^{3}/2；\n∛(1 + x^{2}) − 1 ~ x^{2}/3；\n√(1 + sin x) − 1 ~ sin x/2 ~ x/2。\n因此\n原式 = lim_{x→0} (−x^{3}/2)/[(x^{2}/3)(x/2)] = lim_{x→0} (−x^{3}/2)/(x^{3}/6) = −3。"
  },
  "ch01-011": {
    "stem": "设 $f(x)$ 在 $[a, b]$ 上连续，$x_{i} \\in [a, b]$，$t_{i} > 0$（$i = 1, 2, \\ldots , n$），且 $\\sum _{i=1}^{n} t_{i} = 1$，试证至少存在一点 $\\xi \\in [a, b]$，使\n$f(\\xi ) = t_{1}f(x_{1}) + t_{2}f(x_{2}) + \\ldots + t_{n}f(x_{n})$。",
    "answer": "存在 $\\xi \\in [a, b]$，使 $f(\\xi ) = t_{1}f(x_{1}) + t_{2}f(x_{2}) + \\ldots + t_{n}f(x_{n})$。",
    "solution": "因为 $f(x)$ 在 $[a, b]$ 上连续，所以 $m \\le f(x) \\le M$，其中 $m$、$M$ 分别为最小值与最大值。\n又 $x_{i} \\in [a, b]$，$t_{i} > 0$（$i = 1, 2, \\ldots , n$），所以\n$m = \\sum _{i=1}^{n} m t_{i} \\le \\sum _{i=1}^{n} t_{i}f(x_{i}) \\le \\sum _{i=1}^{n} M t_{i} = M$。\n从而至少存在一点 $\\xi \\in [a, b]$，使 $f(\\xi ) = t_{1}f(x_{1}) + t_{2}f(x_{2}) + \\ldots + t_{n}f(x_{n})$。",
    "plainStem": "设 f(x) 在 [a, b] 上连续，x_{i} ∈ [a, b]，t_{i} > 0（i = 1, 2, …, n），且 ∑_{i=1}^{n} t_{i} = 1，试证至少存在一点 ξ ∈ [a, b]，使\nf(ξ) = t_{1}f(x_{1}) + t_{2}f(x_{2}) + … + t_{n}f(x_{n})。",
    "plainAnswer": "存在 ξ ∈ [a, b]，使 f(ξ) = t_{1}f(x_{1}) + t_{2}f(x_{2}) + … + t_{n}f(x_{n})。",
    "plainSolution": "因为 f(x) 在 [a, b] 上连续，所以 m ≤ f(x) ≤ M，其中 m、M 分别为最小值与最大值。\n又 x_{i} ∈ [a, b]，t_{i} > 0（i = 1, 2, …, n），所以\nm = ∑_{i=1}^{n} m t_{i} ≤ ∑_{i=1}^{n} t_{i}f(x_{i}) ≤ ∑_{i=1}^{n} M t_{i} = M。\n从而至少存在一点 ξ ∈ [a, b]，使 f(ξ) = t_{1}f(x_{1}) + t_{2}f(x_{2}) + … + t_{n}f(x_{n})。"
  },
  "ch01-012": {
    "stem": "极限 $\\lim_{n\\to \\infty } \\sin (\\pi \\sqrt{n^{2} + 1}) = \\rule{2em}{0.4pt}$。",
    "answer": "$0$",
    "solution": "$\\sin (\\pi \\sqrt{n^{2} + 1}) = \\sin [n\\pi + \\pi (\\sqrt{n^{2} + 1} - n)] = (-1)^{n}\\sin (\\pi \\sqrt{n^{2} + 1} - \\pi n)$，\n$\\{(-1)^{n}\\}$ 是个有界量，而 $0 < \\pi (\\sqrt{n^{2} + 1} - n) = \\pi /(\\sqrt{n^{2} + 1} + n) < 2/n$。\n因 $0 < \\sin (\\pi \\sqrt{n^{2} + 1} - \\pi n) \\le \\sin (2/n) < 2/n$，且 $\\lim_{n\\to \\infty } 2/n = 0$，由夹逼准则知\n$\\lim_{n\\to \\infty } \\sin (\\pi \\sqrt{n^{2} + 1} - \\pi n) = 0$，所以 $\\lim_{n\\to \\infty } \\sin (\\pi \\sqrt{n^{2} + 1}) = 0$。\n故应填 $0$。",
    "plainStem": "极限 lim_{n→∞} sin(π√(n^{2} + 1)) = ______。",
    "plainAnswer": "0",
    "plainSolution": "sin(π√(n^{2} + 1)) = sin[nπ + π(√(n^{2} + 1) − n)] = (−1)^{n}sin(π√(n^{2} + 1) − πn)，\n{(−1)^{n}} 是个有界量，而 0 < π(√(n^{2} + 1) − n) = π/(√(n^{2} + 1) + n) < 2/n。\n因 0 < sin(π√(n^{2} + 1) − πn) ≤ sin(2/n) < 2/n，且 lim_{n→∞} 2/n = 0，由夹逼准则知\nlim_{n→∞} sin(π√(n^{2} + 1) − πn) = 0，所以 lim_{n→∞} sin(π√(n^{2} + 1)) = 0。\n故应填 0。"
  },
  "ch01-013": {
    "stem": "极限 $\\lim_{x\\to +\\infty } (\\cos \\sqrt{x + 1} - \\cos \\sqrt{x}) = \\rule{2em}{0.4pt}$。",
    "answer": "$0$",
    "solution": "利用三角函数的和、差化积公式\n$\\cos \\sqrt{x + 1} - \\cos \\sqrt{x} = -2\\sin [(\\sqrt{x + 1} + \\sqrt{x})/2]\\cdot \\sin [(\\sqrt{x + 1} - \\sqrt{x})/2]$，\n当 $x\\to +\\infty$ 时，$|\\sin [(\\sqrt{x + 1} + \\sqrt{x})/2]| \\le 1$，\n$0 \\le |\\sin [(\\sqrt{x + 1} - \\sqrt{x})/2]| = |\\sin [1/(2(\\sqrt{x + 1} + \\sqrt{x}))]| \\le 1/[2(\\sqrt{x + 1} + \\sqrt{x})] \\to 0$。\n根据有界函数与无穷小的乘积仍是无穷小，所以 $\\lim_{x\\to +\\infty } \\sin [(\\sqrt{x + 1} - \\sqrt{x})/2] = 0$。\n故应填 $0$。",
    "plainStem": "极限 lim_{x→+∞} (cos√(x + 1) − cos√x) = ______。",
    "plainAnswer": "0",
    "plainSolution": "利用三角函数的和、差化积公式\ncos√(x + 1) − cos√x = −2sin[(√(x + 1) + √x)/2]·sin[(√(x + 1) − √x)/2]，\n当 x→+∞ 时，|sin[(√(x + 1) + √x)/2]| ≤ 1，\n0 ≤ |sin[(√(x + 1) − √x)/2]| = |sin[1/(2(√(x + 1) + √x))]| ≤ 1/[2(√(x + 1) + √x)] → 0。\n根据有界函数与无穷小的乘积仍是无穷小，所以 lim_{x→+∞} sin[(√(x + 1) − √x)/2] = 0。\n故应填 0。"
  },
  "ch01-014": {
    "stem": "$\\lim_{n\\to \\infty } (\\sqrt{n + 2} - \\sqrt{n - 1}) = \\rule{2em}{0.4pt}$。",
    "answer": "分子有理化：原式 $= [(n+2)-(n-1)] / [\\sqrt{n+2} + \\sqrt{n-1}] = 3 / [\\sqrt{n+2} + \\sqrt{n-1}]$。当 $n\\to \\infty$ 时，分母趋于无穷，故极限为 $0$。",
    "solution": "",
    "plainStem": "lim_{n→∞} (√(n + 2) − √(n − 1)) = ______。",
    "plainAnswer": "分子有理化：原式 = [(n+2)-(n-1)] / [√(n+2) + √(n-1)] = 3 / [√(n+2) + √(n-1)]。当 n→∞ 时，分母趋于无穷，故极限为 0。",
    "plainSolution": ""
  },
  "ch01-015": {
    "stem": "极限 $\\lim_{x\\to \\infty } (x + 3\\sin x)/(3x + 5\\sin x) = \\rule{2em}{0.4pt}$。",
    "answer": "分子分母同除以 $x$：原式 $= (1 + 3\\sin x/x) / (3 + 5\\sin x/x)$。因为 $x\\to \\infty$ 时，$\\sin x/x \\to 0$，所以极限为 $1/3$。",
    "solution": "",
    "plainStem": "极限 lim_{x→∞} (x + 3sin x)/(3x + 5sin x) = ______。",
    "plainAnswer": "分子分母同除以 x：原式 = (1 + 3sinx/x) / (3 + 5sinx/x)。因为 x→∞ 时，sinx/x → 0，所以极限为 1/3。",
    "plainSolution": ""
  },
  "ch01-016": {
    "stem": "$\\lim_{x\\to \\infty } ((2x - 1)^{30}(3x - 2)^{20})/(2x + 1)^{50} = \\rule{2em}{0.4pt}$。",
    "answer": "分子分母同除以 $x^50$。分子最高次项系数为 $2^30 \\times 3^20$，分母最高次项系数为 $2^50$。原式 $= (2^30 \\times 3^20) / 2^50 = (3/2)^20$。",
    "solution": "",
    "plainStem": "lim_{x→∞} ((2x − 1)^{30}(3x − 2)^{20})/(2x + 1)^{50} = ______。",
    "plainAnswer": "分子分母同除以 x^50。分子最高次项系数为 2^30 × 3^20，分母最高次项系数为 2^50。原式 = (2^30 × 3^20) / 2^50 = (3/2)^20。",
    "plainSolution": ""
  },
  "ch01-017": {
    "stem": "$\\lim_{x\\to \\infty } (1 - 2/x)^{x} = \\rule{2em}{0.4pt}$。",
    "answer": "凑重要极限：原式 $= [(1 - 2/x)^{-x/2}]^{-2}$。当 $x\\to \\infty$ 时，中括号内趋于 $e$，故极限为 $e^{-2}$。",
    "solution": "",
    "plainStem": "lim_{x→∞} (1 − 2/x)^{x} = ______。",
    "plainAnswer": "凑重要极限：原式 = [(1 - 2/x)^(-x/2)]^(-2)。当 x→∞ 时，中括号内趋于 e，故极限为 e^(-2)。",
    "plainSolution": ""
  },
  "ch01-018": {
    "stem": "$\\lim_{x\\to \\infty } x \\sin (3x/(2x^{2} + 1)) = \\rule{2em}{0.4pt}$。",
    "answer": "等价无穷小：当 $x\\to \\infty$ 时，$\\sin [3x/(2x^2+1)] \\sim 3x/(2x^2+1)$。原式 $= x \\times [3x/(2x^2+1)] = 3x^2/(2x^2+1) \\to 3/2$。",
    "solution": "",
    "plainStem": "lim_{x→∞} x sin(3x/(2x^{2} + 1)) = ______。",
    "plainAnswer": "等价无穷小：当 x→∞ 时，sin[3x/(2x^2+1)] ~ 3x/(2x^2+1)。原式 = x × [3x/(2x^2+1)] = 3x^2/(2x^2+1) → 3/2。",
    "plainSolution": ""
  },
  "ch01-019": {
    "stem": "$\\lim_{x\\to \\infty } [x \\sin (1/x) + ((x + 1)/x)^{x}] = \\rule{2em}{0.4pt}$。",
    "answer": "拆成两项：$\\lim x\\cdot \\sin (1/x) = \\lim \\sin (1/x)/(1/x) = 1$；$\\lim (1+1/x)^x = e$。故原极限为 $1 + e$。",
    "solution": "",
    "plainStem": "lim_{x→∞} [x sin(1/x) + ((x + 1)/x)^{x}] = ______。",
    "plainAnswer": "拆成两项：lim x·sin(1/x) = lim sin(1/x)/(1/x) = 1；lim (1+1/x)^x = e。故原极限为 1 + e。",
    "plainSolution": ""
  },
  "ch01-020": {
    "stem": "设当 $x\\to 0$ 时，$\\ln (1 + ax^{2})$ 与 $x^{2}$ 是等价无穷小，则常数 $a = \\rule{2em}{0.4pt}$。",
    "answer": "等价无穷小：当 $x\\to 0$ 时，$\\ln (1+ax^2) \\sim ax^2$。已知与 $x^2$ 等价，故 $a = 1$。",
    "solution": "",
    "plainStem": "设当 x→0 时，ln(1 + ax^{2}) 与 x^{2} 是等价无穷小，则常数 a = ______。",
    "plainAnswer": "等价无穷小：当 x→0 时，ln(1+ax^2) ~ ax^2。已知与 x^2 等价，故 a = 1。",
    "plainSolution": ""
  },
  "ch01-021": {
    "stem": "若 $f(x) = \\{ \\arctan (1/x), x > 0; k + e^{-x}, x \\le 0 \\}$ 在 $x = 0$ 处连续，则常数 $k = \\rule{2em}{0.4pt}$。",
    "answer": "连续要求左右极限相等。右极限 $\\lim_{x\\to 0+} \\arctan (1/x) = \\pi /2$。左极限 $\\lim_{x\\to 0-} (k+e^{-x}) = k+1$。令 $k+1 = \\pi /2$，得 $k = \\pi /2 - 1$。",
    "solution": "",
    "plainStem": "若 f(x) = { arctan(1/x), x > 0; k + e^{−x}, x ≤ 0 } 在 x = 0 处连续，则常数 k = ______。",
    "plainAnswer": "连续要求左右极限相等。右极限 lim(x→0+) arctan(1/x) = π/2。左极限 lim(x→0-) (k+e^(-x)) = k+1。令 k+1 = π/2，得 k = π/2 - 1。",
    "plainSolution": ""
  },
  "ch01-022": {
    "stem": "若 $f(x) = \\{ a - e^{-x}, x \\ge 0; x + 1, x < 0 \\}$ 在 $x = 0$ 处连续，则常数 $a = \\rule{2em}{0.4pt}$。",
    "answer": "右极限 $\\lim_{x\\to 0+} (a-e^{-x}) = a-1$。左极限 $\\lim_{x\\to 0-} (x+1) = 1$。令 $a-1 = 1$，得 $a = 2$。",
    "solution": "",
    "plainStem": "若 f(x) = { a − e^{−x}, x ≥ 0; x + 1, x < 0 } 在 x = 0 处连续，则常数 a = ______。",
    "plainAnswer": "右极限 lim(x→0+) (a-e^(-x)) = a-1。左极限 lim(x→0-) (x+1) = 1。令 a-1 = 1，得 a = 2。",
    "plainSolution": ""
  },
  "ch01-023": {
    "stem": "函数 $f(x) = (x^{2} - 1)/(x^{2} - 3x + 2)$ 的第一类间断点为 $x = \\rule{2em}{0.4pt}$。",
    "answer": "因式分解得 $f(x) = (x-1)(x+1) / [(x-1)(x-2)]$。$x=1$ 为可去间断点（第一类），$x=2$ 为无穷间断点（第二类）。填 $x=1$。",
    "solution": "",
    "plainStem": "函数 f(x) = (x^{2} − 1)/(x^{2} − 3x + 2) 的第一类间断点为 x = ______。",
    "plainAnswer": "因式分解得 f(x) = (x-1)(x+1) / [(x-1)(x-2)]。x=1 为可去间断点（第一类），x=2 为无穷间断点（第二类）。填 x=1。",
    "plainSolution": ""
  },
  "ch01-024": {
    "stem": "函数 $f(x) = (x^{2} - 1)/(x^{2} - x)$ 的第二类间断点为 $x = \\rule{2em}{0.4pt}$。",
    "answer": "因式分解得 $f(x) = (x-1)(x+1) / [x(x-1)]$。$x=1$ 为可去间断点，$x=0$ 为无穷间断点。填 $x=0$。",
    "solution": "",
    "plainStem": "函数 f(x) = (x^{2} − 1)/(x^{2} − x) 的第二类间断点为 x = ______。",
    "plainAnswer": "因式分解得 f(x) = (x-1)(x+1) / [x(x-1)]。x=1 为可去间断点，x=0 为无穷间断点。填 x=0。",
    "plainSolution": ""
  },
  "ch01-025": {
    "stem": "函数 $f(x) = \\ln x + (x^{2} - 1)/[(x - 1)(x^{2} - 4)]$ 的第二类间断点为 $x = \\rule{2em}{0.4pt}$。",
    "answer": "定义域 $x>0$ 且 $x\\ne 1, x\\ne 2$。$x=1$ 为可去间断点；$x=2$ 时，分子非零分母趋于零，为无穷间断点（第二类）。填 $x=2$。",
    "solution": "",
    "plainStem": "函数 f(x) = ln x + (x^{2} − 1)/[(x − 1)(x^{2} − 4)] 的第二类间断点为 x = ______。",
    "plainAnswer": "定义域 x>0 且 x≠1, x≠2。x=1 为可去间断点；x=2 时，分子非零分母趋于零，为无穷间断点（第二类）。填 x=2。",
    "plainSolution": ""
  },
  "ch01-026": {
    "stem": "$f(x) = (x - 1)/\\ln (x - 1)$ 的无穷间断点为 $x = \\rule{2em}{0.4pt}$。",
    "answer": "定义域 $x>1$。当 $x\\to 2$ 时，分母 $\\ln (x-1)\\to 0$，分子$\\to 1$，趋于无穷。填 $x=2$。",
    "solution": "",
    "plainStem": "f(x) = (x − 1)/ln(x − 1) 的无穷间断点为 x = ______。",
    "plainAnswer": "定义域 x>1。当 x→2 时，分母 ln(x-1)→0，分子→1，趋于无穷。填 x=2。",
    "plainSolution": ""
  },
  "ch01-027": {
    "stem": "设 $f(x) = x \\sin (2x - 1)/(1 + x^{2})$，则此函数在其定义域内是（　）。\n$A.$ 有界函数　　$B.$ 无界函数　　$C.$ 奇函数　　$D.$ 偶函数",
    "answer": "$|f(x)| = |x\\cdot \\sin (2x-1)| / (1+x^2) \\le |x| / (1+x^2) \\le 1/2$，故有界。选 $A$。",
    "solution": "",
    "plainStem": "设 f(x) = x sin(2x − 1)/(1 + x^{2})，则此函数在其定义域内是（　）。\nA. 有界函数　　B. 无界函数　　C. 奇函数　　D. 偶函数",
    "plainAnswer": "|f(x)| = |x·sin(2x-1)| / (1+x^2) ≤ |x| / (1+x^2) ≤ 1/2，故有界。选 A。",
    "plainSolution": ""
  },
  "ch01-028": {
    "stem": "对于数列 $\\{x_{n}\\}$，下列结论不成立的是（　）。\n$A.$ 单调有界时必收敛　　$B.$ 无界时必发散\n$C.$ 发散时必无界　　$D.$ 收敛时一定有界",
    "answer": "$A$对（单调有界必收敛）；$B$对（逆否命题：收敛必有界）；$C$错（如 $(-1)^n$ 发散但有界）；$D$对。选 $C$。",
    "solution": "",
    "plainStem": "对于数列 {x_{n}}，下列结论不成立的是（　）。\nA. 单调有界时必收敛　　B. 无界时必发散\nC. 发散时必无界　　D. 收敛时一定有界",
    "plainAnswer": "A对（单调有界必收敛）；B对（逆否命题：收敛必有界）；C错（如 (-1)^n 发散但有界）；D对。选 C。",
    "plainSolution": ""
  },
  "ch01-029": {
    "stem": "若数列 $\\{x_{n}\\}$ 收敛，则下列说法正确的是（　）。\n$A.$ 数列 $\\{x_{n}\\}$ 一定有界　　$B.$ 数列 $\\{x_{n}\\}$ 一定无界\n$C.$ 数列 $\\{x_{n}\\}$ 可能有界，也可能无界　　$D. \\lim_{n\\to \\infty } x_{n} = 0$",
    "answer": "收敛数列必有界，这是基本性质。选 $A$。",
    "solution": "",
    "plainStem": "若数列 {x_{n}} 收敛，则下列说法正确的是（　）。\nA. 数列 {x_{n}} 一定有界　　B. 数列 {x_{n}} 一定无界\nC. 数列 {x_{n}} 可能有界，也可能无界　　D. lim_{n→∞} x_{n} = 0",
    "plainAnswer": "收敛数列必有界，这是基本性质。选 A。",
    "plainSolution": ""
  },
  "ch01-030": {
    "stem": "下列说法正确的是（　）。\n$A.$ 若数列 $\\{x_{n}\\}$ 有界，则极限 $\\lim_{n\\to \\infty } x_{n}$ 一定存在\n$B.$ 若数列 $\\{x_{n}\\}$ 的极限 $\\lim_{n\\to \\infty } x_{n}$ 存在，则数列 $\\{x_{n}\\}$ 必有界\n$C.$ 若数列 $\\{x_{n}\\}$ 和 $\\{y_{n}\\}$ 满足 $\\lim_{n\\to \\infty } x_{n}y_{n} = 0$，则 $\\lim_{n\\to \\infty } x_{n} = 0$ 或 $\\lim_{n\\to \\infty } y_{n} = 0\nD.$ 若数列 $\\{x_{n}\\}$ 和 $\\{y_{n}\\}$ 的极限均存在，且满足 $x_{n} < y_{n}$，则 $\\lim_{n\\to \\infty } x_{n} < \\lim_{n\\to \\infty } y_{n}$",
    "answer": "$A$错（有界不一定收敛）；$B$对（收敛必有界）；$C$错；$D$错（极限应小于等于）。选 $B$。",
    "solution": "",
    "plainStem": "下列说法正确的是（　）。\nA. 若数列 {x_{n}} 有界，则极限 lim_{n→∞} x_{n} 一定存在\nB. 若数列 {x_{n}} 的极限 lim_{n→∞} x_{n} 存在，则数列 {x_{n}} 必有界\nC. 若数列 {x_{n}} 和 {y_{n}} 满足 lim_{n→∞} x_{n}y_{n} = 0，则 lim_{n→∞} x_{n} = 0 或 lim_{n→∞} y_{n} = 0\nD. 若数列 {x_{n}} 和 {y_{n}} 的极限均存在，且满足 x_{n} < y_{n}，则 lim_{n→∞} x_{n} < lim_{n→∞} y_{n}",
    "plainAnswer": "A错（有界不一定收敛）；B对（收敛必有界）；C错；D错（极限应小于等于）。选 B。",
    "plainSolution": ""
  },
  "ch01-031": {
    "stem": "下列说法正确的是（　）。\n$A.$ 若数列 $\\{x_{n}\\}$ 收敛，$\\{y_{n}\\}$ 发散，则数列 $\\{x_{n}y_{n}\\}$ 一定发散\n$B.$ 若数列 $\\{x_{n}\\}$ 收敛，$\\{y_{n}\\}$ 发散，则数列 $\\{x_{n} + y_{n}\\}$ 一定发散\n$C.$ 若两数列 $\\{x_{n}\\}$ 与 $\\{y_{n}\\}$ 均发散，则数列 $\\{x_{n}y_{n}\\}$ 一定发散\n$D.$ 若两数列 $\\{x_{n}\\}$ 与 $\\{y_{n}\\}$ 均发散，则数列 $\\{x_{n} + y_{n}\\}$ 一定发散",
    "answer": "若 $x_n$ 收敛，$y_n$ 发散，假设 $x_n + y_n$ 收敛，则 $y_n = (x_n+y_n) - x_n$ 也应收敛，矛盾。选 $B$。",
    "solution": "",
    "plainStem": "下列说法正确的是（　）。\nA. 若数列 {x_{n}} 收敛，{y_{n}} 发散，则数列 {x_{n}y_{n}} 一定发散\nB. 若数列 {x_{n}} 收敛，{y_{n}} 发散，则数列 {x_{n} + y_{n}} 一定发散\nC. 若两数列 {x_{n}} 与 {y_{n}} 均发散，则数列 {x_{n}y_{n}} 一定发散\nD. 若两数列 {x_{n}} 与 {y_{n}} 均发散，则数列 {x_{n} + y_{n}} 一定发散",
    "plainAnswer": "若 x_n 收敛，y_n 发散，假设 x_n + y_n 收敛，则 y_n = (x_n+y_n) - x_n 也应收敛，矛盾。选 B。",
    "plainSolution": ""
  },
  "ch01-032": {
    "stem": "若函数 $f(x)$ 在 $x = x_{0}$ 处连续，则下列说法正确的是（　）。\n$A. f(x_{0})$ 必存在且等于 $\\lim_{x\\to x_{0}} f(x)\nB. f(x_{0})$ 必存在，但不一定等于 $\\lim_{x\\to x_{0}} f(x)\nC. f(x_{0})$ 可以不存在\n$D.$ 若 $f(x_{0})$ 存在，则必等于 $\\lim_{x\\to x_{0}} f(x)$",
    "answer": "连续的定义即左极限$=$右极限$=$函数值。选 $A$。",
    "solution": "",
    "plainStem": "若函数 f(x) 在 x = x_{0} 处连续，则下列说法正确的是（　）。\nA. f(x_{0}) 必存在且等于 lim_{x→x_{0}} f(x)\nB. f(x_{0}) 必存在，但不一定等于 lim_{x→x_{0}} f(x)\nC. f(x_{0}) 可以不存在\nD. 若 f(x_{0}) 存在，则必等于 lim_{x→x_{0}} f(x)",
    "plainAnswer": "连续的定义即左极限=右极限=函数值。选 A。",
    "plainSolution": ""
  },
  "ch01-033": {
    "stem": "$\\lim_{x\\to \\infty } (x^{3} + x^{2} \\sin x + 2x)/(3x^{3} + x^{2} + \\sin x) =$ （　）。\n$A. 1/3$　　$B. 2/3$　　$C. 2$　　$D. 1/2$",
    "answer": "同除以 $x^3$，得 $(1 + \\sin x/x + 2/x^2) / (3 + 1/x + \\sin x/x^3) \\to 1/3$。选 $A$。",
    "solution": "",
    "plainStem": "lim_{x→∞} (x^{3} + x^{2} sin x + 2x)/(3x^{3} + x^{2} + sin x) = （　）。\nA. 1/3　　B. 2/3　　C. 2　　D. 1/2",
    "plainAnswer": "同除以 x^3，得 (1 + sinx/x + 2/x^2) / (3 + 1/x + sinx/x^3) → 1/3。选 A。",
    "plainSolution": ""
  },
  "ch01-034": {
    "stem": "当 $x\\to \\infty$ 时，下列函数是无穷小量的是（　）。\n$A. \\ln (1 + x^{2})$　　$B. (1/x) \\sin x$　　$C. x \\sin (1/x)$　　$D. x \\sin x$",
    "answer": "$x\\to \\infty$ 时，$1/x\\cdot \\sin x$ 的绝对值 $\\le 1/|x| \\to 0$，是无穷小。选 $B$。",
    "solution": "",
    "plainStem": "当 x→∞ 时，下列函数是无穷小量的是（　）。\nA. ln(1 + x^{2})　　B. (1/x) sin x　　C. x sin(1/x)　　D. x sin x",
    "plainAnswer": "x→∞ 时，1/x·sinx 的绝对值 ≤ 1/|x| → 0，是无穷小。选 B。",
    "plainSolution": ""
  },
  "ch01-035": {
    "stem": "设当 $x\\to 0$ 时，$(1 - x)^{1/3} - 1$ 是 $\\sin (x/2)$ 的（　）。\n$A.$ 等价无穷小　　$B.$ 同阶无穷小，但不是等价无穷小\n$C.$ 低阶无穷小　　$D.$ 高阶无穷小",
    "answer": "当 $x\\to 0$，$(1-x)^{1/3} - 1 \\sim -x/3$；$\\sin (x/2) \\sim x/2$。两者比值为 $-2/3$，同阶非等价。选 $B$。",
    "solution": "",
    "plainStem": "设当 x→0 时，(1 − x)^{1/3} − 1 是 sin(x/2) 的（　）。\nA. 等价无穷小　　B. 同阶无穷小，但不是等价无穷小\nC. 低阶无穷小　　D. 高阶无穷小",
    "plainAnswer": "当 x→0，(1-x)^(1/3) - 1 ~ -x/3；sin(x/2) ~ x/2。两者比值为 -2/3，同阶非等价。选 B。",
    "plainSolution": ""
  },
  "ch01-036": {
    "stem": "当 $x\\to 0$ 时，$x^{2} \\sin (1/x)$ 是（　）的无穷小量。\n$A.$ 比 $x$ 高阶　　$B.$ 与 $x$ 同阶　　$C.$ 比 $x$ 低阶　　$D.$ 与 $x$ 不能比较",
    "answer": "$\\lim (x^2\\cdot \\sin (1/x)) / x = \\lim x\\cdot \\sin (1/x) = 0$。故比 $x$ 高阶。选 $A$。",
    "solution": "",
    "plainStem": "当 x→0 时，x^{2} sin(1/x) 是（　）的无穷小量。\nA. 比 x 高阶　　B. 与 x 同阶　　C. 比 x 低阶　　D. 与 x 不能比较",
    "plainAnswer": "lim (x^2·sin(1/x)) / x = lim x·sin(1/x) = 0。故比 x 高阶。选 A。",
    "plainSolution": ""
  },
  "ch01-037": {
    "stem": "当 $x\\to 0^{+}$ 时，与 $\\sqrt{x}$ 等价的无穷小量是（　）。\n$A. 1 - e^{\\sqrt{x}}$　　$B. \\ln ((1 + x)/(1 - \\sqrt{x}))$　　$C. \\sqrt{1 + \\sqrt{x}} - 1$　　$D. 1 - \\cos \\sqrt{x}$",
    "answer": "$x\\to 0+$ 时，$\\ln [(1+x)/(1-\\sqrt{x})] = \\ln (1+x) - \\ln (1-\\sqrt{x}) \\sim x + \\sqrt{x} \\sim \\sqrt{x}$。选 $B$。",
    "solution": "",
    "plainStem": "当 x→0^{+} 时，与 √x 等价的无穷小量是（　）。\nA. 1 − e^{√x}　　B. ln((1 + x)/(1 − √x))　　C. √(1 + √x) − 1　　D. 1 − cos√x",
    "plainAnswer": "x→0+ 时，ln[(1+x)/(1-√x)] = ln(1+x) - ln(1-√x) ~ x + √x ~ √x。选 B。",
    "plainSolution": ""
  },
  "ch01-038": {
    "stem": "设当 $x\\to 0$ 时，$\\ln (1 - x^{2})$ 与 $x^{k}$ 是同阶无穷小，则整数 $k =$ （　）。\n$A. 1$　　$B. 2$　　$C. 3$　　$D. 4$",
    "answer": "$\\ln (1-x^2) \\sim -x^2$，与 $x^k$ 同阶，故 $k=2$。选 $B$。",
    "solution": "",
    "plainStem": "设当 x→0 时，ln(1 − x^{2}) 与 x^{k} 是同阶无穷小，则整数 k = （　）。\nA. 1　　B. 2　　C. 3　　D. 4",
    "plainAnswer": "ln(1-x^2) ~ -x^2，与 x^k 同阶，故 k=2。选 B。",
    "plainSolution": ""
  },
  "ch01-039": {
    "stem": "当 $x\\to 0$ 时，$f(x) = x - \\sin (ax)$ 与 $g(x) = x^{2} \\ln (1 - bx)$ 是等价无穷小，则（　）。\n$A. a = 1, b = -1/6$　　$B. a = 1, b = 1/6\nC. a = -1, b = -1/6$　　$D. a = -1, b = 1/6$",
    "answer": "$f(x)$ 为 $x^3$ 阶，故 $a=1$（否则为 $x$ 阶）。此时 $f(x) = x-\\sin x \\sim x^3/6$。$g(x) \\sim -b\\cdot x^3$。等价则 $1/6 = -b$，$b = -1/6$。选 $C$（注：若原题印为 $\\ln (1+bx)$，则 $b=1/6$）。",
    "solution": "",
    "plainStem": "当 x→0 时，f(x) = x − sin(ax) 与 g(x) = x^{2} ln(1 − bx) 是等价无穷小，则（　）。\nA. a = 1, b = −1/6　　B. a = 1, b = 1/6\nC. a = −1, b = −1/6　　D. a = −1, b = 1/6",
    "plainAnswer": "f(x) 为 x^3 阶，故 a=1（否则为 x 阶）。此时 f(x) = x-sinx ~ x^3/6。g(x) ~ -b·x^3。等价则 1/6 = -b，b = -1/6。选 C（注：若原题印为 ln(1+bx)，则 b=1/6）。",
    "plainSolution": ""
  },
  "ch01-040": {
    "stem": "已知 $f(x) = (x^{2} - 1)/(x^{2} - 3x + 2)$，则下列说法正确的是（　）。\n$A. f(x)$ 没有第一类间断点\n$B. f(x)$ 有一个第一类间断点\n$C. f(x)$ 有两个第一类间断点\n$D. f(x)$ 有两个第二类间断点",
    "answer": "$f(x)$ 有两个间断点：$x=1$ 可去（第一类），$x=2$ 无穷（第二类）。选 $B$。",
    "solution": "",
    "plainStem": "已知 f(x) = (x^{2} − 1)/(x^{2} − 3x + 2)，则下列说法正确的是（　）。\nA. f(x) 没有第一类间断点\nB. f(x) 有一个第一类间断点\nC. f(x) 有两个第一类间断点\nD. f(x) 有两个第二类间断点",
    "plainAnswer": "f(x) 有两个间断点：x=1 可去（第一类），x=2 无穷（第二类）。选 B。",
    "plainSolution": ""
  },
  "ch01-041": {
    "stem": "已知 $f(x) = (x^{2} - 1)/\\sin \\pi x$，则 $f(x)$（　）。\n$A.$ 有无穷多个第二类间断点\n$B.$ 只有一个可去间断点\n$C.$ 有两个跳跃间断点\n$D.$ 没有间断点",
    "answer": "间断点为整数。$x=\\pm 1$ 时分子也为$0$，是可去；其余整数（无数个）为无穷间断（第二类）。选 $A$。",
    "solution": "",
    "plainStem": "已知 f(x) = (x^{2} − 1)/sin πx，则 f(x)（　）。\nA. 有无穷多个第二类间断点\nB. 只有一个可去间断点\nC. 有两个跳跃间断点\nD. 没有间断点",
    "plainAnswer": "间断点为整数。x=±1 时分子也为0，是可去；其余整数（无数个）为无穷间断（第二类）。选 A。",
    "plainSolution": ""
  },
  "ch01-042": {
    "stem": "求极限 $\\lim_{x\\to 0} (\\tan x - \\sin x)/(x \\ln (1 + x^{2}))$。",
    "answer": "求 $\\lim_{x\\to 0} (\\tan x - \\sin x) / (x\\cdot \\ln (1+x^2))$\n解：分母等价替换：$\\ln (1+x^2) \\sim x^2$。分子化简：$\\tan x - \\sin x = \\tan x(1 - \\cos x)$。当 $x\\to 0$ 时，$\\tan x \\sim x$，$1-\\cos x \\sim x^2/2$。\n原极限 $= \\lim_{x\\to 0} [x\\cdot (x^2/2)] / (x\\cdot x^2) = 1/2$。",
    "solution": "",
    "plainStem": "求极限 lim_{x→0} (tan x − sin x)/(x ln(1 + x^{2}))。",
    "plainAnswer": "求 lim(x→0) (tanx - sinx) / (x·ln(1+x^2))\n解：分母等价替换：ln(1+x^2) ~ x^2。分子化简：tanx - sinx = tanx(1 - cosx)。当 x→0 时，tanx ~ x，1-cosx ~ x^2/2。\n原极限 = lim(x→0) [x·(x^2/2)] / (x·x^2) = 1/2。",
    "plainSolution": ""
  },
  "ch01-043": {
    "stem": "求 $\\lim_{x\\to 0} (1 - \\cos x^{2})/(x^{2} \\ln (1 + \\sin^{2} x))$。",
    "answer": "求 $\\lim_{x\\to 0} (1 - \\cos (x^2)) / (x^2\\cdot \\ln (1+\\sin^2x))$\n解：分子 $1-\\cos (x^2) \\sim (x^2)^2/2 = x^4/2$。分母中 $\\ln (1+\\sin^2x) \\sim \\sin^2x \\sim x^2$，所以分母 $\\sim x^2\\cdot x^2 = x^4$。\n原极限 $= \\lim_{x\\to 0} (x^4/2) / x^4 = 1/2$。",
    "solution": "",
    "plainStem": "求 lim_{x→0} (1 − cos x^{2})/(x^{2} ln(1 + sin^{2} x))。",
    "plainAnswer": "求 lim(x→0) (1 - cos(x^2)) / (x^2·ln(1+sin^2x))\n解：分子 1-cos(x^2) ~ (x^2)^2/2 = x^4/2。分母中 ln(1+sin^2x) ~ sin^2x ~ x^2，所以分母 ~ x^2·x^2 = x^4。\n原极限 = lim(x→0) (x^4/2) / x^4 = 1/2。",
    "plainSolution": ""
  },
  "ch01-044": {
    "stem": "$\\lim_{x\\to 0} (e - e^{\\cos x})/(\\sqrt[3]{1 + x^{2}} - 1)$。",
    "answer": "求 $\\lim_{x\\to 0} (e - e^{\\cos x}) / (\\sqrt[3]{1+x^2} - 1)$\n解：分母等价替换：$\\sqrt[3]{1+x^2} - 1 \\sim (1/3)x^2$。分子提公因式：$e^{\\cos x}(e^{1-\\cos x} - 1)$。因为 $e^{1-\\cos x} - 1 \\sim 1-\\cos x \\sim x^2/2$，且 $x\\to 0$ 时 $e^{\\cos x} \\to e$。\n原极限 $= \\lim_{x\\to 0} [e\\cdot (x^2/2)] / [(1/3)x^2] = (e/2) / (1/3) = 3e/2$。",
    "solution": "",
    "plainStem": "lim_{x→0} (e − e^{cos x})/(∛(1 + x^{2}) − 1)。",
    "plainAnswer": "求 lim(x→0) (e - e^(cosx)) / (³√(1+x^2) - 1)\n解：分母等价替换：³√(1+x^2) - 1 ~ (1/3)x^2。分子提公因式：e^(cosx)(e^(1-cosx) - 1)。因为 e^(1-cosx) - 1 ~ 1-cosx ~ x^2/2，且 x→0 时 e^(cosx) → e。\n原极限 = lim(x→0) [e·(x^2/2)] / [(1/3)x^2] = (e/2) / (1/3) = 3e/2。",
    "plainSolution": ""
  },
  "ch01-045": {
    "stem": "$\\lim_{x\\to 0} (\\sqrt[3]{\\cos x} - \\cos x)/\\sin^{2} x$。",
    "answer": "求 $\\lim_{x\\to 0} (\\sqrt[3]{\\cos x} - \\cos x) / \\sin^2x$\n解：利用公式 $a^3 - b^3 = (a-b)(a^2+ab+b^2)$。设 $a=\\sqrt[3]{\\cos x}$，$b=\\cos x$，则 $a^3-b^3 = \\cos x - \\cos^3x = \\cos x(1-\\cos^2x) = \\cos x\\cdot \\sin^2x$。\n所以 $\\sqrt[3]{\\cos x} - \\cos x = \\cos x\\cdot \\sin^2x / (a^2+ab+b^2)$。\n当 $x\\to 0$ 时，$\\cos x\\to 1$，分母 $a^2+ab+b^2 \\to 1+1+1 = 3$。\n原极限 $= \\lim_{x\\to 0} [\\cos x\\cdot \\sin^2x / 3] / \\sin^2x = \\lim_{x\\to 0} \\cos x / 3 = 1/3$。",
    "solution": "",
    "plainStem": "lim_{x→0} (∛(cos x) − cos x)/sin^{2} x。",
    "plainAnswer": "求 lim(x→0) (³√(cosx) - cosx) / sin^2x\n解：利用公式 a^3 - b^3 = (a-b)(a^2+ab+b^2)。设 a=³√(cosx)，b=cosx，则 a^3-b^3 = cosx - cos^3x = cosx(1-cos^2x) = cosx·sin^2x。\n所以 ³√(cosx) - cosx = cosx·sin^2x / (a^2+ab+b^2)。\n当 x→0 时，cosx→1，分母 a^2+ab+b^2 → 1+1+1 = 3。\n原极限 = lim(x→0) [cosx·sin^2x / 3] / sin^2x = lim(x→0) cosx / 3 = 1/3。",
    "plainSolution": ""
  },
  "ch01-046": {
    "stem": "设函数 $f(x) = \\{ x^{2} + 2x, x \\le 0; 1 + x, 0 < x \\le 1; 1/(x - 1), x > 1 \\}$，求此函数的间断点并判断间断点的类型。",
    "answer": "求分段函数的间断点并判断类型。$f(x)=x^2+2x (x\\le 0); f(x)=1+x (0<x\\le 1); f(x)=1/(x-1) (x>1)$\n解：\n$(1)$ 考察分段点 $x=0$：左极限 $\\lim_{x\\to 0-} (x^2+2x) = 0$；右极限 $\\lim_{x\\to 0+} (1+x) = 1$。左右极限存在但不相等，故 $x=0$ 是跳跃间断点（第一类）。\n$(2)$ 考察分段点 $x=1$：左极限 $\\lim_{x\\to 1-} (1+x) = 2$；右极限 $\\lim_{x\\to 1+} 1/(x-1) = +\\infty$。右极限不存在，故 $x=1$ 是无穷间断点（第二类）。",
    "solution": "",
    "plainStem": "设函数 f(x) = { x^{2} + 2x, x ≤ 0; 1 + x, 0 < x ≤ 1; 1/(x − 1), x > 1 }，求此函数的间断点并判断间断点的类型。",
    "plainAnswer": "求分段函数的间断点并判断类型。f(x)=x^2+2x (x≤0); f(x)=1+x (0<x≤1); f(x)=1/(x-1) (x>1)\n解：\n(1) 考察分段点 x=0：左极限 lim(x→0-) (x^2+2x) = 0；右极限 lim(x→0+) (1+x) = 1。左右极限存在但不相等，故 x=0 是跳跃间断点（第一类）。\n(2) 考察分段点 x=1：左极限 lim(x→1-) (1+x) = 2；右极限 lim(x→1+) 1/(x-1) = +∞。右极限不存在，故 x=1 是无穷间断点（第二类）。",
    "plainSolution": ""
  },
  "ch01-047": {
    "stem": "试用零点定理证明方程 $x^{5} + x - 1 = 0$ 在区间 $(0, 1)$ 内至少有一个根。",
    "answer": "证明方程 $x^5 + x - 1 = 0$ 在 $(0,1)$ 内至少有一个根。\n证明：构造函数 $f(x) = x^5 + x - 1$。因为 $f(x)$ 是初等函数，在闭区间 $[0,1]$ 上连续。\n计算端点值：$f(0) = -1 < 0$，$f(1) = 1 + 1 - 1 = 1 > 0$。\n根据零点定理，$f(0)\\cdot f(1) < 0$，故至少存在一点 $\\xi \\in (0,1)$，使得 $f(\\xi ) = 0$。即方程至少有一个根。",
    "solution": "",
    "plainStem": "试用零点定理证明方程 x^{5} + x − 1 = 0 在区间 (0, 1) 内至少有一个根。",
    "plainAnswer": "证明方程 x^5 + x - 1 = 0 在 (0,1) 内至少有一个根。\n证明：构造函数 f(x) = x^5 + x - 1。因为 f(x) 是初等函数，在闭区间 [0,1] 上连续。\n计算端点值：f(0) = -1 < 0，f(1) = 1 + 1 - 1 = 1 > 0。\n根据零点定理，f(0)·f(1) < 0，故至少存在一点 ξ ∈ (0,1)，使得 f(ξ) = 0。即方程至少有一个根。",
    "plainSolution": ""
  },
  "ch01-048": {
    "stem": "设 $f(x)$ 在 $[0, a]$ 上连续，且 $f(0) = f(a)$，证明：存在 $\\xi \\in (0, a)$ 使 $f(\\xi ) = f(\\xi + a/2)$。",
    "answer": "设 $f(x)$ 在 $[0,a]$ 上连续，且 $f(0)=f(a)$，证明：存在 $\\xi \\in (0,a)$ 使 $f(\\xi )=f(\\xi +a/2)$。\n证明：构造函数 $F(x) = f(x) - f(x+a/2)$。$F(x)$ 在 $[0, a/2]$ 上连续。\n计算端点值：$F(0) = f(0) - f(a/2)$；$F(a/2) = f(a/2) - f(a) = f(a/2) - f(0)$。\n若 $F(0) = 0$，则取 $\\xi = 0$；若 $F(a/2) = 0$，则取 $\\xi = a/2$。\n若均不为$0$，则 $F(0)$ 与 $F(a/2)$ 互为相反数（即符号相反）。根据零点定理，存在 $\\xi \\in (0, a/2) \\subset (0, a)$，使得 $F(\\xi ) = 0$，即 $f(\\xi )=f(\\xi +a/2)$。得证。",
    "solution": "",
    "plainStem": "设 f(x) 在 [0, a] 上连续，且 f(0) = f(a)，证明：存在 ξ ∈ (0, a) 使 f(ξ) = f(ξ + a/2)。",
    "plainAnswer": "设 f(x) 在 [0,a] 上连续，且 f(0)=f(a)，证明：存在 ξ ∈ (0,a) 使 f(ξ)=f(ξ+a/2)。\n证明：构造函数 F(x) = f(x) - f(x+a/2)。F(x) 在 [0, a/2] 上连续。\n计算端点值：F(0) = f(0) - f(a/2)；F(a/2) = f(a/2) - f(a) = f(a/2) - f(0)。\n若 F(0) = 0，则取 ξ = 0；若 F(a/2) = 0，则取 ξ = a/2。\n若均不为0，则 F(0) 与 F(a/2) 互为相反数（即符号相反）。根据零点定理，存在 ξ ∈ (0, a/2) ⊂ (0, a)，使得 F(ξ) = 0，即 f(ξ)=f(ξ+a/2)。得证。",
    "plainSolution": ""
  },
  "ch01-049": {
    "stem": "证明：方程 $x - 2 \\sin x = 3$ 至少有一个正根。",
    "answer": "证明：方程 $x - 2\\sin x = 3$ 至少有一个正根。\n证明：构造函数 $f(x) = x - 2\\sin x - 3$。在闭区间 $[0, \\pi ]$ 上连续。\n$f(0) = 0 - 0 - 3 = -3 < 0$。\n$f(\\pi ) = \\pi - 0 - 3 = \\pi - 3 > 0$。\n由于 $f(0)\\cdot f(\\pi ) < 0$，由零点定理，至少存在 $\\xi \\in (0, \\pi )$，使得 $f(\\xi ) = 0$。显然 $\\xi > 0$，故方程至少有一个正根。",
    "solution": "",
    "plainStem": "证明：方程 x − 2 sin x = 3 至少有一个正根。",
    "plainAnswer": "证明：方程 x - 2sinx = 3 至少有一个正根。\n证明：构造函数 f(x) = x - 2sinx - 3。在闭区间 [0, π] 上连续。\nf(0) = 0 - 0 - 3 = -3 < 0。\nf(π) = π - 0 - 3 = π - 3 > 0。\n由于 f(0)·f(π) < 0，由零点定理，至少存在 ξ ∈ (0, π)，使得 f(ξ) = 0。显然 ξ > 0，故方程至少有一个正根。",
    "plainSolution": ""
  }
};
