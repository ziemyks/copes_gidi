import type { Contacts, Source } from "@/data/types";

function formatPhone(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  const m = digits.match(/^\+371(\d{2})(\d{3})(\d{3})$/);
  return m ? `+371 ${m[1]} ${m[2]} ${m[3]}` : phone;
}

/** "2026-10-18" → "18.10.2026.", "2026-09" → "09.2026.", "2025" → "2025." */
export function formatDate(iso: string) {
  return `${iso.split("-").reverse().join(".")}.`;
}

const row = "flex items-center justify-between gap-4 rounded-2xl border border-white/10 px-4 py-3 transition hover:border-accent";

/** Tiešie kontakti no gida publiskā piedāvājuma — Copes Gidi nav starpnieks */
export function ContactPanel({ contacts, title = "Sazinies ar gidu tieši" }: { contacts: Contacts; title?: string }) {
  const links: { label: string; value: string; href: string }[] = [
    ...contacts.phones.map((p) => ({ label: "Tālrunis", value: formatPhone(p), href: `tel:${p.replace(/\s/g, "")}` })),
    ...(contacts.whatsapp
      ? [{ label: "WhatsApp", value: formatPhone(`+${contacts.whatsapp}`), href: `https://wa.me/${contacts.whatsapp}` }]
      : []),
    ...contacts.emails.map((e) => ({ label: "E-pasts", value: e, href: `mailto:${e}` })),
    ...(contacts.website ? [{ label: "Mājaslapa", value: hostOf(contacts.website), href: contacts.website }] : []),
    ...(contacts.facebook ? [{ label: "Facebook", value: "Atvērt profilu", href: contacts.facebook }] : []),
    ...(contacts.instagram ? [{ label: "Instagram", value: "Atvērt profilu", href: contacts.instagram }] : []),
    ...(contacts.youtube ? [{ label: "YouTube", value: "Atvērt kanālu", href: contacts.youtube }] : []),
    ...(contacts.tiktok ? [{ label: "TikTok", value: "Atvērt profilu", href: contacts.tiktok }] : []),
  ];

  return (
    <div className="card p-6 shadow-lift-1">
      <h2 className="title text-xl">{title}</h2>
      <p className="mb-5 mt-1 text-sm text-muted">
        Copes Gidi nav starpnieks: rezervē, apmaksā un precizē noteikumus tieši ar gidu.
      </p>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className={row}
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="eyebrow">{l.label}</span>
              <span className="truncate text-right text-sm font-medium text-ink">{l.value}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function SourceList({ sources, checked }: { sources: Source[]; checked: string }) {
  return (
    <section className="border-t border-rule pt-10">
      <p className="eyebrow mb-2">Avoti</p>
      <p className="mb-5 text-sm text-muted">Publiskie avoti pārbaudīti {formatDate(checked)}</p>
      <ol className="space-y-2">
        {sources.map((s, i) => (
          <li key={`${i}-${s.url}`} className="flex gap-3 text-sm">
            <span className="slashed font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="min-w-0">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="link break-words">
                {s.title}
              </a>
              {s.supports && <span className="block text-xs text-muted">{s.supports}</span>}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function PublicDataNotice({ checked }: { checked: string }) {
  return (
    <p className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs leading-relaxed text-muted">
      Informācija apkopota no gida publiskajiem avotiem un pārbaudīta {formatDate(checked)}. Copes Gidi ar gidu nav
      sazinājies un neapstiprina pieejamību, gala cenu, PVN vai atcelšanas noteikumus — precizē tos pirms rezervācijas.
    </p>
  );
}
