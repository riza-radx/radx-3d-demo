# CLAUDE.md

**Lexo [AGENTS.md](AGENTS.md) para se të prekësh kodin.** Aty është gjithë konteksti:
çfarë është projekti, kufizimet që nuk negociohen, rregullat e kodit, kurthet e njohura.

Harta e brendshme e kodit: [docs/ARKITEKTURA.md](docs/ARKITEKTURA.md)
Fjalori i domenit RadX: [docs/GLOSAR.md](docs/GLOSAR.md)
Udhëzimet e prezantuesit: [README.md](README.md)

---

## Të shpejta

```powershell
node server.js    # http://127.0.0.1:5180/  — ose dopio-klik nis.cmd
node build-single.js   # prodhon dist/ (opsionale, vetëm për hosting një-skedar)
```

Nuk ka teste, linter ose CI. **Verifikimi është vizual:** kalo 21 kapitujt, prek kapitullin 4,
provo tri madhësi dritareje, kontrollo që konsola është bosh.

## Pesë gjërat që harrohen më shpesh

1. **Pa npm, pa varësi, pa CDN.** Prezantimi duhet të punojë pa internet.
2. **Një skedar.** Mos e ndaj `radx-prezantim.html` në module — thyen `build-single.js`.
3. **`CHAPTERS[].id`, kurrë indeks.** `chapter === 4` është gabim; `chapter === CH.card` është e saktë.
4. **Numrat vijnë nga blloku `NUMRAT E TREGIMIT`.** Mos fut shifra të forta gjetkë.
5. **Shqip i thjeshtë te `body`, terma teknikë te `tech`.** Publiku në sallë nuk di ç'është OCPP.

## Gjuha

Kodi, komentet, dokumentacioni dhe commit-et janë shqip. Ndiq tonin ekzistues: komentet
shpjegojnë **pse**, jo çfarë. Përgjigju në shqip kur përdoruesi shkruan shqip.
