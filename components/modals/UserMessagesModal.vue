<template>
  <el-dialog v-model="props.modelValue" :show-close="false" :close-on-click-modal="false" title="Messages" width="50%"
    style="background-color: #11172d !important;">
    <el-table :data="userMessages" :align="'center'" class="reports-modal-table" >
      <el-table-column label="Reason" width="530" :align="'center'" class-name="report-trxt-class">
        <template #default="scope">
          <div class="reason-text">
            {{ scope.row.reason }}
          </div>
        </template>
      </el-table-column> <el-table-column label="Report Date & Time">
        <template #default="scope">
          {{ formatDate(scope.row.created_at) }} : {{ formatTime(scope.row.created_at) }}
        </template>
      </el-table-column> </el-table>
    <template #footer>
      <el-button @click="close">Close</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  userMessages: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

function close() {
  emit('update:modelValue', false);
}
</script>
<style>
.reports-modal-table .report-trxt-class {
    height: auto !important;
    padding-top: 8px;
    padding-bottom: 8px;
}

@media (min-width: 1200px) {
    .reports-modal-table .report-trxt-class {
        height: auto !important;
    }
}
</style>
