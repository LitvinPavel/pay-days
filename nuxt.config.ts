import { pwa } from './config/pwa'

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Application for monitoring your salary' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },
  pwa,
  modules: [
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss'
  ],
  components: [
    {
      global: true,
      path: '~/components',
      pathPrefix: false
    }
  ],
  imports: {
    autoImport: true,
  },
  css: [ "~/assets/scss/styles.scss" ],
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  appConfig: {
    // you don't need to include this: only for testing purposes
    buildDate: new Date().toISOString(),
  },
  runtimeConfig: {
    public: {
      xmlApi: '',
    }
  }
})
