import { TransactionPaymentMethod } from "@prisma/client";

export const paymentMethodMap: Record<TransactionPaymentMethod, string> = {
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  BANK_TRANSFER: "Transferência Bancária",
  BANK_SLIP: "Boleto",
  CASH: "Dinheiro",
  PIX: "Pix",
  OTHER: "Outro",
} as const;

// Helper function para obter o label traduzido
export const getPaymentMethodLabel = (
  method: TransactionPaymentMethod,
): string => {
  return paymentMethodMap[method];
};

// Helper function para obter array de métodos para select/combobox
export const getPaymentMethodOptions = () => {
  return Object.entries(paymentMethodMap).map(([value, label]) => ({
    value,
    label,
  }));
};
