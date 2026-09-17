# Arkitektura — harta e brendshme e `radx-prezantim.html`

Një skedar, ~2 300 rreshta, tre shtresa. Ky dokument tregon ku rri çfarë dhe si komunikojnë
shtresat mes tyre. Numrat e rreshtave vjetrohen — **naviguje me banner-at e komenteve**
(`/* ===== EMRI ===== */`), ata janë ankorat e qëndrueshme.

Rregullat që s'negociohen janë te [../AGENTS.md](../AGENTS.md) §2.

---

## Tre shtresat

```
┌─────────────────────────────────────────────────────────┐
│  DOM / CSS        karta e tekstit · logoja · ndihma      │  lexohet në projektor
│                   TELEFONI (pamje app-i + overlay live)  │
├─────────────────────────────────────────────────────────┤
│  CANVAS 3D        skena: toka, 3 karikues, 3 makina,     │  Three.js r160
│                   kablloja, karta RFID, paneli operator  │  vetëm primitiva
├─────────────────────────────────────────────────────────┤
│  GJENDJA (S)      kw · kwh · secs · soc · graceLeft ·    │  një burim i vetëm
│                   idleFee · connected · phase            │  i së vërtetës
└─────────────────────────────────────────────────────────┘
```

Telefoni **nuk** është 3D. Është një `<div>` me raport të saktë pamjeje (978×2000) i pozicionuar
mbi canvas-in, me pamjet reale të app-it si `<img>` dhe shtresa numrash live sipër tyre.
Arsyeja: teksti mbetet i lexueshëm në projektor dhe ekranet ndërrohen si faqe web normale.

---

## Rrjedha e një kapitulli

```
tasti → / klik          goTo(i)
                           │
                           ├─ progFrom/progTo/progT  →  kamera rrëshqet në camCurve (1.6 s, easeIO)
                           ├─ onChapter(i)           →  faza e skenës, timer-at, paneli, telefoni
                           │      ├─ clearChapTimers()      anulon timer-at e kapitullit të mëparshëm
                           │      ├─ setScreen(name)        ndërron pamjen e telefonit
                           │      ├─ setPanelPage(page)     rivizaton teksturën e panelit 3D
                           │      └─ after(ms, fn)          timer-at e rinj, të anulueshëm
                           ├─ applyWide()            →  telefoni largohet në seksionin RadX
                           └─ renderUI()             →  titulli, trupi, shtresa tech, treguesi
                           
frame()  (requestAnimationFrame, i pandërprerë)
   ├─ përparon S sipas SPEED (1 s reale = 90 s sesioni)
   ├─ animon spinën, unazën, kartën, dritat, rrjetin
   ├─ shkruan numrat te telefoni dhe te ekrani i karikuesit
   └─ renderer.render(scene, camera)
```

**Kapitujt lidhen me `id`, jo me indeks.** `CH` është harta `id → indeks`, ndërtuar nga `CHAPTERS`.
Kështu rendi ndryshohet pa thyer logjikën e kartës, spinës ose panelit.

---

## Seksionet, sipas rendit në skedar

### CSS

| Banner | Përmbajtja |
|---|---|
| `PALETA` | `:root{}` — ngjyrat e ndërfaqes. Pasqyra e `const P` te JS-i |
| `LOGO` | unaza me pika + fjala RADX, si te video-ja e brandit |
| `KARTA E KAPITULLIT` | karta poshtë-majtas: titull, trup, shtresa `tech` |
| `TELEFONI` | kutia 978×2000, pamjet, overlay-t (`charge`, `done`, `start`), ripple-i i hartës |
| `FOTO E HAPIT 1` | fotoja reale e kapitullit 1 — kërko `PER TA NDRYSHUAR FOTON` |
| `NDIHMA E TASTIERES` | shiriti i tasteve, poshtë |
| `LAPTOP / DRITARE E ULET` | zvogëlim teksti sipas lartësisë — shih tabelën më poshtë |
| `MOBILE - te perbashketa` | sjellja bazë në mobile |
| `MOBILE - portret i shtresuar` | skena sipër, teksti shirit që hapet me tap, telefoni poshtë |
| `MOBILE - telefon horizontal` | landscape nën 520 px lartësi |

Zvogëlimi i tekstit në dritare të ulëta (desktop, jo mobile):

| Lartësia e dritares | Titulli | Teksti | Fotoja e hapit 1 |
|---|---|---|---|
| mbi 800 px | 25 px | 14.5 px | gjerësi fikse, 520 px |
| 661–800 px | 23 px | 13.8 px | 39% e lartësisë |
| 521–660 px | 21 px | 13 px | 38% e lartësisë |

Nën 521 px, ose portret në mobile, hyn CSS-i i mobile-it.

### JS

| Banner | Përmbajtja |
|---|---|
| `PALETA 3D` | `const P` — ngjyrat e skenës si hex numerike |
| `NUMRAT E TREGIMIT` | 8 konstantet nga të cilat rrjedh çdo shifër |
| `KAPITUJT` | `CHAPTERS[]` — 21 objekte |
| `RENDERER` | renderer, dritat, `RoomEnvironment`; zbulimi i pajisjes (prekje, ekran i vogël → dpr, hije, kabllo) |
| `NDIHMESA` | funksione ndihmëse gjeometrie/materiali |
| `TOKA` · `KARIKUESI` · `EKRANI I KARIKUESIT` · `MAKINA` | ndërtimi i skenës |
| `KARTA RFID` | karta që afrohet një herë, jo në cikël |
| `KABLLI + SPINA` | tube-i, spina, unaza e makinës |
| `PANELI I OPERATORIT` | plani 3D + teksturë canvas; faqet `intro/brand/price/chargers/customers/money/alerts/scale` |
| `PANELI NE PORTRET` | e njëjta shtresë e rirenditur për portret |
| `SHTEGU I KAMERES` | `CatmullRomCurve3` mbi `cam` e çdo kapitulli; `look` interpolohet veçmas |
| `GJENDJA` | objekti `S` |
| `TELEFONI: NDERRIMI I EKRANEVE` | `SCREEN_MAP`, `setScreen()`, `setArc()`, `applyWide()` |
| `KAPITUJT` (i dyti) | `goTo()`, `onChapter()`, `clearChapTimers()`, `after()` |
| `TERHEQJA E SPINES` | interaktiviteti i kapitullit 4 |
| `KONTROLLET` | tastiera, klikimet, tap-i në telefon |
| `LOOP` | `frame()`, kuadrimi, `setViewOffset` |
| `NISJA` | `measureCard()`, `goTo(0, true)`, `window.__demo` |

---

## `CHAPTERS` — anatomia e një kapitulli

```js
{ id:'card', sec:'Shoferi', screen:'auth',
  title:'Kartela — dhe energjia nis',
  body:'…gjuhë e thjeshtë, për publikun në sallë…',
  tech:'Authorize → Accepted / Expired / Blocked / Invalid; split_wallet, pay-as-you-go…',
  cam:[-1.9, 3.1, 4.8], look:[0.2, 1.0, -0.9] }
```

| Fusha | Roli |
|---|---|
| `id` | çelësi i qëndrueshëm. Gjithë logjika e skenës lidhet me këtë |
| `sec` | `Shoferi` · `Karikimi` · `Operimi` · `RadX`. `sec === 'RadX'` largon telefonin |
| `screen` | çelës te `SCREEN_MAP` — cila pamje app-i shfaqet |
| `panel` | faqja e panelit 3D (vetëm seksioni RadX dhe kapitulli 13) |
| `hero` | `true` vetëm te kapitulli 1 — shfaq foton reale |
| `title` / `body` | teksti i sallës. **Shqip i thjeshtë, pa terma teknikë** |
| `tech` | shtresa që shfaqet me tastin `T`. Këtu shkojnë OCPP, tabelat, shërbimet |
| `cam` / `look` | pozicioni i kamerës dhe pika ku shikon |

---

## Telefoni — `SCREEN_MAP`

Fusha `screen` e kapitullit përkthehet në një pamje app-i plus një shtresë live:

```js
charging: { img:'charging', ov:'charge', live:'charging', btn:true },
```

| Çelësi | Kuptimi |
|---|---|
| `img` | cila `<img>` te `assets/app/` shfaqet |
| `ov` | cili overlay ndizet: `charge` (unaza + numrat), `done` (fatura), `start` (butoni) |
| `big` / `sub` | tekste statike, shkruhen një herë te `setScreen()` |
| `live` | `charging` ose `full` — numrat rrjedhin nga `frame()`, jo nga `setScreen()` |
| `btn` | shfaq butonin `Stop Charging` |

Disa kapituj ndajnë të njëjtën pamje sepse në app-in real ekrani i karikimit **është** i njëjti —
ndryshon vetëm gjendja, dhe gjendjen e thotë shtresa.

**Ekranet burim:** `assets/app/` — 13 JPEG të nxjerra nga PDF-ja e dizajnit me
`tools/nxirr-pamjet-pdf.js`. Tabela e plotë me çfarë përmban secili është te `assets/app/README.md`.
Numrat brenda tyre janë dummy dhe nuk pajtohen me numrat e prezantimit — vendim i marrë, jo gabim.

---

## Gjendja `S`

```js
const S = {
  phase:'idle', connected:false,
  kw:0, kwh:0, secs:0, soc:SOC_START,
  graceLeft:GRACE_MIN*60, idleFee:0,
  dragging:false, idle:0, autoDone:false,
  ledColor, ledTarget, ring:0, pulse:0, side:0, panel:0, cardOp:0, fault:0,
  cardT:0, cardOk:false,   // timeline-i i kartës: një goditje, jo cikël
  camDirty:false,          // hapësira ndryshoi → setViewOffset duhet rillogaritur
};
```

`frame()` është i vetmi që e përparon `S` në kohë; `onChapter()` e vendos në gjendjen e duhur
kur kërcehet direkt te një kapitull. Prandaj `__demo.goTo(__demo.CH.paid, true)` jep numra të saktë
edhe pa kaluar nga kapitujt para tij.

---

## Dy rrugët e nisjes

```
kapitulli 4  connect  ──►  kapitulli 5  card      ──┐
  lidh kabllon              afro kartelën          ├──►  statusi "Charging"
                                                   │
kapitulli 6  appstart ─────────────────────────────┘
  butoni "Start Charging" në app — për kur kartela është harruar
```

Të dyja mbarojnë në të njëjtën gjendje. Kapitulli 4 është **i vetmi** që kërkon dorë njeriu, dhe
ka rrugëdalje: pas 8 s pa lëvizje lidhet vetë (5 s në pajisje me prekje), dhe çdo kapitull pasues
e siguron lidhjen nëse ka ngelur pa lidhur. **Prezantuesi nuk bllokohet kurrë.**

---

## Ndërtimi një-skedar

```bash
node build-single.js
```

| Prodhon | Për çfarë |
|---|---|
| `dist/radx-prezantim-single.html` | gjithçka brenda: Three.js, RoomEnvironment, pamjet si `data:` URI |
| `dist/index.html` | kopje e së mësipërmes, që hostimi i `dist/` të punojë te root |
| `dist/artifact.html` | trupi pa `<html>/<head>/<body>` |

Hapat: Three.js `export { … }` → `const THREE = { … }`; RoomEnvironment pa `import`; kodi i app-it
pa rreshtat `import` dhe **i mbështjellë në një bllok `{ }`** kundër përplasjes së emrave
(`TOUCH`, `Cache`, `Path`, `Box`, `Sphere`, `Color`). Skripti pret `<script type="module">` dhe
`import * as THREE from 'three';` fjalë për fjalë — ndrysho strukturën dhe thyhet.
