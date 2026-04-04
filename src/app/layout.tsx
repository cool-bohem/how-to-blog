import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "쉽게 따라하는 방법 블로그",
    template: "%s | 쉽게 따라하는 방법 블로그",
  },
  description: "스마트폰, 앱, 생활 민원까지 — 누구나 따라할 수 있는 방법 안내",
  verification: {
    google: "Z811HVEFc0wJVNqVXsoIOtJZSc8fTG4sUOtjYeEH0es",
    other: {
      "naver-site-verification": "f71e3f5841f4326a6453bcc664ff77d8a70bd996",
    },
  },
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
      <body className="bg-gray-50 text-gray-800 min-h-screen">
        <header className="bg-white border-b shadow-sm sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">
              쉽게 따라하기
            </Link>
            <p className="text-sm text-gray-400 hidden sm:block">누구나 따라할 수 있는 방법 안내</p>
          </div>
          <nav className="max-w-5xl mx-auto px-6 pb-3 flex gap-4 overflow-x-auto">
            <Link href="/category/smartphone" className="text-sm text-gray-600 hover:text-blue-600 whitespace-nowrap">📱 스마트폰</Link>
            <Link href="/category/app" className="text-sm text-gray-600 hover:text-blue-600 whitespace-nowrap">💬 앱 서비스</Link>
            <Link href="/category/pc" className="text-sm text-gray-600 hover:text-blue-600 whitespace-nowrap">💻 PC·윈도우</Link>
            <Link href="/category/life" className="text-sm text-gray-600 hover:text-blue-600 whitespace-nowrap">🏛️ 생활 민원</Link>
          </nav>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>
        <footer className="border-t bg-white text-center text-sm text-gray-400 py-8 mt-12">
          © 2026 쉽게 따라하기
        </footer>
      </body>
    </html>
  );
}
