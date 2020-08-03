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
    <div class="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      <div class="card" v-for="(product,index) in products" :key="index">
        <div class="border-b bg-gray-100">
          <img class="shadow-md rounded p-2" v-if="product.image" :src="product.image.image" alt="">
        </div>
        <div class="mt-2">
          <p class="text-center font-12 font-bold">{{ product.name }}</p>
          <p class="text-center font-12 font-bold">Price: {{ product.price }}/taka</p>
        </div>
        <div class="mt-3 bg-gray-100 rounded border-0 grid grid-cols-3 gap-5 border border-blue-200">
          <nuxt-link title="Show details" :to="`/seller/product/${product.url}`" class="transition duration-300 hover:bg-white py-2 md:text-xl text-sm cursor-pointer hover:text-2xl flex justify-center"><a-icon type="fullscreen" /></nuxt-link>
          <nuxt-link title="Show details" :to="`/seller/product/${product.url}/edit`" class="transition duration-300 hover:bg-white py-2 md:text-xl text-sm cursor-pointer hover:text-2xl flex justify-center"><a-icon type="edit" /></nuxt-link>
          <a-icon @click="deleteShop(shop.id,index)" type="delete" class="transition duration-300 hover:bg-white py-2 text-red-600 md:text-xl text-sm cursor-pointer hover:text-2xl"/>
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
    asyncData({$axios}){
      return $axios.get('/api/seller/product/all')
        .then(res => {
          return {products : res.data.data}
        })
    },
    methods: {
      deleteShop() {

      }
    }
  }
</script>
