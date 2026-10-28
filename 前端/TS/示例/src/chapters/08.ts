export {};

interface Logger { write(message: string): void }
abstract class Repository<T> {
  constructor(protected logger: Logger) {}
  abstract all(): readonly T[];
  count(): number { return this.all().length; }
}
class MemoryRepository<T> extends Repository<T> {
  constructor(logger: Logger, private items: T[]) { super(logger); }
  override all(): readonly T[] {
    this.logger.write('读取');
    return this.items;
  }
}
const repo = new MemoryRepository({ write: console.log }, ['TS']);
console.log(repo.count());
