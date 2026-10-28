import {test} from 'node:test';import assert from 'node:assert/strict';
import {makeStore,added,toggled,removed} from '../src/store.ts';
import {renderSmoke} from '../.test-build/smoke.js';
test('React state keeps snapshots and accepts duplicate titles with unique ids',()=>{
  const store=makeStore();const before=store.getState();
  store.dispatch(added({id:'a',title:'重复标题'}));store.dispatch(added({id:'b',title:'重复标题'}));
  assert.equal(before.tasks.length,2);assert.equal(store.getState().tasks.length,4);
  store.dispatch(added({id:'a',title:'重复编号'}));assert.equal(store.getState().tasks.length,4);
});
test('React toggle/remove and invalid input',()=>{
  const store=makeStore();store.dispatch(added({id:'blank',title:' '}));assert.equal(store.getState().tasks.length,2);
  store.dispatch(toggled('sample-1'));assert.equal(store.getState().tasks[0].done,true);
  store.dispatch(removed('sample-1'));assert.equal(store.getState().tasks.length,1);
});
test('React initial tree renders actual task form and two records',()=>{
  const html=renderSmoke();assert.match(html,/React18/);assert.match(html,/<form/);
  assert.equal((html.match(/<li/g)||[]).length,2);
});
