<template>
  <div class="flex justify-center">

    <server_error></server_error>
    <form @submit.prevent="addShop" class="flex flex-col gap-5 lg:w-3/4 w-full">
      <div class="flex flex-col gap-5">
        <div class="grid grid-cols-12">
          <label class="col-span-3 text-base flex items-center font2" for="name">Shop Name:</label>
          <div class="col-span-9">
            <input v-model="shop.name" type="text" id="name">
            <small class="w-full text-red-600" v-if="!$v.shop.name.required && $v.shop.name.$error">Please enter your
              shop name</small>
          </div>
        </div>
        <div class="grid grid-cols-12">
          <label class="col-span-3 text-base flex items-center font2" for="description">Description</label>
          <input class="col-span-9" v-model="shop.description" type="text" id="description">
        </div>
        <div class="flex">
          <div class="mx-2">
            <div class="increment_loc">
              <span class="w-full font-bold md:text-base text-sm flex">Add Location<span v-if="shop.locations.length > 1">s</span></span>
              <div>
                <a-icon type="plus-square" @click="incrementLoc" class="text-xl cursor-pointer"/>
                <span class="text-base mx-2">{{ shop.locations.length }}</span>
                <a-icon type="minus-square" @click="decrementLocation(null)" class="text-xl cursor-pointer"/>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-5" v-for="(location,index) in shop.locations" :key="index">
          <p class="text-base font-bold flex justify-center items-center">Location : {{ index +1 }}
            <a-icon type="minus-square" @click="decrementLocation(index)" v-if="shop.locations.length > 1"
                    class="ml-4 text-xl cursor-pointer"/>
          </p>
          <div class="grid grid-cols-12">
            <label class="col-span-3 flex text-base items-center font2" for="block">Block/House:</label>
            <div class="col-span-9">
              <input v-model="location.block_house" type="text" id="block">
              <small class="w-full text-red-600"
                     v-if="!$v.shop.locations.$each[index].block_house.required && $v.shop.locations.$each[index].block_house.$error">
                Please enter your block/house of your shop</small>
            </div>
          </div>
          <div class="grid grid-cols-12">
            <label class="col-span-3 flex text-base items-center font2" for="area">Area:</label>
            <div class="col-span-9">
              <input v-model="location.area" type="text" id="area">
              <small class="w-full text-red-600"
                     v-if="!$v.shop.locations.$each[index].area.required && $v.shop.locations.$each[index].area.$error">
                Please enter your area of your shop</small>
            </div>
          </div>
          <div class="grid grid-cols-12">
            <label class="col-span-3 flex text-base items-center font2" for="road">Road:</label>
            <div class="col-span-9">
              <input v-model="location.road" type="text" id="road">
              <small class="w-full text-red-600"
                     v-if="!$v.shop.locations.$each[index].road.required && $v.shop.locations.$each[index].road.$error">
                Please enter your road of your shop</small>
            </div>
          </div>
          <div class="grid grid-cols-12">
            <label class="col-span-3 flex text-base items-center font2" for="police">Police station:</label>
            <div class="col-span-9">
              <input v-model="location.police" type="text" id="police">
              <small class="w-full text-red-600"
                     v-if="!$v.shop.locations.$each[index].police.required && $v.shop.locations.$each[index].police.$error">
                Please enter your police station of your shop</small>
            </div>
          </div>
          <div class="grid grid-cols-12">
            <label class="col-span-3 flex text-base items-center font2" for="post">Post Office:</label>
            <div class="col-span-9">
              <input v-model="location.post" type="text" id="post">
              <small class="w-full text-red-600"
                     v-if="!$v.shop.locations.$each[index].post.required && $v.shop.locations.$each[index].post.$error">
                Please enter your post office of your shop</small>
            </div>
          </div>
          <div class="grid grid-cols-12">
            <label class="col-span-3 flex text-base items-center font2" for="city">City:</label>
            <div class="col-span-9">
              <input v-model="location.city" type="text" id="city">
              <small class="w-full text-red-600"
                     v-if="!$v.shop.locations.$each[index].city.required && $v.shop.locations.$each[index].city.$error">
                Please enter your city of your shop</small>
            </div>
          </div>
          <span class="py-2 border-b border-blue-200">If your shop is in shopping complex</span>
          <div class="grid grid-cols-12">
            <label class="col-span-3 flex text-base items-center font2" for="complex">Shopping complex name:</label>
            <div class="col-span-9">
              <input v-model="location.shopping_complex" type="text" id="complex">
              <small class="w-full text-red-600"
                     v-if="!$v.shop.locations.$each[index].check_shopping_complex && shop.locations[index].shopping_complex === ''">
                Please enter your shopping complex name</small>
            </div>
          </div>
          <div class="grid grid-cols-12">
            <label class="col-span-3 flex text-base items-center font2" for="floor">Floor:</label>
            <div class="col-span-9">
              <input v-model="location.floor" type="text" id="floor">
              <small class="w-full text-red-600"
                     v-if="!$v.shop.locations.$each[index].check_shopping_complex && shop.locations[index].floor === ''">
                Please enter your floor in shopping complex</small>
            </div>
          </div>
          <div class="grid grid-cols-12">
            <label class="col-span-3 flex text-base items-center font2" for="shop_no">Shop number:</label>
            <div class="col-span-9">
              <input v-model="location.shop_no" type="text" id="shop_no">
              <small class="w-full text-red-600"
                     v-if="!$v.shop.locations.$each[index].check_shopping_complex && shop.locations[index].shop_no === ''">
                Please enter your floor in shopping complex</small>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-primary w-full" type="submit">Add image now</button>
    </form>
  </div>
</template>

<script>
  import Vuelidate from 'vuelidate'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import server_error from '../../../../components/server_error'

  export default {
    mixins: [validationMixin],
    components: {
      Vuelidate, server_error
    },
    head() {
      return {
        title: 'New shop'
      }
    },
    data() {
      return {
        loc_count: 1,
        shop: {
          name: 'bongobtian',
          description: 'this is demo shop',
          locations: [
            {
              block_house: 'block',
              area: 'area',
              road: 'road',
              police: 'police',
              post: 'post',
              city: 'city',
              shopping_complex: 'shopping name',
              floor: 'shopping complex floor',
              shop_no: 'shopping complex shop no'
            }
          ]
        }
      }
    },
    validations: {
      shop: {
        name: {
          required
        },
        locations: {
          $each: {
            check_shopping_complex(value) {
              return (value.shopping_complex === '' && value.floor === '' && value.shop_no === '') || (value.shopping_complex !== '' && value.floor !== '' && value.shop_no !== '')
            },
            block_house: {
              required
            },
            area: {
              required
            },
            road: {
              required
            },
            police: {
              required
            },
            post: {
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
      addShop() {
        this.$v.shop.$touch()
        if (!this.$v.shop.$invalid) {
          this.$axios.post('/api/seller/new/shop', this.shop)
            .then(res => {
              this.$notification.success({
                message: 'Succesfully added shop information. Add image now',
                duration: 6
              })
              this.$router.push(`/seller/shop/new/${res.data.data}`)
            })
            .catch(err => {
              this.$store.commit('SET_SERVER_ERRORS', err.response.data)
              console.log(err.response.data)
            })
        }
      },
      incrementLoc() {
        this.shop.locations.push({
          block_house: '',
          area: '',
          road: '',
          police: '',
          post: '',
          city: '',
          shopping_complex: '',
          floor: '',
          shop_no: ''
        })
        this.$message.success('Added your location')
      },
      decrementLocation(index) {
        if (this.shop.locations.length > 1) {
          this.$swal({
            title: 'Confirmation',
            text: 'Do you want to decrement shop location?',
            icon: 'info',
            confirmButtonText: 'Remove'
          }) .then((result) => {
            if (result.value){
              if (index === null) {
                this.shop.locations.pop()
              } else {
                this.shop.locations.splice(index, 1)
              }
              this.$message.success('Removed your location')
            }
          })
        }

      }
    }
  }
</script>
<style>
  .increment_loc {
    position: fixed;
    content: '';
    right: 0;
    bottom: 30vh;
    background: white;
    box-shadow: -1px 2px 8px -2px #262626;
    border-radius: 5px;
    padding: 7px 15px 7px 7px;
  }
  @media screen and (max-width: 768px) {
    .increment_loc{
      padding: 5px 10px 5px 5px;
      bottom: 25vh;
    }
  }
</style>
