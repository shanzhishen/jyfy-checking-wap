import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

import MonthCheck from './views/main/MonthCheck';
import BusinessStudyScore from './views/main/BusinessStudyScore';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          component: Home,
        },
        {
          path: '/MonthCheck',
          component: MonthCheck
        },
        {
          path: '/BusinessStudyScore',
          component: BusinessStudyScore
        }
      ]
    },
    {
      path: '/Login',
      component: Login,
    }
  ]
})
