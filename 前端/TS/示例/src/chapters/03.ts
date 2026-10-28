export {};

function parseName(input: unknown): string {
  if (typeof input !== 'object' || input === null) {
    throw new Error('必须是对象');
  }
  if (!('name' in input) || typeof input.name !== 'string') {
    throw new Error('name 必须是字符串');
  }
  return input.name.trim();
}

function fail(message: string): never {
  throw new Error(message);
}
console.log(parseName({ name: '小陈' }));
