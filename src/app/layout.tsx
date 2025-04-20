import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeverReset - Loot Once, Trade Forever",
  description: "NeverReset - Loot Once, Trade Forever",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>NeverReset - Loot Once, Trade Forever</title>
        <meta name="description" content="NeverReset - Loot Once, Trade Forever" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <Navigation />
          <div className="pt-16">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
