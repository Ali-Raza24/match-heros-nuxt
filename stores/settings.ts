import { get, post, remove } from '~/api/api';
import axios from 'axios';

const defaultForm = {
    key: "",
    value: "",
}
export const useSettingsStore = defineStore('settings', {
    state: () => reactive({
        loading: false,
        settings: [],
        links: {},
        meta: {},
        currentPage: 1,
        form: reactive({ ...defaultForm }),
        buttonText: '',
        searchQuery: '',
        totalSettings: 0,
        perPage: 0


    }),

    actions: {
        async getSettings(query = '') {
            try {
                this.loading = true
                const { data, error } = await get('/settings', {
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
        async createSettings(settingData: any) {
            this.loading = true
            const config = useRuntimeConfig();
            try {
                settingData['_method'] = 'POST';
                await axios.post(config.public.NUXT_PUBLIC_API_BASE + '/settings', settingData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                })
                    .then(res => {
                        if (res.status == 201) {
                            this.loading = false

                            ElNotification({
                                message: 'Setting added',
                                type: 'success',
                            })
                            navigateTo('/settings')
                        }
                    })
                    .catch((error) => {
                        this.loading = false
                        ElNotification({
                            dangerouslyUseHTMLString: true,
                            message: `<strong>${error.response.data.error['message']}</strong>`,
                            type: 'error',
                        })

                    });
            } catch (error) {
            }
        },
        async getSingleSettings(id: any) {
            try {
                const { data, error } = await get(`/settings/${id}`);

                if (error.value) {
                } else {
                    this.form = data.value.data;
                }
            } catch (error) {
            }
        },
        async updateSettings(settingData: any, id: any) {
            this.loading = true

            const config = useRuntimeConfig();
            try {
                settingData['_method'] = 'PUT';
                await axios.put(config.public.NUXT_PUBLIC_API_BASE + `/settings/${id}`, settingData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                })
                    .then(res => {
                        if (res.status == 200) {
                            this.loading = false

                            ElNotification({
                                message: 'Setting updated',
                                type: 'success',
                            })
                            navigateTo('/settings')
                        }
                    })
                    .catch(error => {
                        this.loading = false
                        ElNotification({

                            dangerouslyUseHTMLString: true,
                            message: `<strong>${error.response.data.error['message']}</strong>`,
                            type: 'error',
                        })

                    });
            } catch (error) {
            }
        },
        async DeleteSettings(id: any) {
            try {
                const { data, error } = await remove(`/settings/${id}`);

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
                    this.getSettings()
                }
            } catch (error) {
            }
        },

        setCurrentPage(page: any) {
            this.currentPage = page;
        },
        resetForm() {
            Object.keys(defaultForm).forEach(key => {
                this.form[key as keyof typeof defaultForm] = defaultForm[key as keyof typeof defaultForm];
            })
        },
        setText(text: any) {
            this.buttonText = text
        },
        setValues(data: any) {
            this.settings = data.data;
            this.links = data.links;
            this.meta = data.meta;
            this.totalSettings = data.meta.total
            this.perPage = data.meta.per_page
        },
        setSearchQuery(query: any) {
            this.searchQuery = query
        },

    },

    getters: {
        getCurrentPage: (state) => () => state.currentPage,
        getSettingsData: (state) => () => state.settings,
        getSettingData: (state) => () => state.form,
    },
});
