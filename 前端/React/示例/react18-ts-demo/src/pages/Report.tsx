import {useAppSelector} from '../hooks.ts';
export default function Report(){
  const tasks=useAppSelector(state=>state.tasks);const done=tasks.filter(t=>t.done).length;
  return <><h1>共享状态统计</h1><p>共 {tasks.length} 项，已完成 {done} 项。</p><p>此页面通过 React.lazy 加载；刷新后状态重置。</p></>;
}
