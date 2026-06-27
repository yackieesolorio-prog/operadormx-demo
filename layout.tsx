import type { Metadata } from "next";
import { Inter, Barlow_Semi_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const display = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "OperadorMX — Tu ruta segura",
  description: "Seguridad en tiempo real para operadores de transporte de carga en México.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans antialiased bg-ink text-[#EAF1F8]">{children}</body>
    </html>
  );
}
