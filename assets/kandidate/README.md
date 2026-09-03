# Kandidatët për foton e hapit 1

Foto që del te kapitulli **1 · «Nis nga njeriu, jo nga sistemi»**.
Të gjitha janë frame nga videoja e VEGA Charging në rrënjë të projektit
(`SaveClip.App_…mp4`, 720×1280, 33 s).

| Skedari | Sekonda | Çfarë tregon |
|---|---|---|
| `1-personi-te-karikuesi-VEGA.jpg` | 22.0 | **Në përdorim tani.** Personi majtas, karikuesi me logon `VEGA CHARGING`, ekrani ndezur, kablloja djathtas |
| `2-dora-drejt-ekranit.jpg` | 21.6 | I njëjti kuadër, gjysmë sekonde më parë — personi pak më larg ekranit |
| `3-profili-me-kabllon.jpg` | 23.0 | Personi i kthyer, kablloja në plan të parë |
| `4-koka-nga-afer.jpg` | 24.5 | Koka nga afër — kjo ishte e vjetra, karikuesi nuk njihet |
| `5-frame-i-plote-22s-720x1280.jpg` | 22.0 | Frame-i i plotë vertikal, i paprerë — për të prerë vetë një kuadër tjetër |

## Si e ndërroj

**Mënyra e shpejtë** — kopjo atë që do mbi foton aktuale:

```powershell
copy /Y assets\kandidate\3-profili-me-kabllon.jpg assets\hero-person.jpg
```

Pastaj rifresko faqen (`Ctrl+F5`). Asnjë ndryshim në kod.

**Mënyra tjetër** — te `radx-prezantim.html`, kërko `PER TA NDRYSHUAR FOTON`
(rreth rreshtit 505) dhe ndrysho `src`-in e `<img>` menjëherë poshtë tij.

## Nëse pret një foto tënden

- **Raporti 720×466** (horizontale, ~1.55:1). Në desktop foto shfaqet me
  këtë raport të saktë, pa prerje; në mobile prehet pak nga anët.
- **Mos e merr nga poshtë sekondës ~600 e frame-it origjinal** — aty nisin
  titrat e videos (`Me VEGA Charging, rruga drejt Jugut…`) dhe kutia me
  listën e pikave. Të gjitha prerjet e mësipërme janë marrë nga brezi
  `y = 135…601`, pikërisht që të mos hyjë asnjë tekst i VEGA-s në prezantim.
