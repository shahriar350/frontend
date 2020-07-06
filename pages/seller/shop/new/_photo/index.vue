<template>
  <div class="flex flex-col gap-5">
    <server_error></server_error>
    <p class="flex justify-end items-center py-2 text-gray-600"><a-icon type="alert" class="text-base mb-1 mr-2" /> <span class="font2 mr-2">N.B:</span>1. You can upload maximum  4 banner  each shop or location <br/>2. Size must be 1200x400 </p>
    <div class="card">
      <p class="font-bold text-base">{{ shop.name }}</p>
      <div class="grid md:grid-cols-4 grid-cols-2 gap-5">
        <div v-for="(img,index) in shop.banners" :key="index">
          <div class="relative">
            <img :src="img.banner" alt="banner" width="100%" class="shadow-md rounded">
            <a-icon @click="deleteShopBanner(img.id,index)" type="delete" class="absolute top-0 right-0 bg-white text-red-500 cursor-pointer p-1 border-0 rounded"/>
          </div>
        </div>
      </div>
      <input type="file" class="mt-2" ref="images" @change="imageShopchange(shop.id)" multiple>
    </div>
    <div class="card mt-5">
      <p class="font-bold text-base text-center">Locations</p>
      <div v-for="(location , index) in shop.locations" :key="index">
        <div class="my-4">
          <div class="grid md:grid-cols-4 grid-col-2 gap-4 mb-2">
            <div v-for="(img,banner) in location.banners" :key="banner">
              <div class="relative">
                <img :src="img.banner" alt="banner" width="100%" class="shadow-md rounded">
                <a-icon @click="deleteLocationBanner(img.id,index,banner)" type="delete" class="absolute top-0 right-0 bg-white text-red-500 cursor-pointer p-1 border-0 rounded"/>
              </div>
            </div>
          </div>
          <input type="file" :key="index" multiple ref="location" @change="changeLocationBanner(location.id,index)">
        </div>
        <div class="my-4">
          <span class="mx-2 text-base">{{ location.area }}</span>,
          <span class="mx-2 text-base">{{ location.block }}</span>,
          <span class="mx-2 text-base">{{ location.city }}</span>,
          <span class="mx-2 text-base">{{ location.road }}</span>,
          <span class="mx-2 text-base">{{ location.police_station }}</span>,
          <span class="mx-2 text-base">{{ location.post_office }}</span>,
          <span class="mx-2 text-base">{{ location.shopping_complex }}</span>,
          <span class="mx-2 text-base">{{ location.floor }}</span>,
          <span class="mx-2 text-base">{{ location.shop_no }}</span>
        </div>

      </div>
    </div>
    <nuxt-link to="/seller/shop" class="btn btn-primary">Done</nuxt-link>
  </div>
</template>
<script>
  import server_error from '../../../../../components/server_error'
  export default {
    components: {server_error},
    data() {
      return {
        shop: '',
        shopBanners: '',
        locationBanners: '',
      }
    },
    created() {
      this.$axios.get(`/api/seller/new/shop/image/${this.$route.params.photo}`)
        .then(res => {
          this.shop = res.data.data
        })
        .catch(err => {
          console.log(err.response)
          // this.$router.back()
        })
    },
    methods: {
      imageShopchange(id) {
        if (this.$refs.images.files.length <= 4 && id ){
          let formData = new FormData;
          for( var i = 0; i < this.$refs.images.files.length; i++ ){
            let file = this.$refs.images.files[i];
            formData.append('image[' + i + ']', file);
          }
          const config = {headers: {'Content-Type' : 'multipart/form-data' }}
          formData.set('shop',id)
          this.$store.commit('SET_SERVER_ERRORS','')
          this.$axios.post('/api/seller/shop/image',formData,config)
            .then(res => {
              this.shop.banners.splice(0,this.shop.banners.length)
              this.shop.banners.push(...res.data.data)
            })
            .catch(err => {
              if (err.response.status === 422){
                this.$store.commit('SET_SERVER_ERRORS',err.response.data)
              }
            })
        } else {
          this.$message.error('You can uplaod only 4 image each');
        }
      },
      changeLocationBanner(location,index){
        if (this.$refs.location[0].files.length <= 4 && location ){
          let formData = new FormData;
          for( var i = 0; i < this.$refs.location[0].files.length; i++ ){
            let file = this.$refs.location[0].files[i];
            formData.append('image[' + i + ']', file);
          }
          const config = {headers: {'Content-Type' : 'multipart/form-data' }}
          formData.set('location',location)
          this.$store.commit('SET_SERVER_ERRORS','')
          this.$axios.post('/api/seller/location/image',formData,config)
            .then(res => {
              console.log(this.shop.locations[index].banners.length)
              this.shop.locations[index].banners.splice(0,this.shop.locations[index].banners.length)
              this.shop.locations[index].banners.push(...res.data.data)
            })
            .catch(err => {
              if (err.response.status === 422){
                this.$store.commit('SET_SERVER_ERRORS',err.response.data)
              }
            })
        } else {
          this.$message.error('You can uplaod only 4 image each');
        }
      },
      deleteShopBanner(id,index){
        this.$swal({
          title: 'Confirmation!',
          text: 'Do you want to delete banner',
          icon: 'error',
          confirmButtonText: 'Delete'
        })
        .then((result) => {
          if (result.value){
            this.$axios.$post('/api/seller/shop/image/delete',{id:id})
              .then(res => {
                this.shop.banners.splice(index,1);
                this.$notification.success({
                  message: 'Successfully deleted your image'
                })
              })
          }

        })
      },
      deleteLocationBanner(id,parent,child){
        this.$swal({
          title: 'Confirmation!',
          text: 'Do you want to delete banner',
          icon: 'info',
          confirmButtonText: 'Delete'
        })
          .then((result) => {
            if (result.value){
              this.$axios.$post('/api/seller/location/image/delete',{location:id})
                .then(res => {
                  this.shop.locations[parent].banners.splice(child,1);
                  this.$notification.success({
                    message: 'Successfully deleted your image'
                  })
                })
            }

          })
      }
    }
  }
</script>
