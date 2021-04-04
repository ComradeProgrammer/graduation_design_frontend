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
    name: 'ProjectDemand',
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
    path: '/project/:projectid/editmilestone/:milestoneid',
    name: 'EditMilestone',
    component: () => import('../views/EditMilestone.vue')
  },
  {
    path: '/project/:projectid/milestone/:milestoneid',
    name: 'Milestone',
    component: () => import('../views/Milestone.vue')
  },
  {
    path: '/project/:projectid/milestone/:milestoneid/createdemand',
    name: 'CreateDemand',
    component: () => import('../views/CreateDemand.vue')
  },
  {
    path: '/project/:projectid/bug',
    name: 'ProjectBug',
    component: () => import( '../views/ProjectBug.vue')
  },
  {
    path: '/project/:projectid/createbug',
    name: 'CreateBug',
    component: () => import('../views/CreateBug.vue')
  },
  {
    path: '/project/:projectid/quality',
    name: 'Quality',
    component: () => import('../views/ProjectQuality.vue')
  },
  {
    path: '/project/:projectid/quality/setting',
    name: 'QualitySetting',
    component: () => import('../views/SetRegex.vue')
  },
  {
    path: '/project/:projectid/contribute',
    name: 'Contribute',
    component: () => import('../views/ProjectContribute.vue')
  },
  {
    path: '/project/:projectid/contribute/usercontribute',
    name: 'UserContributeView',
    component: () => import('../views/UserContributeView.vue')
  },
  {
    path: '/project/:projectid/contribute/languagecontribute',
    name: 'LanguageContributeView',
    component: () => import('../views/LanguageContributeView.vue')
  },
  {
    path: '/project/:projectid/contribute/commitcontribute',
    name: 'CommitContributeView',
    component: () => import('../views/CommitContributeView.vue')
  },
  {
    path: '/project/:projectid/contribute/activitycontribute',
    name: 'ActivityContributeView',
    component: () => import('../views/ActivityContributeView.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
