<template>
  <div class="">
    <div class="mb-3 card grid grid-rows-1 grid-flow-col justify-space">
      <div class="flex items-center">
        <a href="/seller" class="mx-2 md:text-base text-sm">Dashboard</a> > <p class="inline-block md:text-base text-sm mx-2">Shop</p>
      </div>
      <div class="text-right">
        <nuxt-link to="/seller/shop/new" class="md:btn btn-sm btn-primary md:text-base text-sm font-weight-700">New Shop</nuxt-link>
      </div>
    </div>

    <div class="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        <div class="card" v-for="(shop,index) in shops">
          <div class="border-b bg-gray-100">
            <img class="shadow-md rounded p-2" v-if="shop.single_banner" :src="shop.single_banner.banner" alt="">
          </div>
          <div class="mt-2">
            <p class="text-center font-12 font-bold">{{ shop.name }}</p>
            <p class="text-center font-12">{{ shop.description }}</p>
          </div>
          <div class="mt-3 bg-gray-100 rounded border-0 grid grid-cols-3 gap-5 border border-blue-200">
            <nuxt-link title="Show details" :to="`/seller/shop/${shop.id}`" class="transition duration-300 hover:bg-white py-2 md:text-xl text-sm cursor-pointer hover:text-2xl flex justify-center"><a-icon type="fullscreen" /></nuxt-link>
            <a-icon type="edit" class="transition duration-300 hover:bg-white py-2 md:text-xl text-sm cursor-pointer hover:text-2xl"/>
            <a-icon @click="deleteShop(shop.id,index)" type="delete" class="transition duration-300 hover:bg-white py-2 text-red-600 md:text-xl text-sm cursor-pointer hover:text-2xl"/>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
  export default {
    head(){
        return {
          title: 'Seller shop'
        }
    },
    data() {
      return {
        shops: '',
      }
    },
    mounted() {
      this.$axios.get('/api/seller/shop/all')
        .then((res) => {
          this.shops = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      deleteShop(id,index) {
        this.$swal({
          title: 'Delete',
          text: 'You can find it in trash section.',
          icon: 'info',
          confirmButtonText: 'Delete',
        }) .then((res) => {
          if (res.value){
            this.$axios.post(`/api/seller/shop/trash/${id}`)
              .then(res => {
                this.shops.splice(index,1);
                this.$notification.success({
                  message: 'Successfully deleted shop.'
                })
              })
          }
        })
      }
    }
  }
</script>
