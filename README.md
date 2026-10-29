# Copes Gidi

Makšķerēšanas gidu katalogs Latvijai — Next.js 16 (App Router, Cache Components) + Tailwind CSS 4.

## Lapas

| Ceļš | Saturs |
| --- | --- |
| `/` | Sākumlapa: meklēšana, braucieni, reģioni, gidi, zivis, sezonu kalendārs, BUJ |
| `/braucieni` | Visi braucieni ar filtriem (`?regions=`, `?suga=`, `?veids=`, `?kartot=cena`) |
| `/braucieni/[slug]` | Brauciena lapa ar pieprasījuma formu |
| `/gidi` | Gidu katalogs ar filtriem (`?regions=`, `?suga=`, `?valoda=`) |
| `/gidi/[slug]` | Gida profils ar ziņas formu |
| `/regioni/[slug]` | Kurzeme, Vidzeme, Latgale, Zemgale, Rīga |
| `/klusti-par-gidu` | Pieteikuma forma jauniem gidiem |
| `/privatums` | Privātuma politika (sākuma teksts) |

## Saturs

Viss saturs ir TypeScript failos — datubāze nav vajadzīga:

- `src/data/guides.ts` — gidi
- `src/data/trips.ts` — braucieni (`guide` lauks norāda uz gida `slug`)
- `src/data/regions.ts`, `src/data/species.ts` — reģioni un zivju sugas ar sezonām
- `src/lib/site.ts` — nosaukums, e-pasts, Instagram

**Šobrīd visi gidi un braucieni ir izdomāti parauga dati.** Kājenē par to ir brīdinājums; kad ievietoti īsti gidi, nomaini `demoContent` uz `false` failā `src/lib/site.ts`.

### Fotogrāfijas

Kamēr nav fotogrāfiju, tiek rādītas ilustrētas ainavas. Lai pievienotu foto:

1. Ieliec attēlu mapē `public/`, piem. `public/guides/arturs.jpg`
2. Gidam pievieno `photo: "/guides/arturs.jpg"`

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
   - `NEXT_PUBLIC_SITE_URL` — kad pievienots savs domēns.
4. Pievieno domēnu sadaļā **Settings → Domains**.
