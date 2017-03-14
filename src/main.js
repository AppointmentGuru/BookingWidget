// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFlatpickr from 'vue-flatpickr'
import GuruPlugin from 'guruclientstore/src/store/plugin'

import {
  Card,
  Step,
  Steps,
  Button,
  Carousel,
  CarouselItem,
  Form,
  FormItem,
  Input,
  Autocomplete,
  Scrollbar,
  Progress, Loading,
  // Notification,
  Tabs, TabPane,
  Row
} from 'element-ui'

import 'element-ui/lib/theme-default/index.css'
import 'vue-flatpickr/theme/airbnb.css'

Vue.config.productionTip = false

Vue.use(GuruPlugin)
Vue.use(VueFlatpickr)

Vue.use(Card)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Button)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Autocomplete)
Vue.use(Scrollbar)
Vue.use(Progress)
Vue.use(Loading)
Vue.use(Tabs)
Vue.use(TabPane)
// Vue.use(Notification)
Vue.use(Row)

/* eslint-disable no-new */
new Vue({
  el: '#appointmentguru-booking-widget',
  router,
  template: '<App/>',
  components: { App }
})
