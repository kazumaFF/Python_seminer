import { C, arrowLabel, box, ellipse, rect, slideBase, text } from "./common.mjs";

export async function slide11(presentation, ctx) {
  const slide = slideBase(presentation, ctx, "REPRODUCIBILITY", "seedは乱数を固定し、同じ条件の結果を再現しやすくする", 11);

  ellipse(ctx, slide, 520, 210, 210, 210, { fill: C.lightBlue, stroke: "#BFDBFE", strokeWidth: 2 });
  text(ctx, slide, "SEED = 42", 548, 286, 154, 36, { size: 28, color: C.blue, bold: true, align: "center" });
  text(ctx, slide, "乱数の起点", 555, 332, 140, 24, { size: 18, color: C.muted, align: "center" });

  const nodes = [
    [134, 186, "train_test_split", "シャッフル分割"],
    [134, 424, "KFold", "foldのシャッフル"],
    [816, 186, "RandomizedSearch", "候補のサンプリング"],
    [816, 424, "モデル初期値", "RF / NNなど"],
  ];
  nodes.forEach(([x, y, title, body]) => {
    box(ctx, slide, x, y, 250, 92, {
      fill: C.faint,
      stroke: C.line,
      title,
      titleSize: 22,
      body,
      bodySize: 15,
    });
  });
  arrowLabel(ctx, slide, 410, 242, C.muted);
  arrowLabel(ctx, slide, 410, 452, C.muted);
  arrowLabel(ctx, slide, 770, 242, C.muted);
  arrowLabel(ctx, slide, 770, 452, C.muted);

  rect(ctx, slide, 128, 564, 1010, 54, { fill: C.lightOrange, stroke: "#FED7AA", strokeWidth: 1 });
  text(ctx, slide, "seedだけでは完全再現できない場合もある。Python・ライブラリ・データ・分割方法・評価指標も記録する。", 154, 579, 954, 24, {
    size: 19,
    color: C.ink,
    bold: true,
  });
  return slide;
}

