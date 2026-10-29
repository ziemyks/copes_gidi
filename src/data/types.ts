import type { SceneVariant } from "@/components/scene";

/** Publisks avots, no kura ņemts fakts */
export type Source = {
  url: string;
  title: string;
  /** Ko šis avots apliecina */
  supports?: string;
};

/** Apgalvojums par gidu ar avotu. selfClaimed = gida paša teiktais, nav neatkarīgi pārbaudīts */
export type Claim = {
  text: string;
  source: string;
  selfClaimed: boolean;
};

export type Boat = {
  owner?: string;
  model: string;
  motor?: string;
  electronics?: string[];
};

export type Person = {
  name: string;
  role?: string;
  phone?: string;
};

export type Contacts = {
  phones: string[];
  emails: string[];
  /** Tālrunis starptautiskā formātā bez "+" (wa.me saitei) */
  whatsapp?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
};

export type Review = {
  platform: string;
  rating?: number;
  count?: number;
  url: string;
  note?: string;
};

/** Neatkarīgs pieminējums (medijs, video, raidījums) — nav paša gida publicēts */
export type Mention = {
  title: string;
  outlet: string;
  date?: string;
  url: string;
};

/** Publiskās darbības pazīmes 2026. gadā */
export type Activity = {
  status: "redzama" | "neskaidra";
  /** Jaunākais datētais publiskais pierādījums: YYYY-MM-DD, YYYY-MM vai YYYY */
  lastSeen: string;
  note: string;
  url?: string;
};

export type GuideKind = "gids" | "komanda" | "organizators" | "kapteinis";

export type Guide = {
  slug: string;
  /** Profila ID izpētes datubāzē (E001…) */
  id: string;
  name: string;
  brand?: string;
  kind: GuideKind;
  people: Person[];
  region: string;
  base: string;
  waters: string[];
  species: string[];
  techniques: string[];
  audiences: string[];
  /** Tukšs saraksts = valodas nav publiski norādītas */
  languages: string[];
  maxAnglers?: number;
  tagline: string;
  summary: string;
  claims: Claim[];
  boats: Boat[];
  included: string[];
  notIncluded: string[];
  catchPolicy?: string;
  booking: string[];
  /** Logotips no gida mājaslapas (public/logos); bg — uz kāda fona tas ir paredzēts */
  logo?: { src: string; source: string; bg: "light" | "dark" };
  contacts: Contacts;
  /** Ja kontakti nav gida personīgie (piem. veikals), kontaktu bloka virsraksts to pasaka */
  contactTitle?: string;
  reviews: Review[];
  mentions: Mention[];
  activity: Activity;
  season?: string;
  company?: { name: string; regNo?: string; source?: string };
  /** Kas jāapstiprina pie gida pirms rezervācijas */
  caveats: string[];
  sources: Source[];
  /** Datums, kad publiskie avoti pārbaudīti (YYYY-MM-DD) */
  checked: string;
};

export type TripType = "laiva" | "krasts" | "musa" | "ledus" | "apmaciba";

export type PriceLine = {
  label: string;
  amount: number;
  /** "par braucienu", "no personas", "par stundu", "piemaksa", "no" (sākot no) */
  basis: string;
};

export type Trip = {
  slug: string;
  guide: string;
  title: string;
  summary: string;
  type: TripType;
  region: string;
  waters: string[];
  species: string[];
  hours?: number;
  durationNote?: string;
  maxGuests?: number;
  prices: PriceLine[];
  /** Zemākā publicētā cena — kartītēm un kārtošanai. Tukšs = cena pēc pieprasījuma */
  priceFrom?: number;
  /** Kam cena attiecas, piem. "par braucienu" vai "no personas" */
  priceBasis?: string;
  season?: string;
  included: string[];
  notIncluded: string[];
  notes: string[];
  source: string;
  scene: SceneVariant;
};
