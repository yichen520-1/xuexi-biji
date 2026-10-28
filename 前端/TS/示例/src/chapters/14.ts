export {};

// types.ts
export interface Task { id: number; title: string }

// consumer.ts（实际项目应分成另一个文件）
// import type { Task } from './types.js';
export function summarize(task: Task): string {
  return `${task.id}: ${task.title}`;
}
