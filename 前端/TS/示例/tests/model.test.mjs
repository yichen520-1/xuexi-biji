import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseTask, toggleTask, pick } from '../dist/model.js';
test('invalid external data stays rejected',()=>{
  for(const input of [null,{}, {id:1,title:'TS',done:false},{id:'1',title:' ',done:false}])
    assert.equal(parseTask(input).ok,false);
});
test('valid task is normalized and copied',()=>{
  const input={id:'1',title:' TS ',done:false};const result=parseTask(input);
  assert.equal(result.ok,true);assert.equal(result.data.title,'TS');assert.notEqual(input,result.data);
});
test('immutable toggle preserves original snapshot',()=>{
  const before=[{id:'1',title:'TS',done:false},{id:'2',title:'Vue',done:false}];
  const after=toggleTask(before,'1');assert.equal(before[0].done,false);
  assert.equal(after[0].done,true);assert.notEqual(after,before);assert.equal(after[1],before[1]);
});
test('generic property selection',()=>assert.equal(pick({id:1,name:'TS'},'name'),'TS'));
