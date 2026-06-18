// Regenerate the full TindaPOS icon set in TEAL (#0E8A82) for both the PWA
// (tinda-pos/public) and the native app (tindapos-native/assets).
// Uses sharp (librsvg) to rasterize recolored SVGs. Run: node scripts/gen-teal-icons.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pwaPublic = join(__dirname, "../public");
const pwaIcons = join(pwaPublic, "icons");
const nativeAssets = join(__dirname, "../../tindapos-native/assets");
mkdirSync(pwaIcons, { recursive: true });

const TEAL = "#0E8A82";

// ── Shared glyph: shopping-bag body + handle, with a peso sign drawn as a VECTOR
// PATH (not <text>) so it renders identically regardless of installed fonts.
// Peso "₱" = a bold P bowl on a vertical stem, with two horizontal bars
// crossing through the bowl (Philippine peso double-stroke).
const pesoPath = (cx, cy, H, fill) => {
  const sw = H * 0.20;          // stem width
  const sx = cx - H * 0.24;     // stem left edge
  const ty = cy - H / 2;        // top of glyph
  const bowlH = H * 0.50;       // bowl height (top half)
  const bulge = H * 0.30;       // how far the bowl bulges right
  const barX = sx - H * 0.16;   // bars extend left of the stem
  const barW = H * 0.72;
  const barH = H * 0.11;
  const b1 = ty + H * 0.30;
  const b2 = ty + H * 0.46;
  return `
    <g fill="${fill}">
      <rect x="${sx}" y="${ty}" width="${sw}" height="${H}"/>
      <path d="M ${sx + sw} ${ty} h ${bulge} a ${bowlH / 2} ${bowlH / 2} 0 0 1 0 ${bowlH} h ${-bulge} z"/>
      <rect x="${barX}" y="${b1}" width="${barW}" height="${barH}"/>
      <rect x="${barX}" y="${b2}" width="${barW}" height="${barH}"/>
    </g>`;
};

const bag = (pesoFill) => `
  <path d="M362 374 h300 l-42 320 H404 L362 374 Z" fill="#ffffff"/>
  <path d="M426 374 c0-96 172-96 172 0" stroke="#ffffff" stroke-width="52" fill="none" stroke-linecap="round"/>
  ${pesoPath(512, 540, 232, pesoFill)}
`;

const svgRounded = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" rx="205" fill="${TEAL}"/>
  ${bag(TEAL)}
</svg>`;

const svgMaskable = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" fill="${TEAL}"/>
  ${bag(TEAL)}
</svg>`;

// Transparent white-bag glyph (peso knocked out in teal) for splash / header / adaptive.
const svgGlyph = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  ${bag(TEAL)}
</svg>`;

const png = (svg, size) =>
  sharp(Buffer.from(svg)).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png();

async function out(svg, size, path) {
  await png(svg, size).toFile(path);
  console.log("✓", path);
}

// ── Feature graphic (PWA splash banner): recolor the existing amber SVG → teal.
async function featureGraphic() {
  let svg = readFileSync(join(__dirname, "feature-graphic.svg"), "utf8");
  svg = svg
    .replaceAll("#F59E0B", TEAL)
    .replaceAll("#D97706", "#0B6F68")
    .replaceAll("#FBBF24", "#5FD3C8")
    .replaceAll("#92400E", "#08504B");
  writeFileSync(join(__dirname, "feature-graphic.svg"), svg);
  await sharp(Buffer.from(svg)).resize(1024, 500).png().toFile(join(pwaPublic, "feature-graphic.png"));
  console.log("✓", join(pwaPublic, "feature-graphic.png"));
}

await Promise.all([
  // PWA icons
  out(svgRounded, 192, join(pwaIcons, "icon-192.png")),
  out(svgRounded, 512, join(pwaIcons, "icon-512.png")),
  out(svgMaskable, 192, join(pwaIcons, "icon-192-maskable.png")),
  out(svgMaskable, 512, join(pwaIcons, "icon-512-maskable.png")),
  // Native assets
  out(svgRounded, 1024, join(nativeAssets, "icon.png")),
  out(svgGlyph, 1024, join(nativeAssets, "adaptive-icon.png")),
  out(svgGlyph, 1024, join(nativeAssets, "splash-icon.png")),
  out(svgGlyph, 512, join(nativeAssets, "tindapos-logo.png")),
  out(svgRounded, 48, join(nativeAssets, "favicon.png")),
  featureGraphic(),
]);
console.log("Done.");
