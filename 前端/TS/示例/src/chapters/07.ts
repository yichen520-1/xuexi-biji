export {};

class Counter {
  #value = 0;
  constructor(public readonly label: string) {}
  get value(): number { return this.#value; }
  increment(step = 1): void {
    if (!Number.isFinite(step)) throw new Error('步长无效');
    this.#value += step;
  }
}
const counter = new Counter('学习次数');
counter.increment();
console.log(counter.label, counter.value);
