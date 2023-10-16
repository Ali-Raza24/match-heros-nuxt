<template>
  <NuxtLayout>
    <el-table :data="store.venues" v-loading="store.loading">
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
          <el-button @click="handleComment(scope.row)"><img src="assets/images/comment.svg" /></el-button>
          <NuxtLink :to="`/venues/${scope.row.id}`"><img src="assets/images/edit.svg" /></NuxtLink>
          <el-button @click="handleDelete(scope.row.id)"><img src="assets/images/delete.svg" /></el-button>
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
// const venues = ref([]);
// const { venues } = store;
const TotalVenues = ref(0);


const handleDelete = (id) => {

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
      store.DeleteVenue(id)
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
  await store.getVenues();
  TotalVenues.value = store.meta.total;
  // venues.value = store.venues;
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
  