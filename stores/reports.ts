import { get } from '~/api/api';

export const useReportStore = defineStore('reports', {
  state: () => ({
    loading: false,
    reports: [],
    links: {},
    meta: {},
    currentPage: 1,
    totalReports: 0,
    searchQuery: '',
    activeName: 'game',
    perPage: 0

  }),

  actions: {
    async getReports() {
      try {
        this.loading = true
        const { data, error } = await get(`/reports?type=${this.activeName}`, {
          query: this.searchQuery,
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
    async getSingleReports(id: any, reportable_type: string) {
      try {
        this.loading = true
        const { data, error } = await get(`/reports/${id}`, { reportable_type: reportable_type, page: this.currentPage, query: this.searchQuery });
        if (error.value) {
        } else {
          this.reports = data.value.data;
          this.totalReports = data.value.total
          this.perPage = data.value.per_page
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
    setSearchQuery(query: any) {
      this.searchQuery = query
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

