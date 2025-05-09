import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { type StatCardProps } from "@/lib/types";

export default function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <Card
    // style={{
    //   backgroundColor: "",
    //   borderStyle: "solid",
    //   borderColor: "",
    // }}
    >
      <CardHeader className="flex justify-between">
        <CardTitle>{title}</CardTitle>
        {Icon && <Icon className="w-6 h-6" />}
        {/*<CardDescription>Card Description</CardDescription>*/}
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
      {/*
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
      */}
    </Card>
  );
}
