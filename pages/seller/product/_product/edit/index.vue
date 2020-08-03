<template>
  <div class="xl:px-16 md:px-8 px-0">
    <div class="flex flex-wrap gap-2">
      <div class="">
        <label for="picture" class="flex flex-col items-center justify-center">
          <a-icon type="file-image" style="font-size: 110px"/>
          <br/><span class="font-bold">Upload image</span></label>
        <input multiple @change="uploadImage" type="file" id="picture" class="hidden">
      </div>
      <div class="flex md:gap-4 gap-2 lg:justify-start justify-center flex-wrap">
        <div v-if="product.images && product.images.length" v-for="(img,index) in product.images" :key="index">
          <div class="inline-block relative">
            <img :src="img.image" alt="" width="150px" class="shadow rounded">
            <a-icon @click="removeImage(product.id,img.id,index)" type="delete"
                    class="absolute top-0 right-0 bg-white p-2 rounded"/>
          </div>
        </div>
      </div>
    </div>
    <server_error></server_error>
    <div class="mt-5 card">
      <p class="text-2xl pb-2 border-b"><span class="ml-2">General Information</span></p>
      <div class="my-2">
        <label for="name" class="font-bold">Name</label>
        <input type="text" v-model.trim="$v.product.name.$model">
        <small class="text-red-500 tracking-wider" v-if="!$v.product.name.required">Please
          enter product name. </small>
        <small class="text-red-500 tracking-wider" v-if="$v.product.name.$model !== '' && !$v.product.name.nameValid">
          A-Z and 0-9 letter are valid.
        </small>
      </div>
      <div class="my-2">
        <label for="name" class="font-bold">Price</label>
        <input type="number" v-model.trim="$v.product.price.$model">
        <small class="text-red-500 tracking-wider" v-if="!$v.product.price.required">Please enter product
          original price. </small>
        <small class="text-red-500 tracking-wider" v-if="$v.product.price.$model !== '' && !$v.product.price.price">Product
          price should be 1000 or
          1000.20. </small>
        <small class="text-red-500 tracking-wider"
               v-if="($v.product.price.$model !== '' || $v.product.price.$model ) && !$v.product.price.positiveInteger">
          Price should be more then 1.
        </small>
      </div>
      <div class="flex md:flex-row flex-col my-3">
        <label for="tag" class="flex items-center md:w-2/12 w-full">Product tags</label>
        <div class="md:w-10/12 w-full">
          <div class="mb-2">
            <p class="inline-block mx-1 mt-2 shadow px-3 py-1 bg-gray-200 rounded"
               v-for="(tag,tagIndex) in product.tags"><span class="inline-block">{{tag.tag}}</span>
              <span @click.prevent="removeTag(tagIndex)" class="inline-flex cursor-pointer"> <a-icon
                type="close"/> </span>
            </p>
          </div>
          <input class="placeholder-black" @keydown.enter="addTag" type="text" @keydown.188='addTag' id="tag"
                 v-model="$v.tag.$model" placeholder="Product tag">
          <small class="text-red-500 tracking-wider"
                 v-if="$v.tag.$model !== '' && !$v.tag.tagValid ">a-z A-Z 0-9 are valid letter or number. </small>
          <small class="text-red-500 tracking-wider"
                 v-if="(!$v.product.tags.required || !$v.product.tags.minLength)">Minimum 5 product tags are
            required. </small>
          <small class="text-red-500 tracking-wider"
                 v-if="!$v.product.tags.maxLength ">Minimum 15 product tags can be added. </small>
        </div>
      </div>
      <div class="my-5">
        <vue-editor v-model="product.description"></vue-editor>
<!--        <wysiwyg v-model="product.description"/>-->
      </div>
      <p class="py-2 border-b text-base"><span class="mx-2">Offer</span></p>
      <div class="my-3">
        <a-checkbox @change="offerActive" :checked="product.offerStatus === 1">Active offer</a-checkbox>
      </div>
      <div class="mt-5">
        <label for="offerPrice">Offer price</label>
        <input type="number" :disabled="product.offerStatus === 0" id="offerPrice"
               v-model.trim.number="$v.product.offerPrice.$model">
        <small class="text-red-500 tracking-wider"
               v-if="!$v.product.offerPrice.price">Offer
          price should be like 1000 or 1000.50. </small>
        <small class="text-red-500 tracking-wider"
               v-if="!$v.product.offerPrice.required">Please Enter your price of offer </small>
        <small class="text-red-500 tracking-wider"
               v-if=" !$v.product.offerPrice.positiveInteger">Offer
          price should be positive over 0. </small>
      </div>
      <div class="my-5">
        <label for="offer_type">Offer type</label>
        <select :disabled="product.offerStatus === 0" v-model="$v.product.offerType.$model" id="offer_type"
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value="" :selected="product.offerType === null || product.offerType === ''">Select One (none)</option>
          <option :selected="product.offerType === 'fixed'" value="fixed">Fixed Price</option>
          <option :selected="product.offerType === 'percent'" value="percent">Percentage %</option>
        </select>
        <small class="text-red-500 tracking-wider"
               v-if="!$v.product.offerType.required">Add product offer type</small>
      </div>
      <div class="my-5">
        <label for="minimum_buy">Minimum product to buy</label>
        <select :disabled="product.offerStatus === 0" v-model="$v.product.offerMin.$model" id="minimum_buy"
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value="" selected>Select One (none)</option>
          <option :value="number" :selected="product.offerMin === number" v-for="number in 5">{{number}}</option>
        </select>
        <small class="text-red-500 tracking-wider"
               v-if="!$v.product.offerMin.required ">Minimum buy this product to apply offer. </small>

      </div>
      <div class="my-5 flex flex-col my-3">
        <label class="" for="offer_date">Offer date time</label>
        <div class="flex shadow rounded w-full">
          <date-range-picker
            :disabled="product.offerStatus === 0"
            ref="offertime" id="offer_date"
            class="w-100"
            v-model="product.offerDate"
            :minDate="min"
            :timePicker=true
            :timePicker24Hour=false
            :ranges="false"
            @update="updateValuesOffer"
          >
            <template v-slot:input="picker" style="min-width: 350px;">
              <p>Add your days</p>
              {{ product.offerDate.startDate }} - {{ product.offerDate.endDate }}
            </template>
          </date-range-picker>
          <p @click="resetOfferPrice" class="focus:bg-blue-200 cursor-pointer p-2 flex items-center">Reset</p>
        </div>
      </div>
      <button @click="updateGeneralInfo" type="submit" class="md:btn btn-sm btn-primary w-full">Update general
        information
      </button>
    </div>

    <!--    product shop info-->

    <div class="my-5 card">
      <p class="text-2xl pb-2 border-b"><span class="ml-2">Product Shop Information</span></p>
      <div class="grid md:gap-4 gap-2" :class="product.shops.length > 1 ? 'md:grid-cols-2 grid-cols-1' : 'grid-cols-1'">
        <div v-for="(shop,index) in product.shops" class="card rounded border-blue-200 border my-3 p-2">
          <p class="md:text-xl text-base">{{ shop.name }}</p>
          <div class="ml-5 my-5 flex items-center gap-2" v-for="(loc,locIndex) in shop.locations">
            <div class="w-full">
              <p class="font2 font-sm tracking-wider">{{loc.block}}, {{loc.area}}, {{loc.road}}, {{loc.post}},
                {{loc.police}}, {{ loc.city}}.
                <span v-if="loc.shopping">{{loc.shopping}}, {{loc.floor}}, {{loc.shop_no}}</span></p>
              <div class="mt-1">
                <label for="quantity">Quantity</label>
                <a-checkbox class="px-5" @change="changeStock(index,locIndex)"
                            :checked="$v.product.shops.$each[index].locations.$each[locIndex].stock.$model === 1">Stock
                </a-checkbox>
                <input type="number" v-model="$v.product.shops.$each[index].locations.$each[locIndex].quantity.$model">
                <small class="tracking-wider text-red-600"
                       v-if="!$v.product.shops.$each[index].locations.$each[locIndex].quantity.required">Product
                  quantity at this location and quantity should be in number</small>
                <small class="tracking-wider text-red-600"
                       v-if="!$v.product.shops.$each[index].locations.$each[locIndex].quantity.onlyinteger">
                  Quantity cannot be negetive(-10), float(1.21) and more then 0
                </small>
              </div>
            </div>
          </div>

          <div class="w-full my-3">
            <button @click="updateShopQuantity(shop.id,index)" class="w-full md:btn btn-sm btn-primary border">Update {{
              shop.name }}
            </button>
          </div>


          <div class="mt-0 ml-5 card w-auto border-blue-300 rounded border">
            <p @click="availableLocation(shop.id,index)"
               class="font2 font-bold cursor-pointer py-3 border-b flex items-center text-base">Available {{ shop.name
              }} location
              <a-icon :rotate="shop.temp? 0 : 90" type="arrow-down" class="mx-2"/>
            </p>
            <transition name="page">
              <div v-if="shop.temp && shop.temp.length">
                <div class="my-5" v-for="(loc,locIndex) in shop.temp">
                  <div class="font2 font-sm tracking-wider">
                    <a-checkbox :checked="loc.add === 1" @change="changeTempAdd(index,locIndex)">
                      <p class="font2 inline">
                        {{loc.block}}, {{loc.area}}, {{loc.road}}, {{loc.post}}, {{loc.police}}, {{ loc.city}}.
                        <span v-if="loc.shopping">{{loc.shopping}}, {{loc.floor}}, {{loc.shop_no}}</span>
                      </p>
                    </a-checkbox>
                  </div>
                  <div class="mt-1">
                    <label for="quantity">Quantity</label>
                    <a-checkbox :disabled="loc.add === 0" class="px-5" @change="changeTempStock(index,locIndex,loc.add)"
                                :checked="loc.add === 1 && $v.product.shops.$each[index].temp.$each[locIndex].stock.$model === 1">
                      Stock
                    </a-checkbox>
                    <input type="number" :disabled="loc.add === 0"
                           v-model.trim.number="$v.product.shops.$each[index].temp.$each[locIndex].quantity.$model">
                    <small class="tracking-wider text-red-600"
                           v-if="!$v.product.shops.$each[index].temp.$each[locIndex].quantity.required">
                      Quantity is required. Please add your product quantity
                    </small>
                    <small class="tracking-wider text-red-600"
                           v-if="!$v.product.shops.$each[index].temp.$each[locIndex].quantity.onlyinteger">
                      Quantity cannot be negative(-10), float(1.21).
                    </small>
                    <small class="tracking-wider text-red-600"
                           v-if="!$v.product.shops.$each[index].temp.$each[locIndex].quantity.positiveInteger">
                      Quantity must be more then 0
                    </small>
                  </div>
                </div>
                <button v-if="shop.temp.length > 0" @click="addShopLocation(shop.id,index)"
                        class="md:btn btn-sm btn-primary w-full">Add available locations
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div>
        <p @click="availableShop()"
           class="md:text-base text-sm cursor-pointer py-3 border-b border-t flex items-center text-base">Available Shop
          <a-icon :rotate="product.tempShop.length ? 0 : 90" type="arrow-down" class="mx-2"/>
        </p>
        <div v-if="product.tempShop.length < 1" class="md:text-base text-sm py-2">
          You do not have any shop available for this product
        </div>
        <div class="mt-5" v-else>
          <div v-for="(shop,index) in product.tempShop" class="my-3 p-2">
            <a-checkbox :checked="shop.add === 1" @change="changeTempShop(index)">
              <p class="inline md:text-xl text-base">{{ shop.name }}</p>
            </a-checkbox>
            <transition name="page">
              <div>
                <div v-if="shop.add" class="ml-5 my-5" v-for="(loc,locIndex) in shop.locations">
                  <a-checkbox :checked="loc.add === 1" class="flex" @change="changeTempLocStock(index,locIndex)">
                    <p class="inline font2 font-sm tracking-wider">{{loc.block}}, {{loc.area}}, {{loc.road}},
                      {{loc.post}},
                      {{loc.police}}, {{ loc.city}}.
                      <span v-if="loc.shopping">{{loc.shopping}}, {{loc.floor}}, {{loc.shop_no}}</span></p>
                  </a-checkbox>

                  <div class="mt-1">
                    <label for="quantity">Quantity</label>
                    <a-checkbox :disabled="loc.add === 0" class="px-5" @change="changeAvaShopLocStock(index,locIndex)"
                                :checked="loc.add === 1 && loc.stock === 1">Stock
                    </a-checkbox>
                    <div>
                      <input :disabled="loc.add === 0" type="number"
                             v-model.trim.number="$v.product.tempShop.$each[index].locations.$each[locIndex].quantity.$model">
                      <small class="tracking-wider text-red-600"
                             v-if="!$v.product.tempShop.$each[index].locations.$each[locIndex].quantity.required">Product
                        quantity at this location</small>
                      <small class="tracking-wider text-red-600"
                             v-if="!$v.product.tempShop.$each[index].locations.$each[locIndex].quantity.onlyinteger">
                        Quantity cannot be negative(-12) or float(1.23).
                      </small>
                      <small class="tracking-wider text-red-600"
                             v-if="!$v.product.tempShop.$each[index].locations.$each[locIndex].quantity.positiveInteger">
                        Quantity must be more then 0
                      </small>
                    </div>
                  </div>
                </div>
                <button @click="addShopToProduct" class="md:btn btn-sm w-full btn-primary">Add Shop to
                  {{product.name}}
                </button>
              </div>
            </transition>

          </div>
        </div>
      </div>
    </div>
<!--    product option -->
    <div class="my-5 card">
      <p class="text-2xl pb-2 border-b">Product Options</p>
      <div v-for="(option,index) in product.options" class="mt-2 card rounded border border-blue-200 pb-2">
        <p class="font-bold text-base py-2">{{ option.name }}</p>
        <div class="ml-5">
          <div v-for="(opt,optIndex) in option.options" class="mb-2 flex md:gap-4 gap-2">
            <div class="w-full">
              <p class="text-base py-2">{{opt.name}}</p>
              <div>
                <label :for="`optionPrice${index}${optIndex}`">Price: </label>
                <input type="number" :id="`optionPrice${index}${optIndex}`" v-model.trim.number="$v.product.options.$each[index].options.$each[optIndex].price.$model">
                <small class="text-red-500 tracking-wider" v-if=" !$v.product.options.$each[index].options.$each[optIndex].price.price">
                  Price should be 1000 or 1000.20. </small>
                <small class="text-red-500 tracking-wider"
                       v-if="!$v.product.options.$each[index].options.$each[optIndex].price.positiveInteger">
                  Price should be more then 1.
                </small>
              </div>
            </div>
            <div class="flex justify-center flex-col">
              <img :src="opt.image.image" alt="option image" width="120px" class="shadow rounded">
              <label class="flex justify-center text-xs font-bold px-2 py-1 bg-gray-100 shadow rounded " :for="`changeImg${index}${optIndex}`">Change</label>
              <input @change="optionImageUpdate(option.id,opt.id,index,optIndex)" class="hidden" type="file" :id="`changeImg${index}${optIndex}`">
            </div>
          </div>
        </div>
        <button class="btn btn-primary w-full" @click="updateOptionInfo(option.id,index)">Update {{ option.name }}</button>
      </div>
      <button class="md:btn btn-sm btn-primary w-full mt-3" @click="modal.options = 1">Add more options</button>
    </div>
    <a-modal @cancel="cancelOptionModal" title="Add more options" :visible="modal.options === 1">
      <template slot="footer">
        <button key="back" class="md:btn btn-sm btn-danger" @click="cancelOptionModal">Cancel</button>
        <button key="submit" class="md:btn btn-sm btn-primary">Add now</button>
      </template>
      <div>
        <div class="my-3">

        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
  import Vue from 'vue'

  import server_error from '../../../../../components/server_error'
  import Vuelidate from 'vuelidate'
  import { validationMixin } from 'vuelidate'
  import { requiredIf, required, minLength, maxLength } from 'vuelidate/lib/validators'

  const positiveInteger = (value) => value > 0 || value === ''
  const onlyinteger = (value) => value === '' || value === 0 || /^[1-9][\d]*$/.test(value)

  import DateRangePicker from 'vue2-daterange-picker'
  import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
  import wysiwyg from 'vue-wysiwyg'

  Vue.use(wysiwyg, {})
  import 'vue-wysiwyg/dist/vueWysiwyg.css'

  export default {
    mixins: [validationMixin],
    head() {
      return {
        title: `${this.product.name} Edit | Bongobitan`
      }
    },
    components: {
      server_error, Vuelidate, DateRangePicker
    },
    asyncData({ $axios, params }) {
      return $axios
        .get(`/api/seller/product/${params.product}`)
        .then(res => {
          return { product: res.data.data }
        })
    },
    data() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const minDate = new Date(today).toJSON()
      return {
        tag: '',
        min: minDate,
        modal: {
            options: 0
        },
        // product: '',
      }
    },
    validations: {
      tag: {
        tagValid(value) {
          return /^([a-zA-Z0-9 ]+)(\s[a-zA-Z0-9 ]+)*$/.test(value) || value === ''
        }
      },
      product: {
        options: {
          $each: {
            options: {
              $each: {
                name: {
                  required
                },
                price: {
                  positiveInteger,
                  price(value) {
                    return /^\d+(\.\d{1,2})?$/.test(value) || value === ''
                  }
                }
              }
            }
          }
        },
        tempShop: {
          add: {},
          $each: {
            locations: {
              $each: {
                add: {},
                quantity: {
                  required: requiredIf(function(val) {
                    return val.add === 1
                  }),
                  onlyinteger,
                  positiveInteger
                },
                stock: {}
              }
            }
          }
        },
        tags: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(15)
        },
        offerPrice: {
          required: requiredIf(function(val) {
            return val.offerStatus === 1
          }),
          positiveInteger,
          price(value) {
            return /^\d+(\.\d{1,2})?$/.test(value) || value === ''
          }
        },
        offerType: {
          required: requiredIf(function(val) {
            return val.offerStatus === 1
          })
        },
        offerMin: {
          required: requiredIf(function(val) {
            return val.offerStatus === 1
          })
        },
        offerStatus: {},
        name: {
          required,
          nameValid(value) {
            return /^([a-zA-Z0-9]+)(\s[a-zA-Z0-9]+)*$/.test(value)
          }
        },
        price: {
          required,
          positiveInteger,
          price(value) {
            return /^\d+(\.\d{1,2})?$/.test(value) || value === ''
          }
        },
        shops: {
          $each: {
            locations: {
              $each: {
                quantity: {
                  required,
                  onlyinteger
                },
                stock: {}
              }
            },
            temp: {
              $each: {
                quantity: {
                  required: requiredIf(function(val) {
                    return val.add === 1
                  }),
                  onlyinteger,
                  positiveInteger
                },
                stock: {},
                add: {}
              }
            }
          }
        },
        temp: {}
      }

    },
    created() {
      this.$emit('changeName', this.product.name, this.product.url)
      this.$set(this.product, 'tempShop', [])
      for (let i = 0; i < this.product.shops; i++) {
        this.$set(this.product.shops[i], 'temp', [])
      }
    },
    methods: {
      cancelOptionModal(){
        this.modal.options = 0
      },
      optionImageUpdate(optionId, childId,index,optIndex){

        // this.$axios.post(`/api/seller/${this.product.id}/${optionId}/${childId}/image`)
        this.$store.commit('SET_SERVER_ERRORS','')
        let formData = new FormData();
        formData.append('image',event.target.files[0])
        this.$axios.post(`/api/seller/${this.product.id}/${optionId}/${childId}/image`,formData)
          .then(res => {
            this.product.options[index].options.splice(optIndex,1,res.data.data)
          }) .catch(err => {
          if (err.response.status === 422) {
            this.$store.commit('SET_SERVER_ERRORS',err.response.data)
          }
        })
      },
      updateOptionInfo(OptionId,index){
        this.$v.product.options.$each[index].options.$touch()
        if (!this.$v.product.options.$each[index].options.$invalid){
          let items = []
          for (let i = 0; i <this.product.options[index].options.length ; i++) {
            items.push({
              'id' : this.product.options[index].options[i].id,
              'name' : this.product.options[index].options[i].name,
              'price' : this.product.options[index].options[i].price,
            })
          }

          this.$axios.post(`/api/seller/${this.product.id}/${OptionId}/option/update`,{
            options: items
          })
        }
      },
      addShopToProduct() {
        this.$v.product.tempShop.$touch()
        if (!this.$v.product.tempShop.$invalid) {
          let productItem = []
          let tempIndex = 0
          this.product.tempShop.forEach((e, index) => {
            if (e.add === 1) {
              productItem[tempIndex] = { id: e.id, index: index, locations: [] }
              e.locations.forEach(i => {
                if (i.add === 1) {
                  productItem[tempIndex].locations.push({
                    id: i.id,
                    quantity: i.quantity,
                    stock: i.stock
                  })
                }
              })
              tempIndex++
            }
          })
          if (productItem.length && productItem.some(e => e.locations.length)) {
            this.$axios.post(`/api/seller/${this.product.id}/update/shop/added`, {
              shops: productItem
            }).then(res => {
              this.$notification.success({
                message: 'Successfully added shop to your product'
              })
              this.product.shops = res.data.data
              productItem.forEach(e => {
                this.product.tempShop.splice(e.index, 1)
              })
            })
          } else {
            if (!productItem.some(e => e.location.length)) {
              this.$message.info('Please add location and quantity')
            } else {
              this.$message.info('Please add shop first, then add locations')
            }
          }
        }
      },
      updateShopQuantity(shopId, shopIndex) {
        console.log(this.product.shops[shopIndex].locations)
        let locations = []
        this.product.shops[shopIndex].locations.forEach(e => {
          locations.push({
            id: e.id,
            quantity: e.quantity,
            stock: e.stock
          })
        })
        this.$axios.post(`/api/seller/${this.product.id}/${shopId}/update/shop`, {
          locations: locations
        }).then(res => {
          this.$notification.success({
            message: 'Successfully updated your information'
          })
        })
      },
      addShopLocation(shopId, shopIndex) {
        this.$v.product.shops.$each[shopIndex].temp.$touch()
        if (!this.$v.product.shops.$each[shopIndex].temp.$invalid) {
          let locations = []
          this.product.shops[shopIndex].temp.forEach((e, index) => {
            if (e.add === 1) {
              locations.push({
                id: e.id,
                quantity: e.quantity,
                stock: e.stock,
                index: index
              })
            }
          })
          if (locations.length) {
            this.$axios.post(`/api/seller/${this.product.id}/${shopId}/location/update`, {
              avaLoc: locations
            }).then(res => {
              this.product.shops[shopIndex].locations.splice(0, this.product.shops[shopIndex].locations.length)
              this.product.shops[shopIndex].locations.push(...res.data.data)
              // this.product.shops[shopIndex].locations= res.data.data
              locations.forEach(e => {
                this.product.shops[shopIndex].temp.splice(e.index, 1)
              })
            })
          } else {
            this.$message.info('Please select a location')
          }
        }

      },
      availableShop() {
        if (!this.product.tempShop.length) {
          this.$axios.post(`/api/seller/product/${this.product.id}/available/shop`)
            .then(res => {
              this.$set(this.product, 'tempShop', res.data.data)
            })
        }

      },
      updateGeneralInfo() {
        this.$store.commit('SET_SERVER_ERRORS', '')
        this.$axios.post(`/api/seller/product/${this.product.id}/general/update`, {
          id: this.product.id,
          url: this.product.url,
          name: this.product.name,
          price: this.product.price,
          description: this.product.description,
          offerDate: this.product.offerDate,
          offerPrice: this.product.offerPrice,
          offerType: this.product.offerType,
          offerMin: this.product.offerMin,
          offerStatus: this.product.offerStatus,
          tags: this.product.tags
        }).then(res => {
          this.$notification.success({
            message: 'General information update successfully'
          })
        }).catch(err => {
          if (err.response.status === 422) {
            this.$store.commit('SET_SERVER_ERRORS', err.response.data)


          }
        })
      },
      offerActive() {
        if (this.product.offerStatus) {
          this.product.offerStatus = 0
          this.product.offerMin = ''
          this.product.offerType = ''
          this.product.offerPrice = ''
          this.product.offerDate.endDate = null
          this.product.offerDate.startDate = null
        } else {
          this.product.offerStatus = 1
        }
      },
      removeTag(index) {
        this.product.tags.splice(index, 1)
      },
      addTag() {
        let newString = this.tag.replace(/[\s\/]/g, '')
        if (this.tag === '') {
          return
        }
        if (this.product.tags.length < 15 &&
          !this.product.tags.some(e => e.tag.replace(/[\s\/]/g, '') === newString) && !this.product.tags.some(e => e.tag.toLowerCase() === this.tag.toLowerCase())) {
          this.product.tags.push({ tag: this.tag })
          this.tag = ''
        } else {
          if (this.product.tags.length >= 15) {
            this.$message.info('You can add maximum 15 tags')
          } else {
            this.$message.info('Already added this tag')
          }
        }
      },
      availableLocation(shopId, index) {
        if (!this.product.shops[index].temp) {
          this.$axios.get(`/api/seller/product/${this.product.id}/available/${shopId}`)
            .then(res => {
              this.$set(this.product.shops[index], 'temp', res.data.data)
            })
        }
      },
      changeTempLocStock(index, locIndex) {
        if (this.product.tempShop[index].locations[locIndex].add) {
          this.product.tempShop[index].locations[locIndex].add = 0
        } else {
          this.product.tempShop[index].locations[locIndex].add = 1
        }
      },
      changeAvaShopLocStock(index, locIndex) {
        if (this.product.tempShop[index].locations[locIndex].stock) {
          this.product.tempShop[index].locations[locIndex].stock = 0
        } else {
          this.product.tempShop[index].locations[locIndex].stock = 1
        }
      },
      changeStock(index, locIndex) {
        if (this.product.shops[index].locations[locIndex].stock) {
          this.product.shops[index].locations[locIndex].stock = 0
        } else {
          this.product.shops[index].locations[locIndex].stock = 1
        }
      },
      changeTempShop(index) {
        if (this.product.tempShop[index].add) {
          this.product.tempShop[index].add = 0
        } else {
          this.product.tempShop[index].add = 1
        }
      },
      changeTempStock(index, locIndex, add) {
        if (add) {
          if (this.product.shops[index].temp[locIndex].stock) {
            this.product.shops[index].temp[locIndex].stock = 0
          } else {
            this.product.shops[index].temp[locIndex].stock = 1
          }
        } else {
          this.$message.warning('Please check your location first')
        }

      },
      updateValuesOffer() {
        this.product.offerDate.startDate = this.$moment(this.$refs.offertime._data.start).format('YYYY-MM-DD HH:mm:ss')
        this.product.offerDate.endDate = this.$moment(this.$refs.offertime._data.end).format('YYYY-MM-DD HH:mm:ss')
      },
      changeTempAdd(index, locIndex) {
        if (this.product.shops[index].temp[locIndex].add) {
          this.product.shops[index].temp[locIndex].add = 0
        } else {
          this.product.shops[index].temp[locIndex].add = 1
        }
      },
      uploadImage(event) {
        this.$store.commit('SET_SERVER_ERRORS', '')
        let formdata = new FormData
        for (let i = 0; i < event.target.files.length; i++) {
          let img = event.target.files[i]
          formdata.append('images[]', img, img.name)
        }
        this.$axios.post(`/api/seller/product/image/upload/${this.product.id}`, formdata)
          .then(res => {
            this.product.images = res.data.data
          })
          .catch(err => {
            if (err.response.status === 422) {
              this.$store.commit('SET_SERVER_ERRORS', err.response.data)
            }
          })
      },
      resetOfferPrice() {
        this.product.offerDate.startDate = null
        this.product.offerDate.endDate = null
      },
      removeImage(product, image) {
        this.$swal({
          title: 'Confirmation!',
          text: 'Do you want to delete product image',
          icon: 'error',
          confirmButtonText: 'Delete'
        })
          .then((result) => {
            if (result.value) {
              this.$axios.post(`/api/seller/product/${product}/image/delete/${image}`)
                .then(res => {
                  this.$notification.success({
                    message: 'Successfully removed product image'
                  })
                  this.product.images.splice(index, 1)

                })
            }
          })
      }
    }
  }
</script>

<style lang="less">
  .editr--content ol li {
    list-style-type: upper-roman !important;
  }

  .editr--content ul li {
    list-style: circle inside !important;
  }

  .daterangepicker {
    top: 100% !important;
  }

  .vue-daterange-picker {
    display: flex !important;
    width: 100% !important;
  }

  .editr--toolbar {
    height: auto !important;
    flex-wrap: wrap !important;
  }

  .editr--toolbar a.vw-btn-separator i.vw-separator {
    border-left: none !important;
  }

  @media screen and (max-width: 940px) {

  }

  @media screen and (max-width: 768px) {
    .daterangepicker {
      left: 50% !important;
    }
  }

  @media screen and (max-width: 596px) {
    .daterangepicker {
      left: 55% !important;
    }
  }

  @media screen and (max-width: 540px) {
    .calendars-container {
      display: flex !important;
      flex-direction: column !important;
    }
  }
</style>
