import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: () => import('@/Playground.vue'),
      children: [
        {
          path: '/',
          component: () => import('@/views/index.vue'),
          children: [
            {
              path: '/welcome',
              name: 'welcome',
              component: () => import ('@/views/Welcome.vue')
            },
            {
              path: ':sample',
              name: 'playground',
              props: route => ({
                sample: route.params.sample
              }),
              component: () => import('@/views/Playground/index.vue')
            }
          ]
        }
      ]
    },
    {
      path: '*',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})
