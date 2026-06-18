import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mukta Game & Development",
  description: "A Blender + Unity powered studio crafting games, AR/VR apps, simulations, and interactive 3D experiences."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="showcase-shell">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
