# AGENTS.md — konteksti për agjentët AI

Ky skedar lexohet nga agjentët AI (Claude Code, Cursor, Copilot, Codex) para se të prekin kodin.
Për udhëzimet e prezantuesit — si niset, cilat taste, çfarë të kontrollosh para sallës — shih [README.md](README.md).

---

## 1. Çfarë është ky projekt

Një **prezantim 3D interaktiv** që tregon si funksionon rrjeti i karikimit elektrik **RadX**.
Nuk është produkti RadX. Është *rrëfimi* i produktit: 23 kapituj që dikush i kalon me shigjeta
para një publiku, në një laptop të lidhur me projektor.

Publiku ndahet në dy pjesë, dhe kjo ndarje përcakton gjithçka:

| Kapitujt | Seksioni | Publiku pyet | Çfarë sheh |
|---|---|---|---|
| 1–13 | `Shoferi` / `Karikimi` / `Operimi` | "Si karikohet një makinë?" | Skena 3D + **telefoni** me pamjet reale të app-it |
| 14–23 | `RadX` | "Çfarë marr unë si kompani?" | Telefoni largohet, **paneli 3D** bëhet kryesori dhe ndryshon faqe |

Kapitujt **15–18** janë blloku i white label-it: çfarë është, si e ofrojmë, grupet e përdoruesve
dhe zinxhiri i partnerëve. Ky është argumenti kryesor tregtar — mos e hollo dhe mos e ndaj.

**Gjuha e prezantimit është shqip dhe e thjeshtë.** Termat teknikë (OCPP, rate chain, fiskalizim)
rrinë të fshehur pas tastit `T`, te fusha `tech` e çdo kapitulli. Kjo është vendim dizajni, jo harresë —
mos i ngjit termat teknikë te `body`.

**Live:** https://radx-3d-demo.vercel.app/ · **Repo:** `github.com/riza-radx/radx-3d-demo`

---

## 2. Kufizimet që nuk negociohen

Këto nuk janë preferenca. Janë arsyeja pse projekti punon në një sallë pa internet.

- **Pa npm, pa `package.json`, pa build step.** Three.js r160 rri lokalisht te `vendor/`.
- **Pa varësi të jashtme:** pa CDN, pa API, pa Google Fonts, pa analytics. Nëse wi-fi i sallës bie, prezantimi vazhdon.
- **Pa modele `.glb`, pa HDRI.** Skena është vetëm primitiva (`box`, `cylinder`, `plane`, `tube`);
  reflektimet gjenerohen në kohë reale me `RoomEnvironment`. Asnjë aset që mund të mungojë.
- **Gjithçka në një skedar.** `radx-prezantim.html` (~2 300 rreshta) mban HTML, CSS dhe JS bashkë.
  **Mos e ndaj në module** — ndarja thyen `build-single.js` dhe hostimin pa build.
- **Telefoni është HTML/CSS mbi canvas, jo 3D.** Kështu teksti lexohet në projektor
  dhe ekranet ndryshohen si faqe web normale.

Para se të propozosh një bibliotekë, një bundler ose një framework: përgjigjja është jo, dhe arsyeja
është rreshti i parë i kësaj liste.

---

## 3. Skedarët — cili për çfarë

```
radx-3d-demo/
├─ radx-prezantim.html   ← PREZANTIMI KRYESOR. 99% e punës ndodh këtu
├─ radx-demo.html        ← versioni i parë, 7 kapituj, pa telefon. I NGRIRË — mos e prek
├─ server.js             ← server statik pa varësi, port 5180. Vetëm lokal
├─ nis.cmd               ← dopio-klik → node server.js → hap browser-in
├─ build-single.js       ← prodhon dist/ me Three.js dhe pamjet futur brenda
├─ vercel.json           ← rewrite: "/" → "/radx-prezantim.html"
├─ .vercelignore         ← KRITIK, shih §7
├─ vendor/               ← Three.js r160 + RoomEnvironment (MIT)
├─ tools/
│  └─ nxirr-pamjet-pdf.js  ← nxjerr JPEG-et nga PDF-ja e dizajnit
├─ assets/
│  ├─ app/               ← 13 ekranet reale të app-it + README me tabelën e tyre
│  ├─ kandidate/         ← prerje video për foton e kapitullit 1
│  ├─ hero-person.jpg    ← fotoja e kapitullit 1 (720×466)
│  └─ dashboard.png      ← opsional: screenshot i vërtetë i panelit
└─ docs/
   ├─ ARKITEKTURA.md     ← harta e brendshme e radx-prezantim.html
   └─ GLOSAR.md          ← fjalori i domenit RadX (OCPP, rate chain, fiskalizim…)
```

`dist/`, `PDF-Presentation.pdf` dhe `*.mp4` janë te `.gitignore` — rigjenerohen ose janë burime dizajni.

---

## 4. Si niset dhe si provohet

```powershell
node server.js          # ose dopio-klik nis.cmd
# → http://127.0.0.1:5180/
```

**Nuk hapet me dopio-klik mbi HTML-in.** `file://` bllokon modulet ES — duhet serveri.

Nuk ka teste, nuk ka linter, nuk ka CI. **Verifikimi është vizual dhe manual.** Pas çdo ndryshimi:

1. Kalo kapitujt me `→` nga 1 deri në 21 — asnjë kërcim kamere, asnjë tekst i prerë.
2. Prek kapitullin 4 me maus (tërhiq spinën) — pjesa e vetme interaktive.
3. Ngushto dritaren: landscape i ulët (~600 px lartësi), portret mobile, mobile horizontal.
4. Konsola bosh. `__demo.S` kthen gjendje të arsyeshme.

Për debug në konsolë:

```js
__demo.goTo(__demo.CH.card, true)   // kërce te kapitulli i kartës
__demo.S                            // kw, kwh, secs, soc, graceLeft, idleFee, connected, phase
__demo.screen                       // ekrani aktual i telefonit
__demo.restart()
```

---

## 5. Rregullat e kodit

**Komentet janë në shqip dhe shpjegojnë *pse*, jo *çfarë*.** I gjithë skedari ndjek këtë ton —
`/* Timer-at e kapitullit. Anulohen sa here ndryshon kapitulli — pa kete, nje kapitull i lene
pas do t'i ndryshonte ekranin prezantuesit ne mes te fjalise. */`. Shkruaj kështu, jo `// vendos timer`.
Komentet ekzistuese janë pa shkronja me theks (ë, ç) për siguri kodimi; tekstet e dukshme për
publikun i kanë normalisht.

**Kapitujt lidhen me `id`, kurrë me indeks.** `CHAPTERS[].id` (`person`, `connect`, `card`, `rx-price`…)
është çelësi; `CH` është harta `id → indeks`. Kështu rendi i kapitujve ndryshon pa thyer kartën,
spinën ose panelin. Nëse shkruan `chapter === 4`, po e bën gabim.

**Numrat e tregimit rrjedhin nga një bllok i vetëm.** Kërko `NUMRAT E TREGIMIT`:
`TARIFF`, `SITE_LIMIT`, `BATTERY`, `SOC_START`, `WALLET`, `IDLE_FEE`, `GRACE_MIN`, `SPEED`.
Çdo shifër në telefon dhe në ekranin e karikuesit del nga këta. **Mos fut numra të fortë gjetkë.**

**Ngjyrat rrojnë në dy vende, me të njëjtat vlera:** `:root{}` në CSS (ndërfaqja) dhe `const P = {}`
(3D, si hex numerike). Ndrysho të dyja bashku.

**Prezantuesi nuk bllokohet kurrë.** Çdo interaktivitet ka rrugëdalje automatike: kapitulli 4 lidhet
vetë pas 8 s pa lëvizje (5 s në prekje), dhe çdo kapitull pasues e siguron lidhjen nëse ka ngelur pa
lidhur. Nëse shton diçka që kërkon veprim njeriu, shto edhe timer-in që e kryen vetë.

**Timer-at e kapitullit kalojnë nga `after(ms, fn)`**, jo nga `setTimeout` direkt — `clearChapTimers()`
i pastron në çdo ndryshim kapitulli.

**Pamjet e app-it janë burimi i vërtetë.** `assets/app/` përmban 13 ekranet reale nga PDF-ja e dizajnit.
Mos shpik ekrane të reja për telefonin — bazohu mbi ata. Numrat brenda tyre janë dummy dhe **nuk**
pajtohen me numrat e prezantimit; kjo është e vendosur, mos u mundo t'i sinkronizosh.

---

## 6. Ku ndodhen gjërat — ankorat e kërkimit

Skedari është i gjatë; naviguje me këto banner-a komentesh, jo me numra rreshtash:

| Kërko | Çfarë gjen |
|---|---|
| `PALETA` | ngjyrat e ndërfaqes (CSS `:root`) |
| `PALETA 3D` | `const P` — ngjyrat e skenës |
| `NUMRAT E TREGIMIT` | të tetë konstantet e tregimit |
| `KAPITUJT` | `CHAPTERS` — title, body, tech, cam, look, screen, panel |
| `PER TA NDRYSHUAR FOTON` | fotoja e kapitullit 1 |
| `LAPTOP / DRITARE E ULET` | zvogëlimi i tekstit sipas lartësisë së dritares |
| `MOBILE -` | tre blloqe: të përbashkëta, portret i shtresuar, telefon horizontal |
| `TELEFONI: NDERRIMI I EKRANEVE` | `SCREEN_MAP` + `setScreen()` |
| `PANELI I OPERATORIT` | paneli 3D dhe faqet e tij |
| `TERHEQJA E SPINES` | interaktiviteti i kapitullit 4 |
| `GJENDJA` | objekti `S` |
| `KONTROLLET` | tastiera dhe klikimet |

Harta e plotë: [docs/ARKITEKTURA.md](docs/ARKITEKTURA.md). Fjalori i domenit: [docs/GLOSAR.md](docs/GLOSAR.md).

---

## 7. Kurthet e njohura

**`.vercelignore` mos e hiq.** Vercel-i, kur pa `server.js` në root, e ndërtoi projektin si aplikacion
Node në vend të faqes statike: `/` kthente HTML-in e saktë, por `vendor/three.module.js` kthente 404
dhe faqja mbetej te "PO NGARKOHET". Shenja: trupi i 404-s është `404 — /vendor/three.module.js` —
ai tekst vjen nga `server.js`, domethënë serveri lokal po ekzekutohej në cloud.

**`build-single.js` e fut kodin e app-it brenda një blloku `{ }`** sepse në ndërtimin një-skedar
Three.js dhe app-i ndajnë të njëjtin scope, dhe identifikuesit përplasen (`Identifier 'TOUCH' has
already been declared`). Nëse ndryshon strukturën e `<script type="module">`, prit që ky skript të thyhet —
ai pret `import * as THREE from 'three';` dhe `<script type="module">…</script></body>` fjalë për fjalë.

**Kalimi portret ↔ landscape rivizaton panelin 3D.** Paneli është teksturë canvas; ndryshimi i
orientimit ndërton plan të ri, kornizë të re dhe rivizaton faqen aktuale. Nëse prek `panelFrame`
ose `setPanelPage`, provo të dyja orientimet.

**`S.camDirty`** duhet vendosur `true` sa herë hapësira e dukshme ndryshon (telefoni largohet,
karta e tekstit ndryshon lartësi) — përndryshe `setViewOffset` mbetet i vjetruar dhe kuadrimi shket.

---

## 8. Git

Degë feature nga `main`, PR në `main`. Commit-e me prefiks konvencional dhe përshkrim shqip:

```
feat: nis rrefimin me njeriun, dhe karta pas kabllos
vercel: root serves the presentation
```

Mos komito `dist/`, PDF-në e dizajnit ose MP4-t — janë te `.gitignore` me qëllim.
