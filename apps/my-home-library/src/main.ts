import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueToast from 'vue-toast-notification';

import vuetify from './plugins/vuetify';
import './assets/styles/main.scss'
import 'vue-toast-notification/dist/theme-default.css';

import './api'

Vue.config.productionTip = false;

Vue.use(VueToast);

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
