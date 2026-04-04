import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "쉽게 따라하는 방법 블로그",
    template: "%s | 쉽게 따라하는 방법 블로그",
  },
  description: "스마트폰, 앱, 생활 민원까지 — 누구나 따라할 수 있는 방법 안내",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="bg-white text-gray-800 min-h-screen">
        <header className="border-b px-6 py-4">
          <a href="/" className="text-xl font-bold text-blue-600">
            쉽게 따라하기
          </a>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t text-center text-sm text-gray-400 py-6 mt-12">
          © 2024 쉽게 따라하기
        </footer>
      </body>
    </html>
  );
}
