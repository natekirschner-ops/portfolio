import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const thicccboi = localFont({
  src: [
    {
      path: "../../public/fonts/thicccboi/THICCCBOI-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/thicccboi/THICCCBOI-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/thicccboi/THICCCBOI-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/thicccboi/THICCCBOI-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/thicccboi/THICCCBOI-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/thicccboi/THICCCBOI-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/thicccboi/THICCCBOI-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/thicccboi/THICCCBOI-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-thicccboi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nathankirschner.com"),
  title: "NATHAN KIRSCHNER ▿ inspire. design. experience.",
  description:
    "Multi-disciplinary designer guided by curiosity, intuition, and that initial spark igniting a voyage into the unknown.",
  keywords: [
    "Nathan Kirschner",
    "Creative Technologist",
    "Multi-disciplinary Designer",
    "Digital Design",
    "Product Strategy",
    "Creative Direction",
    "UX Design",
    "Experience Design",
    "Creative Portfolio",
  ],
  authors: [{ name: "Nathan Kirschner" }],
  creator: "Nathan Kirschner",
  publisher: "Nathan Kirschner",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "NATHAN KIRSCHNER ▿ inspire. design. experience.",
    description:
      "Multi-disciplinary designer guided by curiosity, intuition, and that initial spark igniting a voyage into the unknown.",
    url: "https://nathankirschner.com",
    siteName: "Nathan Kirschner Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Add your social media preview image here
        width: 1200,
        height: 630,
        alt: "NATHAN KIRSCHNER ▿ inspire. design. experience.",
      },
    ],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${thicccboi.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
