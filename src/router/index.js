import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/project/:projectid',
    name: 'Project',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ProjectDemand.vue')
  },
  {
    path: '/project/:projectid/createmilestone',
    name: 'CreateMilestone',
    component: () => import('../views/CreateMilestone.vue')
  },
  {
    path: '/project/:projectid/milestone/:milestoneid',
    name: 'Milestone',
    component: () => import('../views/Milestone.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
