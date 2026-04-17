import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HourlyView from '../views/HourlyView.vue'
import ForecastView from '../views/ForecastView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/hourly',
    name: 'hourly',
    component: HourlyView
  },
  {
    path: '/forecast',
    name: 'forecast',
    component: ForecastView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
