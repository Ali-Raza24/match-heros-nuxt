import { get } from '~/api/api';

export const usePlayerStore = defineStore('players', {
  state: () => ({
    players: [],
    links: {},
    meta: {},
    currentPage: 1,
  }),

  actions: {
    async getPlayers() {
      try {
        const { data, error } = await get('/players', {
          page: this.currentPage,
        });

        if (error.value) {
          // Handle the error
        } else {
          this.players = data.value.data;
          this.links = data.value.links;
          this.meta = data.value.meta;
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
