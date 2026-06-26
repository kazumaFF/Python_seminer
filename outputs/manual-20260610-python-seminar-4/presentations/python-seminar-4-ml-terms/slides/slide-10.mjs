import { C, arrowLabel, box, rect, slideBase, text } from "./common.mjs";

export async function slide10(presentation, ctx) {
  const slide = slideBase(presentation, ctx, "DATA LEAKAGE", "データリークは、評価スコアを実力以上に良く見せる", 10);

  text(ctx, slide, "悪い例", 126, 172, 200, 30, { size: 26, color: C.red, bold: true });
  rect(ctx, slide, 88, 214, 492, 284, { fill: C.lightRed, stroke: "#FECACA", strokeWidth: 1 });
  box(ctx, slide, 126, 250, 134, 76, {
    fill: C.bg,
    stroke: "#FECACA",
    title: "全データ",
    titleSize: 18,
    body: "train+valid",
    bodySize: 13,
  });
  arrowLabel(ctx, slide, 278, 268, C.red);
  box(ctx, slide, 326, 250, 162, 76, {
    fill: C.bg,
    stroke: "#FECACA",
    title: "Scaler fit",
    titleSize: 18,
    body: "valid情報も混ざる",
    bodySize: 13,
  });
  arrowLabel(ctx, slide, 374, 344, C.red);
  box(ctx, slide, 230, 382, 178, 76, {
    fill: C.bg,
    stroke: "#FECACA",
    title: "CV評価",
    titleSize: 18,
    body: "スコアが過大評価",
    bodySize: 13,
  });

  text(ctx, slide, "良い例", 720, 172, 200, 30, { size: 26, color: C.green, bold: true });
  rect(ctx, slide, 662, 214, 492, 284, { fill: C.lightGreen, stroke: "#BBF7D0", strokeWidth: 1 });
  box(ctx, slide, 704, 250, 134, 76, {
    fill: C.bg,
    stroke: "#BBF7D0",
    title: "fold train",
    titleSize: 18,
    body: "訓練部分だけ",
    bodySize: 13,
  });
  arrowLabel(ctx, slide, 858, 268, C.green);
  box(ctx, slide, 906, 250, 162, 76, {
    fill: C.bg,
    stroke: "#BBF7D0",
    title: "Scaler fit",
    titleSize: 18,
    body: "trainだけでfit",
    bodySize: 13,
  });
  arrowLabel(ctx, slide, 956, 344, C.green);
  box(ctx, slide, 810, 382, 178, 76, {
    fill: C.bg,
    stroke: "#BBF7D0",
    title: "valid評価",
    titleSize: 18,
    body: "transformだけ",
    bodySize: 13,
  });

  box(ctx, slide, 142, 548, 990, 68, {
    fill: C.faint,
    stroke: C.line,
    title: "防止策",
    titleSize: 20,
    body: "前処理・特徴選択・次元削減・モデルをPipelineに入れる。testデータは最後の1回だけ使う。",
    bodySize: 18,
  });
  return slide;
}

