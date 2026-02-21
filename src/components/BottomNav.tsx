import { SITE } from "@/content/site";

const { tel } = SITE.company;

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
      {/* 影 */}
      <div className="absolute inset-0 shadow-[0_-2px_12px_rgba(0,0,0,0.15)] bg-white border-t border-gray-200" />

      <div className="relative grid grid-cols-3 h-16">
        {/* 電話 */}
        <a
          href={`tel:${tel}`}
          className="flex flex-col items-center justify-center gap-1 text-sky-600 font-bold active:bg-sky-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span className="text-[10px] font-bold">電話する</span>
        </a>

        {/* お問い合わせ（中央・強調） */}
        <a
          href="#contact"
          className="flex flex-col items-center justify-center bg-[#1a3a5c] text-white gap-1 active:bg-[#0f2744] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-[10px] font-bold">お問い合わせ</span>
        </a>

        {/* 採用 */}
        <a
          href="#recruit"
          className="flex flex-col items-center justify-center gap-1 text-slate-500 active:bg-slate-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-[10px] font-bold">採用情報</span>
        </a>
      </div>
    </div>
  );
}
