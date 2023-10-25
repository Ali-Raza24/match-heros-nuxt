import { get } from '~/api/api';

export const useGameStore = defineStore('game', {
  state: () => ({
    loading: false,
    game: [],
    links: {},
    meta: {},
    currentPage: 1,
    TotalGame: 0,
    searchQuery:'',
    activeName:'Friendly Match'

  }),

  actions: {
    async getGame(query = null) {
      try {
        // if (type != undefined) {

          this.loading = true
          const { data, error } = await get(`/games?game_type=${this.activeName}`, {
            page: this.currentPage,
            query:this.searchQuery,
            type:'admin'
          });
          if (error.value) {
            // Handle the error
          } else {
            this.setValues(data.value)
            this.loading = false
          }
        // }
      } catch (error) {
        // Handle any unexpected errors
      }
    },
    setValues(data: any) {
      this.game = data.data;
      this.TotalGame = data.meta.total
    },

    setCurrentPage(page: any) {
      this.currentPage = page;
    },
    setSearchQuery(query: any) {
      this.searchQuery = query
    },
    setActiveTab(query: any) {
      this.activeName = query
    },
  },

  getters: {
    getCurrentPage: (state) => () => state.currentPage, // Make the getter return a function
  },
});

