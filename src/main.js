require('es6-promise').polyfill()
import Vue from 'vue'
import WhatsNearby from './components/WhatsNearby'

Vue.component('whatsNearby', WhatsNearby)

/* eslint-disable no-new */
new Vue({
  el: '#app'
})
