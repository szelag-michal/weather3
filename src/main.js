import Vue from 'vue'
import App from './App.vue'
import lodash from 'lodash'

export const bus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
