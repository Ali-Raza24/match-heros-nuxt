

<template>
  <NuxtLayout>
    <div>
      <el-row class="">
        <el-col :span="8">
          <el-card class="balance-card">
            <div class="balance-card-content">
              <h3 class="text-white">Available Balance</h3>
              <p class="balance-amount">{{ store.balanceData.available_balance.amount }} {{
                store.balanceData.available_balance.currency }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="balance-card">
            <div class="balance-card-content">
              <h3 class="text-white"> Available to pay out soon</h3>
              <p class="balance-amount">{{ store.balanceData.pending_balance.amount }} {{
                store.balanceData.pending_balance.currency }}</p>

            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

  </NuxtLayout>
</template>
<script setup>
definePageMeta({
  middleware: ['auth', 'profile'],
})

const store = useDashboardStore();

onMounted(() => {
  store.getDashboardData()
});

</script>

<style scoped>
.balance-card {
  width: 300px;
  margin: 20px;
  border-radius: 10px;
  border-color: #1e2646;
  background-color: #1e2646;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.balance-row {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.balance-card-content {
  padding: 20px;
  text-align: center;
}

.balance-amount {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}

.pending-text {
  font-size: 12px;
  color: #999;
  /* Adjust color as needed */
}
</style>