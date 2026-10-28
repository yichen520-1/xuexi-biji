import { parseTask, toggleTask, pick } from './model.js';
const result=parseTask({ id:'t1',title:'学习 TypeScript',done:false });
if (result.ok) {
  const next=toggleTask([result.data],'t1');
  console.log('解析成功：',pick(result.data,'title'));
  console.log('新状态：',next);
  console.log('原对象仍未完成：',result.data.done===false);
} else console.error(result.message);
