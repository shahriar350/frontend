<template>
  <div class="mt-3 mb-10">
    <div class="flex justify-center gap-4">
      <div v-for="(shop,index) in product.shops">
        <p class="text-3xl py-2 text-center">{{ shop.shop.name }}</p>
      </div>
    </div>

    <div class="card grid grid-cols-12 md:gap-4 gap-2 mt-3 xl:px-16 md:px-8 px-3">
      <div class="md:col-span-4 sm:col-span-6 col-span-12">
        <div class="my-2">
          <div class="grid grid-cols-1 w-full shadow rounded-lg overflow-hidden">
            <zoom-on-hover :scale="2.5" :img-normal="showImage"></zoom-on-hover>
          </div>
        </div>
        <div class="grid grid-cols-5 gap-2">
          <div @click="selectImage(img.image)" v-for="(img,index) in product.images" :key="index">
            <v-lazy-image class="shadow rounded cursor-pointer" :src="img.image"></v-lazy-image>
          </div>
        </div>
      </div>
      <div
        class="flex sm:justify-between justify-center sm:items-start items-center flex-col  md:col-span-8 sm:col-span-6 col-span-12">
        <div>
          <p class="text-xl my-1">{{ product.name }}</p>
          <p class="my-2">
            <a-rate disabled="true" v-model="average" />
          </p>
          <div class="mt-2" v-if="product.offer === 'running' || product.offer === 'unlimited'">
            <div class="text-lg" v-if="product.offer_min_buy === 1">
              <p class="font-bold inline-block mr-1">Taka: {{price}}</p>
              <del class="text-sm">{{product.price}}</del>
              <small class="italic bg-gray-100 rounded p-1 text-xs font-bold">-{{product.offer_price}}{{product.offer_type
                === 'percent' ? '%' : ''}} off</small>
            </div>
            <div v-else-if="product.offer_min_buy > 1">
              <p>Taka: {{price}}</p>
              <small>Buy {{product.offer_min_buy}} {{product.name.toLowerCase()}} and get -{{product.offer_price}}
                {{product.offer_type === 'percent' ? '%' : ''}} off</small>
            </div>

          </div>
          <div v-else class="mt-2">
            <p class="md:text-xl text-base my-1 font-bold">Taka: {{ price }}</p>
          </div>

          <div class="flex my-2">
            <label for="quantity" class="md:text-xl text-base mr-4">Quantity: </label>
            <select v-model.number="cart.selectQuantity" onfocus='this.size=7;' onblur='this.size=1;'
                    onchange='this.size=1; this.blur();' name="" id="quantity"
                    class="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 md:py-2 py-1 md:px-3 px-2 md:pr-8 pr-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option class="md:text-xl text-base" :value="number" v-for="number in 15">{{ number }}</option>
            </select>
          </div>
          <div class="border p-2 rounded mt-2" v-for="(opt,index) in product.options">
            <p class="text-base">{{opt.name }}</p>
            <div
              :class="cart.selectOption.length && cart.selectOption.some(e => e.parent === opt.id) && cart.selectOption.some(e => e.child === child.id) ? 'bg-gray-200' : ''"
              class="ml-3 border rounded border-gray-300 inline-block px-3 py-1 hover:bg-gray-100 cursor-pointer transition duration-500 ease-in-out"
              v-for="(child,childIndex) in opt.options"
              @click="updateImageToOption(child,opt.id,child.id,child.price)">
              <p class="font-sm ">{{ child.name }}</p>
            </div>
          </div>

          <div class="flex" v-if="product.offer === 'upcoming'">
            <p class="font-bold pr-2">Upcoming offer: </p>
            <counting :endtime="this.product.offer_start"></counting>
          </div>
          <div class="flex" v-else-if="product.offer === 'running'">
            <p class="font-bold pr-2">Offer End time: </p>
            <counting :endtime="this.product.offer_end"></counting>
          </div>
        </div>
        <div class="flex sm:justify-start justify-center w-full md:mb-20 sm:mb-16 mb-10 mt-3 gap-2">
          <button class="btn btn-primary">Buy now</button>
          <button @click="addToCart()" class="btn bg-blue-300 text-white">Add to cart</button>
        </div>
      </div>
    </div>
    <div v-if="suggest_products.length" class="mt-3 card md:gap-4 gap-2 mt-3 xl:px-16 md:px-8 px-3">
      <p class="md:text-xl text-lg py-2 font-bold">People buy these products with {{product.name}}</p>
      <div class="grid md:grid-cols-8 grid-cols-12 md:gap-4 gap-2">
        <div v-for="(product,index) in suggest_products" :key="index" class="flex flex-col">
          <nuxt-link :to="{path: `/product/${product.url}`}">
            <img class="shadow rounded" :src="product.image.image" :alt="product.name" width="100%">
          </nuxt-link>
          <div>
            <nuxt-link :to="{path: `/product/${product.url}`}">{{ product.name }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
<!--    review -->
    <div v-if="rating.length >0" class="xl:px-16 md:px-8 px-3 grid md:grid-md:cols-3 sm:grid-cols-2 grid-cols-1 md:gap-4 gap-2 my-3">
      <p class="md:col-span-3 sm:col-span-2 col-span-1 py-2 border-b md:text-lg text-base">{{product.name}} Review</p>
      <div v-for="(rate,index) in rating" :key="index">
        <p><a-rate v-model="rate.rating" /></p>
        <p v-text="rate.description" class="mt-1"></p>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import counting from '../../../components/counting'
  import VLazyImage from 'v-lazy-image'
  import {Rate} from 'ant-design-vue'
  Vue.use(Rate)

  export default {

    components: { counting, VLazyImage },
    data() {
      return {
        showImage: '',
        totalPrice: 0,
        cart: {
          selectQuantity: '',
          selectOption: []
        },
        suggest_products: '',
        rating: '',
        average: 0,
      }
    },
    computed: {
      price() {
        let optPrice = this.cart.selectOption.reduce(function(oldVal, newVal) {
          return oldVal += newVal.price
        }, 0)
        let price = (this.product.price + optPrice) * this.cart.selectQuantity
        let offer = price - (price * (this.product.offer_price / 100))
        if (this.product.offer === 'running' || this.product.offer === 'unlimited') {
          if (this.product.offer_type === 'percent' && this.product.offer_min_buy <= this.cart.selectQuantity) {
            return offer
          } else {
            return price
          }
        } else {
          return price
        }
      }
    },
    mounted() {
      this.addToClick()
      this.apriori_algorithm()
      this.productRating()
    },
    created() {
      this.showImage = this.product.images[0].image
      this.totalPrice = this.product.price
      this.cart.selectQuantity = 1
    },

    methods: {
      productRating() {
        this.$axios.get(`/api/user/product/${this.product.id}/rating`)
          .then(res => {
            this.rating = res.data.data;
            this.average = res.data.average;
          })
      },
      apriori_algorithm() {
        this.$axios.get(`/api/user/product/${this.product.id}/related/buy`)
          .then(res => {
            this.suggest_products = res.data.data
          })
      },
      addToClick() {
        this.$axios.post('/api/user/click/product', {
          product: this.product.id
        })
      },
      addToCart() {
        if (this.cart.selectOption.length === this.product.options.length && this.cart.selectQuantity > 0) {
          let cartItems = {
            product: this.product.id,
            quantity: this.cart.selectQuantity,
            options: this.cart.selectOption
          }
          this.$axios.post('/api/user/cart/add', cartItems)
            .then(res => {
              this.$notification.success({
                message: 'Added to your cart'
              })
              this.$store.commit('cart_store/SET_TO_CART', res.data)
            }).catch(err => {
            this.$notification.error({
              message: 'ERROR!! Try again'
            })
          })
          // this.$store.dispatch('cart_store/POST_CART',cartItems)
        } else {
          if (this.cart.selectOption.length < this.product.options.length) {
            this.$message.info('Please add your all options')
          }
        }
      },
      selectImage(image) {
        this.showImage = image
      },
      updateImageToOption(image, parent, child, price) {
        let available = false
        let index = 0
        let remove = false
        this.cart.selectOption.forEach((e, ind) => {
          if (e.parent === parent) {
            available = true
            index = ind
            if (e.child === child) {
              remove = true
            }
          }
        })
        if (available) {
          if (remove) {
            this.showImage = this.product.images[0].image
            this.cart.selectOption.splice(index, 1)
          } else {
            this.cart.selectOption[index].child = child
            this.cart.selectOption[index].price = price
            if (image.image && image.image.image) {
              this.showImage = image.image.image
            }
          }
        } else {
          this.cart.selectOption.push({
            parent: parent,
            child: child,
            price: price
          })
          if (image.image && image.image.image) {
            this.showImage = image.image.image
          }
        }
      }
    },
    asyncData({ $axios, params }) {
      return $axios.get(`/api/bongo/product/${params.url}`)
        .then(res => {
          return { product: res.data.data }
        })
    }
  }
</script>

<style>

</style>
