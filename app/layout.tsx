import type { Metadata, Viewport } from "next";
import "./globals.css";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-bg min-h-screen">{children}</body>
    </html>
  );
}
