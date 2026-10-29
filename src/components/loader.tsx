// Ielādes ekrāns darbojas tikai ar CSS (globals.css) — pats pazūd pēc ~2 s,
// un vienā sesijā tiek rādīts tikai vienreiz (skat. skriptu layout.tsx).
export function Loader() {
  return (
    <div aria-hidden="true" className="loader fixed inset-0 z-[55] bg-[#d6d6d6] text-[#0a0a0a]">
      <div className="loader-fill absolute inset-y-0 left-0 bg-[#f4f4f4]" />
      <div className="absolute inset-x-6 bottom-8 flex items-end justify-between gap-6 sm:inset-x-12 sm:bottom-14">
        <p className="max-w-xl font-display text-sm font-medium uppercase leading-tight [font-variation-settings:'wdth'_110] sm:text-xl">
          FYI: mēs nemērām zivis ar roku atstatumu. Tikai ar lineālu.
        </p>
        <span className="loader-count slashed font-display text-6xl font-light tabular-nums [font-variation-settings:'wdth'_125] sm:text-8xl" />
      </div>
    </div>
  );
}

export const loaderScript = `(function(){var d=document.documentElement;d.dataset.js="1";try{if(sessionStorage.getItem("cg-loaded"))d.dataset.loaded="1";sessionStorage.setItem("cg-loaded","1")}catch(e){}})();`;
