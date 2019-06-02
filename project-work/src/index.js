import Vue from 'vue';

import router from './router';

import App from './components/App.vue';

// Font Awesome 5 (Free)
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');