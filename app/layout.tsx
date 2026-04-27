import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LenisProvider } from "@/components/lenis-provider";
import { ScrollSpy } from "@/components/scroll-spy";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "PMS 2026 - Persatuan Mahasiswa Sakit",
  description:
    "Persatuan Mahasiswa Sakit - Komunitas mahasiswa yang penuh semangat, energi, dan kegembiraan!",
  icons: {
    icon: "/images/logo.png",
  },
};

export const viewport = {
  themeColor: "#0066CC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.className} ${outfit.variable} antialiased selection:bg-primary selection:text-white`}
      >
        <LenisProvider>
          <ScrollSpy />
          {children}
        </LenisProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
