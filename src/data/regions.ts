import type { SceneVariant } from "@/components/scene";

export type Region = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  waters: string[];
  species: string[];
  season: string;
  scene: SceneVariant;
};

export const regions: Region[] = [
  {
    slug: "kurzeme",
    name: "Kurzeme",
    tagline: "Lasis, taimiņš un jūras krasts",
    description:
      "Venta ar savu rumbu Kuldīgā, Abavas ieleja un garš, mežonīgs jūras krasts no Liepājas līdz Kolkai. Kurzeme ir Latvijas lašu un taimiņu galvaspilsēta, bet Usmas un Engures ezeri sniedz izcilu plēsēju copi.",
    waters: ["Venta", "Abava", "Usmas ezers", "Engures ezers", "Baltijas jūras krasts"],
    species: ["lasis", "taimins", "vimba", "lidaka", "asaris"],
    season: "Labākais: aprīlis–maijs un septembris–novembris",
    scene: "river",
  },
  {
    slug: "vidzeme",
    name: "Vidzeme",
    tagline: "Salaca, Gauja un mušiņmakšķerēšana",
    description:
      "Smilšakmens krasti, straujas pietekas un Burtnieka plašums. Vidzeme ir mušiņmakšķernieku reģions — forele Gaujas pietekās un lasis Salacā.",
    waters: ["Gauja", "Salaca", "Burtnieks", "Amata", "Brasla"],
    species: ["lasis", "taimins", "forele", "lidaka", "plaudis"],
    season: "Labākais: maijs–jūnijs un septembris–oktobris",
    scene: "forest",
  },
  {
    slug: "latgale",
    name: "Latgale",
    tagline: "Zilo ezeru zeme",
    description:
      "Vairāk nekā tūkstotis ezeru — Rāzna, Lubāns, Dridzis, Ežezers. Latgale ir vieta lielām līdakām, zandartiem un leģendārai zemledus copei.",
    waters: ["Rāzna", "Lubāns", "Dridzis", "Ežezers", "Daugava pie Krāslavas"],
    species: ["lidaka", "zandarts", "asaris", "plaudis"],
    season: "Labākais: septembris–novembris un ledus sezona",
    scene: "lake",
  },
  {
    slug: "zemgale",
    name: "Zemgale un Sēlija",
    tagline: "Daugavas sami un zandarti",
    description:
      "Daugavas vidustece un Pļaviņu ūdenskrātuve, Lielupe un Mēmele. Šeit dzīvo Latvijas lielākie sami, un rudenī zandarti stāv dziļajās bedrēs.",
    waters: ["Daugava", "Pļaviņu ūdenskrātuve", "Lielupe", "Mēmele"],
    species: ["sams", "zandarts", "vimba", "lidaka", "asaris"],
    season: "Labākais: jūlijs–oktobris",
    scene: "river",
  },
  {
    slug: "riga",
    name: "Rīga un Jūrmala",
    tagline: "Cope pilsētas tuvumā",
    description:
      "Daugavas grīva, Ķīšezers, Juglas ezers un Lielupe Jūrmalā. Ideāli, ja ir tikai pusdiena — gids tevi satiks pilsētā, un pēc stundas jau būsi uz ūdens.",
    waters: ["Daugava", "Ķīšezers", "Juglas ezers", "Lielupe", "Rīgas jūras līcis"],
    species: ["zandarts", "asaris", "lidaka", "taimins"],
    season: "Labākais: maijs–novembris",
    scene: "sea",
  },
];

export function getRegion(slug: string) {
  return regions.find((r) => r.slug === slug);
}
