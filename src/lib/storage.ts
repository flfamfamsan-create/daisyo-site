/**
 * storage.ts ─ コンテンツの読み書きユーティリティ
 *
 * v1: localStorage に保存
 * 将来 Supabase 等に差し替える場合は read / write / getHistory だけ変更する。
 */

const SITE_KEY = "daisho_site_v1";
const HIST_KEY = "daisho_hist_v1";

// ─── 型定義 ────────────────────────────────────────────────────────────────

export interface WorkItem {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  location: string;
  description: string;
  tags: string[];
  image: string;
  gradient: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface HistoryEntry {
  ts: number;
  label: string;
}

/** localStorage に保存される差分データ（未設定フィールドは SITE のデフォルト値を使用） */
export interface StoredData {
  company?: {
    nameShort?: string;
    tel?: string;
    fax?: string;
    businessHours?: string;
    holiday?: string;
    instagram?: string;
    description?: string;
    addresses?: { label: string; value: string }[];
  };
  works?: WorkItem[];
  recruit?: {
    catchcopy?: string;
    description?: string;
  };
  faq?: FaqItem[];
}

// ─── 操作関数（ここだけ Supabase に差し替えればOK）────────────────────────

function safeLS(): Storage | null {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

export const storage = {
  read(): StoredData | null {
    const ls = safeLS();
    if (!ls) return null;
    try {
      const v = ls.getItem(SITE_KEY);
      return v ? (JSON.parse(v) as StoredData) : null;
    } catch {
      return null;
    }
  },

  write(data: StoredData): void {
    const ls = safeLS();
    if (!ls) return;
    ls.setItem(SITE_KEY, JSON.stringify(data));
    // 更新履歴を記録
    const hist = storage.getHistory();
    hist.unshift({ ts: Date.now(), label: "コンテンツを保存しました" });
    ls.setItem(HIST_KEY, JSON.stringify(hist.slice(0, 30)));
  },

  getHistory(): HistoryEntry[] {
    const ls = safeLS();
    if (!ls) return [];
    try {
      const v = ls.getItem(HIST_KEY);
      return v ? (JSON.parse(v) as HistoryEntry[]) : [];
    } catch {
      return [];
    }
  },

  clear(): void {
    const ls = safeLS();
    if (!ls) return;
    ls.removeItem(SITE_KEY);
  },
};
