export type Anomaly = {
  id: string;
  deviceId: string;
  ts: number; // timestamp
  type: "OverHeat" | "UnderVoltage";
  metric: string; // temperature / voltage
  value: number;
  threshold: number;
  severity: "warning" | "critical";
};

const seed: Anomaly[] = (() => {
  const now = Date.now();
  return Array.from({ length: 25 }, (_, i) => ({
    id: crypto.randomUUID(),
    deviceId: "dev-01",
    ts: now - Math.floor(Math.random() * 7) * 86_400_000,
    type: i % 2 ? "OverHeat" : "UnderVoltage",
    metric: i % 2 ? "temperature" : "voltage",
    value: i % 2 ? 40 + Math.random() * 5 : 3 + Math.random() * 0.5,
    threshold: i % 2 ? 38 : 4,
    severity: Math.random() > 0.7 ? "critical" : "warning",
  }));
})();

export const anomalyStore = {
  rows: [...seed] as Anomaly[],

  insert(a: Anomaly) {
    this.rows.push(a);
  },

  /* 最近 N 天次數 -> [{day,count}] */
  dailyCounts(days = 7) {
    const now = Date.now();
    const arr = Array.from({ length: days }, (_, i) => {
      const d = new Date(now - (days - 1 - i) * 86_400_000);
      return { day: d.toLocaleDateString(), count: 0 };
    });
    this.rows.forEach((r) => {
      const diff = Math.floor((now - r.ts) / 86_400_000);
      if (diff >= 0 && diff < days) arr[days - 1 - diff].count += 1;
    });
    return arr;
  },

  /* 類型占比 -> [{name,value}] */
  typeHistogram() {
    const map: Record<string, number> = {};
    this.rows.forEach((r) => {
      map[r.type] = (map[r.type] ?? 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  },
};
