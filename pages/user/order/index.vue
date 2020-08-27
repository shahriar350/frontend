<template>
  <div>
    <div v-if="orders.length < 1">
      <p class="bg-white font-bold py-3 md:text-lg text-base text-center">You don't have any order now.</p>
    </div>
    <div v-else v-for="(order,index) in orders" :key="index" class="card md:my-4 my-2 xl:px-16 md:px-8 px-3">

      <p class="py-2 border-b md:text-lg text-base">Order: {{ index + 1}}</p>
      <div class=" grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
        <div v-for="(product,proDex) in order.products" :key="proDex">
          <div class="my-2">
            <v-lazy-image :src="product.product.image.image" class="rounded shadow"/>
          </div>
          <p class="md:text-base text-sm font-bold">{{ product.product.name}}</p>
          <p class="md:text-base text-sm">Quantity: {{ product.quantity}}</p>
          <p class="md:text-base text-sm">Total price: {{ product.total_price}}</p>
          <p class="md:text-base text-sm font-bold">Status: {{ status_name(product.status)}}</p>
          <div v-if="product.status === 3">
            <a-checkbox @click.prevent="receiveProduct(product.id,product.product.name,index,proDex)">I receive product</a-checkbox>
          </div>

        </div>
      </div>

    </div>
    <a-modal @ok="addToProductReview" @cancel="handleCancel" :visible="rating.modal" :title="`Rating ${rating.name}`">
      <div class="flex flex-col">
        <p class="flex gap-2 justify-center items-center">Rating:
          <a-rate class="my-2" v-model="rating.rating" />
        </p>
        <textarea placeholder="Write about product quality" id="desc" cols="30" maxlength="140" rows="7"
                  class="border border-gray-500 rounded p-2 my-2" v-model="rating.message">

        </textarea>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Rate } from 'ant-design-vue'
  import { Modal } from 'ant-design-vue'

  Vue.use(Modal)
  Vue.use(Rate)
  import VLazyImage from 'v-lazy-image'

  export default {
    components: {
      VLazyImage
    },
    data() {
      return {
        rating: {
          modal: false,
          order: '',
          product: '',
          message: '',
          rating: 0,
          name: '',
        }
      }
    },

    asyncData({ $axios }) {
      return $axios.get('/api/user/order/all')
        .then(res => {
          return { orders: res.data.data }
        })
    },
    methods: {
      addToProductReview() {
        if (this.rating.rating > 0) {

        }
        this.$axios.post('/api/user/order/product/rating', {
          product: this.rating.product,
          order: this.rating.order,
          message: this.rating.message,
          rating: this.rating.rating
        })
          .then(res => {

            this.rating = {
              modal: false,
              order: '',
              product: '',
              message: '',
              rating: 0,
              name: '',
            }
          })
      },
      handleCancel() {
        this.rating.modal = false
      },
      receiveProduct(id, name,index,prodex) {
        this.$swal({
          title: 'Confirmation!',
          text: 'Do you really receive product',
          icon: 'success',
          confirmButtonText: 'Confirm'
        })
          .then((result) => {
            if (result.value) {
              this.$axios.post(`/api/user/order/product/receive/${id}`)
                .then(res => {
                  this.rating.order = res.data.order
                  this.rating.product = res.data.product
                  this.rating.name = name
                  this.rating.modal = true
                  if (res.data.message === 'empty'){
                    this.orders.splice(this.rating.orderIndex,1)
                  }
                  this.orders[index].products.splice(prodex,1)
                })
            }
          })

      },
      status_name(status) {
        status = parseInt(status)
        if (status === 0) {
          return 'New Order'
        } else {
          if (status === 1) {
            return 'Receive order'
          } else {
            if (status === 2) {
              return 'Order processing'
            } else {
              if (status === 3) {
                return 'Order on-road'
              } else {
                if (status === 4) {
                  return 'Complete order'
                }
              }
            }
          }
        }
      }
    }
  }
</script>
