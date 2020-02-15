import Vue from 'vue'
import Vuex from 'vuex'

import General from './General'
import User from './User'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      General,
      User
    }
  })
  return Store
}
