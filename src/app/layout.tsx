import type { Metadata } from "next";
import { Albert_Sans, Alumni_Sans, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const albert = Albert_Sans({
  variable: "--font-albert",
  subsets: ["latin", "latin-ext"],
});

const alumni = Alumni_Sans({
  variable: "--font-alumni",
  subsets: ["latin", "latin-ext"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${site.name} — makšķerēšanas gidi Latvijā`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
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
      className={`${albert.variable} ${alumni.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
