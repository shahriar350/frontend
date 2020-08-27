<template>
  <div class="xl:px-16 md:px-8 px-3 md:mt-3 mt-4">
    <div class="grid md:grid-cols-8 grid-cols-4 md:gap-4 gap-2">
      <div class="card flex flex-col">
        <p class="py-2 border-b">Total Product</p>
        <p class="py-1 font-bold">{{total_product}}</p>
      </div>
      <div class="card flex flex-col">
        <p class="py-2 border-b">Total Order</p>
        <p class="py-1 font-bold">{{total_order}}</p>
      </div>
      <div class="card flex flex-col">
        <p class="py-2 border-b">Complete Order</p>
        <p class="py-1 font-bold">{{complete_order}}</p>
      </div>
      <div class="card flex flex-col">
        <p class="py-2 border-b">New Order</p>
        <p class="py-1 font-bold">{{new_order}}</p>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    head(){
      return {
        title: 'Seller Dashboard'
      }
    },
    asyncData({$axios}){
      return $axios.get('/api/seller/dashboard/information')
        .then(res => {
          return {
            'total_product' : res.data.total_product,
            'complete_order' : res.data.complete,
            'new_order' : res.data.new_order,
            'total_order' : res.data.total_order,

          }
        })
    }

  }
</script>
