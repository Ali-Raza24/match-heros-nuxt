<template>
  <NuxtLayout>
  <el-table :data="store.team" v-loading="store.loading">
    <el-table-column label="Group Name	" prop="user" />
    <el-table-column label="Group Captain	" prop="date_of_purchase" />
    <el-table-column label="County" prop="purchase_amount" />
    <el-table-column label="Amount of players in Group" prop="purchase_amount" />
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="store.TotalTeam" :current-page="currentPage()"
  @current-change="handleCurrentChange" />
  </NuxtLayout>
  </template>
    
  <script setup>
  import { useTeamStore } from '../../stores/team';
  import { ref, onMounted } from 'vue';
  
  
  const store = useTeamStore();
  
  const currentPage = () => store.getCurrentPage();
  
  const handleCurrentChange = async (page) => {
    store.setCurrentPage(page);
    fetchData()
  };
  
  onMounted(async () => {
    fetchData()
  });
  
  const fetchData = async () => {
    await store.getTeam();
  }
  
  </script>
    