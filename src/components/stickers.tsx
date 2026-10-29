// Uzlīmes (SVG) ar baltu kontūru — tiek liktas virsrakstos burtu vietā

type Props = { className?: string };

const outline = { stroke: "#f4f4f4", strokeWidth: 7, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** Pludiņš — oranža augšdaļa, balta apakšdaļa */
export function Bobber({ className }: Props) {
  return (
    <svg viewBox="0 0 100 110" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="bob-top" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ff9a6c" />
          <stop offset="0.55" stopColor="#ec5b2a" />
          <stop offset="1" stopColor="#9c3010" />
        </radialGradient>
        <radialGradient id="bob-bottom" cx="35%" cy="20%" r="80%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#a9a9a9" />
        </radialGradient>
      </defs>
      <g {...outline} fill="#f4f4f4">
        <rect x="45" y="4" width="10" height="34" rx="5" />
        <circle cx="50" cy="62" r="32" />
        <rect x="45" y="88" width="10" height="18" rx="5" />
      </g>
      <rect x="46.5" y="6" width="7" height="32" rx="3.5" fill="#ec5b2a" />
      <rect x="46.5" y="6" width="7" height="9" rx="3.5" fill="#f4f4f4" />
      <rect x="46.5" y="88" width="7" height="16" rx="3.5" fill="#3a3a3a" />
      <path d="M18 62 A32 32 0 0 1 82 62 Z" fill="url(#bob-top)" />
      <path d="M18 62 A32 32 0 0 0 82 62 Z" fill="url(#bob-bottom)" />
      <rect x="18" y="59" width="64" height="6" fill="#1b1b1b" />
      <ellipse cx="38" cy="44" rx="10" ry="6" fill="#ffffff" opacity="0.55" transform="rotate(-30 38 44)" />
    </svg>
  );
}

/** Apaļa multfilmu zivs */
export function Fish({ className }: Props) {
  return (
    <svg viewBox="0 0 130 90" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="fish-body" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#ff9a6c" />
          <stop offset="0.6" stopColor="#ec5b2a" />
          <stop offset="1" stopColor="#8f2c0d" />
        </radialGradient>
        <linearGradient id="fish-fin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2f2f2" />
          <stop offset="1" stopColor="#9a9a9a" />
        </linearGradient>
      </defs>
      <path
        d="M12 45 C26 14 74 8 96 36 L120 16 L114 45 L120 74 L96 54 C74 82 26 76 12 45 Z"
        fill="#f4f4f4"
        {...outline}
      />
      <path d="M50 18 C58 2 76 4 82 20 Z" fill="url(#fish-fin)" />
      <path d="M12 45 C26 14 74 8 96 36 L120 16 L114 45 L120 74 L96 54 C74 82 26 76 12 45 Z" fill="url(#fish-body)" />
      <path d="M20 50 C38 66 72 66 92 50 C72 58 38 58 20 50 Z" fill="#ffffff" opacity="0.85" />
      <path d="M60 30 q6 8 0 16 M70 30 q6 8 0 16 M80 32 q5 7 0 14" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="34" cy="38" r="10" fill="#ffffff" stroke="#1b1b1b" strokeWidth="2.5" />
      <circle cx="36" cy="39" r="4.5" fill="#0a0a0a" />
      <circle cx="33" cy="35" r="2" fill="#ffffff" />
      <path d="M14 48 q5 3 10 1" stroke="#1b1b1b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Āķis ar oranžu pērlīti */
export function Hook({ className }: Props) {
  const d = "M58 14 L58 66 C58 92 24 92 24 68 L32 60";
  return (
    <svg viewBox="0 0 90 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hook-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#9d9d9d" />
          <stop offset="1" stopColor="#4a4a4a" />
        </linearGradient>
      </defs>
      <circle cx="58" cy="10" r="7" fill="none" stroke="#f4f4f4" strokeWidth="13" />
      <path d={d} fill="none" stroke="#f4f4f4" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="58" cy="10" r="7" fill="none" stroke="url(#hook-metal)" strokeWidth="4" />
      <path d={d} fill="none" stroke="url(#hook-metal)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 68 L18 56 L28 62 Z" fill="#7a7a7a" stroke="#f4f4f4" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="58" cy="30" r="8" fill="#ec5b2a" stroke="#f4f4f4" strokeWidth="3" />
      <circle cx="55" cy="27" r="2.5" fill="#ffffff" opacity="0.7" />
    </svg>
  );
}

/** Voblers ar diviem trišu āķiem */
export function Lure({ className }: Props) {
  return (
    <svg viewBox="0 0 150 90" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lure-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ec5b2a" />
          <stop offset="0.5" stopColor="#f28a5e" />
          <stop offset="0.55" stopColor="#efefef" />
          <stop offset="1" stopColor="#a5a5a5" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="#f4f4f4" strokeWidth="9" strokeLinecap="round">
        <path d="M55 58 v14 M47 80 q8 6 16 0 M100 56 v14 M92 78 q8 6 16 0" />
      </g>
      <path d="M8 40 C20 20 92 14 130 32 C140 37 140 47 130 52 C92 70 20 62 8 40 Z" fill="#f4f4f4" {...outline} />
      <path d="M2 44 L14 34 L18 50 Z" fill="#cfd8dc" opacity="0.8" stroke="#f4f4f4" strokeWidth="3" strokeLinejoin="round" />
      <path d="M8 40 C20 20 92 14 130 32 C140 37 140 47 130 52 C92 70 20 62 8 40 Z" fill="url(#lure-body)" />
      <path d="M40 30 L70 26 M50 36 L90 32" stroke="#1b1b1b" strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
      <circle cx="28" cy="38" r="7" fill="#ffffff" stroke="#1b1b1b" strokeWidth="2" />
      <circle cx="29" cy="38" r="3.2" fill="#0a0a0a" />
      <g fill="none" stroke="#6b6b6b" strokeWidth="3" strokeLinecap="round">
        <path d="M55 58 v14 M47 80 q8 6 16 0 M55 72 v8 M100 56 v14 M92 78 q8 6 16 0 M100 70 v8" />
      </g>
    </svg>
  );
}

/** Četrstaru dzirkstele */
export function Sparkle({ className }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M50 0 C54 38 62 46 100 50 C62 54 54 62 50 100 C46 62 38 54 0 50 C38 46 46 38 50 0 Z" fill="currentColor" />
    </svg>
  );
}
