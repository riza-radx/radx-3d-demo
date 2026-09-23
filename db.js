/* db.js — ruajtja e teksteve te redaktueshme ne nje JSON ne disk.
   Vegel VETEM per pergatitje, e thirrur nga server.js lokal. Ne live (Vercel,
   statik) ky skedar s'ekziston dhe s'thirret — faqja bie te tekstet e paracaktuar.
   Pa varesi te jashtme: vetem 'fs' e 'path' te Node-it. */
const fs   = require('fs');
const path = require('path');

const DIR  = path.join(__dirname, 'content');
const FILE = path.join(DIR, 'tekstet.json');

/* Lexo gjithcka. Nese skedari s'ekziston ende ose eshte i demtuar, kthe objekt
   bosh — mungesa e teksteve te ruajtura s'eshte gabim, thjesht s'ka ende. */
function read() {
  try {
    const raw = JSON.parse(fs.readFileSync(FILE, 'utf8'));
    return (raw && typeof raw === 'object' && !Array.isArray(raw)) ? raw : {};
  } catch {
    return {};
  }
}

/* Shkruaj te gjithe objektin. Shkrim atomik (temp -> rename) qe nje ruajtje e
   nderprere te mos e lere JSON-in gjysmak. E mbajme te lexueshem (2 hapesira)
   sepse kete skedar do ta "pjekim" me dore ne HTML kur permbajtja te jete gati. */
function write(data) {
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Te dhena te pavlefshme: pritej nje objekt.');
  }
  fs.mkdirSync(DIR, { recursive: true });
  const tmp = FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmp, FILE);
  return data;
}

module.exports = { read, write, FILE };
