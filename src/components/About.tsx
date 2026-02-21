"use client";

import { useSiteData } from "@/lib/SiteDataContext";

export default function About() {
  const { data } = useSiteData();
  const company = data.company;
  const rows = [
    { label: "会社名", value: company.name },
    { label: "郵便番号", value: `〒${company.zip}` },
    ...company.addresses.map((a) => ({ label: a.label, value: a.value })),
    { label: "電話", value: company.tel, isTel: true },
    { label: "FAX", value: company.fax },
    {
      label: "営業時間",
      value: company.businessHours || "—",
    },
    {
      label: "定休日",
      value: company.holiday || "—",
    },
    { label: "事業内容", value: "上下水道工事・土木工事" },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-white">
      <div className="max-w-screen-lg mx-auto px-5">
        {/* ヘッダー */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-widest uppercase">
            About Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">会社概要</h2>
        </div>

        {/* 2カラムレイアウト（タブレット以上） */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* メッセージ */}
          <div className="bg-[#1a3a5c] rounded-2xl p-6 sm:p-8 text-white h-full flex flex-col justify-between">
            <div>
              <div className="text-orange-400 font-black text-xl sm:text-2xl mb-4">
                「地域とともに、誠実に。」
              </div>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                株式会社大翔工業は、西多摩郡日の出町を拠点に、多摩地区を中心とした上下水道工事・土木工事を担っています。
              </p>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed mt-3">
                水道配管の修繕から道路掘削・埋戻しまで、地域の生活インフラを支える工事を誠実に、丁寧に。
                お困りのことがあれば、まずはお気軽にご相談ください。
              </p>
            </div>

            {/* 対応エリア */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-200 text-xs font-semibold tracking-wide">対応エリア（西多摩・多摩地区）</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.areas.map((a) => (
                  <span
                    key={a.name}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      a.primary
                        ? "bg-orange-500/20 text-orange-300 border border-orange-400/30"
                        : "bg-white/10 text-blue-200 border border-white/20"
                    }`}
                  >
                    {a.name}
                  </span>
                ))}
                <span className="text-xs text-blue-400 self-center">ほか多摩地区近隣</span>
              </div>
            </div>
          </div>

          {/* 会社情報テーブル */}
          <div>
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              {rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex min-h-[52px] ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <div className="w-24 shrink-0 px-4 py-3.5 text-xs font-bold text-gray-500 flex items-start pt-4">
                    {row.label}
                  </div>
                  <div className="flex-1 px-4 py-3.5 text-sm text-gray-800 border-l border-gray-200 flex items-center">
                    {"isTel" in row && row.isTel ? (
                      <a href={`tel:${row.value}`} className="text-[#1a3a5c] font-bold underline">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 資格・許認可（dataがある場合のみ表示） */}
            {data.licenses.length > 0 && (
              <div className="mt-5 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-xs font-bold text-gray-500 mb-2">資格・許認可</h3>
                <ul className="space-y-1">
                  {data.licenses.map((lic) => (
                    <li key={lic} className="text-sm text-gray-700">・{lic}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Google Maps リンク */}
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(company.addresses[0].value)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 text-[#1a3a5c] text-sm font-semibold hover:underline"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Google マップで見る
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
