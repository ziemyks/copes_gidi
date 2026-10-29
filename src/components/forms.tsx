"use client";

import { useActionState } from "react";
import { sendGuideApplication, type FormState } from "@/app/actions";
import { regions } from "@/data/regions";

const initial: FormState = { status: "idle" };

const inputClass = "field";

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
      <span className="mb-2 block text-[0.8125rem] font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-vermilion">{error}</span>}
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
    <div className="rounded-lg border border-rule bg-paper-deep p-6">
      <p className="eyebrow mb-2 text-patina-deep">Nosūtīts</p>
      <p className="title">Paldies — pieteikums ir ceļā.</p>
      <p className="mt-2 text-sm text-muted">{message}</p>
    </div>
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
      {state.message && <p className="text-sm text-vermilion sm:col-span-2">{state.message}</p>}
      <div className="sm:col-span-2">
        <button
          disabled={pending}
          className="btn btn-primary"
        >
          {pending ? "Sūta…" : "Pieteikties"}
        </button>
      </div>
    </form>
  );
}
