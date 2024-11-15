<template>
    <NuxtLayout>
        <div>
            <div class="flex lg:flex-row flex-col gap-4 mb-4 items-center">
                <el-button :icon="ArrowLeft" @click="goBack" :color="'#0e6d40'">Back</el-button>
                <h6 class="text-white text-base font-regular">Report Details</h6>
            </div>
            <el-table :data="latestReports" :align="'center'" class="reports-table">
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
                            {{ scope.row.reason }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="Count" width="120">
                    <template #default="scope">
                        {{ scope.row.reportCount }}
                    </template>
                </el-table-column>

                <el-table-column label="Report Date & Time" width="180">
                    <template #default="scope">
                        {{ formatDate(scope.row.created_at) }} : {{ formatTime(scope.row.created_at) }}
                    </template>
                </el-table-column>
                <el-table-column label="Actions" width="150">
                    <template #default="scope">
                        <el-button v-if="hasMultipleReports(scope.row.user_id)" type="primary" size="small"
                            @click="openModal(scope.row.user_id)">
                            View All Reports
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

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


const route = useRoute();
const reports = ref([]);
const userMessages = ref([]);
const isModalVisible = ref(false);

onMounted(() => {
    reports.value = route.query.reports ? JSON.parse(route.query.reports) : [];
});

const latestReports = computed(() => {
    const reportMap = {};

    reports.value.forEach(report => {
        const userId = report.user_id;
        if (!reportMap[userId] || new Date(report.created_at) > new Date(reportMap[userId].created_at)) {
            reportMap[userId] = {
                ...report,
                reportCount: 1,
            };
        } else {
            reportMap[userId].reportCount++;
        }
    });

    return Object.values(reportMap).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
});

function hasMultipleReports(userId) {
    return reports.value.filter(report => report.user_id === userId).length > 1;
}

function openModal(userId) {
    userMessages.value = reports.value.filter(report => report.user_id === userId);
    isModalVisible.value = true;
}

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