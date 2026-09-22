import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MonitorPage from '../views/MonitorPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/monitor/:anchorId', name: 'monitor', component: MonitorPage, props: true }
  ]
})

export default router
