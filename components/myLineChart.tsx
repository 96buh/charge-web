"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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

import { generateLiveData } from "@/hooks/generateLiveData";

const chartConfig = {
  voltage: {
    label: "Voltage",
    color: "red",
  },
} satisfies ChartConfig;

export function MyLineChart() {
  const chartData = generateLiveData();
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>電壓</CardTitle>
        <CardDescription>最近30秒電壓變化</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="sec"
              interval={3}
              tickLine={false}
              axisLine={false}
              tickMargin={5}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/*<ChartLegend content={<ChartLegendContent />} />*/}
            <Line
              dataKey="voltage"
              type="linear"
              stroke="var(--color-voltage)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
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
