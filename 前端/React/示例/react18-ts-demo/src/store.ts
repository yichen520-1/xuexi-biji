import {configureStore,createSlice,type PayloadAction} from '@reduxjs/toolkit';
export interface Task{id:string;title:string;done:boolean}
const tasksSlice=createSlice({name:'tasks',initialState:[
  {id:'sample-1',title:'理解 React 状态快照',done:false},
  {id:'sample-2',title:'验证不可变更新',done:true},
] satisfies Task[],reducers:{
  added(state,action:PayloadAction<{id:string;title:string}>){
    const title=action.payload.title.trim();
    if(title&&!state.some(task=>task.id===action.payload.id))state.push({id:action.payload.id,title,done:false});
  },
  toggled(state,action:PayloadAction<string>){const task=state.find(item=>item.id===action.payload);if(task)task.done=!task.done;},
  removed(state,action:PayloadAction<string>){return state.filter(task=>task.id!==action.payload);},
}});
export const {added,toggled,removed}=tasksSlice.actions;
export const makeStore=()=>configureStore({reducer:{tasks:tasksSlice.reducer}});
export const store=makeStore();
export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
