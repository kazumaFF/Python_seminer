import { C, addSvg, box, bulletList, nonlinearSvg, slideBase, text } from "./common.mjs";

export async function slide02(presentation, ctx) {
  const slide = slideBase(presentation, ctx, "NONLINEAR", "非線形とは、傾きや効果が場所によって変わる関係", 2);
  await addSvg(ctx, slide, nonlinearSvg(), 70, 176, 520, 316, "linear and nonlinear plot");
  text(ctx, slide, "灰色の直線では、曲がった構造を拾いきれない", 92, 504, 450, 26, {
    size: 18,
    color: C.muted,
  });

  box(ctx, slide, 660, 172, 228, 118, {
    fill: C.lightBlue,
    stroke: "#BFDBFE",
    kicker: "曲線",
    title: "傾きが変わる",
    body: "xが増えても、yの増え方が一定ではない。",
  });
  box(ctx, slide, 922, 172, 228, 118, {
    fill: C.lightOrange,
    stroke: "#FED7AA",
    kicker: "飽和",
    kickerColor: C.orange,
    title: "効果が頭打ち",
    body: "ある範囲から変化が小さくなる。",
  });
  box(ctx, slide, 660, 324, 228, 118, {
    fill: C.lightGreen,
    stroke: "#BBF7D0",
    kicker: "相互作用",
    kickerColor: C.green,
    title: "組み合わせで効く",
    body: "x1だけでなく、x1×x2が効く。",
  });
  box(ctx, slide, 922, 324, 228, 118, {
    fill: C.faint,
    stroke: C.line,
    kicker: "閾値",
    kickerColor: C.muted,
    title: "急に変化する",
    body: "一定値を超えたときだけ反応する。",
  });

  bulletList(ctx, slide, [
    "線形: y = ax + b のように、変化の割合が一定",
    "非線形: 二乗、対数、指数、周期、相互作用などで曲がる",
    "モデル選択では、まず散布図や残差を見て形を疑う",
  ], 665, 502, 500, { size: 18, gap: 38 });
  return slide;
}

