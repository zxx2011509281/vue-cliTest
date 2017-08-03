// 1.引包
import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './main.vue';
import router from './router'

// 3.new Vue
new Vue({
  el: '#box',
  router,
  render:h=>h(Main)
})
