import { C, addSvg, arrowLabel, box, rbfSvg, rect, slideBase, text } from "./common.mjs";

export async function slide07(presentation, ctx) {
  const slide = slideBase(presentation, ctx, "KERNEL TRICK", "カーネルは「高次元で線形」を、元空間では非線形に見せる", 7);

  box(ctx, slide, 74, 190, 220, 116, {
    fill: C.lightBlue,
    stroke: "#BFDBFE",
    kicker: "input",
    title: "元の特徴空間",
    body: "x1, x2 では直線で分けにくい",
  });
  arrowLabel(ctx, slide, 312, 232, C.muted);
  box(ctx, slide, 366, 190, 232, 116, {
    fill: C.faint,
    stroke: C.line,
    kicker: "kernel",
    kickerColor: C.muted,
    title: "K(xᵢ, xⱼ)",
    body: "明示的に高次元座標を作らず、類似度を計算",
  });
  arrowLabel(ctx, slide, 616, 232, C.muted);
  box(ctx, slide, 672, 190, 220, 116, {
    fill: C.lightGreen,
    stroke: "#BBF7D0",
    kicker: "feature space",
    kickerColor: C.green,
    title: "高次元で線形",
    body: "線形SVRのように扱える",
  });
  arrowLabel(ctx, slide, 910, 232, C.muted);
  box(ctx, slide, 966, 190, 220, 116, {
    fill: C.lightOrange,
    stroke: "#FED7AA",
    kicker: "result",
    kickerColor: C.orange,
    title: "元空間で曲線",
    body: "非線形な回帰関数になる",
  });

  rect(ctx, slide, 86, 390, 500, 174, { fill: C.faint, stroke: C.line, strokeWidth: 1 });
  text(ctx, slide, "RBFカーネル", 112, 414, 210, 28, {
    size: 22,
    color: C.ink,
    bold: true,
  });
  text(ctx, slide, "K(xᵢ, xⱼ) = exp(-γ ||xᵢ - xⱼ||²)", 112, 458, 420, 34, {
    size: 25,
    color: C.blue,
    bold: true,
  });
  text(ctx, slide, "近い点ほど影響が大きい。gammaが大きいほど、影響範囲は狭く局所的になる。", 112, 504, 420, 42, {
    size: 17,
    color: C.muted,
  });

  await addSvg(ctx, slide, rbfSvg(), 730, 364, 330, 244, "RBF similarity contours");
  text(ctx, slide, "中心に近いほど類似度が高い", 752, 620, 310, 24, {
    size: 16,
    color: C.muted,
    align: "center",
  });
  return slide;
}
