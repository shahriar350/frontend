<template>
  <div class="">
    <div class="xl:px-16 md:px-8 px-3 py-2 flex justify-between top_section_top">
      <div class="flex first_top_item">
        <p class="border-r border-gray-400 font-9"><i class="bx bx-car mr-1"></i> Free delivery</p>
        <p class="border-r border-gray-400 font-9"><i class="bx bx-globe-alt mr-1"></i> Return policy</p>
        <nuxt-link to="/bongo/seller/request" class="border-r border-gray-400 font-9">
          Want be a seller
        </nuxt-link>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p @click="changeLang(loc.code)" v-for="(loc,index) in locales" v-if="loc.code !== $store.state.locale">{{ loc.name }}</p>
        </div>
        <div>
          <p v-if="auth" class="font-9">{{ user.name }}</p>
          <nuxt-link v-else to="/auth/login" class="font-9">Login</nuxt-link>
        </div>


      </div>
    </div>
    <div class="xl:px-16 md:px-8 px-3 grid grid-cols-9 mx-auto top_section_cart md:mt-3 mt-4">
      <div class="md:col-span-2 sm:col-span-3 col-span-4">
        <n-link to="/">
          <img src="/common/logo1.png" alt="bongobitan" class="w-full">
        </n-link>
      </div>
      <div class="col-span-5 md:block hidden">
        sdf
      </div>
      <div class="md:col-span-2 sm:col-span-6 col-span-5 flex justify-end items-center">
        <i class="bx bx-cart-alt font-30 relative p-2">
          <span class="rounded-full bg-blue-700 p-2 text-white font2 w-5 h-5 font-7 text-black absolute
          top-0 p-1 bg-white font-bold flex justify-center items-center" style="right: 5px">05
          </span>
        </i>
        <i class="bx bx-heart font-30"></i>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      locales() { return this.$store.state.locales },
    },
    methods: {
      changeLang(lang) {
        this.$store.commit('SET_LANG',lang)
      }
    }
  }
</script>

<style lang="less">
  .top_section_top {
    background: #F5F5F5;
  }

  .first_top_item {
    p, a {
      color: #222222;
      padding: 0 16px;

      &:first-child {
        padding-left: 0;
      }
    }
  }

  .top_section_cart {
    i {
      padding: 0 10px;
    }
  }
</style>
