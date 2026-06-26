import { C, arrowLabel, box, rect, slideBase, text } from "./common.mjs";

export async function slide03(presentation, ctx) {
  const slide = slideBase(presentation, ctx, "REGRESSION MODEL", "非線形回帰モデルは f(X) の形を広げる", 3);
  box(ctx, slide, 76, 178, 376, 154, {
    fill: C.faint,
    stroke: C.line,
    kicker: "基本形",
    title: "y = f(X) + ε",
    titleSize: 32,
    body: "線形回帰では f(X) を直線・平面として考える。非線形回帰では、曲線、局所構造、相互作用を表現できるようにする。",
    bodySize: 17,
  });

  const nodes = [
    ["多項式回帰", "x², x1x2を追加", C.lightBlue, "#BFDBFE"],
    ["SVR", "epsilon幅 + kernel", C.lightBlue, "#BFDBFE"],
    ["決定木", "条件分岐で空間分割", C.lightGreen, "#BBF7D0"],
    ["Random Forest", "木を多数平均", C.lightGreen, "#BBF7D0"],
    ["GBDT", "誤差を順に補正", C.lightOrange, "#FED7AA"],
    ["Neural Net", "多層の非線形変換", C.lightViolet, "#DDD6FE"],
  ];
  nodes.forEach(([title, body, fill, stroke], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    box(ctx, slide, 540 + col * 210, 180 + row * 154, 178, 112, {
      fill,
      stroke,
      title,
      titleSize: 21,
      body,
      bodySize: 14,
    });
  });

  rect(ctx, slide, 90, 438, 330, 8, { fill: C.line });
  rect(ctx, slide, 90, 438, 126, 8, { fill: C.blue });
  text(ctx, slide, "単純", 86, 458, 80, 22, { size: 15, color: C.muted });
  text(ctx, slide, "複雑", 365, 458, 80, 22, { size: 15, color: C.muted, align: "right" });
  text(ctx, slide, "表現力が上がるほど、過学習・解釈性・計算量の管理が重要になる", 76, 506, 390, 68, {
    size: 21,
    color: C.ink,
    bold: true,
  });

  arrowLabel(ctx, slide, 470, 392, C.muted);
  text(ctx, slide, "モデル単体ではなく、CVとリーク防止まで含めて性能を判断する", 540, 500, 600, 44, {
    size: 22,
    color: C.ink,
    bold: true,
  });
  return slide;
}

