import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { SplashScreen } from "@/components/SplashScreen";
import { InteractiveLayer } from "@/components/interactive/InteractiveLayer";

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
        <SplashScreen />
        <InteractiveLayer />
        <div className="showcase-shell">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
