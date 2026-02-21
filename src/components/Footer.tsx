"use client";

import { useSiteData } from "@/lib/SiteDataContext";

export default function Footer() {
  const { data } = useSiteData();
  const { company, areas } = data;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f2744] text-white">
      <div className="max-w-screen-lg mx-auto px-5 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* ロゴ・説明 */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-sky-500 rounded-sm flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-xl leading-none">大</span>
              </div>
              <div>
                <div className="font-black text-base">{company.name}</div>
                <div className="text-blue-300 text-xs">{company.nameEn}</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-5">{company.description}</p>

            {/* SNS */}
            <a
              href={company.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-sm transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @dsk.1112
            </a>
          </div>

          {/* 連絡先 */}
          <div>
            <h3 className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <div className="text-xs text-blue-400 mb-0.5">電話</div>
                <a href={`tel:${company.tel}`} className="font-bold text-white hover:text-sky-300 transition-colors">
                  {company.tel}
                </a>
              </li>
              <li>
                <div className="text-xs text-blue-400 mb-0.5">FAX</div>
                <span className="text-blue-100">{company.fax}</span>
              </li>
              {company.addresses.map((a) => (
                <li key={a.label}>
                  <div className="text-xs text-blue-400 mb-0.5">{a.label}</div>
                  <span className="text-blue-100 text-sm">{a.value}</span>
                </li>
              ))}
              {company.businessHours && (
                <li>
                  <div className="text-xs text-blue-400 mb-0.5">営業時間</div>
                  <span className="text-blue-100 text-sm">{company.businessHours}</span>
                </li>
              )}
              {company.holiday && (
                <li>
                  <div className="text-xs text-blue-400 mb-0.5">定休日</div>
                  <span className="text-blue-100 text-sm">{company.holiday}</span>
                </li>
              )}
            </ul>
          </div>

          {/* ナビ＆対応エリア */}
          <div>
            <h3 className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-4">Menu</h3>
            <ul className="space-y-1.5 mb-6">
              {[
                { href: "#services", label: "事業内容" },
                { href: "#features", label: "選ばれる理由" },
                { href: "#works", label: "施工実績" },
                { href: "#recruit", label: "採用情報" },
                { href: "#about", label: "会社概要" },
                { href: "#contact", label: "お問い合わせ" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-blue-300 hover:text-white text-sm transition-colors">
                    › {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-3">対応エリア</h3>
            <div className="flex flex-wrap gap-1.5">
              {areas.map((a) => (
                <span
                  key={a.name}
                  className={`text-xs px-2 py-0.5 ${a.primary ? "text-sky-300 font-medium" : "text-slate-400"}`}
                >
                  {a.name}
                </span>
              ))}
              <span className="text-xs text-blue-500">ほか</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-blue-500 text-xs">
            © {year} {company.name} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
