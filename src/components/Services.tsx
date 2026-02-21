"use client";

import { useSiteData } from "@/lib/SiteDataContext";

export default function Services() {
  const { data } = useSiteData();
  const { tel } = data.company;
  return (
    <section id="services" className="py-16 sm:py-20 bg-white">
      <div className="max-w-screen-lg mx-auto px-5">
        {/* ヘッダー */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-widest uppercase">
            Service
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">事業内容</h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            上下水道・土木の2本柱で、地域インフラを支えます
          </p>
        </div>

        {/* カードグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.services.map((s) => (
            <div
              key={s.id}
              className={`rounded-2xl overflow-hidden border ${s.borderClass} shadow-sm`}
            >
              {/* カードヘッダー */}
              <div className={`bg-gradient-to-r ${s.colorClass} px-5 py-5`}>
                <div className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-1">
                  {s.subtitle}
                </div>
                <div className="text-white font-black text-2xl">{s.title}</div>
              </div>

              {/* カードボディ */}
              <div className={`${s.bgClass} px-5 py-5`}>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.description}</p>
                <ul className="space-y-2.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dotClass}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTAバナー */}
        <div className="mt-10 bg-[#1a3a5c] rounded-2xl px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-lg leading-tight">まずはお気軽にご相談ください</p>
            <p className="text-blue-200 text-sm mt-1">見積もり・出張費 無料</p>
          </div>
          <a
            href={`tel:${tel}`}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-black py-3 px-6 rounded-xl text-base whitespace-nowrap active:scale-95 transition-all shrink-0"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {tel}
          </a>
        </div>
      </div>
    </section>
  );
}
