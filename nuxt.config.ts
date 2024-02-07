// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: [
    {
      global: true,
      path: '~/components',
      pathPrefix: false
    }
  ],
  imports: {
    dirs: [
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**',
      // Scan top-level modules
      'components',
      // ... or scan all modules within given directory
      'components/**'
    ]
  },
  css: [
    '~/assets/styles/main.css'
    // 'locomotive-scroll/dist/locomotive-scroll.css'
  ],
  runtimeConfig: {
    public: {
      xmlApi: '',
    }
  }
})
