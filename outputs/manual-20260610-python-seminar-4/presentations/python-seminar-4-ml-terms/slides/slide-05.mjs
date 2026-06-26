import { C, addSvg, box, slideBase, svrTubeSvg, text } from "./common.mjs";

export async function slide05(presentation, ctx) {
  const slide = slideBase(presentation, ctx, "SVR PRINCIPLE", "SVRはepsilon幅の内側の誤差を無視して、重要な点で曲線を決める", 5);
  await addSvg(ctx, slide, svrTubeSvg(), 70, 166, 610, 360, "SVR epsilon tube");

  box(ctx, slide, 742, 160, 360, 100, {
    fill: C.lightOrange,
    stroke: "#FED7AA",
    kicker: "epsilon",
    kickerColor: C.orange,
    title: "許容誤差のチューブ",
    body: "チューブ内の点は、基本的に損失0として扱う。",
  });
  box(ctx, slide, 742, 284, 360, 100, {
    fill: C.lightBlue,
    stroke: "#BFDBFE",
    kicker: "support vectors",
    title: "外側や境界の点が効く",
    body: "関数の形に強く影響する点だけが残る。",
  });
  box(ctx, slide, 742, 408, 360, 100, {
    fill: C.lightGreen,
    stroke: "#BBF7D0",
    kicker: "robustness",
    kickerColor: C.green,
    title: "ノイズに合わせすぎない",
    body: "小さな誤差を全部追いかけない設計。",
  });

  text(ctx, slide, "epsilon-insensitive loss:  Lε(y, ŷ) = max(0, |y - ŷ| - ε)", 92, 548, 620, 30, {
    size: 21,
    color: C.ink,
    bold: true,
  });
  text(ctx, slide, "ただし、特徴量の尺度がそろっていないと距離計算が崩れるため、StandardScalerなどをPipelineに入れる。", 742, 538, 384, 62, {
    size: 17,
    color: C.ink,
  });
  return slide;
}
