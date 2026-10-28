export {};

function logged(
  original: (this: Counter) => number,
  context: ClassMethodDecoratorContext<Counter, (this: Counter) => number>,
) {
  return function (this: Counter): number {
    console.log(`调用 ${String(context.name)}`);
    return original.call(this);
  };
}
class Counter {
  private value = 0;
  @logged
  increment(): number { return ++this.value; }
}
console.log(new Counter().increment());
