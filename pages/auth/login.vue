<template>
  <div class="mx-2">
    <form @submit.prevent="loginNow" class="grid grid-cols-1 gap-4">
      <input v-model="form.email" type="email" class="placeholder-black focus:border-blue-700 focus:border-opacity-50" placeholder="Enter your Email" required>
      <input v-model="form.password" type="password" class="placeholder-black focus:border-blue-700 focus:border-opacity-50" placeholder="Enter your password" required>
      <button class="btn btn-primary-bold text-white">Login</button>
    </form>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        form: {
          email: 'user@user.com',
          password: '123456'
        }
      }
    },
    methods: {
      async loginNow() {
        try{
          await this.$axios.get('/api/csrf-cookie')
            .then(res => {
              this.$auth.loginWith('local',{
                data: this.form
              })
            }).catch(err => {
              console.log('something is error')
            })
        } catch (e) {
          console.log('something is error')
        }

      }
    }

  }
</script>
