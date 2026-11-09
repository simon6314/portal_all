// Configuration for the Web Apps Integration Portal
const CONFIG = {
  // App Title displayed on the header
  portalTitle: "Simon's Hub",

  // List of integrated web applications
  apps: [
    {
      id: "wranb_monitor",
      title: "水庫水情",
      url: "https://simon6314.github.io/wranb_monitor/",
      isPublic: true,
      description: "即時系統監控與數據分析儀表板",
      icon: "💧"
    },
    {
      id: "train_timetable",
      title: "火車時刻",
      url: "https://simon6314.github.io/portal_all/train/",
      isPublic: true,
      description: "台鐵班次查詢，可自行增減路線",
      icon: "🚆"
    },
    {
      id: "real_weather",
      title: "即時天氣",
      url: "https://simon6314.github.io/real_weather/?v=20260910_1142",
      isPublic: true,
      description: "在地即時氣象與天氣預報查詢",
      icon: "☀️"
    },
    {
      id: "stock_etf",
      title: "即時股市",
      url: "https://simon6314.github.io/stock_etf/",
      isPublic: true,
      description: "股票、ETF 市場走勢分析與追蹤工具",
      icon: "📈"
    },
    {
      id: "mind_analysis",
      title: "伴侶心情",
      url: "https://simon6314.github.io/mind_analysis/",
      isPublic: false,
      keywordHash: "f3d4193460774b1d0363025983f0f95bf2aee33f400de6e2569f4100c325869f", // SHA-256 hash of fox260801
      description: "心靈特質與情緒分析系統",
      icon: "🧠"
    },
    {
      id: "food_map",
      title: "美食地圖",
      url: "https://simon6314.github.io/food_map/?v=2",
      isPublic: false,
      keywordHash: "f3d4193460774b1d0363025983f0f95bf2aee33f400de6e2569f4100c325869f", // SHA-256 hash of fox260801
      description: "個人美食足跡與推薦餐廳地圖",
      icon: "🍔"
    },
    {
      id: "share-expense",
      title: "共同帳戶",
      url: "https://simon6314.github.io/share-expense/index.html?v=20260917_1142",
      isPublic: false,
      keywordHash: "f3d4193460774b1d0363025983f0f95bf2aee33f400de6e2569f4100c325869f", // SHA-256 hash of fox260801
      description: "多人分攤帳目與記帳管理工具",
      icon: "💰"
    },
    {
      id: "personal_ledger",
      title: "我的帳本",
      url: "https://simon6314.github.io/personal-ledger/",
      isPublic: false,
      keywordHash: "f3d4193460774b1d0363025983f0f95bf2aee33f400de6e2569f4100c325869f", // SHA-256 hash of fox260801
      description: "個人收支、轉帳與多帳戶記帳",
      icon: "📒"
    },
    {
      id: "bill_notify",
      title: "帳單管理",
      url: "https://simon6314.github.io/bill_notify/",
      isPublic: false,
      keywordHash: "f3d4193460774b1d0363025983f0f95bf2aee33f400de6e2569f4100c325869f", // SHA-256 hash of fox260801
      description: "信用卡與定期繳費管理，每月確認是否已繳納",
      icon: "🧾"
    },
    {
      id: "canada_honeymoon",
      title: "蜜月行程",
      url: "https://simon6314.github.io/canada_honeymoon/index.html",
      isPublic: false,
      keywordHash: "f3d4193460774b1d0363025983f0f95bf2aee33f400de6e2569f4100c325869f", // SHA-256 hash of fox260801
      description: "加拿大蜜月行前規劃與精彩行程紀錄",
      icon: "🍁"
    },
    {
      id: "teacher_words",
      title: "評語生成器",
      url: "https://simon6314.github.io/teacher_words/index.html",
      isPublic: false,
      keywordHash: "f3d4193460774b1d0363025983f0f95bf2aee33f400de6e2569f4100c325869f", // SHA-256 hash of fox260801
      description: "導師期末評語 AI 生成器，支援一鍵點選常用標籤與同步寫回 Google 試算表。",
      icon: "✍️"
    },
    {
      id: "exercis_encourage",
      title: "體態與運動激勵",
      url: "https://simon6314.github.io/exercis_encourage/index.html",
      isPublic: false,
      keywordHash: "f3d4193460774b1d0363025983f0f95bf2aee33f400de6e2569f4100c325869f", // SHA-256 hash of fox260801
      description: "結合 AI 估算、科學體態預測、Google Sheets 同步與動態激勵機制的健身看板。",
      icon: "⚡"
    }
  ]
};

// Export config if using modules, otherwise it sits in global scope
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
