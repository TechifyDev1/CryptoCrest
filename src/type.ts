export interface Transaction {
  id: string;
  type: string;
  date: string;
  asset: string;
  amount: number;
  fees: number;
  status: string;
  description: string;
  value: number;
}

export interface CurrencyProps {
  coin: string;
  balance: number;
  price: number;
}
