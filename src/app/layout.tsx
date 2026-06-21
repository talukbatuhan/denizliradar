import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
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
    <html lang="tr" className={`${inter.variable} ${sourceSerif.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
