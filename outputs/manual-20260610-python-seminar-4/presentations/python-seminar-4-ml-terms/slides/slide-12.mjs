import { C, arrowLabel, box, rect, slideBase, text } from "./common.mjs";

export async function slide12(presentation, ctx) {
  const slide = slideBase(presentation, ctx, "FEATURE ENGINEERING", "特徴エンジニアリングは、モデルが学びやすい入力を作る作業", 12);

  box(ctx, slide, 76, 284, 166, 96, {
    fill: C.faint,
    stroke: C.line,
    title: "元データ",
    titleSize: 24,
    body: "数値 / カテゴリ / 欠損 / 外れ値",
    bodySize: 14,
  });
  arrowLabel(ctx, slide, 260, 314, C.muted);

  const transforms = [
    ["標準化", "StandardScaler", C.lightBlue, "#BFDBFE", C.blue],
    ["対数変換", "log(x + 1)", C.lightGreen, "#BBF7D0", C.green],
    ["相互作用", "x1 × x2", C.lightOrange, "#FED7AA", C.orange],
    ["カテゴリ変換", "One-hot", C.lightViolet, "#DDD6FE", C.violet],
  ];
  transforms.forEach(([title, body, fill, stroke, color], i) => {
    box(ctx, slide, 332 + i * 180, 220 + (i % 2) * 126, 146, 90, {
      fill,
      stroke,
      kicker: "変換",
      kickerColor: color,
      title,
      titleSize: 20,
      body,
      bodySize: 14,
    });
  });

  arrowLabel(ctx, slide, 1050, 314, C.muted);
  box(ctx, slide, 1090, 284, 120, 96, {
    fill: C.lightBlue,
    stroke: "#BFDBFE",
    title: "モデル",
    titleSize: 24,
    body: "SVRなど",
    bodySize: 15,
  });

  rect(ctx, slide, 296, 500, 720, 72, { fill: C.lightRed, stroke: "#FECACA", strokeWidth: 1 });
  text(ctx, slide, "注意: 特徴量のfitはCVの訓練fold内で行う", 324, 516, 660, 28, {
    size: 24,
    color: C.red,
    bold: true,
    align: "center",
  });
  text(ctx, slide, "全データで特徴選択やスケーリングをすると、検証データの情報が混ざる。", 324, 548, 660, 24, {
    size: 16,
    color: C.muted,
    align: "center",
  });
  return slide;
}

