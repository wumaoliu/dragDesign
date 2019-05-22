import Vue from 'vue'
import Router from 'vue-router'
import Design from '@/views/design'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'design',
      component: Design
    }
  ]
})
