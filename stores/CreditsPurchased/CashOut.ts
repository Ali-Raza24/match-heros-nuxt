import { get } from '~/api/api';

export const useCashOutStore = defineStore('CashOut', {
  state: () => ({
    CashOut: [],
    links: {},
    meta: {},
    currentPage: 1,
    TotalCashOut:0,
    perPage:0
  }),

  actions: {
    async getCashOut() {
      try {
        const { data, error } = await get('/cash-payout/transactions', {
          page: this.currentPage,
        });

        if (error.value) {
          // Handle the error
        } else {
          this.CashOut = data.value.data;
          this.TotalCashOut = data.value.pagination.total
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
