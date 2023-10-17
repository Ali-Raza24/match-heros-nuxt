import { get } from '~/api/api';

export const useTeamStore = defineStore('Team', {
  state: () => ({
    Team: [],
    links: {},
    meta: {},
    currentPage: 1,
    TotalTeam:0
  }),

  actions: {
    async getTeam() {
      try {
        const { data, error } = await get('/endpoint-name', {
          page: this.currentPage,
        });

        if (error.value) {
          // Handle the error
        } else {
          this.Team = data.value.data;
          this.TotalTeam = data.value.pagination.total
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
