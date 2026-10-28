export {};
export interface Task { id: string; title: string; done: boolean }
export function makeTask(title: string): Task {
  const normalized = title.trim();
  if (!normalized) throw new Error('标题不能为空');
  return { id: crypto.randomUUID(), title: normalized, done: false };
}
