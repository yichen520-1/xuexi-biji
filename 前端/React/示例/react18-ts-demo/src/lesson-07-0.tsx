export {};
import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';
type Action = { type: 'add'; step: number } | { type: 'reset' };
function reducer(state: number, action: Action): number {
  return action.type === 'add' ? state + action.step : 0;
}
const CountContext = createContext<number | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);
export function CounterProvider({ children }: { children: ReactNode }) {
  const [count, dispatch] = useReducer(reducer, 0);
  return <CountContext.Provider value={count}>
    <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
  </CountContext.Provider>;
}
export function CountLabel() {
  const count = useContext(CountContext);
  if (count === null) throw new Error('缺少 CounterProvider');
  return <p>{count}</p>;
}
