<template>
  <NuxtLayout>
    <div class="flex lg:flex-row flex-col gap-4 items-center justify-between mb-4">
      <h6 class="text-white text-base font-regular">
        Total Number of Queries ({{ store.totalQueries }})
      </h6>
    </div>

    <el-table :data="store.queries" v-loading="store.loading" style="width: 100%;">
      <el-table-column label="Name" prop="user.name" />
      <el-table-column label="Email" prop="user.email" />
      <el-table-column label="Subject">
        <template #default="{ row }">
          <el-tooltip class="item" effect="dark"
            :content="row.subject.length > 20 ? row.subject.substring(0, 20) + '...' : row.subject" placement="top">
            <span>
              {{ row.subject.length > 20 ? row.subject.substring(0, 20) + "..." : row.subject }}
            </span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="Description">
        <template #default="{ row }">
          <el-tooltip class="item" effect="dark"
            :content="row.description.length > 20 ? row.description.substring(0, 20) + '...' : row.description"
            placement="top">
            <span>
              {{ row.description.length > 20 ? row.description.substring(0, 20) + "..." : row.description }}
            </span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="Date & Time">
        <template #default="scope">{{ formatDate(scope.row.created_at) }} {{ formatTime(scope.row.created_at)
          }}</template>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="openDialog(row)">
            View
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="store.totalQueries" :page-size="store.perPage"
      :current-page="currentPage()" @current-change="handleCurrentChange" />

    <el-dialog v-model="dialogVisible" title="Query Details" width="500px" class="query-dialog">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="Subject" label-class-name="bold-label">
          {{ selectedQuery?.subject }}
        </el-descriptions-item>
        <el-descriptions-item label="Description" label-class-name="bold-label">
          {{ selectedQuery?.description }}
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Close</el-button>
        </span>
      </template>
    </el-dialog>
  </NuxtLayout>
</template>


<script setup>
import { useSupportsStore } from '../../stores/queries';
import { ref, onMounted } from 'vue';

definePageMeta({
  middleware: ['auth', 'profile'],
})
const store = useSupportsStore();


const currentPage = () => store.getCurrentPage();

const handleCurrentChange = async (page) => {
  store.setCurrentPage(page);
  fetchData()
};

const dialogVisible = ref(false)
const selectedQuery = ref(null)

function openDialog(row) {
  selectedQuery.value = row
  dialogVisible.value = true
}

onMounted(async () => {
  fetchData()
});

const fetchData = async () => {
  await store.getQueries();
}

</script>

<style lang="scss">
.bold-label {
  font-weight: bold !important;
}

.query-dialog .el-descriptions__content {
  word-break: break-word;
  white-space: pre-wrap;
}

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

.el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .btn-next:disabled {
  color: #333845 !important;
  background-color: #141b37 !important;
}

.el-pagination.is-background .el-pager li.is-active {
  background: linear-gradient(181deg, #0b8140, #0a5229);
}
</style>