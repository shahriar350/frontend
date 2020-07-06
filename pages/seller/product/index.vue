<template>
  <div>
    <div class="mb-3 card grid grid-rows-1 grid-flow-col justify-space">
      <div class="flex items-center">
        <a href="/seller" class="mx-2 md:text-base text-sm">Dashboard</a> > <p class="inline-block md:text-base text-sm mx-2">Product</p>
      </div>
      <div class="text-right">
        <nuxt-link to="/seller/product/new" class="md:btn btn-sm btn-primary md:text-base text-sm font-weight-700">New Product</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        products: ''
      }
    }
  }
</script>
