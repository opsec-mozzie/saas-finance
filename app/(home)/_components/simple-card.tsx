import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "secondary" | "primary";
}

const SimpleCard = ({
  icon,
  title,
  amount,
  size = "secondary",
}: SummaryCardProps) => (
  <Card className={` ${size === "primary" ? "bg-white bg-opacity-5" : ""} `}>
    <CardHeader className="flex flex-row items-center gap-4">
      {icon}
      <p
        className={`${size === "secondary" ? "text-muted-foreground" : "text-white opacity-70"}`}
      >
        {title}
      </p>
    </CardHeader>
    <CardContent className="flex flex-row justify-between">
      <p
        className={`${size === "secondary" ? "text-2xl" : "text-4xl"} font-bold`}
      >
        {Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(amount)}
      </p>
      {size === "primary" && <AddTransactionButton />}
    </CardContent>
  </Card>
);

export default SimpleCard;
