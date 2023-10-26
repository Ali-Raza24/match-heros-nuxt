import { get } from '~/api/api';

export const usePlayerStore = defineStore('players', {
  state: () => ({
    loading:false,
    players: [],
    links: {},
    meta: {},
    currentPage: 1,
    totalPlayers: 0,
    searchQuery:'',
    perPage:0

  }),

  actions: {
    async getPlayers(query = '') {
      try {
                
        this.loading=true
        const { data, error } = await get('/players', {
          page: this.currentPage,
          query:this.searchQuery
        });

        if (error.value) {
          // Handle the error
        } else {
          this.setValues(data.value)
          this.loading=false
        }
      } catch (error) {
        // Handle any unexpected errors
      }
    },

    setValues(data: any) {
      this.players = data.data;
      this.links = data.links;
      this.meta = data.meta;
      this.totalPlayers=data.meta.total
      this.perPage = data.meta.per_page

    },
    setSearchQuery(query: any) {
      this.searchQuery = query
    },

    setCurrentPage(page: any) {
      this.currentPage = page;
    },
  },

  getters: {
    getCurrentPage: (state) => () => state.currentPage, // Make the getter return a function
  },
});
