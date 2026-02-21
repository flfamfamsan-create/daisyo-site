/**
 * 大翔工業 サイトコンテンツ一元管理ファイル
 *
 * 住所・電話・営業時間・定休日・施工事例・求人などはここを編集してください。
 */

export const SITE = {
  /* ─── 会社基本情報 ─────────────────────────────── */
  company: {
    name: "株式会社 大翔工業",
    nameShort: "大翔工業",
    nameEn: "DAISHO KOGYO Co., Ltd.",
    zip: "190-0182",
    addresses: [
      { label: "本社", value: "東京都西多摩郡日の出町平井1759-3" },
      { label: "事業所", value: "東京都西多摩郡日の出町平井2-1" },
    ],
    tel: "042-519-9440",
    fax: "042-519-9441",
    /** 空文字の場合は「—」または非表示になります */
    businessHours: "" as string,
    /** 空文字の場合は「—」または非表示になります */
    holiday: "" as string,
    instagram: "https://www.instagram.com/dsk.1112/",
    existingHp: "https://www.daisyoukougyou.com/",
    description:
      "多摩地区などを中心に上下水道工事・土木工事を行っている会社です。",
  },

  /* ─── 事業内容 ─────────────────────────────────── */
  services: [
    {
      id: "water",
      title: "上下水道工事",
      subtitle: "Water & Sewer",
      colorClass: "from-cyan-600 to-cyan-800",
      bgClass: "bg-cyan-50",
      borderClass: "border-cyan-200",
      dotClass: "bg-cyan-600",
      description:
        "給水管・排水管の新設・改修・修繕工事。水漏れや詰まりのトラブルから計画的な管路更新まで幅広く対応します。",
      items: [
        "給水管・排水管の新設・改修",
        "漏水修繕・緊急対応",
        "配管の更新・布設替え",
        "水道メーター周辺工事",
        "汚水・雨水排水整備",
      ],
    },
    {
      id: "civil",
      title: "土木工事",
      subtitle: "Civil Engineering",
      colorClass: "from-amber-600 to-amber-800",
      bgClass: "bg-amber-50",
      borderClass: "border-amber-200",
      dotClass: "bg-amber-600",
      description:
        "掘削・埋戻しを伴う配管工事から道路・排水路整備まで、地域インフラを支える土木工事を行います。",
      items: [
        "掘削・埋戻し工事",
        "道路舗装・補修",
        "側溝・排水路整備",
        "擁壁・基礎工事",
        "造成・整地工事",
      ],
    },
  ],

  /* ─── 選ばれる理由 ──────────────────────────────── */
  features: [
    {
      num: "01",
      title: "多摩地区に根ざした機動力",
      highlight: "地域密着の安心感",
      description:
        "西多摩・多摩地区を中心に地元に密着した体制で活動しています。現場へのアクセスが早く、状況に応じた柔軟な対応が可能です。",
    },
    {
      num: "02",
      title: "上下水道と土木をワンストップで",
      highlight: "一括対応で手間いらず",
      description:
        "水道工事から掘削・埋戻しまで一社で対応できる体制を整えています。複数業者への発注が不要で、段取りもスムーズです。",
    },
    {
      num: "03",
      title: "小さな工事からご相談ください",
      highlight: "規模を問わず丁寧対応",
      description:
        "「こんな小さな工事でも頼めるの？」と思うようなご依頼でも、まずはお気軽にご連絡ください。規模の大小を問わず誠実に対応します。",
    },
    {
      num: "04",
      title: "安全管理と近隣配慮を徹底",
      highlight: "現場の信頼を大切に",
      description:
        "施工前の近隣へのご挨拶、工事中の安全管理、完工後の清掃まで責任を持って対応。地域の方に迷惑をかけない現場づくりを心がけています。",
    },
    {
      num: "05",
      title: "工期と品質を重視した施工",
      highlight: "納期厳守・丁寧施工",
      description:
        "約束した工期を守ること、丁寧な仕上がりにこだわること。完工後も気になる点があればお気軽にご相談ください。",
    },
  ],

  /* ─── 対応エリア ────────────────────────────────── */
  areas: [
    { name: "日の出町", primary: true },
    { name: "瑞穂町", primary: true },
    { name: "奥多摩町", primary: true },
    { name: "檜原村", primary: true },
    { name: "青梅市", primary: true },
    { name: "福生市", primary: false },
    { name: "羽村市", primary: false },
    { name: "あきる野市", primary: false },
  ],

  /* ─── 施工事例（実績は順次追加）──────────────────── */
  works: [
    {
      id: 1,
      category: "上下水道工事",
      categoryColor: "bg-cyan-600",
      title: "給排水配管の改修工事",
      location: "日の出町",
      description:
        "老朽化した給排水配管を改修。掘削から埋戻しまで一括施工しました。",
      tags: ["配管改修", "給排水"],
      image: "/images/work-1.jpg",
      gradient: "from-cyan-600 to-blue-700",
    },
    {
      id: 2,
      category: "上下水道工事",
      categoryColor: "bg-cyan-600",
      title: "漏水修繕",
      location: "あきる野市",
      description:
        "道路下の配管からの漏水を早急に特定・修繕。交通規制と近隣への丁寧な対応も実施。",
      tags: ["漏水修繕", "緊急対応"],
      image: "/images/work-2.jpg",
      gradient: "from-cyan-500 to-teal-700",
    },
    {
      id: 3,
      category: "上下水道工事",
      categoryColor: "bg-cyan-600",
      title: "給水管更新工事",
      location: "青梅市",
      description:
        "経年劣化した給水管を最新の樹脂管へ更新。断水時間を最小限に抑えながら完工。",
      tags: ["給水管更新"],
      image: "/images/work-3.jpg",
      gradient: "from-blue-600 to-indigo-700",
    },
    {
      id: 4,
      category: "土木工事",
      categoryColor: "bg-amber-600",
      title: "敷地内排水整備",
      location: "瑞穂町",
      description:
        "雨水の流れを改善するため、敷地内に新たな排水路を整備。舗装の復旧まで一括対応。",
      tags: ["排水整備", "土木"],
      image: "/images/work-4.jpg",
      gradient: "from-amber-600 to-orange-700",
    },
    {
      id: 5,
      category: "土木工事",
      categoryColor: "bg-amber-600",
      title: "掘削〜埋戻しを伴う配管更新",
      location: "羽村市",
      description:
        "道路掘削を伴う配管更新工事。安全な工事区画の設置・舗装復旧・清掃まで実施。",
      tags: ["掘削", "埋戻し", "配管更新"],
      image: "/images/work-5.jpg",
      gradient: "from-amber-500 to-yellow-700",
    },
  ],

  /* ─── 求人情報 ──────────────────────────────────── */
  recruit: {
    catchcopy: "未経験・経験者、ともに歓迎。",
    description:
      "大翔工業では現場で働く仲間を募集しています。経験がなくても大丈夫。一緒に多摩の地域インフラを支えましょう。",
    items: [
      { label: "仕事内容", value: "現場での作業（上下水道工事・土木工事）" },
      { label: "勤務時間", value: "8:00〜17:00（現場により変動あり）" },
      { label: "応募資格", value: "年齢・学歴不問。未経験歓迎。" },
      { label: "勤務地", value: "主に多摩地区の現場" },
      { label: "給与", value: "日給10,000円以上（経験・能力・前職給与を考慮）" },
      { label: "休日", value: "日曜 / GW / 夏季休暇 / 年末年始" },
      {
        label: "待遇",
        value: "昇給あり / 社会保険完備 / 資格取得支援制度あり / 作業着支給",
      },
    ],
    how: [
      "お問い合わせフォームよりご連絡ください",
      "お電話（042-519-9440）でもお受けしています",
    ],
  },

  /**
   * 資格・許認可
   * 取得後にここへ追加してください。空配列の場合はセクション非表示。
   * 例: ["建設業許可 東京都知事 般-XX 第XXXXX号", "水道工事事業者 登録番号 XXXXX"]
   */
  licenses: [] as string[],
} as const;
