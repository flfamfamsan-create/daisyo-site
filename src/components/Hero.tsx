"use client";

import { useEffect, useState } from "react";
import { useSiteData } from "@/lib/SiteDataContext";

export default function Hero() {
  const { data } = useSiteData();
  const { tel, nameShort } = data.company;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // 写真が暗い時は小さく・明るい時は大きく調整（0.6〜0.9推奨）
  const overlayOpacity = 0.78;

  const cls = (delay: string) =>
    `transition-opacity duration-500 ${delay} ${visible ? "opacity-100" : "opacity-0"}`;

  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      {/* 背景写真（スマホ/PCで画像切替） */}
      <picture>
        <source media="(max-width: 768px)" srcSet="/images/hero-mobile.jpg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-v2.jpg"
          alt="大翔工業 施工現場"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top md:object-center hero-bg-img"
        />
      </picture>

      {/* グラジエントオーバーレイ（overlayOpacityで明暗を調整） */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom,
            rgba(4,15,40,${overlayOpacity * 0.60}) 0%,
            rgba(5,22,52,${overlayOpacity * 0.45}) 25%,
            rgba(5,20,48,${overlayOpacity * 0.75}) 60%,
            rgba(2,8,25,${Math.min(overlayOpacity * 1.15, 1)}) 100%)`,
        }}
      />

      {/* アクセントライン */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />

      {/* コンテンツ */}
      <div className="relative z-10 px-5 pt-20 sm:pt-28 pb-6 sm:pb-10 max-w-screen-lg mx-auto w-full">
        <div className={cls("delay-[0ms]")}>
          <span className="inline-flex items-center gap-2 bg-sky-900/50 border border-sky-400/30 text-sky-200 text-xs font-bold px-3.5 py-1.5 mb-4 tracking-wider rounded-sm">
            <span className="w-1.5 h-1.5 bg-sky-400" />
            東京都 西多摩 地域密着
          </span>
        </div>

        <h1 className={`text-white font-black leading-tight tracking-wide mb-3 sm:mb-4 ${cls("delay-100")}`}>
          <span className="block text-3xl sm:text-4xl lg:text-5xl">あなたの暮らしと</span>
          <span className="block text-4xl sm:text-5xl lg:text-6xl text-sky-300 mt-0.5">まちを守る</span>
          <span className="block text-3xl sm:text-4xl lg:text-5xl mt-0.5">{nameShort}</span>
        </h1>

        <p className={`text-blue-100/70 text-sm sm:text-base leading-relaxed mb-5 sm:mb-8 ${cls("delay-200")}`}>
          上下水道工事・土木工事<br className="sm:hidden" />
          <span className="hidden sm:inline"> / </span>
          日の出町をはじめ多摩地区全域に対応
        </p>

        {/* CTAエリア（電話 / お問い合わせ / 採用）*/}
        <div className={`space-y-3 ${cls("delay-300")}`}>
          {/* Primary: 電話 */}
          <a
            href={`tel:${tel}`}
            className="relative flex items-center justify-center gap-3 bg-sky-500 hover:bg-sky-400 text-white font-black text-lg py-4 px-6 rounded-md shadow-md shadow-sky-900/40 hover:shadow-lg hover:shadow-sky-800/60 active:scale-95 transition-all w-full"
          >
            <div className="relative shrink-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs font-medium opacity-90 leading-none mb-0.5">今すぐ無料相談</div>
              <div className="tracking-wide">{tel}</div>
            </div>
          </a>
          {/* Secondary: お問い合わせ / 採用（横並び）*/}
          <div className="grid grid-cols-2 gap-2">
            <a href="#contact"
              className="flex items-center justify-center gap-1.5 border border-white/40 hover:border-white/70 hover:shadow-md hover:shadow-black/25 text-white font-bold py-3 rounded-sm active:scale-95 transition-all text-sm"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              お問い合わせ
            </a>
            <a href="#recruit"
              className="flex items-center justify-center gap-1.5 border border-white/20 hover:border-white/50 bg-white/5 hover:shadow-md hover:shadow-black/25 text-white font-bold py-3 rounded-sm active:scale-95 transition-all text-sm"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              採用情報
            </a>
          </div>
        </div>

        {/* 実績バッジ */}
        <div className={`mt-5 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3 max-w-sm sm:max-w-md ${cls("delay-[500ms]")}`}>
          {[
            { num: "西多摩", label: "地域密着" },
            { num: "500+", label: "施工実績" },
            { num: "相談無料", label: "出張費無料" },
          ].map((b) => (
            <div key={b.label} className="bg-blue-900/40 backdrop-blur-sm border border-blue-400/20 rounded-sm py-3 text-center">
              <div className="text-sky-300 font-black text-sm sm:text-base leading-tight">{b.num}</div>
              <div className="text-blue-200 text-[10px] sm:text-xs mt-0.5">{b.label}</div>
            </div>
          ))}
        </div>

        {/* Unsplash attribution */}
        <p className="mt-4 text-white/30 text-[9px]">Photo: Unsplash</p>
      </div>

      {/* 波形区切り */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-8 sm:h-12 fill-white">
          <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" />
        </svg>
      </div>
    </section>
  );
}
