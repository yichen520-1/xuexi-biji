export {};
import { useState } from 'react';
export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(current => current + 1);
  const reset = () => setCount(initial);
  return { count, increment, reset };
}
export function TwoCounters() {
  const left = useCounter();
  const right = useCounter(10);
  return <>
    <button onClick={left.increment}>{left.count}</button>
    <button onClick={right.increment}>{right.count}</button>
  </>;
}
