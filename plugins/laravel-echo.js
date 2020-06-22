import Echo from 'laravel-echo'
// import Cookie from 'js-cookie'

// let token = Cookie.get('token')

window.io = require('socket.io-client')
window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: 'http://127.0.0.1:6001',
  // auth: {
  //   headers: {
  //     Authorization: 'Bearer ' + token
  //   }
  // }
})
