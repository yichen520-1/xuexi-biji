import {useRef,useState,type FormEvent} from 'react';
import {useAppDispatch,useAppSelector} from '../hooks.ts';
import {added,toggled,removed} from '../store.ts';
export default function Tasks(){
  const tasks=useAppSelector(state=>state.tasks);const dispatch=useAppDispatch();
  const [title,setTitle]=useState('');const [error,setError]=useState('');
  const [filter,setFilter]=useState<'all'|'pending'|'done'>('all');
  const input=useRef<HTMLInputElement>(null);
  const visible=tasks.filter(task=>filter==='all'||task.done===(filter==='done'));
  const doneCount=tasks.filter(task=>task.done).length;
  function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();const value=title.trim();
    if(!value){setError('请填写任务标题');return;}
    const id=crypto.randomUUID();dispatch(added({id,title:value}));
    setTitle('');setError('');input.current?.focus();
  }
  return <><h1>React18 + TS 任务板</h1><p>总数 {tasks.length} · 已完成 {doneCount}</p>
    <form onSubmit={submit}><label>任务标题<input ref={input} value={title} onChange={e=>setTitle(e.currentTarget.value)} /></label><button type="submit">添加</button></form>
    {error?<p role="alert">{error}</p>:null}
    <label>筛选<select value={filter} onChange={e=>{
      const next=e.currentTarget.value;if(next==='all'||next==='pending'||next==='done')setFilter(next);
    }}><option value="all">全部</option><option value="pending">待完成</option><option value="done">已完成</option></select></label>
    {visible.length?<ul>{visible.map(task=><li key={task.id}>
      <label><input type="checkbox" checked={task.done} onChange={()=>dispatch(toggled(task.id))}/><span className={task.done?'done':''}>{task.title}</span></label>
      <button aria-label={`删除 ${task.title}`} onClick={()=>dispatch(removed(task.id))}>删除</button>
    </li>)}</ul>:<p>暂无任务</p>}</>;
}
