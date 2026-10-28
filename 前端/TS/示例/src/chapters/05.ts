export {};

function normalize(value: string): string;
function normalize(value: number): number;
function normalize(value: string | number): string | number {
  return typeof value === 'string' ? value.trim() : Math.round(value);
}

type Filter<T> = (item: T, index: number) => boolean;
function select<T>(items: readonly T[], predicate: Filter<T>): T[] {
  return items.filter(predicate);
}
const result = select([1, 2, 3], n => n > 1);
console.log(normalize('  TS  '), result);
