<template>
  <div>
    Main web site page
  </div>
</template>

<script>

export default {
  components: {
  },
  computed:{

  },
  mounted(){
    try{
      window.Echo.channel('laravel_database_demo')
        .listen('DemoEvent', (e) => {
          // this.message = e.message
          console.log(e)
        })
    } catch (e) {
      console.log('something is error')
    }


  },

}
</script>

<style>

</style>
