import {test} from 'node:test';import assert from 'node:assert/strict';
import {createPinia,setActivePinia} from 'pinia';import {useTasksStore} from '../src/stores/tasks.ts';
test('Vue add validate and distinguish duplicate titles',()=>{
  setActivePinia(createPinia());const store=useTasksStore();const before=store.tasks.length;
  assert.equal(store.add(' '),false);assert.equal(store.tasks.length,before);
  store.add('相同标题');store.add('相同标题');const last=store.tasks.slice(-2);
  assert.notEqual(last[0].id,last[1].id);assert.equal(last[0].title,last[1].title);
});
test('Vue toggles and derives statistics',()=>{
  setActivePinia(createPinia());const store=useTasksStore();const old=store.doneCount;
  store.toggle('sample-1');assert.equal(store.doneCount,old+1);
  store.remove('sample-1');assert.equal(store.tasks.some(t=>t.id==='sample-1'),false);
});
