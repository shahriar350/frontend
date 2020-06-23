<template>
  <div>

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
