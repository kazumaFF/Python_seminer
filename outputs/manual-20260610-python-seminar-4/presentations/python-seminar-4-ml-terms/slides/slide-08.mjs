import { C, arrowLabel, box, rect, slideBase, text } from "./common.mjs";

export async function slide08(presentation, ctx) {
  const slide = slideBase(presentation, ctx, "SAFE WORKFLOW", "安全な単位は、前処理とモデルをまとめたPipeline", 8);

  box(ctx, slide, 82, 202, 180, 90, {
    fill: C.faint,
    stroke: C.line,
    title: "全データ",
    titleSize: 24,
    body: "X, y",
    bodySize: 18,
  });
  arrowLabel(ctx, slide, 286, 226, C.muted);
  box(ctx, slide, 342, 202, 210, 90, {
    fill: C.lightBlue,
    stroke: "#BFDBFE",
    title: "train / test分割",
    titleSize: 22,
    body: "testは最後まで触らない",
    bodySize: 15,
  });

  rect(ctx, slide, 632, 154, 560, 202, { fill: C.lightGreen, stroke: "#BBF7D0", strokeWidth: 1 });
  text(ctx, slide, "train側だけでCV", 656, 180, 240, 28, { size: 24, color: C.green, bold: true });
  box(ctx, slide, 660, 228, 126, 82, {
    fill: C.bg,
    stroke: "#BBF7D0",
    title: "前処理",
    titleSize: 18,
    body: "fit",
    bodySize: 16,
  });
  arrowLabel(ctx, slide, 800, 252, C.green);
  box(ctx, slide, 850, 228, 126, 82, {
    fill: C.bg,
    stroke: "#BBF7D0",
    title: "変換",
    titleSize: 18,
    body: "transform",
    bodySize: 16,
  });
  arrowLabel(ctx, slide, 990, 252, C.green);
  box(ctx, slide, 1040, 228, 126, 82, {
    fill: C.bg,
    stroke: "#BBF7D0",
    title: "SVR",
    titleSize: 18,
    body: "fit / predict",
    bodySize: 16,
  });

  box(ctx, slide, 654, 426, 454, 92, {
    fill: C.lightOrange,
    stroke: "#FED7AA",
    kicker: "最終評価",
    kickerColor: C.orange,
    title: "testは最後に1回だけ評価",
    body: "チューニングにtestスコアを使うと、testもリークする。",
    bodySize: 16,
  });
  text(ctx, slide, "Pipeline([('scaler', StandardScaler()), ('svr', SVR())])", 94, 432, 486, 34, {
    size: 22,
    color: C.blue,
    bold: true,
  });
  text(ctx, slide, "Pipelineに入れると、CVの各foldで訓練部分だけを使ってfitされる。これはSVRのような距離ベースのモデルで特に重要。", 94, 486, 486, 66, {
    size: 19,
    color: C.ink,
  });
  return slide;
}
