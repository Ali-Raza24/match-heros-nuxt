import { get } from '~/api/api';

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    Notifications: [],
    links: {},
    meta: {},
    currentPage: 1,
    TotalNotifications:0,
    loading:false,
    searchQuery:'',

  }),

  actions: {
    async getNotifications() {
      try {
        this.loading=true
        const { data, error } = await get('/notifications', {
          page: this.currentPage,
          query:this.searchQuery

        });

        if (error.value) {
          // Handle the error
        } else {  
          this.loading=false        
          this.Notifications = data.value.data;
          this.TotalNotifications = data.value.meta.total
          // this.links = data.value.links;
          // this.meta = data.value.meta;
        }
      } catch (error) {
        // Handle any unexpected errors
      }
    },

    setCurrentPage(page:any) {
      this.currentPage = page;
    },
    setSearchQuery(query: any) {
      this.searchQuery = query
    },
  },

  getters: {
    getCurrentPage: (state) => () => state.currentPage, // Make the getter return a function
  },
});
