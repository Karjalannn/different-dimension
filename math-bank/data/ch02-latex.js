/*
 * ch02 题目迁移为 LaTeX。
 * plain* 为迁移前原文，公式图片生成失败时回退。
 */
window.TJ_CH02_LATEX = {
  "ch02-001": {
    "stem": "已知物体的运动规律为 $s = A \\sin \\omega t$（$A$、$\\omega$ 是常数），求物体运动的加速度，并验证：\n$d^{2}s/dt^{2} + \\omega ^{2}s = 0$。",
    "answer": "$ds/dt = A\\omega \\cos \\omega t$，$d^{2}s/dt^{2} = -A\\omega ^{2} \\sin \\omega t$；故 $d^{2}s/dt^{2} + \\omega ^{2}s = 0$。",
    "solution": "$ds/dt = A \\cos \\omega t \\cdot \\omega = A\\omega \\cos \\omega t$，\n$d^{2}s/dt^{2} = -A\\omega ^{2} \\sin \\omega t$。\n故\n$d^{2}s/dt^{2} + \\omega ^{2}s = -A\\omega ^{2} \\sin \\omega t + \\omega ^{2}A \\sin \\omega t = 0$。",
    "plainStem": "已知物体的运动规律为 s = A sin ωt（A、ω 是常数），求物体运动的加速度，并验证：\nd^{2}s/dt^{2} + ω^{2}s = 0。",
    "plainAnswer": "ds/dt = Aω cos ωt，d^{2}s/dt^{2} = −Aω^{2} sin ωt；故 d^{2}s/dt^{2} + ω^{2}s = 0。",
    "plainSolution": "ds/dt = A cos ωt · ω = Aω cos ωt，\nd^{2}s/dt^{2} = −Aω^{2} sin ωt。\n故\nd^{2}s/dt^{2} + ω^{2}s = −Aω^{2} sin ωt + ω^{2}A sin ωt = 0。"
  },
  "ch02-002": {
    "stem": "密度大的陨星进入大气层时，当它离地心为 $s km$ 时的速度与 $\\sqrt{s}$ 成反比。试证陨星的加速度 $a$ 与 $s^{2}$ 成反比。",
    "answer": "$v = k/\\sqrt{s}$（$k$ 为比例系数），$a = -k^{2}/(2s^{2})$，即陨星的加速度与 $s^{2}$ 成反比。",
    "solution": "由题意知\n$v = ds/dt = k/\\sqrt{s}$，\n其中 $k$ 为比例系数，则\n$a = d^{2}s/dt^{2} = (d/ds)(k/\\sqrt{s})\\cdot (ds/dt)\n= -(1/2)\\cdot k/s^{3/2}\\cdot k/\\sqrt{s}\n= -k^{2}/(2s^{2})$，\n即陨星的加速度与 $s^{2}$ 成反比。",
    "plainStem": "密度大的陨星进入大气层时，当它离地心为 s km 时的速度与 √s 成反比。试证陨星的加速度 a 与 s^{2} 成反比。",
    "plainAnswer": "v = k/√s（k 为比例系数），a = −k^{2}/(2s^{2})，即陨星的加速度与 s^{2} 成反比。",
    "plainSolution": "由题意知\nv = ds/dt = k/√s，\n其中 k 为比例系数，则\na = d^{2}s/dt^{2} = (d/ds)(k/√s)·(ds/dt)\n= −(1/2)·k/s^{3/2}·k/√s\n= −k^{2}/(2s^{2})，\n即陨星的加速度与 s^{2} 成反比。"
  },
  "ch02-003": {
    "stem": "求由方程 $y^{2} - 2xy + 9 = 0$ 所确定的隐函数的导数 $dy/dx$。",
    "answer": "$y' = y/(y - x)$",
    "solution": "在方程两端分别对 $x$ 求导，得\n$2y y' - 2y - 2x y' = 0$，\n从而 $y' = y/(y - x)$，其中 $y = y(x)$ 是由方程 $y^{2} - 2xy + 9 = 0$ 所确定的隐函数。",
    "plainStem": "求由方程 y^{2} − 2xy + 9 = 0 所确定的隐函数的导数 dy/dx。",
    "plainAnswer": "y′ = y/(y − x)",
    "plainSolution": "在方程两端分别对 x 求导，得\n2y y′ − 2y − 2x y′ = 0，\n从而 y′ = y/(y − x)，其中 y = y(x) 是由方程 y^{2} − 2xy + 9 = 0 所确定的隐函数。"
  },
  "ch02-004": {
    "stem": "求由方程 $x^{3} + y^{3} - 3axy = 0$ 所确定的隐函数的导数 $dy/dx$。",
    "answer": "$y' = (ay - x^{2})/(y^{2} - ax)$",
    "solution": "在方程两端分别对 $x$ 求导，得\n$3x^{2} + 3y^{2}y' - 3ay - 3axy' = 0$，\n从而 $y' = (ay - x^{2})/(y^{2} - ax)$，其中 $y = y(x)$ 是由方程 $x^{3} + y^{3} - 3axy = 0$ 所确定的隐函数。",
    "plainStem": "求由方程 x^{3} + y^{3} − 3axy = 0 所确定的隐函数的导数 dy/dx。",
    "plainAnswer": "y′ = (ay − x^{2})/(y^{2} − ax)",
    "plainSolution": "在方程两端分别对 x 求导，得\n3x^{2} + 3y^{2}y′ − 3ay − 3axy′ = 0，\n从而 y′ = (ay − x^{2})/(y^{2} − ax)，其中 y = y(x) 是由方程 x^{3} + y^{3} − 3axy = 0 所确定的隐函数。"
  },
  "ch02-005": {
    "stem": "求由方程 $xy = e^{x+y}$ 所确定的隐函数的导数 $dy/dx$。",
    "answer": "$y' = (e^{x+y} - y)/(x - e^{x+y})$",
    "solution": "在方程两端分别对 $x$ 求导，得\n$y + xy' = e^{x+y}(1 + y')$，\n从而 $y' = (e^{x+y} - y)/(x - e^{x+y})$，其中 $y = y(x)$ 是由方程 $xy = e^{x+y}$ 所确定的隐函数。",
    "plainStem": "求由方程 xy = e^{x+y} 所确定的隐函数的导数 dy/dx。",
    "plainAnswer": "y′ = (e^{x+y} − y)/(x − e^{x+y})",
    "plainSolution": "在方程两端分别对 x 求导，得\ny + xy′ = e^{x+y}(1 + y′)，\n从而 y′ = (e^{x+y} − y)/(x − e^{x+y})，其中 y = y(x) 是由方程 xy = e^{x+y} 所确定的隐函数。"
  },
  "ch02-006": {
    "stem": "求由方程 $y = 1 - xe^{y}$ 所确定的隐函数的导数 $dy/dx$。",
    "answer": "$y' = -e^{y}/(1 + xe^{y})$",
    "solution": "在方程两端分别对 $x$ 求导，得\n$y' = -e^{y} - xe^{y}y'$，\n从而 $y' = -e^{y}/(1 + xe^{y})$，其中 $y = y(x)$ 是由方程 $y = 1 - xe^{y}$ 所确定的隐函数。",
    "plainStem": "求由方程 y = 1 − xe^{y} 所确定的隐函数的导数 dy/dx。",
    "plainAnswer": "y′ = −e^{y}/(1 + xe^{y})",
    "plainSolution": "在方程两端分别对 x 求导，得\ny′ = −e^{y} − xe^{y}y′，\n从而 y′ = −e^{y}/(1 + xe^{y})，其中 y = y(x) 是由方程 y = 1 − xe^{y} 所确定的隐函数。"
  },
  "ch02-007": {
    "stem": "求由方程 $x^{2} - y^{2} = 1$ 所确定的隐函数的二阶导数 $d^{2}y/dx^{2}$。",
    "answer": "$y'' = -1/y^{3}$",
    "solution": "应用隐函数的求导方法，得\n$2x - 2yy' = 0$，\n于是 $y' = x/y$。\n在上式两端再对 $x$ 求导，得\n$y'' = (y - xy')/y^{2}\n= (y - x^{2}/y)/y^{2}\n= (y^{2} - x^{2})/y^{3}\n= -1/y^{3}$。",
    "plainStem": "求由方程 x^{2} − y^{2} = 1 所确定的隐函数的二阶导数 d^{2}y/dx^{2}。",
    "plainAnswer": "y″ = −1/y^{3}",
    "plainSolution": "应用隐函数的求导方法，得\n2x − 2yy′ = 0，\n于是 y′ = x/y。\n在上式两端再对 x 求导，得\ny″ = (y − xy′)/y^{2}\n= (y − x^{2}/y)/y^{2}\n= (y^{2} − x^{2})/y^{3}\n= −1/y^{3}。"
  },
  "ch02-008": {
    "stem": "求由方程 $b^{2}x^{2} + a^{2}y^{2} = a^{2}b^{2}$ 所确定的隐函数的二阶导数 $d^{2}y/dx^{2}$。",
    "answer": "$y'' = -b^{4}/(a^{2}y^{3})$",
    "solution": "应用隐函数的求导方法，得\n$2xb^{2} + 2a^{2}yy' = 0$，\n于是\n$y' = -b^{2}x/(a^{2}y)$，\n$y'' = -(b^{2}/a^{2})\\cdot (y - xy')/y^{2} = -b^{4}/(a^{2}y^{3})$。",
    "plainStem": "求由方程 b^{2}x^{2} + a^{2}y^{2} = a^{2}b^{2} 所确定的隐函数的二阶导数 d^{2}y/dx^{2}。",
    "plainAnswer": "y″ = −b^{4}/(a^{2}y^{3})",
    "plainSolution": "应用隐函数的求导方法，得\n2xb^{2} + 2a^{2}yy′ = 0，\n于是\ny′ = −b^{2}x/(a^{2}y)，\ny″ = −(b^{2}/a^{2})·(y − xy′)/y^{2} = −b^{4}/(a^{2}y^{3})。"
  },
  "ch02-009": {
    "stem": "求由方程 $y = \\tan (x + y)$ 所确定的隐函数的二阶导数 $d^{2}y/dx^{2}$。",
    "answer": "$y'' = -2\\csc^{2}(x + y)\\cdot \\cot^{3}(x + y)$",
    "solution": "应用隐函数的求导方法，得\n$y' = \\sec^{2}(x + y)(1 + y')\n= [1 + \\tan^{2}(x + y)](1 + y')\n= (1 + y^{2})(1 + y')$，\n于是\n$y' = (1 + y^{2})/[1 - (1 + y^{2})] = -1/y^{2} - 1$，\n$y'' = 2y'/y^{3} = -2(1 + y^{2})/y^{5} = -2\\csc^{2}(x + y)\\cdot \\cot^{3}(x + y)$。",
    "plainStem": "求由方程 y = tan(x + y) 所确定的隐函数的二阶导数 d^{2}y/dx^{2}。",
    "plainAnswer": "y″ = −2csc^{2}(x + y)·cot^{3}(x + y)",
    "plainSolution": "应用隐函数的求导方法，得\ny′ = sec^{2}(x + y)(1 + y′)\n= [1 + tan^{2}(x + y)](1 + y′)\n= (1 + y^{2})(1 + y′)，\n于是\ny′ = (1 + y^{2})/[1 − (1 + y^{2})] = −1/y^{2} − 1，\ny″ = 2y′/y^{3} = −2(1 + y^{2})/y^{5} = −2csc^{2}(x + y)·cot^{3}(x + y)。"
  },
  "ch02-010": {
    "stem": "求由方程 $y = 1 + xe^{y}$ 所确定的隐函数的二阶导数 $d^{2}y/dx^{2}$。",
    "answer": "$y'' = e^{2y}(2 - xe^{y})/(1 - xe^{y})^{3}$",
    "solution": "应用隐函数的求导方法，得\n$y' = e^{y} + xe^{y}y'$，\n于是\n$y' = e^{y}/(1 - xe^{y})$，\n$y'' = [e^{y}y'(1 - xe^{y}) - e^{y}(-e^{y} - xe^{y}y')]/(1 - xe^{y})^{2}\n= (e^{y}y' + e^{2y})/(1 - xe^{y})^{2}\n= e^{2y}(2 - xe^{y})/(1 - xe^{y})^{3}$。",
    "plainStem": "求由方程 y = 1 + xe^{y} 所确定的隐函数的二阶导数 d^{2}y/dx^{2}。",
    "plainAnswer": "y″ = e^{2y}(2 − xe^{y})/(1 − xe^{y})^{3}",
    "plainSolution": "应用隐函数的求导方法，得\ny′ = e^{y} + xe^{y}y′，\n于是\ny′ = e^{y}/(1 − xe^{y})，\ny″ = [e^{y}y′(1 − xe^{y}) − e^{y}(−e^{y} − xe^{y}y′)]/(1 − xe^{y})^{2}\n= (e^{y}y′ + e^{2y})/(1 − xe^{y})^{2}\n= e^{2y}(2 − xe^{y})/(1 − xe^{y})^{3}。"
  },
  "ch02-011": {
    "stem": "落在平静水面上的石头，产生同心波纹。若最外一圈波半径的增大速率总是 $6 m/s$，问在 $2 s$ 末扰动水面面积增大的速率为多少？",
    "answer": "$144\\pi m^{2}/s$",
    "solution": "设最外一圈波的半径为 $r = r(t)$，圆的面积为 $S = S(t)$。在 $S = \\pi r^{2}$ 两端分别对 $t$ 求导，得\n$dS/dt = 2\\pi r\\cdot dr/dt$。\n当 $t = 2$ 时，$r = 6 \\times 2 = 12$，$dr/dt = 6$，代入上式得\n$dS/dt |_{t=2} = 2\\pi \\cdot 12\\cdot 6 = 144\\pi$（$m^{2}/s$）。",
    "plainStem": "落在平静水面上的石头，产生同心波纹。若最外一圈波半径的增大速率总是 6 m/s，问在 2 s 末扰动水面面积增大的速率为多少？",
    "plainAnswer": "144π m^{2}/s",
    "plainSolution": "设最外一圈波的半径为 r = r(t)，圆的面积为 S = S(t)。在 S = πr^{2} 两端分别对 t 求导，得\ndS/dt = 2πr·dr/dt。\n当 t = 2 时，r = 6 × 2 = 12，dr/dt = 6，代入上式得\ndS/dt |_{t=2} = 2π·12·6 = 144π（m^{2}/s）。"
  },
  "ch02-012": {
    "stem": "求函数 $y = (1 + x)^{1/m}$ 的 $n$ 阶导数。",
    "answer": "$y^{(n)} = (1/m)(1/m - 1)\\ldots (1/m - n + 1)(1 + x)^{1/m - n}$",
    "solution": "$y' = (1/m)(1 + x)^{1/m - 1}$，\n$y'' = (1/m)(1/m - 1)(1 + x)^{1/m - 2}$，…，\n$y^{(n)} = (1/m)(1/m - 1)\\ldots (1/m - n + 1)(1 + x)^{1/m - n}$。",
    "plainStem": "求函数 y = (1 + x)^{1/m} 的 n 阶导数。",
    "plainAnswer": "y^{(n)} = (1/m)(1/m − 1)…(1/m − n + 1)(1 + x)^{1/m − n}",
    "plainSolution": "y′ = (1/m)(1 + x)^{1/m − 1}，\ny″ = (1/m)(1/m − 1)(1 + x)^{1/m − 2}，…，\ny^{(n)} = (1/m)(1/m − 1)…(1/m − n + 1)(1 + x)^{1/m − n}。"
  },
  "ch02-013": {
    "stem": "求函数 $y = (1 - x)/(1 + x)$ 的 $n$ 阶导数。",
    "answer": "$y^{(n)} = 2\\cdot (-1)^{n}n!/(1 + x)^{n + 1}$",
    "solution": "由\n$(1/(1 + x))^{(n)} = (-1)^{n}n!/(1 + x)^{n + 1}$\n知\n$y^{(n)} = ((1 - x)/(1 + x))^{(n)}\n= (-1 + 2/(x + 1))^{(n)}\n= 2(1/(x + 1))^{(n)}\n= 2\\cdot (-1)^{n}n!/(1 + x)^{n + 1}$。",
    "plainStem": "求函数 y = (1 − x)/(1 + x) 的 n 阶导数。",
    "plainAnswer": "y^{(n)} = 2·(−1)^{n}n!/(1 + x)^{n + 1}",
    "plainSolution": "由\n(1/(1 + x))^{(n)} = (−1)^{n}n!/(1 + x)^{n + 1}\n知\ny^{(n)} = ((1 − x)/(1 + x))^{(n)}\n= (−1 + 2/(x + 1))^{(n)}\n= 2(1/(x + 1))^{(n)}\n= 2·(−1)^{n}n!/(1 + x)^{n + 1}。"
  },
  "ch02-014": {
    "stem": "求曲线 $\\{ x = 2e^{t}, y = e^{-t} \\}$ 在 $t = 0$ 相应的点处的切线方程及法线方程。",
    "answer": "切线方程：$x + 2y - 4 = 0$；法线方程：$2x - y - 3 = 0$。",
    "solution": "$dy/dx = (dy/dt)/(dx/dt) = (-e^{-t})/(2e^{t}) = -1/(2e^{2t})$，\n$dy/dx |_{t=0} = -1/2$。\n$t = 0$ 对应的点为 $(2, 1)$，故曲线在点 $(2, 1)$ 处的切线方程为\n$y - 1 = -(1/2)(x - 2)$，\n即 $x + 2y - 4 = 0$。\n法线方程为\n$y - 1 = 2(x - 2)$，\n即 $2x - y - 3 = 0$。",
    "plainStem": "求曲线 { x = 2e^{t}, y = e^{−t} } 在 t = 0 相应的点处的切线方程及法线方程。",
    "plainAnswer": "切线方程：x + 2y − 4 = 0；法线方程：2x − y − 3 = 0。",
    "plainSolution": "dy/dx = (dy/dt)/(dx/dt) = (−e^{−t})/(2e^{t}) = −1/(2e^{2t})，\ndy/dx |_{t=0} = −1/2。\nt = 0 对应的点为 (2, 1)，故曲线在点 (2, 1) 处的切线方程为\ny − 1 = −(1/2)(x − 2)，\n即 x + 2y − 4 = 0。\n法线方程为\ny − 1 = 2(x − 2)，\n即 2x − y − 3 = 0。"
  },
  "ch02-015": {
    "stem": "有一非均匀的细轴 $AB$，其长 $L$ 为 $20 cm$，$AM$ 段的质量与从点 $A$ 到 $M$ 的距离平方成正比例增加，并且已知一段 $AM = 2 cm$ 时的质量等于 $8 g$，试求：\n$(1) AM = 2 cm$ 的一段轴上平均线密度；\n$(2)$ 全轴的平均线密度；\n$(3)$ 在 $M$ 点处的密度 $\\rho _{m}$。",
    "answer": "$(1) 4 g/cm$；$(2) 40 g/cm$；$(3) \\rho _{m} = 4x g/cm$。",
    "solution": "设 $A$ 点到 $M$ 点的距离为 $x$，并设 $AM$ 段的质量为 $m$，则 $m = kx^{2}$。当 $x = 2$ 时，$m = 8$，所以 $k = 2$，即 $m$ 与 $x$ 的函数关系为 $m = 2x^{2}$。\n$(1)$ 当 $AM = 2 cm$ 时，平均线密度 $= 2(2^{2})/2 = 4$（$g/cm$）。\n$(2)$ 全轴的平均线密度 $= 2(20)^{2}/20 = 40$（$g/cm$）。\n$(3) \\rho _{m} = \\lim_{\\Delta x\\to 0} \\Delta m/\\Delta x = \\lim_{\\Delta x\\to 0} [2(x + \\Delta x)^{2} - 2x^{2}]/\\Delta x = \\lim_{\\Delta x\\to 0} (4x + 2\\Delta x) = 4x$（$g/cm$）。",
    "plainStem": "有一非均匀的细轴 AB，其长 L 为 20 cm，AM 段的质量与从点 A 到 M 的距离平方成正比例增加，并且已知一段 AM = 2 cm 时的质量等于 8 g，试求：\n(1) AM = 2 cm 的一段轴上平均线密度；\n(2) 全轴的平均线密度；\n(3) 在 M 点处的密度 ρ_{m}。",
    "plainAnswer": "(1) 4 g/cm；(2) 40 g/cm；(3) ρ_{m} = 4x g/cm。",
    "plainSolution": "设 A 点到 M 点的距离为 x，并设 AM 段的质量为 m，则 m = kx^{2}。当 x = 2 时，m = 8，所以 k = 2，即 m 与 x 的函数关系为 m = 2x^{2}。\n(1) 当 AM = 2 cm 时，平均线密度 = 2(2^{2})/2 = 4（g/cm）。\n(2) 全轴的平均线密度 = 2(20)^{2}/20 = 40（g/cm）。\n(3) ρ_{m} = lim_{Δx→0} Δm/Δx = lim_{Δx→0} [2(x + Δx)^{2} − 2x^{2}]/Δx = lim_{Δx→0} (4x + 2Δx) = 4x（g/cm）。"
  },
  "ch02-051": {
    "stem": "设 $y = f(x + y)$，其中 $f$ 具有二阶导数，且其一阶导数不等于 $1$，求 $d^{2}y/dx^{2}$。",
    "answer": "$y' = f'/(1 - f')$，$y'' = f''/(1 - f')^{2}$。",
    "solution": "$y' = (1 + y')f'$，$y' = f'/(1 - f')$；\n$y'' = (1 + y')f'' + y''f'$，$y'' = [(1 + y')f'']/(1 - f') = f''/(1 - f')^{2}$。",
    "plainStem": "设 y = f(x + y)，其中 f 具有二阶导数，且其一阶导数不等于 1，求 d^{2}y/dx^{2}。",
    "plainAnswer": "y′ = f′/(1 − f′)，y″ = f″/(1 − f′)²。",
    "plainSolution": "y′ = (1 + y′)f′，y′ = f′/(1 − f′)；\ny″ = (1 + y′)f″ + y″f′，y″ = [(1 + y′)f″]/(1 − f′) = f″/(1 − f′)²。"
  },
  "ch02-052": {
    "stem": "设 $y = \\sqrt{e^{1/x}\\cdot \\sqrt{x\\cdot \\sqrt{\\sin x}}}$，求 $y'$。",
    "answer": "$y' = (1/8)(2/x - 4/x^{2} + \\cot x)\\sqrt{e^{1/x}\\cdot \\sqrt{x\\cdot \\sqrt{\\sin x}}}$。",
    "solution": "等式两边取对数\n$\\ln y = 1/(2x) + (1/4)\\ln x + (1/8)\\ln \\sin x$，\n求导得\n$y'/y = -1/(2x^{2}) + 1/(4x) + \\cos x/(8\\sin x)$，\n所以\n$y' = (1/8)(2/x - 4/x^{2} + \\cot x)\\sqrt{e^{1/x}\\cdot \\sqrt{x\\cdot \\sqrt{\\sin x}}}$。",
    "plainStem": "设 y = √(e^{1/x}·√(x·√(sin x)))，求 y′。",
    "plainAnswer": "y′ = (1/8)(2/x − 4/x^{2} + cot x)√(e^{1/x}·√(x·√(sin x)))。",
    "plainSolution": "等式两边取对数\nln y = 1/(2x) + (1/4)ln x + (1/8)ln sin x，\n求导得\ny′/y = −1/(2x^{2}) + 1/(4x) + cos x/(8sin x)，\n所以\ny′ = (1/8)(2/x − 4/x^{2} + cot x)√(e^{1/x}·√(x·√(sin x)))。"
  },
  "ch02-053": {
    "stem": "已知 $f'(x_{0}) = -1$，则 $\\lim_{x\\to 0} x/[f(x_{0} - 2x) - f(x_{0} - x)] = \\rule{2em}{0.4pt}$。",
    "answer": "$1$",
    "solution": "原式 $= \\lim_{x\\to 0} 1/[-2\\cdot (f(x_{0} - 2x) - f(x_{0}))/(-2x) + (f(x_{0} - x) - f(x_{0}))/(-x)]\n= 1/[-2f'(x_{0}) + f'(x_{0})]\n= -1/f'(x_{0})\n= 1$。",
    "plainStem": "已知 f′(x_{0}) = −1，则 lim_{x→0} x/[f(x_{0} − 2x) − f(x_{0} − x)] = ______。",
    "plainAnswer": "1",
    "plainSolution": "原式 = lim_{x→0} 1/[−2·(f(x_{0} − 2x) − f(x_{0}))/(−2x) + (f(x_{0} − x) − f(x_{0}))/(−x)]\n= 1/[−2f′(x_{0}) + f′(x_{0})]\n= −1/f′(x_{0})\n= 1。"
  },
  "ch02-054": {
    "stem": "已知函数 $f(x)$ 在 $(0, +\\infty )$ 内可导，$f(x) > 0$，$\\lim_{x\\to +\\infty } f(x) = 1$，且满足\n$\\lim_{h\\to 0} [f(x + hx)/f(x)]^{1/h} = e^{1/x}$，\n求 $f(x)$。",
    "answer": "$f(x) = e^{-1/x}$",
    "solution": "设 $y = [f(x + hx)/f(x)]^{1/h}$，则 $\\ln y = (1/h)\\ln [f(x + hx)/f(x)]$。\n因为\n$\\lim_{h\\to 0} \\ln y = \\lim_{h\\to 0} (1/h)\\ln [f(x + hx)/f(x)] = \\lim_{h\\to 0} [x(\\ln f(x + hx) - \\ln f(x))]/(hx) = x[\\ln f(x)]'$，\n故\n$\\lim_{h\\to 0} [f(x + hx)/f(x)]^{1/h} = e^{x[\\ln f(x)]'}$。\n由已知条件得 $e^{x[\\ln f(x)]'} = e^{1/x}$，因此 $x[\\ln f(x)]' = 1/x$，即 $[\\ln f(x)]' = 1/x^{2}$。\n解之得 $f(x) = Ce^{-1/x}$。由 $\\lim_{x\\to +\\infty } f(x) = 1$，得 $C = 1$，故 $f(x) = e^{-1/x}$。",
    "plainStem": "已知函数 f(x) 在 (0, +∞) 内可导，f(x) > 0，lim_{x→+∞} f(x) = 1，且满足\nlim_{h→0} [f(x + hx)/f(x)]^{1/h} = e^{1/x}，\n求 f(x)。",
    "plainAnswer": "f(x) = e^{−1/x}",
    "plainSolution": "设 y = [f(x + hx)/f(x)]^{1/h}，则 ln y = (1/h)ln[f(x + hx)/f(x)]。\n因为\nlim_{h→0} ln y = lim_{h→0} (1/h)ln[f(x + hx)/f(x)] = lim_{h→0} [x(ln f(x + hx) − ln f(x))]/(hx) = x[ln f(x)]′，\n故\nlim_{h→0} [f(x + hx)/f(x)]^{1/h} = e^{x[ln f(x)]′}。\n由已知条件得 e^{x[ln f(x)]′} = e^{1/x}，因此 x[ln f(x)]′ = 1/x，即 [ln f(x)]′ = 1/x^{2}。\n解之得 f(x) = Ce^{−1/x}。由 lim_{x→+∞} f(x) = 1，得 C = 1，故 f(x) = e^{−1/x}。"
  },
  "ch02-016": {
    "stem": "设 $f'(x_{0}) = 3$，则 $\\lim_{h\\to 0} [f(x_{0} - 2h) - f(x_{0})]/(5h) = \\rule{2em}{0.4pt}$。",
    "answer": "原式 $= [f(x0-2h) - f(x0)] / (-2h) \\times (-2/5) \\to f'(x0) \\times (-2/5) = 3 \\times (-2/5) = -6/5$。",
    "solution": "",
    "plainStem": "设 f′(x_{0}) = 3，则 lim_{h→0} [f(x_{0} − 2h) − f(x_{0})]/(5h) = ______。",
    "plainAnswer": "原式 = [f(x0-2h) - f(x0)] / (-2h) × (-2/5) → f'(x0) × (-2/5) = 3 × (-2/5) = -6/5。",
    "plainSolution": ""
  },
  "ch02-017": {
    "stem": "设 $f(x)$ 在 $x = 0$ 的某一邻域内连续，且 $\\lim_{x\\to 0} f(x)/(\\sqrt{x + 1} - 1) = 2$，则 $f'(0) = \\rule{2em}{0.4pt}$。",
    "answer": "由连续得 $f(0)=0$。$\\sqrt{x+1}-1 \\sim x/2$。极限 $= \\lim f(x)/(x/2) = 2$，故 $\\lim f(x)/x = 1 = f'(0)$。",
    "solution": "",
    "plainStem": "设 f(x) 在 x = 0 的某一邻域内连续，且 lim_{x→0} f(x)/(√(x + 1) − 1) = 2，则 f′(0) = ______。",
    "plainAnswer": "由连续得 f(0)=0。√(x+1)-1 ~ x/2。极限 = lim f(x)/(x/2) = 2，故 lim f(x)/x = 1 = f'(0)。",
    "plainSolution": ""
  },
  "ch02-018": {
    "stem": "曲线 $y = \\sin (2x)$ 在点 $x = \\pi$ 处的切线方程为 $\\rule{2em}{0.4pt}$。",
    "answer": "$y' = 2\\cos (2x)$。在 $x=\\pi$ 时，$y=0$，$y'=2$。切线方程为 $y = 2(x-\\pi )$。",
    "solution": "",
    "plainStem": "曲线 y = sin(2x) 在点 x = π 处的切线方程为 ______。",
    "plainAnswer": "y' = 2cos(2x)。在 x=π 时，y=0，y'=2。切线方程为 y = 2(x-π)。",
    "plainSolution": ""
  },
  "ch02-019": {
    "stem": "曲线 $y = 1/x$ 在点 $(1/2, 2)$ 处的切线方程为 $\\rule{2em}{0.4pt}$。",
    "answer": "$y' = -1/x^2$。在 $x=1/2$ 时，$y=2$，$y'=-4$。切线方程为 $y-2 = -4(x-1/2)$，即 $4x+y-4=0$。",
    "solution": "",
    "plainStem": "曲线 y = 1/x 在点 (1/2, 2) 处的切线方程为 ______。",
    "plainAnswer": "y' = -1/x^2。在 x=1/2 时，y=2，y'=-4。切线方程为 y-2 = -4(x-1/2)，即 4x+y-4=0。",
    "plainSolution": ""
  },
  "ch02-020": {
    "stem": "设 $f(x) = x(x - 1)(x - 2)$，则 $f'(0) = \\rule{2em}{0.4pt}$。",
    "answer": "利用乘积求导法则，$f'(0) = (0-1)(0-2) = 2$。",
    "solution": "",
    "plainStem": "设 f(x) = x(x − 1)(x − 2)，则 f′(0) = ______。",
    "plainAnswer": "利用乘积求导法则，f'(0) = (0-1)(0-2) = 2。",
    "plainSolution": ""
  },
  "ch02-021": {
    "stem": "已知 $f(x) = (x^{2} - 1)/(x^{2} + 1) \\arccos \\sqrt{x/(x^{2} + 1)}$，则 $f'(1) = \\rule{2em}{0.4pt}$。",
    "answer": "设 $A(x)=(x^2-1)/(x^2+1)$，$B(x)=\\arccos ...$。在 $x=1$ 处 $A(1)=0$，$A'(1)=1$；$B(1)=\\pi /4$。所以 $f'(1) = A'(1)B(1) + A(1)B'(1) = 1\\times (\\pi /4) + 0 = \\pi /4$。",
    "solution": "",
    "plainStem": "已知 f(x) = (x^{2} − 1)/(x^{2} + 1) arccos√(x/(x^{2} + 1))，则 f′(1) = ______。",
    "plainAnswer": "设 A(x)=(x^2-1)/(x^2+1)，B(x)=arccos...。在 x=1 处 A(1)=0，A'(1)=1；B(1)=π/4。所以 f'(1) = A'(1)B(1) + A(1)B'(1) = 1×(π/4) + 0 = π/4。",
    "plainSolution": ""
  },
  "ch02-022": {
    "stem": "设 $y = \\sin^{2}x$，求微分 $dy = \\rule{2em}{0.4pt}$。",
    "answer": "$y = \\sin^2(x)$，$dy = 2\\sin x\\cdot \\cos x dx = \\sin (2x) dx$。",
    "solution": "",
    "plainStem": "设 y = sin^{2}x，求微分 dy = ______。",
    "plainAnswer": "y = sin^2(x)，dy = 2sinx·cosx dx = sin(2x) dx。",
    "plainSolution": ""
  },
  "ch02-023": {
    "stem": "设 $y = \\ln (\\sin x)$，则 $y'' = \\rule{2em}{0.4pt}$。",
    "answer": "$y' = \\cos x/\\sin x = \\cot x$；$y'' = -\\csc^2(x) = -1/\\sin^2(x)$。",
    "solution": "",
    "plainStem": "设 y = ln(sin x)，则 y″ = ______。",
    "plainAnswer": "y' = cosx/sinx = cotx；y'' = -csc^2(x) = -1/sin^2(x)。",
    "plainSolution": ""
  },
  "ch02-024": {
    "stem": "设 $e^{x+y} - x = 1$，则 $dy/dx |_{x=0} = \\rule{2em}{0.4pt}$。",
    "answer": "两边对 $x$ 求导：$e^{x+y}\\cdot (1+y') - 1 = 0$。$x=0$ 时，$y=0$。代入得 $1\\cdot (1+y')-1=0$，$y'=0$。",
    "solution": "",
    "plainStem": "设 e^{x+y} − x = 1，则 dy/dx |_{x=0} = ______。",
    "plainAnswer": "两边对 x 求导：e^(x+y)·(1+y') - 1 = 0。x=0 时，y=0。代入得 1·(1+y')-1=0，y'=0。",
    "plainSolution": ""
  },
  "ch02-025": {
    "stem": "曲线 $\\{ x = e^{2t}, y = 3e^{-t} \\}$ 在 $t = 0$ 处的法线方程为 $\\rule{2em}{0.4pt}$。",
    "answer": "$dx/dt = 2e^{2t} = 2$，$dy/dt = -3e^{-t} = -3$。切线斜率 $k = -3/2$。法线斜率为 $2/3$。$t=0$ 时点为$(1,3)$。法线方程：$y-3 = (2/3)(x-1)$，即 $2x-3y+7=0$。",
    "solution": "",
    "plainStem": "曲线 { x = e^{2t}, y = 3e^{−t} } 在 t = 0 处的法线方程为 ______。",
    "plainAnswer": "dx/dt = 2e^(2t) = 2，dy/dt = -3e^(-t) = -3。切线斜率 k = -3/2。法线斜率为 2/3。t=0 时点为(1,3)。法线方程：y-3 = (2/3)(x-1)，即 2x-3y+7=0。",
    "plainSolution": ""
  },
  "ch02-026": {
    "stem": "设函数 $y = y(x)$ 由方程 $e^{xy} = 2 - y$ 确定，则 $dy |_{x=0} = \\rule{2em}{0.4pt}$。",
    "answer": "若按常见题意 $e^{2y} = 2-x$，对 $x$ 求导得 $2e^{2y}\\cdot y' = -1$。$x=0$ 时 $e^{2y}=2$，故 $y' = -1/4$。$dy = -1/4 dx$。",
    "solution": "",
    "plainStem": "设函数 y = y(x) 由方程 e^{xy} = 2 − y 确定，则 dy |_{x=0} = ______。",
    "plainAnswer": "若按常见题意 e^(2y) = 2-x，对 x 求导得 2e^(2y)·y' = -1。x=0 时 e^(2y)=2，故 y' = -1/4。dy = -1/4 dx。",
    "plainSolution": ""
  },
  "ch02-027": {
    "stem": "设函数 $y = y(x)$ 由参数方程 $\\{ x = \\tan t, y = \\sin (3t) \\}$ 确定，则 $dy/dx |_{t=0} = \\rule{2em}{0.4pt}$。",
    "answer": "$dx/dt = \\sec^2(t) = 1$，$dy/dt = 3\\cos (3t) = 3$。$dy/dx = (dy/dt)/(dx/dt) = 3$。",
    "solution": "",
    "plainStem": "设函数 y = y(x) 由参数方程 { x = tan t, y = sin(3t) } 确定，则 dy/dx |_{t=0} = ______。",
    "plainAnswer": "dx/dt = sec^2(t) = 1，dy/dt = 3cos(3t) = 3。dy/dx = (dy/dt)/(dx/dt) = 3。",
    "plainSolution": ""
  },
  "ch02-028": {
    "stem": "设函数 $f(x)$ 在 $x = 0$ 处连续，下列命题错误的是（　）。\n$A.$ 若 $\\lim_{x\\to 0} f(x)/x$ 存在，则 $f(0) = 0\nB.$ 若 $\\lim_{x\\to 0} [f(x) + f(-x)]/x$ 存在，则 $f(0) = 0\nC.$ 若 $\\lim_{x\\to 0} f(x)/x$ 存在，则 $f'(0)$ 存在\n$D.$ 若 $\\lim_{x\\to 0} [f(x) - f(-x)]/x$ 存在，则 $f'(0) = 0$",
    "answer": "$A$项：如果极限 $\\lim f(x)/x$ 存在，分母趋于$0$，则分子必须趋于$0$，由连续性知 $f(0)=0$。该命题正确（注：本题若选错误项，原卷选项缺失）。",
    "solution": "",
    "plainStem": "设函数 f(x) 在 x = 0 处连续，下列命题错误的是（　）。\nA. 若 lim_{x→0} f(x)/x 存在，则 f(0) = 0\nB. 若 lim_{x→0} [f(x) + f(−x)]/x 存在，则 f(0) = 0\nC. 若 lim_{x→0} f(x)/x 存在，则 f′(0) 存在\nD. 若 lim_{x→0} [f(x) − f(−x)]/x 存在，则 f′(0) = 0",
    "plainAnswer": "A项：如果极限 lim f(x)/x 存在，分母趋于0，则分子必须趋于0，由连续性知 f(0)=0。该命题正确（注：本题若选错误项，原卷选项缺失）。",
    "plainSolution": ""
  },
  "ch02-029": {
    "stem": "设函数 $f(x)$ 在点 $x = 0$ 处可导，且 $f'(0) = 3$，则 $\\lim_{h\\to 0} [f(h) - f(-h)]/h =$ （　）。\n$A. 0$　　$B. 3$　　$C. -3$　　$D. 6$",
    "answer": "原式 $= [f(h)-f(0) - (f(-h)-f(0))] / h = f'(0) - (-f'(0)) = 2f'(0) = 6$。选 $D$。",
    "solution": "",
    "plainStem": "设函数 f(x) 在点 x = 0 处可导，且 f′(0) = 3，则 lim_{h→0} [f(h) − f(−h)]/h = （　）。\nA. 0　　B. 3　　C. −3　　D. 6",
    "plainAnswer": "原式 = [f(h)-f(0) - (f(-h)-f(0))] / h = f'(0) - (-f'(0)) = 2f'(0) = 6。选 D。",
    "plainSolution": ""
  },
  "ch02-030": {
    "stem": "已知 $f'(3) = 2$，则 $\\lim_{h\\to 0} [f(3 - h) - f(3)]/(-2h) =$ （　）。\n$A. 0$　　$B. 1$　　$C. 1/2$　　$D. -1/2$",
    "answer": "原式 $= (1/2) \\times [f(3-h)-f(3)]/(-h) = (1/2)f'(3) = 1$。选 $B$。",
    "solution": "",
    "plainStem": "已知 f′(3) = 2，则 lim_{h→0} [f(3 − h) − f(3)]/(−2h) = （　）。\nA. 0　　B. 1　　C. 1/2　　D. −1/2",
    "plainAnswer": "原式 = (1/2) × [f(3-h)-f(3)]/(-h) = (1/2)f'(3) = 1。选 B。",
    "plainSolution": ""
  },
  "ch02-031": {
    "stem": "曲线 $e^{x+y} - x = 1$ 在 $(0, 0)$ 处的切线方程为（　）。\n$A. x = 0$　　$B. y = 0$　　$C. x - y = 0$　　$D. x + y = 0$",
    "answer": "隐函数求导得 $e^{x+y}(1+y')-1=0$。代入 $(0,0)$ 得 $y'=0$，切线为 $y=0$。选 $B$。",
    "solution": "",
    "plainStem": "曲线 e^{x+y} − x = 1 在 (0, 0) 处的切线方程为（　）。\nA. x = 0　　B. y = 0　　C. x − y = 0　　D. x + y = 0",
    "plainAnswer": "隐函数求导得 e^(x+y)(1+y')-1=0。代入 (0,0) 得 y'=0，切线为 y=0。选 B。",
    "plainSolution": ""
  },
  "ch02-032": {
    "stem": "曲线 $\\{ x = 2e^{t}, y = e^{-t} \\}$ 在 $t = 0$ 处的法线方程为（　）。\n$A. x + 2y - 4 = 0$　　$B. 2x + y - 4 = 0\nC. x - 2y - 3 = 0$　　$D. 2x - y - 3 = 0$",
    "answer": "$t=0$时点为$(2,1)$。$dx/dt=2$，$dy/dt=-1$。切线斜率 $-1/2$，法线斜率 $2$。法线方程 $y-1=2(x-2) \\to 2x-y-3=0$。选 $D$。",
    "solution": "",
    "plainStem": "曲线 { x = 2e^{t}, y = e^{−t} } 在 t = 0 处的法线方程为（　）。\nA. x + 2y − 4 = 0　　B. 2x + y − 4 = 0\nC. x − 2y − 3 = 0　　D. 2x − y − 3 = 0",
    "plainAnswer": "t=0时点为(2,1)。dx/dt=2，dy/dt=-1。切线斜率 -1/2，法线斜率 2。法线方程 y-1=2(x-2) → 2x-y-3=0。选 D。",
    "plainSolution": ""
  },
  "ch02-033": {
    "stem": "设函数 $f(x) = |x|$，则函数 $f(x)$ 在 $x = 0$ 处（　）。\n$A.$ 连续但不可导　　$B.$ 连续且可导\n$C.$ 不连续且不可导　　$D.$ 不连续但可导",
    "answer": "$f(x)=|x|$，左导 $-1$，右导 $1$，连续但不可导。选 $A$。",
    "solution": "",
    "plainStem": "设函数 f(x) = |x|，则函数 f(x) 在 x = 0 处（　）。\nA. 连续但不可导　　B. 连续且可导\nC. 不连续且不可导　　D. 不连续但可导",
    "plainAnswer": "f(x)=|x|，左导 -1，右导 1，连续但不可导。选 A。",
    "plainSolution": ""
  },
  "ch02-034": {
    "stem": "函数 $f(x) = \\{ x \\arctan (1/x^{3}), x \\ne 0; 0, x = 0 \\}$ 在 $x = 0$ 处（　）。\n$A.$ 不连续且不可导　　$B.$ 连续但不可导\n$C.$ 可导但不连续　　$D.$ 连续且可导",
    "answer": "$x\\to 0$ 时，$x\\cdot \\arctan (1/x^3) \\to 0$（有界乘无穷小），连续。求导得 $\\lim_{x\\to 0} \\arctan (1/x^3)$，左右极限不相等（$\\pm \\pi /2$），不可导。选 $B$。",
    "solution": "",
    "plainStem": "函数 f(x) = { x arctan(1/x^{3}), x ≠ 0; 0, x = 0 } 在 x = 0 处（　）。\nA. 不连续且不可导　　B. 连续但不可导\nC. 可导但不连续　　D. 连续且可导",
    "plainAnswer": "x→0 时，x·arctan(1/x^3) → 0（有界乘无穷小），连续。求导得 lim(x→0) arctan(1/x^3)，左右极限不相等（±π/2），不可导。选 B。",
    "plainSolution": ""
  },
  "ch02-035": {
    "stem": "已知 $y = \\ln (1 - x)$，则 $y^{(3)} =$ （　）。\n$A. 2/(1 - x)^{3}$　　$B. -2/(1 - x)^{3}\nC. 6/(1 - x)^{3}$　　$D. -6/(1 - x)^{3}$",
    "answer": "$y=\\ln (1-x)$，一阶 $-1/(1-x)$，二阶 $-1/(1-x)^2$，三阶 $-2/(1-x)^3$（按题面 $y=\\ln (1-x)$ 选 $C$，若为 $1+x$ 则选 $A/B$）。",
    "solution": "",
    "plainStem": "已知 y = ln(1 − x)，则 y^{(3)} = （　）。\nA. 2/(1 − x)^{3}　　B. −2/(1 − x)^{3}\nC. 6/(1 − x)^{3}　　D. −6/(1 − x)^{3}",
    "plainAnswer": "y=ln(1-x)，一阶 -1/(1-x)，二阶 -1/(1-x)^2，三阶 -2/(1-x)^3（按题面 y=ln(1-x) 选 C，若为 1+x 则选 A/B）。",
    "plainSolution": ""
  },
  "ch02-036": {
    "stem": "函数 $y = x^{2}e^{x}$ 的五阶导数 $y^{(5)}(0) =$ （　）。\n$A. -20$　　$B. 20$　　$C. -30$　　$D. 30$",
    "answer": "泰勒展开 $x^2\\cdot e^x = x^2(1 + x + x^2/2 + x^3/6 + x^4/24 + ...)$。$x^5$ 的系数是 $1/3! = 1/6$。五阶导数值 $= 5! \\times (1/6) = 20$。选 $B$。",
    "solution": "",
    "plainStem": "函数 y = x^{2}e^{x} 的五阶导数 y^{(5)}(0) = （　）。\nA. −20　　B. 20　　C. −30　　D. 30",
    "plainAnswer": "泰勒展开 x^2·e^x = x^2(1 + x + x^2/2 + x^3/6 + x^4/24 + ...)。x^5 的系数是 1/3! = 1/6。五阶导数值 = 5! × (1/6) = 20。选 B。",
    "plainSolution": ""
  },
  "ch02-037": {
    "stem": "设 $y = \\sin 3x$，则 $y^{(4)} =$ （　）。\n$A. -3^{4}\\cos 3x$　　$B. -3^{4}\\sin 3x\nC. 3^{4}\\cos 3x$　　$D. 3^{4}\\sin 3x$",
    "answer": "$y=\\sin (3x)$，四阶导数 $= 3^4\\cdot \\sin (3x) = 81\\sin (3x)$。",
    "solution": "",
    "plainStem": "设 y = sin 3x，则 y^{(4)} = （　）。\nA. −3^{4}cos 3x　　B. −3^{4}sin 3x\nC. 3^{4}cos 3x　　D. 3^{4}sin 3x",
    "plainAnswer": "y=sin(3x)，四阶导数 = 3^4·sin(3x) = 81sin(3x)。",
    "plainSolution": ""
  },
  "ch02-038": {
    "stem": "设 $y = x^{\\cos x}$，求 $dy/dx$。",
    "answer": "设 $y = x^{\\cos x}$，求 $dy/dx$。\n解：两边取自然对数：$\\ln y = \\cos x\\cdot \\ln x$。\n两边对 $x$ 求导：$(1/y)\\cdot y' = -\\sin x\\cdot \\ln x + \\cos x\\cdot (1/x)$。\n所以 $y' = x^{\\cos x} \\cdot [\\cos x/x - \\sin x\\cdot \\ln x]$。",
    "solution": "",
    "plainStem": "设 y = x^{cos x}，求 dy/dx。",
    "plainAnswer": "设 y = x^(cosx)，求 dy/dx。\n解：两边取自然对数：ln y = cosx·ln x。\n两边对 x 求导：(1/y)·y' = -sinx·ln x + cosx·(1/x)。\n所以 y' = x^(cosx) · [cosx/x - sinx·ln x]。",
    "plainSolution": ""
  },
  "ch02-039": {
    "stem": "设 $y = (\\sin x)^{x}$，求 $dy/dx$。",
    "answer": "设 $y = (\\sin x)^x$，求 $dy/dx$。\n解：两边取对数：$\\ln y = x\\cdot \\ln (\\sin x)$。\n对 $x$ 求导：$(1/y)\\cdot y' = \\ln (\\sin x) + x\\cdot (\\cos x/\\sin x) = \\ln (\\sin x) + x\\cdot \\cot x$。\n所以 $y' = (\\sin x)^x \\cdot [\\ln (\\sin x) + x\\cdot \\cot x]$。",
    "solution": "",
    "plainStem": "设 y = (sin x)^{x}，求 dy/dx。",
    "plainAnswer": "设 y = (sinx)^x，求 dy/dx。\n解：两边取对数：ln y = x·ln(sinx)。\n对 x 求导：(1/y)·y' = ln(sinx) + x·(cosx/sinx) = ln(sinx) + x·cotx。\n所以 y' = (sinx)^x · [ln(sinx) + x·cotx]。",
    "plainSolution": ""
  },
  "ch02-040": {
    "stem": "设 $\\{ x = 2e^{t}, y = e^{-t} \\}$，求 $dy/dx$。",
    "answer": "设 $x=2e^t, y=e^{-t}$，求 $dy/dx$。\n解：$dx/dt = 2e^t$，$dy/dt = -e^{-t}$。\n$dy/dx = (dy/dt) / (dx/dt) = -e^{-t} / 2e^t = -(1/2)e^{-2t}$。",
    "solution": "",
    "plainStem": "设 { x = 2e^{t}, y = e^{−t} }，求 dy/dx。",
    "plainAnswer": "设 x=2e^t, y=e^(-t)，求 dy/dx。\n解：dx/dt = 2e^t，dy/dt = -e^(-t)。\ndy/dx = (dy/dt) / (dx/dt) = -e^(-t) / 2e^t = -(1/2)e^(-2t)。",
    "plainSolution": ""
  },
  "ch02-041": {
    "stem": "设 $\\{ x = \\cos 2t, y = \\sin 2t \\}$，求 $d^{2}y/dx^{2}$。",
    "answer": "设 $x=\\cos 2t, y=\\sin 2t$，求 $d^2y/dx^2$。\n解：$dx/dt = -2\\sin 2t$，$dy/dt = 2\\cos 2t$。\n$dy/dx = (2\\cos 2t) / (-2\\sin 2t) = -\\cot (2t)$。\n$d^2y/dx^2 = d(dy/dx)/dx = [d(-\\cot 2t)/dt] / (dx/dt) = [2\\csc^2(2t)] / (-2\\sin 2t) = -1/\\sin^3(2t) = -\\csc^3(2t)$。",
    "solution": "",
    "plainStem": "设 { x = cos 2t, y = sin 2t }，求 d^{2}y/dx^{2}。",
    "plainAnswer": "设 x=cos2t, y=sin2t，求 d^2y/dx^2。\n解：dx/dt = -2sin2t，dy/dt = 2cos2t。\ndy/dx = (2cos2t) / (-2sin2t) = -cot(2t)。\nd^2y/dx^2 = d(dy/dx)/dx = [d(-cot2t)/dt] / (dx/dt) = [2csc^2(2t)] / (-2sin2t) = -1/sin^3(2t) = -csc^3(2t)。",
    "plainSolution": ""
  },
  "ch02-042": {
    "stem": "设 $\\{ x = \\sin (t/2), y = e^{t} \\}$，求 $dy/dx$ 及 $dy/dx |_{t=0}$。",
    "answer": "设 $x=\\sin (t/2), y=e^t$，求 $dy/dx$ 及 $t=0$ 时的值。\n解：$dx/dt = (1/2)\\cos (t/2)$，$dy/dt = e^t$。\n$dy/dx = e^t / [(1/2)\\cos (t/2)] = 2e^t / \\cos (t/2)$。\n当 $t=0$ 时，$dy/dx = 2(1) / \\cos (0) = 2$。",
    "solution": "",
    "plainStem": "设 { x = sin(t/2), y = e^{t} }，求 dy/dx 及 dy/dx |_{t=0}。",
    "plainAnswer": "设 x=sin(t/2), y=e^t，求 dy/dx 及 t=0 时的值。\n解：dx/dt = (1/2)cos(t/2)，dy/dt = e^t。\ndy/dx = e^t / [(1/2)cos(t/2)] = 2e^t / cos(t/2)。\n当 t=0 时，dy/dx = 2(1) / cos(0) = 2。",
    "plainSolution": ""
  },
  "ch02-043": {
    "stem": "设 $\\{ x = 5(t - \\sin t), y = 5(1 - \\cos t) \\}$，求 $d^{2}y/dx^{2}$。",
    "answer": "设 $x=5(t-\\sin t), y=5(1-\\sin t)$，求 $d^2y/dx^2$。\n解：$dx/dt = 5(1-\\cos t)$，$dy/dt = -5\\cos t$。\n$dy/dx = -5\\cos t / [5(1-\\cos t)] = -\\cos t / (1-\\cos t)$。\n$d^2y/dx^2 = d(dy/dx)/dx = [d(-\\cos t/(1-\\cos t))/dt] / [5(1-\\cos t)]$。\n分子求导：$[\\sin t(1-\\cos t) - (-\\cos t)(\\sin t)] / (1-\\cos t)^2 = [\\sin t - \\sin t\\cdot \\cos t - \\sin t\\cdot \\cos t] / (1-\\cos t)^2 = \\sin t(1-2\\cos t) / (1-\\cos t)^2$。",
    "solution": "",
    "plainStem": "设 { x = 5(t − sin t), y = 5(1 − cos t) }，求 d^{2}y/dx^{2}。",
    "plainAnswer": "设 x=5(t-sint), y=5(1-sint)，求 d^2y/dx^2。\n解：dx/dt = 5(1-cost)，dy/dt = -5cost。\ndy/dx = -5cost / [5(1-cost)] = -cost / (1-cost)。\nd^2y/dx^2 = d(dy/dx)/dx = [d(-cost/(1-cost))/dt] / [5(1-cost)]。\n分子求导：[sint(1-cost) - (-cost)(sint)] / (1-cost)^2 = [sint - sint·cost - sint·cost] / (1-cost)^2 = sint(1-2cost) / (1-cost)^2。",
    "plainSolution": ""
  },
  "ch02-044": {
    "stem": "设函数 $y = y(x)$ 由方程 $y = 1 + xe^{y}$ 确定，求 $dy$。",
    "answer": "设 $y=1+xe^y$ 确定 $y=y(x)$，求 $dy$。\n解：两边微分：$dy = dx\\cdot e^y + x\\cdot e^y\\cdot dy$。\n整理得：$dy(1 - xe^y) = e^y dx$。由于 $xe^y = y - 1$，代入得 $1 - xe^y = 2 - y$。\n所以 $dy = [e^y / (2 - y)] dx$。",
    "solution": "",
    "plainStem": "设函数 y = y(x) 由方程 y = 1 + xe^{y} 确定，求 dy。",
    "plainAnswer": "设 y=1+xe^y 确定 y=y(x)，求 dy。\n解：两边微分：dy = dx·e^y + x·e^y·dy。\n整理得：dy(1 - xe^y) = e^y dx。由于 xe^y = y - 1，代入得 1 - xe^y = 2 - y。\n所以 dy = [e^y / (2 - y)] dx。",
    "plainSolution": ""
  },
  "ch02-045": {
    "stem": "设方程 $y^{5} + 2y - x - 3x^{7} = 0$ 确定有隐函数 $y = y(x)$，求 $y'(0)$。",
    "answer": "设 $y^5+2y-x-3x^7=0$ 确定 $y=y(x)$，求 $y'(0)$。\n解：当 $x=0$ 时，$y^5+2y=0$，解得 $y=0$。\n方程两边对 $x$ 求导：$5y^4\\cdot y' + 2y' - 1 - 21x^6 = 0$。\n代入 $x=0, y=0$：$0 + 2y'(0) - 1 - 0 = 0$，得 $y'(0) = 1/2$。",
    "solution": "",
    "plainStem": "设方程 y^{5} + 2y − x − 3x^{7} = 0 确定有隐函数 y = y(x)，求 y′(0)。",
    "plainAnswer": "设 y^5+2y-x-3x^7=0 确定 y=y(x)，求 y'(0)。\n解：当 x=0 时，y^5+2y=0，解得 y=0。\n方程两边对 x 求导：5y^4·y' + 2y' - 1 - 21x^6 = 0。\n代入 x=0, y=0：0 + 2y'(0) - 1 - 0 = 0，得 y'(0) = 1/2。",
    "plainSolution": ""
  },
  "ch02-046": {
    "stem": "讨论函数 $f(x) = \\{ x^{2}\\sin (1/x), x \\ne 0; 0, x = 0 \\}$ 在 $x = 0$ 处连续性与可导性。",
    "answer": "讨论 $f(x)=x^2\\sin (1/x) (x\\ne 0); f(0)=0$ 在 $x=0$ 的连续性与可导性。\n解：连续性：$\\lim_{x\\to 0} x^2\\sin (1/x) = 0$（无穷小乘有界函数）。因为极限等于函数值 $f(0)$，所以在 $x=0$ 处连续。\n可导性：$f'(0) = \\lim_{x\\to 0} [f(x)-f(0)] / x = \\lim_{x\\to 0} x\\cdot \\sin (1/x) = 0$。极限存在，故在 $x=0$ 处可导。",
    "solution": "",
    "plainStem": "讨论函数 f(x) = { x^{2}sin(1/x), x ≠ 0; 0, x = 0 } 在 x = 0 处连续性与可导性。",
    "plainAnswer": "讨论 f(x)=x^2sin(1/x) (x≠0); f(0)=0 在 x=0 的连续性与可导性。\n解：连续性：lim(x→0) x^2sin(1/x) = 0（无穷小乘有界函数）。因为极限等于函数值 f(0)，所以在 x=0 处连续。\n可导性：f'(0) = lim(x→0) [f(x)-f(0)] / x = lim(x→0) x·sin(1/x) = 0。极限存在，故在 x=0 处可导。",
    "plainSolution": ""
  },
  "ch02-047": {
    "stem": "设函数 $f(x) = \\{ x - 1, x < 1; x^{2} - 1, x \\ge 1 \\}$，用左、右导数的定义求 $f'_{-}(1)$、$f'_{+}(1)$，并且说明函数 $f(x)$ 在 $x = 1$ 处是否可导。",
    "answer": "设 $f(x)=x-1 (x<1); f(x)=x^2-1 (x\\ge 1)$，用左右导数定义求 $x=1$ 处导数。\n解：左导数 $f'-(1) = \\lim_{x\\to 1-} [f(x)-f(1)] / (x-1) = \\lim_{x\\to 1-} [(x-1)-0] / (x-1) = 1$。\n右导数 $f'+(1) = \\lim_{x\\to 1+} [f(x)-f(1)] / (x-1) = \\lim_{x\\to 1+} [(x^2-1)-0] / (x-1) = \\lim_{x\\to 1+} (x+1) = 2$。\n因为左右导数不相等，故函数在 $x=1$ 处不可导。",
    "solution": "",
    "plainStem": "设函数 f(x) = { x − 1, x < 1; x^{2} − 1, x ≥ 1 }，用左、右导数的定义求 f′_{−}(1)、f′_{+}(1)，并且说明函数 f(x) 在 x = 1 处是否可导。",
    "plainAnswer": "设 f(x)=x-1 (x<1); f(x)=x^2-1 (x≥1)，用左右导数定义求 x=1 处导数。\n解：左导数 f'-(1) = lim(x→1-) [f(x)-f(1)] / (x-1) = lim(x→1-) [(x-1)-0] / (x-1) = 1。\n右导数 f'+(1) = lim(x→1+) [f(x)-f(1)] / (x-1) = lim(x→1+) [(x^2-1)-0] / (x-1) = lim(x→1+) (x+1) = 2。\n因为左右导数不相等，故函数在 x=1 处不可导。",
    "plainSolution": ""
  },
  "ch02-048": {
    "stem": "设 $f(x) = \\{ \\sqrt{1 + 4x} - 1, x > 0; ax + b, x \\le 0 \\}$，问：$a$、$b$ 为何值时，$f(x)$ 在 $x = 0$ 可导？",
    "answer": "设 $f(x)=\\sqrt{1+4x}-1 (x>0); f(x)=ax+b (x\\le 0)$。问 $a,b$ 为何值时 $f(x)$ 在 $x=0$ 可导？\n解：可导必连续。右极限 $\\lim_{x\\to 0+} (\\sqrt{1+4x}-1) = 0$，左极限 $\\lim_{x\\to 0-} (ax+b) = b$。故 $b=0$。\n右导数：$f'+(0) = \\lim_{x\\to 0+} [\\sqrt{1+4x}-1 - 0] / x = \\lim_{x\\to 0+} (4x) / [x(\\sqrt{1+4x}+1)] = 2$。\n左导数：$f'-(0) = \\lim_{x\\to 0-} [(ax+0)-0] / x = a$。\n可导要求左右导数相等，故 $a=2$。",
    "solution": "",
    "plainStem": "设 f(x) = { √(1 + 4x) − 1, x > 0; ax + b, x ≤ 0 }，问：a、b 为何值时，f(x) 在 x = 0 可导？",
    "plainAnswer": "设 f(x)=√(1+4x)-1 (x>0); f(x)=ax+b (x≤0)。问 a,b 为何值时 f(x) 在 x=0 可导？\n解：可导必连续。右极限 lim(x→0+) (√(1+4x)-1) = 0，左极限 lim(x→0-) (ax+b) = b。故 b=0。\n右导数：f'+(0) = lim(x→0+) [√(1+4x)-1 - 0] / x = lim(x→0+) (4x) / [x(√(1+4x)+1)] = 2。\n左导数：f'-(0) = lim(x→0-) [(ax+0)-0] / x = a。\n可导要求左右导数相等，故 a=2。",
    "plainSolution": ""
  },
  "ch02-049": {
    "stem": "设 $f(x) = \\{ x^{2}, 0 \\le x \\le 1; ax + b, 1 < x \\le 2 \\}$，在 $x = 1$ 处可导，求 $a$、$b$ 的值。",
    "answer": "设 $f(x)=x^2 (0\\le x\\le 1); f(x)=ax+b (1<x\\le 2)$ 在 $x=1$ 处可导，求 $a,b$。\n解：连续性：$f(1) = 1$；右极限 $\\lim_{x\\to 1+} (ax+b) = a+b$。故 $a+b=1$。\n可导性：左导数 $f'-(1) = 2x|(x=1) = 2$；右导数 $f'+(1) = a$。故 $a=2$。\n代回 $a+b=1$，得 $b=-1$。",
    "solution": "",
    "plainStem": "设 f(x) = { x^{2}, 0 ≤ x ≤ 1; ax + b, 1 < x ≤ 2 }，在 x = 1 处可导，求 a、b 的值。",
    "plainAnswer": "设 f(x)=x^2 (0≤x≤1); f(x)=ax+b (1<x≤2) 在 x=1 处可导，求 a,b。\n解：连续性：f(1) = 1；右极限 lim(x→1+) (ax+b) = a+b。故 a+b=1。\n可导性：左导数 f'-(1) = 2x|(x=1) = 2；右导数 f'+(1) = a。故 a=2。\n代回 a+b=1，得 b=-1。",
    "plainSolution": ""
  },
  "ch02-050": {
    "stem": "设函数 $f(x) = \\{ (1 - \\sqrt{1 - x})/x, x < 0; a + bx, x \\ge 0 \\}$ 处处可导，求常数 $a$、$b$ 的值。",
    "answer": "设 $f(x)=1-\\sqrt{1-x} (x<0); f(x)=a+bx (x\\ge 0)$ 处处可导，求 $a,b$。\n解：连续性：左极限 $\\lim_{x\\to 0-} (1-\\sqrt{1-x}) = 0$；右极限 $f(0)=a$，故 $a=0$。\n可导性：左导数 $f'-(0) = \\lim_{x\\to 0-} [1-\\sqrt{1-x}] / x = \\lim_{x\\to 0-} x / [x(1+\\sqrt{1-x})] = 1/2$。\n右导数 $f'+(0) = b$。左右导数相等，故 $b=1/2$。",
    "solution": "",
    "plainStem": "设函数 f(x) = { (1 − √(1 − x))/x, x < 0; a + bx, x ≥ 0 } 处处可导，求常数 a、b 的值。",
    "plainAnswer": "设 f(x)=1-√(1-x) (x<0); f(x)=a+bx (x≥0) 处处可导，求 a,b。\n解：连续性：左极限 lim(x→0-) (1-√(1-x)) = 0；右极限 f(0)=a，故 a=0。\n可导性：左导数 f'-(0) = lim(x→0-) [1-√(1-x)] / x = lim(x→0-) x / [x(1+√(1-x))] = 1/2。\n右导数 f'+(0) = b。左右导数相等，故 b=1/2。",
    "plainSolution": ""
  }
};
