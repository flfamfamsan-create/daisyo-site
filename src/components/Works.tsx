"use client";

import Image from "next/image";
import { useSiteData } from "@/lib/SiteDataContext";

export default function Works() {
  const { data } = useSiteData();
  return (
    <section id="works" className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-screen-lg mx-auto px-5">
        {/* ヘッダー */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block bg-[#1a3a5c]/10 text-[#1a3a5c] text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-widest uppercase">
            Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">施工実績</h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            ※以下はサンプルです。実績は順次追加予定。
          </p>
        </div>

        {/* カードグリッド（スマホ1列 / SM以上2列） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.works.map((w) => (
            <article
              key={w.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group"
            >
              {/* 画像（4:3比率） */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={w.image}
                  alt={`${w.location} ${w.title}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* カテゴリバッジ */}
                <span className={`absolute top-3 left-3 ${w.categoryColor} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow`}>
                  {w.category}
                </span>
                {/* グラジエント */}
                <div className={`absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t ${w.gradient} opacity-60`} />
              </div>

              {/* 情報 */}
              <div className="p-4">
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-1.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {w.location}
                </div>
                <h3 className="font-black text-gray-900 text-base leading-tight mb-2">
                  {w.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3">
                  {w.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {w.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-4">
            ご依頼内容・施工規模のご相談はお気軽にどうぞ
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#1a3a5c] hover:bg-[#0f2744] text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-colors active:scale-95"
          >
            お問い合わせ・ご相談
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Photo credit */}
        <p className="text-center text-gray-300 text-[9px] mt-4">Photos: Unsplash</p>
      </div>
    </section>
  );
}
