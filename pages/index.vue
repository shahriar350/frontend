<template>
  <div>
    <div class="grid grid-cols-6 gap-4 px-2 mt-2">
      <div class="bg-blue-300 col-span-3 col-start-2">1</div>
      <div  class="bg-blue-500">2</div>
      <div  class="bg-blue-600">3</div>
      <div  class="bg-blue-700">4</div>
      <div  class="bg-blue-700">5</div>
      <div  class="bg-blue-700">6</div>
      <div  class="bg-blue-700">7</div>
      <div  class="bg-blue-700">8</div>
      <div  class="bg-blue-700">9</div>
      <div  class="bg-blue-700">10</div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  mounted(){
    window.Echo.channel('laravel_database_demo')
      .listen('DemoEvent', (e) => {
        // this.message = e.message
        console.log(e)
      })
  },

}
</script>

<style>

</style>
