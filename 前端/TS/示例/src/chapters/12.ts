export {};

type LoadState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

function assertNever(value: never): never {
  throw new Error(`未处理状态：${JSON.stringify(value)}`);
}
function describe(state: LoadState<readonly string[]>): string {
  switch (state.status) {
    case 'idle': return '尚未加载';
    case 'loading': return '加载中';
    case 'success': return `共 ${state.data.length} 条`;
    case 'error': return state.message;
    default: return assertNever(state);
  }
}
console.log(describe({ status: 'success', data: ['TS'] }));
