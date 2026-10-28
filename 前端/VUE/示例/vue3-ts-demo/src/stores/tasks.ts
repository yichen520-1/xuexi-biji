import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Task } from '../types.ts';
export const useTasksStore=defineStore('tasks',()=>{
  const tasks=ref<Task[]>([
    {id:'sample-1',title:'理解 ref 与 reactive',done:false},
    {id:'sample-2',title:'写清组件类型契约',done:true},
  ]);
  const doneCount=computed(()=>tasks.value.filter(task=>task.done).length);
  function add(title:string):boolean {
    const normalized=title.trim();if(!normalized)return false;
    tasks.value.push({id:crypto.randomUUID(),title:normalized,done:false});return true;
  }
  function toggle(id:string):void {
    const task=tasks.value.find(item=>item.id===id);if(task)task.done=!task.done;
  }
  function remove(id:string):void { tasks.value=tasks.value.filter(item=>item.id!==id); }
  return {tasks,doneCount,add,toggle,remove};
});
