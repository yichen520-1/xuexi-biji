export {};
interface Bill { id: string; date: string; amountCents: number; type: 'income' | 'expense' }
export function groupMonth(bills: readonly Bill[], month: string): Map<string, Bill[]> {
  const groups = new Map<string, Bill[]>();
  for (const bill of bills) {
    if (!bill.date.startsWith(`${month}-`)) continue;
    const day = groups.get(bill.date);
    if (day) day.push(bill);
    else groups.set(bill.date, [bill]);
  }
  return groups;
}
