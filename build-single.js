/* Ndërton versionin NJË-SKEDAR të prezantimit, me Three.js të futur brenda.
   Nis me:  node build-single.js
   Prodhon:
     dist/radx-prezantim-single.html   → hostohu kudo (Vercel, Netlify, GitHub Pages)
     dist/artifact.html                → trupi i faqes, pa <html>/<head>/<body> (për Artifact)   */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC  = path.join(ROOT, 'radx-prezantim.html');
const OUT  = path.join(ROOT, 'dist');

const read = p => fs.readFileSync(p, 'utf8');

/* ---- 1. Three.js: `export { ... }` → `const THREE = { ... }` ---- */
let three = read(path.join(ROOT, 'vendor/three.module.js'));
const exportIdx = three.lastIndexOf('\nexport {');
if (exportIdx === -1) throw new Error('Nuk u gjet blloku `export {` ne three.module.js');
const exportStmt = three.slice(exportIdx);
if (exportStmt.includes(' as ')) throw new Error('Export me alias — namespace-i duhet ndertuar me dore');
three = three.slice(0, exportIdx) + '\n' + exportStmt
  .replace('\nexport {', '\nconst THREE = {')
  .replace(/};\s*$/, '};\n');

/* ---- 2. RoomEnvironment: hiq import-in, emrat vijne nga scope-i i njejte ---- */
let room = read(path.join(ROOT, 'vendor/jsm/environments/RoomEnvironment.js'));
room = room.replace(/import\s*\{[\s\S]*?\}\s*from\s*['"]three['"];?/, '');

/* ---- 3. Kodi i aplikacionit: hiq rreshtat `import` ---- */
const src = read(SRC);
const modMatch = src.match(/<script type="module">([\s\S]*?)<\/script>\s*<\/body>/);
if (!modMatch) throw new Error('Nuk u gjet <script type="module"> ne HTML');
const app = modMatch[1]
  .replace(/^\s*import \* as THREE from 'three';\s*$/m, '')
  .replace(/^\s*import \{ RoomEnvironment \}[^\n]*\n/m, '');

const bundle = [
  '/* ===== Three.js r160 (MIT) — i futur brenda per te punuar pa internet ===== */',
  three,
  '/* ===== RoomEnvironment (MIT) ===== */',
  room,
  '/* ===== Prezantimi RadX ===== */',
  app,
].join('\n');

/* ---- 4. Ndërto skedarin standalone ---- */
const title = (src.match(/<title>([\s\S]*?)<\/title>/) || [,'RadX'])[1];
const style = (src.match(/<style>[\s\S]*?<\/style>/) || [''])[0];
const bodyInner = src
  .slice(src.indexOf('<canvas id="scene">'), src.indexOf('<script type="importmap">'))
  .trim();

fs.mkdirSync(OUT, { recursive: true });

const head = src.slice(src.indexOf('<meta charset'), src.indexOf('<style>')).trim();
fs.writeFileSync(path.join(OUT, 'radx-prezantim-single.html'),
`<!doctype html>
<html lang="sq">
<head>
${head}
${style}
</head>
<body>
${bodyInner}
<script type="module">
${bundle}
</${'script'}>
</body>
</html>
`);

/* ---- 4b. index.html — kopje, që hostimi i dosjes dist/ te punojë ne root ---- */
fs.copyFileSync(path.join(OUT,'radx-prezantim-single.html'), path.join(OUT,'index.html'));

/* ---- 5. Ndërto trupin për Artifact (pa html/head/body) ---- */
fs.writeFileSync(path.join(OUT, 'artifact.html'),
`<title>${title}</title>
${style}
${bodyInner}
<script type="module">
${bundle}
</${'script'}>
`);

const kb = f => (fs.statSync(path.join(OUT,f)).size/1024).toFixed(0)+' KB';
console.log('');
console.log('  dist/index.html                  ' + kb('index.html') + '   (kopje — per hosting)');
console.log('  dist/radx-prezantim-single.html  ' + kb('radx-prezantim-single.html'));
console.log('  dist/artifact.html               ' + kb('artifact.html'));
console.log('');
console.log('  Te dy skedaret punojne vetem — asnje varesi, asnje internet.');
console.log('');
