/* Nxjerr pamjet e futura nga PDF-ja pa asnje mjet te jashtem.
   Faqet e dizajnit jane pamje; JPEG-et brenda PDF-se ruhen si stream me
   /DCTDecode dhe mund te shkeputen fjale per fjale — jane JPEG te plote. */
const fs = require('fs');
const path = require('path');
const SRC = process.argv[3] || require('path').join(__dirname, '..', 'PDF-Presentation.pdf');
const OUT = process.argv[2] || require('path').join(__dirname, '..', 'assets', 'app', 'raw');
fs.mkdirSync(OUT, { recursive: true });

const buf = fs.readFileSync(SRC);
const lat = buf.toString('latin1');

/* numero filtrat, per te dijtur me cfare kemi te bejme */
const count = t => (lat.match(new RegExp(t, 'g')) || []).length;
console.log('DCTDecode (JPEG) : ' + count('/DCTDecode'));
console.log('FlateDecode      : ' + count('/FlateDecode'));
console.log('JPXDecode (JP2)  : ' + count('/JPXDecode'));
console.log('/Image           : ' + count('/Image'));
console.log('');

let n = 0, kept = 0;
let i = 0;
while (true) {
  const d = lat.indexOf('/DCTDecode', i);
  if (d === -1) break;
  i = d + 10;
  // stream-i i pare pas /DCTDecode
  const st = lat.indexOf('stream', d);
  if (st === -1) continue;
  let s = st + 6;
  if (lat[s] === '\r') s++;
  if (lat[s] === '\n') s++;
  const en = lat.indexOf('endstream', s);
  if (en === -1) continue;
  let e = en;
  while (e > s && (lat[e - 1] === '\n' || lat[e - 1] === '\r')) e--;
  n++;
  // JPEG i vlefshem nis me FFD8FF
  if (!(buf[s] === 0xFF && buf[s + 1] === 0xD8 && buf[s + 2] === 0xFF)) continue;
  const size = e - s;
  if (size < 20000) continue;            // ikona te vogla — nuk na duhen
  // permasat nga SOF
  let w = 0, h = 0;
  for (let p = s + 2; p < e - 9; ) {
    if (buf[p] !== 0xFF) { p++; continue; }
    const m = buf[p + 1];
    if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) {
      h = buf.readUInt16BE(p + 5); w = buf.readUInt16BE(p + 7); break;
    }
    if (m === 0xD8 || (m >= 0xD0 && m <= 0xD9)) { p += 2; continue; }
    p += 2 + buf.readUInt16BE(p + 2);
  }
  kept++;
  const name = `img${String(kept).padStart(3, '0')}_${w}x${h}_${Math.round(size / 1024)}kb.jpg`;
  fs.writeFileSync(path.join(OUT, name), buf.subarray(s, e));
}
console.log('stream DCTDecode te gjetur : ' + n);
console.log('JPEG te ruajtur (>20 KB)   : ' + kept);
