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

// import { generateLiveData } from "@/hooks/generateLiveData";

type Props = {
  series: Point[];
  yKey: "voltage" | "current" | "power";
  label: string;
};

export function MyLineChart({ series, yKey, label }: Props) {
  const now = Date.now();
  const chartData = series.map((p) => ({
    sec: (now - p.ts) / 1000, // 0 ~ 30
    ...p,
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>最近30秒變化</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              // left: 12,
              left: -22,
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
              dataKey={yKey}
              type="linear"
              stroke={`var(--color-${yKey})`}
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
