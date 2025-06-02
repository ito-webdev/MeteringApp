export const meters = [
  {
    id: 1,
    name: "水道(1F)",
    lastMonthReading: 1200,
    lastMonthUsage: 250,
    lastYearUsage: 200,
    currentReading: null,
    images: [],
    history: [
      { month: "2023-05", value: 1150, usage: 220 },
      { month: "2023-04", value: 900, usage: 250 },
      { month: "2023-03", value: 650, usage: 220 },
      { month: "2023-02", value: 430, usage: 220 },
      { month: "2023-01", value: 210, usage: 220 },
      { month: "2022-12", value: 50, usage: 160 },
      { month: "2022-11", value: 30, usage: 20 },
      { month: "2022-10", value: 0, usage: 0 }
    ]
  },
  {
    id: 2,
    name: "水道(2F)",
    lastMonthReading: 2000,
    lastMonthUsage: 340,
    lastYearUsage: 310,
    currentReading: null,
    images: [],
    history: [
      { month: "2023-05", value: 1660, usage: 300 },
      { month: "2023-04", value: 1320, usage: 340 },
      { month: "2023-03", value: 980, usage: 340 },
      { month: "2023-02", value: 680, usage: 300 },
      { month: "2023-01", value: 380, usage: 300 },
      { month: "2022-12", value: 200, usage: 180 },
      { month: "2022-11", value: 100, usage: 100 }
    ]
  },
  {
    id: 3,
    name: "電気(メイン)",
    lastMonthReading: 15100,
    lastMonthUsage: 180,
    lastYearUsage: 200,
    currentReading: null,
    images: [],
    history: [
      { month: "2023-05", value: 14920, usage: 170 },
      { month: "2023-04", value: 14750, usage: 180 },
      { month: "2023-03", value: 14570, usage: 180 },
      { month: "2023-02", value: 14400, usage: 170 },
      { month: "2023-01", value: 14200, usage: 200 },
      { month: "2022-12", value: 14000, usage: 200 },
      { month: "2022-11", value: 13800, usage: 220 },
      { month: "2022-10", value: 13600, usage: 200 }
    ]
  },
  {
    id: 4,
    name: "電気(サブ)",
    lastMonthReading: 8000,
    lastMonthUsage: 150,
    lastYearUsage: 160,
    currentReading: null,
    images: [],
    history: [
      { month: "2023-05", value: 7850, usage: 140 },
      { month: "2023-04", value: 7700, usage: 150 },
      { month: "2023-03", value: 7500, usage: 200 },
      { month: "2023-02", value: 7300, usage: 200 },
      { month: "2023-01", value: 7100, usage: 200 },
      { month: "2022-12", value: 6900, usage: 200 },
      { month: "2022-11", value: 6800, usage: 100 },
      { month: "2022-10", value: 6700, usage: 100 }
    ]
  }
];

export const WARNING_THRESHOLD = 0.2;
