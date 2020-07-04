
<template>
  <div class="mx-2">
    <server_error></server_error>
    <form @submit.prevent="loginNow" class="grid grid-cols-1 gap-4">
      <input v-model="form.email" type="email" class="placeholder-black focus:border-blue-700 focus:border-opacity-50"
             placeholder="Enter your email" required>
      <input v-model="form.password" type="password"
             class="placeholder-black focus:border-blue-700 focus:border-opacity-50" placeholder="Enter your password"
             required>
      <button class="btn btn-primary text-white">Login</button>
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
          email: '',
          password: '',
          msg: []
        },
        email_reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      }
    },
    computed: {
      validateEmail() {
        return this.email_reg.test(this.form.email)
      }
    },
    created() {
      this.$axios.get('/api/csrf-cookie')
    },
    methods: {
      async loginNow() {
        if (this.validateEmail) {
          this.$store.commit('SET_SERVER_ERRORS','')
            await this.$auth.loginWith('local', {
              data: this.form
            })
              .then(res => {

              })
            .catch(err => {
              if (err.response.status === 422){
                this.$store.commit('SET_SERVER_ERRORS',err.response.data)
              }
            })
        }
      }
    }

  }
</script>
