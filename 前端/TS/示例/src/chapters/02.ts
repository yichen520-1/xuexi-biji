export {};

type ViewMode = 'list' | 'grid';
let mode: ViewMode = 'list';
mode = 'grid';

function formatId(id: string | number): string {
  if (typeof id === 'number') return id.toFixed(0);
  return id.trim();
}

const settings = { pageSize: 20, mode: 'list' as ViewMode };
console.log(formatId(12), settings.pageSize);
