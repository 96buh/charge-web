"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SequenceItem {
  current: number;
  voltage: number;
  power: number;
  temp_C: number;
}

interface MyLineChartProps {
  /** 從 page 拿到的 sequence 陣列 */
  sequence: SequenceItem[];
  /** 要畫哪個欄位，可選 "voltage" | "current" | "power" */
  field: keyof Pick<SequenceItem, "voltage" | "current" | "power">;
  /** 圖標題，預設為 chartConfig 內的 label */
  title?: string;
  /** 圖說明（subtitle） */
  description?: string;
}

// 定義各 field 的標籤與顏色
const chartConfig: Record<
  MyLineChartProps["field"],
  { label: string; color: string }
> = {
  voltage: { label: "Voltage", color: "darkgreen" },
  current: { label: "Current", color: "red" },
  power: { label: "Power", color: "#0A2472" },
} satisfies ChartConfig;

export function MyLineChart({
  sequence,
  field,
  title,
  description,
}: MyLineChartProps) {
  // 根據 sequence 順序作為 X 軸秒數
  const chartData = sequence.map((d, i) => ({
    sec: i,
    [field]: d[field],
  }));

  const { label, color } = chartConfig[field];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title ?? label}</CardTitle>
        <CardDescription>
          {description ?? `最近 ${sequence.length} 秒 ${label} 變化`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ [field]: { label, color } }}>
          <LineChart data={chartData} margin={{ left: -10, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="sec"
              type="number"
              domain={[0, sequence.length > 0 ? sequence.length - 1 : 0]}
              tickLine={false}
              axisLine={false}
              tickMargin={5}
            />
            <YAxis
              dataKey={field}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey={field}
              name={label}
              type="linear"
              stroke={color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
