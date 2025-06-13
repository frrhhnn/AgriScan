import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "AgriScan - Deteksi Penyakit Tanaman dengan AI",
  description:
    "Platform AI terdepan untuk deteksi penyakit tanaman. Bantu petani mengidentifikasi dan menangani penyakit tanaman dengan cepat dan akurat.",
  keywords: [
    "AI",
    "pertanian",
    "penyakit tanaman",
    "machine learning",
    "agritech",
    "AgriScan",
  ],
  authors: [{ name: "Tim CCIT-FTMM" }],
  manifest: "/manifest.json",
  themeColor: "#047857",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AgriScan",
  },
  openGraph: {
    title: "AgriScan - Deteksi Penyakit Tanaman dengan AI",
    description: "Platform AI terdepan untuk deteksi penyakit tanaman",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgriScan - Deteksi Penyakit Tanaman dengan AI",
    description: "Platform AI terdepan untuk deteksi penyakit tanaman",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="icon" href="favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#047857" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AgriScan" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="AgriScan" />
        <meta name="msapplication-TileColor" content="#047857" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
              {children}
            </div>
          </AuthProvider>
          <Toaster position="top-center" />
        </ThemeProvider>

        {/* Performance Optimization Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Register Service Worker
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').then(registration => {
                    console.log('SW registered:', registration);
                  }).catch(error => {
                    console.log('SW registration failed:', error);
                  });
                });
              }

              // Preload critical resources
              const preloadLinks = [
                '/fonts/inter.woff2',
                '/fonts/poppins.woff2'
              ];
              
              preloadLinks.forEach(href => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'font';
                link.type = 'font/woff2';
                link.crossOrigin = 'anonymous';
                link.href = href;
                document.head.appendChild(link);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
