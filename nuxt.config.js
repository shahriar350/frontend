
export default {
  server: {
    port: 3000, // default: 3000
    host: 'localhost' // default: localhost
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    // }
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@700&family=Oxygen:wght@300;400;700&display=swap'
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/master.css',
    '@/assets/boxicons/css/boxicons.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/mixins/user',
    { src: '~/plugins/laravel-echo', ssr: false },
    // '~/plugins/i18n.js'
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['nuxt-i18n', {
      locales: [
        {
          name: 'বাংলা',
          code: 'bn',
          iso: 'bn-BD',
          file: 'bn.json'
        },
        {
          name: 'English',
          code: 'en',
          iso: 'en-US',
          file: 'en.json'
        },
      ],
      langDir: 'lang/',
      locale: 'en',
      lazy: true,
      fallbackLocale: 'en',
      plugins: ['@/plugins/i18n.js'],
    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    withCredentials: true
  },
  proxy: {
    '/api/': { target: 'http://localhost:8000/api', pathRewrite: { '^/api': '' } }
  },
  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/login',
            method: 'post',
            propertyName: false
          },
          user: {
            url: '/api/user',
            method: 'get',
            propertyName: 'data'
          }
        },
        tokenRequired: false,
        tokenType: false
      }
    },
    localStorage: false
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */

  build: {
    // vendor: ['vue-i18n']
  },
  router: {
    middleware: ['i18n']
  },

}
