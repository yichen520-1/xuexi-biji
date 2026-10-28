import {createRouter,createWebHashHistory} from 'vue-router';
import Tasks from './pages/Tasks.vue';
import Stats from './pages/Stats.vue';
export const router=createRouter({history:createWebHashHistory(),routes:[
  {path:'/',name:'tasks',component:Tasks},
  {path:'/stats',name:'stats',component:Stats},
  {path:'/:pathMatch(.*)*',redirect:'/'},
]});
