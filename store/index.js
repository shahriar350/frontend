export const state = () => ({
  locales: [
    {
      code: 'bn',
      name: 'BN'
    },
    {
      code: 'en',
      name: 'EN'
    },
  ],
  locale: 'en'
});

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  loggedInUser(state) {
    return state.auth.user
  }
};
export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.find(el => el.code === locale)) {
      state.locale = locale
    }
  }
};
