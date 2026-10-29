"use server";

export type FormState = {
  status: "idle" | "ok" | "error";
  message?: string;
  errors?: Record<string, string>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim().slice(0, 4000);
}

/**
 * Nosūta e-pastu caur Resend, ja ir iestatīti RESEND_API_KEY un INQUIRY_TO_EMAIL.
 * Bez tiem pieprasījums tiek tikai ierakstīts servera žurnālā (ērti izstrādei).
 */
async function deliver(subject: string, lines: [string, string][], replyTo: string) {
  const body = lines.map(([k, v]) => `${k}: ${v || "—"}`).join("\n");
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;

  if (!apiKey || !to) {
    console.info(`[pieteikums] ${subject}\n${body}`);
    return true;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM_EMAIL ?? "Copes Gidi <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: replyTo,
      subject,
      text: body,
    }),
  });
  if (!res.ok) console.error("Resend kļūda", res.status, await res.text());
  return res.ok;
}

function validateContact(name: string, email: string) {
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Lūdzu, ievadi savu vārdu.";
  if (!emailPattern.test(email)) errors.email = "Lūdzu, ievadi derīgu e-pasta adresi.";
  return errors;
}

export async function sendGuideApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  if (text(formData, "company")) return { status: "ok" };

  const name = text(formData, "name");
  const email = text(formData, "email");
  const errors = validateContact(name, email);
  if (!text(formData, "waters")) errors.waters = "Norādi, kur tu vadi braucienus.";
  if (Object.keys(errors).length) return { status: "error", errors };

  const ok = await deliver(
    `Jauns gids: ${name}`,
    [
      ["Vārds", name],
      ["E-pasts", email],
      ["Tālrunis", text(formData, "phone")],
      ["Reģions", text(formData, "region")],
      ["Ūdeņi", text(formData, "waters")],
      ["Zivju sugas", text(formData, "species")],
      ["Pieredze (gadi)", text(formData, "years")],
      ["Mājaslapa / sociālie tīkli", text(formData, "website")],
      ["Par sevi", text(formData, "message")],
    ],
    email,
  );

  return ok
    ? { status: "ok", message: "Paldies! Mēs ar tevi sazināsimies dažu dienu laikā." }
    : { status: "error", message: "Neizdevās nosūtīt. Lūdzu, mēģini vēlreiz." };
}
