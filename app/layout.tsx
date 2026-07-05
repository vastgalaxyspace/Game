import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { SplashScreen } from "@/components/SplashScreen";

export const metadata: Metadata = {
  title: "Mukta Game & Development",
  description: "A Blender + Unity powered studio crafting games, AR/VR apps, simulations, and interactive 3D experiences.",
  icons: {
    icon: "/mukta logo-trans.png",
  },
  openGraph: {
    title: "Mukta Game & Development",
    description: "A Blender + Unity powered studio crafting games, AR/VR apps, simulations, and interactive 3D experiences.",
    siteName: "Mukta Game & Development",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mukta Game & Development Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mukta Game & Development",
    description: "A Blender + Unity powered studio crafting games, AR/VR apps, simulations, and interactive 3D experiences.",
    images: ["/og-image.png"],
  },
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
        <div className="showcase-shell">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
