import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SariAssist",
  description: "Ang POS ng bawat tindahan",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SariAssist",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E8A82",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fil" className={`${inter.variable} h-full`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        {/* Splash gate — runs BEFORE React hydrates so the splash only shows on cold launch (once per browser tab session). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){try{
  if(!sessionStorage.getItem('tinda-splash-shown')){
    document.documentElement.classList.add('splash-active');
    sessionStorage.setItem('tinda-splash-shown','1');
    setTimeout(function(){document.documentElement.classList.add('splash-fading');},1700);
    setTimeout(function(){document.documentElement.classList.remove('splash-active','splash-fading');},2200);
  }
}catch(e){}})();
`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js');})}`,
          }}
        />
      </head>
      <body className="h-full antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
