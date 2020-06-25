import Vue from 'vue'

import {mapGetters} from "vuex"

const User = {
  install(Vue, option) {
    Vue.mixin({
      computed : {
        ...mapGetters({
          user: 'loggedInUser',
          auth: 'isAuthenticated'
        })
      }
    })
  }
};
Vue.use(User);
