"use client";

import { useState } from "react";
import { useSiteData } from "@/lib/SiteDataContext";

export default function Faq() {
  const { data } = useSiteData();
  const faq = data.faq ?? [];
  const [open, setOpen] = useState<number | null>(null);

  if (faq.length === 0) return null;

  return (
    <section id="faq" className="py-16 sm:py-20 grid-bg">
      <div className="max-w-screen-lg mx-auto px-5">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#1a3a5c]/10 text-[#1a3a5c] text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-widest uppercase">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">よくある質問</h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faq.map((f, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-bold text-gray-800 text-sm sm:text-base leading-snug pr-4">
                  <span className="text-orange-500 font-black mr-2">Q.</span>
                  {f.q}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  <span className="text-[#1a3a5c] font-black mr-2">A.</span>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
