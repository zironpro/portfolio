import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#4D11A8" },
    { media: "(prefers-color-scheme: dark)", color: "#4D11A8" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://zironpro.ae"
  ),
  title: {
    default: "Ziron Pro — Work That Speaks Before We Do | Digital Agency",
    template: "%s | Ziron Pro",
  },
  description:
    "Ziron Pro is a premier creative and digital agency in UAE. We deliver high-performance websites, iconic brand identities, commercial video production, #1 Google & AI search rankings (SEO & GEO), verified customer acquisition funnels, and precision printing.",
  applicationName: "Ziron Pro",
  authors: [{ name: "Ziron Pro", url: "https://zironpro.ae" }],
  creator: "Ziron Pro",
  publisher: "Ziron Pro",
  keywords: [
    "Ziron Pro",
    "Digital Agency UAE",
    "Web Design Dubai",
    "Web Development UAE",
    "Branding Agency UAE",
    "Brand Identity Design",
    "Commercial Video Production",
    "SEO Agency Dubai",
    "GEO AI Search Optimization",
    "Lead Generation UAE",
    "Printing Services UAE",
    "Performance Marketing Dubai",
  ],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://zironpro.ae",
    siteName: "Ziron Pro",
    title: "Ziron Pro — Work That Speaks Before We Do",
    description:
      "Premier digital & creative agency. Websites, Brand Identities, Video Production, Google & AI Search Ranking (SEO & GEO), Verified Leads, and Quality Printing.",
    images: [
      {
        url: "/logo/logo-main.png",
        width: 1200,
        height: 630,
        alt: "Ziron Pro — Creative & Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziron Pro — Work That Speaks Before We Do",
    description:
      "High-performance websites, iconic brand identities, commercial video, SEO & GEO AI visibility, lead generation, and quality printing.",
    images: ["/logo/logo-main.png"],
    creator: "@zironpro",
  },
  alternates: {
    canonical: "https://zironpro.ae",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
