"use client";

import { useActionState } from "react";
import { sendGuideApplication, sendInquiry, type FormState } from "@/app/actions";
import { regions } from "@/data/regions";

const initial: FormState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-water focus:ring-2 focus:ring-water/20";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  );
}

function Honeypot() {
  return (
    <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
  );
}

function Success({ message }: { message?: string }) {
  return (
    <div className="rounded-2xl bg-mist p-6 text-center">
      <p className="font-display text-xl font-semibold text-deep">Pieprasījums nosūtīts</p>
      <p className="mt-2 text-sm text-muted">{message}</p>
    </div>
  );
}

export function InquiryForm({
  tripSlug,
  guideSlug,
  maxGuests = 6,
}: {
  tripSlug?: string;
  guideSlug: string;
  maxGuests?: number;
}) {
  const [state, action, pending] = useActionState(sendInquiry, initial);

  if (state.status === "ok") return <Success message={state.message} />;

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="trip" value={tripSlug ?? ""} />
      <input type="hidden" name="guide" value={guideSlug} />
      <Honeypot />
      <Field label="Vārds" error={state.errors?.name}>
        <input name="name" required className={inputClass} autoComplete="name" />
      </Field>
      <Field label="E-pasts" error={state.errors?.email}>
        <input name="email" type="email" required className={inputClass} autoComplete="email" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Vēlamais datums">
          <input name="date" type="date" className={inputClass} />
        </Field>
        <Field label="Personas">
          <select name="guests" className={inputClass} defaultValue="2">
            {Array.from({ length: maxGuests }, (_, i) => (
              <option key={i + 1}>{i + 1}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Tālrunis (nav obligāti)">
        <input name="phone" type="tel" className={inputClass} autoComplete="tel" />
      </Field>
      <Field label="Ziņa gidam" error={state.errors?.message}>
        <textarea
          name="message"
          rows={4}
          required
          className={inputClass}
          placeholder="Pastāsti par savu pieredzi, vēlamajām zivīm un datumiem…"
        />
      </Field>
      {state.message && <p className="text-sm text-red-700">{state.message}</p>}
      <button
        disabled={pending}
        className="w-full rounded-full bg-amber px-6 py-3.5 font-semibold text-white transition hover:bg-amber-dark disabled:opacity-60"
      >
        {pending ? "Sūta…" : "Nosūtīt pieprasījumu"}
      </button>
      <p className="text-center text-xs text-muted">
        Bez maksas un bez saistībām. Maksā tikai pēc tam, kad gids apstiprina datumus.
      </p>
    </form>
  );
}

export function GuideApplicationForm() {
  const [state, action, pending] = useActionState(sendGuideApplication, initial);

  if (state.status === "ok") return <Success message={state.message} />;

  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <Honeypot />
      <Field label="Vārds, uzvārds" error={state.errors?.name}>
        <input name="name" required className={inputClass} autoComplete="name" />
      </Field>
      <Field label="E-pasts" error={state.errors?.email}>
        <input name="email" type="email" required className={inputClass} autoComplete="email" />
      </Field>
      <Field label="Tālrunis">
        <input name="phone" type="tel" className={inputClass} autoComplete="tel" />
      </Field>
      <Field label="Reģions">
        <select name="region" className={inputClass}>
          {regions.map((r) => (
            <option key={r.slug}>{r.name}</option>
          ))}
        </select>
      </Field>
      <Field label="Ūdeņi, kuros vadi braucienus" error={state.errors?.waters}>
        <input name="waters" required className={inputClass} placeholder="piem. Venta, Usmas ezers" />
      </Field>
      <Field label="Zivju sugas">
        <input name="species" className={inputClass} placeholder="piem. lasis, līdaka" />
      </Field>
      <Field label="Pieredze gida darbā (gadi)">
        <input name="years" type="number" min={0} className={inputClass} />
      </Field>
      <Field label="Mājaslapa vai Instagram">
        <input name="website" className={inputClass} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Pastāsti par sevi un saviem braucieniem">
          <textarea name="message" rows={5} className={inputClass} />
        </Field>
      </div>
      {state.message && <p className="text-sm text-red-700 sm:col-span-2">{state.message}</p>}
      <div className="sm:col-span-2">
        <button
          disabled={pending}
          className="rounded-full bg-amber px-8 py-3.5 font-semibold text-white transition hover:bg-amber-dark disabled:opacity-60"
        >
          {pending ? "Sūta…" : "Pieteikties"}
        </button>
      </div>
    </form>
  );
}
