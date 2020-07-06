<template>
  <div >
    <div class="card grid grid-rows-1 grid-flow-col justify-space mb-3">
      <div class="flex items-center">
        <a href="/seller" class="mx-2">Dashboard</a> > <a href="/seller/product" class="mx-2">Product</a> <p class="inline-block mx-2">New Product</p>
      </div>
      <div class="text-right">
        <nuxt-link to="/seller/product/new" class="btn btn-primary font-base font-weight-700">New Shop</nuxt-link>
      </div>
    </div>
    <div class="flex md:flex-row flex-col card">
      <div class="mb-3 md:border-r border-r-0 md:border-b-0 border-b md:px-3 py-3 md:py-2  mb-5 mx-2 mr-4">
        <a-steps class="md:text-base text-sm" :direction="screenWidth >= 768 ? 'vertical' : 'horizontal'" size="small" :current="$route.path === '/seller/product/new' ? 0 : 1">
          <a-step class="md:text-base text-sm" :title="$route.path === '/seller/product/new' ? 'In Progress' : 'Finished'" description="Add your products's information" />
          <a-step class="md:text-base text-sm" :title="$route.path === '/seller/shop/new' ? 'Waiting' : 'In Progress'" description="Upload product images" />
        </a-steps>
      </div>
      <div class="w-full">
        <nuxt-child></nuxt-child>
      </div>
    </div>

  </div>
</template>
