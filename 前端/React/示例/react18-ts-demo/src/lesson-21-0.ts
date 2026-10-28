export {};
type Cover = { type: 'none' } | { type: 'single'; image: string }
  | { type: 'triple'; images: readonly [string, string, string] };
interface ArticleDraft { title: string; channelId: string; content: string; cover: Cover }
export function validateDraft(draft: ArticleDraft): string[] {
  const errors: string[] = [];
  if (!draft.title.trim()) errors.push('标题不能为空');
  if (!draft.channelId) errors.push('请选择频道');
  if (!draft.content.trim()) errors.push('内容不能为空');
  return errors;
}
export async function uploadImage(file: File, signal?: AbortSignal): Promise<unknown> {
  const body = new FormData();
  body.append('file', file);
  const response = await fetch('/api/images', { method: 'POST', body, signal });
  if (!response.ok) throw new Error(`上传失败：${response.status}`);
  return response.json();
}
