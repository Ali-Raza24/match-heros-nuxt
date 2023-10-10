import { RefSymbol } from "@vue/reactivity";

const config = useRuntimeConfig();
console.log('config',config);

export const useAuthStore = defineStore('auth', {
    state: () => ({
      authToken: localStorage.getItem('authToken'),
      baseUrl: config.public.NUXT_PUBLIC_API_BASE
    }),
    
    actions: {
        // since we rely on `this`, we cannot use an arrow function
      signIn(payload: any) {
        console.log('form',payload);
        const { data } = useFetch('/auth/login', {
          method: 'post',
          baseURL: this.baseUrl,
          body: JSON.stringify({
            email: payload.email,
            password: payload.password
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          onResponse({ request, response, options }) {
            console.log('response', response._data.authorization.access_token);
            if (response._data.authorization.access_token) {
              localStorage.setItem('token', response._data.authorization.access_token)
              navigateTo('/dashboard')

            }
            // Process the response data
          },
        })

    
      },
    },
    getters: {
        getAuthToken: state => state.authToken,
    },
  })