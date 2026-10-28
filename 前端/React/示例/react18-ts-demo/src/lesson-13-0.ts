export {};
export interface CartLine { productId: string; priceCents: number; quantity: number }
export function add(lines: readonly CartLine[], productId: string, priceCents: number): CartLine[] {
  if (!Number.isInteger(priceCents) || priceCents < 0) throw new Error('价格无效');
  const exists = lines.some(line => line.productId === productId);
  return exists
    ? lines.map(line => line.productId === productId ? { ...line, quantity: line.quantity + 1 } : line)
    : [...lines, { productId, priceCents, quantity: 1 }];
}
export function totalCents(lines: readonly CartLine[]): number {
  return lines.reduce((total, line) => total + line.priceCents * line.quantity, 0);
}
