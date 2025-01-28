export interface Transaction {
  id: string;
  type: string;
  date: string;
  asset: string;
  amount: number;
  fees: number;
  status: string;
  description: string;
}
