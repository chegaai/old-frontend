import Vue from 'vue';
import Vuex from 'vuex';

import General from './General';

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      General,
    },
  });
  return Store;
}
