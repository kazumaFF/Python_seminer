import { Buffer } from "node:buffer";

export const C = {
  bg: "#FFFFFF",
  ink: "#111827",
  muted: "#5B6573",
  faint: "#F6F7F9",
  line: "#D7DCE2",
  blue: "#2563EB",
  lightBlue: "#EFF6FF",
  teal: "#0F766E",
  lightTeal: "#ECFDF5",
  orange: "#D97706",
  lightOrange: "#FFF7ED",
  red: "#DC2626",
  lightRed: "#FEF2F2",
  green: "#16A34A",
  lightGreen: "#ECFDF5",
  violet: "#7C3AED",
  lightViolet: "#F5F3FF",
};

export const font = "Hiragino Sans";

export function line(fill = "#00000000", width = 0, style = "solid") {
  return { style, fill, width };
}

export function rect(ctx, slide, x, y, width, height, opts = {}) {
  const {
    fill = C.bg,
    stroke = "#00000000",
    strokeWidth = 0,
    name,
  } = opts;
  return ctx.addShape(slide, {
    name,
    geometry: "rect",
    x,
    y,
    width,
    height,
    fill,
    line: line(stroke, strokeWidth),
  });
}

export function ellipse(ctx, slide, x, y, width, height, opts = {}) {
  const {
    fill = C.bg,
    stroke = C.line,
    strokeWidth = 1,
    name,
  } = opts;
  return ctx.addShape(slide, {
    name,
    geometry: "ellipse",
    x,
    y,
    width,
    height,
    fill,
    line: line(stroke, strokeWidth),
  });
}

export function triangle(ctx, slide, x, y, width, height, opts = {}) {
  const {
    fill = C.blue,
    stroke = "#00000000",
    strokeWidth = 0,
    name,
  } = opts;
  return ctx.addShape(slide, {
    name,
    geometry: "triangle",
    x,
    y,
    width,
    height,
    fill,
    line: line(stroke, strokeWidth),
  });
}

export function text(ctx, slide, value, x, y, width, height, opts = {}) {
  const {
    size = 22,
    color = C.ink,
    bold = false,
    align = "left",
    valign = "top",
    fill = "#00000000",
    stroke = "#00000000",
    strokeWidth = 0,
    insets = { left: 0, right: 0, top: 0, bottom: 0 },
    name,
  } = opts;
  return ctx.addText(slide, {
    name,
    text: value,
    x,
    y,
    width,
    height,
    fontSize: size,
    color,
    bold,
    align,
    valign,
    typeface: font,
    fill,
    line: line(stroke, strokeWidth),
    insets,
  });
}

export function hline(ctx, slide, x, y, width, opts = {}) {
  return rect(ctx, slide, x, y, width, opts.thickness ?? 2, {
    fill: opts.color ?? C.line,
  });
}

export function vline(ctx, slide, x, y, height, opts = {}) {
  return rect(ctx, slide, x, y, opts.thickness ?? 2, height, {
    fill: opts.color ?? C.line,
  });
}

export function box(ctx, slide, x, y, width, height, opts = {}) {
  const fill = opts.fill ?? C.faint;
  const stroke = opts.stroke ?? C.line;
  const strokeWidth = opts.strokeWidth ?? 1;
  rect(ctx, slide, x, y, width, height, { fill, stroke, strokeWidth });
  if (opts.kicker) {
    text(ctx, slide, opts.kicker, x + 18, y + 14, width - 36, 22, {
      size: 12,
      color: opts.kickerColor ?? C.blue,
      bold: true,
    });
  }
  if (opts.title) {
    text(ctx, slide, opts.title, x + 18, y + (opts.kicker ? 38 : 18), width - 36, 34, {
      size: opts.titleSize ?? 22,
      color: opts.titleColor ?? C.ink,
      bold: true,
    });
  }
  if (opts.body) {
    const bodyTop = y + (opts.bodyTop ?? (opts.title ? (opts.kicker ? 72 : 58) : 26));
    const bodyHeight = Math.max(0, height - (bodyTop - y) - 18);
    text(ctx, slide, opts.body, x + 18, bodyTop, width - 36, bodyHeight, {
      size: opts.bodySize ?? 16,
      color: opts.bodyColor ?? C.muted,
      insets: { left: 0, right: 0, top: 0, bottom: 0 },
    });
  }
}

export function bulletList(ctx, slide, items, x, y, width, opts = {}) {
  const gap = opts.gap ?? 39;
  const size = opts.size ?? 20;
  items.forEach((item, i) => {
    const yy = y + i * gap;
    ellipse(ctx, slide, x, yy + 8, 9, 9, { fill: opts.dotColor ?? C.blue, stroke: opts.dotColor ?? C.blue });
    text(ctx, slide, item, x + 22, yy, width - 22, gap, {
      size,
      color: opts.color ?? C.ink,
    });
  });
}

export function slideBase(presentation, ctx, kicker, titleValue, page) {
  const slide = presentation.slides.add();
  rect(ctx, slide, 0, 0, 1280, 720, { fill: C.bg });
  hline(ctx, slide, 52, 50, 46, { color: C.blue, thickness: 5 });
  text(ctx, slide, kicker, 112, 40, 260, 22, {
    size: 12,
    color: C.blue,
    bold: true,
  });
  text(ctx, slide, titleValue, 52, 72, 980, 72, {
    size: 34,
    color: C.ink,
    bold: true,
  });
  text(ctx, slide, "第4回 Pythonセミナー | 非線形回帰と検証設計", 52, 682, 520, 20, {
    size: 11,
    color: C.muted,
  });
  text(ctx, slide, String(page).padStart(2, "0"), 1192, 682, 36, 20, {
    size: 11,
    color: C.muted,
    align: "right",
  });
  return slide;
}

export function arrowLabel(ctx, slide, x, y, color = C.blue) {
  text(ctx, slide, "→", x, y, 34, 30, {
    size: 24,
    color,
    bold: true,
    align: "center",
  });
}

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export async function addSvg(ctx, slide, svg, x, y, width, height, alt = "diagram") {
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg, "utf8").toString("base64")}`;
  return ctx.addImage(slide, { dataUrl, x, y, width, height, alt, fit: "contain" });
}

function plotPath(points, xMin, xMax, yMin, yMax, w, h, margin) {
  const sx = (x) => margin + ((x - xMin) / (xMax - xMin)) * (w - margin * 2);
  const sy = (y) => h - margin - ((y - yMin) / (yMax - yMin)) * (h - margin * 2);
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.x).toFixed(1)} ${sy(p.y).toFixed(1)}`).join(" ");
}

function plotPoints(points, xMin, xMax, yMin, yMax, w, h, margin, color, radius = 4, stroke = "#FFFFFF") {
  const sx = (x) => margin + ((x - xMin) / (xMax - xMin)) * (w - margin * 2);
  const sy = (y) => h - margin - ((y - yMin) / (yMax - yMin)) * (h - margin * 2);
  return points.map((p) => `<circle cx="${sx(p.x).toFixed(1)}" cy="${sy(p.y).toFixed(1)}" r="${radius}" fill="${color}" stroke="${stroke}" stroke-width="1.5"/>`).join("");
}

function frameSvg(w, h, margin) {
  return `
    <rect x="0" y="0" width="${w}" height="${h}" fill="#FFFFFF"/>
    <line x1="${margin}" y1="${h - margin}" x2="${w - margin}" y2="${h - margin}" stroke="#9CA3AF" stroke-width="1.5"/>
    <line x1="${margin}" y1="${margin}" x2="${margin}" y2="${h - margin}" stroke="#9CA3AF" stroke-width="1.5"/>
    <line x1="${margin}" y1="${margin}" x2="${w - margin}" y2="${margin}" stroke="#EEF2F7" stroke-width="1"/>
    <line x1="${margin}" y1="${(h / 2).toFixed(1)}" x2="${w - margin}" y2="${(h / 2).toFixed(1)}" stroke="#EEF2F7" stroke-width="1"/>
  `;
}

export function nonlinearSvg() {
  const w = 460;
  const h = 280;
  const m = 30;
  const xMin = 0;
  const xMax = 10;
  const yMin = 0;
  const yMax = 7;
  const curve = Array.from({ length: 80 }, (_, i) => {
    const x = xMin + (xMax - xMin) * (i / 79);
    const y = 0.18 * (x - 5) ** 2 + 1.45 + 0.25 * Math.sin(1.4 * x);
    return { x, y };
  });
  const linePts = [{ x: 0, y: 5.4 }, { x: 10, y: 2.0 }];
  const pts = [0.5, 1.4, 2.1, 3.0, 3.8, 4.8, 5.6, 6.5, 7.4, 8.5, 9.4].map((x, i) => ({
    x,
    y: 0.18 * (x - 5) ** 2 + 1.45 + 0.25 * Math.sin(1.4 * x) + [0.4, -0.2, 0.25, -0.35, 0.05, 0.25, -0.2, 0.15, -0.15, 0.28, -0.18][i],
  }));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${frameSvg(w, h, m)}
    <path d="${plotPath(linePts, xMin, xMax, yMin, yMax, w, h, m)}" fill="none" stroke="${C.muted}" stroke-width="3" stroke-dasharray="8 8"/>
    <path d="${plotPath(curve, xMin, xMax, yMin, yMax, w, h, m)}" fill="none" stroke="${C.blue}" stroke-width="4"/>
    ${plotPoints(pts, xMin, xMax, yMin, yMax, w, h, m, C.orange, 5)}
  </svg>`;
}

export function fitSvg(mode) {
  const w = 300;
  const h = 205;
  const m = 24;
  const xMin = 0;
  const xMax = 10;
  const yMin = 0;
  const yMax = 7;
  const pts = [0.7, 1.7, 2.6, 3.5, 4.4, 5.3, 6.4, 7.5, 8.5, 9.3].map((x, i) => ({
    x,
    y: 0.17 * (x - 5) ** 2 + 1.45 + [0.5, -0.2, 0.35, -0.3, 0.1, 0.3, -0.25, 0.25, -0.1, 0.2][i],
  }));
  let model;
  if (mode === "under") {
    model = [{ x: 0, y: 4.5 }, { x: 10, y: 2.7 }];
  } else if (mode === "good") {
    model = Array.from({ length: 70 }, (_, i) => {
      const x = xMin + (xMax - xMin) * (i / 69);
      return { x, y: 0.17 * (x - 5) ** 2 + 1.45 };
    });
  } else {
    model = Array.from({ length: 100 }, (_, i) => {
      const x = xMin + (xMax - xMin) * (i / 99);
      return { x, y: 0.17 * (x - 5) ** 2 + 1.45 + 0.45 * Math.sin(4.5 * x) };
    });
  }
  const color = mode === "good" ? C.green : mode === "under" ? C.muted : C.red;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${frameSvg(w, h, m)}
    <path d="${plotPath(model, xMin, xMax, yMin, yMax, w, h, m)}" fill="none" stroke="${color}" stroke-width="4"/>
    ${plotPoints(pts, xMin, xMax, yMin, yMax, w, h, m, C.blue, 4)}
  </svg>`;
}

export function svrTubeSvg() {
  const w = 560;
  const h = 330;
  const m = 34;
  const xMin = -3;
  const xMax = 3;
  const yMin = -2.2;
  const yMax = 2.2;
  const base = Array.from({ length: 100 }, (_, i) => {
    const x = xMin + (xMax - xMin) * (i / 99);
    return { x, y: 0.75 * Math.sin(1.25 * x) + 0.22 * x };
  });
  const upper = base.map((p) => ({ x: p.x, y: p.y + 0.45 }));
  const lower = base.map((p) => ({ x: p.x, y: p.y - 0.45 }));
  const pts = [-2.7, -2.1, -1.4, -0.8, -0.2, 0.45, 1.0, 1.6, 2.1, 2.7].map((x, i) => {
    const y = 0.75 * Math.sin(1.25 * x) + 0.22 * x + [0.2, -0.55, 0.25, 0.7, -0.2, 0.1, -0.65, 0.25, 0.6, -0.15][i];
    return { x, y };
  });
  const support = [pts[1], pts[3], pts[6], pts[8]];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${frameSvg(w, h, m)}
    <path d="${plotPath(upper, xMin, xMax, yMin, yMax, w, h, m)}" fill="none" stroke="${C.orange}" stroke-width="2" stroke-dasharray="7 7"/>
    <path d="${plotPath(lower, xMin, xMax, yMin, yMax, w, h, m)}" fill="none" stroke="${C.orange}" stroke-width="2" stroke-dasharray="7 7"/>
    <path d="${plotPath(base, xMin, xMax, yMin, yMax, w, h, m)}" fill="none" stroke="${C.blue}" stroke-width="4"/>
    ${plotPoints(pts, xMin, xMax, yMin, yMax, w, h, m, C.ink, 4)}
    ${plotPoints(support, xMin, xMax, yMin, yMax, w, h, m, C.orange, 7, C.red)}
  </svg>`;
}

export function rbfSvg() {
  const w = 310;
  const h = 250;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect x="0" y="0" width="${w}" height="${h}" fill="#FFFFFF"/>
    <line x1="28" y1="220" x2="286" y2="220" stroke="#9CA3AF" stroke-width="1.5"/>
    <line x1="28" y1="26" x2="28" y2="220" stroke="#9CA3AF" stroke-width="1.5"/>
    <ellipse cx="150" cy="126" rx="112" ry="72" fill="none" stroke="${C.lightBlue}" stroke-width="16"/>
    <ellipse cx="150" cy="126" rx="78" ry="50" fill="none" stroke="#BFDBFE" stroke-width="13"/>
    <ellipse cx="150" cy="126" rx="45" ry="29" fill="none" stroke="${C.blue}" stroke-width="10"/>
    <circle cx="150" cy="126" r="7" fill="${C.orange}" stroke="#FFFFFF" stroke-width="2"/>
    <circle cx="203" cy="88" r="5" fill="${C.ink}"/>
    <circle cx="95" cy="164" r="5" fill="${C.ink}"/>
    <circle cx="253" cy="169" r="5" fill="${C.ink}"/>
  </svg>`;
}

export function lossSvg() {
  const w = 360;
  const h = 205;
  const m = 28;
  const ptsLeft = [{ x: -3, y: 2 }, { x: -1, y: 0 }];
  const ptsFlat = [{ x: -1, y: 0 }, { x: 1, y: 0 }];
  const ptsRight = [{ x: 1, y: 0 }, { x: 3, y: 2 }];
  const path = (pts) => plotPath(pts, -3, 3, -0.2, 2.4, w, h, m);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${frameSvg(w, h, m)}
    <path d="${path(ptsLeft)}" fill="none" stroke="${C.blue}" stroke-width="4"/>
    <path d="${path(ptsFlat)}" fill="none" stroke="${C.blue}" stroke-width="4"/>
    <path d="${path(ptsRight)}" fill="none" stroke="${C.blue}" stroke-width="4"/>
    <line x1="139" y1="160" x2="139" y2="46" stroke="${C.orange}" stroke-width="2" stroke-dasharray="6 6"/>
    <line x1="221" y1="160" x2="221" y2="46" stroke="${C.orange}" stroke-width="2" stroke-dasharray="6 6"/>
    <text x="165" y="185" font-family="${esc(font)}" font-size="14" fill="${C.orange}">-ε</text>
    <text x="214" y="185" font-family="${esc(font)}" font-size="14" fill="${C.orange}">+ε</text>
  </svg>`;
}
