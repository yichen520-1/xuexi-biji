export {};
export interface Bill {
  id: string;
  type: 'income' | 'expense';
  amountCents: number;
  date: string; // 教学模型：本地日历日 YYYY-MM-DD
  categoryId: string;
}
export function summarize(bills: readonly Bill[]) {
  return bills.reduce((result, bill) => {
    if (bill.type === 'income') result.income += bill.amountCents;
    else result.expense += bill.amountCents;
    return result;
  }, { income: 0, expense: 0 });
}
