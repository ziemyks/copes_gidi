import { getLocale, translate } from "@/i18n/server";
import { LocaleProvider } from "@/i18n/client";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Archivo, Space_Grotesk, Space_Mono } from "next/font/google";
import { Chrome } from "@/components/chrome";
import { ScrollFx } from "@/components/scroll-fx";
import { ContactAnalytics } from "@/components/contact-analytics";
import { JsonLd } from "@/components/seo";
import { SiteFooter } from "@/components/site-footer";
import { isPreviewDeployment, site, siteUrl } from "@/lib/site";
import { localizedPath } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";
import { Suspense } from "react";
import "../globals.css";

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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    metadataBase: new URL(siteUrl()),
    title: {
      default: translate(`${site.name} — makšķerēšanas gidi Latvijā`, locale),
      template: `%s · ${site.name}`,
    },
    description: translate(site.description, locale),
    robots: isPreviewDeployment() ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_GB" : "lv_LV",
      siteName: site.name,
      images: [{
        url: absoluteUrl(localizedPath("/opengraph-image", locale)),
        width: 1200, height: 630,
        alt: translate("Copes Gidi — makšķerēšanas gidi Latvijā", locale),
      }],
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
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
            name: site.name, url: absoluteUrl(), inLanguage: ["lv", "en"],
            publisher: { "@id": `${absoluteUrl()}#publisher` },
          },
        ]} />
        <LocaleProvider locale={locale}>
          <Chrome />
          <ScrollFx />
          <ContactAnalytics />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </LocaleProvider>
        {/* Analytics lasa URL parametrus, tāpēc ar Cache Components tam vajag Suspense robežu */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}

export function generateStaticParams() { return [{ lang: "lv" }, { lang: "en" }]; }
