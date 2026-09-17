# Glosar — domeni RadX

Termat që dalin te fusha `tech` e kapitujve (shtresa pas tastit `T`) dhe te komentet e kodit.
Ky është fjalor **konteksti**, jo dokumentacion i produktit RadX — përshkruan atë që prezantimi
tregon, aq sa duhet për ta shkruar tekstin saktë.

**Rregulli i artë:** te `body` shkruhet shqip i thjeshtë, si për dikë që nuk ka dëgjuar kurrë
fjalën "OCPP". Te `tech` shkruhen emrat e vërtetë. Mos i përziej.

---

## Produkti

| Termi | Çfarë është |
|---|---|
| **RadX** | platforma që mban në punë rrjete karikuesish elektrikë: çmimi, kontrolli, matja, portofoli, fatura, raporti |
| **Radx-API** | backend-i — Node / Sequelize / MySQL |
| **RadX-OCPP** | Central System-i që flet me karikuesit |
| **Dashboard** | paneli i operatorit, Angular. Ajo që tregon paneli 3D te kapitujt 13–21 |
| **White label** | klienti sheh logon, ngjyrat dhe emrin e kompanisë; motori poshtë është RadX. Një kod, konfigurim për brand: `company_id`, paleta SCSS, favicon, `environment.prod` |
| **Multi-company / tenant** | shumë kompani mbi një instancë të vetme, me izolim default-deny sipas rolit |
| **Zinxhir partnerësh** | një partner del me markën e vet dhe mund të hapë partnerë nën vete, pa thellësi të caktuar. Çdo nivel kontrollon çmimet, portofolin, anëtarët dhe raportet e veta (kapitulli 18) |
| **Rrjeti i fotos** | fotoja e kapitullit 1 vjen nga një rrjet real në punë. Emri i markës nuk përmendet në prezantim — vetëm RadX |

---

## Protokolli me karikuesit

**OCPP** — Open Charge Point Protocol, gjuha me të cilën karikuesi dhe sistemi qendror flasin.
Versioni 1.6J (+2.0.1). **Prodhuesi i karikuesit nuk ndikon në faturim** — matja vjen nga `MeterValues`.

| Mesazhi | Kur ndodh në prezantim |
|---|---|
| `StatusNotification` | kapitulli 4: `Available → Preparing` sapo hyn spina |
| `Authorize` | kapitulli 5: kartela lexohet → `Accepted` / `Expired` / `Blocked` / `Invalid` |
| `StartTransaction` | këtu hapet sesioni — jo më parë. Pa autorizim nuk ka sesion |
| `RemoteStartTransaction` | kapitulli 6: butoni në app → ACK i charger-it → sesioni hapet |
| `MeterValues` | kapitulli 7: current, voltage, power, energy, SOC → sesioni dhe kostoja përditësohen |
| `StopTransaction` | kapitulli 9: `kWh = (meterStop − meter_start) / 1000` |
| `SetChargingProfile` | kapitulli 11: load management, kufiri i lidhjes së pikës |
| `Reset` · `ChangeAvailability` · `UnlockConnector` · `GetDiagnostics` · `RemoteStop` | kapitulli 13: komandat nga distanca, sipas scope-it të rolit |

---

## Çmimi — zinxhiri i tarifës

Çmimi nuk është një numër i vetëm. Zgjidhet me radhë:

```
user  →  charger  →  company default
```

Tarifa e përdoruesit fiton mbi atë të charger-it, e cila fiton mbi default-in e kompanisë.
Charger-i ka një **toggle përmbysjeje** që e kthen këtë radhë. Tabelat: `rates`, `rate_per_days`
(çmim për orë të ditës), `user_group`.

Rregullat i shkruan vetë kompania nga dashboard-i dhe hyjnë në fuqi menjëherë — pa kërkuar
ndryshim në program. Ky është argumenti i kapitullit 16 (`rx-price`).

---

## Paratë

| Termi | Çfarë është |
|---|---|
| **Portofol (wallet)** | balanca e përdoruesit. `balance − cost`; teprica shkon te `debit_balance` |
| **`split_wallet`** | portofol i ndarë — grupi/partneri paguan për anëtarët, admini i grupit transferon |
| **Pay-as-you-go** | pagesë pa marrëveshje paraprake |
| **`recharge → transaction → charging`** | rruga e parasë: rimbushje → transaksion → karikim |
| **Grace period** | 10 minuta pa pagesë pas 100%. Pastaj `charger.fullchargefeeperminute` — te prezantimi 4 L/min. Faturë e ndarë nga energjia |
| **Fiskalizim** | fatura ligjore shqiptare përmes BC (**IIC** / **NIVF**), ose PDF i RadX sipas `check_fisk`. Me retry |
| **Abandoned-invoice check** | `abandonedInvoiceCheckService` — kap faturat e harruara |
| **L / ALL** | Lek. Tarifa e prezantimit: 35 L/kWh |

---

## Njerëzit dhe kompanitë

`users` · `user_group` · `partner` / `partner_member`. Një kompani sheh të sajët; çfarë sheh
dikush përcaktohet nga roli, jo nga lista.

**`visibility ≠ company scope`** — dallim që del dy herë (kapitujt 1 dhe 2): charger-at publikë
duken nga të gjithë në hartë, por kjo nuk do të thotë që i administron kushdo. Shikimi dhe
zotërimi janë dy gjëra.

---

## Kur diçka shkon keq

| Termi | Çfarë është |
|---|---|
| **Timeout / offline / 0 kWh** | tri mënyrat e zakonshme që një sesion dështon (kapitulli 12) |
| **Lock atomik** | kundër `StopTransaction` të dyfishtë — sesioni nuk mbyllet dy herë |
| **`audit_log`** | kush bëri çfarë, kur |
| **`alarm`** | njoftimet e panelit |
| **`cronReportService` / `reportEmailService`** | raportet periodike që dalin vetë |

---

## Karikimi — njësitë

| Njësia | Kuptimi | Te prezantimi |
|---|---|---|
| **kW** | fuqia në atë moment | `SITE_LIMIT = 150` kW, kufiri i pikës |
| **kWh** | energjia e dhënë gjithsej | `BATTERY = 42` kWh |
| **SOC** | State of Charge — sa e mbushur është bateria, në % | `SOC_START = 22` % |
| **Konektor** | priza fizike: GBT, Type 2 (AC), CCS1, CCS2, Type 1, Tesla, Chademo | app-i i filtron të gjitha |
| **AC / DC** | karikim i ngadaltë / i shpejtë | app-i i ndan si `Slow` / `Fast` |

Kapitulli 11 tregon ndarjen e fuqisë: 55 + 52 + 43 = 150 kW. Tre makina, një kufi pike —
kjo është ajo që bën `SetChargingProfile`.
