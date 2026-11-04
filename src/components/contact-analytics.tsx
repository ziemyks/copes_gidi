"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/** Event payloads contain catalog identifiers, never contact details or message contents. */
export function ContactAnalytics() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[data-guide][data-contact-type]")
        : null;
      if (!link) return;
      track("guide_contact", {
        guide: link.dataset.guide,
        channel: link.dataset.contactType,
        path: window.location.pathname,
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
