<template>
  <div>
    <div>
      <form action="">
        <div class="flex flex-row">
          <label for="name" class="flex items-center md:w-2/12">Name</label>
          <input type="text" id="name" v-model="product.name" class="md:w-10/12">
        </div>
      </form>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        product: {
          name: ''
        },
      }
    }
  }
</script>
