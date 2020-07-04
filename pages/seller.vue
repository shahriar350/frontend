<template>
  <div class="flex md:gap-4 gap-1 mt-5 ">
    <div>
      <a-menu
        :default-selected-keys="[$route.path]"
        mode="inline"
        :inline-collapsed="screenWidth <= 768"
      >

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
    <div class="xl:pr-16 md:pr-8 pr-3 w-full">
      <nuxt-child></nuxt-child>
    </div>
  </div>
</template>

<style>

</style>
