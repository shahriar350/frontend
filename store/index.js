export const state = () => ({
  server_errors: '',
});

export const getters = {
  get_server_errors: (state) => {
    return state.server_error
  },
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  loggedInUser(state) {
    return state.auth.user
  }
};
export const mutations = {
  SET_SERVER_ERRORS(state,payload){
    state.server_errors = payload
  }
};
