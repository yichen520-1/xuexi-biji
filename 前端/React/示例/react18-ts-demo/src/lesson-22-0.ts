export {};
interface Query { page: number; pageSize: number; channelId?: string; status?: string }
export function toSearch(query: Query): string {
  if (!Number.isInteger(query.page) || query.page < 1) throw new Error('页码无效');
  if (!Number.isInteger(query.pageSize) || query.pageSize < 1) throw new Error('页大小无效');
  const params = new URLSearchParams({ page: String(query.page), pageSize: String(query.pageSize) });
  if (query.channelId) params.set('channelId', query.channelId);
  if (query.status) params.set('status', query.status);
  return params.toString();
}
