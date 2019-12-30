const SET_TOKEN = 'SET_TOKEN';

export default {
  state: {
    isLoading: false,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWxldGVkQXQiOm51bGwsInVwZGF0ZWRBdCI6IjIwMTktMTItMjJUMjA6MjI6NTAuNDY1WiIsImNyZWF0ZWRBdCI6IjIwMTktMTItMjJUMjA6MjI6NTAuNDY1WiIsInVzZXJuYW1lIjoiaWdvcmhhbGZlbGQiLCJlbWFpbCI6ImhlbGxvQGlnb3JsdWl6Lm1lIiwiZG9jdW1lbnQiOiIyODQ4NzYwNzUiLCJyb2xlIjpudWxsLCJpYXQiOjE1NzcwNDYxODIsImV4cCI6MTU3NzEzMjU4MiwiYXVkIjoiY2hlZ2EuYWk6Z2F0ZXdheSIsImlzcyI6ImNoZWdhLmFpOm1zLXVzZXJzIiwic3ViIjoidXJuOm51bGw6NWRmZmQwOWE2Y2IxZDAwMDE0OTZiM2YyIn0.FwHWK-Cbdo1MZB7OuQq0chxJwts949A9cccCclsS33k',
  },
  actions: {
    setToken({ commit }, token) {
      commit(SET_TOKEN, token);
    },
  },
  mutations: {
    [SET_TOKEN](state, token) {
      state.token = token;
    },
  },
};
