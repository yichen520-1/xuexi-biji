<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTasksStore } from '../stores/tasks.ts';
const {tasks,doneCount}=storeToRefs(useTasksStore());
</script>
<template><h1>共享状态统计</h1><p>共 {{ tasks.length }} 项，已完成 {{ doneCount }} 项。</p><p>切页面保留内存状态；刷新回到初始数据。</p></template>
