import { useRef, useState } from 'react';
type Task = { id: string; title: string };
type Props = { onAdd: (task: Task) => void };
export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const input = useRef<HTMLInputElement>(null);
  function submit() {
    const value = title.trim();
    if (!value) return;
    onAdd({ id: crypto.randomUUID(), title: value });
    setTitle('');
    input.current?.focus();
  }
  return <>
    <input ref={input} value={title} onChange={e => setTitle(e.currentTarget.value)} />
    <button onClick={submit}>添加</button>
  </>;
}
