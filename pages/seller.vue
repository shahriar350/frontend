<template>
  <div class="flex flex-col md:gap-4 gap-1 mt-5 ">
    <div class="">
      <a-menu
        :default-selected-keys="[$route.path]"
        :mode="screenWidth <= 768 ? 'inline' : 'horizontal'">
        <a-menu-item key="/seller">
          <nuxt-link to="/seller">
            <a-icon type="home" />
          <span>Dashboard</span>
          </nuxt-link>
        </a-menu-item>

        <a-menu-item key="/seller/shop">
          <nuxt-link to="/seller/shop">
            <a-icon type="shop" />
            <span>Shop</span>
          </nuxt-link>
        </a-menu-item>

        <a-menu-item key="/seller/product">
          <nuxt-link to="/seller/product">
            <a-icon type="snippets" />
            <span>Product</span>
          </nuxt-link>
        </a-menu-item>

<!--        <a-sub-menu key="sub1">-->
<!--          <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>-->
<!--          <a-menu-item key="5">-->
<!--            Option 5-->
<!--          </a-menu-item>-->
<!--          <a-menu-item key="6">-->
<!--            Option 6-->
<!--          </a-menu-item>-->
<!--          <a-menu-item key="7">-->
<!--            Option 7-->
<!--          </a-menu-item>-->
<!--          <a-menu-item key="8">-->
<!--            Option 8-->
<!--          </a-menu-item>-->
<!--        </a-sub-menu>-->

      </a-menu>
    </div>
    <div class=" w-full">
      <nuxt-child></nuxt-child>
    </div>
  </div>
</template>

<script>
  export default {
    middleware: [
      'auth','is_seller'
    ],
  }
</script>

<style>

</style>
