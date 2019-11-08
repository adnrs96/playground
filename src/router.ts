import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          component: () => import('@/views/Welcome.vue')
        },
        {
          path: 'example/:sample',
          name: 'playground',
          props: route => ({
            sample: route.params.sample
          }),
          component: () => import('@/views/Playground/index.vue')
        }
      ]
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})
