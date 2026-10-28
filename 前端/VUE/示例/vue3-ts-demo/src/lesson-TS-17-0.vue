<script setup lang="ts">
import { computed, ref } from 'vue';
interface Task { id: number; title: string; done: boolean }
const props = defineProps<{ task: Task }>();
const emit = defineEmits<{ toggle: [id: number] }>();
const saving = ref(false);
const label = computed(() => props.task.done ? '已完成' : '待完成');
</script>

<template>
  <button :disabled="saving" @click="emit('toggle', props.task.id)">
    {{ props.task.title }}：{{ label }}
  </button>
</template>
