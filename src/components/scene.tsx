// Ilustrēta ainava, ko rāda, kamēr gidam vai braucienam nav īstas fotogrāfijas.

export type SceneVariant = "lake" | "river" | "forest" | "sea" | "ice";

type Palette = {
  sky: [string, string];
  sun: string;
  far: string;
  near: string;
  water: [string, string];
  shore?: string;
};

const palettes: Record<SceneVariant, Palette> = {
  lake: {
    sky: ["#9cc2c6", "#f4d9a9"],
    sun: "#fbe7bd",
    far: "#3c6168",
    near: "#1b3439",
    water: ["#4b8590", "#163840"],
  },
  river: {
    sky: ["#c4dccf", "#f2ead0"],
    sun: "#fff3d1",
    far: "#4d6f55",
    near: "#203a2b",
    water: ["#5b9590", "#1b4245"],
  },
  forest: {
    sky: ["#d9cfb5", "#f6eedc"],
    sun: "#fff1cf",
    far: "#5a6f4a",
    near: "#26392a",
    water: ["#4d7f73", "#1d3d38"],
    shore: "#c27a4c",
  },
  sea: {
    sky: ["#b4d3de", "#eef2ea"],
    sun: "#fff8e1",
    far: "#5d7f72",
    near: "#2b4a43",
    water: ["#4f93a6", "#173f4f"],
    shore: "#e4d1a3",
  },
  ice: {
    sky: ["#bccbd9", "#eef1f4"],
    sun: "#ffffff",
    far: "#6d8090",
    near: "#33444f",
    water: ["#f3f6f9", "#d6e1ea"],
  },
};

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function random(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function treeline(rand: () => number, base: number, minH: number, maxH: number) {
  let d = `M0 ${base}`;
  let x = -10;
  while (x < 810) {
    const w = 10 + rand() * 18;
    const h = minH + rand() * (maxH - minH);
    d += ` L${x.toFixed(1)} ${base} L${(x + w / 2).toFixed(1)} ${(base - h).toFixed(1)} L${(x + w).toFixed(1)} ${base}`;
    x += w * (0.55 + rand() * 0.35);
  }
  return `${d} L800 ${base} Z`;
}

export function Scene({
  variant,
  seed = variant,
  className = "",
}: {
  variant: SceneVariant;
  seed?: string;
  className?: string;
}) {
  const p = palettes[variant];
  const n = hash(seed + variant);
  const rand = random(n);
  const id = `s${n.toString(36)}`;
  const horizon = 300 + Math.round(rand() * 30);
  const sunX = 180 + Math.round(rand() * 440);
  const sunY = horizon - 70 - Math.round(rand() * 60);
  const far = treeline(rand, horizon, 25, 60);
  const near = treeline(rand, horizon + 4, 45, 105);
  const ripples = Array.from({ length: 9 }, () => ({
    x: rand() * 760,
    y: horizon + 20 + rand() * 170,
    w: 40 + rand() * 140,
  }));

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sky[0]} />
          <stop offset="1" stopColor={p.sky[1]} />
        </linearGradient>
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.water[0]} />
          <stop offset="1" stopColor={p.water[1]} />
        </linearGradient>
        <radialGradient id={`${id}-sun`}>
          <stop offset="0" stopColor={p.sun} stopOpacity="1" />
          <stop offset="1" stopColor={p.sun} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="500" fill={`url(#${id}-sky)`} />
      <circle cx={sunX} cy={sunY} r="120" fill={`url(#${id}-sun)`} />
      <circle cx={sunX} cy={sunY} r="28" fill={p.sun} opacity="0.9" />

      <path d={far} fill={p.far} opacity="0.75" />
      {variant === "forest" && p.shore && (
        <path
          d={`M420 ${horizon + 6} C 470 ${horizon - 60}, 560 ${horizon - 80}, 640 ${horizon - 70} L 800 ${horizon - 75} L800 ${horizon + 6} Z`}
          fill={p.shore}
        />
      )}
      <path d={near} fill={p.near} />

      <rect y={horizon} width="800" height={500 - horizon} fill={`url(#${id}-water)`} />
      {variant === "sea" && p.shore && (
        <path
          d={`M0 500 L0 ${horizon + 120} C 200 ${horizon + 100}, 380 ${horizon + 150}, 520 500 Z`}
          fill={p.shore}
        />
      )}

      {variant !== "ice" &&
        ripples.map((r, i) => (
          <rect
            key={i}
            x={r.x}
            y={r.y}
            width={r.w}
            height="2"
            rx="1"
            fill="#ffffff"
            opacity={0.12 + (i % 3) * 0.05}
          />
        ))}

      {variant === "lake" && (
        <g fill={p.near}>
          <path d={`M${sunX - 40} ${horizon + 70} q 60 18 120 0 l -14 14 q -46 10 -92 0 Z`} />
          <rect x={sunX + 10} y={horizon + 30} width="2" height="42" />
          <path d={`M${sunX + 12} ${horizon + 30} q 70 10 110 70`} stroke={p.near} strokeWidth="1" fill="none" />
          {Array.from({ length: 22 }, (_, i) => (
            <path
              key={i}
              d={`M${600 + i * 9} 500 q ${4 + (i % 3) * 3} -${70 + (i % 5) * 18} ${-6 + (i % 4) * 5} -${110 + (i % 6) * 20}`}
              stroke={p.near}
              strokeWidth="3"
              fill="none"
            />
          ))}
        </g>
      )}

      {(variant === "river" || variant === "forest") && (
        <g fill={p.near} opacity="0.9">
          <ellipse cx="90" cy="470" rx="90" ry="30" />
          <ellipse cx="200" cy="490" rx="70" ry="22" />
          <ellipse cx="720" cy="480" rx="110" ry="34" />
        </g>
      )}

      {variant === "sea" && (
        <g fill="#3a4a4a" opacity="0.85">
          <ellipse cx="610" cy="440" rx="40" ry="16" />
          <ellipse cx="690" cy="465" rx="55" ry="20" />
          <ellipse cx="560" cy="480" rx="28" ry="11" />
        </g>
      )}

      {variant === "ice" && (
        <g>
          <ellipse cx={sunX} cy={horizon + 120} rx="34" ry="10" fill="#28404d" />
          <path d={`M${sunX + 70} ${horizon + 120} l 40 -60 l 40 60 Z`} fill="#c0503a" />
          <path d={`M${sunX + 110} ${horizon + 60} l 0 60`} stroke="#8a3626" strokeWidth="2" />
          <ellipse cx={sunX - 160} cy={horizon + 80} rx="18" ry="5" fill="#28404d" opacity="0.7" />
          <ellipse cx={sunX + 240} cy={horizon + 160} rx="22" ry="6" fill="#28404d" opacity="0.8" />
        </g>
      )}
    </svg>
  );
}
