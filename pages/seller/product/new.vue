<template>
  <div class="">
    <div class="xl:px-16 md:px-8 px-3 card grid grid-rows-1 grid-flow-col justify-space mb-3">
      <div class="flex items-center">
        <a href="/seller" class="mx-2 md:text-base text-sm">Dashboard</a> > <a href="/seller/product" class="mx-2 md:text-base text-sm">Product</a> <p class="inline-block mx-2 md:text-base text-sm">New Product</p>
      </div>
      <div class="text-right">
        <nuxt-link to="/seller/product/new" class="md:btn btn-sm btn-primary font-base font-weight-700">New Shop</nuxt-link>
      </div>
    </div>
    <div class="xl:px-16 md:px-8 px-3 flex md:flex-row flex-col card">
      <div class="mb-3 md:border-r border-r-0 md:border-b-0 border-b md:px-3 py-3 md:py-2  mb-5 mx-2 mr-4">
        <a-steps class="md:text-base text-sm" :direction="screenWidth >= 768 ? 'vertical' : 'horizontal'" size="small" :current="$route.name === 'seller-product-new' ? 0 : $route.name === 'seller-product-new-productname-id' ? 1 : $route.name === 'seller-product-new-productname-id-option' ? 2 : $route.name === 'seller-product-new-productname-id-option-image' ? 3 : 0">
          <a-step class="md:text-base text-sm" :title="$route.path === '/seller/product/new' ? 'In Progress' : 'Finished'" description="Product basic information" />
          <a-step class="md:text-base text-sm" :title="$route.name === 'seller-product-new-productname-id' ? 'In Progress' : $route.path === '/seller/product/new' ? 'Waiting' : 'Finished'" description="Upload product images" />
          <a-step class="md:text-base text-sm" :title="$route.name === 'seller-product-new-productname-id-option' ? 'In Progress' : $route.name === 'seller-product-new-productname-id-option-image' ? 'Finished' : 'Waiting'"  description="Product option (optional)" />
          <a-step class="md:text-base text-sm" :title="$route.name === 'seller-product-new-productname-id-option-image' ? 'In Progress' : 'Waiting'" description="Product option image upload" />
        </a-steps>
      </div>
      <div class="w-full ">
        <nuxt-child></nuxt-child>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    middleware: [
      'auth'
    ],
  }
</script>
