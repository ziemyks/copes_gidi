# Copes Gidi

Makšķerēšanas gidu katalogs Latvijai — Next.js 16 (App Router, Cache Components) + Tailwind CSS 4.

## Lapas

| Ceļš | Saturs |
| --- | --- |
| `/` | Sākumlapa: meklēšana, braucieni, reģioni, gidi, zivis, sezonu kalendārs, BUJ |
| `/braucieni` | Visi braucieni ar filtriem (`?regions=`, `?suga=`, `?veids=`, `?kartot=cena`) |
| `/braucieni/[slug]` | Brauciena lapa ar publicētām cenām un gida tiešajiem kontaktiem |
| `/gidi` | Gidu katalogs ar filtriem (`?regions=`, `?suga=`, `?valoda=`) |
| `/gidi/[slug]` | Gida profils ar avotiem, piedāvājumiem un tiešajiem kontaktiem |
| `/regioni/[slug]` | Kurzeme, Vidzeme, Latgale, Zemgale, Rīga |
| `/klusti-par-gidu` | Pieteikuma forma jauniem gidiem |
| `/zivis/[slug]` | Līdaku, zandartu un samu copes izlases ar plānošanas padomiem |
| `/cope/ziemas-cope` | Ziemas braucieni ar gidu |
| `/par-mums` | Kataloga avoti, atlase, secība un labojumi |
| `/privatums` | Privātuma politika (sākuma teksts) |

## Saturs

Viss saturs ir TypeScript failos — datubāze nav vajadzīga:

- `src/data/guides.ts` — gidi
- `src/data/trips.ts` — braucieni (`guide` lauks norāda uz gida `slug`)
- `src/data/regions.ts`, `src/data/species.ts` — reģioni un zivju sugas ar sezonām
- `src/lib/site.ts` — nosaukums, e-pasts un kanoniskā produkcijas adrese
- `src/data/discovery.ts`, `src/data/search-copy.ts` — meklēšanas lapu saturs un īsie profilu metadati

Gidi un piedāvājumi apkopoti no publiskiem avotiem. Katrā profilā norādīti avoti un pārbaudes datums. Gidi nav kataloga partneri; pieejamību, gala cenu un noteikumus apstiprina pats gids.

### Fotogrāfijas

Kamēr nav atļautu fotogrāfiju, tiek rādītas dekoratīvas ainavas un gidu logotipi. Foto pievieno tikai ar lietošanas atļauju, izmantojot `Photo` komponenta `src` un atbilstošu alternatīvo tekstu. Datu tipiem un izsaukumiem jāpievieno attiecīgais foto lauks; tas pašlaik nav definēts.

## Izstrāde

```bash
npm install
npm run dev
```

## Publicēšana Vercel

1. Iesūti repozitoriju GitHub un Vercel izvēlies **Add New → Project → Import**.
2. Iestatījumi tiek atpazīti automātiski (Next.js).
3. Sadaļā **Environment Variables** pievieno mainīgos no `.env.example`:
   - `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL` — lai pieprasījumi nonāktu e-pastā ([resend.com](https://resend.com), sūtītāja domēnam jābūt apstiprinātam). Bez tiem formas strādā, bet pieprasījumi redzami tikai Vercel žurnālā (**Logs**).
   - `NEXT_PUBLIC_SITE_URL=https://www.copesgidi.lv` — kanoniskā produkcijas adrese. Preview izvietojumos arī izmanto produkcijas adresi; preview lapām ir `noindex`.
4. Pievieno domēnu sadaļā **Settings → Domains**.

## SEO uzturēšana

SEO jāpārskata un nepieciešamie metadati, saites un strukturētie dati jāatjaunina pēc katras lapas izmaiņas — skat. `AGENTS.md`. Konvencijas, indeksēšanas noteikumi un pārbaudes ir aprakstīti [docs/seo-implementation.md](docs/seo-implementation.md).

Pārbaude pēc izmaiņām: `npm run lint`, `npm run build`, tad palaid produkcijas serveri ar `npm run start -- --hostname 127.0.0.1 --port 3100` un otrā terminālī `npm run test:seo`.
