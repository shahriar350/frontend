<template>
  <div class="mx-2">
    <form @submit.prevent="registerNow" class="grid grid-cols-1 gap-4">
      <input v-model="form.name" type="text" class="placeholder-black focus:border-blue-700 focus:border-opacity-50" placeholder="Enter your name" required>
      <input v-model="form.email" type="email" class="placeholder-black focus:border-blue-700 focus:border-opacity-50" placeholder="Enter your Email" required>
      <input v-model="form.password" type="password" class="placeholder-black focus:border-blue-700 focus:border-opacity-50" placeholder="Enter your password" required>
      <button class="btn btn-primary-bold text-white" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name : 'shahriar',
          email : 'user@user.com',
          password : '123456',
        }
      }
    },
    methods: {
      async registerNow() {
        await this.$axios.get('/api/csrf-cookie')
        .then(res => {
          this.$axios.post('/api/register',this.form)
        })
      }
    }
  }
</script>
