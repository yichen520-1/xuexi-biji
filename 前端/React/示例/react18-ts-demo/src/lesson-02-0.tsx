export {};
type Task = { id: string; title: string; done: boolean };
export function TaskList({ tasks }: { tasks: readonly Task[] }) {
  const pending = tasks.filter(task => !task.done);
  return <section>
    {pending.length === 0 ? <p>没有待办</p> :
      <ul>{pending.map(task => <li key={task.id}>{task.title}</li>)}</ul>}
  </section>;
}
