const SET_TOKEN = 'SET_TOKEN'
const SET_PROFILE_IMAGE = 'SET_PROFILE_IMAGE'

export default {
  state: {
    isLoading: false,
    token: '',
    profileImage: 'https://i.imgur.com/CA891Nw.png'
  },
  actions: {
    setToken ({ commit }, token) {
      commit(SET_TOKEN, token)
    },
    setProfileImage ({ commit }, imageUrl) {
      commit(SET_PROFILE_IMAGE, imageUrl)
    }
  },
  mutations: {
    [SET_TOKEN] (state, token) {
      state.token = token
    },
    [SET_PROFILE_IMAGE] (state, imageUrl) {
      state.profileImage = imageUrl
    }
  }
}
