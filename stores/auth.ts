import { get } from '~/api/api';

const config = useRuntimeConfig();

export const useAuthStore = defineStore('auth', {
    state: () => ({
      authToken: localStorage.getItem('authToken'),
      baseUrl: config.public.NUXT_PUBLIC_API_BASE,
      authUser:{
        name:'',
        image:''
      },
      loading:false
    }),
    
    actions: {
        // since we rely on `this`, we cannot use an arrow function
      signIn(payload: any) {
        this.loading=true
        const state= this;

        const { data } = useFetch('/auth/login', {
          method: 'post',
          baseURL: this.baseUrl,
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            type:'admin'
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          onResponse({ request, response, options }) {
            if(response.status  == 401)
            {
              state.loading=false 
               ElNotification({
                message: response._data.message,
                type: 'error',
              })
            }            
            else if(response._data.authorization.access_token) {
              localStorage.setItem('token', response._data.authorization.access_token)
              state.authUser.name = response._data.user.name
              state.authUser.image = response._data.user?.images?.avatar
              state.loading=false
              navigateTo('/dashboard')

            }
          },

        })

    
      },

      logout() {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
      
        useFetch('/auth/logout', {
          method: 'get',
          baseURL: this.baseUrl,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          onResponse({ request, response, options }) {
            if (response.status === 200) {
              localStorage.removeItem('token');
              navigateTo('/login');
            }
          },
          onResponseError({ request, response, options }) {
            ElNotification({
              message: 'Something Went Wrong',
              type: 'error',
            })    
          }
        });
      },

      async getProfile() {
        try {
  
            const { data, error } = await get('/profile');
            if (error.value) {
            } else {
              this.authUser.name = data.value.name
              this.authUser.image = data.value?.images?.avatar              
            }
        } catch (error) {
          // Handle any unexpected errors
        }
      },
    },
    getters: {
        getAuthToken: state => state.authToken,
    },
  })