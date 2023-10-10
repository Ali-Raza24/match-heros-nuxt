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
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_API_BASE: process.env.NUXT_API_BASE_URL,
 
    },
  },
  routeRules: {
    'api/**': {
        proxy: { to: "http://127.0.0.1:3000/api**", },
    }
  }

})
