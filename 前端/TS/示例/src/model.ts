export interface Task { id: string; title: string; done: boolean }
export type Result<T> = { ok: true; data: T } | { ok: false; message: string };
export function parseTask(value: unknown): Result<Task> {
  if (typeof value !== 'object' || value === null || !('id' in value)
    || typeof value.id !== 'string' || !('title' in value) || typeof value.title !== 'string'
    || !('done' in value) || typeof value.done !== 'boolean') return { ok: false, message: '任务格式无效' };
  const title=value.title.trim();
  if (!value.id || !title) return { ok: false, message: 'id/标题不能为空' };
  return { ok: true, data: { id:value.id, title, done:value.done } };
}
export function toggleTask(tasks: readonly Task[], id: string): Task[] {
  return tasks.map(task => task.id===id ? { ...task, done:!task.done } : task);
}
export function pick<T,K extends keyof T>(object:T,key:K):T[K] { return object[key]; }
