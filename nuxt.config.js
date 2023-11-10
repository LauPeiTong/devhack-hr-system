export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Sales',
    title: 'Sales',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'stylesheet', type: 'image/x-icon', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'icon', type: 'image/x-icon', href: '/seedify.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/client.js', ssr: false },
    { src: '~/plugins/apex-chart.js', mode: 'client' },
    '~/plugins/vuetify.js',
    '~/plugins/currency.js',
    '~/plugins/list.js',
    '~/plugins/avatar.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Set your API key here
    baseURL: '/',
    headers: {
      common: {
        'Content-Type': 'application/json',
        Authorization: ''
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: '~/plugins/vuetify.js',
    treeShake: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config) {
      config.module.rules.push({
        test: /\.(pdf|docx|pptx)$/, // match the file extensions you want to load
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]' // specify the output filename and path
        }
      })
    }
  }
}
