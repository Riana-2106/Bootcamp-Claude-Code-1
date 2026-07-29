import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Papan Tugas Kantor",
  description: "Pengganti tugas yang terkubur di grup WhatsApp — satu papan, semua orang lihat status yang sama.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
