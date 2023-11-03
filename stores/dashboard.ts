import { get } from '~/api/api';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    balanceData: {
      available_balance: {
        amount:'loading...'
      },
      pending_balance: {
        amount:'loading..'
      },
    },
  }),

  actions: {
    async getDashboardData() {
      try {

        const { data, error } = await get('/admin-balance');

        if (error.value) {
        } else {
          console.log('darta', data)
          this.balanceData = data.value.data;
        }
      } catch (error) {
      }
    },

  },

});
