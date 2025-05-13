<template>
    <NuxtLayout>
        <div class="flex lg:flex-row flex-col gap-4 items-center justify-between mb-4">
            <h6 class="text-white text-base font-regular">Total Number of Broadcasts Notifications ({{
                store.totalBroadcasts }})</h6>
            <NuxtLink class="btn-theme !mt-0" :to="`/broadcasts/new-broadcast`">Create a Broadcast</NuxtLink>
        </div>
        <el-table :data="store.broadcasts" v-loading="store.loading" style="width: 100%;">
            <el-table-column label="Message" prop="message" width="170">
                <template v-slot="{ row }">
                    <el-tooltip class="item" effect="dark" :content="truncateHtml(row.message)" placement="top">
                        <span class="message-content" v-html="row.message"></span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="Scheduled" prop="broadcast_timing" width="100">
                <template v-slot="{ row }">
                    <el-tag v-if="row.broadcast_timing === 'now'" type="success"> <span class="font-bold">False</span>
                    </el-tag>
                    <el-tag v-else type="warning"><span class="font-bold">True</span></el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Notification Types" prop="notification_types" width="300">
                <template v-slot="{ row }">
                    <div>
                        <el-tag v-for="(type, index) in row.notification_types" :key="index" type="info" class="mr-1">
                            <span class="font-bold">{{ type }}</span>
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Category" prop="category" width="130">
                <template v-slot="{ row }">
                    <el-tag>
                        <span class="font-bold">{{ row.category }}</span>
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column label="Start Date" prop="broadcast_start_date">
                <template v-slot="{ row }">
                    {{ row.schedule_start_date ?? row.broadcast_start_date ?? '---' }}
                </template>
            </el-table-column>

            <el-table-column label="End Date" prop="broadcast_end_date">
                <template v-slot="{ row }">
                    {{ row.broadcast_end_date ?? '---' }}
                </template>
            </el-table-column>
            <el-table-column label="Users" prop="recipients" width="100">
                <template v-slot="{ row }">
                    <div>
                        <el-popover v-if="row.recipients && row.recipients.length > 0" placement="top" trigger="hover"
                            width="180">
                            <template #reference>
                                <el-tag type="primary"><span class="font-bold">Individual</span></el-tag>
                            </template>
                            <div>
                                <ul class="list-disc ml-4">
                                    <li v-for="(user, index) in row.recipients" :key="index">
                                        {{ user.name }}
                                    </li>
                                </ul>
                            </div>
                        </el-popover>
                        <el-tag v-else type="success"><span class="font-bold">All</span></el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Operations" width="100">
                <template #default="scope">
                    <el-button :class="'tableButton'" @click="handleDelete(scope.row.id)"><img
                            class="!min-h-[18px] w-auto min-w-[15px]" src="/assets/images/delete.svg" /></el-button>

                            <NuxtLink :class="'tableButton'" :to="`/broadcasts/${scope.row.id}`" v-if="scope.row.broadcast_timing === 'scheduled'"><img
                                class="!min-h-[18px] w-auto min-w-[18px]" src="/assets/images/icon-settings.svg" /></NuxtLink>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="store.totalBroadcasts" :page-size="store.perPage"
            :current-page="currentPage()" @current-change="handleCurrentChange" />
    </NuxtLayout>
</template>

<script setup>
import { useBroadcastStore } from '../../stores/broadcasts';
import { ref, onMounted } from 'vue';

definePageMeta({
    middleware: ['auth', 'profile'],
})
const store = useBroadcastStore();


const currentPage = () => store.getCurrentPage();

const handleCurrentChange = async (page) => {
    store.setCurrentPage(page);
    fetchData()
};

onMounted(async () => {
    fetchData()
});

const fetchData = async () => {
    await store.getBroadcasts();
}
function truncateHtml(html, limit) {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
}

const handleDelete = (id) => {
    ElMessageBox.confirm(
        'Are you sure, you want to delete?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            store.DeleteBroadcast(id)
        })
        .catch(() => {
            ElNotification({
                title: 'Info',
                message: 'Operation successful',
                type: 'info',
            })
        })
}


</script>

<style lang="scss">
.message-content a {
    color: #409EFF;
    /* Element Plus primary color */
    text-decoration: underline;
    cursor: pointer;
}
.el-table {
    background-color: transparent !important;

    * {
        border: none !important;
    }

    tr,
    .el-table__cell {
        background-color: transparent !important;
        backdrop-filter: blur(15px);
    }

    td:last-child {
        .cell {
            @apply flex items-center;
        }
    }

    .tableButton {
        @apply bg-transparent border-none p-2 scale-100 hover:scale-125 ease-linear duration-100;
    }

    tr {
        th {
            padding: 0 !important;

            &:first-child {
                .cell {
                    @apply 2xl:pl-7 xl:pl-6 pl-5 rounded-tl-lg;
                }
            }

            &:last-child {
                .cell {
                    @apply 2xl:pr-7 xl:pr-6 pr-5 rounded-tr-lg;
                }
            }

            .cell {
                @apply text-white 2xl:px-5 px-3 h-14 text-[13px] text-left bg-[#1E2646] whitespace-nowrap flex items-center;
            }
        }
    }

    tr {
        td {
            padding: 0 !important;

            &:first-child {
                .cell {
                    @apply 2xl:pl-7 xl:pl-6 pl-5;
                }
            }

            &:last-child {
                .cell {
                    @apply 2xl:pr-7 xl:pr-6 pr-5;
                }
            }

            .cell {
                @apply text-white xl:h-14 h-12 2xl:px-5 px-3 text-sm text-left whitespace-nowrap flex items-center;
            }
        }
    }

    tbody tr td {
        border-top: 1px solid #283054 !important;
    }
}

.el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
    border-bottom: none;
}

.el-table--border .el-table__inner-wrapper::after,
.el-table--border::after,
.el-table--border::before,
.el-table__inner-wrapper::before {
    display: none;
}

.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
    margin: 0 4px;
    background-color: #1e2646;
    color: #fff;
}

.el-loading-mask {
    background-color: #1e2646;
}

.el-pagination {
    margin-top: 20px;
}

.el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .btn-next:disabled {
    color: #333845 !important;
    background-color: #141b37 !important;
}

.el-pagination.is-background .el-pager li.is-active {
    background: linear-gradient(181deg, #0b8140, #0a5229);
}
</style>