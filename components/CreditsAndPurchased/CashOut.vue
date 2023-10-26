<template>
  <el-table :data="store.CashOut" v-loading="store.loading">
    <el-table-column label="Name of Player" prop="user" />
    <el-table-column label="Date of cash out" prop="date_of_cash_out" />
    <el-table-column label="Time of Cash out" prop="time_of_cash_out" />
    <el-table-column label="Cash Out Amount" prop="purchase_amount" />
    <el-table-column label="Completed" prop="completed" />
  </el-table>
  <el-pagination background layout="prev, pager, next" :page-size="store.perPage"  :total="store.TotalCashOut" :current-page="currentPage()"
    @current-change="handleCurrentChange" />
</template>
  
<script setup>
import { useCashOutStore } from '../../stores/CreditsPurchased/CashOut';
import { ref, onMounted } from 'vue';

const store = useCashOutStore();

const currentPage = () => store.getCurrentPage();

const handleCurrentChange = async (page) => {
  store.setCurrentPage(page);
  fetchData()
};

onMounted(async () => {
  fetchData()
});

const fetchData = async () => {
  await store.getCashOut();
}

</script>
  