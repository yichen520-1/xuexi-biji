export {};

function first<T>(items: readonly T[]): T | undefined {
  return items[0];
}
function pick<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}
interface HasId { id: number }
function findById<T extends HasId>(items: readonly T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}
const user = { id: 1, name: '小陈' };
const name = pick(user, 'name');
console.log(name.toUpperCase(), first([1, 2]));
