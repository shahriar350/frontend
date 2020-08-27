export const state = () => ({
  items: 0,
  error: "",
});

export const getters = {
  get_cart_total(state) {
    return state.items
  },
  get_error(state) {
    return state.error
  },
};

export const mutations = {
  SET_TO_CART(state, payload) {
    state.items = payload
  },
  RESET_ERROR(state) {
    state.error = ""
  },
};

export const actions = {
  async POST_CART( {commit}, payload) {
    let data = await this.$axios.post('/api/user/cart/add', payload)
    commit('SET_TO_CART',data.data.data)
    return 'Successfully added information';
  }
};
