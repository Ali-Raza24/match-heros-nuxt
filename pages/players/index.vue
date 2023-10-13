<template>
  <NuxtLayout>
    <el-table :data="players" v-loading="loading">
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Sign up date	" prop="signup_date" />
      <el-table-column label="Email	" prop="email" />
      <el-table-column label="Phone	" prop="phone" />
      <el-table-column label="Age Bracket" prop="ageBracket" />
      <el-table-column label="Country	" prop="address.country.name" />
      <el-table-column label="Town" prop="address.town" />
      <el-table-column label="Player Availability" prop="availability" width="140">
        <template slot-scope="scope">
          {{ scope && scope.row && scope.row.availability
            ? (scope.row.availability.length > 0 ? scope.row.availability[0].startTime : '-')
            : '-' }}
        </template>
      </el-table-column>
      <el-table-column label="Amount In Account	" prop="balance" width="150" />
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="totalPlayers" :current-page="currentPage()"
      @current-change="handleCurrentChange" />
  </NuxtLayout>
</template>
  
<script setup>
import { usePlayerStore } from '../../stores/players';
import { ref, onMounted } from 'vue';

const store = usePlayerStore();
const players = ref([]);
const totalPlayers = ref(0);

const currentPage = () => store.getCurrentPage();
const loading = ref(false);

const handleCurrentChange = async (page) => {
  store.setCurrentPage(page);
  fetchData()
};

onMounted(async () => {
  fetchData()
});

const fetchData = async () => {
  loading.value = true;
  await store.getPlayers();
  totalPlayers.value = store.meta.total;
  players.value = store.players;
  loading.value = false;
}

</script>

<style lang="scss">
.el-table {
  background-color: transparent !important;

  tr,
  .el-table__cell {
    background-color: transparent !important;
  }
}
</style>
  