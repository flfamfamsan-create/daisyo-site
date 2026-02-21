"use client";

import { usePathname } from "next/navigation";

const links = [
  { href: "/admin/dashboard", label: "ダッシュボード" },
  { href: "/admin/editor", label: "コンテンツ編集" },
];

export default function AdminNav() {
  const path = usePathname();

  return (
    <header className="bg-[#1a3a5c] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 h-13 flex items-center justify-between gap-4" style={{ height: "52px" }}>
        {/* ロゴ */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center font-black text-sm">
            大
          </div>
          <span className="font-black text-sm whitespace-nowrap">管理画面</span>
        </div>

        {/* ナビ */}
        <nav className="flex items-center gap-1 overflow-x-auto">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                path === l.href
                  ? "bg-white/20 text-white"
                  : "text-blue-200 hover:text-white hover:bg-white/10"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/"
          className="text-blue-300 hover:text-white text-xs transition-colors whitespace-nowrap shrink-0"
        >
          ← サイトへ
        </a>
      </div>
    </header>
  );
}
