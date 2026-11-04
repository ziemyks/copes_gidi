import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Archivo, Space_Grotesk, Space_Mono } from "next/font/google";
import { Chrome } from "@/components/chrome";
import { ScrollFx } from "@/components/scroll-fx";
import { ContactAnalytics } from "@/components/contact-analytics";
import { JsonLd } from "@/components/seo";
import { SiteFooter } from "@/components/site-footer";
import { isPreviewDeployment, site, siteUrl } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import { Suspense } from "react";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin", "latin-ext"],
  preload: false,
});

const spaceMono = Space_Mono({
  variable: "--font-spacemono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${site.name} — makšķerēšanas gidi Latvijā`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  robots: isPreviewDeployment() ? { index: false, follow: true } : undefined,
  openGraph: {
    type: "website",
    locale: "lv_LV",
    siteName: site.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="lv"
      suppressHydrationWarning
      className={`${archivo.variable} ${grotesk.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.dataset.js="1"' }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={[
          {
            "@type": "Organization", "@id": `${absoluteUrl()}#publisher`,
            name: site.name, url: absoluteUrl(), email: site.email,
          },
          {
            "@type": "WebSite", "@id": `${absoluteUrl()}#website`,
            name: site.name, url: absoluteUrl(), inLanguage: "lv",
            publisher: { "@id": `${absoluteUrl()}#publisher` },
          },
        ]} />
        <Chrome />
        <ScrollFx />
        <ContactAnalytics />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {/* Analytics lasa URL parametrus, tāpēc ar Cache Components tam vajag Suspense robežu */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
