<script setup lang="ts">
import type { Task } from '../types.ts';
defineProps<{ tasks:readonly Task[] }>();
const emit=defineEmits<{ toggle:[id:string]; remove:[id:string] }>();
</script>
<template>
  <ul v-if="tasks.length">
    <li v-for="task in tasks" :key="task.id">
      <label><input type="checkbox" :checked="task.done" @change="emit('toggle',task.id)">
        <span :class="{done:task.done}">{{ task.title }}</span></label>
      <button :aria-label="`删除 ${task.title}`" @click="emit('remove',task.id)">删除</button>
    </li>
  </ul>
  <p v-else>暂无任务</p>
</template>
