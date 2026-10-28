export {};
interface Article { id: string; title: string }
interface Page { items: Article[]; nextCursor: string | null }
export function mergeArticles(current: readonly Article[], incoming: readonly Article[]): Article[] {
  const seen = new Set(current.map(article => article.id));
  const result = [...current];
  for (const article of incoming) {
    if (!seen.has(article.id)) { seen.add(article.id); result.push(article); }
  }
  return result;
}
export function hasMore(page: Page): boolean { return page.nextCursor !== null; }
