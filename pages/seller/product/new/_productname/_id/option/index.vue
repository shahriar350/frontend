<template>
  <div>
    <p class="font-bold md:text-2xl pb-3 border-b text-base">{{ $route.params.productname | firstCapital}}</p>
    <p class="md:text-xl py-3 text-base">Options</p>
    <div class="mt-3">
      <div class="my-5">
        <a-checkbox :checked="selectItem.some(e => e === 'bundle')" @change="onChange('bundle')">
          Bundle
        </a-checkbox>
        <a-checkbox :checked="selectItem.some(e => e === 'color')" @change="onChange('color')">
          Color
        </a-checkbox>
        <a-checkbox :checked="selectItem.some(e => e === 'size')" @change="onChange('size')">
          Size
        </a-checkbox>
        <a-checkbox :checked="selectItem.some(e => e === 'custom')" @change="onChange('custom')">
          Custom
        </a-checkbox>
      </div>
      <server_error></server_error>
      <transition name="page">
        <div v-if="selectItem.some(e => e==='bundle')">
          <div v-if="getBundle" class="card my-5">
            <p class="text-2xl">{{ getBundle.name }}</p>
            <ul  v-if="getBundle.options.length">
              <li v-for="(opt,index) in getBundle.options" class="text-base ml-2">
                <span class="font-bold mx-2">Option:</span>{{opt.name}}
                <span class="font-bold mx-2">Price:</span>{{opt.price}}
              </li>
            </ul>
          </div>
          <form v-else @submit.prevent="addBundles" >
            <p class="md:text-2xl text-base">Bundle price</p>
            <div class="mt-3 flex" v-for="(bundle,index) in bundles" :key="index">
              <div class="w-full border-r pr-2">
                <div class="my-3">
                  <label for="bundlename" class="md:text-base text-sm">Bundle name</label>
                  <input type="text" id="bundlename" v-model.trim="$v.bundles.$each[index].name.$model">
                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.bundles.$each[index].name.required">Required. Please add your bundle name. </small>
                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.bundles.$each[index].name.nameValid ">(A-Z a-z 0-9 , _ ) this symbol are allow. </small>


                </div>
                <div class="my-3">
                  <label for="bundlePrice" class="md:text-base text-sm">Bundle price</label>
                  <input type="number" id="bundlePrice" v-model.trim.number="$v.bundles.$each[index].price.$model">

                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.bundles.$each[index].price.required">Required. Please add your bundle price. </small>
                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.bundles.$each[index].price.positiveInteger ">Price should be more then 1. </small>
                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.bundles.$each[index].price.money ">Bundle
                    price should be like 1000 or 1000.50. </small>
                </div>
              </div>
              <div class="flex flex-col justify-center bg-gray-100">
                <a-icon title="Add more bundle" v-if="bundles.length - 1 === index" @click="increaseBundle()" type="plus-circle" class="bg-white p-2 m-2 shadow rounded-full cursor-pointer" />
                <a-icon title="Remove this bundle" v-if="bundles.length > 1" @click="decreaseBundle(index)" type="close" class="bg-white p-2 m-2 shadow rounded-full cursor-pointer" />
              </div>
            </div>
            <div class="my-3 text-center">
              <button type="submit" @click="" class="md:btn btn-sm btn-primary w-full">Add bundles</button>
            </div>
          </form>
        </div>

      </transition>

      <transition name="page">
        <div v-if="selectItem.some(e => e==='color')">
          <div v-if="getColor" class="card my-5">
            <p class="text-2xl">{{ getColor.name }}</p>
            <ul  v-if="getColor.options.length">
              <li v-for="(opt,index) in getColor.options" class="text-base ml-2">
                <span class="font-bold mx-2">Option:</span>{{opt.name}}
                <span class="font-bold mx-2">Price:</span>{{opt.price}}
              </li>
            </ul>
          </div>
          <form v-else @submit.prevent="addColor" >
            <p class="md:text-2xl text-base">Color</p>
            <div class="mt-3 flex" v-for="(color,index) in colors" :key="index">
              <div class="w-full border-r pr-2">
                <div class="my-3">
                  <label for="colorname" class="md:text-base text-sm">Color name</label>
                  <input type="text" id="colorname" v-model.trim="$v.colors.$each[index].name.$model">

                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.colors.$each[index].name.required">Required. Please add your color name. </small>
                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.colors.$each[index].name.nameValid ">(A-Z a-z 0-9 , _ ) this symbol are allowed only. </small>
                </div>
                <div class="my-3">
                  <label for="colorPrice" class="md:text-base text-sm">Color price</label>
                  <small>This price will add with main price</small>
                  <input type="number" id="colorPrice" v-model.trim.number="$v.colors.$each[index].price.$model">

                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.colors.$each[index].price.positiveInteger ">Price should be more then 1. </small>
                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.colors.$each[index].price.money ">Color
                    price should be like 1000 or 1000.50. </small>
                </div>
              </div>
              <div class="flex flex-col justify-center bg-gray-100">
                <a-icon title="Add more color" v-if="colors.length - 1 === index" @click="increaseColor()" type="plus-circle" class="bg-white p-2 m-2 shadow rounded-full cursor-pointer" />
                <a-icon title="Remove this color" v-if="colors.length > 1" @click="decreaseColor(index)" type="close" class="bg-white p-2 m-2 shadow rounded-full cursor-pointer" />
              </div>
            </div>
            <div class="my-3">
              <button type="submit" @click="" class="md:btn btn-sm btn-primary w-full w-full">Add Colors</button>
            </div>

          </form>
        </div>

      </transition>
      <transition name="page">
        <div v-if="selectItem.some(e => e==='size')">
          <div v-if="getSize" class="card my-5">
            <p class="text-2xl">{{ getSize.name }}</p>
            <ul  v-if="getSize.options.length">
              <li v-for="(opt,index) in getSize.options" class="text-base ml-2">
                <span class="font-bold mx-2">Option:</span>{{opt.name}}
                <span class="font-bold mx-2">Price:</span>{{opt.price}}
              </li>
            </ul>
          </div>
          <form v-else @submit.prevent="addSizes" >
            <p class="md:text-2xl text-base">Size</p>
            <div class="mt-3 flex" v-for="(size,index) in sizes" :key="index">
              <div class="w-full border-r pr-2">
                <div class="my-3">
                  <label for="sizename" class="md:text-base text-sm">Size name</label>
                  <input type="text" id="sizename" v-model.trim="$v.sizes.$each[index].name.$model">
                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.sizes.$each[index].name.required">Required. Please add your size name. </small>
                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.sizes.$each[index].name.nameValid ">(A-Z a-z 0-9 , _ ) this symbol are allow. </small>
                </div>
                <div class="my-3">
                  <label for="sizePrice" class="md:text-base text-sm">Size price</label>
                  <small>This price will add with main price</small>
                  <input type="number" id="sizePrice" v-model.trim.number="$v.sizes.$each[index].price.$model">

                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.sizes.$each[index].price.positiveInteger ">Price should be more then 1. </small>
                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.sizes.$each[index].price.money ">Size
                    price should be like 1000 or 1000.50. </small>
                </div>
              </div>
              <div class="flex flex-col justify-center bg-gray-100">
                <a-icon title="Add more size" v-if="sizes.length - 1 === index" @click="increaseSize()" type="plus-circle" class="bg-white p-2 m-2 shadow rounded-full cursor-pointer" />
                <a-icon title="Remove this size" v-if="sizes.length > 1" @click="decreaseSize(index)" type="close" class="bg-white p-2 m-2 shadow rounded-full cursor-pointer" />
              </div>
            </div>
            <div class="my-3 text-center">
              <button type="submit" @click="" class="md:btn btn-sm btn-primary w-full">Add Sizes</button>
            </div>

          </form>
        </div>

      </transition>
<!--      custom option-->
      <transition name="page">
        <div v-if="selectItem.some(e => e==='custom')">
          <div v-if="getCustom" class="card my-5">
            <p class="text-2xl">{{ getCustom.name }}</p>
            <ul  v-if="getCustom.options.length">
              <li v-for="(opt,index) in getCustom.options" class="text-base ml-2">
                <span class="font-bold mx-2">Option:</span>{{opt.name}}
                <span class="font-bold mx-2">Price:</span>{{opt.price}}
              </li>
            </ul>
          </div>
          <form v-else @submit.prevent="addCustomOption" >
            <p class="md:text-2xl text-base">Custom</p>
            <div class="my-3">
              <label for="customOption" class="md:text-base text-sm">Option name</label>
              <small class="tracking-wider block">Like: bundle, color, size are name of option. Please enter your custom option name</small>
              <input type="text" id="customOption" v-model.trim="$v.customName.$model">
              <small class="text-red-500 tracking-wider"
                     v-if="!$v.customName.required">Required. Please add your custom option name. </small>
              <small class="text-red-500 tracking-wider"
                     v-if="!$v.customName.nameValid ">(A-Z a-z 0-9 , _ ) this symbol are allow. </small>
            </div>
            <div class="mt-3 flex" v-for="(size,index) in custom" :key="index">
              <div class="w-full border-r pr-2">

                <div class="my-3">
                  <label for="customname" class="md:text-base text-sm">Title/Option/Items:</label>
                  <input type="text" id="customname" v-model.trim="$v.custom.$each[index].name.$model">
                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.custom.$each[index].name.required">Required. Please add your {{$v.customName.$model}} title/option/items. </small>
                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.custom.$each[index].name.nameValid ">(A-Z a-z 0-9 , _ ) this symbol are allow. </small>
                </div>
                <div class="my-3">
                  <label for="customPrice" class="md:text-base text-sm">{{ $v.customName.$model }} price</label>
                  <small>This price will add with main price</small>
                  <input type="number" id="customPrice" v-model.trim.number="$v.custom.$each[index].price.$model">

                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.custom.$each[index].price.positiveInteger ">Price should be more then 1. </small>
                  <small class="text-red-500 tracking-wider"
                         v-if="!$v.custom.$each[index].price.money ">
                    Price should be like 1000 or 1000.50. </small>
                </div>
              </div>
              <div class="flex flex-col justify-center bg-gray-100">
                <a-icon title="Add custom option" v-if="custom.length - 1 === index" @click="increaseCustom()" type="plus-circle" class="bg-white p-2 m-2 shadow rounded-full cursor-pointer" />
                <a-icon title="Remove this custom option" v-if="custom.length > 1" @click="decreaseCustom(index)" type="close" class="bg-white p-2 m-2 shadow rounded-full cursor-pointer" />
              </div>
            </div>
            <div class="my-3 text-center ">
              <button type="submit" @click="" class="md:btn btn-sm btn-primary w-full ">Add Custom option(s)</button>
            </div>

          </form>
        </div>

      </transition>
    </div>
    <nuxt-link class="btn btn-primary flex justify-center w-full mt-5 shadow" :to="`/seller/product/new/${$route.params.productname}/${$route.params.id}/option/image`">Upload Option image</nuxt-link>
  </div>
</template>

<script>
  import Checkbox from 'ant-design-vue'
  import Vuelidate from 'vuelidate'
  import { validationMixin } from 'vuelidate'
  import { alpha,required, numeric, minLength, maxLength } from 'vuelidate/lib/validators'
  const positiveInteger = (value) => value > 0 || value === ''
  const money = (value) => value === '' || /^\d+(\.\d{1,2})?$/.test(value)
  import server_error from '../../../../../../../components/server_error'
  export default {
    mixins: [validationMixin],
    components: {
      Checkbox,Vuelidate, server_error
    },
    asyncData({$axios,params}) {
      return $axios
        .get(`/api/seller/${params.id}/option/all`)
        .then(res => {
          return {allOptions : res.data.data}
        })
    },
    created() {
      if(this.allOptions){
        this.allOptions.forEach(e => {
          if (e.name === 'bundle'){
            this.getBundle = e
          }
          if (e.name === 'size'){
            this.getSize = e
          }
          if (e.name === 'color'){
            this.getColor = e
          }
          if (e.name === 'custom'){
            this.getCustom = e
          }
        })
      }

    },
    data() {
      return {
        selectItem: [],
        bundles: [],
        colors: [],
        sizes: [],
        custom: [],
        customName: '',
        getBundle: '',
        getSize: '',
        getColor: '',
        getCustom: '',
      }
    },
    validations: {
      customName: {
        required,
        nameValid(value){
          return /^[a-zA-Z0-9_, ]*$/.test(value)
        }
      },
      bundles: {
        $each: {
          price: {
            required,
            positiveInteger,
            money,
          },
          name: {
            required,
            nameValid(value){
              return /^[a-zA-Z0-9_, ]*$/.test(value)
            }
          }
        }
      },
      colors: {
        $each: {
          // check(value){
          //   return ((value.price === '' && value.name === '') || (value.price !== '' && value.name !== ''))
          // },
          price: {
            positiveInteger,
            money,
          },
          name: {
            required,
            nameValid(value){
              return /^[a-zA-Z0-9_, ]*$/.test(value)
            }
          }
        }
      },
      sizes: {
        $each: {
          // check(value){
          //   return ((value.price === '' && value.name === '') || (value.price !== '' && value.name !== ''))
          // },
          price: {
            positiveInteger,
            money,
          },
          name: {
            required,
            nameValid(value){
              return /^[a-zA-Z0-9_, ]*$/.test(value)
            }
          }
        }
      },
      custom: {
        $each: {
          price: {
            positiveInteger,
            money,
          },
          name: {
            required,
            nameValid(value){
              return /^[a-zA-Z0-9_, ]*$/.test(value)
            }
          },
        }
      }
    },
    methods: {
      addBundles(){
        this.$store.commit('SET_SERVER_ERRORS','')
        this.$v.bundles.$touch()
        if (!this.$v.bundles.$invalid){

          this.$axios.post(`/api/seller/${this.$route.params.id}/option/bundle`,{
            bundles: this.bundles
          }) .then(res => {
            this.getBundle = res.data.data
          }) .catch(err => {
            if (err.response.status === 422){
              this.$store.commit('SET_SERVER_ERRORS',err.response.data)
            }
          })
        }
      },
      addCustomOption(){
        this.$store.commit('SET_SERVER_ERRORS','')
        this.$v.bundles.$touch()
        if (!this.$v.bundles.$invalid){
          this.$axios.post(`/api/seller/${this.$route.params.id}/option/custom`,{
            custom: this.custom,
            option: this.customName
          }) .then(res => {
            this.getCustom = res.data.data
          }) .catch(err => {
            if (err.response.status === 422){
              this.$store.commit('SET_SERVER_ERRORS',err.response.data)
            }
          })
        }
      },
      addColor(){
        this.$store.commit('SET_SERVER_ERRORS','')
        this.$v.colors.$touch()
        if (!this.$v.colors.$invalid){

          this.$axios.post(`/api/seller/${this.$route.params.id}/option/color`,{
            colors: this.colors
          }) .then(res => {
            this.getColor = res.data.data
          }) .catch(err => {
            if (err.response.status === 422){
              this.$store.commit('SET_SERVER_ERRORS',err.response.data)
            }
          })
        }
      },
      addSizes(){
        this.$store.commit('SET_SERVER_ERRORS','')
        this.$v.sizes.$touch()
        if (!this.$v.sizes.$invalid){
          this.$axios.post(`/api/seller/${this.$route.params.id}/option/size`,{
            sizes: this.sizes
          }) .then(res => {
            this.getSize = res.data.data
          }) .catch(err => {
            if (err.response.status === 422){
              this.$store.commit('SET_SERVER_ERRORS',err.response.data)
            }
          })
        }
      },

      increaseBundle() {
        this.bundles.push({
          price: '',
          name: ''
        })
      },
      increaseCustom() {
        this.custom.push({
          price: '',
          name: '',
        })
      },
      increaseSize() {
        this.sizes.push({
          price: '',
          name: ''
        })
      },
      increaseColor() {
        this.colors.push({
          price: '',
          name: ''
        })
      },
      decreaseBundle(index){
        if (this.bundles.length > 1){
          this.$swal({
            title: 'Confirmation!',
            text: 'Do you want to remove this bundle',
            confirmButtonText: 'Delete'
          }) .then(res => {
            if (res.value){
              this.bundles.splice(index,1)
            }
          })
        } else {
          this.$message.error('Minimum one bundle option must be selected')
        }
      },
      decreaseSize(index){
        if (this.sizes.length > 1){
          this.$swal({
            title: 'Confirmation!',
            text: 'Do you want to remove this bundle',
            confirmButtonText: 'Delete'
          }) .then(res => {
            if (res.value){
              this.sizes.splice(index,1)
            }
          })
        } else {
          this.$message.error('Minimum one size option must be selected')
        }
      },
      decreaseCustom(index){
        if (this.custom.length > 1){
          this.$swal({
            title: 'Confirmation!',
            text: 'Do you want to remove this bundle',
            confirmButtonText: 'Delete'
          }) .then(res => {
            if (res.value){
              this.custom.splice(index,1)
            }
          })
        } else {
          this.$message.error('Minimum one size option must be selected')
        }
      },
      decreaseColor(index){
        if (this.colors.length > 1){
          this.$swal({
            title: 'Confirmation!',
            text: 'Do you want to remove this bundle',
            confirmButtonText: 'Delete'
          }) .then(res => {
            if (res.value){
              this.colors.splice(index,1)
            }
          })
        } else {
          this.$message.error('Minimum one color option must be selected')
        }
      },
      onChange(name){
        let available = false
        let indexBar = 0
        this.selectItem.forEach((e,index) => {
          if (e === name){
            available = true
            indexBar = index
          }
        })
        if (available){
          if (name === 'bundle'){
            this.bundles.splice(0,this.bundles.length)
          } else {
            if (name === 'color'){
              this.colors.splice(0,this.colors.length)
            } else {
              if (name === 'size'){
                this.sizes.splice(0,this.sizes.length)
              } else {
                if(name === 'custom'){
                  this.custom.splice(0,this.custom.length)
                }
              }
            }
          }
          this.selectItem.splice(indexBar,1)
        } else {
          if (name === 'bundle'){
            this.bundles.push({
              price: '',
              name: ''
            })
          } else {
            if (name === 'color'){
              this.colors.push({
                price: '',
                name: ''
              })
            } else {
              if (name === 'size'){
                this.sizes.push({
                  price: '',
                  name: ''
                })
              } else {
                if (name === 'custom'){
                  this.custom.push({
                    price: '',
                    name: ''
                  })
                }
              }
            }
          }
          this.selectItem.push(name)
        }
      }
    },
    filters: {
      firstCapital: function(value) {
        return value.charAt(0).toUpperCase()+value.slice(1)
      }
    }
  }
</script>
