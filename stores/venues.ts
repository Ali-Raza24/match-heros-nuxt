import { get, post,remove } from '~/api/api';
import axios from 'axios';

const defaultForm = {
  name: "",
  country_id: "",
  phone: "",
  town: "",
  email: "",
  off_on_peak: "",
  open_time: "",
  close_time: "",
  venue_message: "",
  photo: '',
  banner: ''
}
export const useVenueStore = defineStore('venues', {
  state: () => reactive({
    loading:false,
    venues: [],
    links: {},
    meta: {},
    currentPage: 1,
    countriesData:[],
    form: reactive({...defaultForm})
    
  }),

  actions: {
    async getVenues() {
      try {
        this.loading= true
        const { data, error } = await get('/venues', {
          page: this.currentPage,
        });

        if (error.value) {
          // Handle the error
        } else {
          this.venues = data.value.data;
          this.links = data.value.links;
          this.meta = data.value.meta;
          this.loading=false
        }
      } catch (error) {
        // Handle any unexpected errors
      }
    },
    async createVenues(venueData: any) {
      const config = useRuntimeConfig();
      try {
        await axios.post(config.public.NUXT_PUBLIC_API_BASE + '/venues', venueData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type for file uploads
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
          .then(res => {
            if (res.status == 201) {

              ElNotification({
                message: 'Venue added',
                type: 'success',
              })
              navigateTo('/venues')
            }
          })
          .catch(error => {
            ElNotification({
              message: 'Something went wrong',
              type: 'error',
            })

          });
      } catch (error) {
      }
    },
    async getSingleVenues(id:any) {
      try {
        const { data, error } = await get(`/venues/${id}`);

        if (error.value) {
          // Handle the error
        } else {
          this.form = data.value
        }
      } catch (error) {
        // Handle any unexpected errors
      }
    },
    async DeleteVenue(id:any) {
      try {
        const { data, error } = await remove(`/venues/${id}`);

        if (error.value) {
          // Handle the error
        } else {
          ElNotification({
            message: 'This is an error message',
            type: 'success',
          })      
        this.getVenues()
        }
      } catch (error) {
        // Handle any unexpected errors
      }
    },

    async getCountry(){

      const { data, error } = await post('/countries')
      if (error.value) {
        // Handle the error
      } else {
        this.countriesData = data.value
      }

    },
    setCurrentPage(page:any) {
      this.currentPage = page;
    },
    resetForm() {
      Object.keys(defaultForm).forEach(key => {
        console.log(key, defaultForm[key]);
        this.form[key] = defaultForm[key];
      })
    }
  },

  getters: {
    getCurrentPage: (state) => () => state.currentPage,
    getCountries: (state) => () => state.countriesData,
    getVenueData: (state) => () => state.form,
  },
});
