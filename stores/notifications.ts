import { get } from '~/api/api';

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    Notifications: [],
    links: {},
    meta: {},
    currentPage: 1,
    TotalNotifications:0
  }),

  actions: {
    async getNotifications() {
      try {
        const { data, error } = await get('/notifications', {
          page: this.currentPage,
        });

        if (error.value) {
          // Handle the error
        } else {
          console.log("resss",data.value);
          
          this.Notifications = data.value.data;
          this.TotalNotifications = data.value.pagination.total
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
