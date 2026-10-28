export {};
// counter-key.ts
import type { InjectionKey, Ref } from 'vue';
export interface CounterContext {
  count: Readonly<Ref<number>>;
  increment: () => void;
}
export const counterKey: InjectionKey<CounterContext> = Symbol('counter');
