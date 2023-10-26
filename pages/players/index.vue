<template>
  <NuxtLayout>
    <div class="flex lg:flex-row flex-col gap-4 mb-4 items-center justify-between">
      <h6 class="text-white text-base font-regular">Total Number of players signed up
      </h6>
    </div>
    <el-table :data="store.players" v-loading="store.loading">
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Sign up date	" prop="signup_date" />
      <el-table-column label="Email	" prop="email" />
      <el-table-column label="Phone	" prop="phone" />
      <el-table-column label="Age Bracket" prop="ageBracket" />
      <el-table-column label="Country	" prop="address.country.name" />
      <el-table-column label="Town" prop="address.town" />
      <el-table-column label="Player Availability" width="180">
    <template #default="scope">
      <template v-if="scope.row.availability && scope.row.availability.length > 0">
        <el-popover placement="top" :width="400" trigger="click">
          <template #reference>
            <el-button class="btn-theme" @click="showPopover(scope.row)">{{scope.row.availability[0].day}}...</el-button>
          </template>
          <el-table :data="scope.row.availability" class="custom-table">
            <el-table-column label="Date" prop="day" />
            <el-table-column label="Start Time" prop="startTime" />
            <el-table-column label="End Time" prop="endTime" />
          </el-table>
        </el-popover>
      </template>
      <span v-else>-</span>
    </template>
  </el-table-column>
      <el-table-column label="Amount In Account	" prop="balance" width="150" />
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="store.totalPlayers" :page-size="store.perPage" :current-page="currentPage()"
      @current-change="handleCurrentChange" />
  </NuxtLayout>
</template>
  
<script setup>
import { usePlayerStore } from '../../stores/players';
import { ref, onMounted } from 'vue';

definePageMeta({
  middleware: ['auth','profile'],
})

const store = usePlayerStore();
const currentPage = () => store.getCurrentPage();
const handleCurrentChange = async (page) => {
  store.setCurrentPage(page);
  fetchData()
};

onMounted(async () => {
  fetchData()
});

const fetchData = async () => {
  await store.getPlayers();
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
.btn-theme {
    @apply border-none inline-flex items-center justify-center whitespace-nowrap outline-none xl:px-6 lg:px-5 px-4 bg-gradient-to-b from-[#0b8140] to-[#0a5229] rounded-[50px] text-white xl:text-sm md:text-xs text-[11px] font-bold uppercase tracking-wide scale-100 active:scale-[.97] hover:text-white;
}
.el-popover.el-popper
{
  border:none;
  background-color: #141b37;
  padding: 0;
  max-height: 320px;
  overflow-y: scroll;
}

.el-popover.el-popper::-webkit-scrollbar {
  width: 7px;
  background-color: transparent;
}

.el-popover.el-popper::-webkit-scrollbar-thumb {
  border-radius: 50px;
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
  --tw-gradient-from: #0b8140 var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(11 129 64 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  --tw-gradient-to: #0a5229 var(--tw-gradient-to-position);
}

.el-popover.el-popper::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
  