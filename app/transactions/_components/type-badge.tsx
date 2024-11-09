import { Badge } from "@/app/_components/ui/badge";
import { Transaction } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === "DEPOSIT") {
    return (
      <Badge className="bg-green-500 bg-opacity-10 text-green-500 hover:bg-green-500 hover:bg-opacity-10">
        <CircleIcon className="mr-2 fill-green-500" size={10} />
        Depósito
      </Badge>
    );
  } else if (transaction.type === "EXPENSE") {
    return (
      <Badge className="bg-red-500 bg-opacity-10 text-red-500 hover:bg-red-500 hover:bg-opacity-10">
        <CircleIcon className="mr-2 fill-red-500" size={10} />
        Despesa
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-muted text-white hover:bg-muted">
        <CircleIcon className="mr-2 fill-white" size={10} />
        Investimento
      </Badge>
    );
  }
};

export default TransactionTypeBadge;
