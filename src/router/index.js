import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'/bigscreen/home'
    },
    {
      path: '/bigscreen/home',
      name: 'bigscreenHome',
      component: () => import('@/views/BigScreen/HomeView.vue')
    },
  ]
})

export default router;
