import { get, post, remove } from '~/api/api';
import axios from 'axios';
import { now } from 'lodash';

const defaultForm = {
    message: '',
    notification_types: [],
    category: '',
    schedule_start_date: '',
    broadcast_start_date: '',
    broadcast_end_date: '',
    recipients: [],
    broadcast_timing: 'now',
    slection_type: '',
}
export const useBroadcastStore = defineStore('broadcast', {
    state: () => reactive({
        loading: false,
        broadcasts: [],
        links: {},
        meta: {},
        currentPage: 1,
        form: reactive({ ...defaultForm }),
        buttonText: '',
        searchQuery: '',
        totalBroadcasts: 0,
        perPage: 0,
        users: [],
        selectFilterUsers: '',
        selectedUsers: [],
        notificationTypes: [
            {
                value: 'in_app',
                label: 'In-App'
            },
            {
                value: 'push_notification',
                label: 'Push Notification'
            },
            {
                value: 'broadcast',
                label: 'Broadcast Notification'
            }
        ],
        filterUsers: [
            {
                value: 'all',
                label: 'All'
            },
            {
                value: 'specific',
                label: 'Individual'
            }
        ],
        category: [
            {
                value: 'bug',
                label: 'Bug'
            },
            {
                value: 'reminder',
                label: 'Reminder'
            },
            {
                value: 'announcement',
                label: 'Announcement'
            },
            {
                value: 'other',
                label: 'Other'
            }
        ],
        basicRules: {
            message: [
                {
                    required: true,
                    message: "The message field is required",
                    trigger: "change",
                },
            ],
            notification_types: [
                {
                    required: true,
                    message: "The notification types field is required",
                    trigger: "change",
                },
            ],
            category: [
                {
                    required: true,
                    message: "The category field is required",
                    trigger: "change",
                },
            ],
            schedule_start_date: [
                {
                    required: true,
                    message: "The start date field is required",
                    trigger: "blur",
                },
            ],
            broadcast_end_date: [
                {
                    required: true,
                    message: "The end date field is required",
                    trigger: "blur",
                },
            ],
            broadcast_timing: [
                {
                    required: true,
                    message: "The broadcast timing field is required",
                    trigger: "blur",
                },
            ],
            slection_type: [
                {
                    required: true,
                    message: "The filter users field is required",
                    trigger: 'change',
                },
            ],
            recipients: [
                {
                    required: true,
                    message: "The users field is required",
                    trigger: "change",
                },
            ],
        },


    }),

    actions: {
        async getBroadcasts(query = '') {
            try {
                this.loading = true
                const { data, error } = await get('/broadcasting-notifications', {
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
        async getPlayers() {
            try {
                const { data, error } = await get('/all-users');

                if (error.value) {
                } else {
                    this.users = data.value.data
                }
            } catch (error) {
                console.log('error Users', error)
            }
        },
        async createBroadcast(broadcastData: any) {
            this.loading = true
            const config = useRuntimeConfig();
            try {
                broadcastData['_method'] = 'POST';
                await axios.post(config.public.NUXT_PUBLIC_API_BASE + '/broadcasting-notifications', broadcastData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                })
                    .then(res => {
                        if (res.status == 201) {
                            this.loading = false

                            ElNotification({
                                message: 'Broadcast added',
                                type: 'success',
                            })
                            this.resetForm()
                            navigateTo('/broadcasts')
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

        async DeleteBroadcast(id: any) {
            try {
              const { data, error } = await remove(`/broadcasting-notifications/${id}`);
      
              if (error.value) {
                ElNotification({
                  message: error?.value?.data?.message,
                  type: 'error',
                })
                
              } else {          
                ElNotification({
                  message: 'Broadcast deleted successfully',
                  type: 'success',
                })
                this.getBroadcasts()
              }
            } catch (error) {        
            }
          },


        setCurrentPage(page: any) {
            this.currentPage = page;
        },
        resetForm() {
            Object.assign(this.form, { ...defaultForm });
            this.selectFilterUsers = '';
            this.form.recipients = [];
        },
        setText(text: any) {
            this.buttonText = text
        },
        setValues(data: any) {
            this.broadcasts = data.data;
            this.links = data.links;
            this.meta = data.meta;
            this.totalBroadcasts = data.meta.total
            this.perPage = data.meta.per_page
        },
        setSearchQuery(query: any) {
            this.searchQuery = query
        },

        disablePastDates: (date: any) => {
            return date < new Date();
        },

    },

    getters: {
        getCurrentPage: (state) => () => state.currentPage,
        getBroadcastsData: (state) => () => state.broadcasts,
        getBroadcastData: (state) => () => state.form,
    },
});
