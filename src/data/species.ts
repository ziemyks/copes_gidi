export type Species = {
  slug: string;
  name: string;
  latin: string;
  description: string;
  /** Mēneši (1–12), kad zivs ķeras labi */
  good: number[];
  /** Mēneši (1–12), kas ir labākais laiks */
  best: number[];
};

export const species: Species[] = [
  {
    slug: "lidaka",
    name: "Līdaka",
    latin: "Esox lucius",
    description:
      "Latvijas ezeru un upju karaliene. Rudenī lielākās līdakas nāk tuvāk krastam un kļūst agresīvas.",
    good: [1, 2, 5, 6, 7, 8, 12],
    best: [9, 10, 11],
  },
  {
    slug: "zandarts",
    name: "Zandarts",
    latin: "Sander lucioperca",
    description:
      "Daugavas, Lielupes un lielo ezeru dziļumu mednieks. Klasiska džiga zivs vēlā rudenī.",
    good: [6, 7, 8, 12],
    best: [9, 10, 11],
  },
  {
    slug: "asaris",
    name: "Asaris",
    latin: "Perca fluviatilis",
    description:
      "Ķeras gandrīz visu gadu un ir ideāla zivs iesācējiem. Ziemā — galvenais zemledus loms.",
    good: [5, 6, 7, 8, 9, 12],
    best: [1, 2, 10, 11],
  },
  {
    slug: "sams",
    name: "Sams",
    latin: "Silurus glanis",
    description:
      "Lielākā Latvijas saldūdens zivs. Daugavā un Lielupē sastopami eksemplāri virs 2 metriem.",
    good: [6, 9],
    best: [7, 8],
  },
  {
    slug: "lasis",
    name: "Lasis",
    latin: "Salmo salar",
    description:
      "Venta, Salaca un Gauja — licencētā lašu makšķerēšana ar vienu no Baltijas labākajām populācijām.",
    good: [4, 5, 9],
    best: [10, 11],
  },
  {
    slug: "taimins",
    name: "Taimiņš",
    latin: "Salmo trutta trutta",
    description:
      "Jūras forele, ko ķer gan upēs, gan no Kurzemes un Vidzemes jūras krasta.",
    good: [3, 4, 5, 9],
    best: [10, 11],
  },
  {
    slug: "forele",
    name: "Strauta forele",
    latin: "Salmo trutta fario",
    description:
      "Gaujas un Ventas pieteku dzidrie ūdeņi — vieta mušiņmakšķerniekiem.",
    good: [7, 8, 9],
    best: [5, 6],
  },
  {
    slug: "vimba",
    name: "Vimba",
    latin: "Vimba vimba",
    description:
      "Pavasara nārsta gājiens Ventā un Daugavā — viens no Latvijas copes svētkiem.",
    good: [9, 10],
    best: [4, 5],
  },
  {
    slug: "plaudis",
    name: "Plaudis",
    latin: "Abramis brama",
    description:
      "Mierīgā vasaras cope ar barotavu. Lubāns un Burtnieks ir slaveni ar lieliem plaudžiem.",
    good: [5, 6, 9],
    best: [7, 8],
  },
  {
    slug: "menca",
    name: "Menca",
    latin: "Gadus morhua",
    description:
      "Baltijas jūras menca — no Liepājas mola un pludmales vēlā rudenī un ziemā, jūrā sezonāli. Pirms copes pārbaudi aktuālos mencu ierobežojumus.",
    good: [1, 2, 3, 10],
    best: [11, 12],
  },
  {
    slug: "bute",
    name: "Bute",
    latin: "Platichthys flesus",
    description: "Plekste, ko Kurzemes krastā ķer ar grunts makšķerēm no pludmales un moliem.",
    good: [4, 5, 6, 11],
    best: [9, 10],
  },
  {
    slug: "vejzivs",
    name: "Vējzivs",
    latin: "Belone belone",
    description: "Zaļkaulainā jūras zivs, kas maija beigās un jūnija sākumā pienāk pie Kurzemes krasta.",
    good: [7],
    best: [5, 6],
  },
];

export function getSpecies(slug: string) {
  return species.find((s) => s.slug === slug);
}

export function speciesNames(slugs: string[]) {
  return slugs.map((slug) => getSpecies(slug)?.name ?? slug);
}
