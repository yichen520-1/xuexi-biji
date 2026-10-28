export {};
import { ref, watch } from 'vue';
const userId = ref('1');
const name = ref('');
const error = ref('');
watch(userId, async (id, _oldId, onCleanup) => {
  const controller = new AbortController();
  onCleanup(() => controller.abort());
  error.value = '';
  try {
    const response = await fetch(`/api/users/${encodeURIComponent(id)}`, {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: unknown = await response.json();
    if (typeof data !== 'object' || data === null || !('name' in data)
        || typeof data.name !== 'string') throw new Error('结构无效');
    if (!controller.signal.aborted) name.value = data.name;
  } catch (cause) {
    if (!controller.signal.aborted) error.value = cause instanceof Error ? cause.message : '未知错误';
  }
}, { immediate: true });
