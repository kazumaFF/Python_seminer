import { C, addSvg, box, ellipse, hline, lossSvg, rect, slideBase, text } from "./common.mjs";

function slider(ctx, slide, label, leftLabel, rightLabel, x, y, pos, color) {
  text(ctx, slide, label, x, y, 150, 22, { size: 18, bold: true, color });
  hline(ctx, slide, x + 160, y + 13, 270, { color: C.line, thickness: 5 });
  rect(ctx, slide, x + 160, y + 13, 270 * pos, 5, { fill: color });
  ellipse(ctx, slide, x + 150 + 270 * pos, y + 5, 22, 22, { fill: color, stroke: color });
  text(ctx, slide, leftLabel, x + 160, y + 34, 105, 20, { size: 12, color: C.muted });
  text(ctx, slide, rightLabel, x + 325, y + 34, 105, 20, { size: 12, color: C.muted, align: "right" });
}

export async function slide06(presentation, ctx) {
  const slide = slideBase(presentation, ctx, "SVR HYPERPARAMETERS", "C・epsilon・gammaは、滑らかさと訓練データへの追従を調整する", 6);

  box(ctx, slide, 70, 168, 510, 144, {
    fill: C.faint,
    stroke: C.line,
    kicker: "目的関数のイメージ",
    title: "1/2 ||w||² + C Σ(ξᵢ + ξᵢ*)",
    titleSize: 27,
    body: "第1項は関数を滑らかに保つ。第2項はepsilonチューブ外にはみ出した量を罰する。",
    bodySize: 17,
  });
  await addSvg(ctx, slide, lossSvg(), 720, 152, 380, 224, "epsilon insensitive loss");
  text(ctx, slide, "epsilon幅の内側では損失0", 780, 378, 320, 26, {
    size: 17,
    color: C.orange,
    bold: true,
  });

  slider(ctx, slide, "C", "滑らか優先", "誤差を強く罰する", 96, 388, 0.72, C.blue);
  slider(ctx, slide, "epsilon", "細かく合わせる", "誤差を広く許す", 96, 474, 0.44, C.orange);
  slider(ctx, slide, "gamma", "広くなめらか", "局所的に曲がる", 96, 560, 0.60, C.teal);

  box(ctx, slide, 720, 444, 410, 122, {
    fill: C.lightRed,
    stroke: "#FECACA",
    kicker: "注意",
    kickerColor: C.red,
    title: "スケーリングなしのSVRは危険",
    body: "RBFカーネルは距離を使うため、単位や桁が大きい特徴量に支配されやすい。",
    bodySize: 17,
  });
  return slide;
}

