import { C, addSvg, box, fitSvg, slideBase, text } from "./common.mjs";

export async function slide04(presentation, ctx) {
  const slide = slideBase(presentation, ctx, "COMPLEXITY", "非線形モデルは強いが、複雑すぎると汎化しない", 4);
  const panels = [
    ["under", "単純すぎる", "訓練も検証も悪い", C.muted],
    ["good", "ちょうどよい", "未知データにも近い", C.green],
    ["over", "複雑すぎる", "訓練だけ良くなる", C.red],
  ];
  for (let i = 0; i < panels.length; i += 1) {
    const [mode, label, body, color] = panels[i];
    const x = 88 + i * 390;
    await addSvg(ctx, slide, fitSvg(mode), x, 178, 310, 220, `${mode} fit`);
    text(ctx, slide, label, x + 18, 416, 260, 28, { size: 24, color, bold: true, align: "center" });
    text(ctx, slide, body, x + 10, 452, 280, 30, { size: 17, color: C.muted, align: "center" });
  }

  box(ctx, slide, 140, 530, 1000, 102, {
    fill: C.faint,
    stroke: C.line,
    title: "判断の軸",
    titleSize: 20,
    body: "訓練スコアだけでなく、クロスバリデーションの平均とばらつきを見る。非線形化は「精度が上がったか」ではなく「未知データで安定したか」で判断する。",
    bodySize: 17,
  });
  return slide;
}
