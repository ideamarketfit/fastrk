import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { HreflangTags } from '@/components/hreflang-tags';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Import the translations
import common from '@/public/locales/en/common.json';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: common.metaTitle,
  description: common.metaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <HreflangTags />
        <script
          defer
          data-domain="chatdiagram.com"
          src="https://plausible.io/js/script.file-downloads.outbound-links.js"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
