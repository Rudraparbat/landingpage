import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Convert images in public/ to .webp and .avif
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const exts = new Set(['.jpg', '.jpeg', '.png']);

async function convertOne(file) {
  const ext = path.extname(file).toLowerCase();
  if (!exts.has(ext)) return;
  const base = file.slice(0, -ext.length);
  const inputPath = path.join(PUBLIC_DIR, file);
  const webpPath = path.join(PUBLIC_DIR, `${base}.webp`);
  const avifPath = path.join(PUBLIC_DIR, `${base}.avif`);

  // skip if already exists newer
  const existsWebp = fs.existsSync(webpPath);
  const existsAvif = fs.existsSync(avifPath);

  const input = sharp(inputPath);
  const metadata = await input.metadata();
  const quality = 70; // reasonable balance

  if (!existsWebp) {
    await input.clone().webp({ quality }).toFile(webpPath);
    console.log('Created', webpPath);
  }
  if (!existsAvif) {
    await input.clone().avif({ quality }).toFile(avifPath);
    console.log('Created', avifPath);
  }
}

async function run() {
  const entries = fs.readdirSync(PUBLIC_DIR);
  const files = entries.filter((f) => exts.has(path.extname(f).toLowerCase()));
  for (const f of files) {
    try {
      await convertOne(f);
    } catch (e) {
      console.error('Failed converting', f, e.message);
    }
  }
}

run();