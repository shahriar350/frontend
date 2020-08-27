<template>
  <div class="">
    <server_error></server_error>
    <div>
      <div class="my-5 h-64 flex bg-gray-100 shadow rounded">
        <p class="flex items-center md:w-2/12 p-2">Categories</p>
        <div class="md:w-10/12">
          <small class="text-red-500 bg-red-100 tracking-wider w-screen"
                 v-if="!$v.select_categories.required && $v.select_categories.$invalid">You must select minimum one
            category</small>
          <treeselect v-if="categories.length" v-model="select_categories" valueConsistsOf="ALL_WITH_INDETERMINATE"
                      :multiple="true"
                      :options="categories"
                      placeholder="Select your categories"/>
        </div>
      </div>
      <div class="my-5 flex bg-gray-100 shadow rounded">
        <p class="flex items-center md:w-2/12 p-2">Shops</p>
        <div class="md:w-10/12">
          <small class="tracking-wider text-red-500 bg-red-100 w-screen" v-if="!$v.select_shops.required">You must
            select minimum one
            shop. </small>
          <div class="md:w-10/12">
            <div v-for="(shop,index) in shops" class="">
              <p>
                <a-checkbox :checked="select_shops.some(e => e.id === shop.id)"
                            @input="toggleShop(shop)"></a-checkbox>
                {{ shop.name }}
              </p>

              <div v-for="(loc,locIndex) in shop.locations" class="mb-2 bg-gray-200 p-2 rounded flex">
                <div class="mr-3 flex items-center">
                  <a-checkbox
                    :checked="select_shops.some(e => e.id === shop.id ? e.locations.some(d => d.id === loc.id) : false)"
                    @input="toggleShopLoc(shop.id,loc)">
                  </a-checkbox>
                </div>
                <div>
                  <div>
                    <p class="inline-block">{{ loc.area }},</p>
                    <p class="inline-block">{{ loc.block }},</p>
                    <p class="inline-block">{{ loc.road }}</p>
                    <p class="inline-block">{{ loc.police_station }},</p>
                    <p class="inline-block">{{ loc.post_office }},</p>
                    <p class="inline-block">{{ loc.city }}</p>
                  </div>
                  <div v-if="loc.shopping_complex && loc.floor && loc.shop_no" class="flex">
                    <p>{{ loc.shopping_complex }}, </p>
                    <p>{{ loc.floor }}, </p>
                    <p>{{ loc.shop_no }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form action="">
        <div class="flex md:flex-row flex-col my-3">
          <label for="name" class="flex items-center md:w-2/12">Product Name</label>
          <div class="md:w-10/12">
            <input required type="text" id="name" v-model.trim="$v.product.name.$model">
            <small class="text-red-500 tracking-wider" v-if="!$v.product.name.required">Please
              enter product name. </small>
            <small class="text-red-500 tracking-wider"
                   v-if="$v.product.name.$model !== '' && !$v.product.name.nameValid">
              A-Z and 0-9 letter are valid.
            </small>
          </div>
        </div>
        <div class="flex md:flex-row flex-col my-3">
          <label for="price" class="flex items-center md:w-2/12">Original Price</label>
          <div class="md:w-10/12">
            <input required type="number" id="price" v-model.trim.number="$v.product.price.$model">
            <div v-if="">
              <small class="text-red-500 tracking-wider" v-if="!$v.product.price.required">Please enter product
                original price. </small>
              <small class="text-red-500 tracking-wider"
                     v-if="$v.product.price.$model !== '' && !$v.product.price.price">Product price should be 1000 or
                1000.20. </small>
              <small class="text-red-500 tracking-wider"
                     v-if="($v.product.price.$model !== '' || $v.product.price.$model ) && !$v.product.price.positiveInteger">
                Price should be more then 1.
              </small>
            </div>
          </div>
        </div>
        <div class="flex md:flex-row flex-col my-3">
          <label for="tag" class="flex items-center md:w-2/12 w-full">Product quantity</label>
          <div class="md:w-10/12 w-full">
            <div v-if="select_shops.length" class="mb-2 card" v-for="(shop,index) in select_shops" :key="index">
              <label class="font-bold" for="`quantity${index}`">{{ shop.name }}</label>
              <div class="ml-5">
                <div class="my-5" v-for="(loc,locindex) in shop.locations" :key="locindex">
                  <div>

                    <a-checkbox :checked="$v.select_shops.$each[index].locations.$each[locindex].stock.$model"
                                @change="stockCheck(index,locindex)">In Stock
                    </a-checkbox>
                    <input id="`quantity${index}`" type="number" v-model.number="loc.quantity">
                    <small class="tracking-wider text-red-600"
                           v-if="!$v.select_shops.$each[index].locations.$each[locindex].quantity.required">Product
                      quantity at this location and quantity should be in number</small>
                    <small class="tracking-wider text-red-600"
                           v-if="!$v.select_shops.$each[index].locations.$each[locindex].quantity.onlyinteger">
                      Quantity cannot be negative(-12) or float(1.23).
                    </small>
                  </div>
                  <div class="">
                    {{loc.block}}, {{ loc.road}}{{loc.area}}{{loc.police_station}}{{loc.city}}
                    <span v-if="loc.shopping_complex">
                    {{loc.shopping_complex}},{{loc.floor}},{{loc.shop_no}}
                  </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-red-200">Please select shop first</div>
          </div>
        </div>
        <div class="flex md:flex-row flex-col my-3">
          <label for="tag" class="flex items-center md:w-2/12 w-full">Product tags</label>
          <div class="md:w-10/12 w-full">
            <div class="mb-2">
              <p class="inline-block mx-1 mt-2 shadow px-3 py-1 bg-gray-200 rounded"
                 v-for="(tag,tagIndex) in product.tags"><span class="inline-block">{{tag}}</span>
                <span @click.prevent="removeTag(tagIndex)" class="inline-flex cursor-pointer"> <a-icon
                  type="close"/> </span>
              </p>
            </div>
            <input class="placeholder-black" @keydown.enter="addTag" type="text" @keydown.188='addTag' id="tag"
                   v-model="tag" placeholder="Product tag">
            <small class="text-red-500 tracking-wider"
                   v-if="$v.tag.$model !== '' && !$v.tag.tagValid ">a-z A-Z 0-9 are valid letter or number. </small>
            <small class="text-red-500 tracking-wider"
                   v-if="(!$v.product.tags.required || !$v.product.tags.minLength)">Minimum 5 product tags are
              required. </small>
            <small class="text-red-500 tracking-wider"
                   v-if="!$v.product.tags.maxLength ">Minimum 15 product tags can be added. </small>
          </div>
        </div>
      </form>
      <vue-editor v-model="product.description"></vue-editor>

<!--      <wysiwyg v-model="product.description"/>-->
      <div class="mt-5 bg-gray-100 p-2 shadow rounded">
        <p class=" py-2 border-b "><span class="font-bold font-base">Add offer now </span> <small>(optional)</small></p>
        <div class="my-5">
          <a-checkbox @change="offerActive" :checked="product.offer.active === 1">Active offer</a-checkbox>
        </div>
        <div class="my-5">
          <label for="offer_price">Price</label>
          <input id="offer_price" type="number" v-model.trim.number="$v.product.offer.price.$model">
          <small class="text-red-500 tracking-wider"
                 v-if="!$v.product.offer.price.price">Offer
            price should be like 1000 or 1000.50. </small>
          <small class="text-red-500 tracking-wider"
                 v-if="!$v.product.offer.price.required">Please Enter your price of offer </small>
          <small class="text-red-500 tracking-wider"
                 v-if=" !$v.product.offer.price.positiveInteger">Offer
            price should be positive over 0. </small>

        </div>
        <div class="my-5">
          <label for="offer_type">Offer type</label>
          <select v-model="$v.product.offer.typeOffer.$model" id="offer_type"
                  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option value="" selected>Select One (none)</option>
            <option value="percent">Percentage %</option>
          </select>
          <small class="text-red-500 tracking-wider"
                 v-if="!$v.product.offer.typeOffer.required">Add product offer type</small>
        </div>
        <div class="my-5">
          <label for="minimum_buy">Minimum product to buy</label>
          <select v-model="$v.product.offer.minimum.$model" id="minimum_buy"
                  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option value="" selected>Select One (none)</option>
            <option :value="number" v-for="number in 5">{{number}} </option>
          </select>
          <small class="text-red-500 tracking-wider"
                 v-if="!$v.product.offer.minimum.required ">Minimum buy this product to apply offer. </small>

        </div>
        <div class="my-5 flex flex-col my-3">
          <label class="" for="offer_date">Offer date time</label>
          <div class="flex shadow rounded w-full">
            <date-range-picker
              ref="offertime" id="offer_date"
              class="w-100"
              v-model="product.offer.offerTime"
              :minDate="min"
              :timePicker=true
              :timePicker24Hour=false
              :ranges="false"
              @update="updateValuesOffer"
            >
              <template v-slot:input="picker" style="min-width: 350px;">
                <p>Add your days</p>
                {{ product.offer.offerTime.startDate }} - {{ product.offer.offerTime.endDate }}
              </template>
            </date-range-picker>
            <p @click="resetOfferPrice" class="focus:bg-blue-200 cursor-pointer p-2 flex items-center">Reset</p>
          </div>
        </div>

      </div>
      <div class="mt-5 w-full bg-gray-100 shadow mb-5 flex justify-center py-2">
        <button @click.prevent="uploadBasicInfo" class="flex items-center md:text-base text-sm">Add image now
          <a-icon type="arrow-right"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Collapse } from 'ant-design-vue'

  Vue.use(Collapse)
  import Vuelidate from 'vuelidate'
  import { validationMixin } from 'vuelidate'
  import {  required, minLength, maxLength, requiredIf } from 'vuelidate/lib/validators'

  const onlyinteger = (value) => value === '' || /^[1-9][\d]*$/.test(value)
  const positiveInteger = (value) => value > 0 || value === ''
  // import child_category from '../../../../components/child_category'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import server_error from '../../../../components/server_error'

  import DateRangePicker from 'vue2-daterange-picker'
  import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

  export default {
    head() {
      return {
        title: 'New Product | Bongobitan'
      }
    },
    mixins: [validationMixin],
    components: { DateRangePicker, Vuelidate, Treeselect, server_error },
    data() {

      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const minDate = new Date(today).toJSON()
      return {
        min: minDate,
        categories: '',
        select_categories: [],
        shops: '',
        tag: '',
        select_shops: [],
        product: {
          name: '',
          price: 0,
          tags: [],
          description: null,
          offer: {
            active: 0,
            price: '',
            minimum: '',
            typeOffer: '',
            offerTime: {
              endDate: null,
              startDate: null
            }
          }
        }
      }
    },
    validations: {
      tag: {
        tagValid(value) {
          return /^([a-zA-Z0-9 ]+)(\s[a-zA-Z0-9 ]+)*$/.test(value) || value === ''
        }
      },
      select_categories: {
        required
      },
      select_shops: {
        required,
        $each: {
          locations: {
            $each: {
              stock: {
                required
              },
              quantity: {
                required,
                onlyinteger
              }
            }
          }
        }
      },
      product: {
        offer: {
          minimum: {
            required: requiredIf(function(val) {
              return val.active === 1
            }),
          },
          typeOffer: {
            required: requiredIf(function(val) {
              return val.active === 1
            }),
          },
          active: {},
          price: {
            required: requiredIf(function(val) {
              return val.active === 1
            }),
            positiveInteger,
            price(value) {
              return /^\d+(\.\d{1,2})?$/.test(value) || value === ''
            }
          }
        },
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
            return /^\d+(\.\d{1,2})?$/.test(value)
          }
        },
        tags: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(15)
        }
      }
    },
    mounted() {
    },
    beforeMount() {
      this.$axios.get('/api/seller/product/init')
        .then(res => {
          this.categories = res.data.categories
          this.shops = res.data.shops
        })
    },
    methods: {
      stockCheck(index, locindex) {
        if (this.select_shops[index].locations[locindex].stock) {
          this.select_shops[index].locations[locindex].stock = 0
        } else {
          this.select_shops[index].locations[locindex].stock = 1
        }
      },
      resetOfferPrice() {
        this.product.offer.offerTime.startDate = null
        this.product.offer.offerTime.endDate = null
      },
      updateValuesOffer() {
        this.product.offer.offerTime.startDate = this.$moment(this.$refs.offertime._data.start).format('YYYY-MM-DD HH:mm:ss')
        this.product.offer.offerTime.endDate = this.$moment(this.$refs.offertime._data.end).format('YYYY-MM-DD HH:mm:ss')
      },
      uploadBasicInfo() {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.$store.commit('SET_SERVER_ERRORS', '')
          this.$axios.post('/api/seller/product/basic/upload', {
            product: this.product,
            categories: this.select_categories,
            shops: this.select_shops
          }).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.$router.push(`/seller/product/new/${this.product.name}/${res.data.data}`)
            }
          }).catch(err => {
            if (err.response.status === 422) {
              this.$store.commit('SET_SERVER_ERRORS', err.response.data)
            }
          })
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
        if (this.product.tags.length < 15 && !this.product.tags.some(e => e.replace(/[\s\/]/g, '') === newString) && !this.product.tags.some(e => e.toLowerCase() === this.tag.toLowerCase())) {
          this.product.tags.push(this.tag)
          this.tag = ''
        } else {
          if (this.product.tags.length >= 15) {
            this.$message.info('You can add maximum 15 tags')
          } else {
            this.$message.info('Already added this tag')
          }
        }
      },
      toggleShop(shop) {
        let available = false
        let shop_index = 0
        this.select_shops.forEach((e, index) => {
          if (e.id === shop.id) {
            available = true
            shop_index = index
          }
        })
        if (available) {
          this.select_shops.splice(shop_index, 1)
        } else {
          let tempArr = []
          shop.locations.forEach(e => {
            tempArr.push({
              id: e.id,
              block: e.block,
              road: e.road,
              area: e.area,
              city: e.city,
              police_station: e.police_station,
              post_office: e.post_office,
              shopping_complex: e.shopping_complex,
              floor: e.floor,
              shop_no: e.shop_no,
              banners: e.banners,
              quantity: 0,
              stock: 0
            })
          })
          this.select_shops.push({
            id: shop.id,
            name: shop.name,
            locations: tempArr
          })
        }
      },

      toggleShopLoc(shopId, location) {
        let available = false
        let indexParent = 0
        let availableChild = false
        let indexChild = 0
        this.select_shops.forEach((e, index) => {
          if (e.id === shopId) {
            e.locations.forEach((j, childIn) => {
              if (j.id === location.id) {
                availableChild = true
                indexChild = childIn
              }
            })
            available = true
            indexParent = index
          }
        })
        if (available) {
          if (availableChild) {
            if (this.select_shops[indexParent].locations.length > 1) {
              this.select_shops[indexParent].locations.splice(indexChild, 1)
            } else {
              this.$message.warning('Minimum one location must be selected')
            }
          } else {
            let e = location
            this.select_shops[indexParent].locations.push({
              id: e.id,
              block: e.block,
              road: e.road,
              area: e.area,
              city: e.city,
              police_station: e.police_station,
              post_office: e.post_office,
              shopping_complex: e.shopping_complex,
              floor: e.floor,
              shop_no: e.shop_no,
              banners: e.banners,
              quantity: 0,
              stock: 0
            })
          }
        } else {
          this.$message.warning('Please add shop first')
        }

      },
      offerActive() {
        if (this.product.offer.active) {
          this.product.offer.active = 0
          this.product.offer.minimum = ''
          this.product.offer.typeOffer = ''
          this.product.offer.price = ''
          this.product.offer.offerTime.endDate = null
          this.product.offer.offerTime.startDate = null
        } else {
          this.product.offer.active = 1
        }
      },
      select_cat_now(id, parent) {
        let index = 0
        let item = false

        this.select_categories.forEach((e, indexBox) => {
          if (e === id) {
            index = indexBox
            item = true
          }
        })
        if (item) {
          if (parent === null) {
            this.select_categories.forEach((e, index) => {
              if (e === id) {
                this.select_categories.splice(index, 1)
              }
            })
          } else {
            for (let i = 0; i < this.select_categories[parent].children.length; i++) {
              let data = this.select_categories[parent].children
              if (data[i] === id) {
                if (data[i].children.length) {

                }
              }
            }
          }
          // for (let i = 0; i < this.categories.length; i++) {
          //
          //   let items = this.categories[i].children
          //   for (let j = 0; j <items.length ; j++) {
          //
          //   }
          // }
          //
        } else {
          this.select_categories.push(id)
        }
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
