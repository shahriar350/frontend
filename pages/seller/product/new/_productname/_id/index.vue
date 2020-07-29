<template>
  <div class="">

    <p class="font-bold md:text-2xl text-base">{{ $route.params.productname}}</p>
    <div class="flex justify-end">
      <ul class="">
        <li class="font2 md:text-base text-sm">Image size should be square or 1024X1024</li>
        <li class="font2 md:text-base text-sm">Image size maximum 2MB</li>
        <li class="font2 md:text-base text-sm">JPG,JPEG,PNG types are only support</li>
        <li class="font2 md:text-base text-sm">Maximum 5 images can be added</li>
      </ul>
    </div>
    <div>
      <div class="flex grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 md:gap-4 gap-2 w-full">
        <div v-for="(img,index) in show_images" class="relative">
          <img class="shadow rounded" :src="img.image" alt="" :key="index" width="100%">
          <a-icon @click="deleteImage(img.id, index)" type="delete" class="cursor-pointer absolute p-2 bg-white shadow top-0 rounded right-0 text-red-700"/>
        </div>
      </div>
    </div>
    <server_error></server_error>
    <div class="my-5 shadow bg-gray-100 p-2">
      <label for="image">Upload Image(s)</label>
      <input accept="image/*" type="file" id="image" multiple @change="uploadImage">
    </div>
    <nuxt-link :to="{path: `/seller/product/new/${this.$route.params.id}/options`}" class="btn btn-primary w-full mt-5 flex items-center justify-center">Add options <a-icon type="arrow-right" class="mx-2" /> </nuxt-link>
  </div>
</template>

<script>
  import server_error from '../../../../../../components/server_error'
  export default {
    components: {
        server_error
    },
    data() {
      return {
        show_images: ''
      }
    },
    beforeCreate() {
      this.$axios.get(`/api/seller/product/image/all/${this.$route.params.id}`)
        .then(res => this.show_images = res.data.data)
    },
    methods: {
      uploadImage(event) {
        this.$store.commit('SET_SERVER_ERRORS','')
        let formdata = new FormData;
        for (let i = 0; i <event.target.files.length ; i++) {
          let img = event.target.files[i]
          formdata.append('images[]',img,img.name)
        }
        this.$axios.post(`/api/seller/product/image/upload/${this.$route.params.id}`, formdata)
        .then(res => {
          this.show_images = res.data.data
        })
        .catch(err => {
          if (err.response.status === 422) {
            this.$store.commit('SET_SERVER_ERRORS',err.response.data)
          }
        })
      },
      deleteImage(id,index){
        this.$swal({
          title: 'Confirmation!',
          text: 'Do you want to delete product image',
          icon: 'error',
          confirmButtonText: 'Delete'
        })
          .then((result) => {
            if (result.value) {
              this.$axios.post(`/api/seller/product/${this.$route.params.id}/image/delete/${id}`)
                .then(res => {
                  this.show_images.splice(index,1)
                })
            }
          })
      }
    }
  }
</script>
