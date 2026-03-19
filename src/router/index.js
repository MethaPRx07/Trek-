import { createRouter, createWebHashHistory } from 'vue-router'
import Guide from '../views/Guide.vue'
import Customer from '../views/Customer.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  { path: '/', redirect: '/guide' },
  { path: '/guide', component: Guide, name: 'Guide' },
  { path: '/customer', component: Customer, name: 'Customer' },
  { path: '/dashboard', component: Dashboard, name: 'Dashboard' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
