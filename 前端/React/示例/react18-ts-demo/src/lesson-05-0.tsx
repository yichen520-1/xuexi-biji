export {};
import { useRef, useState, type FormEvent } from 'react';
export function CommentForm({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState('');
  const input = useRef<HTMLInputElement>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    onAdd(value);
    setText('');
    input.current?.focus();
  }
  return <form onSubmit={submit}>
    <label>评论<input ref={input} value={text}
      onChange={e => setText(e.currentTarget.value)} /></label>
    <button type="submit">发表</button>
  </form>;
}
