import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'

Vue.use(Vuex)

const API_URL = config[process.env.NODE_ENV].api;

export default new Vuex.Store({
  modules: {
    auth
  }
})
