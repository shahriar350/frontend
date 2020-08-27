<template>

  <perfect-scrollbar ref="scroll">
    <div class="bg-gray-100 scroll-me" >

      <top_section></top_section>
      <nuxt/>
    </div>
  </perfect-scrollbar>

</template>
<script>
  import top_section from '../components/top_section'
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

  export default {
    watch: {
      $route() {
        this.$refs.scroll.$el.scrollTop = 0;
      }
    },
    components: { top_section,PerfectScrollbar }
  }
</script>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>
<style>
  .ps {
    height: 100vh;
  }
</style>
