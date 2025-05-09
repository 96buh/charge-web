// scripts/fake_gateway.js
import { createServer } from "http";
import { randomUUID } from "crypto";

const PORT = 4000;
const SAMPLES_PER_SEC = 10; // ← 想改頻率就在這裡動
const INTERVAL_MS = 1000 / SAMPLES_PER_SEC;

const headers = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
};

createServer((req, res) => {
  if (req.url !== "/events") return res.end("not found");

  res.writeHead(200, headers);
  const id = randomUUID();

  const timer = setInterval(() => {
    const voltage = +(5 + Math.random() * 0.2).toFixed(3); // 5.000 – 5.200 V
    const current = +(0.8 + Math.random() * 0.4).toFixed(2); // 0.80 – 1.20 A
    const power = +(voltage * current).toFixed(3);
    const temperature = +(35 + Math.random() * 5).toFixed(2); // 35 – 40 °C

    const sample = {
      ts: Date.now(),
      voltage,
      current,
      power,
      temperature,
      device_id: id,
    };

    res.write(`data:${JSON.stringify(sample)}\n\n`);
  }, INTERVAL_MS);

  req.on("close", () => clearInterval(timer));
}).listen(PORT, () =>
  console.log(
    `🔴  SSE Gateway listening (${SAMPLES_PER_SEC} Hz)  →  http://localhost:${PORT}/events`,
  ),
);
