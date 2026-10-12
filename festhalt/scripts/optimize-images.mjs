// Erzeugt optimierte WebP-Varianten aus assets/source/*.jpg
// Ausgabe: public/images/<name>-<breite>.webp (+ og-image.jpg)
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("assets/source");
const OUT = path.resolve("public/images");
const WIDTHS = [640, 1024, 1536];

await mkdir(OUT, { recursive: true });
for (const file of await readdir(SRC)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const name = file.replace(/\.[^.]+$/, "");
  const img = sharp(path.join(SRC, file));
  const { width } = await img.metadata();
  for (const w of WIDTHS) {
    if (w > width && w !== WIDTHS[0]) continue;
    const target = Math.min(w, width);
    await img.clone().resize({ width: target }).webp({ quality: 78 }).toFile(path.join(OUT, `${name}-${w}.webp`));
  }
  // Social-Preview
  if (name === "seiten-einblick") {
    await img.clone().resize({ width: 1200, height: 630, fit: "cover", position: "top" }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, "og-image.jpg"));
  }
  console.log("✓", name, width);
}
