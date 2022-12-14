import Vue from 'vue'
import index from './index.vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(index),
}).$mount('#app')
