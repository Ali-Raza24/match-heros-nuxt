<template>
    <NuxtLayout>
        <div>
            <div class="flex lg:flex-row flex-col gap-4 mb-4 items-center">
                <el-button :icon="ArrowLeft" @click="goBack" :color="'#0e6d40'">Back</el-button>
                <h6 class="text-white text-base font-regular">Report Details</h6>
            </div>
            <el-table :data="latestReports" :align="'center'">
                <el-table-column prop="user_id" label="User ID" width="80" />
                <el-table-column prop="name" label="Name" width="120" />
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
                            View Messages
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

    return Object.values(reportMap);
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
    /* height: 100%; */
    white-space: normal;
    overflow-wrap: break-word;
}

td.el-table_1_column_3.report-trxt-class.el-table__cell .cell {
    padding: 8px 0px 8px 0px !important;
    height: auto !important;
}
table tr td.el-table_4_column_21.is-center.report-trxt-class.el-table__cell,
.el-table tr td.el-table_4_column_21.is-center.report-trxt-class.el-table__cell .cell {
    height: auto !important;
}
@media (min-width: 1200px) {
    table tr td.el-table_4_column_21.is-center.report-trxt-class.el-table__cell,
    .el-table tr td.el-table_4_column_21.is-center.report-trxt-class.el-table__cell .cell {
        height: auto !important;
    }
}
</style>