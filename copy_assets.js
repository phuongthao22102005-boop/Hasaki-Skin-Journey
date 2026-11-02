const fs = require('fs');
const path = require('path');

const src1 = 'C:/Users/My Laptop/.gemini/antigravity/brain/483c9a84-d0b4-40db-b258-c2724737c9cb/.user_uploaded/media_1793368520584_d0c8801a.png';
const src2 = 'C:/Users/My Laptop/.gemini/antigravity/brain/483c9a84-d0b4-40db-b258-c2724737c9cb/.user_uploaded/media_1793368529649_322051f0.png';
const src3 = 'C:/Users/My Laptop/.gemini/antigravity/brain/483c9a84-d0b4-40db-b258-c2724737c9cb/.user_uploaded/media_1793368586291_b01ea265.png';

const targetDir = path.join(__dirname, 'public', 'images');
fs.mkdirSync(targetDir, { recursive: true });

fs.copyFileSync(src1, path.join(targetDir, 'screen1.png'));
fs.copyFileSync(src2, path.join(targetDir, 'screen2.png'));
fs.copyFileSync(src3, path.join(targetDir, 'screen3.png'));

console.log('Copied all 3 reference images to public/images/');
