import React, { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input, InputProps } from "@/app/_components/ui/input";

// Crie um tipo que combina as props do NumericFormat com as props do Input
type MoneyInputProps = Omit<NumericFormatProps, "customInput"> & InputProps;

export const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(
  (props, ref) => {
    return (
      <NumericFormat
        customInput={Input} // Aqui especificamos que queremos usar o Input do shadcn/ui
        {...props}
        getInputRef={ref}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        decimalScale={2}
        fixedDecimalScale
      />
    );
  },
);

MoneyInput.displayName = "MoneyInput";

export default MoneyInput;
