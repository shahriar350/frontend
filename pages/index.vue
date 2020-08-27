<template>
  <div class="xl:px-16 md:px-8 px-3 md:mt-3 mt-4">
    <p class="py-2 border-b my-3 md:text-lg font-bold tracking-wider text-base">Latest products</p>
    <div class="grid md:grid-cols-5 mt-2 sm:grid-cols-3 grid-cols-2 md:gap-4 gap-2 flex-wrap">
      <div class="flex flex-col my-2 card rounded hover:shadow-lg " v-for="(product,index) in latestProducts">
        <nuxt-link :to="`/product/${product.url}`" class="cursor-pointer">
          <v-lazy-image class="rounded-md shadow w-full" :src="product.image.image" alt=""/>
        </nuxt-link>
        <div class="">
          <nuxt-link :to="`/product/${product.url}`" class="lg:text-xl md:text-md text-base my-1 cursor-pointer text-black">{{ product.name }}</nuxt-link>
          <p class="md:text-base text-sm">Taka: {{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VLazyImage from "v-lazy-image";
export default {

  components: {
    VLazyImage,
  },
  asyncData({$axios}){
    return $axios.get(`/api/bongo/product/init`)
    .then(res => {
      return {latestProducts: res.data.latest}
    })
  },
  computed:{

  },
  mounted(){
    try{
      window.Echo.channel('laravel_database_demo')
        .listen('DemoEvent', (e) => {
          // this.message = e.message
          console.log(e)
        })
    } catch (e) {
      console.log('something is error')
    }


  },

}
</script>
