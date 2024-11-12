import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SimpleCard from "./simple-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCardProps {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCardProps) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const investmentTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const expenseTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const balance = depositsTotal - (investmentTotal + expenseTotal);

  return (
    <div className="space-y-6">
      {/* first card */}
      <SimpleCard
        icon={<WalletIcon size={16} className="text-blue-500" />}
        title={"Saldo"}
        amount={balance}
        size="primary"
      />

      <div className="grid grid-cols-3 gap-6">
        <SimpleCard
          icon={<PiggyBankIcon size={16} className="text-yellow-500" />}
          title={"Investido"}
          amount={investmentTotal}
        />
        <SimpleCard
          icon={<TrendingUpIcon size={16} className="text-green-500" />}
          title={"Receita"}
          amount={depositsTotal}
        />
        <SimpleCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title={"Despesas"}
          amount={expenseTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
