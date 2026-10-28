<script setup lang="ts">
import { ref } from 'vue';
const open = ref(false);
</script>
<template>
  <button @click="open = true">打开</button>
  <Teleport to="body">
    <div v-if="open" role="dialog" aria-modal="true" aria-label="学习提示">
      <p>逻辑上仍属于当前组件。</p>
      <button @click="open = false">关闭</button>
    </div>
  </Teleport>
</template>
