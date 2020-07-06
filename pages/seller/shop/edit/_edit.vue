<template>
  <div>
    <server_error></server_error>
    <div class="mb-3 card grid grid-rows-1 grid-flow-col justify-space">
      <div class="flex items-center">
        <a href="/seller" class="mx-2 md:text-base text-sm">Dashboard</a> >
        <a href="/seller/shop" class="mx-2 md:text-base text-sm">Shop</a> >
        <p class="inline-block md:text-base text-sm mx-2">Edit Shop</p>
      </div>
      <div class="text-right">
        <nuxt-link :to="`/seller/shop/${shop.id}`"
                   class="md:btn btn-sm btn-primary md:text-base text-sm font-weight-700">View {{ shop.name }}
        </nuxt-link>
      </div>
    </div>


    <div class="mt-5 card">
      <p class="my-2 text-base font-bold text-center">{{ shop.name }} </p>

      <div class="mt-3 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
        <div v-for="(img,index) in shop.banners">
          <div class="relative">
            <img :src="img.banner" alt="banner" width="100%" class="shadow-md rounded">
            <a-icon @click="deleteShopBanner(img.id,index)" type="delete"
                    class="absolute top-0 right-0 bg-white text-red-500 cursor-pointer p-1 border-0 rounded"/>
          </div>
        </div>
      </div>
      <input type="file" class="mt-2" ref="images" @change="imageShopchange(shop.id)" multiple>
    </div>
    <div class="card mt-5">
      <button @click="modal.addloc = true" class="btn btn-primary w-full">Add more locations</button>
      <a-modal v-model="modal.addloc" title="Add locations">
        <template slot="footer">
          <button class="btn" key="back" @click="handleCancel">
            Return
          </button>
          <button class="btn btn-primary" key="submit" type="primary" :loading="loading.addloc" @click="addLocationNow">
            Add now
          </button>
        </template>
        <div class="">
          <div v-for="(loc,locationIndex) in locations" class="bg-blue-100 p-2 mb-5 rounded">
            <div class="flex flex-col md:gap-4 gap-2">
              <div>
                <input class="placeholder-black focus:placeholder-gray-500" type="text" v-model="loc.block"
                       placeholder="Enter your block/house name">
                <small class="w-full text-red-600"
                       v-if="!$v.locations.$each[locationIndex].block.required && $v.locations.$each[locationIndex].block.$error">
                  Please enter your block/house name of your shop</small>
              </div>
              <div>
                <input class="placeholder-black focus:placeholder-gray-500" type="text" v-model="loc.road"
                       placeholder="Enter your road name">
                <small class="w-full text-red-600"
                       v-if="!$v.locations.$each[locationIndex].road.required && $v.locations.$each[locationIndex].road.$error">
                  Please enter your road name of your shop</small>
              </div>
              <div>
                <input class="placeholder-black focus:placeholder-gray-500" type="text" v-model="loc.area"
                       placeholder="Enter your area name">
                <small class="w-full text-red-600"
                       v-if="!$v.locations.$each[locationIndex].area.required && $v.locations.$each[locationIndex].area.$error">
                  Please enter your area name of your shop</small>
              </div>
              <div>
                <input class="placeholder-black focus:placeholder-gray-500" type="text" v-model="loc.city"
                       placeholder="Enter your city name">
                <small class="w-full text-red-600"
                       v-if="!$v.locations.$each[locationIndex].city.required && $v.locations.$each[locationIndex].city.$error">
                  Please enter your city name of your shop</small>
              </div>
              <div>
                <input class="placeholder-black focus:placeholder-gray-500" type="text" v-model="loc.police_station"
                       placeholder="Enter your police station name">
                <small class="w-full text-red-600"
                       v-if="!$v.locations.$each[locationIndex].police_station.required && $v.locations.$each[locationIndex].police_station.$error">
                  Please enter your police station name of your shop</small>
              </div>
              <div>
                <input class="placeholder-black focus:placeholder-gray-500" type="text" v-model="loc.post_office"
                       placeholder="Enter your post office name">
                <small class="w-full text-red-600"
                       v-if="!$v.locations.$each[locationIndex].post_office.required && $v.locations.$each[locationIndex].post_office.$error">
                  Please enter your post office name of your shop</small>
              </div>
              <small>If your shop is in shopping complex</small>
              <div>
                <input class="placeholder-black focus:placeholder-gray-500" type="text" v-model="loc.shopping_complex"
                       placeholder="Enter your shopping complex name">
                <small class="w-full text-red-600"
                       v-if="!$v.locations.$each[locationIndex].check_shopping_complex && locations[locationIndex].shopping_complex === ''">
                  Please enter your name of shopping complex</small>
              </div>
              <div>
                <input class="placeholder-black focus:placeholder-gray-500" type="text" v-model="loc.floor"
                       placeholder="Enter your floor in this shopping complex">
                <small class="w-full text-red-600"
                       v-if="!$v.locations.$each[locationIndex].check_shopping_complex && locations[locationIndex].floor === ''">
                  Please enter your floor number in shopping complex</small>
              </div>
              <div>
                <input class="placeholder-black focus:placeholder-gray-500" type="text" v-model="loc.shop_no"
                       placeholder="Enter your shop number in this shopping complex">
                <small class="w-full text-red-600"
                       v-if="!$v.locations.$each[locationIndex].check_shopping_complex && locations[locationIndex].shop_no === ''">
                  Please enter your shop number in shopping complex</small>
              </div>
            </div>
            <button v-if="locations.length > 1" @click="decreaseLocation(locationIndex)"
                    class="btn-sm btn-danger w-full mt-3">Remove this location
            </button>
          </div>
          <button @click="increaseLocation" class="btn-sm mt-3 btn-primary w-full">Add more shop</button>
        </div>
      </a-modal>
    </div>
    <div class="card mt-5">
      <p class="font-bold text-base text-center">Locations</p>
      <div v-for="(location , index) in shop.locations" class="my-5 bg-blue-100 p-2 rounded" :key="index">
        <div class="my-4">
          <div class="grid md:grid-cols-4 grid-col-2 gap-4 mb-2">
            <div v-for="(img,banner) in location.banners" :key="banner">
              <div class="relative">
                <img :src="img.banner" alt="banner" width="100%" class="shadow-md rounded">
                <a-icon @click="deleteLocationBanner(img.id,index,banner)" type="delete"
                        class="absolute top-0 right-0 bg-white text-red-500 cursor-pointer p-1 border-0 rounded"/>
              </div>
            </div>
          </div>
          <input type="file" :key="index" multiple ref="location" @change="changeLocationBanner(location.id,index)">
        </div>
        <div class="my-4">
          <form @submit.prevent="updateLocationInformation(location,index)">
            <div class="flex my-2">
              <label for="area" class="md:w-2/12 w-4/12 flex items-center font-bold md:text-base text-sm">Area
                : </label>
              <div class="md:w-10/12 w-8/12">
                <input type="text" v-model="location.area" required>
                <small class="w-full text-red-600"
                       v-if="!$v.shop.locations.$each[index].area.required && $v.shop.locations.$each[index].area.$error">
                  Please enter your area of your shop</small>
              </div>

            </div>
            <div class="flex my-2">
              <label for="area" class="md:w-2/12 w-4/12 flex items-center font-bold md:text-base text-sm">Block/House
                : </label>
              <div class="md:w-10/12 w-8/12">
                <input type="text" v-model="location.block" required>
                <small class="w-full text-red-600"
                       v-if="!$v.shop.locations.$each[index].block.required && $v.shop.locations.$each[index].block.$error">
                  Please enter your block/house of your shop</small>
              </div>

            </div>
            <div class="flex my-2">
              <label for="area" class="md:w-2/12 w-4/12 flex items-center font-bold md:text-base text-sm">city
                : </label>
              <div class="md:w-10/12 w-8/12">
                <input type="text" v-model="location.city" required>
                <small class="w-full text-red-600"
                       v-if="!$v.shop.locations.$each[index].city.required && $v.shop.locations.$each[index].city.$error">
                  Please enter your city of your shop</small>
              </div>

            </div>
            <div class="flex my-2">
              <label for="area" class="md:w-2/12 w-4/12 flex items-center font-bold md:text-base text-sm">Road
                : </label>
              <div class="md:w-10/12 w-8/12">
                <input type="text" v-model="location.road" required>
                <small class="w-full text-red-600"
                       v-if="!$v.shop.locations.$each[index].road.required && $v.shop.locations.$each[index].road.$error">
                  Please enter your road name of your shop</small>
              </div>

            </div>
            <div class="flex my-2">
              <label for="area" class="md:w-2/12 w-4/12 flex items-center font-bold md:text-base text-sm">Police station
                : </label>
              <div class="md:w-10/12 w-8/12">
                <input type="text" v-model="location.police_station" class="md:w-10/12 w-8/12" required>
                <small class="w-full text-red-600"
                       v-if="!$v.shop.locations.$each[index].police_station.required && $v.shop.locations.$each[index].police_station.$error">
                  Please enter your police station name of your shop</small>
              </div>

            </div>
            <div class="flex my-2">
              <label for="area" class="md:w-2/12 w-4/12 flex items-center font-bold md:text-base text-sm">Post office
                : </label>
              <div class="md:w-10/12 w-8/12">
                <input type="text" v-model="location.post_office" required>
                <small class="w-full text-red-600"
                       v-if="!$v.shop.locations.$each[index].post_office.required && $v.shop.locations.$each[index].post_office.$error">
                  Please enter your post office name of your shop</small>
              </div>
            </div>

            <div class="flex my-2">
              <label for="area" class="md:w-2/12 w-4/12 flex items-center font-bold md:text-base text-sm">Shopping
                complex : </label>
              <div class="md:w-10/12 w-8/12">
                <input type="text" v-model.trim="location.shopping_complex" class="" required>
                <small class="w-full text-red-600"
                       v-if="!$v.shop.locations.$each[index].check_shopping_complex && shop.locations[index].shopping_complex === ''">
                  Please enter your floor in shopping complex</small>
              </div>
            </div>
            <div class="flex my-2">
              <label for="area" class="md:w-2/12 w-4/12 flex items-center font-bold md:text-base text-sm">Floor
                : </label>
              <div class="md:w-10/12 w-8/12">
                <input type="text" v-model="location.floor" required>
                <small class="w-full text-red-600"
                       v-if="!$v.shop.locations.$each[index].check_shopping_complex && shop.locations[index].floor === ''">
                  Please enter your floor in shopping complex</small>
              </div>
            </div>
            <div class="flex my-2">
              <label for="area" class="md:w-2/12 w-4/12 flex items-center font-bold md:text-base text-sm">Shop number
                : </label>
              <div class="md:w-10/12 w-8/12">
                <input type="text" v-model="location.shop_no" required>
                <small class="w-full text-red-600"
                       v-if="!$v.shop.locations.$each[index].check_shopping_complex && shop.locations[index].shop_no === ''">
                  Please enter your floor in shopping complex</small>
              </div>

            </div>
            <div>
              <button type="submit" class="md:btn btn-sm btn-primary w-full">Update this location</button>
              <button @click="deleteLocation(location.id,index)" class="btn-sm btn-danger md:mt-3 mt-2 w-full">Remove
                this location
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import server_error from '../../../../components/server_error'
  import Vuelidate from 'vuelidate'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    components: {
      server_error, Vuelidate
    },
    mounted() {
      this.$axios.get(`/api/seller/shop/single/${this.$route.params.edit}`)
        .then(res => {
          this.shop = res.data.data
        })
    },
    data() {
      return {
        shop: '',
        modal: {
          addloc: false
        },
        loading: {
          addloc: false
        },
        locations: [
          {
            block: '',
            road: '',
            area: '',
            city: '',
            police_station: '',
            post_office: '',
            shopping_complex: '',
            floor: '',
            shop_no: ''
          }
        ]
      }
    },
    validations: {
      locations: {
        $each: {
          check_shopping_complex(value) {
            return (value.shopping_complex === '' && value.floor === '' && value.shop_no === '') || (value.shopping_complex !== '' && value.floor !== '' && value.shop_no !== '')
          },
          block: {
            required
          },
          area: {
            required
          },
          road: {
            required
          },
          police_station: {
            required
          },
          post_office: {
            required
          },
          city: {
            required
          }
        }
      },
      shop: {
        locations: {
          $each: {
            check_shopping_complex(value) {
              return (value.shopping_complex === '' && value.floor === '' && value.shop_no === '') || (value.shopping_complex !== '' && value.floor !== '' && value.shop_no !== '')
            },
            block: {
              required
            },
            area: {
              required
            },
            road: {
              required
            },
            police_station: {
              required
            },
            post_office: {
              required
            },
            city: {
              required
            }
          }
        }
      }
    },
    methods: {
      updateLocationInformation(location, index) {
        this.$v.shop.locations.$each[index].$touch()
        if (!this.$v.shop.locations.$each[index].$invalid) {
          this.$axios.post(`/api/seller/shop/location/info/update/${location.id}`, {
            block_house: location.block,
            road: location.road,
            area: location.area,
            city: location.city,
            police: location.police_station,
            post: location.post_office,
            shopping_complex: location.shopping_complex,
            floor: location.floor,
            shop_no: location.shop_no
          })
        }
      },
      addLocationNow() {
        this.$v.locations.$touch()
        if (!this.$v.locations.$invalid) {
          this.$swal({
            title: 'Confirmation',
            text: 'Do you want to add now',
            confirmButtonText: 'Add Location now'
          }).then((res) => {
            if (res.value) {
              this.$axios.post(`/api/seller/shop/location/add/${this.shop.id}`, {
                locations: this.locations
              })
                .then(res => {
                  this.shop.locations = res.data.data;
                  this.modal.addloc = false;
                  this.locations = [
                    {
                      block: '',
                      road: '',
                      area: '',
                      city: '',
                      police_station: '',
                      post_office: '',
                      shopping_complex: '',
                      floor: '',
                      shop_no: ''
                    }
                  ]
                })

            }
          })
        }

      },
      increaseLocation() {
        this.locations.push({
          block: '',
          road: '',
          area: '',
          city: '',
          police_station: '',
          post_office: '',
          shopping_complex: '',
          floor: '',
          shop_no: ''
        })
      },
      decreaseLocation(index) {
        if (this.locations.length > 1) {
          this.$swal('Do you want to remove this location')
            .then(res => {
              if (res.value) {
                this.locations.splice(index, 1)
              }
            })

        } else {
          this.$message.error('Minimum one location must be selected')
        }
      },
      deleteLocation(id, index) {
        this.$swal({
          title: 'Confirmation',
          text: 'Do you want to delete shop location?',
          confirmButtonText: 'Remove'
        }).then((res) => {
          if (res.value) {
            this.$axios.post(`/api/seller/shop/location/delete/${id}`)
              .then(() => {
                this.shop.locations.splice(index, 1)
              })
          }
        })
      },
      deleteShopBanner(id, index) {
        this.$swal({
          title: 'Confirmation!',
          text: 'Do you want to delete banner',
          icon: 'error',
          confirmButtonText: 'Delete'
        })
          .then((result) => {
            if (result.value) {
              this.$axios.$post('/api/seller/shop/image/delete', { id: id })
                .then(res => {
                  this.shop.banners.splice(index, 1)
                  this.$notification.success({
                    message: 'Successfully deleted your image'
                  })
                })
            }

          })
      },
      imageShopchange(id) {
        if (this.$refs.images.files.length <= 4 && id) {
          let formData = new FormData
          for (var i = 0; i < this.$refs.images.files.length; i++) {
            let file = this.$refs.images.files[i]
            formData.append('image[' + i + ']', file)
          }
          const config = { headers: { 'Content-Type': 'multipart/form-data' } }
          formData.set('shop', id)
          this.$store.commit('SET_SERVER_ERRORS', '')
          this.$axios.post('/api/seller/shop/image', formData, config)
            .then(res => {
              this.shop.banners.splice(0, this.shop.banners.length)
              this.shop.banners.push(...res.data.data)
            })
            .catch(err => {
              if (err.response.status === 422) {
                this.$store.commit('SET_SERVER_ERRORS', err.response.data)
              }
            })
        } else {
          this.$message.error('You can uplaod only 4 image each')
        }
      },
      changeLocationBanner(location, index) {
        if (this.$refs.location[index].files.length <= 4 && location) {
          let formData = new FormData
          for (var i = 0; i < this.$refs.location[index].files.length; i++) {
            let file = this.$refs.location[index].files[i]
            formData.append('image[' + i + ']', file)
          }
          const config = { headers: { 'Content-Type': 'multipart/form-data' } }
          formData.set('location', location)
          this.$store.commit('SET_SERVER_ERRORS', '')
          this.$axios.post('/api/seller/location/image', formData, config)
            .then(res => {
              this.shop.locations[index].banners.splice(0, this.shop.locations[index].banners.length)
              this.shop.locations[index].banners.push(...res.data.data)
            })
            .catch(err => {
              if (err.response.status === 422) {
                this.$store.commit('SET_SERVER_ERRORS', err.response.data)
              }
            })
        } else {
          this.$message.error('You can uplaod only 4 image each')
        }
      },
      deleteLocationBanner(id, parent, child) {
        this.$swal({
          title: 'Confirmation!',
          text: 'Do you want to delete banner',
          icon: 'info',
          confirmButtonText: 'Delete'
        })
          .then((result) => {
            if (result.value) {
              this.$axios.$post('/api/seller/location/image/delete', { location: id })
                .then(res => {
                  this.shop.locations[parent].banners.splice(child, 1)
                  this.$notification.success({
                    message: 'Successfully deleted your image'
                  })
                })
            }

          })
      },
      handleCancel(e) {
        this.modal.addloc = false
      }
    }
  }
</script>
