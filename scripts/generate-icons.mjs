// Run with: node scripts/generate-icons.mjs
// Generates PNG icons from SVG using canvas (requires: npm install canvas --save-dev)
// If canvas isn't available, icons are copied from the SVG placeholder

import { createCanvas } from "canvas";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/icons");

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#F59E0B";
  roundRect(ctx, 0, 0, size, size, size * 0.2);
  ctx.fill();

  // Shopping bag body
  const s = size / 192;
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  const bagX = 48 * s, bagY = 70 * s, bagW = 96 * s, bagH = 90 * s, r = 12 * s;
  roundRect(ctx, bagX, bagY, bagW, bagH, r);
  ctx.fill();

  // Bag handle
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 10 * s;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(96 * s, 70 * s, 28 * s, Math.PI, 0);
  ctx.stroke();

  // Peso sign
  ctx.fillStyle = "#F59E0B";
  ctx.font = `bold ${38 * s}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("₱", 96 * s, 117 * s);

  return canvas.toBuffer("image/png");
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

for (const size of [192, 512]) {
  const buf = drawIcon(size);
  writeFileSync(join(outDir, `icon-${size}.png`), buf);
  console.log(`Generated icon-${size}.png`);
}
