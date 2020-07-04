<template>

</template>

<script>
  export default {
    async asyncData({ params ,$axios, redirect  }) {
      const ip = await $axios.$post(`/api/user/verification/${params.id}`)
      return redirect(`/`)
    }
  }
</script>
