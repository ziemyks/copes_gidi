// PARAUGA DATI — skatīt piezīmi guides.ts

import type { SceneVariant } from "@/components/scene";

export type TripType = "laiva" | "krasts" | "musa" | "ledus";

export const tripTypes: Record<TripType, string> = {
  laiva: "No laivas",
  krasts: "No krasta",
  // Mīkstā defise ļauj garo vārdu pārnest šaurā ekrānā
  musa: "Mušiņ­makšķerēšana",
  ledus: "Zemledus",
};

export type Trip = {
  slug: string;
  title: string;
  guide: string;
  region: string;
  water: string;
  meetingPoint: string;
  type: TripType;
  species: string[];
  hours: number;
  priceFrom: number;
  priceUnit: "personai" | "braucienam";
  maxGuests: number;
  level: string;
  months: string;
  familyFriendly?: boolean;
  summary: string;
  description: string[];
  included: string[];
  notIncluded: string[];
  scene: SceneVariant;
};

export const trips: Trip[] = [
  {
    slug: "ventas-lasi-kuldiga",
    title: "Ventas lašu un taimiņu diena Kuldīgā",
    guide: "arturs-kalnins",
    region: "kurzeme",
    water: "Venta",
    meetingPoint: "Kuldīga, pie Ventas rumbas",
    type: "krasts",
    species: ["lasis", "taimins"],
    hours: 8,
    priceFrom: 220,
    priceUnit: "personai",
    maxGuests: 2,
    level: "Vidējs–pieredzējis",
    months: "Septembris–novembris, aprīlis–maijs",
    summary:
      "Pilna diena Ventā ar brišanu un spiningu. Gids izvēlas vietas pēc ūdens līmeņa un temperatūras.",
    description: [
      "Venta ir viena no labākajām lašu upēm Baltijā. Dienas laikā apmeklēsim 3–4 vietas starp Kuldīgu un Skrundu, pielāgojoties ūdens līmenim.",
      "Brauciens piemērots tiem, kam jau ir pieredze ar spiningu. Artūrs palīdzēs ar metienu tehniku, vobleru izvēli un zivs izvilkšanu straumē.",
    ],
    included: ["Gida pakalpojumi", "Spinings un mānekļi", "Bridkostīms", "Pusdienas un karsta kafija"],
    notIncluded: ["Licencētās makšķerēšanas licence", "Makšķerēšanas karte", "Transports līdz Kuldīgai"],
    scene: "river",
  },
  {
    slug: "ventas-vimbas-pavasari",
    title: "Pavasara vimbas Ventā",
    guide: "arturs-kalnins",
    region: "kurzeme",
    water: "Venta",
    meetingPoint: "Kuldīga",
    type: "krasts",
    species: ["vimba"],
    hours: 5,
    priceFrom: 75,
    priceUnit: "personai",
    maxGuests: 4,
    level: "Visiem līmeņiem",
    months: "Aprīlis–maijs",
    familyFriendly: true,
    summary: "Klasiskā pavasara cope ar plūdiņu, kad vimbas nāk augšup pa Ventu nārstot.",
    description: [
      "Pavasarī tūkstošiem vimbu dodas augšup pa Ventu. Tas ir labākais laiks, lai iepazītu upes copi — zivju ir daudz, un tehnika ir vienkārša.",
      "Piemērots ģimenēm un iesācējiem.",
    ],
    included: ["Gida pakalpojumi", "Makšķeres un ēsma", "Termoss ar tēju"],
    notIncluded: ["Makšķerēšanas karte", "Transports"],
    scene: "river",
  },
  {
    slug: "salacas-musinmakskeresana",
    title: "Mušiņmakšķerēšana Salacā: lasis un taimiņš",
    guide: "ilze-ozola",
    region: "vidzeme",
    water: "Salaca",
    meetingPoint: "Mazsalaca",
    type: "musa",
    species: ["lasis", "taimins"],
    hours: 8,
    priceFrom: 190,
    priceUnit: "personai",
    maxGuests: 2,
    level: "Vidējs",
    months: "Septembris–oktobris, aprīlis–maijs",
    summary: "Divroku mušiņmakšķere, spey metieni un Salacas smilšakmens krasti.",
    description: [
      "Salaca ir Latvijas skaistākā lašu upe. Ilze iemācīs spey metienu pamatus un palīdzēs izvēlēties mušas atbilstoši ūdenim.",
      "Brauciena laikā pārvietojamies kājām pa upes krastu, bridot līdz ceļiem vai jostas vietai.",
    ],
    included: ["Gida pakalpojumi", "Mušiņmakšķeres komplekts", "Mušas", "Bridkostīms", "Pusdienas"],
    notIncluded: ["Licencētās makšķerēšanas licence", "Makšķerēšanas karte", "Naktsmītne"],
    scene: "forest",
  },
  {
    slug: "burtnieka-lidakas",
    title: "Burtnieka līdakas no laivas",
    guide: "ilze-ozola",
    region: "vidzeme",
    water: "Burtnieks",
    meetingPoint: "Burtnieku ciems, laivu piestātne",
    type: "laiva",
    species: ["lidaka", "asaris"],
    hours: 6,
    priceFrom: 240,
    priceUnit: "braucienam",
    maxGuests: 3,
    level: "Visiem līmeņiem",
    months: "Maijs–novembris",
    summary: "Spiningošana Burtnieka niedrājos un atklātajā ūdenī.",
    description: [
      "Burtnieks ir ceturtais lielākais Latvijas ezers ar izcilu līdaku populāciju. Makšķerēsim gar niedrāju malām un zemūdens sēkļiem.",
      "Cena par visu laivu (līdz 3 personām).",
    ],
    included: ["Laiva ar degvielu", "Spinings un mānekļi", "Glābšanas vestes"],
    notIncluded: ["Makšķerēšanas karte", "Ēdināšana"],
    scene: "lake",
  },
  {
    slug: "gaujas-foreles",
    title: "Gaujas pieteku foreles ar mušu",
    guide: "toms-silins",
    region: "vidzeme",
    water: "Amata un Brasla",
    meetingPoint: "Cēsis",
    type: "musa",
    species: ["forele"],
    hours: 5,
    priceFrom: 110,
    priceUnit: "personai",
    maxGuests: 3,
    level: "Iesācējiem",
    months: "Maijs–septembris",
    familyFriendly: true,
    summary: "Ievads mušiņmakšķerēšanā Gaujas Nacionālā parka pietekās.",
    description: [
      "Mazas, dzidras upes ar strauta forelēm. Sāksim ar metienu treniņu pļavā, tad dosimies brist.",
      "Iekļauts viss aprīkojums — tev jāatved tikai labs garastāvoklis.",
    ],
    included: ["Gida pakalpojumi", "Viss aprīkojums", "Bridkurpes un bridbikses", "Uzkodas"],
    notIncluded: ["Makšķerēšanas karte"],
    scene: "forest",
  },
  {
    slug: "raznas-zandarti-lidakas",
    title: "Rāznas zandarti un līdakas",
    guide: "janis-berzins",
    region: "latgale",
    water: "Rāzna",
    meetingPoint: "Kaunata, Rāznas ezera krasts",
    type: "laiva",
    species: ["zandarts", "lidaka", "asaris"],
    hours: 8,
    priceFrom: 280,
    priceUnit: "braucienam",
    maxGuests: 3,
    level: "Visiem līmeņiem",
    months: "Jūnijs–novembris",
    summary: "Pilna diena Latvijas otrajā lielākajā ezerā ar eholotu un džigu.",
    description: [
      "Rāzna ir dziļš, dzidrs ezers ar lieliskiem zandartiem. Jānis izmanto moderno eholotu, lai atrastu zivju barus dziļumā.",
      "Brauciena laikā iemācīsies džiga un vertikālās makšķerēšanas pamatus.",
    ],
    included: ["Laiva ar degvielu", "Viss aprīkojums", "Pusdienas krastā"],
    notIncluded: ["Makšķerēšanas karte", "Naktsmītne"],
    scene: "lake",
  },
  {
    slug: "zemledus-latgale",
    title: "Zemledus makšķerēšana Latgales ezeros",
    guide: "janis-berzins",
    region: "latgale",
    water: "Rāzna un apkārtējie ezeri",
    meetingPoint: "Rēzekne",
    type: "ledus",
    species: ["asaris", "lidaka"],
    hours: 6,
    priceFrom: 65,
    priceUnit: "personai",
    maxGuests: 6,
    level: "Visiem līmeņiem",
    months: "Janvāris–marts (atkarīgs no ledus)",
    familyFriendly: true,
    summary: "Asari un līdakas zem ledus, apsildāma telts un karsta zupa.",
    description: [
      "Latgales ziema ar biezu ledu ir ideāla zemledus copei. Jānis pārbauda ledus drošību katru rītu un izvēlas vietu atbilstoši apstākļiem.",
      "Iekļauts viss inventārs, ieskaitot ledus urbi un apsildāmu telti.",
    ],
    included: ["Ziemas makšķeres un ēsma", "Ledus urbis", "Apsildāma telts", "Karsta zupa un tēja"],
    notIncluded: ["Makšķerēšanas karte", "Silts apģērbs"],
    scene: "ice",
  },
  {
    slug: "lubana-gimenes-cope",
    title: "Ģimenes cope Lubānā",
    guide: "laura-krumina",
    region: "latgale",
    water: "Lubāns",
    meetingPoint: "Lubāna mitrāja informācijas centrs",
    type: "laiva",
    species: ["lidaka", "asaris", "plaudis"],
    hours: 4,
    priceFrom: 160,
    priceUnit: "braucienam",
    maxGuests: 4,
    level: "Iesācējiem",
    months: "Maijs–oktobris",
    familyFriendly: true,
    summary: "Mierīga cope un dabas vērošana Latvijas lielākajā ezerā.",
    description: [
      "Lubāns ir sekls, plašs ezers ar bagātu putnu dzīvi. Ideāli piemērots bērniem — laiva ir stabila, un zivis ķeras bieži.",
      "Laura pastāstīs par ezera vēsturi un palīdzēs katram noķert savu pirmo zivi.",
    ],
    included: ["Laiva", "Makšķeres arī bērniem", "Glābšanas vestes", "Zivju zupa krastā"],
    notIncluded: ["Makšķerēšanas karte (pieaugušajiem)"],
    scene: "lake",
  },
  {
    slug: "daugavas-sami",
    title: "Daugavas sami naktī un rītausmā",
    guide: "maris-liepa",
    region: "zemgale",
    water: "Daugava",
    meetingPoint: "Jēkabpils, laivu piestātne",
    type: "laiva",
    species: ["sams"],
    hours: 10,
    priceFrom: 350,
    priceUnit: "braucienam",
    maxGuests: 2,
    level: "Pieredzējušiem",
    months: "Jūnijs–septembris",
    summary: "Klonka un dzīvā ēsma — medības uz Latvijas lielāko saldūdens zivi.",
    description: [
      "Brauciens sākas vakarā un turpinās līdz rītausmai. Izmantojam klonku, lai pievilinātu samus, un smagu aprīkojumu.",
      "Visas lielās zivis tiek atlaistas pēc fotografēšanas.",
    ],
    included: ["Laiva ar degvielu", "Smagais aprīkojums", "Klonka", "Vakariņas un brokastis"],
    notIncluded: ["Makšķerēšanas karte"],
    scene: "river",
  },
  {
    slug: "plavinu-zandarti",
    title: "Zandarti Pļaviņu ūdenskrātuvē",
    guide: "maris-liepa",
    region: "zemgale",
    water: "Pļaviņu ūdenskrātuve",
    meetingPoint: "Aiviekste",
    type: "laiva",
    species: ["zandarts", "asaris"],
    hours: 6,
    priceFrom: 260,
    priceUnit: "braucienam",
    maxGuests: 3,
    level: "Visiem līmeņiem",
    months: "Septembris–novembris",
    summary: "Rudens džigs Daugavas bedrēs un nogāzēs.",
    description: [
      "Pļaviņu ūdenskrātuve ir viena no zandartiem bagātākajām vietām Latvijā. Rudenī zivis koncentrējas dziļākajās vietās.",
    ],
    included: ["Laiva ar degvielu", "Džiga aprīkojums", "Karsta kafija"],
    notIncluded: ["Makšķerēšanas karte", "Ēdināšana"],
    scene: "river",
  },
  {
    slug: "rigas-pilsetas-cope",
    title: "Pilsētas cope Rīgā: zandarti Daugavā",
    guide: "edgars-vitols",
    region: "riga",
    water: "Daugava",
    meetingPoint: "Rīga, AB dambis",
    type: "laiva",
    species: ["zandarts", "asaris"],
    hours: 4,
    priceFrom: 180,
    priceUnit: "braucienam",
    maxGuests: 3,
    level: "Visiem līmeņiem",
    months: "Maijs–novembris",
    summary: "Četras stundas uz Daugavas ar Vecrīgas siluetu fonā.",
    description: [
      "Ideāli, ja esi Rīgā tikai uz dažām dienām. Edgars tevi satiek pilsētas centrā, un jau pēc 20 minūtēm esat uz ūdens.",
      "Galvenokārt džigs uz zandartiem un asariem.",
    ],
    included: ["Laiva ar degvielu", "Viss aprīkojums", "Ūdens un uzkodas"],
    notIncluded: ["Makšķerēšanas karte"],
    scene: "sea",
  },
  {
    slug: "lielupes-plesei",
    title: "Lielupes plēsēji no Jūrmalas",
    guide: "rihards-sprogis",
    region: "riga",
    water: "Lielupe",
    meetingPoint: "Jūrmala, Bulduri",
    type: "laiva",
    species: ["zandarts", "lidaka"],
    hours: 6,
    priceFrom: 240,
    priceUnit: "braucienam",
    maxGuests: 3,
    level: "Visiem līmeņiem",
    months: "Maijs–novembris",
    summary: "Vertikālais džigs un spinings Lielupes līčos un bedrēs.",
    description: [
      "Lielupe pie Jūrmalas ir pārsteidzoši zivīm bagāta. Rihards rāda gan vertikālā džiga, gan klasiskās spiningošanas tehniku.",
    ],
    included: ["Laiva ar degvielu", "Viss aprīkojums", "Kafija un uzkodas"],
    notIncluded: ["Makšķerēšanas karte"],
    scene: "river",
  },
  {
    slug: "kurzemes-krasta-taimini",
    title: "Taimiņi no Kurzemes jūras krasta",
    guide: "kristaps-zarins",
    region: "kurzeme",
    water: "Baltijas jūra pie Pāvilostas",
    meetingPoint: "Pāvilosta",
    type: "krasts",
    species: ["taimins"],
    hours: 6,
    priceFrom: 85,
    priceUnit: "personai",
    maxGuests: 4,
    level: "Visiem līmeņiem",
    months: "Marts–maijs, oktobris–novembris",
    summary: "Bridot jūrā pie akmeņiem — taimiņu medības ar spiningu.",
    description: [
      "Kurzemes krasts ar akmeņainiem posmiem ir lieliska vieta taimiņiem. Kristaps zina, kur zivis barojas atkarībā no vēja virziena.",
      "Bridkostīmi visos izmēros ir iekļauti.",
    ],
    included: ["Gida pakalpojumi", "Spinings un mānekļi", "Bridkostīms"],
    notIncluded: ["Makšķerēšanas karte", "Ēdināšana"],
    scene: "sea",
  },
];

export function getTrip(slug: string) {
  return trips.find((t) => t.slug === slug);
}

export function tripsByGuide(slug: string) {
  return trips.filter((t) => t.guide === slug);
}

export function tripsByRegion(slug: string) {
  return trips.filter((t) => t.region === slug);
}

export function tripsBySpecies(slug: string) {
  return trips.filter((t) => t.species.includes(slug));
}
