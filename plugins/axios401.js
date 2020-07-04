export default function ({ $axios, redirect }) {
  $axios.onError(error => {
    if(error.response.status === 401) {
      redirect('/auth/login')
    }
  });
}
// Adds header: `Content-Type: application/x-www-form-urlencoded` to only post requests
this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
  'post'
])
