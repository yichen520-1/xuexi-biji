export {};
import { customRef, onScopeDispose } from 'vue';
export function useDebouncedRef(initial: string, delay = 300) {
  let value = initial;
  let timer: ReturnType<typeof setTimeout> | undefined;
  onScopeDispose(() => { if (timer !== undefined) clearTimeout(timer); });
  return customRef<string>((track, trigger) => ({
    get() { track(); return value; },
    set(next) {
      if (timer !== undefined) clearTimeout(timer);
      timer = setTimeout(() => { value = next; trigger(); }, delay);
    },
  }));
}
