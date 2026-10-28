<script setup lang="ts">
import { ref } from 'vue';
const emit=defineEmits<{ add:[title:string] }>();
const title=ref('');const error=ref('');
function submit(){
  const value=title.value.trim();
  if(!value){error.value='请填写任务标题';return;}
  emit('add',value);title.value='';error.value='';
}
</script>
<template>
  <form @submit.prevent="submit">
    <label>任务标题<input v-model="title" placeholder="例如：完成 Pinia 练习"></label>
    <button type="submit">添加</button>
    <p v-if="error" role="alert">{{ error }}</p>
  </form>
</template>
