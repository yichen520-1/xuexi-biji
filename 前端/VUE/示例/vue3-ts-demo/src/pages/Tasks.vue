<script setup lang="ts">
import { computed,ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '../stores/tasks.ts';
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';
const store=useTasksStore();const {tasks,doneCount}=storeToRefs(store);
const filter=ref<'all'|'pending'|'done'>('all');
const visible=computed(()=>tasks.value.filter(task=>filter.value==='all'||task.done===(filter.value==='done')));
</script>
<template>
  <h1>Vue3 + TS 任务板</h1>
  <p>总数 {{ tasks.length }} · 已完成 {{ doneCount }}</p>
  <TaskForm @add="store.add" />
  <label>筛选<select v-model="filter"><option value="all">全部</option><option value="pending">待完成</option><option value="done">已完成</option></select></label>
  <TaskList :tasks="visible" @toggle="store.toggle" @remove="store.remove" />
</template>
