import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucky Patil — AI Engineer & Full Stack Developer",
  description:
    "Portfolio of Lucky Patil — AI Engineer, Full Stack Developer, and Agentic AI Builder. Building intelligent systems that ship.",
  metadataBase: new URL("https://luckypatil.dev"),
  openGraph: {
    title: "Lucky Patil — AI Engineer & Full Stack Developer",
    description: "AI Engineer · Full Stack Developer · Agentic AI Builder",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${interTight.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="font-body antialiased">
        <div className="noise" aria-hidden="true" />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
