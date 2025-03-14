<template>
    <NuxtLayout>
        <div class="flex lg:flex-row flex-col gap-4 items-center justify-between mb-4">
            <h6 class="text-white text-base font-regular">Total Number of Settings ({{ store.totalSettings }})</h6>
            <NuxtLink class="btn-theme !mt-0" :to="`/settings/new-setting`">Create a Setting</NuxtLink>
        </div>
        <el-table :data="store.settings" v-loading="store.loading" style="width: 100%;">
            <el-table-column label="Key" prop="key"/>
            <!-- <el-table-column label="Key" prop="key">
                <template #default="scope">
                    {{scope.row.key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}}
                </template>
            </el-table-column> -->
            <el-table-column label="Value" prop="value" />
            <el-table-column label="Operations">
                <template #default="scope">

                    <NuxtLink :class="'tableButton'" :to="`/settings/${scope.row.id}`"><img
                            class="!min-h-[18px] w-auto min-w-[18px]" src="/assets/images/edit.svg" /></NuxtLink>
                    <el-button :class="'tableButton'" @click="handleDelete(scope.row.id)"><img
                            class="!min-h-[18px] w-auto min-w-[15px]" src="/assets/images/delete.svg" /></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="store.totalSettings" :page-size="store.perPage"
            :current-page="currentPage()" @current-change="handleCurrentChange" />
    </NuxtLayout>
</template>

<script setup>
import { useSettingsStore } from '../../stores/settings';
import { ref, onMounted } from 'vue';

definePageMeta({
    middleware: ['auth', 'profile'],
})
const store = useSettingsStore();


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
            store.DeleteSettings(id)
        })
        .catch(() => {
            ElNotification({
                title: 'Info',
                message: 'Operation successful',
                type: 'info',
            })
        })
}

const currentPage = () => store.getCurrentPage();

const handleCurrentChange = async (page) => {
    store.setCurrentPage(page);
    fetchData()
};

onMounted(async () => {
    fetchData()
});

const fetchData = async () => {
    await store.getSettings();
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