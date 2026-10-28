export {};

interface Named { name: string }
interface User extends Named { id: number }
type Result<T> = { ok: true; data: T } | { ok: false; message: string };

function showName(value: Named): string { return value.name; }
const user: User = { id: 1, name: '小陈' };
console.log(showName(user));

function greet(result: Result<User>): string {
  return result.ok ? result.data.name : result.message;
}
