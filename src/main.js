import Vue from 'vue'
import WhatsNearby from './components/WhatsNearby'
import Routes from './components/routes/Routes'
import Weather from './components/Weather'

Vue.component('whatsNearby', WhatsNearby)
Vue.component('routes', Routes)
Vue.component('weather', Weather)

/* eslint-disable no-new */
new Vue({
  el: '#app'
})
