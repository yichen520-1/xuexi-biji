<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>
<template>
  <h1>Vue SFC 计数器</h1>
  <button @click="count++">已点击 {{ count }} 次</button>
</template>
<style scoped>
button { padding: 0.6rem 1rem; }
</style>
