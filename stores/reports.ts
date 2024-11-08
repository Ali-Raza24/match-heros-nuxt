import { get } from '~/api/api';

export const useReportStore = defineStore('reports', {
  state: () => ({
    loading: false,
    reports: [],
    links: {},
    meta: {},
    currentPage: 1,
    totalReports: 0,
    activeName:'game',
    perPage:0

  }),

  actions: {
    async getReports() {
      try {
          this.loading = true
          const { data, error } = await get(`/reports?type=${this.activeName}`, {
            page: this.currentPage,
          });
          if (error.value) {
          } else {
            this.setValues(data.value)
            this.loading = false
          }
      } catch (error) {
      }
    },
    setValues(data: any) {
      this.reports = data.data;
      this.totalReports = data.meta.total
      this.perPage = data.meta.per_page
    },

    setCurrentPage(page: any) {
      this.currentPage = page;
    },
    setActiveTab(query: any) {
      this.activeName = query
    },
  },

  getters: {
    getCurrentPage: (state) => () => state.currentPage,
  },
});

