
<template>
  <div class="mx-2">
    <server_error></server_error>
    <form @submit.prevent="registerNow" class="grid grid-cols-1 gap-4">
      <input v-model="form.name" type="text" class="placeholder-black focus:border-blue-700 focus:border-opacity-50" placeholder="Enter your name" required>
      <input v-model="form.email" type="email" class="placeholder-black focus:border-blue-700 focus:border-opacity-50" placeholder="Enter your email" required>
      <input v-model="form.password" type="password" class="placeholder-black focus:border-blue-700 focus:border-opacity-50" placeholder="Enter your password" required>
      <button class="btn btn-primary text-white" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
  import server_error from '../../components/server_error'
  export default {
    components: {server_error},
    data() {
      return {
        form: {
          name : '',
          email : '',
          password : '',
        }
      }
    },
    methods: {
      async registerNow() {

        await this.$axios.post('/api/register',this.form)
          .then(res => {
            this.$store.commit('SET_SERVER_ERRORS','')
            this.$notification.info({
              message: 'A verification code has sent to your email. Please check it out and active your email',
              duration: 5
            })
          }) .catch(err => {
            this.$store.commit('SET_SERVER_ERRORS',err.response.data)
          })
      }
    }
  }
</script>
