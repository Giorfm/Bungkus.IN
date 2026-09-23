import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bungkus.in – Selamatkan Makanan, Hemat Uang",
  description:
    "Temukan makanan surplus berkualitas dari restoran & bakery terdekat dengan harga spesial. Selamatkan makanan, hemat uang!",
  keywords: ["surplus food", "diskon makanan", "bungkus", "food rescue", "hemat"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${plusJakartaSans.className} antialiased bg-bg min-h-screen`}>{children}</body>
    </html>
  );
}
