import type { Metadata } from "next";
import { Outfit, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Outfit for display headings - geometric, futuristic, bold
const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

// Manrope for body text - modern, clean, highly readable
const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

// JetBrains Mono for code/eyebrow text
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Fyndiax | Vertical Venture Architect",
  description:
    "Fyndiax is a vertical venture architect that turns real-world problems into AI-driven and green ventures, through deep partnerships with universities, research centres and corporates.",
  keywords: [
    "venture builder",
    "AI ventures",
    "green innovation",
    "startup ecosystem",
    "Italy UK",
    "thematic innovation",
  ],
  authors: [{ name: "Fyndiax" }],
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Fyndiax | Vertical Venture Architect",
    description:
      "Building the future of thematic innovation. From scientific insight to market-ready ventures.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fyndiax | Vertical Venture Architect",
    description:
      "Building the future of thematic innovation. From scientific insight to market-ready ventures.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${manrope.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
