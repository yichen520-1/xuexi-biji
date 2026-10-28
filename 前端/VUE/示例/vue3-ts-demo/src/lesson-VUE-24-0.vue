<script setup lang="ts">
import { computed, ref } from 'vue';
const count = ref(0);
const doubled = computed(() => count.value * 2);
function increment(): void { count.value++; }
</script>

<template>
  <button @click="increment">{{ count }} / {{ doubled }}</button>
</template>
