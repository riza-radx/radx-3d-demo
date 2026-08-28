# RadX — Prezantim 3D

Dy prezantime në të njëjtën dosje. Të dyja punojnë **offline**, pa npm, pa API, pa CDN.

| Skedar | Çfarë është |
|---|---|
| **`radx-prezantim.html`** | **Kryesori** — 12 kapituj, 3 seksione, me **telefonin gjithë kohës** në ekran që tregon pamjen e shoferit live |
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
| `1` `2` … `9` `0` `-` `=` | kërce direkt në kapitullin 1…12 |
| `F` | ekran i plotë |
| `R` | nis nga fillimi |
| `T` | **shtresa teknike** — shfaq nën tekstin e thjeshtë emrat e vërtetë (OCPP, rate chain, fiskalizim). Fshehur si default |

`T` është për publik teknik që pyet "po konkretisht si?". Në prezantim normal lëre fshehur.

---

## 12 kapitujt

**Shoferi**
1. Një aplikacion, të gjitha pikat — *telefoni: harta me pikat pranë*
2. Çmimi dihet përpara — *telefoni: karta e pikës, 35 L/kWh, vendet e lira*
3. Një sekondë kontroll — *telefoni: tre kontrollet jeshile* · karta RFID prek lexuesin në 3D
4. Komanda shkon te karikuesi — *telefoni: "po nis", karikuesi përgjigjet*
5. **Pjesa e vetme me dorë** — *interaktiv:* tërhiq spinën me maus

**Karikimi**
6. Numrat rrjedhin te dy anët — *telefoni: bateria %, kW, kWh, kosto — të njëjtat me ekranin e karikuesit*
7. Bateria u mbush — vendi jo — *telefoni: njoftim + 10 min pa pagesë që numërohen, pastaj 4 L/min*
8. Matja e fundit dhe pagesa — *telefoni: portofoli para/pas; detyrimi kur nuk mbulon*
9. Fatura del vetë — *telefoni: fatura zyrtare, dërguar me email*

**Operimi**
10. Kur karikojnë të gjithë njëherësh — 55 + 52 + 43 = 150 kW, pikërisht kufiri
11. Kur diçka shkon keq — karikuesi i tretë bie, LED i kuq, telefoni jep pikën alternative
12. Nga lart: paneli i operatorit — dashboard-i lundron mbi pikën

### Momenti interaktiv (kapitulli 5)

Kliko spinën në karikues dhe tërhiqe te unaza jeshile në makinë. **Nuk bllokohesh:**
pas 8 sekondash pa lëvizje lidhet vetë; edhe kapërcimi në kapitullin 6 e lidh vetë.

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

### Screenshot-i i vërtetë i panelit (kapitulli 12)

Hidh një screenshot 1600×900 te `assets/dashboard.png` — merret automatikisht.
Pa skedar, vizatohet një panel i imituar (pa error).

---

## Para se të prezantosh

- [ ] **Provo në laptopin që do të prezantosh**, të lidhur me projektorin që do të përdorësh.
- [ ] **Regjistro një MP4 të gjithë kalimit** si rezervë (`Win+Alt+R`). Nëse laptopi bën naze, luan videon.
- [ ] Mirror display (jo *extend*), 16:9.
- [ ] Fik njoftimet (Focus assist) dhe fjetjen e ekranit.
- [ ] `F` ekran i plotë, `R` për të nisur pastër para grupit të radhës.
- [ ] Ushtro kapitullin 5 me maus — i vetmi që kërkon dorë.
- [ ] Vendos nëse `T` do të shfaqet apo jo, sipas sallës.

---

## Struktura

```
radx-3d-demo/
├─ nis.cmd                  ← kliko dy herë
├─ server.js                ← server statik, pa varësi
├─ radx-prezantim.html      ← PREZANTIMI KRYESOR (12 kapituj + telefoni)
├─ radx-demo.html           ← versioni i para (7 kapituj)
├─ assets/dashboard.png     ← (opsional) screenshot-i i vërtetë
└─ vendor/                  ← Three.js r160 lokal + RoomEnvironment
```

Skena është vetëm **primitiva** (box, cylinder, plane, tube) — pa modele `.glb`, pa HDRI.
Reflektimet gjenerohen në kohë reale. Nuk ka asete që mund të mungojnë.

Telefoni është **HTML/CSS mbi canvas-in**, jo 3D — kështu teksti është i lexueshëm në projektor
dhe ekranet e app-it ndryshohen si një faqe web normale.

---

## Debug

```js
__demo.goTo(6, true)   // kërce menjëherë në kapitullin 7
__demo.S               // kw, kwh, secs, soc, graceLeft, idleFee, connected, phase
__demo.screen          // ekrani aktual i telefonit
__demo.restart()
```
# radx-3d-demo
