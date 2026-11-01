// Generates the Android app icon and splash images from the Card Vault logo.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

mkdirSync('assets', { recursive: true });
const bg = '#0e1116';
const art = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7c5cff"/><stop offset="1" stop-color="#22c3a6"/></linearGradient></defs>
<rect x="96" y="150" width="320" height="212" rx="28" fill="url(#g)"/>
<rect x="96" y="196" width="320" height="40" fill="${bg}" opacity=".55"/>
<rect x="128" y="276" width="70" height="50" rx="10" fill="#f5d77a"/>
<rect x="232" y="296" width="150" height="14" rx="7" fill="#fff" opacity=".8"/>`;
const svg = (size, inner, scale, withBg) => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">` +
  (withBg ? `<rect width="512" height="512" fill="${bg}"/>` : '') +
  `<g transform="translate(256 256) scale(${scale}) translate(-256 -256)">${inner}</g></svg>`);

await sharp(svg(1024, art, 1, true)).png().toFile('assets/icon-only.png');
await sharp(svg(1024, art, 0.75, false)).png().toFile('assets/icon-foreground.png');
await sharp(svg(1024, '', 1, true)).png().toFile('assets/icon-background.png');
await sharp(svg(2732, art, 0.35, true)).png().toFile('assets/splash.png');
await sharp(svg(2732, art, 0.35, true)).png().toFile('assets/splash-dark.png');
console.log('Icons generated');
