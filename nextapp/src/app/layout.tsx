import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Patronato Cumbres de Santa Fe",
  description: "Transformando vidas a través del apoyo comunitario en Cumbres de Santa Fe",
  icons: [
    { rel: 'icon', url: '/favicon.ico?v=2' },
    { rel: 'icon', url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
  className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
>
  <NavBar />
  <div className="pt-28 md:pt-28">
    {children}
  </div>
  <Footer />
</body>
    </html>
  );
}