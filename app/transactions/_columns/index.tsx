"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "../_components/type-badge";
import { getCategoryLabel } from "@/app/transactions/_constants/categories";
import { getPaymentMethodLabel } from "../_constants/paymentMethods";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    // destruct -> dentro de row, pegou o original e renomeou para transaction
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) => (
      <div>{getCategoryLabel(transaction.category)}</div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction } }) => (
      <div>{getPaymentMethodLabel(transaction.paymentMethod)}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) => (
      <div>
        {new Date(transaction.date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => (
      <div className="flex space-x-1">
        <Button variant="ghost" size={"icon"} className="text-muted-foreground">
          <PencilIcon />
        </Button>
        <Button variant="ghost" size={"icon"} className="text-muted-foreground">
          <TrashIcon />
        </Button>
      </div>
    ),
  },
];
