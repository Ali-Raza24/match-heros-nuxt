const config = useRuntimeConfig();
const baseUrl = process.client ? config.public.NUXT_API_BASE_URL:"http://63.33.237.96/api";
console.log('config',config);

export const useAuthStore = defineStore('auth', {
    state: () => ({
      authToken: localStorage.getItem('authToken'),
    }),
    
    actions: {
        // since we rely on `this`, we cannot use an arrow function
        signIn(payload: object) {
        const { data } = useFetch(`${baseUrl}/auth/login`, {
        credentials: "include",
        method: "POST",
        watch: false,
        body: payload,
        onResponse({ request, response, options }) {
            console.log('response',response._data);
            
          // Process the response data
          localStorage.setItem('authToken',response._data.authorization.access_token);
        },
      });
      },
    },

    getters: {
        getAuthToken: state => state.authToken,
    },
  })