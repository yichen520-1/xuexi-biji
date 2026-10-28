export {};
export interface Comment { id: string; text: string; createdAt: number; likes: number }
export function makeComment(text: string): Comment {
  const normalized = text.trim();
  if (!normalized) throw new Error('评论不能为空');
  return { id: crypto.randomUUID(), text: normalized, createdAt: Date.now(), likes: 0 };
}
export function sortComments(items: readonly Comment[], by: 'time' | 'likes'): Comment[] {
  return [...items].sort((a, b) => by === 'time'
    ? b.createdAt - a.createdAt : b.likes - a.likes || b.createdAt - a.createdAt);
}
