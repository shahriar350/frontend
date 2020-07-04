import Vue from 'vue'

import {mapGetters} from "vuex"

const User = {
  install(Vue, option) {
    Vue.mixin({
      computed : {
        screenWidth(){
          if (process.client){
            return window.innerWidth
          }
        },
        ...mapGetters({
          user: 'loggedInUser',
          auth: 'isAuthenticated'
        })
      }
    })
  }
};
Vue.use(User);
