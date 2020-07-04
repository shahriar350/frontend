<template>

    <div class="bg-gray-100" style="height: 100vh;overflow-y: scroll">
      <top_section></top_section>
      <nuxt/>
    </div>
</template>
<script>
  import top_section from '../components/top_section'

  export default {

    components: { top_section }
  }
</script>
<style>

</style>
