import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <Container className="py-32 text-center">
        <p className="font-display text-7xl font-semibold text-water">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold">Šī zivs aizpeldēja.</h1>
        <p className="mt-2 text-muted">Lapa netika atrasta.</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-amber px-6 py-3 font-semibold text-white hover:bg-amber-dark"
        >
          Uz sākumu
        </Link>
      </Container>
    </>
  );
}
