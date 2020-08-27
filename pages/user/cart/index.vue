<template>
  <div>
    <div v-if="cart === null">
      <p class="font-bold text-lg py-2 bg-white text-center">Your cart is empty</p>
    </div>
    <div v-else>
      <p class="md:text-xl text-base my-3 card my-3 text-center">My Cart</p>
      <div class="xl:px-16 md:px-8 px-3 grid sm:grid-cols-3 grid-cols-1 md:gap-4 gap-2">
        <div class="sm:col-span-2">
          <div v-for="(product,index) in cart.products" v-if="cart" class="grid grid-cols-12 card my-2 rounded">
            <div class="col-span-4">
              <v-lazy-image
                sizes="(max-width: 320px) 64px, 112px"
                :src="product.product.image.image"
              />
            </div>
            <div class="col-span-8 px-2">
              <nuxt-link :to="{path: `/product/${product.product.url}`}" class="text-xl my-1">{{product.product.name}}
              </nuxt-link>
              <p class="text-xl my-1">{{product.total_price}}/taka</p>
              <p class="text-base my-1">Quantity: {{product.quantity}}</p>
              <div v-for="(opt,optIndex) in product.options">
                <p class="my-1"> {{ opt.option.name }} </p>
              </div>
            </div>
          </div>
        </div>

        <div class="sm:col-span-1 card my-2">
          <div class="my-2 flex justify-between" v-for="(product,index) in cart.products">
            <p class="text-base inline">{{product.product.name}}</p>
            <div class="text-left">
              <p class="text-base inline">{{product.total_price}} /taka</p>
            </div>
          </div>
          <p class="border-b border-blue-300"></p>
          <p class="text-right text-base font-bold">{{totalCartPrice}} /taka</p>
          <nuxt-link to="/user/checkout" class="btn btn-primary mt-5 flex justify-center items-center">Order now
            <a-icon class="mx-2" type="arrow-right"/>
          </nuxt-link>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import VLazyImage from 'v-lazy-image'

  export default {
    middleware: 'auth',
    components: {
      VLazyImage
    },
    data() {
      return {
        totalCartPrice: 0
      }
    },
    asyncData({ $axios }) {
      return $axios.get('/api/user/cart/all')
        .then(res => {
          return { cart: res.data.data }
        })
    },
    created() {
      let cprice = 0
      if (this.cart) {
        for (let i = 0; i < this.cart.products.length; i++) {
          cprice += this.cart.products[i].total_price
        }
        this.totalCartPrice = cprice
      }
    }

  }
</script>

<style>
  .v-lazy-image {
    filter: blur(10px);
    transition: filter 0.7s;
  }

  .v-lazy-image-loaded {
    filter: blur(0);
  }
</style>
