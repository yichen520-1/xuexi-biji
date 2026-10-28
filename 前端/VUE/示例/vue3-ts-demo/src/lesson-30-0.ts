export {};
import { createRouter, createWebHashHistory } from 'vue-router';
import { defineComponent, h } from 'vue';
const Home = defineComponent({ render: () => h('p', '首页') });
const User = defineComponent({
  props: { id: { type: String, required: true } },
  setup: props => () => h('p', `用户：${props.id}`),
});
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/users/:id', name: 'user', component: User, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
});
