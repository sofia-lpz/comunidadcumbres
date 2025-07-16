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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {/* Compensar el espacio del navbar fixed - h-28 cuando no scrolled, h-20 cuando scrolled */}
        <div className="pt-28 md:pt-28">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}