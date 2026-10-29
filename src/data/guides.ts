// PARAUGA DATI. Visi gidi šajā failā ir izdomāti, lai parādītu lapas izskatu.
// Pirms publicēšanas aizstāj tos ar īstiem gidiem (un viņu piekrišanu).

export type Guide = {
  slug: string;
  name: string;
  business?: string;
  region: string;
  base: string;
  yearsExperience: number;
  languages: string[];
  species: string[];
  tagline: string;
  bio: string;
  story: string[];
  boat?: string;
  /** Ceļš uz foto mapē /public, piem. "/guides/arturs.jpg" */
  photo?: string;
  website?: string;
  instagram?: string;
  cancellation: string;
};

export const guides: Guide[] = [
  {
    slug: "arturs-kalnins",
    name: "Artūrs Kalniņš",
    business: "Ventas Copes",
    region: "kurzeme",
    base: "Kuldīga",
    yearsExperience: 14,
    languages: ["Latviešu", "Angļu", "Krievu"],
    species: ["lasis", "taimins", "vimba", "forele"],
    tagline: "Ventas lašu un taimiņu gids no Kuldīgas",
    bio: "Uzaudzis pie Ventas rumbas. Zina katru bedri no Kuldīgas līdz Skrundai un māca brišanas tehniku arī iesācējiem.",
    story: [
      "Pirmo lasi Artūrs noķēra 12 gadu vecumā — ar tēva spiningu un pārāk vāju auklu. Kopš tā laika Venta ir viņa otrās mājas.",
      "Viņš strādā ar maksimāli diviem viesiem vienlaikus, jo uzskata, ka lašu makšķerēšana prasa uzmanību katram metienam. Licences un atļaujas palīdzēs nokārtot jau pirms brauciena.",
    ],
    cancellation: "Pilna atmaksa līdz 14 dienām pirms brauciena",
  },
  {
    slug: "ilze-ozola",
    name: "Ilze Ozola",
    region: "vidzeme",
    base: "Mazsalaca",
    yearsExperience: 9,
    languages: ["Latviešu", "Angļu", "Vācu"],
    species: ["lasis", "taimins", "lidaka", "plaudis"],
    tagline: "Mušiņmakšķerēšana Salacā un līdakas Burtniekā",
    bio: "Sertificēta mušiņmakšķerēšanas instruktore. Pati sien mušas un pavasarī vada metienu skolu Salacas krastā.",
    story: [
      "Ilze sāka ar mušiņmakšķerēšanu Norvēģijā, bet atgriezās mājās, saprotot, ka Salaca nebūt neatpaliek.",
      "Viņas braucieni ir mierīgi un tehniski — ideāli, ja gribi iemācīties pareizu metienu un saprast, kā lasis uzvedas upē.",
    ],
    boat: "Aluminija laiva ar elektromotoru Burtniekā",
    cancellation: "Pilna atmaksa līdz 7 dienām pirms brauciena",
  },
  {
    slug: "toms-silins",
    name: "Toms Siliņš",
    region: "vidzeme",
    base: "Cēsis",
    yearsExperience: 6,
    languages: ["Latviešu", "Angļu"],
    species: ["forele", "taimins", "lidaka"],
    tagline: "Gaujas pieteku foreles ar mušu",
    bio: "Gaujas Nacionālā parka pieteku pazinējs. Īsi, aktīvi braucieni ar brišanu un daudz mācīšanās.",
    story: [
      "Toms ir dabas gids, kurš pievērsās makšķerēšanai, meklējot iemeslu pavadīt vēl vairāk laika upēs.",
      "Viņa braucieni piemēroti iesācējiem — viss aprīkojums, ieskaitot bridkurpes, ir iekļauts.",
    ],
    cancellation: "Pilna atmaksa līdz 7 dienām pirms brauciena",
  },
  {
    slug: "janis-berzins",
    name: "Jānis Bērziņš",
    business: "Rāznas Plēsēji",
    region: "latgale",
    base: "Rēzekne",
    yearsExperience: 18,
    languages: ["Latviešu", "Krievu", "Angļu"],
    species: ["lidaka", "zandarts", "asaris"],
    tagline: "Līdakas, zandarti un zemledus cope Latgalē",
    bio: "Bijušais sporta makšķernieks un Latvijas čempionātu dalībnieks. Rāzna un apkārtējie ezeri ir viņa darba vieta jau 18 gadus.",
    story: [
      "Jānis ir piedalījies spiningošanas sacensībās visā Baltijā, bet tagad dod priekšroku tam, lai citiem palīdzētu noķert savu rekordu.",
      "Ziemā viņš organizē zemledus braucienus ar apsildāmu telti, karstu zupu un visu inventāru.",
    ],
    boat: "5,2 m laiva ar 60 ZS motoru un eholotu",
    cancellation: "Pilna atmaksa līdz 7 dienām pirms brauciena",
  },
  {
    slug: "laura-krumina",
    name: "Laura Krūmiņa",
    region: "latgale",
    base: "Lubāns",
    yearsExperience: 8,
    languages: ["Latviešu", "Angļu", "Lietuviešu"],
    species: ["lidaka", "asaris", "plaudis"],
    tagline: "Ģimenes cope Lubāna ezerā",
    bio: "Lubāna mitrāja pazinēja un putnu vērotāja. Viņas braucieni ir piemēroti ģimenēm ar bērniem un pilnīgiem iesācējiem.",
    story: [
      "Laura uzaugusi Lubāna krastā zvejnieku ģimenē. Viņa apvieno copi ar stāstiem par ezera vēsturi un dabu.",
      "Bērniem ir savi, vieglāki makšķerkāti, un katrs brauciens beidzas ar zivju zupu krastā (ja laiks atļauj).",
    ],
    boat: "Stabila 6 m laiva līdz 4 personām",
    cancellation: "Pilna atmaksa līdz 3 dienām pirms brauciena",
  },
  {
    slug: "maris-liepa",
    name: "Māris Liepa",
    business: "Daugavas Sami",
    region: "zemgale",
    base: "Jēkabpils",
    yearsExperience: 11,
    languages: ["Latviešu", "Angļu"],
    species: ["sams", "zandarts", "asaris"],
    tagline: "Samu makšķerēšana Daugavā",
    bio: "Specializējies samu makšķerēšanā ar klonku un dzīvo ēsmu. Personīgais rekords — 2,31 m.",
    story: [
      "Māris samus ķer jau vairāk nekā desmit gadus un praktizē tikai “noķer un atlaid” principu lielajām zivīm.",
      "Braucieni bieži sākas vakarā un turpinās līdz rītausmai — tieši tad Daugavas milži ir aktīvākie.",
    ],
    boat: "5,8 m laiva ar 90 ZS motoru",
    cancellation: "Pilna atmaksa līdz 14 dienām pirms brauciena",
  },
  {
    slug: "edgars-vitols",
    name: "Edgars Vītols",
    region: "riga",
    base: "Rīga",
    yearsExperience: 7,
    languages: ["Latviešu", "Angļu", "Krievu"],
    species: ["zandarts", "asaris", "lidaka"],
    tagline: "Pilsētas cope Rīgā — no laivas Daugavā",
    bio: "Džiga speciālists. Satiek viesus Rīgas centrā, un jau pēc 20 minūtēm esat uz ūdens.",
    story: [
      "Edgars strādāja IT, līdz saprata, ka labākā stunda dienā ir tā, ko viņš pavada Daugavā.",
      "Viņa braucieni ir populāri biznesa ceļotāju vidū, kam ir tikai pusdiena brīva.",
    ],
    boat: "4,8 m laiva ar 50 ZS motoru",
    cancellation: "Pilna atmaksa līdz 48 stundām pirms brauciena",
  },
  {
    slug: "rihards-sprogis",
    name: "Rihards Sproģis",
    business: "Lielupes Plēsēji",
    region: "riga",
    base: "Jūrmala",
    yearsExperience: 12,
    languages: ["Latviešu", "Angļu", "Vācu"],
    species: ["zandarts", "lidaka", "vimba"],
    tagline: "Lielupes zandarti un līdakas no Jūrmalas",
    bio: "Pārzina Lielupi no grīvas līdz Kalnciemam. Strādā gan ar spiningu, gan vertikālo džigu.",
    story: [
      "Rihards ir Jūrmalas makšķernieku kluba dibinātājs un aktīvi iesaistās zivju resursu atjaunošanā.",
      "Rudenī viņš piedāvā arī rītausmas braucienus, kas beidzas laicīgi, lai paspētu uz darbu.",
    ],
    boat: "5 m laiva ar 60 ZS motoru",
    cancellation: "Pilna atmaksa līdz 7 dienām pirms brauciena",
  },
  {
    slug: "kristaps-zarins",
    name: "Kristaps Zariņš",
    region: "kurzeme",
    base: "Pāvilosta",
    yearsExperience: 6,
    languages: ["Latviešu", "Angļu"],
    species: ["taimins", "lidaka", "asaris"],
    tagline: "Taimiņi no Kurzemes jūras krasta",
    bio: "Krasta makšķernieks un sērferis. Zina, kur taimiņi barojas pie akmeņiem un upju ietekām.",
    story: [
      "Kristaps pārcēlās uz Pāvilostu viļņu dēļ un palika taimiņu dēļ.",
      "Brauciens notiek bridot jūrā, tāpēc viņš nodrošina bridkostīmus visos izmēros.",
    ],
    cancellation: "Pilna atmaksa līdz 3 dienām pirms brauciena",
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export const allLanguages = Array.from(new Set(guides.flatMap((g) => g.languages)));
