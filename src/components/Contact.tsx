"use client";

import { useState } from "react";
import { useSiteData } from "@/lib/SiteDataContext";

export default function Contact() {
  const { data } = useSiteData();
  const { tel, addresses } = data.company;
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-screen-lg mx-auto px-5">
        {/* ヘッダー */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-widest uppercase">
            Contact
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">お問い合わせ</h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            見積もり・相談は無料です。お気軽にご連絡ください。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 左：連絡先情報 */}
          <div className="lg:col-span-2 space-y-4">
            {/* 電話 */}
            <a
              href={`tel:${tel}`}
              className="flex items-center gap-4 bg-[#1a3a5c] rounded-2xl p-5 text-white active:scale-[0.98] transition-transform"
            >
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <div className="text-blue-200 text-xs mb-0.5">お急ぎの方はお電話で</div>
                <div className="font-black text-xl tracking-wide">{tel}</div>
              </div>
            </a>

            {/* 住所 */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#1a3a5c]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                所在地
              </h3>
              <div className="space-y-2">
                {addresses.map((a) => (
                  <div key={a.label}>
                    <div className="text-xs text-gray-400 font-semibold">{a.label}</div>
                    <div className="text-sm text-gray-700">{a.value}</div>
                  </div>
                ))}
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(addresses[0].value)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-[#1a3a5c] text-xs font-semibold hover:underline"
              >
                Google マップで開く →
              </a>
            </div>
          </div>

          {/* 右：フォーム */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white rounded-2xl border border-green-200 p-8 text-center shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-gray-900 font-black text-lg mb-2">送信完了しました</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  お問い合わせありがとうございます。<br />
                  確認次第、ご連絡いたします。<br />
                  お急ぎの場合はお電話をご利用ください。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
                {[
                  { label: "お名前", name: "name", type: "text", placeholder: "山田 太郎", required: true },
                  { label: "電話番号", name: "phone", type: "tel", placeholder: "042-XXX-XXXX", required: true },
                  { label: "メールアドレス", name: "email", type: "email", placeholder: "example@mail.com", required: false },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      {f.label} {f.required && <span className="text-orange-500">*</span>}
                    </label>
                    <input
                      type={f.type}
                      name={f.name}
                      value={form[f.name as keyof typeof form]}
                      onChange={handleChange}
                      required={f.required}
                      placeholder={f.placeholder}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent placeholder-gray-300"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    お問い合わせ種別 <span className="text-orange-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent bg-white appearance-none"
                  >
                    <option value="">選択してください</option>
                    <option>上下水道工事</option>
                    <option>土木工事</option>
                    <option>漏水・緊急対応</option>
                    <option>見積り依頼</option>
                    <option>採用について</option>
                    <option>その他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    お問い合わせ内容 <span className="text-orange-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="ご相談内容・現場の状況などをお書きください"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] focus:border-transparent placeholder-gray-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-70 text-white font-black py-4 rounded-xl text-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      送信中...
                    </>
                  ) : "送信する"}
                </button>

                <p className="text-gray-400 text-xs text-center">
                  ご入力情報はお問い合わせへの回答のみに使用します。
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
