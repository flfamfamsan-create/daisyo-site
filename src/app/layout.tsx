import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SiteDataProvider } from "@/lib/SiteDataContext";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  title: "株式会社 大翔工業 | 多摩地区の上下水道工事・土木工事",
  description:
    "東京都西多摩郡日の出町を拠点に、多摩地区で上下水道工事・土木工事を行う株式会社大翔工業。水漏れ修繕・配管工事・掘削工事など、まずはお気軽にご相談ください。",
  keywords:
    "上下水道工事,土木工事,水道工事,西多摩,日の出町,青梅市,あきる野市,羽村市,漏水修繕,配管工事",
  openGraph: {
    title: "株式会社 大翔工業 | 多摩地区の上下水道工事・土木工事",
    description:
      "東京都西多摩を拠点に、水道工事から土木工事まで。地域密着で丁寧に対応します。",
    type: "website",
    locale: "ja_JP",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1a3a5c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <SiteDataProvider>
          {children}
          {GA_ID && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
              />
              <Script id="gtag-init" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`}
              </Script>
            </>
          )}
        </SiteDataProvider>
      </body>
    </html>
  );
}
