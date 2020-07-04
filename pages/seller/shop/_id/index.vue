<template>
  <div>
    <div class="mb-3 card grid grid-rows-1 grid-flow-col justify-space">
      <div class="flex items-center">
        <a href="/seller" class="mx-2 md:text-base text-sm">Dashboard</a> >
        <a href="/seller/shop" class="mx-2 md:text-base text-sm">Shop</a> >
        <p class="inline-block md:text-base text-sm mx-2">{{ shop.name }}</p>
      </div>
      <div class="text-right">
        <nuxt-link :to="`/seller/shop/edit/${shop.id}`"
                   class="md:btn btn-sm btn-primary md:text-base text-sm font-weight-700">Edit Shop
        </nuxt-link>
      </div>
    </div>

    <div class="card">
      <p class="my-2 text-base font-bold text-center">{{ shop.name }} banners</p>
      <div class="mt-3 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
        <div v-for="(banner, index) in shop.banners" :key="index">
          <img :src="banner.banner" alt="" class="shadow-md p-2 bg-gray-100 rounded">
        </div>
      </div>
    </div>

    <div class="card my-3">
      <p class="my-2 bg-blue-100 py-1 rounded text-base font-bold text-center md:text-base text-sm mb-5">{{ shop.name }}
        locations</p>
      <div class="mt-5 grid sm:grid-cols-2 grid-cols-1  md:gap-4 gap-2">
        <div v-for="(loc,index) in shop.locations" class="relative mb-4 bg-blue-100 p-2 rounded shadow">
          <!--          <a-carousel arrows>-->
          <!--            <div v-for="(img,index) in loc.banners">-->
          <!--              <img :src="img.banner" alt="" class="shadow-md rounded">-->
          <!--            </div>-->
          <!--          </a-carousel>-->
          <div class="relative">
            <client-only placeholder="Loading...">
              <agile ref="carousel">
                <div class="slide" v-for="(banner,index) in loc.banners">
                  <img :src="banner.banner" alt="" width="100%">
                </div>
                <template slot="prevButton"><a-icon :style="{ fontSize: '16px', color: '#08c' }" type="left"/></template>
                <template slot="nextButton"><a-icon :style="{ fontSize: '16px', color: '#08c' }" type="right"/></template>
              </agile>
            </client-only>
          </div>

          <p v-if="loc.shopping_complex" class="block w-full flex flex-col">
            <span class="mx-1 md:text-base text-sm">{{ loc.shop_no}},</span>
            <span class="mx-1 md:text-base text-sm">{{ loc.floor}},</span>
            <span class="mx-1 md:text-base text-sm">{{ loc.shopping_complex}}</span>
          </p>
          <p class="flex flex-col">
            <span class="mx-1 md:text-base text-sm"><strong>Block:</strong>  {{loc.block}}</span>
            <span class="mx-1 md:text-base text-sm"><strong>Area:</strong> {{loc.area}}</span>
            <span class="mx-1 md:text-base text-sm"><strong>Post:</strong> {{loc.post_office}}</span>
            <span class="mx-1 md:text-base text-sm"><strong>Police:</strong> {{loc.police_station}}</span>
            <span class="mx-1 md:text-base text-sm"><strong>City:</strong> {{loc.city}}</span>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { VueAgile } from 'vue-agile'
  import 'vue-agile/dist/VueAgile.css'

  export default {
    components: {
      agile: VueAgile
    },
    head() {
      return {
        link: [
          'https://unpkg.com/vue-agile/dist/VueAgile.css'
        ]
      }
    },
    data() {
      return {
        shop: ''
      }
    },
    computed: {},
    beforeMount() {
      this.$axios.get(`/api/seller/shop/single/${this.$route.params.id}`)
        .then((res) => {
          this.shop = res.data.data
        })
    },
    methods: {
      // set_location_grid(index) {
      //   let location = this.shop.locations
      //   if (location.length > 1) {
      //     if (location.length % 2 === 0) {
      //       return 'md:w-1/4 sm:w-1/2 w-full'
      //     } else {
      //       if (index === location.length-1) {
      //         return 'w-full'
      //       } else {
      //         return ' sm:w-1/2 w-full'
      //       }
      //     }
      //   } else {
      //     return 'w-full'
      //   }
      // }
    }
  }
</script>

<style>
  .agile--ssr .agile__slides > * {
    overflow: hidden;
    width: 0
  }

  .agile--ssr .agile__slides > *:first-child {
    width: 100%
  }
</style>
