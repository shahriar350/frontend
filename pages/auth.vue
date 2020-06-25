<template>
  <div class="mt-10  grid grid-rows-2 grid-flow-col">
    <div class="bg-gray-100 border-l border-t border-b border-blue-300 border-opacity-75 flex justify-center items-center align-middle flex-col  text-center py-3 row-span-2">
      <div class="py-2 btn btn-primary my-1 w-24">
        <nuxt-link to="register" style="color: white !important;">Register</nuxt-link>
      </div>
      <div class="py-2 btn btn-primary my-1 w-24">
        <nuxt-link to="login" style="color: white !important;">Login</nuxt-link>
      </div>
    </div>
    <div class="py-2 row-span-2 shadow-inner border">
      <div class="flex justify-center h-full items-center">
        <div class="w-full">
          <transition name="page">
            <nuxt-child></nuxt-child>
          </transition>
        </div>
      </div>
    </div>

  </div>

</template>
<script>

  export default {

  }
</script>

<style>

</style>
