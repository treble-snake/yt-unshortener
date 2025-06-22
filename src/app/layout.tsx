import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {Analytics} from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YouTube URL UnShortener",
  description: "To share YouTube shorts as normal videos",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{height: '100%', padding: 0, margin: 0}}>
    <body style={{height: '100%', padding: 0, margin: 0}}
          className={`${geistSans.variable} ${geistMono.variable}`}>
    {children}
    <Analytics/>
    </body>
    </html>
  );
}
