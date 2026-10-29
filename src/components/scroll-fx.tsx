"use client";

import { useEffect } from "react";

/**
 * Ritināšanas efekti, ko vada data-atribūti lapas HTML:
 *  data-reveal   — parādās, kad nonāk skatā
 *  data-speed    — paralakse (piem. "0.15"), mēra pēc vecākelementa
 *  data-progress — iestata --progress (0–1) laika līnijai
 *  data-step     — saņem .is-active, kad šķērso ekrāna vidu
 * Kopējo ritināšanas progresu ieliek html --scroll (loma metram).
 */
export function ScrollFx() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    function still() {
      return root.dataset.motion === "off" || matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function update() {
      frame = 0;
      const vh = window.innerHeight;
      const max = root.scrollHeight - vh;
      root.style.setProperty("--scroll", String(max > 0 ? Math.min(1, window.scrollY / max) : 0));

      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-in");
      });

      const calm = still() || window.innerWidth < 640;
      document.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
        const box = (el.parentElement ?? el).getBoundingClientRect();
        const raw = (box.top + box.height / 2 - vh / 2) * Number(el.dataset.speed);
        const offset = Math.max(-120, Math.min(120, raw));
        el.style.translate = calm ? "" : `0 ${(-offset).toFixed(1)}px`;
      });

      document.querySelectorAll<HTMLElement>("[data-progress]").forEach((el) => {
        const box = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.55 - box.top) / box.height));
        el.style.setProperty("--progress", p.toFixed(3));
      });

      document.querySelectorAll<HTMLElement>("[data-step]").forEach((el) => {
        el.classList.toggle("is-active", el.getBoundingClientRect().top < vh * 0.6);
      });
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    // Pēc klienta navigācijas parādās jauni elementi
    let pending = 0;
    const mutations = new MutationObserver(() => {
      clearTimeout(pending);
      pending = window.setTimeout(schedule, 60);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      mutations.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(pending);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
