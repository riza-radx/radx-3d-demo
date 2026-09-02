# RadX — Prezantim 3D

Dy prezantime në të njëjtën dosje. Të dyja punojnë **offline**, pa npm, pa API, pa CDN.

| Skedar | Çfarë është |
|---|---|
| **`radx-prezantim.html`** | **Kryesori** — 21 kapituj (13 rrëfim + 8 RadX), me **telefonin gjithë kohës** në ekran që tregon pamjen e shoferit live |
| `radx-demo.html` | Versioni i para, 7 kapituj, pa telefon. E lënë si është |

---

## Si nis

Kliko dy herë **`nis.cmd`** → hapet `http://127.0.0.1:5180/` (prezantimi kryesor).
Versioni i para: `http://127.0.0.1:5180/radx-demo.html`

Për ta ndalur: `Ctrl+C` në dritaren e zezë.

> Nuk hapet me dopio-klik mbi HTML-in (`file://`) — browser-i bllokon modulet. Duhet `nis.cmd`.

---

## Kontrollet

| Tast | Çfarë bën |
|---|---|
| `→` / `Space` | kapitulli tjetër |
| `←` | mbrapa |
| `1` `2` … `9` `0` `-` `=` `[` | kërce direkt në kapitujt 1…13 (rrëfimi) |
| `]` `\` `;` `'` `,` `.` `/` `` ` `` | kapitujt 14…21 (seksioni RadX) |
| `F` | ekran i plotë |
| `R` | nis nga fillimi |
| `T` | **shtresa teknike** — shfaq nën tekstin e thjeshtë emrat e vërtetë (OCPP, rate chain, fiskalizim). Fshehur si default |

`T` është për publik teknik që pyet "po konkretisht si?". Në prezantim normal lëre fshehur.

---

## 21 kapitujt

Kapitujt kanë `id` në kod (`CHAPTERS[].id`), dhe logjika e skenës lidhet me `id`,
**jo me indeks** — kështu rendi mund të ndryshojë pa thyer kartën, spinën ose panelin.

**Shoferi**
1. `person` Nis nga njeriu, jo nga sistemi — *foto reale nga rrjeti* + telefoni: harta me pika;
   klikimi (vetë pas 2.4 s, ose me klik mbi telefon) hap **faqen e pikës**
2. `site` Një aplikacion, të gjitha pikat — pamja e gjerë me 3 pika e 3 makina
3. `price` Çmimi dihet përpara — *telefoni: fleta e pikës, 35 L/kWh*
4. `connect` **Pjesa e vetme me dorë** — *interaktiv:* lidh kabllon; karikuesi shkruan `LIDHUR · AFRO KARTELËN`
5. `card` Kartela — dhe energjia nis — karta prek lexuesin **një herë**, pastaj unazë jeshile +
   `✓ E PRANUAR` në karikues dhe `Card accepted` në telefon
6. `appstart` **Ose pa kartelë fare** — rruga e dytë: butoni `Start Charging` në aplikacion

**Karikimi**
7. `charging` Numrat rrjedhin te dy anët
8. `full` Bateria u mbush — vendi jo (10 min pa pagesë, pastaj 4 L/min)
9. `paid` Matja e fundit dhe pagesa
10. `invoice` Fatura del vetë

**Operimi**
11. `shared` Kur karikojnë të gjithë njëherësh — 55 + 52 + 43 = 150 kW
12. `problem` Kur diçka shkon keq
13. `panel` Nga lart: paneli i operatorit

**RadX** (14–21) — `rx-intro` · `rx-brand` · `rx-price` · `rx-chargers` ·
`rx-customers` · `rx-money` · `rx-alerts` · `rx-scale`. Telefoni largohet, paneli 3D
bëhet kryesori dhe ndryshon faqe.

### Dy rrugët e nisjes

Kapitujt 4→5 janë rruga kryesore: **kablloja lidhet, karta skanohet, karikimi nis.**
Kapitulli 6 tregon rrugën e dytë për kur kartela është harruar: `Start Charging`
nga aplikacioni. Të dyja mbarojnë në të njëjtën gjendje — statusi `Charging` në telefon.

### Momenti interaktiv (kapitulli 4)

Kliko spinën në karikues dhe tërhiqe te unaza jeshile në makinë. **Nuk bllokohesh:**
pas 8 sekondash pa lëvizje lidhet vetë (5 s në pajisje me prekje), dhe çdo kapitull
pas tij e lidh vetë nëse ka ngelur pa lidhur.

---

## Numrat e tregimit — të gjithë në një bllok

Në `radx-prezantim.html`, kërko `NUMRAT E TREGIMIT`:

```js
const TARIFF     = 35;    // L / kWh
const SITE_LIMIT = 150;   // kW, kufiri i pikës
const BATTERY    = 42;    // kWh, bateria e makinës
const SOC_START  = 22;    // % në nisje
const WALLET     = 2400;  // L në portofol
const IDLE_FEE   = 4;     // L / minutë pas grace-it
const GRACE_MIN  = 10;    // minuta pa pagesë pas 100%
const SPEED      = 90;    // 1 sekondë reale = 90 sekonda sesioni
```

Të gjithë numrat në telefon dhe në ekranin e karikuesit rrjedhin nga këta — ndrysho një, ndryshon gjithçka bashkë.

**Tekstet e kapitujve:** bllok `CHAPTERS` — `title`, `body` (gjuhë e thjeshtë), `tech` (shtresa me `T`), `cam`, `look`.
**Ngjyrat:** `:root{}` në CSS (ndërfaqja) dhe `const P = {}` (3D) — të njëjtat vlera në dy vende.
**Ekranet e telefonit:** `<div class="scr" data-s="...">` në HTML; lidhen me kapitujt nga fusha `screen`.

### Screenshot-i i vërtetë i panelit (kapitulli 13)

Hidh një screenshot 1600×900 te `assets/dashboard.png` — merret automatikisht.
Pa skedar, vizatohet një panel i imituar (pa error).

---

## Para se të prezantosh

- [ ] **Provo në laptopin që do të prezantosh**, të lidhur me projektorin që do të përdorësh.
- [ ] **Regjistro një MP4 të gjithë kalimit** si rezervë (`Win+Alt+R`). Nëse laptopi bën naze, luan videon.
- [ ] Mirror display (jo *extend*), 16:9.
- [ ] Fik njoftimet (Focus assist) dhe fjetjen e ekranit.
- [ ] `F` ekran i plotë, `R` për të nisur pastër para grupit të radhës.
- [ ] Ushtro kapitullin 4 me maus — i vetmi që kërkon dorë.
- [ ] Vendos nëse `T` do të shfaqet apo jo, sipas sallës.

---

## Struktura

```
radx-3d-demo/
├─ nis.cmd                  ← kliko dy herë
├─ server.js                ← server statik, pa varësi
├─ radx-prezantim.html      ← PREZANTIMI KRYESOR (21 kapituj + telefoni)
├─ radx-demo.html           ← versioni i para (7 kapituj)
├─ assets/dashboard.png     ← (opsional) screenshot-i i vërtetë
└─ vendor/                  ← Three.js r160 lokal + RoomEnvironment
```

Skena është vetëm **primitiva** (box, cylinder, plane, tube) — pa modele `.glb`, pa HDRI.
Reflektimet gjenerohen në kohë reale. Nuk ka asete që mund të mungojnë.

Telefoni është **HTML/CSS mbi canvas-in**, jo 3D — kështu teksti është i lexueshëm në projektor
dhe ekranet e app-it ndryshohen si një faqe web normale.

---

## Hosting (Vercel / Netlify)

Live: **https://radx-3d-demo.vercel.app/** · repo: `github.com/riza-radx/radx-3d-demo`

`vercel.json` bën që `/` të shërbejë `radx-prezantim.html` (nuk ka `index.html` në root).

### Kurthi që na kushtoi një deploy

Vercel-i, kur pa **`server.js` në root**, e ndërtoi projektin si **aplikacion Node**
në vend të faqes statike. Rezultati: `/` kthente HTML-in e saktë, por `vendor/three.module.js`
kthente **404**, kështu që faqja mbetej te ekrani "PO NGARKOHET".

Shenja që e identifikon: trupi i 404-s është `404 — /vendor/three.module.js` —
ai tekst është nga `server.js`, jo nga Vercel. Domethënë serveri lokal po ekzekutohej në cloud.

Zgjidhja: **`.vercelignore`** që përjashton `server.js`, `nis.cmd`, `build-single.js` dhe `dist/`.
Ata i duhen vetëm prezantimit lokal. **Mos e hiq `.vercelignore`.**

### Alternativa: një skedar i vetëm

```bash
node build-single.js
```
Prodhon `dist/index.html` — Three.js i futur brenda, pa asnjë varësi. Tërhiqe
dosjen `dist/` te [app.netlify.com/drop](https://app.netlify.com/drop) dhe merr link
menjëherë, ose `cd dist && npx vercel --prod`. `dist/` është në `.gitignore` —
rigjenerohet, nuk ruhet në repo.

---

## Debug

```js
__demo.goTo(__demo.CH.card, true)   // kërce menjëherë në kapitullin e kartës
__demo.S               // kw, kwh, secs, soc, graceLeft, idleFee, connected, phase
__demo.screen          // ekrani aktual i telefonit
__demo.restart()
```
# radx-3d-demo
