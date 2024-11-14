<template>
  <NuxtLayout>
    <div class="flex lg:flex-row flex-col gap-4 mb-4 items-center justify-between">
      <h6 class="text-white text-base font-regular">Reports</h6>
    </div>
    <el-tabs v-model="store.activeName" type="card" @tab-change="handleClick">
      <el-tab-pane label="Match Reports" name="game">
      </el-tab-pane>
      <el-tab-pane label="Player Reports" name="user">
      </el-tab-pane>

    </el-tabs>
    <div>
      <el-table :data="store.reports" v-loading="store.loading">
        <el-table-column label="Reported Player Name" prop="name" v-if="store.activeName === 'user'" />
        <el-table-column label="Game Type" prop="game_type" v-if="store.activeName === 'game'" />
        <el-table-column label="Organizer Name" prop="organizer_name" v-if="store.activeName === 'game'" />
        <el-table-column label="Venue Name" prop="venue_name" v-if="store.activeName === 'game'" />
        <el-table-column label="Date of Game" v-if="store.activeName === 'game'">
          <template #default="scope">{{ formatDate(scope.row.starts_at) }}</template>
        </el-table-column>
        <el-table-column label="Start Time Of Game" v-if="store.activeName === 'game'">
          <template #default="scope">{{ formatTime(scope.row.starts_at) }}</template>
        </el-table-column>
        <el-table-column label="Is Recurring" v-if="store.activeName === 'game'">
          <template #default="scope">
            {{ scope.row.is_recurring ? 'True' : 'False' }}
          </template>
        </el-table-column>

        <el-table-column :label="store.activeName === 'game' ? 'Total Reported Match' : 'Total Reported Players'">
          <template #default="scope">
            {{ scope.row.reports.length }}
          </template>
        </el-table-column>

        <el-table-column label="Actions">
          <template #default="scope">
            <el-button type="primary" size="small" @click="viewReportDetails(scope.row)">
              View Reporters
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" :total="store.totalReports" :page-size="store.perPage"
        :current-page="currentPage()" @current-change="handleCurrentChange" />
    </div>
  </NuxtLayout>
</template>
<script setup>
import { useReportStore } from '../../stores/reports';
import { ref, onMounted } from 'vue';
import { formatDate, formatTime } from '~/utils/TimeFilter';
import { useRouter } from 'vue-router';


definePageMeta({
  middleware: ['auth', 'profile'],
})


const store = useReportStore();
const router = useRouter();

const currentPage = () => store.getCurrentPage();
const handleClick = (TabName) => {
  store.setActiveTab(TabName)
  store.setCurrentPage(1);
  fetchData()
}
const viewReportDetails = (row) => {
  router.push({
    path: `/reports/${row.id}`,
    query: {
      reports: JSON.stringify(row.reports),
    },
  });
}

const handleCurrentChange = async (page) => {
  store.setCurrentPage(page);
  fetchData()
};

onMounted(async () => {
  fetchData();
});

const fetchData = async () => {
  await store.getReports();
}

</script>
<style lang="scss">
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

.el-pagination.is-background .btn-prev:disabled {
  color: #333845 !important;
  background-color: #141b37 !important;
}

.el-pagination.is-background .el-pager li.is-active {
  background: linear-gradient(181deg, #0b8140, #0a5229);
}
</style>