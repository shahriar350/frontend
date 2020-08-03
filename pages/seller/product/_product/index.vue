<template>
  <div>
    <div class="xl:px-16 md:px-8 px-3 card grid grid-rows-1 grid-flow-col justify-space mb-3">
      <div class="flex items-center">
        <a href="/seller" class="mx-2 md:text-base text-sm">Dashboard</a> > <a href="/seller/product" class="mx-2 md:text-base text-sm">Product</a> <p class="inline-block mx-2 md:text-base text-sm">{{product.name}}</p>
      </div>
      <div class="text-right">
        <nuxt-link :to="`/seller/product/${product.url}/edit`" class="md:btn btn-sm btn-primary font-base font-weight-700">Edit Shop</nuxt-link>
      </div>
    </div>
    <div class="flex flex-row flex-wrap gap-4 justify-center">
      <div v-for="(image,index) in product.images">
        <img class="shadow rounded" :src="image.image"  alt="" width="150px">
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
  export default {
    asyncData({$axios,params}) {
      return $axios
        .get(`/api/seller/product/${params.product}`)
        .then(res => {
          return {product : res.data.data}
        })
    },
    data() {
      return {
        one: '',
        // product: '',
      }
    },

    // created() {
    //   this.$axios.get(`/api/seller/product/${this.$route.params.product}`)
    //     .then(res => {
    //       this.product = res.data.data
    //     })
    // },

  }
</script>
