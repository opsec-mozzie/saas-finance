import { TransactionType } from "@prisma/client";

export const transactionTypeMap: Record<TransactionType, string> = {
  EXPENSE: "Despesa",
  DEPOSIT: "Depósito",
  INVESTMENT: "Investimento",
} as const;

// Helper function para obter o label traduzido
export const getTransactionTypeLabel = (method: TransactionType): string => {
  return transactionTypeMap[method];
};

// Helper function para obter array de métodos para select/combobox
export const getTransactionTypeOptions = () => {
  return Object.entries(transactionTypeMap).map(([value, label]) => ({
    value,
    label,
  }));
};
