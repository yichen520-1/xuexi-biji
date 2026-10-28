export {};

type Point = readonly [x: number, y: number];
interface Task {
  readonly id: number;
  title: string;
  tags?: string[];
}
const origin: Point = [0, 0];
const tasks: Task[] = [{ id: 1, title: '学习 TS' }];

function firstTitle(items: readonly Task[]): string {
  return items[0]?.title ?? '暂无任务';
}
console.log(origin[0], firstTitle(tasks));
