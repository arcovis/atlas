import { app } from "@/lib/config"; 
import type { Metadata } from "next";
import {
  Cinzel,
  Cormorant_Garamond,
  Inter,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: app.name,
  description: app.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="relative flex h-dvh flex-col overflow-hidden bg-[#050706]">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            backgroundImage: "url('/images/background.png')",
            backgroundRepeat: "repeat",
            backgroundPosition: "center center",
            backgroundSize: "640px 640px",
            backgroundAttachment: "fixed",
            filter: "brightness(1.08) contrast(1.04) saturate(1.03)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(69,76,39,0.18),transparent_36%),radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.48)_100%),linear-gradient(180deg,rgba(5,7,6,0.34),rgba(5,7,6,0.30))]"
        />
        <div className="relative z-20 flex h-full min-h-0 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
