<template>
    <NuxtLayout>
        <div class="flex lg:flex-row flex-col gap-4 mb-4 items-center justify-between">
          <h6 class="text-white text-base font-regular">Credits Purchased</h6>
        </div>
        <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="Purchases" name="first">
                <Purchases></Purchases>
            </el-tab-pane>
            <el-tab-pane label="Cash Out" name="second">
                <CashOut></CashOut>
            </el-tab-pane>
            <el-tab-pane label="Game Free Transfer" name="third">
                <GameFree></GameFree>
            </el-tab-pane>
        </el-tabs>
    </NuxtLayout>
</template>
<script setup>

import Purchases from '~/components/CreditsAndPurchased/purchases.vue';
import CashOut from '~/components/CreditsAndPurchased/CashOut.vue';
import GameFree from '~/components/CreditsAndPurchased/GameFree.vue';

const activeName = ref('first')

const handleClick = (tab) => {
    console.log(tab)
}

</script>