export type PayCycle = 'daily' | 'weekly' | 'monthly';
export interface ContractData {
  companyName: string;
  pay: number;
  payDate: number;
  payCycle: PayCycle;
  startDate: string;
  endDate: string;
}
