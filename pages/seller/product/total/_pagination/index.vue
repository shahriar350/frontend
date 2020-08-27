<template>
  <div>
    <div class="mb-3 card grid grid-rows-1 grid-flow-col justify-space">
      <div class="flex items-center">
        <nuxt-link to="/seller" class="mx-2 md:text-base text-sm">Dashboard</nuxt-link> >
        <nuxt-link to="/seller/product" class="mx-2 md:text-base text-sm">Product</nuxt-link> >
        <p class="inline-block md:text-base text-sm mx-2">All products</p>
      </div>
    </div>
    <div class="my-3 flex gap-2 xl:px-16 md:px-8 px-3 md:mt-3 mt-4 justify-center">
      <nuxt-link class="btn btn-primary" active-class="active_nav" :to="{path: `/seller/product/total/${index}`}" v-for="index in paginate.last_page" :key="index">{{index}}
      </nuxt-link>
    </div>
    <div class="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
      <div class="card flex justify-between flex-col" v-for="(product,index) in products" :key="index">
        <div>
          <div class="border-b bg-gray-100">
            <img class="shadow-md rounded p-2" v-if="product.image" :src="product.image.image" alt="">
          </div>
          <div class="mt-2">
            <p class="text-center md:text-base text-sm font-bold">{{ product.name }}</p>
            <p class="text-center md:text-base text-sm font-bold">Price: {{ product.price }}/taka</p>
          </div>
        </div>

        <div class="mt-3 bg-gray-100 rounded border-0 grid grid-cols-3 gap-5 border border-blue-200">
          <nuxt-link title="Show details" :to="`/seller/product/${product.url}`"
                     class="transition duration-300 hover:bg-white py-2 md:text-xl text-sm cursor-pointer hover:text-2xl flex justify-center">
            <a-icon type="fullscreen"/>
          </nuxt-link>
          <nuxt-link title="Show details" :to="`/seller/product/${product.url}/edit`"
                     class="transition duration-300 hover:bg-white py-2 md:text-xl text-sm cursor-pointer hover:text-2xl flex justify-center">
            <a-icon type="edit"/>
          </nuxt-link>
          <a-icon type="delete"
                  class="transition duration-300 hover:bg-white py-2 text-red-600 md:text-xl text-sm cursor-pointer hover:text-2xl"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    asyncData({$axios,params}){
      return $axios.get(`/api/seller/product/all?page=${params.pagination}`)
        .then(res => {
          return{
            products: res.data.data.data,
            paginate : res.data.data.pagination
          }
        })
    },
  }

</script>

<style>
  .active_nav{
    background: dodgerblue;
  }
  .pagination_btn{
    padding: 7px 15px;
    border-radius: 4px;
  }
</style>

