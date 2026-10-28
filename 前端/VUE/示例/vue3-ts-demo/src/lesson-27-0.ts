export {};
import { computed, ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubled = computed(() => count.value * 2);
  function increment(): void { count.value++; }
  return { count, doubled, increment };
});
// 组件 setup 中（app 已安装 createPinia 后）
const store = useCounterStore();
const { count, doubled } = storeToRefs(store);
const { increment } = store;
