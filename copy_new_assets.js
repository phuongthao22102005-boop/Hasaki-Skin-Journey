import fs from 'fs';
import path from 'path';

const imgs = [
  'C:/Users/My Laptop/.gemini/antigravity/brain/483c9a84-d0b4-40db-b258-c2724737c9cb/.user_uploaded/media_1793369707586_5041322c.png',
  'C:/Users/My Laptop/.gemini/antigravity/brain/483c9a84-d0b4-40db-b258-c2724737c9cb/.user_uploaded/media_1793369714610_cab93a80.png',
  'C:/Users/My Laptop/.gemini/antigravity/brain/483c9a84-d0b4-40db-b258-c2724737c9cb/.user_uploaded/media_1793369742049_367f8bb6.png',
  'C:/Users/My Laptop/.gemini/antigravity/brain/483c9a84-d0b4-40db-b258-c2724737c9cb/.user_uploaded/media_1793369747896_827fa9b5.png'
];

const destNames = ['feature_nhaclich_list.png', 'feature_nhaclich_add.png', 'feature_hotro.png', 'feature_langnghe.png'];
const targetDir = 'public/images';

imgs.forEach((src, idx) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(targetDir, destNames[idx]));
    console.log('Copied ' + destNames[idx]);
  }
});
