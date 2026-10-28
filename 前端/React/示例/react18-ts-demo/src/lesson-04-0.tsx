export {};
import { useState } from 'react';
type Task = { id: string; title: string; done: boolean };
export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const doneCount = tasks.filter(task => task.done).length;
  function toggle(id: string) {
    setTasks(current => current.map(task =>
      task.id === id ? { ...task, done: !task.done } : task));
  }
  return <><p>完成 {doneCount} 项</p>{tasks.map(task =>
    <button key={task.id} onClick={() => toggle(task.id)}>{task.title}</button>)}</>;
}
