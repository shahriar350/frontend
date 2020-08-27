
<template>
  <div class="shadow pb-2">
    <div class="xl:px-16 md:px-8 px-3 flex justify-between top_section_top">
      <div class="flex first_top_item md:flex hidden">
        <p class="border-r set_center border-gray-400 font-9"><i class="bx bx-car mr-1"></i>Free delivery</p>
        <p class="border-r set_center border-gray-400 font-9"><i class="bx bx-globe-alt mr-1"></i>Return policy </p>
        <nuxt-link  to="/bongo/seller/request" class="set_center border-r border-gray-400 font-9">
          Want be a seller
        </nuxt-link>
      </div>
      <div class="grid grid-rows-1 grid-flow-col gap-4">
        <div>
          <div v-if="auth">
            <a-menu mode="horizontal" class="user_menu">
              <a-sub-menu>
                <span slot="title"><a-icon
                  type="setting"/>{{ user.name }}</span>
                <a-menu-item-group>
                  <a-menu-item key="setting:1">
                   <nuxt-link to="/user/order">My Orders</nuxt-link>
                  </a-menu-item>
                  <a-menu-item key="setting:2">
                    Profile
                  </a-menu-item>
                </a-menu-item-group>
              </a-sub-menu>
            </a-menu>
          </div>

            <nuxt-link v-else  to="/auth/login" class="font-9">
              <p class="py-2">Login</p>
            </nuxt-link>

        </div>
        <div v-if="auth && user.seller" class="set_center bg-white px-2">
          <nuxt-link active-class="font-bold" to="/seller">Seller</nuxt-link>
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
      <div class="md:col-span-2 sm:col-span-6 col-span-5 flex justify-end items-center gap-5">
        <a-icon type="heart" :style="{fontSize: '30px'}" />
        <nuxt-link to="/user/cart">
          <a-badge class="cursor-pointer" :count="cart_count" :number-style="{backgroundColor: '#fff',color: '#999',boxShadow: '0 0 0 1px #d9d9d9 inset',}">
            <a-icon type="shopping-cart" :style="{ fontSize: '30px', color: '#08c' }" />
          </a-badge>
        </nuxt-link>

      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Icon}   from 'ant-design-vue';
  Vue.use(Icon)
  export default {
    data() {
      return {
      }
    },
    beforeCreate() {
      this.$axios.get('/api/user/cart/product/count')
        .then(res => this.$store.commit('cart_store/SET_TO_CART',res.data))
    },
    computed: {
      cart_count(){
        return this.$store.state.cart_store.items
      }
    },
    methods: {}
  }
</script>

<style lang="less">

  .set_center{
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
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

</style>
