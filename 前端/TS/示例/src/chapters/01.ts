export {};

interface User { id: number; name: string }
function greet(user: User): string {
  return `你好，${user.name}`;
}
const user: User = { id: 1, name: '小陈' };
console.log(greet(user));
