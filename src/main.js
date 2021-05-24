import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import StoryblokVue from 'storyblok-vue'
import VueAnalytics from 'vue-analytics'
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import Geocoder from "@pderas/vue2-geocoder";
import axios from 'axios'
// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false
const isProd = process.env.NODE_ENV === "production"
Vue.prototype.$Axios = axios;
Vue.config.productionTip = false;



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
Vue.use(Geocoder, {
  defaultCountryCode: 'KR', // e.g. 'CA'
  defaultLanguage:    'ko', // e.g. 'en'
  defaultMode:        'address', // or 'lat-lng'
  googleMapsApiKey:   'AIzaSyAAHuS3QzpixOgCb9AOfb9yE7ITxgVmigs'
})


