import { AmountCurrency } from "./amount-currency.model";

export interface Transaction {
  id: string;
  merchant: Merchant;
  dates: TransactionDate;
  categoryCode: string;
  transaction: TransactionDetail;
}

export interface Merchant {
  name: string;
  accountNumber: string;
}

export interface TransactionDate {
  valueDate: number;
}

export interface TransactionDetail {
  type: string;
  creditDebitIndicator: string;
  amountCurrency: AmountCurrency;
}
