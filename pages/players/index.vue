<template>
  <NuxtLayout>
    <div class="flex lg:flex-row flex-col gap-4 mb-4 items-center justify-between">
      <h6 class="text-white text-base font-regular">Total Number of players signed up 
      </h6>
    </div>
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

definePageMeta({
  middleware: 'auth',
})

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

.el-pagination.is-background .btn-prev:disabled {
  color: #333845 !important;
  background-color: #141b37 !important;
}

.el-pagination.is-background .el-pager li.is-active {
  background: linear-gradient(181deg, #0b8140, #0a5229);
}
</style>
  