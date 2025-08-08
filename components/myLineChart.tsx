"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { type Point } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
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
  /** 圖標題，如果要覆寫預設，可以傳這個 */
  title?: string;
  /** 圖說明（subtitle） */
  description?: string;
}

const chartConfig = {
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
        {/*<ChartContainer config={chartConfig}> */}
        <ChartContainer config={{ [field]: { label, color } }}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              // left: 12,
              left: -10,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="sec"
              type="number"
              tickLine={false}
              domain={[0, 30]}
              ticks={[0, 5, 10, 15, 20, 25, 30]}
              axisLine={false}
              tickMargin={5}
              // tickFormatter={(s) => `${s}s`}
            />
            <YAxis
              dataKey={yKey}
              // domain={["auto", "auto"]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            {/*<ChartLegend content={<ChartLegendContent />} />*/}
            <Line
              // dataKey="voltage"
              dataKey={field}
              type="linear"
              // stroke="var(--color-voltage)"
              stroke={color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              name={label}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/*
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
      */}
    </Card>
  );
}
