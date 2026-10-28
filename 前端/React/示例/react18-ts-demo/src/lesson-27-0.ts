export {};
import { create } from 'zustand';
interface CounterState {
  count: number;
  increment: () => void;
  reset: () => void;
}
export const useCounterStore = create<CounterState>()(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
