import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { type StatCardProps } from "@/lib/types";

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <Card
    // style={{
    //   backgroundColor: "",
    //   borderStyle: "solid",
    //   borderColor: "",
    // }}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
