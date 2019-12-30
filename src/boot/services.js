import Vue from 'vue';
import services from '../services';

if (!Vue.prototype.$s) {
  Object.defineProperty(Vue.prototype, '$s', {
    get() {
      return services;
    },
    set() {
      throw new Error('You canno\'t set $s');
    },
  });
}

export default ({ ssrContext }) => {
  if (ssrContext) {
    ssrContext.$s = services;
  }
};
