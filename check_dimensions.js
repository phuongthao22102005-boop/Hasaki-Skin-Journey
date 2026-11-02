import fs from 'fs';

const files = ['screen1.png', 'screen2.png', 'screen3.png'];
for (const f of files) {
  const buf = fs.readFileSync(`public/images/${f}`);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  console.log(`${f}: ${width}x${height}`);
}
