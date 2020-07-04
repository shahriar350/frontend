<template>
  <div >
    <div class="card grid grid-rows-1 grid-flow-col justify-space mb-3">
      <div class="flex items-center">
        <a href="/seller" class="mx-2">Dashboard</a> > <a href="/seller/shop" class="mx-2">Shop</a> <p class="inline-block mx-2">New Shop</p>
      </div>
      <div class="text-right">
        <nuxt-link to="/seller/shop/new" class="btn btn-primary font-base font-weight-700">New Shop</nuxt-link>
      </div>
    </div>
    <div class="flex md:flex-row flex-col card">
      <div class="mb-3 md:border-r border-r-0 md:border-b-0 border-b md:px-3 py-3 md:py-2  mb-5 mx-2 mr-4">
        <a-steps class="md:text-base text-sm" :direction="screenWidth >= 768 ? 'vertical' : 'horizontal'" size="small" :current="$route.path === '/seller/shop/new' ? 0 : 1">
          <a-step class="md:text-base text-sm" :title="$route.path === '/seller/shop/new' ? 'In Progress' : 'Finished'" description="Add your shops's information" />
          <a-step class="md:text-base text-sm" :title="$route.path === '/seller/shop/new' ? 'Waiting' : 'In Progress'" description="Upload Shop image" />
        </a-steps>
      </div>
      <div class="w-full">
        <nuxt-child></nuxt-child>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    mounted() {

    }

  }
</script>
