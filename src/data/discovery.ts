export const fishingLandings = [
  {
    slug: "lidaka",
    name: "Līdaku cope",
    title: "Līdaku cope ar gidu Latvijā",
    description: "Salīdzini līdaku makšķerēšanas braucienus Latvijā: publicētās cenas, ūdeņus, laivas un aprīkojumu. Izvēlies braucienu un sazinies tieši ar gidu.",
    intro: "Līdaku braucieni atšķiras ar ūdeņiem, laivas aprīkojumu un izvēlēto metodi. Šeit apkopoti piedāvājumi, kuros gids pats norādījis līdaku copi — no Rīgas ūdeņiem līdz Latvijas ezeriem.",
    tips: [
      { title: "Izvēlies ūdeni un metodi", text: "Salīdzini konkrētos ūdeņus katrā piedāvājumā. Pirms brauciena pajautā, vai plānota spiningošana, velcēšana vai darbs ar LIVE sonāru un vai metode piemērota tavai pieredzei." },
      { title: "Pārbaudi, kas ietilpst cenā", text: "Laiva un gids nav vienīgās izmaksas. Aprakstos apskati inventāru un degvielu, kā arī to, vai cena ir par visu braucienu vai katru personu. Nepublicētās izmaksas precizē tieši pie gida." },
      { title: "Vienojies par lomiem", text: "Gidu attieksme pret trofeju paturēšanu var atšķirties. Profilā meklē publicēto lomu politiku un pirms rezervācijas pārrunā aktuālos liegumus, atļaujas un konkrētā ūdens noteikumus." },
    ],
  },
  {
    slug: "zandarts",
    name: "Zandartu cope",
    title: "Zandartu cope ar gidu Latvijā",
    description: "Zandartu cope ar gidu Latvijā: salīdzini braucienus, publicētās cenas, klasiskās un LIVE metodes. Ūdeņi, laivas, aprīkojums un tiešie kontakti.",
    intro: "Zandartu piedāvājumos atradīsi gan klasisko spiningošanu, gan copi ar LIVE sonāriem. Salīdzini brauciena ilgumu, ūdeņus un aprīkojumu, pirms izvēlies gidu savai nākamajai copei.",
    tips: [
      { title: "Klasika vai LIVE", text: "Daži braucieni paredzēti darbam ar sonāru, citi — klasiskām tehnikām. Precizē, cik daudz gids māca un vai vari izmantot savu inventāru. Apmācība klienta laivā ir cits pakalpojums nekā copes brauciens." },
      { title: "Diena, vakars vai nakts", text: "Piedāvājumi atšķiras ar ilgumu un sākuma laiku. Ja interesē vakara vai nakts cope, pārliecinies, ka konkrētais piedāvājums to ietver, un vienojies par tikšanās un atgriešanās laiku." },
      { title: "Salīdzini vienādu grupas lielumu", text: "Cena vienam makšķerniekam un cena visai laivai nav tieši salīdzināmas. Izmanto publicēto cenu tabulu un precizē kopējo maksu savai grupai, papildu stundas un iespējamos izbraukuma izdevumus." },
    ],
  },
  {
    slug: "sams",
    name: "Samu cope",
    title: "Samu cope ar gidu Latvijā",
    description: "Salīdzini samu copes braucienus ar gidu Latvijā, tostarp piedāvājumus ar kvoku. Publicētās cenas, ūdeņi, ilgums, aprīkojums un tiešie kontakti.",
    intro: "Samu copei izvēlētā metode un brauciena plāns ir īpaši svarīgi. Šajā izlasē ir tikai piedāvājumi, kuros norādīts sams; pārbaudi katra brauciena aprakstu, jo ne visi paredz copi ar kvoku.",
    tips: [
      { title: "Precizē samu copes metodi", text: "Pajautā, vai brauciens paredzēts tieši samiem, kādu metodi izmantos un vai kvoks ir daļa no piedāvājuma. Zivju sugu saraksts pats par sevi nenozīmē, ka katrā izbraucienā gids mērķēs uz samu." },
      { title: "Aprīkojums un laiks uz ūdens", text: "Apskati, vai speciālais inventārs un ēsma ir iekļauti, cik ilgs ir brauciens un cik cilvēkiem paredzēta laiva. Sezonu, izbraukšanas laiku un drošības prasības apstiprina pats gids." },
      { title: "Pirms priekšapmaksas", text: "Vienojies par gala cenu, laikapstākļu izmaiņām, atcelšanu un lomu politiku. Katalogā norādīta publiski atrasta informācija; tas nav brīva datuma vai loma apstiprinājums." },
    ],
  },
];

export const winterLanding = {
  title: "Ziemas cope ar gidu Latvijā",
  description: "Zemledus makšķerēšana ar gidu Latvijā: salīdzini publicētos braucienus, cenas, ūdeņus un inventāru. Precizē apstākļus un sazinies tieši ar gidu.",
  intro: "Ziemas braucienu plāns ir atkarīgs no laikapstākļiem un konkrētās vietas pieejamības. Salīdzini gidu publicētos ziemas piedāvājumus un vienojies par izbraucienu tikai pēc aktuālo apstākļu precizēšanas.",
  tips: [
    { title: "Ledus apstākļus apstiprina pirms brauciena", text: "Publicēts ziemas piedāvājums nenozīmē, ka izvēlētajā dienā uz ledus var doties. Sazinies ar gidu par konkrēto ūdeni, drošības plānu un brauciena pārcelšanu, ja apstākļi mainās." },
    { title: "Noskaidro, kas jāņem līdzi", text: "Piedāvājumos salīdzini makšķeres, urbi un citu inventāru. Atsevišķi pajautā par apģērbu, apaviem, drošības aprīkojumu, siltu dzērienu un to, vai brauciens piemērots iesācējiem vai bērniem." },
    { title: "Salīdzini ilgumu un visu grupas cenu", text: "Pārbaudi publicēto cenu un tās pamatu — par braucienu vai personu. Pirms rezervācijas precizē tikšanās vietu, transportu, makšķerēšanas atļaujas un atcelšanas noteikumus." },
  ],
};

export function speciesLandingPath(slug: string) {
  return fishingLandings.some((landing) => landing.slug === slug) ? `/zivis/${slug}` : `/braucieni?suga=${slug}`;
}

export function tripTypePath(type: string) {
  return type === "ledus" ? "/cope/ziemas-cope" : `/braucieni?veids=${type}`;
}

export const regionPlanning: Record<string, { locative: string; description: string; tips: { title: string; text: string }[] }> = {
  riga: {
    locative: "Rīgā un Jūrmalā",
    description: "Cope ar gidu Rīgā un Jūrmalā: Daugava, Ķīšezers, Juglas ezers un Lielupe. Salīdzini publicētās cenas, laivas, braucienus un tiešos kontaktus.",
    tips: [
      { title: "Tikšanās vieta pilsētas tuvumā", text: "Rīgas piedāvājumos minēta Daugava, Ķīšezers, Juglas ezers un Lielupe. Tā nav viena izbraukšanas vieta: pirms rezervācijas pajautā, kur jāierodas un vai brauciens sākas no gida bāzes vai citas laivu nolaišanas vietas." },
      { title: "Īsāks brauciens vai apmācība", text: "Salīdzini ilgumu un mērķi. Rīgas katalogā ir gan copes izbraucieni, gan elektronikas apmācības; apmācība klienta laivā nav tas pats, kas brauciens ar gida laivu. Zivju sugas un metodes pārbaudi konkrētajā piedāvājumā." },
    ],
  },
  kurzeme: {
    locative: "Kurzemē",
    description: "Makšķerēšana ar gidu Kurzemē: Usmas ezers, Liepāja un piekraste. Salīdzini publicētos braucienus, cenas, metodes un sazinies tieši ar gidu.",
    tips: [
      { title: "Ezers, upe vai jūras krasts", text: "Kurzemes piedāvājumos atšķiras ne tikai zivis, bet arī pati cope: Usmas ezera brauciens no laivas un Liepājas piekrastes brauciens ir dažādi plāni. Apskati metodi, inventāru un nokļūšanu līdz konkrētajai vietai." },
      { title: "Precizē laikapstākļu plānu", text: "Pirms piekrastes vai ezera brauciena vienojies, kas notiek vēja vai citu nepiemērotu apstākļu dēļ. Upju copei atsevišķi pārbaudi izvēlētā posma aktuālos noteikumus un atļaujas; reģiona sezonas apraksts tos neaizstāj." },
    ],
  },
  vidzeme: {
    locative: "Vidzemē",
    description: "Cope ar gidu Vidzemē: Gauja, Burtnieks, Alūksnes ezers un mušiņmakšķerēšana. Publicētie braucieni, cenas, aprīkojums un tiešie kontakti.",
    tips: [
      { title: "Upes izbrauciens un ezera cope", text: "Vidzemē salīdzini Gaujas braucienus ar Burtnieka un Alūksnes ezera piedāvājumiem. Norādītais gids var būt bāzēts citā reģionā, bet šeit tiek rādīts arī tad, ja viņa publicētais brauciens notiek Vidzemē." },
      { title: "Transfērs un vairāku dienu plāns", text: "Daži piedāvājumi ietver ceļojumu vai transfēru, citi — tikai laiku uz ūdens. Pārbaudi, vai cena norādīta par personu vai visu grupu un vai nakšņošana ir iekļauta. Upju posmus un licenču nosacījumus precizē atsevišķi." },
    ],
  },
  latgale: {
    locative: "Latgalē",
    description: "Makšķerēšana ar gidu Latgalē: Rāznas ezers, Preiļu novads un citi ezeri. Salīdzini piedāvājumus, ziemas copi un gidu tiešos kontaktus.",
    tips: [
      { title: "Izvēlies konkrēto ezeru", text: "Latgales piedāvājumos ir Rāznas ezers, Preiļu novada ūdeņi un Dagdas ezeri. Pārbaudi, vai izvēlētais gids strādā tieši tev vajadzīgajā vietā un vai publicētais piedāvājums attiecas uz laivu vai zemledus copi." },
      { title: "Cena pēc pieprasījuma", text: "Ja cena nav publicēta, katalogā tā netiek izdomāta. Jautā gidam par kopējo cenu savai grupai, inventāru un satikšanās vietu. Ja plāno ziemas braucienu, aktuālos apstākļus apstiprini pirms došanās ceļā." },
    ],
  },
  zemgale: {
    locative: "Zemgalē un Sēlijā",
    description: "Cope ar gidu Zemgalē un Sēlijā: Daugava, HES ūdeņi un upju braucieni. Salīdzini publicētos piedāvājumus, cenas un tiešos kontaktus.",
    tips: [
      { title: "Ūdens nosaukums nav izbraukšanas vieta", text: "Daugava un HES ūdenskrātuves aptver lielu teritoriju. Pārbaudi konkrēto brauciena posmu, tikšanās vietu un to, vai gids nodrošina laivu vai pakalpojumu tavā laivā. Brauciena reģions un gida bāze var atšķirties." },
      { title: "Metode, suga un sezona", text: "Aprakstā meklē mērķa sugas un publicēto metodi. Ja interesē sams vai noteikts upes posms, nepaļaujies tikai uz reģiona nosaukumu: pajautā, vai konkrētais izbrauciens to ietver, un precizē sezonas, licences un lomu nosacījumus." },
    ],
  },
};
