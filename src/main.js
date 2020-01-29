import Vue from 'vue'
import WhatsNearby from './components/WhatsNearby'
import OpenTripMap from './components/OpenTripMap'
import Routes from './components/routes/Routes'
import Weather from './components/Weather'

Vue.component('whatsNearby', WhatsNearby)
Vue.component('openTripMap', OpenTripMap)
Vue.component('routes', Routes)
Vue.component('weather', Weather)

/* eslint-disable no-new */
new Vue({
  el: '#app'
})
