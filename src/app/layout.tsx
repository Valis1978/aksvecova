import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ClientEffects } from "@/components/providers/ClientEffects";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0A1628",
};

export const metadata: Metadata = {
  title: "JUDr. Michaela Švecová — Advokátní kancelář Brno",
  description:
    "Profesionální právní služby v oblasti občanského, rodinného, obchodního a pracovního práva. Individuální přístup ke každému klientovi.",
  keywords: [
    "advokát Brno",
    "právník Brno",
    "advokátní kancelář",
    "rodinné právo",
    "občanské právo",
    "obchodní právo",
    "pracovní právo",
    "JUDr. Švecová",
    "právní poradenství",
    "rozvod Brno",
    "výživné",
  ],
  authors: [{ name: "JUDr. Michaela Švecová" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "JUDr. Michaela Švecová — Advokátní kancelář Brno",
    description:
      "Profesionální právní služby s individuálním přístupem ke každému klientovi.",
    locale: "cs_CZ",
    type: "website",
    url: "https://aksvecova.cz",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${inter.variable} ${cormorant.variable} font-body antialiased custom-cursor-active`}
      >
        <ClientEffects />
        <LenisProvider>
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
