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
      icon: "📊"
    },
    {
      id: "real_weather",
      title: "即時天氣",
      url: "https://simon6314.github.io/real_weather/",
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
      url: "https://simon6314.github.io/food_map/",
      isPublic: false,
      keywordHash: "f3d4193460774b1d0363025983f0f95bf2aee33f400de6e2569f4100c325869f", // SHA-256 hash of fox260801
      description: "個人美食足跡與推薦餐廳地圖",
      icon: "🍔"
    },
    {
      id: "share-expense",
      title: "共同帳戶",
      url: "https://simon6314.github.io/share-expense/index.html",
      isPublic: false,
      keywordHash: "f3d4193460774b1d0363025983f0f95bf2aee33f400de6e2569f4100c325869f", // SHA-256 hash of fox260801
      description: "多人分攤帳目與記帳管理工具",
      icon: "💸"
    },
    {
      id: "canada_honeymoon",
      title: "蜜月行程",
      url: "https://simon6314.github.io/canada_honeymoon/",
      isPublic: false,
      keywordHash: "f3d4193460774b1d0363025983f0f95bf2aee33f400de6e2569f4100c325869f", // SHA-256 hash of fox260801
      description: "加拿大蜜月行前規劃與精彩行程紀錄",
      icon: "🍁"
    }
  ]
};

// Export config if using modules, otherwise it sits in global scope
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
