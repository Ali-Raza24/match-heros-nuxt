import { post } from '~/api/api';

export const useGameFreeStore = defineStore('GameFree', {
  state: () => ({
    GameFree: [],
    links: {},
    meta: {},
    currentPage: 1,
    TotalGameFree:0
  }),

  actions: {
    async getGameFree() {
      try {
        const { data, error } = await post('/all-game-fee-transfer', {
          page: this.currentPage,
        });

        if (error.value) {
          // Handle the error
        } else {
          console.log("res",data.value)
          this.GameFree = data.value.data;
          this.TotalGameFree = data.value.pagination.total
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
