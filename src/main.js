import Vue from 'vue'
import WhatsNearby from './components/WhatsNearby'
import Weather from './components/Weather'

Vue.component('whatsNearby', WhatsNearby)
Vue.component('weather', Weather)

/* eslint-disable no-new */
new Vue({
  el: '#app'
})
