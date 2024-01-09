import { get, post, remove } from '~/api/api';
import axios from 'axios';

const defaultForm = {
  name: "",
  country_id: "",
  phone: "",
  town: "",
  address: "",
  email: "",
  off_peak: "",
  on_peak: "",
  open_time: "",
  close_time: "",
  venue_message: "",
  photo: '',
  banner: '',
  venue_location: '',
  latitude: null,
  longitude: null,
}
export const useVenueStore = defineStore('venues', {
  state: () => reactive({
    loading: false,
    venues: [],
    links: {},
    meta: {},
    currentPage: 1,
    countriesData: [],
    form: reactive({ ...defaultForm }),
    buttonText: '',
    searchQuery:'',
    totalVenues:0,
    perPage:0


  }),

  actions: {
    async getVenues(query = '') {
      try {
        this.loading = true
        const { data, error } = await get('/venues', {
          page: this.currentPage,
          query:this.searchQuery
        });

        if (error.value) {
          // Handle the error
        } else {
          this.setValues(data.value)
          this.loading = false
        }
      } catch (error) {
        // Handle any unexpected errors
      }
    },
    async createVenues(venueData: any) {
      this.loading = true
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
              this.loading = false

              ElNotification({
                message: 'Venue added',
                type: 'success',
              })
              navigateTo('/venues')
            }
          })
          .catch((error) => {
            this.loading = false
            ElNotification({
              message: error.message,
              type: 'error',
            })

          });
      } catch (error) {
      }
    },
    async getSingleVenues(id: any) {
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
    async updateVenue(venueData: any, id: any) {
      this.loading = true

      const config = useRuntimeConfig();
      try {
        venueData['_method'] = 'PATCH';
        await axios.post(config.public.NUXT_PUBLIC_API_BASE + `/venues/${id}`, venueData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type for file uploads
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
          .then(res => {
            if (res.status == 200) {
              this.loading = false

              ElNotification({
                message: 'Venue updated',
                type: 'success',
              })
              navigateTo('/venues')
            }
          })
          .catch(error => {
            this.loading = false
            ElNotification({
              message: 'Something went wrong',
              type: 'error',
            })

          });
      } catch (error) {
      }
    },
    async DeleteVenue(id: any) {
      try {
        const { data, error } = await remove(`/venues/${id}`);

        if (error.value) {
          // Handle the error
        } else {
          ElNotification({
            message: 'Successful',
            type: 'success',
          })
          this.getVenues()
        }
      } catch (error) {
        // Handle any unexpected errors
      }
    },

    async getCountry() {

      const { data, error } = await post('/countries')
      if (error.value) {
        // Handle the error
      } else {
        this.countriesData = data.value
      }

    },
    setCurrentPage(page: any) {
      this.currentPage = page;
    },
    resetForm() {
      Object.keys(defaultForm).forEach(key => {
        this.form[key] = defaultForm[key];
      })
    },
    setText(text: any) {
      this.buttonText = text
    },
    setValues(data: any) {
      this.venues = data.data;
      this.links = data.links;
      this.meta = data.meta;
      this.totalVenues=data.meta.total
      this.perPage=data.meta.per_page
    },
    setSearchQuery(query: any) {
      this.searchQuery = query
    },

  },

  getters: {
    getCurrentPage: (state) => () => state.currentPage,
    getCountries: (state) => () => state.countriesData,
    getVenueData: (state) => () => state.form,
  },
});
