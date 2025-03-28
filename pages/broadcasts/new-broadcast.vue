<template>
    <NuxtLayout>
       <BroadcastNotificationsBroadcastForm></BroadcastNotificationsBroadcastForm>
    </NuxtLayout>
</template>

<script setup>

definePageMeta({
  middleware: ['auth','profile'],
})

import { useBroadcastStore } from "../../stores/broadcasts";
 const store = useBroadcastStore();
onMounted(()=>{
 store.setText('CREATE A BROADCAST')
 store.resetForm();
})

</script>
