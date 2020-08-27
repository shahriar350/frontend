<template>
  <div>
    <div v-if="total_orders.length < 1" class="py-2">
      <p class="text-center bg-white py-2 md:text-lg text-base">You do not have any new order now</p>
    </div>
    <div class="my-4 "  v-else v-for="(orderInit,statusName) in total_orders" :key="statusName">
      <div class="card xl:px-16 md:px-8 px-3">
        <p class="py-2 border-b md:text-lg text-base">{{ status_name(statusName) }}</p>

        <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:gap-4 gap-2 mt-3">
          <div class="card" v-for="(order,index) in orderInit" :key="index">
            <div>
              <div class="my-2">
                <v-lazy-image class="rounded border-blue-300 shadow" :src="order.product.image.image"/>
              </div>
              <p class="font-bold">{{ order.product.name }}</p>
              <p v-if="order.offer">Quantity: -{{ order.offer }}% off</p>
              <p>Quantity: {{ order.quantity }}</p>
              <p>Total Price: {{ order.total_price }}</p>
              <div v-for="(option, optIndex) in order.options">
                <p v-text="option.option.name"></p>
              </div>
              <div class="border-gray-200">
                <p class="py-2 border-b text-center">Delivery location</p>
                <div class="mt-2">
                 <p class="font2 tracking-wider text-base">Area: {{order.address.location.area}}</p>
                 <p class="font2 tracking-wider text-base">City: {{order.address.location.city}}</p>
                 <p class="font2 tracking-wider text-base">House: {{order.address.location.house}}</p>
                 <p class="font2 tracking-wider text-base">Post office: {{ order.address.location.post }}</p>
                 <p class="font2 tracking-wider text-base">Police station: {{order.address.location.police}}</p>
                 <p class="font2 tracking-wider text-base">Road: {{order.address.location.road}}</p>
                </div>
              </div>
              <div>
                <p class="py-2 border-b text-center">Actions</p>
                <div class="my-2 flex flex-col">

                  <p class="w-full"><a-checkbox @click.prevent="updateOrderProductStatus(order.id,1,order.status,statusName,index)" :checked="order.status >= 1" class="flex">Receive Order</a-checkbox></p>
                  <p class="w-full"><a-checkbox @click.prevent="updateOrderProductStatus(order.id,2,order.status,statusName,index)" :checked="order.status >= 2" class="flex">Order Processing</a-checkbox></p>
                  <p class="w-full"><a-checkbox @click.prevent="updateOrderProductStatus(order.id,3,order.status,statusName,index)" :checked="order.status >= 3" class="flex">Order On-road</a-checkbox></p>
                  <p class="w-full"><a-checkbox disabled="true" :checked="order.status >= 4" class="flex">Order Receive</a-checkbox></p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import VLazyImage from "v-lazy-image";
  export default {
    components: {
      VLazyImage
    },
    asyncData({$axios}){
      return $axios.get('/api/seller/product/order/new/all')
        .then(res => {

          return {total_orders : res.data.data}
        })
    },
    methods: {
      status_name(status){
          status = parseInt(status)
        if (status === 0){
          return 'New Order'
        } else {
          if (status === 1){
            return 'Receive order'
          } else {
            if (status === 2){
              return 'Order processing'
            } else {
              if (status === 3){
                return 'Order on-road'
              } else {
                if (status === 4){
                  return 'Complete order'
                }
              }
            }
          }
        }
      },
      updateOrderProductStatus(id,status,order_status,statusIndex,index){
        if (status === order_status + 1){
          this.$axios.post(`/api/seller/product/order/status/${id}`,{
            status: status
          })
            .then(res => {
              if (res.status === 200){
                this.total_orders[statusIndex][index].status = status
                this.$notification.success({
                  message: 'Updated',
                  duration: 2
                })
              }

            }) .catch(err => {
              this.$notification.error({
                message: `${res.data}`
              })
          })
        } else {
          this.$notification.error({
            message: 'You can only update next status',
            duration: 2
          })
        }


      }
    }
  }
</script>
