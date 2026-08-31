# Ekranet reale të app-it RadX

Nxjerrë nga `PDF-Presentation.pdf` (stream-et JPEG brenda skedarit) me
`../../tools/nxirr-pamjet-pdf.js`. **Burimi i vërtetë për ndërtimin e telefonit
te prezantimi 3D** — mos shpik ekrane të reja, bazohu mbi këta.

Numrat në ekrane janë **dummy** (vendim i Rizës, 31/08). Mos u mundo t'i pajtosh
me numrat e prezantimit; janë pamje dizajni, nuk janë të dhëna.

| Skedari | Ekrani | Detajet që vlejnë |
|---|---|---|
| `01-harta.jpg` | Harta, tab 1 | Pin = rreth me **rrufe (i lirë)** ose **dry (i zënë)**, unazë-matës teal+amber. Shirit "Search locations", chip-e `Available chargers` `Fast` `XEV Charge`. Buton i gjelbër navigimi, zemra + lokalizimi djathtas |
| `02-detaji-pikes.jpg` | Detaji i pikës | Foto hero + shkarko/ndaj/zemër. Tab-e **Connectors · Overview · Photo · Reviews 4.5★**. Konektorët: badge `Free` (teal) / `In use` (rozë), `GBT charger · 120 ALL·kW`, buton `Avaliable` / `Se Availability` |
| `03-fleta-pikes.jpg` | Fletë e shpejtë mbi hartë | `NEW STATION EV CHARGER TIRANA`, `450 m / 5 min`, `24 Hrs`, `4.5★`, `Fast · GBT (DC) · 6 Slots`, butonat **Book Now** (navy) · **Directions** (teal) · **Call** (outline) |
| `04-lista-pikave.jpg` | Lista e pikave | Karusel `Nearest Stations` me foto reale, `New Chargers near me` me badge të gjelbër `New`, `Top rated`. Kartat: `400 m · 10-15 min`, `100kW`, `Level 3`, `Type 1 JI4752 · 6 Slots` |
| `05-filtrat.jpg` | Filtrat | `CONNECTOR TYPE`: GBT · Type 2 (AC) · CCS1 · CCS2 · Type 1 (AC) · Tesla · Chademo. `STATION STATUS` toggle. `DISTANCE` 1-5 / 5-15 / 15-30 km. `TYPE` Slow / Fast |
| `06-rruga.jpg` | Navigimi | Vijë rruge teal, badge `05 min`, fletë: `Your destination 450 m / 5 min`, nga pika te lokacioni, buton `Start` |
| `07-karikimi.jpg` | **Karikimi në vazhdim** | Overlay i zi si Dynamic Island: `⚡ Charging ID4 Pro … Connected`, **`50% - 150 Km`**, `01:29:58 to finish`, unazë baterie, buton navy **`Stop Charging ⚡`**. Poshtë: harta me pine që tregojnë **numrin e konektorëve të lirë** (3, 2, 1) |
| `08-karikimi-mbaroi.jpg` | Karikimi mbaroi | Rreth i bardhë mbi teal: **`Success / Charging complete`**. Kartë: `Energy deliverd 120 kW` · `Total Payed 54.5 ALL`, `I have a voucher code`, buton `Home` |
| `09-portofoli.jpg` | Portofoli | Kartë navy `RADX Wallet` me emër + `Balance 1544.00 ALL`. `Transactions`: **`Reservation 100 ALL`**, `Charging Payment 500.00 ALL`, `Charging Payment 1500.00 ALL`. Buton `Add Funds` |
| `10-rimbushje.jpg` | Rimbushje | Header teal me ilustrim makine+karikues. `Type in the amount` + zgjedhës `ALL`, chip-e `500 / 1000 / 2000 / 5000 ALL`, `Pay with Card — MasterCard ending …4577`, `Add new card` |
| `11-makina-ime.jpg` | Makina ime, tab 2 | Header teal, pill `Forum`, zile me pikë. `Vehicle / Volkswagen ID.4 Pro` + foto. Karta: `Connector Type — Type 2 charger`, `Calculate your charging Payment --%`, `Charging History — Last Charge`, `Favorite Stations`, `My RFID CARDs — 1544.00 ALL` |
| `12-profili-light.jpg` | Profili, tab 4 | `Hi Elon!`, `2 Electric Vehicle`, `Switch`. `RADX Wallet` me **ikonën unazë-me-pika**. `My Vehicles`. `Quick links`: Account · Payment Methods · Notifications · Charge History · Appearance **Light** · Language |
| `13-profili-dark.jpg` | Profili, **dark mode** | I njëjti ekran në temë të errët. Dëshmi që app-i ka **dy tema**, të zgjedhshme te `Appearance` |
| `90-maket-3d.jpg` | Maket perspektivë | Render marketingu i `03`. I mirë për një pamje hero, jo për ndërtim ekrani |
| `91`…`94-e-paidentifikuar-*.jpg` | Të pashqyrtuara | U nxorën, nuk u hapën. Shikoji para se t'i përdorësh |

## Shiriti i tab-eve

Pill i bardhë, 4 tab-e, aktivi është **rreth navy i plotë**:
**Hartë · Makina · QR · Profili** — përputhet me user flow-un e PDF-së.
Te varianti dark, i pari është ikonë *home* dhe aktivi është rreth teal —
dy iterime dizajni (`Prototype 1` / `Prototype 2` te PDF-ja).

## Ngjyrat, si lexohen nga ekranet

| Roli | Vlera |
|---|---|
| Header-a, ikona, aksent | teal `#00A3B9` |
| Butoni kryesor, pin-i, titujt | navy `#08435D` |
| Navigimi, badge `New` | jeshile `#06C802` |
| Badge `In use` | rozë-e-kuqe `#FF7979` |
| Sfondi | i bardhë / gati i bardhë; karta të bardha me hije të lehtë |

⚠️ Kujdes: **prezantimi 3D e ka telefonin navy të errët**, ndërsa tema e parazgjedhur
e app-it është e hapur. Shih [tasks/todo-3d-demo-brand.md](../../../tasks/todo-3d-demo-brand.md).
