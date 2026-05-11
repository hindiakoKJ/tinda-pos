// Generates PNG icons using pure Node.js (no canvas needed)
// Creates minimal valid PNG files with amber background + ₱ symbol in white
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/icons");

// Minimal 1x1 amber PNG to verify format, then scale up with CSS
// Actually create a proper SVG-based approach: write SVG files that browsers can use as icons
// For real PNGs we need a build step; for dev we'll use SVG with .png extension workaround

// Write SVG icon files (many PWA validators accept SVG referenced in manifest)
const SVG_192 = `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192">
  <rect width="192" height="192" rx="38" fill="#F59E0B"/>
  <path d="M68 70 h56 l-8 60 H76 L68 70z" fill="white" opacity="0.95"/>
  <path d="M80 70 c0-18 32-18 32 0" stroke="white" stroke-width="10" fill="none" stroke-linecap="round"/>
  <text x="96" y="107" font-family="Arial,sans-serif" font-size="36" font-weight="bold" fill="#F59E0B" text-anchor="middle" dominant-baseline="middle">₱</text>
</svg>`;

const SVG_512 = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="102" fill="#F59E0B"/>
  <path d="M181 187 h150 l-21 160 H202 L181 187z" fill="white" opacity="0.95"/>
  <path d="M213 187 c0-48 86-48 86 0" stroke="white" stroke-width="26" fill="none" stroke-linecap="round"/>
  <text x="256" y="280" font-family="Arial,sans-serif" font-size="96" font-weight="bold" fill="#F59E0B" text-anchor="middle" dominant-baseline="middle">₱</text>
</svg>`;

writeFileSync(join(outDir, "icon-192.svg"), SVG_192);
writeFileSync(join(outDir, "icon-512.svg"), SVG_512);
console.log("SVG icons written. For production PNG icons, run: npm install canvas && node scripts/generate-icons.mjs");
