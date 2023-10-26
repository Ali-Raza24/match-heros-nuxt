<template>
    <el-table :data="store.GameFree" v-loading="store.loading">
      <el-table-column label="Name of Sender" prop="user" />
      <el-table-column label="Name of Recipient	" prop="date_of_cash_out" />
      <el-table-column label="Date of Transfer	" prop="time_of_cash_out" />
      <el-table-column label="Time of Transfer	" prop="purchase_amount" />
      <el-table-column label="Completed" prop="completed" />
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="store.TotalGameFree" :page-size="store.perPage"  :current-page="currentPage()"
      @current-change="handleCurrentChange" />
  </template>
    
  <script setup>
  import { useGameFreeStore } from '../../stores/CreditsPurchased/GameFree';
  import { ref, onMounted } from 'vue';
  
  const store = useGameFreeStore();
  
  const currentPage = () => store.getCurrentPage();
  
  const handleCurrentChange = async (page) => {
    store.setCurrentPage(page);
    fetchData()
  };
  
  onMounted(async () => {
    fetchData()
  });
  
  const fetchData = async () => {
    await store.getGameFree();
  }
  
  </script>
    