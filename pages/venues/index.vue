<template>
  <NuxtLayout>
    <el-table :data="venues" v-loading="loading">
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Email	" prop="contact.email" />
      <el-table-column label="Phone	" prop="contact.phone" />
      <el-table-column label="Country	" prop="address.country.name" />
      <el-table-column label="Town" prop="address.town" />
      <el-table-column label="Open Time" prop="open_time" />
      <el-table-column label="Close Time" prop="close_time" />
      <el-table-column label="Amount In Account	" prop="balance" />
      <el-table-column label="Operations">
        <template #default="scope">
           <el-button @click="handleComment(scope.$index, scope.row)"><img src="assets/images/comment.svg" /></el-button>
           <el-button @click="handleEdit(scope.$index, scope.row)"><img src="assets/images/edit.svg" /></el-button>
           <el-button @click="handleDelete(scope.$index, scope.row)"><img src="assets/images/delete.svg" /></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="TotalVenues" :current-page="currentPage()"
      @current-change="handleCurrentChange" />
  </NuxtLayout>
</template>
  
<script setup>
import { useVenueStore } from '../../stores/venues';
import { ref, onMounted } from 'vue';

const store = useVenueStore();
const venues = ref([]);
const TotalVenues = ref(0);


const handleDelete =() =>{

  ElMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      ElNotification({
    title: 'Error',
    message: 'This is an error message',
    type: 'error',
  })
    })
    .catch(() => {
      ElNotification({
        title: 'Info',
    message: 'This is an info message',
    type: 'info',
  })
    })
}

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
  await store.getVenues();
  TotalVenues.value = store.meta.total;
  venues.value = store.venues;
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
  