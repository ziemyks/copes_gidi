import { socialImage } from "@/lib/social-image";
import { notFound } from "next/navigation";

export async function GET(_request: Request, { params }: RouteContext<"/[lang]/opengraph-image">) {
  const { lang } = await params;
  if (lang !== "lv" && lang !== "en") notFound();
  return socialImage(lang);
}
