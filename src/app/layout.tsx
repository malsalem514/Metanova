import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://metanova.ca"),
  title: {
    default: "Metanova \u2014 Structural Engineering & Development",
    template: "%s | Metanova",
  },
  description:
    "Structural engineering, real estate development and project management across Quebec.",
  keywords: [
    "structural engineering",
    "real estate development",
    "project management",
    "Quebec",
    "construction",
    "Metanova",
  ],
  icons: {
    icon: "/icon.png",
    apple: "/metanova-assets/brand/apple-touch-icon.png",
  },
  verification: {
    google: "jot-fYY2JvuIwlAKimmaWYFbHB99hDM4TtTXOz7Ckgw",
  },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    siteName: "Metanova",
    images: [
      {
        url: "/metanova-assets/hero/construction-leadership.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cn(
        "h-full antialiased",
        plusJakartaSans.variable,
        ibmPlexMono.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
