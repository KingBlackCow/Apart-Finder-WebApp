import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import StoryblokVue from 'storyblok-vue'
import VueAnalytics from 'vue-analytics'
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import * as VueGoogleMaps from 'vue2-google-maps';

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false
const isProd = process.env.NODE_ENV === "production"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(StoryblokVue)
Vue.use(VueAnalytics, {
  id: 'UA-139190314-1',
  router,
  debug: {
    enabled: !isProd,
    sendHitTask: isProd
  }
})
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAAHuS3QzpixOgCb9AOfb9yE7ITxgVmigs',
    libraries: 'places',
  }
})
