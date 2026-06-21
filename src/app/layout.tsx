import type { Metadata } from "next";
import { Barlow_Condensed, Inter, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Denizli Radar | Denizli'nin Haber Merkezi",
    template: "%s | Denizli Radar",
  },
  description:
    "Denizli ve çevresinden güncel haberler, son dakika gelişmeleri, spor, ekonomi ve yaşam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${barlowCondensed.variable} ${sourceSerif.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
