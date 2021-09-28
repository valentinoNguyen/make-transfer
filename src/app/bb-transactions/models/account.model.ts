import { AmountCurrency } from "./amount-currency.model";

export interface Account {
  amountCurrency: AmountCurrency;
  minBalanceAllowed: number;
}
