"use client";

import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { storage, StoredData, HistoryEntry } from "@/lib/storage";

// ─── アナリティクス ダミーデータ ───────────────────────────────────────────

const KPI_DATA = {
  "7":  { pv: 412,  contacts: 3,  telClicks: 8,   cvr: "2.7", mobileRatio: 78 },
  "30": { pv: 1840, contacts: 14, telClicks: 37,  cvr: "2.8", mobileRatio: 76 },
  "90": { pv: 5320, contacts: 41, telClicks: 112, cvr: "2.9", mobileRatio: 75 },
};

const PAGE_DATA: Record<string, { page: string; views: number }[]> = {
  "7":  [
    { page: "トップページ", views: 280 }, { page: "事業内容", views: 95 },
    { page: "施工実績", views: 62 }, { page: "採用情報", views: 48 },
    { page: "お問い合わせ", views: 40 }, { page: "会社概要", views: 35 },
  ],
  "30": [
    { page: "トップページ", views: 1100 }, { page: "事業内容", views: 420 },
    { page: "施工実績", views: 290 }, { page: "採用情報", views: 215 },
    { page: "お問い合わせ", views: 180 }, { page: "会社概要", views: 140 },
  ],
  "90": [
    { page: "トップページ", views: 3200 }, { page: "事業内容", views: 1200 },
    { page: "施工実績", views: 850 }, { page: "採用情報", views: 610 },
    { page: "お問い合わせ", views: 520 }, { page: "会社概要", views: 380 },
  ],
};

const REGION_DATA = [
  { name: "多摩地区", value: 52, color: "#1a3a5c" },
  { name: "東京都（他）", value: 28, color: "#ea580c" },
  { name: "神奈川・埼玉", value: 12, color: "#0891b2" },
  { name: "その他", value: 8, color: "#9ca3af" },
];

// ─── ゲーミフィケーション ─────────────────────────────────────────────────

interface BadgeDef {
  id: string;
  emoji: string;
  label: string;
  desc: string;
  check: (s: StoredData) => boolean;
  pts: number;
}

const BADGES: BadgeDef[] = [
  {
    id: "open",
    emoji: "🏗️",
    label: "第一歩",
    desc: "サイトを開設した",
    check: () => true,
    pts: 10,
  },
  {
    id: "sns",
    emoji: "📱",
    label: "SNS連携",
    desc: "Instagramが設定済み",
    check: (s) => !!(s.company?.instagram),
    pts: 10,
  },
  {
    id: "works",
    emoji: "📸",
    label: "実績アピール",
    desc: "施工事例が3件以上",
    check: (s) => (s.works?.length ?? 5) >= 3,
    pts: 20,
  },
  {
    id: "hours",
    emoji: "📅",
    label: "営業情報完備",
    desc: "営業時間・定休日が入力済み",
    check: (s) => !!(s.company?.businessHours && s.company?.holiday),
    pts: 10,
  },
  {
    id: "faq",
    emoji: "❓",
    label: "よくある質問",
    desc: "FAQが1件以上登録済み",
    check: (s) => (s.faq?.length ?? 0) > 0,
    pts: 20,
  },
  {
    id: "ga",
    emoji: "📊",
    label: "計測スタート",
    desc: "GA4計測IDが設定済み",
    check: () => !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    pts: 20,
  },
];

function calcHealth(stored: StoredData): number {
  let score = 0;
  const worksLen = stored.works?.length ?? 5;
  if (stored.company?.businessHours) score += 10;
  if (stored.company?.holiday) score += 10;
  if (worksLen >= 5) score += 20;
  else if (worksLen >= 3) score += 10;
  if (stored.recruit?.catchcopy) score += 10;
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) score += 20;
  if (stored.company?.instagram) score += 10;
  if ((stored.faq?.length ?? 0) > 0) score += 20;
  return Math.min(score, 100);
}

function calcTodos(stored: StoredData): string[] {
  const todos: string[] = [];
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)
    todos.push("GA4計測IDを設定してアクセス解析を開始しよう");
  if (!stored.company?.businessHours || !stored.company?.holiday)
    todos.push("営業時間・定休日を設定しよう");
  if ((stored.faq?.length ?? 0) === 0)
    todos.push("よくある質問を追加してお客様の不安を解消しよう");
  if ((stored.works?.length ?? 5) < 5)
    todos.push("施工事例を5件以上にしよう");
  if (!stored.recruit?.catchcopy)
    todos.push("採用キャッチコピーを入力しよう");
  return todos;
}

// ─── サブコンポーネント ────────────────────────────────────────────────────

type Period = "7" | "30" | "90";

function KpiCard({
  label, value, unit, icon, sub,
}: {
  label: string; value: string | number; unit?: string;
  icon: React.ReactNode; sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-500 text-sm font-medium">{label}</span>
        <div className="w-9 h-9 bg-[#1a3a5c]/10 rounded-xl flex items-center justify-center text-[#1a3a5c]">
          {icon}
        </div>
      </div>
      <div className="flex items-end gap-1">
        <span className="text-3xl font-black text-gray-900">{value}</span>
        {unit && <span className="text-gray-400 text-sm mb-0.5">{unit}</span>}
      </div>
      {sub && <p className="text-gray-400 text-xs mt-1">{sub}</p>}
    </div>
  );
}

// ─── メインページ ─────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>("30");
  const [stored, setStored] = useState<StoredData>({});
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const kpi = KPI_DATA[period];
  const pageData = PAGE_DATA[period];
  const periodLabel: Record<Period, string> = {
    "7": "過去7日間", "30": "過去30日間", "90": "過去90日間",
  };

  useEffect(() => {
    const s = storage.read();
    if (s) setStored(s);
    setHistory(storage.getHistory());
  }, []);

  const health = calcHealth(stored);
  const todos = calcTodos(stored);

  const healthColor =
    health >= 80 ? "text-green-600" : health >= 50 ? "text-orange-500" : "text-red-500";
  const healthBg =
    health >= 80 ? "bg-green-500" : health >= 50 ? "bg-orange-500" : "bg-red-500";

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-8">

      {/* ─── ゲーミフィケーション ─── */}
      <section>
        <h2 className="text-lg font-black text-gray-900 mb-4">サイト健康度</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* 健康度スコア */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <div className={`text-6xl font-black ${healthColor}`}>{health}</div>
            <div className="text-gray-400 text-sm mt-1">/ 100点</div>
            <div className="mt-4 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${healthBg}`}
                style={{ width: `${health}%` }}
              />
            </div>
            <p className="text-gray-500 text-xs mt-3">
              {health >= 80
                ? "🎉 サイトの準備は万全です！"
                : health >= 50
                ? "💪 あと少し！Todoをこなそう"
                : "🚀 まずは基本情報を入力しよう"}
            </p>
            <a
              href="/admin/editor"
              className="mt-4 inline-flex items-center gap-1 text-[#1a3a5c] text-sm font-bold hover:underline"
            >
              コンテンツを編集する →
            </a>
          </div>

          {/* バッジ */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="font-black text-gray-800 text-sm mb-4">獲得バッジ</div>
            <div className="grid grid-cols-3 gap-3">
              {BADGES.map((b) => {
                const unlocked = b.check(stored);
                return (
                  <div
                    key={b.id}
                    className={`flex flex-col items-center text-center p-2 rounded-xl transition-all ${
                      unlocked ? "bg-orange-50" : "bg-gray-50 opacity-40 grayscale"
                    }`}
                    title={b.desc}
                  >
                    <span className="text-2xl">{b.emoji}</span>
                    <span className="text-[10px] font-bold text-gray-600 mt-1 leading-tight">
                      {b.label}
                    </span>
                    {unlocked && (
                      <span className="text-[9px] text-orange-500 font-bold">+{b.pts}pt</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ToDo + 更新履歴 */}
          <div className="space-y-4">
            {/* ToDo */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="font-black text-gray-800 text-sm mb-3">
                次にやること {todos.length > 0 && (
                  <span className="ml-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {todos.length}
                  </span>
                )}
              </div>
              {todos.length === 0 ? (
                <p className="text-green-600 text-sm font-bold">✅ すべて完了！</p>
              ) : (
                <ul className="space-y-2">
                  {todos.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="w-4 h-4 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 更新履歴 */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="font-black text-gray-800 text-sm mb-3">更新履歴</div>
              {history.length === 0 ? (
                <p className="text-gray-400 text-xs">まだ保存されていません</p>
              ) : (
                <ul className="space-y-1.5">
                  {history.slice(0, 5).map((h, i) => (
                    <li key={i} className="text-xs text-gray-500 flex items-center gap-2">
                      <span className="text-gray-300">•</span>
                      <span>{new Date(h.ts).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                      <span className="text-gray-600">{h.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── アナリティクス ─── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-gray-900">アクセス分析</h2>
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {(["7", "30", "90"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 text-sm font-bold transition-colors ${
                  period === p ? "bg-[#1a3a5c] text-white" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {p}日
              </button>
            ))}
          </div>
        </div>

        <p className="text-gray-400 text-xs mb-5">
          ※ ダミーデータ表示中。GA4 API 連携後にリアルデータへ差し替え可能。（{periodLabel[period]}）
        </p>

        {/* KPIカード */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard label="総アクセス（PV）" value={kpi.pv.toLocaleString()} unit="PV"
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          />
          <KpiCard label="問い合わせ数" value={kpi.contacts} unit="件"
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
            sub="フォーム送信数"
          />
          <KpiCard label="電話クリック" value={kpi.telClicks} unit="回"
            icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>}
            sub="tel:リンク"
          />
          <KpiCard label="CVR" value={kpi.cvr} unit="%"
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            sub="問い合わせ÷PV"
          />
        </div>

        {/* グラフ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-800 text-sm mb-1">ページ別閲覧数</h3>
            <p className="text-gray-400 text-xs mb-4">{periodLabel[period]}</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={pageData} layout="vertical" margin={{ left: 16, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="page" tick={{ fontSize: 11, fill: "#4b5563" }} width={90} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: 12 }}
                  formatter={(v: number | string | undefined) => [v != null ? `${Number(v).toLocaleString()} PV` : "—", "閲覧数"]}
                />
                <Bar dataKey="views" fill="#1a3a5c" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-800 text-sm mb-1">地域別</h3>
            <p className="text-gray-400 text-xs mb-4">ユーザー所在地（推定）</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={REGION_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                  {REGION_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", fontSize: 12 }}
                  formatter={(v: number | string | undefined) => [`${v ?? 0}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-1">
              {REGION_DATA.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                    <span className="text-gray-600">{d.name}</span>
                  </div>
                  <span className="font-bold text-gray-800">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* デバイス比率 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-black text-gray-800 text-sm mb-4">デバイス比率</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "モバイル", ratio: kpi.mobileRatio, color: "bg-[#1a3a5c]" },
              { label: "PC / タブレット", ratio: 100 - kpi.mobileRatio, color: "bg-orange-500" },
            ].map((d) => (
              <div key={d.label}>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>{d.label}</span>
                  <span className="font-black">{d.ratio}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${d.color}`} style={{ width: `${d.ratio}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
