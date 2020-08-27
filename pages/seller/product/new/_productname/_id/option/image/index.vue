<template>
  <div>
    <p class="text-2xl py-2 border-b">{{ $route.params.productname | firstCapital}}</p>
    <div class="flex justify-end my-2">
      <ul class="">
        <li class="font2 md:text-base text-sm">Image size should be SQUARE or 1024X1024</li>
        <li class="font2 md:text-base text-sm">Image size maximum 2MB</li>
        <li class="font2 md:text-base text-sm">JPG,JPEG,PNG types are only support</li>
        <li class="font2 md:text-base text-sm">Maximum 5 images can be added</li>
      </ul>
    </div>
    <server_error></server_error>

    <div v-for="(option,index) in options" class="card mb-2 mt-3" :key="index">
      <p class="text-xl">{{ option.name | firstCapital}}</p>
      <div v-for="(opt,optIndex) in option.options" :key="optIndex" class="ml-5 my-3 border shadow rounded">
        <div class="flex sm:flex-row flex-col-reverse">
          <div class="md:w-8/12 sm:w-10/12 w-full">
            <p class="tracking-wider p-2 inline-block"><span class="font-bold ">Option:</span> {{ opt.name }}</p>
            <p class="tracking-wider p-2 inline-block"><span class="font-bold ">Price:</span> {{ opt.price }}/taka</p>
            <input :ref="`opt${index}${optIndex}`" type="file" @change="optionImage(option.id,opt.id,index,optIndex)">
          </div>
          <transition name="page">
            <div v-if="opt.image" class="md:w-4/12 sm:w-2/12 w-full relative sm:block flex justify-end">
              <img class="rounded shadow p-2 sm:w-full w-4/12 flex justify-center" :src="opt.image.image" alt="">
              <a-icon @click="removeImage(option.id,opt.id,index,optIndex)" type="delete"
                      class="absolute top-0 right-0 bg-white p-2 shadow rounded"/>
            </div>
          </transition>

        </div>
      </div>
    </div>
    <nuxt-link class="mt-3 flex justify-center btn btn-primary" to="/seller/product">Back to product</nuxt-link>
  </div>
</template>
<script>

  import server_error from '../../../../../../../../components/server_error'

  export default {
    components: {
      server_error
    },
    asyncData({ $axios, params }) {
      return $axios
        .get(`/api/seller/${params.id}/option/all`)
        .then(res => {
          return { options: res.data.data }
        })
    },
    mounted() {

    },
    methods: {
      optionImage(option, child, index, optIndex) {
        this.$store.commit('SET_SERVER_ERRORS', '')
        let formData = new FormData()
        formData.append('image', event.target.files[0])
        this.$axios.post(`/api/seller/${this.$route.params.id}/${option}/${child}/image`, formData)
          .then(res => {
            this.options[index].options.splice(optIndex, 1, res.data.data)
          }).catch(err => {
          if (err.response.status === 422) {
            this.$store.commit('SET_SERVER_ERRORS', err.response.data)
          }
        })
      },
      removeImage() {


        this.$swal({
          title: 'Confirmation!',
          text: 'Do you want to remove this image',
          confirmButtonText: 'Delete'
        }) .then(res => {
          if (res.value) {
            this.$axios.post(`/api/seller/${this.$route.params.id}/${option}/${child}/image/remove`)
              .then(res => {
                this.options[index].options.splice(optIndex,1,res.data.data)
              }) .catch(err => {
              if (err.response.status === 422) {
                this.$store.commit('SET_SERVER_ERRORS',err.response.data)
              }
            })
          }
        })

      }
    },
    filters: {
      firstCapital: function(value) {
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  }
</script>
