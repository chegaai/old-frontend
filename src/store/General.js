const SET_CURRENT_SWAP_SPACE = 'SET_CURRENT_SWAP_SPACE';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    currentSwapSpace: {},
  },
  actions: {
    setCurrentSwapSpace({ commit }, payload) {
      commit(SET_CURRENT_SWAP_SPACE, payload);
    },
  },
  mutations: {
    [SET_CURRENT_SWAP_SPACE](state, payload) {
      state.currentSwapSpace = payload;
    },
  },
};
