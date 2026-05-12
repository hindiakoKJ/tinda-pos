import sharp from 'sharp';
import { writeFileSync } from 'fs';

const AMBER = '#F59E0B';
const AMBER_DARK = '#D97706';
const BG = '#FAFAF8';
const CARD = '#FFFFFF';
const FG = '#1A1714';
const FG_MUTED = '#6B6460';
const BORDER = '#E8E4DC';
const SUCCESS = '#16A34A';

function phoneScreen1() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <rect width="1080" height="1920" fill="${BG}"/>
  <!-- Status bar -->
  <rect width="1080" height="80" fill="${AMBER}"/>
  <text x="60" y="54" font-family="Arial" font-size="28" font-weight="700" fill="white">9:41</text>
  <text x="980" y="54" text-anchor="end" font-family="Arial" font-size="24" fill="white">●●● 100%</text>

  <!-- App bar -->
  <rect width="1080" height="120" y="80" fill="${AMBER}"/>
  <text x="60" y="162" font-family="Arial Black, Arial" font-size="44" font-weight="900" fill="white">Buod</text>
  <text x="1020" y="162" text-anchor="end" font-family="Arial" font-size="28" fill="white" opacity="0.9">Lunes, Mayo 12</text>

  <!-- Summary cards 2x2 grid -->
  <!-- Card 1: Benta Ngayon -->
  <rect x="40" y="240" width="480" height="200" rx="20" fill="${CARD}" stroke="${BORDER}" stroke-width="2"/>
  <text x="80" y="298" font-family="Arial" font-size="26" fill="${FG_MUTED}">Benta Ngayon</text>
  <text x="80" y="380" font-family="Arial Black" font-size="52" font-weight="900" fill="${FG}">₱1,240</text>
  <text x="80" y="420" font-family="Arial" font-size="24" fill="${SUCCESS}">↑ 12 transaksyon</text>

  <!-- Card 2: Gross Kita -->
  <rect x="560" y="240" width="480" height="200" rx="20" fill="${CARD}" stroke="${BORDER}" stroke-width="2"/>
  <text x="600" y="298" font-family="Arial" font-size="26" fill="${FG_MUTED}">Gross Kita</text>
  <text x="600" y="380" font-family="Arial Black" font-size="52" font-weight="900" fill="${SUCCESS}">₱380</text>
  <text x="600" y="420" font-family="Arial" font-size="24" fill="${FG_MUTED}">kita ngayon</text>

  <!-- Card 3: Gastos -->
  <rect x="40" y="460" width="480" height="200" rx="20" fill="${CARD}" stroke="${BORDER}" stroke-width="2"/>
  <text x="80" y="518" font-family="Arial" font-size="26" fill="${FG_MUTED}">Gastos</text>
  <text x="80" y="600" font-family="Arial Black" font-size="52" font-weight="900" fill="#DC2626">₱150</text>
  <text x="80" y="640" font-family="Arial" font-size="24" fill="${FG_MUTED}">gastos ngayon</text>

  <!-- Card 4: Net Kita -->
  <rect x="560" y="460" width="480" height="200" rx="20" fill="${CARD}" stroke="${BORDER}" stroke-width="2"/>
  <text x="600" y="518" font-family="Arial" font-size="26" fill="${FG_MUTED}">Net Kita</text>
  <text x="600" y="600" font-family="Arial Black" font-size="52" font-weight="900" fill="${SUCCESS}">₱230</text>
  <text x="600" y="640" font-family="Arial" font-size="24" fill="${FG_MUTED}">net ngayon</text>

  <!-- Best sellers section -->
  <text x="60" y="730" font-family="Arial Black" font-size="36" font-weight="700" fill="${FG}">🏆 Pinakamabenta</text>

  <!-- Seller rows -->
  ${[
    ['1', 'Coke Mismo', '₱20', '34 na benta'],
    ['2', 'Lucky Me Noodles', '₱16', '28 na benta'],
    ['3', 'Mineral Water', '₱15', '22 na benta'],
    ['4', 'SkyFlakes', '₱10', '18 na benta'],
    ['5', 'Ariel Sachet', '₱8', '15 na benta'],
  ].map(([rank, name, price, sold], i) => `
    <rect x="40" y="${780 + i * 110}" width="1000" height="95" rx="16" fill="${CARD}" stroke="${BORDER}" stroke-width="2"/>
    <rect x="40" y="${780 + i * 110}" width="10" height="95" rx="8" fill="${AMBER}"/>
    <text x="80" y="${843 + i * 110}" font-family="Arial Black" font-size="30" font-weight="900" fill="${AMBER}">${rank}</text>
    <text x="130" y="${843 + i * 110}" font-family="Arial" font-size="30" font-weight="600" fill="${FG}">${name}</text>
    <text x="1020" y="${843 + i * 110}" text-anchor="end" font-family="Arial" font-size="28" font-weight="700" fill="${FG}">${sold}</text>
  `).join('')}

  <!-- Low stock section -->
  <text x="60" y="1390" font-family="Arial Black" font-size="36" font-weight="700" fill="${FG}">⚠️ Mababang Stock</text>
  <rect x="40" y="1410" width="1000" height="90" rx="16" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2"/>
  <text x="80" y="1464" font-family="Arial" font-size="28" fill="#92400E">Marlboro Red Stick — 3 natitira</text>
  <rect x="40" y="1516" width="1000" height="90" rx="16" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2"/>
  <text x="80" y="1570" font-family="Arial" font-size="28" fill="#92400E">Disposable Lighter — 2 natitira</text>

  <!-- Bottom nav -->
  <rect x="0" y="1792" width="1080" height="128" fill="${CARD}" stroke="${BORDER}" stroke-width="2"/>
  ${[
    ['Buod', '📊', true],
    ['POS', '🛍️', false],
    ['Paninda', '📦', false],
    ['Benta', '📋', false],
    ['Kita', '💰', false],
  ].map(([label, icon, active], i) => `
    <rect x="${i * 216}" y="1792" width="216" height="128" fill="${active ? '#FEF3C7' : 'transparent'}"/>
    ${active ? `<rect x="${i * 216 + 68}" y="1792" width="80" height="4" rx="2" fill="${AMBER}"/>` : ''}
    <text x="${i * 216 + 108}" y="1870" text-anchor="middle" font-family="Arial" font-size="40">${icon}</text>
    <text x="${i * 216 + 108}" y="1904" text-anchor="middle" font-family="Arial" font-size="22" font-weight="${active ? '700' : '400'}" fill="${active ? AMBER : FG_MUTED}">${label}</text>
  `).join('')}
</svg>`;
}

function phoneScreen2() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <rect width="1080" height="1920" fill="${BG}"/>
  <!-- Status bar -->
  <rect width="1080" height="80" fill="${AMBER}"/>
  <text x="60" y="54" font-family="Arial" font-size="28" font-weight="700" fill="white">9:41</text>
  <text x="980" y="54" text-anchor="end" font-family="Arial" font-size="24" fill="white">●●● 100%</text>

  <!-- App bar -->
  <rect width="1080" height="120" y="80" fill="${AMBER}"/>
  <text x="60" y="162" font-family="Arial Black, Arial" font-size="44" font-weight="900" fill="white">Benta (POS)</text>

  <!-- Search bar -->
  <rect x="40" y="220" width="1000" height="80" rx="40" fill="${CARD}" stroke="${BORDER}" stroke-width="2"/>
  <text x="80" y="270" font-family="Arial" font-size="28" fill="${FG_MUTED}">🔍  Hanapin ang produkto...</text>

  <!-- Category chips -->
  ${['Lahat', 'Inumin', 'Pagkain', 'Pang-araw-araw'].map((cat, i) => `
    <rect x="${40 + i * 230}" y="324" width="${i === 0 ? 120 : 200}" height="56" rx="28" fill="${i === 0 ? AMBER : CARD}" stroke="${i === 0 ? AMBER : BORDER}" stroke-width="2"/>
    <text x="${40 + i * 230 + (i === 0 ? 60 : 100)}" y="360" text-anchor="middle" font-family="Arial" font-size="24" font-weight="${i === 0 ? '700' : '400'}" fill="${i === 0 ? 'white' : FG_MUTED}">${cat}</text>
  `).join('')}

  <!-- Product grid 2 columns -->
  ${[
    ['Coke Mismo', '₱20', '48'],
    ['Royal 237ml', '₱20', '32'],
    ['Mineral Water', '₱15', '60'],
    ['Lucky Me Noodles', '₱16', '24'],
    ['SkyFlakes', '₱10', '80'],
    ['Chips More', '₱25', '16'],
    ['Safeguard Soap', '₱28', '12'],
    ['Colgate Twin', '₱25', '8'],
  ].map(([ name, price, stock], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = col === 0 ? 40 : 560;
    const y = 410 + row * 290;
    return `
    <rect x="${x}" y="${y}" width="480" height="260" rx="20" fill="${CARD}" stroke="${BORDER}" stroke-width="2"/>
    <rect x="${x}" y="${y}" width="480" height="140" rx="20" fill="#FEF3C7"/>
    <text x="${x + 240}" y="${y + 80}" text-anchor="middle" font-family="Arial" font-size="60">🛍️</text>
    <text x="${x + 24}" y="${y + 180}" font-family="Arial" font-size="26" font-weight="600" fill="${FG}">${name}</text>
    <text x="${x + 24}" y="${y + 222}" font-family="Arial Black" font-size="32" font-weight="900" fill="${AMBER}">${price}</text>
    <rect x="${x + 370}" y="${y + 196}" width="86" height="48" rx="24" fill="${AMBER}"/>
    <text x="${x + 413}" y="${y + 228}" text-anchor="middle" font-family="Arial Black" font-size="36" fill="white">+</text>
    `;
  }).join('')}

  <!-- Cart button -->
  <rect x="40" y="1780" width="1000" height="100" rx="50" fill="${AMBER}"/>
  <text x="540" y="1842" text-anchor="middle" font-family="Arial Black" font-size="36" font-weight="900" fill="white">🛒  Tingnan ang Cart  •  ₱56</text>

  <!-- Bottom nav -->
  <rect x="0" y="1792" width="1080" height="128" fill="${CARD}" stroke="${BORDER}" stroke-width="2"/>
  ${[
    ['Buod', '📊', false],
    ['POS', '🛍️', true],
    ['Paninda', '📦', false],
    ['Benta', '📋', false],
    ['Kita', '💰', false],
  ].map(([label, icon, active], i) => `
    <rect x="${i * 216}" y="1792" width="216" height="128" fill="${active ? '#FEF3C7' : 'transparent'}"/>
    ${active ? `<rect x="${i * 216 + 68}" y="1792" width="80" height="4" rx="2" fill="${AMBER}"/>` : ''}
    <text x="${i * 216 + 108}" y="1870" text-anchor="middle" font-family="Arial" font-size="40">${icon}</text>
    <text x="${i * 216 + 108}" y="1904" text-anchor="middle" font-family="Arial" font-size="22" font-weight="${active ? '700' : '400'}" fill="${active ? AMBER : FG_MUTED}">${label}</text>
  `).join('')}
</svg>`;
}

function phoneScreen3() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <rect width="1080" height="1920" fill="${BG}"/>
  <rect width="1080" height="80" fill="${AMBER}"/>
  <text x="60" y="54" font-family="Arial" font-size="28" font-weight="700" fill="white">9:41</text>
  <text x="980" y="54" text-anchor="end" font-family="Arial" font-size="24" fill="white">●●● 100%</text>
  <rect width="1080" height="120" y="80" fill="${AMBER}"/>
  <text x="60" y="162" font-family="Arial Black, Arial" font-size="44" font-weight="900" fill="white">Paninda</text>
  <rect x="920" y="96" width="120" height="88" rx="20" fill="white" opacity="0.25"/>
  <text x="980" y="152" text-anchor="middle" font-family="Arial Black" font-size="40" fill="white">+</text>

  <!-- Table header -->
  <rect x="0" y="200" width="1080" height="72" fill="${CARD}" stroke="${BORDER}" stroke-width="1"/>
  <text x="60" y="246" font-family="Arial" font-size="24" font-weight="700" fill="${FG_MUTED}">PRODUKTO</text>
  <text x="680" y="246" font-family="Arial" font-size="24" font-weight="700" fill="${FG_MUTED}">PRESYO</text>
  <text x="860" y="246" font-family="Arial" font-size="24" font-weight="700" fill="${FG_MUTED}">STOCK</text>

  <!-- Product rows -->
  ${[
    ['Coke Mismo', 'Inumin', '₱20', '₱14', '48', false],
    ['Royal 237ml', 'Inumin', '₱20', '₱14', '32', false],
    ['Mineral Water', 'Inumin', '₱15', '₱10', '60', false],
    ['Lucky Me Noodles', 'Pagkain', '₱16', '₱11', '24', false],
    ['SkyFlakes', 'Pagkain', '₱10', '₱7', '80', false],
    ['Chips More', 'Pagkain', '₱25', '₱18', '16', false],
    ['Safeguard Soap', 'Pang-araw-araw', '₱28', '₱20', '12', false],
    ['Marlboro Red', 'Iba Pa', '₱8', '₱6', '3', true],
    ['Disposable Lighter', 'Iba Pa', '₱15', '₱10', '2', true],
  ].map(([name, cat, sell, buy, stock, low], i) => `
    <rect x="0" y="${272 + i * 140}" width="1080" height="130" fill="${low ? '#FEF3C7' : (i % 2 === 0 ? CARD : BG)}" stroke="${BORDER}" stroke-width="1"/>
    <text x="60" y="${348 + i * 140}" font-family="Arial" font-size="30" font-weight="600" fill="${FG}">${name}</text>
    <text x="60" y="${384 + i * 140}" font-family="Arial" font-size="22" fill="${FG_MUTED}">${cat}</text>
    <text x="680" y="${358 + i * 140}" font-family="Arial" font-size="30" font-weight="700" fill="${FG}">${sell}</text>
    <rect x="820" y="${316 + i * 140}" width="140" height="52" rx="26" fill="${low ? '#FEF3C7' : '#F0FDF4'}" stroke="${low ? '#F59E0B' : '#16A34A'}" stroke-width="2"/>
    <text x="890" y="${350 + i * 140}" text-anchor="middle" font-family="Arial" font-size="26" font-weight="700" fill="${low ? '#92400E' : '#16A34A'}">${stock}</text>
  `).join('')}

  <!-- Bottom nav -->
  <rect x="0" y="1792" width="1080" height="128" fill="${CARD}" stroke="${BORDER}" stroke-width="2"/>
  ${[
    ['Buod', '📊', false],
    ['POS', '🛍️', false],
    ['Paninda', '📦', true],
    ['Benta', '📋', false],
    ['Kita', '💰', false],
  ].map(([label, icon, active], i) => `
    <rect x="${i * 216}" y="1792" width="216" height="128" fill="${active ? '#FEF3C7' : 'transparent'}"/>
    ${active ? `<rect x="${i * 216 + 68}" y="1792" width="80" height="4" rx="2" fill="${AMBER}"/>` : ''}
    <text x="${i * 216 + 108}" y="1870" text-anchor="middle" font-family="Arial" font-size="40">${icon}</text>
    <text x="${i * 216 + 108}" y="1904" text-anchor="middle" font-family="Arial" font-size="22" font-weight="${active ? '700' : '400'}" fill="${active ? AMBER : FG_MUTED}">${label}</text>
  `).join('')}
</svg>`;
}

function phoneScreen4() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <rect width="1080" height="1920" fill="${BG}"/>
  <rect width="1080" height="80" fill="${AMBER}"/>
  <text x="60" y="54" font-family="Arial" font-size="28" font-weight="700" fill="white">9:41</text>
  <text x="980" y="54" text-anchor="end" font-family="Arial" font-size="24" fill="white">●●● 100%</text>
  <rect width="1080" height="120" y="80" fill="${AMBER}"/>
  <text x="60" y="162" font-family="Arial Black, Arial" font-size="44" font-weight="900" fill="white">Kasaysayan ng Benta</text>

  <!-- Filter chips -->
  ${['Ngayon', 'Linggon ito', 'Buwang ito'].map((f, i) => `
    <rect x="${40 + i * 280}" y="224" width="250" height="60" rx="30" fill="${i === 0 ? AMBER : CARD}" stroke="${i === 0 ? AMBER : BORDER}" stroke-width="2"/>
    <text x="${40 + i * 280 + 125}" y="263" text-anchor="middle" font-family="Arial" font-size="26" font-weight="${i === 0 ? '700' : '400'}" fill="${i === 0 ? 'white' : FG_MUTED}">${f}</text>
  `).join('')}

  <!-- Transaction rows -->
  ${[
    ['9:12 AM', '3 produkto', '₱56', ['Coke Mismo x2', 'Chips More x1']],
    ['8:58 AM', '5 produkto', '₱124', ['Lucky Me x3', 'Mineral Water x2']],
    ['8:44 AM', '2 produkto', '₱36', ['Safeguard Soap x1', 'Ariel Sachet x2']],
    ['8:30 AM', '4 produkto', '₱88', ['Royal 237ml x4']],
    ['8:15 AM', '1 produkto', '₱28', ['Safeguard Soap x1']],
    ['8:02 AM', '6 produkto', '₱160', ['Coke Mismo x4', 'Chips More x2']],
    ['7:48 AM', '3 produkto', '₱64', ['Lucky Me x2', 'SkyFlakes x4']],
  ].map(([time, count, total, items], i) => `
    <rect x="40" y="${310 + i * 190}" width="1000" height="170" rx="20" fill="${CARD}" stroke="${BORDER}" stroke-width="2"/>
    <rect x="40" y="${310 + i * 190}" width="10" height="170" rx="8" fill="${AMBER}"/>
    <text x="80" y="${382 + i * 190}" font-family="Arial" font-size="28" font-weight="700" fill="${FG}">${time}</text>
    <text x="80" y="${422 + i * 190}" font-family="Arial" font-size="24" fill="${FG_MUTED}">${items[0]}</text>
    <text x="1020" y="${382 + i * 190}" text-anchor="end" font-family="Arial Black" font-size="36" font-weight="900" fill="${AMBER}">${total}</text>
    <text x="1020" y="${422 + i * 190}" text-anchor="end" font-family="Arial" font-size="24" fill="${FG_MUTED}">${count}</text>
  `).join('')}

  <!-- Bottom nav -->
  <rect x="0" y="1792" width="1080" height="128" fill="${CARD}" stroke="${BORDER}" stroke-width="2"/>
  ${[
    ['Buod', '📊', false],
    ['POS', '🛍️', false],
    ['Paninda', '📦', false],
    ['Benta', '📋', true],
    ['Kita', '💰', false],
  ].map(([label, icon, active], i) => `
    <rect x="${i * 216}" y="1792" width="216" height="128" fill="${active ? '#FEF3C7' : 'transparent'}"/>
    ${active ? `<rect x="${i * 216 + 68}" y="1792" width="80" height="4" rx="2" fill="${AMBER}"/>` : ''}
    <text x="${i * 216 + 108}" y="1870" text-anchor="middle" font-family="Arial" font-size="40">${icon}</text>
    <text x="${i * 216 + 108}" y="1904" text-anchor="middle" font-family="Arial" font-size="22" font-weight="${active ? '700' : '400'}" fill="${active ? AMBER : FG_MUTED}">${label}</text>
  `).join('')}
</svg>`;
}

const screens = [
  { name: 'phone-1-buod', svg: phoneScreen1() },
  { name: 'phone-2-pos', svg: phoneScreen2() },
  { name: 'phone-3-paninda', svg: phoneScreen3() },
  { name: 'phone-4-benta', svg: phoneScreen4() },
];

for (const { name, svg } of screens) {
  const buf = Buffer.from(svg);
  await sharp(buf)
    .resize(1080, 1920)
    .png()
    .toFile(`public/screenshots/${name}.png`);
  console.log(`✓ ${name}.png`);
}

console.log('\nAll screenshots done!');
