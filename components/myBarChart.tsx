"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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
} from "@/components/ui/chart";
import { anomalyStore } from "@/lib/anomalyStore";
// const chartData = [
//   { day: "Mon", value: 186 },
//   { day: "Tue", value: 305 },
//   { day: "Wen", value: 237 },
//   { day: "Thu", value: 73 },
//   { day: "Fri", value: 209 },
//   { day: "Sat", value: 214 },
//   { day: "Sun", value: 14 },
// ];

const chartConfig = {
  value: {
    label: "充電量",
    color: "cyan",
  },
} satisfies ChartConfig;

export function MyBarChart({ days = 7 }: { days?: number }) {
  const data = anomalyStore.dailyCounts(days);
  return (
    <Card>
      <CardHeader>
        <CardTitle>HELLO</CardTitle>
        {/*<CardDescription>January - June 2024</CardDescription>*/}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="count"
              fill="var(--color-value)"
              radius={8}
              name={"次數"}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
