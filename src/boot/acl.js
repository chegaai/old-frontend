import Vue from 'vue';
import { getStorage } from '../utils/localStorage';

const acl = {
  isLogged() {
    return getStorage('token');
  },
};

if (!Vue.prototype.$acl) {
  Object.defineProperty(Vue.prototype, '$acl', {
    get() {
      return acl;
    },
    set() {
      throw new Error('You canno\'t set $acl');
    },
  });
}

export default ({ ssrContext }) => {
  if (ssrContext) {
    ssrContext.$acl = acl;
  }
};
