/* Server statik minimal per demon 3D. Pa varësi, pa internet.
   Nis me:  node server.js     (ose kliko dy here nis.cmd)          */
const http = require('http');
const fs   = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 5180;
const ROOT = __dirname;
const TYPES = {
  '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8',   '.json':'application/json',
  '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg',
  '.webp':'image/webp', '.svg':'image/svg+xml', '.hdr':'application/octet-stream',
  '.glb':'model/gltf-binary', '.mp4':'video/mp4',
};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/') rel = '/radx-prezantim.html';
  const file = path.resolve(path.join(ROOT, rel));
  if (!file.startsWith(path.resolve(ROOT))) { res.writeHead(403); return res.end('403'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('404 — ' + rel); }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(data);
  });
}).listen(PORT, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${PORT}/`;
  console.log('');
  console.log('  RadX — Prezantim 3D');
  console.log('  ' + url);
  console.log('');
  console.log('  Kontrollet:  ← →  hapat  ·  1…= kapitujt  ·  F  ekran i plotë  ·  R  nga fillimi  ·  T  shtresa teknike');
  console.log('  Demoja e para (7 kapituj):  ' + url + 'radx-demo.html');
  console.log('  Per ta ndalur: Ctrl+C');
  console.log('');
  exec(`start "" "${url}"`);   // hap browser-in vetë (Windows)
});
