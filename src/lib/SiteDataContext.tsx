"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { SITE } from "@/content/site";
import { storage, StoredData, FaqItem, WorkItem } from "./storage";

// ─── 型：SITE をディープミュータブルにした全量型 ──────────────────────────

type Mutable<T> = {
  -readonly [K in keyof T]: T[K] extends ReadonlyArray<infer U>
    ? Mutable<U>[]
    : T[K] extends object
    ? Mutable<T[K]>
    : T[K];
};

export type SiteData = Mutable<typeof SITE> & { faq: FaqItem[] };

// ─── 初期値（SITE を JSON 経由でディープコピー → ミュータブル化）─────────

const BASE: SiteData = {
  ...(JSON.parse(JSON.stringify(SITE)) as Mutable<typeof SITE>),
  faq: [],
};

// ─── マージ（配列は上書き、オブジェクトは再帰マージ）────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(base: any, patch: any): any {
  const result: Record<string, unknown> = { ...base };
  for (const k in patch) {
    const v = patch[k];
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) {
      result[k] = v;
    } else if (typeof v === "object" && typeof result[k] === "object" && !Array.isArray(result[k])) {
      result[k] = deepMerge(result[k], v);
    } else {
      result[k] = v;
    }
  }
  return result;
}

// ─── Context 型 ───────────────────────────────────────────────────────────

interface SiteCtx {
  data: SiteData;
  stored: StoredData;
  update: (patch: StoredData) => void;
  save: () => void;
  reset: () => void;
}

const SiteDataContext = createContext<SiteCtx>({
  data: BASE,
  stored: {},
  update: () => {},
  save: () => {},
  reset: () => {},
});

// ─── Provider ────────────────────────────────────────────────────────────

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredData>({});
  const [data, setData] = useState<SiteData>(BASE);

  // 初回マウント時に localStorage から復元
  useEffect(() => {
    const s = storage.read();
    if (s) {
      setStored(s);
      setData(deepMerge(BASE, s as Partial<SiteData>));
    }
  }, []);

  const update = useCallback((patch: StoredData) => {
    setStored((prev) => {
      const next = deepMerge(prev, patch as Partial<StoredData>);
      setData(deepMerge(BASE, next as Partial<SiteData>));
      return next;
    });
  }, []);

  const save = useCallback(() => {
    setStored((prev) => {
      storage.write(prev);
      return prev;
    });
  }, []);

  const reset = useCallback(() => {
    storage.clear();
    setStored({});
    setData(BASE);
  }, []);

  return (
    <SiteDataContext.Provider value={{ data, stored, update, save, reset }}>
      {children}
    </SiteDataContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────

export function useSiteData() {
  return useContext(SiteDataContext);
}

// Works / FAQ の型を再エクスポート
export type { WorkItem, FaqItem };
