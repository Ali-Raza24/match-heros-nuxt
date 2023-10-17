<template>
  <el-table :data="store.Purchased" v-loading="store.loading">
    <el-table-column label="Name of Player" prop="user" />
    <el-table-column label="Date of Purchase" prop="date_of_purchase" />
  <el-table-column label="Time Of Purchase">
      <template #default="scope">{{ timeFilter(scope.row.time_of_purchase)}}</template>
    </el-table-column>
    <el-table-column label="Purchase Amount" prop="purchase_amount" />
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="store.TotalPurchases" :current-page="currentPage()"
    @current-change="handleCurrentChange" />
</template>
  
<script setup>
import { usePurchasedStore } from '../../stores/CreditsPurchased/purchased';
import { ref, onMounted } from 'vue';

import { timeFilter } from '~/utils/TimeFilter';

const store = usePurchasedStore();

const currentPage = () => store.getCurrentPage();

const handleCurrentChange = async (page) => {
  store.setCurrentPage(page);
  fetchData()
};

onMounted(async () => {
  fetchData()
});

const fetchData = async () => {
  await store.getPurchased();
}

</script>
  