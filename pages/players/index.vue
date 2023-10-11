<template>
  <NuxtLayout>
    <el-table :data="tableData">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="name" label="Sign up date" />
      <el-table-column prop="address" label="Email" />
      <el-table-column prop="address" label="Phone" />
    </el-table>
  </NuxtLayout>
</template>
  
<script lang="ts" setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
<style lang="scss">
.el-table {
  background-color: transparent !important;

  tr, .el-table__cell {
    background-color: transparent !important;
  }
}
</style>
  