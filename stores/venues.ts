import { get,post } from '~/api/api';

export const useVenueStore = defineStore('venues', {
  state: () => ({
    venues: [],
    links: {},
    meta: {},
    currentPage: 1,
  }),

  actions: {
    async getVenues() {
      try {
        const { data, error } = await get('/venues', {
          page: this.currentPage,
        });

        if (error.value) {
          // Handle the error
        } else {
          this.venues = data.value.data;
          this.links = data.value.links;
          this.meta = data.value.meta;
        }
      } catch (error) {
        // Handle any unexpected errors
      }
    },
    async createVenues(venuaData:any) {
      try {
        const { data, error } = await post('/venues',venuaData);

        if (error.value) {
          // Handle the error
        } else {
         
        }
      } catch (error) {
        // Handle any unexpected errors
      }
    },

    setCurrentPage(page) {
      this.currentPage = page;
    },
  },

  getters: {
    getCurrentPage: (state) => () => state.currentPage,
  },
});
