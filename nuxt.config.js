export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ImgMarkt - A Decentralized Application for trading images',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  router: {
    linkActiveClass: 'bg-gray-900 text-white',
    middleware: ['connected'],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    'nuxt-typed-vuex',
  ],

  toast: {
    position: 'bottom-right',
    duration: 6000,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/toast', 'portal-vue/nuxt'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    /** Secrets **/
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    ALCHEMY_KEY: process.env.ALCHEMY_KEY,
  },
}
