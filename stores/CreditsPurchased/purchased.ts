import { post } from '~/api/api';

export const usePurchasedStore = defineStore('purchased', {
  state: () => ({
    Purchased: [],
    links: {},
    meta: {},
    currentPage: 1,
    TotalPurchases:0,
    perPage:0

  }),

  actions: {
    async getPurchased() {
      try {
        const { data, error } = await post('/all-purchases', {
          page: this.currentPage,
        });

        if (error.value) {
          // Handle the error
        } else {
          this.Purchased = data.value.data;
          this.TotalPurchases = data.value.pagination.total
          this.perPage = data.value.pagination.perPage

          // this.links = data.value.links;
          // this.meta = data.value.meta;
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
    getCurrentPage: (state) => () => state.currentPage, // Make the getter return a function
  },
});
