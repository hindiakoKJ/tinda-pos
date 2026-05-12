import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = resolve(__dirname, 'icon.svg');
const svg = readFileSync(svgPath);

const outDir = resolve(__dirname, '../public/icons');

// Generate 192x192
await sharp(svg)
  .resize(192, 192)
  .png()
  .toFile(resolve(outDir, 'icon-192.png'));
console.log('✓ icon-192.png');

// Generate 512x512
await sharp(svg)
  .resize(512, 512)
  .png()
  .toFile(resolve(outDir, 'icon-512.png'));
console.log('✓ icon-512.png');

// Also copy logo SVG to public
import { copyFileSync } from 'fs';
copyFileSync(
  resolve(__dirname, 'logo.svg'),
  resolve(__dirname, '../public/logo.svg')
);
console.log('✓ logo.svg → public/logo.svg');

console.log('\nAll icons generated!');
