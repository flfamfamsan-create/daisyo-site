"use client";

import { useSiteData } from "@/lib/SiteDataContext";
import RevealSection from "./RevealSection";

/* ─── 静的コンテンツ ─────────────────────────────────────────────── */

const DAILY_FLOW = [
  { time: "07:45", label: "朝礼・安全確認" },
  { time: "08:00", label: "現場へ出発" },
  { time: "12:00", label: "昼休憩（1h）" },
  { time: "17:00", label: "片付け・清掃" },
  { time: "17:30", label: "帰社・日報" },
];

const SUPPORTS = [
  {
    title: "丁寧な指導体制",
    body: "先輩社員がマンツーマンで指導。道具の使い方から現場のマナーまで一から教えます。",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "現場でのサポート",
    body: "わからないことはすぐ聞ける雰囲気。一人で抱え込まずに進められる体制です。",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "資格取得支援",
    body: "取得にかかる費用は会社が全額サポート。キャリアアップをしっかり後押しします。",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
];

const BENEFITS = [
  { label: "昇給制度あり" },
  { label: "社会保険完備" },
  { label: "作業着支給" },
  { label: "資格取得費用支援" },
  { label: "日曜・祝日休み" },
  { label: "夏季・冬季休暇" },
];

const APPLY_STEPS = [
  { step: "01", title: "お問い合わせ",     body: "フォームまたはお電話でご連絡ください。" },
  { step: "02", title: "担当者からご連絡", body: "1〜2営業日以内にご連絡します。" },
  { step: "03", title: "面談・現場見学",   body: "雰囲気を見てから決めていただけます。" },
  { step: "04", title: "採用・入社",       body: "入社後も先輩がしっかりサポートします。" },
];

/* ─── コンポーネント ─────────────────────────────────────────────── */

export default function Recruit() {
  const { data } = useSiteData();
  const { tel } = data.company;
  const { catchcopy, description, items } = data.recruit;

  return (
    <section id="recruit" className="py-16 sm:py-24 bg-white">
      <div className="max-w-screen-lg mx-auto px-5">

        {/* ─ セクションヘッダー ─ */}
        <RevealSection className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-sky-50 text-sky-600 text-xs font-bold px-3 py-1 rounded-sm mb-3 tracking-widest uppercase">
            Recruit
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-wide">採用情報</h2>
          <p className="text-sky-600 font-bold text-base sm:text-lg mt-2">{catchcopy}</p>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md mx-auto leading-relaxed">{description}</p>
        </RevealSection>

        {/* ─ 1日の流れ ─ */}
        <RevealSection className="mb-14 sm:mb-20">
          <h3 className="text-xs font-bold text-sky-600 tracking-widest uppercase mb-6">1日の流れ</h3>
          <div className="relative">
            {/* 連結ライン（sm以上） */}
            <div className="hidden sm:block absolute top-6 left-6 right-6 h-px bg-slate-200" />
            <ol className="grid grid-cols-2 sm:grid-cols-5 gap-y-6 gap-x-3 relative">
              {DAILY_FLOW.map((s, i) => (
                <li key={i} className="flex sm:flex-col items-center gap-3 sm:gap-2 sm:text-center">
                  <div className="w-12 h-12 shrink-0 rounded-md bg-sky-500 text-white flex flex-col items-center justify-center text-[11px] font-black leading-tight z-10">
                    {s.time.split(":")[0]}<span className="font-normal text-[9px]">:{s.time.split(":")[1]}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-700 leading-snug">{s.label}</p>
                </li>
              ))}
            </ol>
          </div>
        </RevealSection>

        {/* ─ 未経験でも安心 ─ */}
        <RevealSection className="mb-14 sm:mb-20">
          <h3 className="text-xs font-bold text-sky-600 tracking-widest uppercase mb-6">未経験でも安心</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SUPPORTS.map((s, i) => (
              <div key={i} className="card p-5">
                <div className="w-10 h-10 rounded-sm bg-sky-50 text-sky-500 flex items-center justify-center mb-4">
                  {s.icon}
                </div>
                <h4 className="font-black text-slate-900 text-sm mb-2 tracking-wide">{s.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* ─ 募集要項 ─ */}
        <RevealSection className="mb-14 sm:mb-20">
          <h3 className="text-xs font-bold text-sky-600 tracking-widest uppercase mb-6">募集要項</h3>

          {/* 条件テーブル */}
          <div className="rounded-md overflow-hidden border border-slate-200 mb-8">
            {items.map((item, i) => (
              <div key={item.label} className={`flex min-h-[52px] ${i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                <div className="w-28 shrink-0 px-4 py-3.5 text-xs font-bold text-slate-500 flex items-start pt-4">
                  {item.label}
                </div>
                <div className="flex-1 px-4 py-3.5 text-sm text-slate-800 border-l border-slate-200 flex items-center">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* 福利厚生カード */}
          <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">福利厚生</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {BENEFITS.map((b, i) => (
              <div key={i} className="card py-4 px-2 text-center">
                <div className="w-1.5 h-1.5 bg-sky-400 rounded-sm mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-700 leading-snug">{b.label}</span>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* ─ 応募の流れ ─ */}
        <RevealSection className="mb-14 sm:mb-20">
          <h3 className="text-xs font-bold text-sky-600 tracking-widest uppercase mb-6">応募の流れ</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {APPLY_STEPS.map((s, i) => (
              <div key={i} className="card p-4 relative">
                {i < APPLY_STEPS.length - 1 && (
                  <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-300 text-lg z-10">›</span>
                )}
                <div className="text-sky-500 font-black text-2xl leading-none mb-3">{s.step}</div>
                <div className="font-black text-slate-900 text-sm mb-1.5 leading-snug">{s.title}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{s.body}</div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* ─ CTA ─ */}
        <RevealSection>
          <div className="bg-[#071a30] rounded-md px-6 py-10 sm:py-14 text-center text-white">
            <p className="text-sky-400 font-bold text-xs tracking-widest uppercase mb-3">Join Us</p>
            <h3 className="font-black text-xl sm:text-2xl tracking-wide mb-2">
              まずは気軽に連絡してください
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              「経験がなくて不安…」でも大丈夫。<br />
              話を聞くだけでも歓迎しています。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${tel}`}
                className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-black text-base py-4 px-8 rounded-md shadow-md shadow-sky-900/40 hover:shadow-lg hover:shadow-sky-800/50 transition-all active:scale-95"
              >
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                電話で問い合わせる
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-bold text-base py-4 px-8 rounded-md hover:bg-white/5 transition-all active:scale-95"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                フォームで応募する
              </a>
            </div>
          </div>
        </RevealSection>

      </div>
    </section>
  );
}
