
<template>
  <div class="xl:px-16 md:px-8 px-3 py-2 ">
    <p class="my-3 py-2 bg-blue-300 shadow rounded text-base px-3">Please fill the form and submit</p>
    <server_error></server_error>

    <form @submit.prevent="requestSeller" class="mt-3">
      <div  class="grid grid-cols-1 gap-4 justify-center">
        <div class="grid grid-rows-4 gap-4 p-2 shadow rounded">

          <div>
            <input type="text" class="placeholder-gray-600" v-model.trim="$v.form.english.shop_name.$model" placeholder="Enter your shop name">
            <p class="text-red-500 md:text-sm text-xs" v-if="$v.form.english.shop_name.$error">Please enter your shop name</p>
          </div>
          <div>
            <input type="text" class="placeholder-gray-600" v-model.trim="$v.form.english.shop_author.$model" placeholder="Enter your shop author name">
            <p class="text-red-500 md:text-sm text-xs" v-if="$v.form.english.shop_author.$error">Please enter your shop author name</p>
          </div>
          <div>
            <input type="text" class="placeholder-gray-600" v-model.trim="$v.form.contact.$model" placeholder="Enter your contact number">
            <p class="text-red-500 md:text-sm text-xs" v-if="$v.form.contact.$error">Please enter shop contact mobile number</p>
          </div>
          <div>
            <input type="text" class="placeholder-gray-600" v-model.trim="$v.form.english.location.$model" placeholder="Enter your shop location">
            <p class="text-red-500 md:text-sm text-xs" v-if="$v.form.english.location.$error">Please enter shop location</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <a-checkbox :checked="form.check" @change="onChangeConditionAgree">
                I read condition and agree
              </a-checkbox>
              <p class="text-red-500 md:text-sm text-xs" v-if="$v.form.check.$error && !$v.form.check.checkVal">Please read our condition and check it</p>
            </div>
            <p @click="termsAndCondition" class="cursor-pointer text-sm text-gray-500">
              Read our conditions
            </p>
          </div>
        </div>
        <div class="flex justify-center mt-2">
          <button class="btn btn-primary text-white w-full" type="submit">Request us</button>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
  import Vuelidate from 'vuelidate'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import server_error from '../../../components/server_error'
  export default {
    middleware: 'auth',
    mixins: [validationMixin],
    components: {
      Vuelidate,server_error
    },
    validations: {
      form: {
        english: {
          shop_name: {
            required,
          },
          shop_author: {
            required,
          },
          location: {
            required,
          }
        },
        contact: {
          required
        },
        check:{
          checkVal(val){
            return val === true
          }
        }
      }
    },
    mounted() {

    },
    data() {
      return {
        form: {
          english: {
            shop_name: 'bongo shop',
            shop_author: 'saifullah',
            location: 'dhaka bangladesh',
          },
          contact: '01752495467',
          check: true
        }
      }
    },
    computed: {

    },
    methods: {
      termsAndCondition() {
      },
      clearError(){
        this.$store.commit('SET_SERVER_ERRORS','')
      },
      requestSeller() {
        this.clearError()
        this.$v.form.$touch()
        if (!this.$v.form.$invalid){
          this.$axios.post('/api/user/seller/request',this.form)
          .then(res => {
            this.$notification.success({
              message: `${res.data.data}`
            })
          }) .catch(err => {
            if (err.response.status === 422){
              this.$store.commit('SET_SERVER_ERRORS',err.response.data)
            }
          })
        }
      },
      onChangeConditionAgree(e) {
        this.form.check = !this.form.check;
      },
    }
  }
</script>
