<template>
  <div>

    <p class="md:text-xl text-base my-3 card my-3 text-center">Checkout</p>
    <div class="xl:px-16 md:px-8 px-3 grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
      <div class="mt-3">
        <div>
          <div v-for="(address,index) in addresses" :key="index" v-if="addresses.length" class="flex gap-2 flex-wrap card items-center">
            <div>
              <p class="md:text-xl text-base inline-block mr-3 font-bold">{{index + 1}}:</p>
              <p class="inline-block">{{address.house}}, </p>
              <p class="inline-block">{{address.area}}, </p>
              <p class="inline-block">{{address.road}}, </p>
              <p class="inline-block">{{address.police}}, </p>
              <p class="inline-block">{{address.post}}, </p>
              <p class="inline-block">{{address.city}}</p>
            </div>
            <div class="text-right">
              <a-checkbox @change="changeDefaultAdd(address.id,index)" :checked="address.default === 1">Default</a-checkbox>
              <a-icon type="delete" class="bg-red-200 p-1 rounded-full cursor-pointer" @click="deleteAddress(address.id,index)" />
            </div>

          </div>
        </div>
        <form @submit.prevent="add_address" class="card rounded mt-3">
          <div class="mt-3">
            <label for="block">Block/House</label>
            <input type="text" id="block" v-model.trim="$v.address.block.$model">
            <small class="text-red-500 tracking-wider"
                   v-if="!$v.address.block.required ">This is required</small>
            <small class="text-red-500 tracking-wider"
                   v-if="!$v.address.block.stringValidate ">a-z, A-Z, 0-9, _, + are only valid for sentence </small>
          </div>
          <div class="mt-3">
            <label for="area">Area</label>
            <input type="text" id="area" v-model.trim="$v.address.area.$model">
            <small class="text-red-500 tracking-wider"
                   v-if="!$v.address.area.required ">This is required</small>
            <small class="text-red-500 tracking-wider"
                   v-if="!$v.address.area.stringValidate ">a-z, A-Z, 0-9, _, + are only valid for sentence </small>
          </div>
          <div class="mt-3">
            <label for="road">Road</label>
            <input type="text" id="road" v-model.trim="$v.address.road.$model">
            <small class="text-red-500 tracking-wider"
                   v-if="!$v.address.road.required ">This is required</small>
            <small class="text-red-500 tracking-wider"
                   v-if="!$v.address.road.stringValidate ">a-z, A-Z, 0-9, _, + are only valid for sentence </small>
          </div>
          <div class="mt-3">
            <label for="police_station">Police station</label>
            <input type="text" id="police_station" v-model.trim="$v.address.police_station.$model">
            <small class="text-red-500 tracking-wider"
                   v-if="!$v.address.police_station.required ">This is required</small>
            <small class="text-red-500 tracking-wider"
                   v-if="!$v.address.police_station.stringValidate ">a-z, A-Z, 0-9, _, + are only valid for
              sentence </small>
          </div>
          <div class="mt-3">
            <label for="post">Post office</label>
            <input type="text" id="post" v-model.trim="$v.address.post.$model">
            <small class="text-red-500 tracking-wider"
                   v-if="!$v.address.post.required ">This is required</small>
            <small class="text-red-500 tracking-wider"
                   v-if="!$v.address.post.stringValidate ">a-z, A-Z, 0-9, _, + are only valid for sentence </small>
          </div>
          <div class="mt-3">
            <label for="city">City</label>
            <input type="text" id="city" v-model.trim="$v.address.city.$model">
            <small class="text-red-500 tracking-wider"
                   v-if="!$v.address.city.required">This is required</small>
            <small class="text-red-500 tracking-wider"
                   v-if="!$v.address.city.stringValidate ">a-z, A-Z, 0-9, _, + are only valid for sentence </small>
          </div>

          <div class="mt-3">
            <button type="submit" class="btn btn-primary w-full">Add Location</button>
          </div>
        </form>
      </div>

      <div class="mt-3">
        <button class="btn btn-primary w-full" @click="ordernow()">Pay and order</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vuelidate from 'vuelidate'
  import { validationMixin } from 'vuelidate'
  import { required, minLength, maxLength, requiredIf } from 'vuelidate/lib/validators'

  const stringValidate = (value) => /^[a-zA-Z0-9_,+ ]*$/.test(value) || value === ''
  export default {
    mixins: [validationMixin],
    components: {
      Vuelidate
    },
    asyncData({ $axios }) {
      return $axios.get('/api/user/address')
        .then(res => {
          return { addresses: res.data.data }
        })
    },
    data() {
      return {
        address: {
          block: '',
          area: '',
          road: '',
          police_station: '',
          post: '',
          city: '',
          default: 0
        }
      }
    },
    validations: {
      address: {
        block: {
          required,
          stringValidate
        },
        area: {
          required,
          stringValidate
        },
        road: {
          required,
          stringValidate
        },
        police_station: {
          required,
          stringValidate
        },
        post: {
          required,
          stringValidate
        },
        city: {
          required,
          stringValidate
        }
      }
    },
    methods: {
      ordernow() {
        this.$axios.post('/api/user/order/now')
        .then(res => {
          this.$notification.success({
            message: 'You are successfully placed a order'
          })
          this.$axios.get('/api/user/cart/product/count')
            .then(res => this.$store.commit('cart_store/SET_TO_CART',res.data))
          this.$router.push('/')
        })
      },
      add_address() {
        this.$v.address.$touch()
        if (!this.$v.address.$invalid) {
          this.$axios.post('/api/user/address/add', {
            address: this.address
          }).then(res => {
            this.addresses.push(res.data.data)
            this.address = {
              block: '',
              area: '',
              road: '',
              police_station: '',
              post: '',
              city: '',
            };
            if (res.data.data.default === 1){
              this.addresses.forEach((e) => {
                if (!e.id === res.data.data.id){
                  e.default = 0
                }
              } )
            }
          })
        }
      },
      deleteAddress(id,index){
        this.$swal({
          title: 'Confirmation!',
          text: 'Do you want to delete address',
          icon: 'error',
          confirmButtonText: 'Delete'
        })
          .then((result) => {
            if (result.value) {
              this.$axios.post(`/api/user/address/remove/${id}`)
              .then(this.addresses.splice(index,1))
            }
          })
      },
      changeDefaultAdd(id,index){
        this.$axios.post(`/api/user/address/default/change/${id}`)
        .then(
          this.addresses.forEach((e,ind) => {
            if (ind === index && e.default === 0){
              e.default = 1
            } else {
              e.default = 0
            }
          } )
        )
      },
    }
  }
</script>
