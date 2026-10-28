export {};
export async function requestJson(path: string, init: RequestInit = {}): Promise<unknown> {
  const response = await fetch(path, init);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  if (response.status === 204) return null;
  return response.json();
}
