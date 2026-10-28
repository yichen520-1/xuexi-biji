export {};
import { useState, type ReactNode } from 'react';
function Panel({ children }: { children: ReactNode }) {
  return <section className="panel">{children}</section>;
}
function StepButton({ onStep }: { onStep: (step: number) => void }) {
  return <button onClick={() => onStep(1)}>增加</button>;
}
export function Dashboard() {
  const [count, setCount] = useState(0);
  return <Panel>
    <p>{count}</p>
    <StepButton onStep={step => setCount(current => current + step)} />
  </Panel>;
}
