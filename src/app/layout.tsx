import { Toaster } from "@/components/ui/toaster";
import Providers from "@/privders";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Dev Resources | Developer Resources Hub",
  description:
    "Every resource you need as a developer to get started. Find curated tools, guides, and learning materials to accelerate your development journey.",
  keywords: [
    "Dev Resources",
    "Developer Resources",
    "Programming Resources",
    "Coding Resources",
    "Developer Tools",
    "Programming Tools",
    "Web Development Resources",
    "Software Development Resources",
    "Developer Learning Resources",
    "Code Learning Materials",
    "Programming Learning Resources",
    "Developer Documentation",
    "Development Guides",
    "Programming Tutorials",
    "Tech Stack Resources",
  ],
  icons: [
    {
      url: "/apple-touch-icon.png",
      type: "image/png",
      rel: "apple-touch-icon",
    },
    {
      sizes: "16x16",
      url: "/favicon-16x16.png",
      type: "image/png",
      rel: "icon",
    },
    {
      sizes: "32x32",
      url: "/favicon-32x32.png",
      type: "image/png",
      rel: "icon",
    },
  ],
  openGraph: {
    title: "Dev Resources | Developer Resources Hub",
    description:
      "Every resource you need as a developer to get started. Find curated tools, guides, and learning materials to accelerate your development journey.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        height: 630,
        width: 1200,
        alt: "Dev Resources - Your Complete Developer Resource Hub",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
