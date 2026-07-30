import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Papan Status Tim",
  description: "Satu layar untuk lihat status kerja semua anggota tim, tanpa perlu login.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
