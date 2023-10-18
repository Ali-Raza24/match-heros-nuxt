<template>
  <NuxtLayout>
    <div class="flex lg:flex-row flex-col gap-4 items-center justify-between mb-4">
          <h6 class="text-white text-base font-regular">Total Number of Venues</h6>
          <NuxtLink class="btn-theme !mt-0" :to="`/venues/new-venue`">Create a Venue</NuxtLink>
        </div>
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
          <el-button :class="'tableButton'" @click="handleComment(scope.row)"><img class="!min-h-[18px] w-auto min-w-[19px]"
              src="assets/images/comment.svg" /></el-button>
          <NuxtLink :class="'tableButton'" :to="`/venues/${scope.row.id}`"><img class="!min-h-[18px] w-auto min-w-[18px]"
              src="assets/images/edit.svg" /></NuxtLink>
          <el-button :class="'tableButton'" @click="handleDelete(scope.row.id)"><img class="!min-h-[18px] w-auto min-w-[15px]"
              src="assets/images/delete.svg" /></el-button>
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

definePageMeta({
  middleware: 'auth',
})


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

  * {
    border: none !important;
  }

  tr,
  .el-table__cell {
    background-color: transparent !important;
    backdrop-filter: blur(15px);
  }

  td:last-child {
    .cell {
      @apply flex items-center;
    }
  }

  .tableButton {
    @apply bg-transparent border-none p-2 scale-100 hover:scale-125 ease-linear duration-100;
  }

  tr {
    th {
      padding: 0 !important;

      &:first-child {
        .cell {
          @apply 2xl:pl-7 xl:pl-6 pl-5 rounded-tl-lg;
        }
      }

      &:last-child {
        .cell {
          @apply 2xl:pr-7 xl:pr-6 pr-5 rounded-tr-lg;
        }
      }

      .cell {
        @apply text-white 2xl:px-5 px-3 h-14 text-[13px] text-left bg-[#1E2646] whitespace-nowrap flex items-center;
      }
    }
  }

  tr {
    td {
      padding: 0 !important;

      &:first-child {
        .cell {
          @apply 2xl:pl-7 xl:pl-6 pl-5;
        }
      }

      &:last-child {
        .cell {
          @apply 2xl:pr-7 xl:pr-6 pr-5;
        }
      }

      .cell {
        @apply text-white xl:h-14 h-12 2xl:px-5 px-3 text-sm text-left whitespace-nowrap flex items-center;
      }
    }
  }

  tbody tr td {
    border-top: 1px solid #283054 !important;
  }
}

.el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: none;
}

.el-table--border .el-table__inner-wrapper::after,
.el-table--border::after,
.el-table--border::before,
.el-table__inner-wrapper::before {
  display: none;
}

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

.el-pagination.is-background .btn-prev:disabled, .el-pagination.is-background .btn-next:disabled {
    color: #333845 !important;
    background-color: #141b37 !important;
}

.el-pagination.is-background .el-pager li.is-active {
  background: linear-gradient(181deg, #0b8140, #0a5229);
}
</style>
  