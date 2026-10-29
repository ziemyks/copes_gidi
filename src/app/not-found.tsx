import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <Container className="pb-32 pt-40">
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
