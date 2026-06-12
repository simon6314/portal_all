// Configuration for the Web Apps Integration Portal
const CONFIG = {
  // App Title displayed on the header
  portalTitle: "Simon's Hub",
  
  // List of integrated web applications
  apps: [
    {
      id: "wranb_monitor",
      title: "WRANB Monitor",
      url: "https://simon6314.github.io/wranb_monitor/",
      isPublic: true,
      description: "即時系統監控與數據分析儀表板",
      icon: "📊"
    },
    {
      id: "real_weather",
      title: "Real Weather",
      url: "https://simon6314.github.io/real_weather/",
      isPublic: true,
      description: "在地即時氣象與天氣預報查詢",
      icon: "☀️"
    },
    {
      id: "stock_etf",
      title: "Stock ETF",
      url: "https://simon6314.github.io/stock_etf/",
      isPublic: true,
      description: "股票、ETF 市場走勢分析與追蹤工具",
      icon: "📈"
    },
    {
      id: "mind_analysis",
      title: "Mind Analysis",
      url: "https://simon6314.github.io/mind_analysis/",
      isPublic: false,
      keyword: "mind123", // Modify this to change the access passcode
      description: "心靈特質與情緒分析系統",
      icon: "🧠"
    },
    {
      id: "food_map",
      title: "Food Map",
      url: "https://simon6314.github.io/food_map/",
      isPublic: false,
      keyword: "food123", // Modify this to change the access passcode
      description: "個人美食足跡與推薦餐廳地圖",
      icon: "🍔"
    },
    {
      id: "share-expense",
      title: "Share Expense",
      url: "https://simon6314.github.io/share-expense/index.html",
      isPublic: false,
      keyword: "expense123", // Modify this to change the access passcode
      description: "多人分攤帳目與記帳管理工具",
      icon: "💸"
    },
    {
      id: "canada_honeymoon",
      title: "Canada Honeymoon",
      url: "https://simon6314.github.io/canada_honeymoon/",
      isPublic: false,
      keyword: "honeymoon123", // Modify this to change the access passcode
      description: "加拿大蜜月行前規劃與精彩行程紀錄",
      icon: "🍁"
    }
  ]
};

// Export config if using modules, otherwise it sits in global scope
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
