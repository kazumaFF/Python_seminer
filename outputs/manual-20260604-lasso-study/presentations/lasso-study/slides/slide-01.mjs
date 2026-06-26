import { card, column, fixed, grow, shape, stroke, text } from "@oai/artifact-tool";

const ink = "#111827";
const muted = "#6B7280";
const accent = "#2563EB";
const paper = "#FFFFFF";

const titleStyle = { typeface: "Arial", fontSize: 46, bold: true, color: ink };
const bodyStyle = { typeface: "Arial", fontSize: 23, color: ink, lineSpacing: 1.15 };
const smallStyle = { typeface: "Arial", fontSize: 15, color: muted };

export async function slide01(presentation) {
  const slide = presentation.slides.add();
  slide.compose(
    card({ width: fixed(1280), height: fixed(720), fill: paper, padding: 54 },
      column({ width: grow(), height: grow(), gap: 28 }, [
        shape({ width: fixed(72), height: fixed(6), fill: accent, line: stroke("none") }),
        text("第3回 調べ学習まとめ", { style: titleStyle, width: fixed(940) }),
        text("回帰モデルの原理と特徴を結びつけて説明する", { style: bodyStyle, width: fixed(860) }),
        text("最小二乗法、Lasso回帰、PLS回帰 / オートスケーリング、過学習、次元圧縮、回帰、線形、ハイパーパラメータ", {
          style: smallStyle,
          width: fixed(1040),
        }),
      ])
    )
  );
  return slide;
}
