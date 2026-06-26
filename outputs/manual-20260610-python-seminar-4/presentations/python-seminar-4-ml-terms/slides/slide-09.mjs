import { C, rect, slideBase, text } from "./common.mjs";

function drawFoldRow(ctx, slide, row, validIndex) {
  const x0 = 164;
  const y = 190 + row * 74;
  text(ctx, slide, `Fold ${row + 1}`, 74, y + 16, 80, 28, { size: 17, color: C.muted, bold: true });
  for (let i = 0; i < 5; i += 1) {
    const isValid = i === validIndex;
    rect(ctx, slide, x0 + i * 154, y, 132, 48, {
      fill: isValid ? C.lightOrange : C.lightBlue,
      stroke: isValid ? "#FED7AA" : "#BFDBFE",
      strokeWidth: 1,
    });
    text(ctx, slide, isValid ? "valid" : "train", x0 + i * 154, y + 13, 132, 22, {
      size: 16,
      color: isValid ? C.orange : C.blue,
      bold: true,
      align: "center",
    });
  }
}

export async function slide09(presentation, ctx) {
  const slide = slideBase(presentation, ctx, "CROSS VALIDATION", "クロスバリデーションは分割の偶然を平均する", 9);
  for (let i = 0; i < 5; i += 1) drawFoldRow(ctx, slide, i, i);

  rect(ctx, slide, 976, 192, 190, 48, { fill: C.lightBlue, stroke: "#BFDBFE", strokeWidth: 1 });
  text(ctx, slide, "trainで学習", 1000, 205, 140, 22, { size: 17, color: C.blue, bold: true, align: "center" });
  rect(ctx, slide, 976, 264, 190, 48, { fill: C.lightOrange, stroke: "#FED7AA", strokeWidth: 1 });
  text(ctx, slide, "validで評価", 1000, 277, 140, 22, { size: 17, color: C.orange, bold: true, align: "center" });

  text(ctx, slide, "5回のスコアを平均", 958, 370, 230, 30, { size: 23, color: C.ink, bold: true });
  text(ctx, slide, "平均: 性能の目安\n標準偏差: 分割への敏感さ", 958, 416, 236, 72, {
    size: 18,
    color: C.muted,
  });
  text(ctx, slide, "回帰では KFold / RepeatedKFold、グループがある場合は GroupKFold、時系列なら TimeSeriesSplit を選ぶ。", 74, 594, 1040, 36, {
    size: 20,
    color: C.ink,
    bold: true,
  });
  return slide;
}

