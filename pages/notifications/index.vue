<template>
  <NuxtLayout>
  <el-table :data="store.Notifications" v-loading="store.loading">
    <el-table-column label="Name	" prop="related.name" />
    <el-table-column label="Related Typet">
      <template #default="scope">{{ invitedTeammate(scope.row.related_type)}}</template>
    </el-table-column>
    <el-table-column label="Title" prop="title" />
    <el-table-column label="Created At">
      <template #default="scope">{{ convertDateStringToYearMonthDate(scope.row.created_at)}}</template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="store.TotalNotifications" :current-page="currentPage()"
  @current-change="handleCurrentChange" />
  </NuxtLayout>
  </template>
    
  <script setup>
  import { useNotificationsStore } from '../../stores/notifications';
  import { ref, onMounted } from 'vue';
  
  
  const store = useNotificationsStore();
  
  const currentPage = () => store.getCurrentPage();
  
  const handleCurrentChange = async (page) => {
    store.setCurrentPage(page);
    fetchData()
  };
  
  function convertDateStringToYearMonthDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function invitedTeammate(str) {
  const words = str.split('_');
  const formattedName = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  return formattedName;
}

  onMounted(async () => {
    fetchData()
  });
  
  const fetchData = async () => {
    await store.getNotifications();
  }
  
  </script>
    