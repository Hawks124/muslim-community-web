import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SallyAIChat from "@/components/SallyAIChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: "Muslim Community | IRA - Islam Réuni et Actif",
  description:
    "Connectez-vous avec des musulmans du monde entier, accédez à des ressources islamiques authentiques et renforcez votre foi grâce à notre communauté mondiale.",
  keywords: [
    "islam",
    "muslim community",
    "islamic resources",
    "muslim app",
    "quran",
    "hadith",
    "prayer times",
    "islamic community",
  ],
  authors: [{ name: "RiRi Enterprise" }],
  creator: "RiRi Enterprise",
  publisher: "RiRi Enterprise",
  applicationName: "Muslim Community",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://muslimcommunity.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "fr-FR": "/fr-FR",
      "ar-SA": "/ar-SA",
      "mg-MG": "/mg-MG",
    },
  },
  openGraph: {
    title: "Muslim Community | IRA - Islam Réuni et Actif",
    description:
      "Connectez-vous avec des musulmans du monde entier, accédez à des ressources islamiques authentiques et renforcez votre foi.",
    url: "https://muslimcommunity.app",
    siteName: "Muslim Community",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Muslim Community App",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muslim Community | IRA - Islam Réuni et Actif",
    description:
      "Connectez-vous avec des musulmans du monde entier, accédez à des ressources islamiques authentiques et renforcez votre foi.",
    images: ["/twitter-image.jpg"],
    creator: "@muslimcommunity",
    site: "@muslimcommunity",
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
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/manifest.json",
  category: "religion",
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  appleWebApp: {
    title: "Muslim Community",
    statusBarStyle: "black-translucent",
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        {/* Additional structured data for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Muslim Community",
              applicationCategory: "ReligiousApp",
              operatingSystem: "Android, iOS",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "50000",
              },
              description:
                "Connectez-vous avec des musulmans du monde entier, accédez à des ressources islamiques authentiques et renforcez votre foi.",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
