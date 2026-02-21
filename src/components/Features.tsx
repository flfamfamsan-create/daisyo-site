import { SITE } from "@/content/site";

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-screen-lg mx-auto px-5">
        {/* ヘッダー */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block bg-[#1a3a5c]/10 text-[#1a3a5c] text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-widest uppercase">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            大翔工業が選ばれる理由
          </h2>
        </div>

        {/* カードグリッド（スマホ1列 / タブレット以上2列） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {SITE.features.map((f) => (
            <div
              key={f.num}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4"
            >
              {/* 番号 */}
              <div className="shrink-0">
                <div className="w-12 h-12 bg-[#1a3a5c] rounded-xl flex items-center justify-center">
                  <span className="text-orange-400 font-black text-base">{f.num}</span>
                </div>
              </div>
              {/* テキスト */}
              <div className="min-w-0">
                <h3 className="text-gray-900 font-black text-base leading-tight mb-1.5">
                  {f.title}
                </h3>
                <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded mb-2">
                  {f.highlight}
                </span>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
