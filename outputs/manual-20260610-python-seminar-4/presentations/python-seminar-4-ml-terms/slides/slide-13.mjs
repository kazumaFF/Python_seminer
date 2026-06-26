import { C, box, ellipse, rect, slideBase, text } from "./common.mjs";

function checklist(ctx, slide, items, x, y, color) {
  items.forEach((item, i) => {
    const yy = y + i * 48;
    ellipse(ctx, slide, x, yy + 4, 26, 26, { fill: color, stroke: color });
    text(ctx, slide, "✓", x + 4, yy + 1, 18, 24, { size: 20, color: C.bg, bold: true, align: "center" });
    text(ctx, slide, item, x + 42, yy, 410, 34, { size: 19, color: C.ink });
  });
}

function traps(ctx, slide, items, x, y) {
  items.forEach((item, i) => {
    const yy = y + i * 50;
    rect(ctx, slide, x, yy, 26, 26, { fill: C.red });
    text(ctx, slide, "×", x + 4, yy - 2, 18, 26, { size: 20, color: C.bg, bold: true, align: "center" });
    text(ctx, slide, item, x + 42, yy - 3, 400, 36, { size: 18, color: C.ink });
  });
}

export async function slide13(presentation, ctx) {
  const slide = slideBase(presentation, ctx, "CHECKLIST", "課題では、モデル精度より先に評価手順の信頼性を守る", 13);

  box(ctx, slide, 72, 166, 514, 432, {
    fill: C.lightGreen,
    stroke: "#BBF7D0",
    kicker: "やること",
    kickerColor: C.green,
    title: "実装チェック",
    titleSize: 25,
  });
  checklist(ctx, slide, [
    "目的変数 y と特徴量 X を分ける",
    "train/test splitを先に行う",
    "前処理とSVRをPipeline化する",
    "CVでハイパーパラメータを探す",
    "best modelをtrain全体で再学習する",
    "testは最後に1回だけ評価する",
    "seed・分割・指標・環境を記録する",
  ], 108, 258, C.green);

  box(ctx, slide, 680, 166, 514, 360, {
    fill: C.lightRed,
    stroke: "#FECACA",
    kicker: "避けること",
    kickerColor: C.red,
    title: "よくあるミス",
    titleSize: 25,
  });
  traps(ctx, slide, [
    "全データでScalerをfitしてからCVする",
    "テストスコアを見ながら調整する",
    "seedなしで結果を比較する",
    "訓練スコアだけでモデルを選ぶ",
    "スコアが良すぎるのにリークを確認しない",
  ], 716, 270);

  rect(ctx, slide, 680, 548, 514, 58, { fill: C.faint, stroke: C.line, strokeWidth: 1 });
  text(ctx, slide, "結論: 非線形モデルは強い。だからこそ、評価設計を丁寧に。", 710, 560, 454, 40, {
    size: 18,
    color: C.ink,
    bold: true,
    align: "center",
  });
  return slide;
}
