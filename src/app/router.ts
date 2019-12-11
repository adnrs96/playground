import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@app/index.vue'),
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          component: () => import('@app/Welcome.vue')
        },
        {
          path: 'example/:sample',
          name: 'studio',
          props: route => ({
            sample: route.params.sample
          }),
          component: () => import('@app/Layout/index.vue')
        }
      ]
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('@app/NotFound.vue')
    }
  ]
})
