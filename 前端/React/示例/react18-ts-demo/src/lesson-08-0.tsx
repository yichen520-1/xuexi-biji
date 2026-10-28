export {};
import { useEffect, useState } from 'react';
export function Title({ url }: { url: string }) {
  const [text, setText] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    async function run() {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const value = await response.text();
        if (active) setText(value);
      } catch (error) {
        if (active) setText(error instanceof Error ? error.message : '请求失败');
      }
    }
    void run();
    return () => { active = false; controller.abort(); };
  }, [url]);
  return <p>{text}</p>;
}
