import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <Container className="py-32">
        <p className="eyebrow">404</p>
        <h1 className="display mt-6">Šī zivs aizpeldēja.</h1>
        <p className="mt-4 text-lg text-muted">Lapa netika atrasta.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Uz sākumu
        </Link>
      </Container>
    </>
  );
}
