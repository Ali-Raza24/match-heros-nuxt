import { get } from '~/api/api';

export const useGameStore = defineStore('game', {
  state: () => ({
    loading:false,
    game: [],
    links: {},
    meta: {},
    currentPage: 1,
    TotalGame:0
  }),

  actions: {
    async getGame(type:any) {
      try {
        if(type != undefined)
        {

          this.loading=true
          const { data, error } = await get(`/games?game_type=${type}`, {
            page: this.currentPage,
          });
  
          if (error.value) {
            // Handle the error
          } else {
              this.game = data.value.data;
              this.TotalGame = data.value.total
              this.loading=false
            // this.links = data.value.links;
            // this.meta = data.value.meta;
          }
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
