import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login.vue'
import home from '@/pages/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})
