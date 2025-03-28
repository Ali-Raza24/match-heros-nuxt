<template>
    <NuxtLayout>
        <div class="flex lg:flex-row flex-col gap-4 items-center justify-between mb-4">
            <h6 class="text-white text-base font-regular">Total Number of Broadcasts Notifications ({{ store.totalBroadcasts }})</h6>
            <NuxtLink class="btn-theme !mt-0" :to="`/broadcasts/new-broadcast`">Create a Broadcast</NuxtLink>
        </div>
        <el-table :data="store.broadcasts" v-loading="store.loading" style="width: 100%;">
            <el-table-column label="Message" prop="message" width="300">
                <template v-slot="{ row }">
                    <el-tooltip class="item" effect="dark" :content="row.message" placement="top">
                        <span>
                            {{ row.message.length > 35 ? row.message.substring(0, 35) + "..." : row.message }}
                        </span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="Notification Types" prop="notification_types" width="300">
                <template v-slot="{ row }">
                    <div>
                        <el-tag v-for="(type, index) in row.notification_types" :key="index" type="info" class="mr-1">
                            {{ type }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Category" prop="category" width="300">
                <template v-slot="{ row }">
                    <el-tag>
                        {{ row.category }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column label="Start Date" prop="broadcast_start_date" />
            <el-table-column label="End Date" prop="broadcast_end_date" />

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

</script>

<style lang="scss">
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