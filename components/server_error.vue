<template>
  <transition name="fade">
    <div class="bg-red-300 p-3 rounded shadow my-3 border-0" v-if="server_err">
      <h5 class="text-base font-bold">{{server_err.message }}</h5>
      <ul v-for="(err,index) in server_err.errors" :key="index">
        <li v-for="error in err" class="text-base"> {{ error }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import {  mapState } from 'vuex'

  export default {
    created() {
      this.$store.commit('SET_SERVER_ERRORS','')
    },
    computed: {
      ...mapState({
        server_err: 'server_errors'
      })
    }
  }
</script>
