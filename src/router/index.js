import Vue from 'vue'
import Router from 'vue-router'
import BookingPage from '@/components/pages/BookingPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BookingPage',
      component: BookingPage
    }
  ]
})
