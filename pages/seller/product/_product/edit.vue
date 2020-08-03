<template>
  <div>
    <div class="xl:px-16 md:px-8 px-3 card grid grid-rows-1 grid-flow-col justify-space mb-3">
      <div class="flex items-center">
        <a href="/seller" class="mx-2 md:text-base text-sm">Dashboard</a> > <a href="/seller/product" class="mx-2 md:text-base text-sm">Product</a> <p class="inline-block mx-2 md:text-base text-sm">{{name}}</p>
      </div>
      <div class="text-right">
        <nuxt-link :to="`/seller/product/${url}`" class="md:btn btn-sm btn-primary font-base font-weight-700">View {{name}}</nuxt-link>
      </div>
    </div>
    <nuxt-child @changeName="changename"></nuxt-child>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        url: '',
      }
    },
    methods: {
      changename(name,url) {
        this.name = name;
        this.url = url;
      }
    }
  }
</script>
