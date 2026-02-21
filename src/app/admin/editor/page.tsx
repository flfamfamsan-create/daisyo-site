"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSiteData, WorkItem, FaqItem } from "@/lib/SiteDataContext";
import { storage, StoredData } from "@/lib/storage";

type Tab = "company" | "works" | "recruit" | "faq";

// ─── 入力フィールド共通スタイル ──────────────────────────────────────────
const inputCls =
  "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a3a5c] placeholder-gray-300 bg-white";
const labelCls = "block text-xs font-bold text-gray-500 mb-1";

function Field({
  label, children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

// ─── タブボタン ──────────────────────────────────────────────────────────
function TabBtn({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
        active
          ? "bg-[#1a3a5c] text-white shadow"
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

// ─── メインページ ────────────────────────────────────────────────────────
export default function EditorPage() {
  const { data, stored, update, save } = useSiteData();

  const [tab, setTab] = useState<Tab>("company");
  const [saved, setSaved] = useState(false);

  // ─── ローカルドラフト（保存前の作業コピー）───────────────────────────
  // as string で as-const のリテラル型を緩める
  const [company, setCompany] = useState<{
    nameShort: string; tel: string; fax: string;
    businessHours: string; holiday: string;
    instagram: string; description: string;
  }>({
    nameShort: data.company.nameShort as string,
    tel: data.company.tel as string,
    fax: data.company.fax as string,
    businessHours: data.company.businessHours,
    holiday: data.company.holiday,
    instagram: data.company.instagram as string,
    description: data.company.description as string,
  });
  const [works, setWorks] = useState<WorkItem[]>(
    JSON.parse(JSON.stringify(data.works))
  );
  const [recruit, setRecruit] = useState<{ catchcopy: string; description: string }>({
    catchcopy: data.recruit.catchcopy as string,
    description: data.recruit.description as string,
  });
  const [faq, setFaq] = useState<FaqItem[]>(
    JSON.parse(JSON.stringify(data.faq ?? []))
  );

  // localStorage から初期値を反映
  useEffect(() => {
    const s = storage.read();
    if (!s) return;
    if (s.company)  setCompany((p) => ({ ...p, ...s.company }));
    if (s.works)    setWorks(s.works);
    if (s.recruit)  setRecruit((p) => ({ ...p, ...s.recruit }));
    if (s.faq)      setFaq(s.faq);
  }, []);

  // ─── 保存処理 ────────────────────────────────────────────────────────
  const handleSave = () => {
    const patch: StoredData = { company, works, recruit, faq };
    update(patch);
    save();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // ─── Works helpers ──────────────────────────────────────────────────
  const updateWork = (idx: number, key: keyof WorkItem, val: string) =>
    setWorks((prev) => prev.map((w, i) => (i === idx ? { ...w, [key]: val } : w)));

  const addWork = () =>
    setWorks((prev) => [
      ...prev,
      {
        id: Date.now(),
        category: "上下水道工事",
        categoryColor: "bg-cyan-600",
        title: "",
        location: "",
        description: "",
        tags: [],
        image: "",
        gradient: "from-cyan-600 to-blue-700",
      },
    ]);

  const removeWork = (idx: number) =>
    setWorks((prev) => prev.filter((_, i) => i !== idx));

  // ─── FAQ helpers ────────────────────────────────────────────────────
  const updateFaq = (idx: number, key: keyof FaqItem, val: string) =>
    setFaq((prev) => prev.map((f, i) => (i === idx ? { ...f, [key]: val } : f)));

  const addFaq = () => setFaq((prev) => [...prev, { q: "", a: "" }]);
  const removeFaq = (idx: number) => setFaq((prev) => prev.filter((_, i) => i !== idx));

  // ─── レンダリング ────────────────────────────────────────────────────
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* ページヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-gray-900">コンテンツ編集</h1>
          <p className="text-gray-400 text-xs mt-0.5">
            変更は「保存する」で localStorage に記録されます
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-sm transition-all active:scale-95 ${
            saved
              ? "bg-green-500 text-white"
              : "bg-orange-500 hover:bg-orange-400 text-white"
          }`}
        >
          {saved ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              保存しました！
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              保存する
            </>
          )}
        </button>
      </div>

      {/* タブ */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        <TabBtn active={tab === "company"} onClick={() => setTab("company")}>🏢 会社情報</TabBtn>
        <TabBtn active={tab === "works"} onClick={() => setTab("works")}>📸 施工事例</TabBtn>
        <TabBtn active={tab === "recruit"} onClick={() => setTab("recruit")}>👷 求人</TabBtn>
        <TabBtn active={tab === "faq"} onClick={() => setTab("faq")}>❓ FAQ</TabBtn>
      </div>

      {/* タブコンテンツ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ─── 左：フォーム ─── */}
        <div className="lg:col-span-3 space-y-4">

          {/* ── 会社情報タブ ── */}
          {tab === "company" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="font-black text-gray-800 text-base mb-2">会社情報</h2>
              <Field label="会社名（略称）">
                <input className={inputCls} value={company.nameShort}
                  onChange={(e) => setCompany((p) => ({ ...p, nameShort: e.target.value }))}
                  placeholder="大翔工業" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="電話番号">
                  <input className={inputCls} value={company.tel}
                    onChange={(e) => setCompany((p) => ({ ...p, tel: e.target.value }))}
                    placeholder="042-519-9440" />
                </Field>
                <Field label="FAX番号">
                  <input className={inputCls} value={company.fax}
                    onChange={(e) => setCompany((p) => ({ ...p, fax: e.target.value }))}
                    placeholder="042-519-9441" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="営業時間（空欄で非表示）">
                  <input className={inputCls} value={company.businessHours}
                    onChange={(e) => setCompany((p) => ({ ...p, businessHours: e.target.value }))}
                    placeholder="8:00〜17:00" />
                </Field>
                <Field label="定休日（空欄で非表示）">
                  <input className={inputCls} value={company.holiday}
                    onChange={(e) => setCompany((p) => ({ ...p, holiday: e.target.value }))}
                    placeholder="日曜日" />
                </Field>
              </div>
              <Field label="Instagram URL">
                <input className={inputCls} value={company.instagram}
                  onChange={(e) => setCompany((p) => ({ ...p, instagram: e.target.value }))}
                  placeholder="https://www.instagram.com/dsk.1112/" />
              </Field>
              <Field label="会社紹介文">
                <textarea className={`${inputCls} resize-none`} rows={3}
                  value={company.description}
                  onChange={(e) => setCompany((p) => ({ ...p, description: e.target.value }))}
                  placeholder="多摩地区を中心に上下水道工事・土木工事を行っています。"
                />
              </Field>
            </div>
          )}

          {/* ── 施工事例タブ ── */}
          {tab === "works" && (
            <div className="space-y-4">
              {works.map((w, idx) => (
                <div key={w.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-gray-700 text-sm">施工事例 {idx + 1}</span>
                    <button
                      onClick={() => removeWork(idx)}
                      className="text-red-400 hover:text-red-600 text-xs font-bold"
                    >
                      削除
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="タイトル">
                      <input className={inputCls} value={w.title}
                        onChange={(e) => updateWork(idx, "title", e.target.value)}
                        placeholder="給排水配管の改修工事" />
                    </Field>
                    <Field label="場所">
                      <input className={inputCls} value={w.location}
                        onChange={(e) => updateWork(idx, "location", e.target.value)}
                        placeholder="日の出町" />
                    </Field>
                  </div>
                  <Field label="説明">
                    <textarea className={`${inputCls} resize-none`} rows={2}
                      value={w.description}
                      onChange={(e) => updateWork(idx, "description", e.target.value)}
                      placeholder="施工内容の説明"
                    />
                  </Field>
                  <Field label="画像URL（/images/work-1.jpg または外部URL）">
                    <input className={inputCls} value={w.image}
                      onChange={(e) => updateWork(idx, "image", e.target.value)}
                      placeholder="/images/work-1.jpg" />
                  </Field>
                  {w.image && (
                    <div className="relative h-28 rounded-xl overflow-hidden bg-gray-100">
                      <Image src={w.image} alt={w.title} fill className="object-cover" />
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={addWork}
                className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-[#1a3a5c] hover:text-[#1a3a5c] text-sm font-bold transition-colors"
              >
                + 施工事例を追加
              </button>
            </div>
          )}

          {/* ── 求人タブ ── */}
          {tab === "recruit" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="font-black text-gray-800 text-base mb-2">採用情報</h2>
              <Field label="キャッチコピー">
                <input className={inputCls} value={recruit.catchcopy}
                  onChange={(e) => setRecruit((p) => ({ ...p, catchcopy: e.target.value }))}
                  placeholder="未経験・経験者、ともに歓迎。" />
              </Field>
              <Field label="採用説明文">
                <textarea className={`${inputCls} resize-none`} rows={4}
                  value={recruit.description}
                  onChange={(e) => setRecruit((p) => ({ ...p, description: e.target.value }))}
                  placeholder="大翔工業では現場で働く仲間を募集しています。"
                />
              </Field>
              <p className="text-xs text-gray-400">
                ※ 勤務時間・給与などの詳細は <code>/src/content/site.ts</code> の recruit.items を編集してください。
              </p>
            </div>
          )}

          {/* ── FAQタブ ── */}
          {tab === "faq" && (
            <div className="space-y-4">
              {faq.length === 0 && (
                <div className="text-center py-10 text-gray-400 text-sm">
                  FAQがまだありません。追加してみましょう。
                </div>
              )}
              {faq.map((f, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-gray-700 text-sm">Q{idx + 1}</span>
                    <button onClick={() => removeFaq(idx)} className="text-red-400 hover:text-red-600 text-xs font-bold">削除</button>
                  </div>
                  <Field label="質問">
                    <input className={inputCls} value={f.q}
                      onChange={(e) => updateFaq(idx, "q", e.target.value)}
                      placeholder="例：対応エリアはどこですか？" />
                  </Field>
                  <Field label="回答">
                    <textarea className={`${inputCls} resize-none`} rows={3}
                      value={f.a}
                      onChange={(e) => updateFaq(idx, "a", e.target.value)}
                      placeholder="例：西多摩郡・青梅市・あきる野市などを中心に対応しています。"
                    />
                  </Field>
                </div>
              ))}
              <button
                onClick={addFaq}
                className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-[#1a3a5c] hover:text-[#1a3a5c] text-sm font-bold transition-colors"
              >
                + FAQ を追加
              </button>
            </div>
          )}
        </div>

        {/* ─── 右：プレビュー ─── */}
        <div className="lg:col-span-2">
          <div className="sticky top-20">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="text-xs font-bold text-gray-400 mb-4 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                ライブプレビュー
              </div>

              {/* 会社情報プレビュー */}
              {tab === "company" && (
                <div className="space-y-3">
                  <div className="bg-[#1a3a5c] rounded-xl p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center font-black text-sm">大</div>
                      <span className="font-black">{company.nameShort || "—"}</span>
                    </div>
                    <p className="text-blue-200 text-xs leading-relaxed">{company.description || "—"}</p>
                  </div>
                  <div className="text-xs space-y-1.5">
                    {[
                      { label: "電話", value: company.tel },
                      { label: "FAX", value: company.fax },
                      { label: "営業時間", value: company.businessHours || "（未設定）" },
                      { label: "定休日", value: company.holiday || "（未設定）" },
                    ].map((r) => (
                      <div key={r.label} className="flex gap-2 text-gray-600">
                        <span className="text-gray-400 w-16 shrink-0">{r.label}</span>
                        <span className="font-medium">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 施工事例プレビュー */}
              {tab === "works" && (
                <div className="space-y-3">
                  {works.slice(0, 3).map((w) => (
                    <div key={w.id} className="border border-gray-100 rounded-xl overflow-hidden">
                      {w.image && (
                        <div className="relative h-20 bg-gray-100">
                          <Image src={w.image} alt={w.title} fill className="object-cover" />
                        </div>
                      )}
                      <div className="p-3">
                        <span className="text-[10px] font-bold text-cyan-600">{w.category}</span>
                        <div className="font-bold text-gray-800 text-sm leading-tight">{w.title || "（タイトル未入力）"}</div>
                        <div className="text-gray-400 text-[10px] mt-0.5">{w.location}</div>
                      </div>
                    </div>
                  ))}
                  {works.length > 3 && (
                    <p className="text-xs text-gray-400 text-center">他 {works.length - 3} 件</p>
                  )}
                </div>
              )}

              {/* 求人プレビュー */}
              {tab === "recruit" && (
                <div className="bg-[#1a3a5c] rounded-xl p-4 text-white">
                  <div className="text-orange-400 font-black text-base mb-1">
                    {recruit.catchcopy || "（未入力）"}
                  </div>
                  <p className="text-blue-100 text-xs leading-relaxed">
                    {recruit.description || "（未入力）"}
                  </p>
                </div>
              )}

              {/* FAQプレビュー */}
              {tab === "faq" && (
                <div className="space-y-3">
                  {faq.length === 0 ? (
                    <p className="text-gray-300 text-sm text-center py-4">FAQを追加するとここに表示されます</p>
                  ) : (
                    faq.slice(0, 4).map((f, i) => (
                      <div key={i} className="border border-gray-100 rounded-xl p-3">
                        <div className="text-[#1a3a5c] font-bold text-xs mb-1">
                          Q. {f.q || "（質問未入力）"}
                        </div>
                        <div className="text-gray-500 text-[11px] leading-relaxed">
                          A. {f.a || "（回答未入力）"}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* ヒント */}
            <div className="mt-4 bg-blue-50 rounded-xl p-4 text-xs text-blue-600 leading-relaxed">
              <span className="font-bold">💡 ヒント：</span>
              「保存する」でブラウザの localStorage に保存されます。
              サイトを再読み込みすると反映されます。
              リセットは
              <button
                onClick={() => {
                  if (confirm("保存データをリセットしますか？")) {
                    storage.clear();
                    window.location.reload();
                  }
                }}
                className="text-red-500 font-bold underline ml-1"
              >
                こちら
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
