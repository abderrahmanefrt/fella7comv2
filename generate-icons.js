import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const svgPath = path.resolve('public/favicon.svg');
const publicDir = path.resolve('public');

async function generate() {
  if (!fs.existsSync(svgPath)) {
    console.error('Error: public/favicon.svg not found.');
    process.exit(1);
  }

  console.log('Generating PWA icons from favicon.svg...');

  // 1. Standard 192x192 PNG
  await sharp(svgPath)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('✓ Generated pwa-192x192.png');

  // 2. Standard 512x512 PNG
  await sharp(svgPath)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('✓ Generated pwa-512x512.png');

  // 3. Apple Touch Icon 180x180
  await sharp(svgPath)
    .resize(180, 180)
    .flatten({ background: '#fdfdfb' })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Generated apple-touch-icon.png');

  // 4. Maskable Icon 512x512 (with padded background)
  const logoResized = await sharp(svgPath)
    .resize(300, 300)
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: '#2d6a4f' // Theme primary color
    }
  })
    .composite([{ input: logoResized, blend: 'over' }])
    .png()
    .toFile(path.join(publicDir, 'maskable-icon.png'));
  console.log('✓ Generated maskable-icon.png');

  console.log('All icons generated successfully!');
}

generate().catch(console.error);
