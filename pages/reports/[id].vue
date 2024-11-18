<template>
    <NuxtLayout>
        <div>
            <div class="flex lg:flex-row flex-col gap-4 mb-4 items-center">
                <el-button :icon="ArrowLeft" @click="goBack" :color="'#0e6d40'">Back</el-button>
                <h6 class="text-white text-base font-regular">Report Details</h6>
            </div>
            <el-table :data="store.reports" :align="'center'" class="reports-table" v-loading="store.loading">
                <el-table-column prop="user_id" label="User ID" width="80" />
                <el-table-column prop="name" label="Name" width="150" />
                <el-table-column label="Status" width="150">
                    <template #default="scope">
                        <el-tag v-if="scope.row.deleted_user" type="danger" size="small">
                            Deleted User
                        </el-tag>
                        <span v-else><el-tag type="success" size="small">
                                Active </el-tag></span>
                    </template>
                </el-table-column>
                <el-table-column label="Reason" class-name="report-trxt-class" :align="'center'">
                    <template #default="scope">
                        <div class="reason-text">
                            {{ scope.row.latest_reason }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="Count" width="120">
                    <template #default="scope">
                        {{ scope.row.report_count }}
                    </template>
                </el-table-column>

                <el-table-column label="Report Date & Time" width="180">
                    <template #default="scope">
                        {{ formatDate(scope.row.latest_created_at) }} : {{ formatTime(scope.row.latest_created_at) }}
                    </template>
                </el-table-column>
                <el-table-column label="Actions" width="150">
                    <template #default="scope">
                        <el-button v-if="scope.row.messages.length > 1" type="primary" size="small"
                            @click="openModal(scope.row.messages)">
                            View All Reports
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" :total="store.totalReports" :page-size="store.perPage"
                :current-page="currentPage()" @current-change="handleCurrentChange" />
            <UserMessagesModal :userMessages="userMessages" v-model="isModalVisible" />
        </div>
    </NuxtLayout>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { formatDate, formatTime } from '~/utils/TimeFilter';
import UserMessagesModal from '~/components/modals/UserMessagesModal.vue';
import { ArrowLeft } from '@element-plus/icons-vue'


const userMessages = ref([]);
const isModalVisible = ref(false);
const store = useReportStore();
const currentPage = () => store.getCurrentPage();

onMounted(async () => {
    store.getSingleReports(useRoute().params.id, store.activeName);
});

function openModal(reports) {
    userMessages.value = reports;
    isModalVisible.value = true;
}

const handleCurrentChange = async (page) => {
    store.setCurrentPage(page);
    store.getSingleReports(useRoute().params.id, store.activeName);
};

function goBack() {
    useRouter().back();
}

</script>

<style>
.reason-text {
    white-space: normal;
    overflow-wrap: break-word;
}

.reports-table .report-trxt-class {
    height: auto !important;
    padding-top: 8px;
    padding-bottom: 8px;
}


@media (min-width: 1200px) {
    .reports-table .report-trxt-class {
        height: auto !important;
    }
}
</style>