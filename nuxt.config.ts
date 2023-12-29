// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr : false,
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/tailwindcss',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ]
  ],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
  imports: {
    dirs: ['stores'],
  },
  // elementPlus: { /** Options */ },
  css: ['public/assets/css/theme.css'],
  app: {
    head: {
      script: [
        { src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8M1_FlTzwkv2ZdRBcRUXal39wUSHzSq8&libraries=places" }
      ],
    },
  },
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_API_BASE: process.env.NUXT_API_BASE_URL,
      GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
 
    },
  },
  routeRules: {
    'api/**': {
        proxy: { to: "http://127.0.0.1:3000/api**", },
    }
  }

})
