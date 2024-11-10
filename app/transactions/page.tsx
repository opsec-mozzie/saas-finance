import React from "react";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionsColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";

const TransactionsPage = async () => {
  const transaction = await db.transaction.findMany({});

  return (
    <div className="space-y-6 p-6">
      {/* content header */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      {/* end content header */}
      <DataTable columns={transactionsColumns} data={transaction} />
    </div>
  );
};

export default TransactionsPage;
