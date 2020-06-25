<template>
  <div class="xl:px-16 md:px-8 px-3 py-2 ">
    <p>Please fill the form and submit</p>
    <form @submit.prevent="requestSeller" class="grid grid-col-4 grid-flow-row gap-4">
      <input type="text" v-model="form.company_name" placeholder="Enter your company name">
      <input type="text" v-model="form.company_author"  placeholder="Enter your company author name">
      <input type="text" v-model="form.contact"  placeholder="Enter your contact number">
      <input type="text" v-model="form.location"  placeholder="Enter your company location">
      <input type="checkbox" v-model="form.check"> <small @click="termsAndCondition">Please read your terms and condition</small>
      <button class="btn btn-primary-bold text-white" type="submit">Request us</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          company_name: 'bongo',
          company_author: 'saifullah',
          contact: '01752495467',
          location: 'dhaka',
          check: false,
        } ,
      }
    },
    methods: {
      termsAndCondition(){


      },
      requestSeller() {

      }
    }
  }
</script>
