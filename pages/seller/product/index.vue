<template>
  <div>
    <div class="mb-3 card grid grid-rows-1 grid-flow-col justify-space">
      <div class="flex items-center">
        <nuxt-link to="/seller" class="mx-2 md:text-base text-sm">Dashboard</nuxt-link> > <p class="inline-block md:text-base text-sm mx-2">Product</p>
      </div>
      <div class="text-right">
        <nuxt-link :to="{path: `/seller/product/total/1`}" class="md:btn btn-sm btn-primary md:text-base text-sm font-weight-700">All Product</nuxt-link>
        <nuxt-link to="/seller/product/new" class="md:btn btn-sm btn-primary md:text-base text-sm font-weight-700">New Product</nuxt-link>
      </div>
    </div>
    <div v-if="top_product !== '' || top_product.length" class="card my-3">
      <p class="py-2 border-b md:text-xl text-base">Most Selling products</p>
      <div class="mt-3 grid xl:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4">
        <div  class="card" v-for="(product,index) in top_product" :key="index">
          <div class="border-b bg-gray-100">
            <img class="shadow-md rounded p-2" v-if="product.image" :src="product.image.image" alt="">
          </div>
          <div class="mt-2">
            <p class="text-center font-12 font-bold">{{ product.name }}</p>
            <p class="text-center font-12 font-bold">Price: {{ product.price }}/taka</p>
            <p class="text-center font-12 font-bold">Sold: <i>{{ product.total }}</i> <span v-if="product.total > 1">items</span> <span v-else>item</span> </p>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        top_product: '',
      }
    },

    created() {
      this.most_selling_product();
    },
    methods: {
      most_selling_product(){
        this.$axios.get('/api/seller/product/most/selling')
          .then(res => {
            this.top_product = res.data.data;
          })
      }
    }
  }
</script>
