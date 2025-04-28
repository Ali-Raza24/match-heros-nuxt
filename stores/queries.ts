import { get, post, remove } from '~/api/api';
import axios from 'axios';

const defaultForm = {
    subject: "",
    description: "",
}
export const useSupportsStore = defineStore('supports', {
    state: () => reactive({
        loading: false,
        queries: [],
        links: {},
        meta: {},
        currentPage: 1,
        form: reactive({ ...defaultForm }),
        buttonText: '',
        searchQuery: '',
        totalQueries: 0,
        perPage: 0


    }),

    actions: {
        async getQueries(query = '') {
            try {
                this.loading = true
                const { data, error } = await get('/queries', {
                    page: this.currentPage,
                    query: this.searchQuery
                });

                if (error.value) {
                } else {
                    this.setValues(data.value)
                    this.loading = false
                }
            } catch (error) {
            }
        },

        async getSingleSettings(id: any) {
            try {
                const { data, error } = await get(`/queries/${id}`);

                if (error.value) {
                } else {
                    this.form = data.value.data;
                }
            } catch (error) {
            }
        },

        async DeleteQueries(id: any) {
            try {
                const { data, error } = await remove(`/queries/${id}`);

                if (error.value) {
                    ElNotification({
                        message: error?.value?.data?.message,
                        type: 'error',
                    })

                } else {
                    ElNotification({
                        message: 'Successful',
                        type: 'success',
                    })
                    this.getQueries()
                }
            } catch (error) {
            }
        },

        setCurrentPage(page: any) {
            this.currentPage = page;
        },


        setValues(data: any) {
            this.queries = data.data;
            this.links = data.links;
            this.meta = data.meta;
            this.totalQueries = data.meta.total
            this.perPage = data.meta.per_page
        },
        setSearchQuery(query: any) {
            this.searchQuery = query
        },

    },

    getters: {
        getCurrentPage: (state) => () => state.currentPage,
        getSettingsData: (state) => () => state.queries,
    },
});
