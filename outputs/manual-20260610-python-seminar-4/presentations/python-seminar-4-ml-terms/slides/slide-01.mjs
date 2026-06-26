import { C, arrowLabel, box, hline, rect, text } from "./common.mjs";

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  rect(ctx, slide, 0, 0, 1280, 720, { fill: C.bg });
  hline(ctx, slide, 64, 70, 70, { color: C.blue, thickness: 6 });
  text(ctx, slide, "第4回 Pythonセミナー", 64, 102, 420, 28, {
    size: 18,
    color: C.blue,
    bold: true,
  });
  text(ctx, slide, "非線形回帰と検証設計を、ひとつの流れとして理解する", 64, 150, 960, 112, {
    size: 43,
    color: C.ink,
    bold: true,
  });
  text(ctx, slide, "非線形 / 非線形回帰モデル / SVR / クロスバリデーション / データリーク / seed / 特徴エンジニアリング", 66, 282, 1030, 34, {
    size: 18,
    color: C.muted,
  });

  const topics = [
    ["1", "非線形", "直線では足りない関係"],
    ["2", "非線形回帰", "曲線・相互作用を学ぶ"],
    ["3", "SVR", "epsilon幅とカーネル"],
    ["4", "CV", "分割を替えて評価"],
    ["5", "リーク", "評価を汚さない"],
    ["6", "seed", "同じ条件を再現"],
    ["7", "特徴量", "入力を学びやすくする"],
  ];
  topics.forEach(([n, title, body], i) => {
    const x = 66 + i * 164;
    box(ctx, slide, x, 378, 136, 142, {
      fill: i < 3 ? C.lightBlue : i < 5 ? C.lightOrange : C.lightGreen,
      stroke: i < 3 ? "#BFDBFE" : i < 5 ? "#FED7AA" : "#BBF7D0",
      kicker: n,
      kickerColor: i < 3 ? C.blue : i < 5 ? C.orange : C.green,
      title,
      titleSize: 21,
      body,
      bodySize: 13,
    });
    if (i < topics.length - 1) arrowLabel(ctx, slide, x + 139, 430, C.muted);
  });

  text(ctx, slide, "目的: モデルを複雑にするだけでなく、未知データで信頼できる評価手順まで説明できるようにする", 66, 594, 1030, 36, {
    size: 20,
    color: C.ink,
    bold: true,
  });
  text(ctx, slide, "第4回 Pythonセミナー | 非線形回帰と検証設計", 66, 682, 520, 20, {
    size: 11,
    color: C.muted,
  });
  text(ctx, slide, "01", 1192, 682, 36, 20, {
    size: 11,
    color: C.muted,
    align: "right",
  });
  return slide;
}

