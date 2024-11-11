"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form"; // Removido Form daqui
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getTransactionTypeOptions } from "../transactions/_constants/types";
import { getPaymentMethodOptions } from "../transactions/_constants/paymentMethods";
import {
  categoryGroups,
  transactionCategoryMap,
} from "../transactions/_constants/categories";
import { DatePicker } from "./ui/date-picker";
import MoneyInput from "./money-input";
import { addTransaction } from "../_actions/add-transaction";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "O nome da transação é obrigatório" }),
  amount: z.number().positive(),
  type: z
    .nativeEnum(TransactionType, {
      required_error: "O tipo da transação é obrigatório",
    })
    .default(TransactionType.EXPENSE),
  category: z.nativeEnum(TransactionCategory, {
    required_error: "A categoria é obrigatória",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: "O metodo de pagamento é obrigatório",
  }),
  date: z.date({ required_error: "A data é obrigatória" }).default(new Date()),
});

type formSchema = z.infer<typeof formSchema>;

const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 10,
      type: TransactionType.EXPENSE,
      category: TransactionCategory.OTHER,
      paymentMethod: TransactionPaymentMethod.PIX,
      date: new Date(),
    },
  });

  const onSubmit = async (data: formSchema) => {
    try {
      await addTransaction(data);
      setDialogIsOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const groupedOptions = Object.entries(categoryGroups).map(
    ([groupName, categories]) => ({
      group: groupName,
      items: categories
        .filter((category) => transactionCategoryMap[category])
        .map((category) => ({
          value: category,
          label: transactionCategoryMap[category],
        }))
        .sort((a, b) => a.label.localeCompare(b.label, "pt-BR")),
    }),
  );

  return (
    <Dialog
      open={dialogIsOpen}
      onOpenChange={(open) => {
        setDialogIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="rounded-full font-bold">
          Adicionar Transação
          <ArrowDownUpIcon className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Transação</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da transação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getTransactionTypeOptions().map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {groupedOptions.map(({ group, items }) => (
                        <div key={group} className="px-2">
                          <div className="py-2 text-sm font-semibold text-gray-500">
                            {group}
                          </div>
                          {items.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getPaymentMethodOptions().map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor..."
                      onValueChange={({
                        floatValue,
                      }: {
                        floatValue: number;
                      }) => {
                        field.onChange(floatValue);
                      }}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              {/* as chield para não criar um botão dentro de botão */}
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionButton;
