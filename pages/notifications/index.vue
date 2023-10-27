<template>
  <NuxtLayout>
    <div class="flex lg:flex-row flex-col gap-4 mb-4 items-center justify-between">
      <h6 class="text-white text-base font-regular">Create Notifications 
      </h6>
    </div>
  <el-table :data="store.Notifications" v-loading="store.loading">
    <!-- <el-table-column label="Name" prop="related_user.name" /> -->

    <el-table-column label="Name">
    <template #default="scope">
      <span v-if="scope.row.related_type === 'invited_teammate'">
        {{ scope.row.related_team_user.name }}
      </span>
      <span v-else-if="scope.row.related_type === 'accept_teammate'">
        {{ scope.row.related_team_user.name }}
      </span>
      <span v-else-if="scope.row.related_type === 'decline_teammate'">
        {{ scope.row.related_team_user.name }}
      </span>
      <span v-else-if="scope.row.related_type === 'join_game'">
        {{ scope.row.related_team_user.name }}
      </span>
      <span v-else-if="scope.row.related_type === 'accept_game'">
        {{ scope.row.related_team_user.name }}
      </span>
      <span v-else-if="scope.row.related_type === 'decline_game'">
        {{ scope.row.related_team_user.name }}
      </span>
      <span v-else-if="scope.row.related_type === 'invite_game'">
        {{ scope.row.related_team_user.name }}
      </span>
      <span v-else-if="scope.row.related_type === 'delete_game'">
        {{ scope.row.related_team_user.name }}
      </span>
     
    </template>
  </el-table-column>
  
    <el-table-column label="Related Type">
      <template #default="scope">{{ invitedTeammate(scope.row.related_type)}}</template>
    </el-table-column>
    <el-table-column label="Title" prop="title" />
    <el-table-column label="Created At">
      <template #default="scope">{{ formatDate(scope.row.created_at)}}  {{  formatTime(scope.row.created_at) }}</template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="store.TotalNotifications" :page-size="store.perPageNotifications" :current-page="currentPage"
  @current-change="handleCurrentChange" />
  </NuxtLayout>
  </template>
    
  <script setup>
  import { useNotificationsStore } from '../../stores/notifications';
  import { ref, onMounted } from 'vue';
  
  definePageMeta({
    middleware: ['auth','profile'],
})

  const store = useNotificationsStore();
  
  const currentPage = () => store.getCurrentPage();
  
  const handleCurrentChange = async (page) => {
    store.setCurrentPage(page);
    fetchData()
  };
  
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
    <style>
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