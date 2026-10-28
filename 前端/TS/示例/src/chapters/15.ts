export {};

interface User { id: number; name: string }
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'number'
    && Number.isFinite(value.id)
    && 'name' in value && typeof value.name === 'string';
}
async function loadUser(url: string, signal?: AbortSignal): Promise<User> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data: unknown = await response.json();
  if (!isUser(data)) throw new Error('用户数据格式不符');
  return data;
}
