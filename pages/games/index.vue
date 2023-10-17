<template>
    <NuxtLayout>
        <div class="flex lg:flex-row flex-col gap-4 mb-4 items-center justify-between">
          <h6 class="text-white text-base font-regular">Total Games</h6>
        </div>
        <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-change	="handleClick">
            <el-tab-pane label="Friendly Match" name="Friendly Match">
            </el-tab-pane>
            <el-tab-pane label="Futsal" name="Futsal">
            </el-tab-pane>
            <el-tab-pane label="Ladies Football" name="Ladies Football">
            </el-tab-pane>
            <el-tab-pane label="Walking Football" name="Walking Football">
            </el-tab-pane>
        </el-tabs>
        <div>

            <el-table :data="store.game" v-loading="store.loading">
        <el-table-column label="Game Organizer Name" prop="organizer_name" />
        <el-table-column label="Date of Game">
      <template #default="scope">{{ formatDate(scope.row.starts_at)}}</template>
    </el-table-column>
          <el-table-column label="Time Of Purchase">
      <template #default="scope">{{ formatTime(scope.row.starts_at)}}</template>
    </el-table-column>
        <el-table-column label="Game Size" prop="game_size" />
        <el-table-column label="Game Cost" prop="game_fee" />
        <el-table-column label="Paid by" prop="paid_by" />
      </el-table>
        <el-pagination background layout="prev, pager, next" :total="store.TotalGame" :current-page="currentPage()"
        @current-change="handleCurrentChange" />
        </div>
    </NuxtLayout>
</template>
<script setup>
import { useGameStore } from '../../stores/games';
import { ref, onMounted } from 'vue';

import { formatDate,formatTime } from '~/utils/TimeFilter';


const store = useGameStore();

const currentPage = () => store.getCurrentPage();

const activeTab = ref('Friendly Match')

const handleClick = (TabName) => {
    fetchData(TabName)
 }

const handleCurrentChange = async (page) => {
  store.setCurrentPage(page);
  fetchData()
};

onMounted(async () => {
  fetchData(activeTab.value)
});

const fetchData = async (activeTab) => {
  await store.getGame(activeTab);
}

</script>