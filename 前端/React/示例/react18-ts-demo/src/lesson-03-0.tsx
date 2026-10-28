export {};
import { useState } from 'react';
export function Counter() {
  const [count, setCount] = useState(0);
  function addThree() {
    setCount(current => current + 1);
    setCount(current => current + 1);
    setCount(current => current + 1);
  }
  return <button onClick={addThree}>{count}</button>;
}
