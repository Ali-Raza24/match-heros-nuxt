<template>
  <NuxtLayout>
    <div class="flex lg:flex-row flex-col gap-4 mb-4 items-center justify-between">
      <h6 class="text-white text-base font-regular">Total Games</h6>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-change="handleClick">
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
          <template #default="scope">{{ formatDate(scope.row.starts_at) }}</template>
        </el-table-column>
        <el-table-column label="Time Of Purchase">
          <template #default="scope">{{ formatTime(scope.row.starts_at) }}</template>
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
import { formatDate, formatTime } from '~/utils/TimeFilter';

definePageMeta({
  middleware: 'auth',
})


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
<style lang="scss">
.el-tabs--card>.el-tabs__header,
.el-tabs--card>.el-tabs__header .el-tabs__item,
.el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: none !important;
}

.el-tabs--card>.el-tabs__header .el-tabs__item {
  @apply relative cursor-pointer py-3 px-3 lg:text-[13px] text-xs  text-white bg-[#1E2646] rounded-t-lg bg-gradient-to-b from-[#1E2646] to-[#1E2646] lg:min-w-[170px] min-w-0 text-center sm:col-span-4 col-span-6;
}

.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  @apply from-[#0b8140] to-[#0a5229];
}
.el-tabs__nav
{
  @apply lg:flex lg:justify-start grid grid-cols-12 gap-1 relative w-full;
}
.el-tabs {
    --el-tabs-header-height: unset;
}  
</style>