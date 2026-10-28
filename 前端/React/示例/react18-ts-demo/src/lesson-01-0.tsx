export {};
import { createRoot } from 'react-dom/client';
function Greeting({ name }: { name: string }) {
  return <section className="card">
    <h1>你好，{name}</h1>
    <p>{new Date(0).toISOString()}</p>
  </section>;
}
const container = document.getElementById('root');
if (!container) throw new Error('缺少 root 容器');
createRoot(container).render(<Greeting name="小陈" />);
