import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() { return [{ missing: ["not-found"] }]; }
export function generateMetadata() {
  return pageMetadata({ title: "Lapa netika atrasta.", description: "Šī zivs aizpeldēja.", path: "/", noindex: true });
}
export default function MissingPage() { notFound(); }
