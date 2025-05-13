<template>
    <NuxtLayout>
        <BroadcastNotificationsBroadcastForm :isEditSubmit="true"></BroadcastNotificationsBroadcastForm>
    </NuxtLayout>
</template>
<script setup>
import { useBroadcastStore } from "../../stores/broadcasts";       

definePageMeta({
    middleware: ['auth', 'profile'],
})

const store = useBroadcastStore();

onMounted(() => {
    store.setText('UPDATE A BROADCAST')
    store.resetForm();
    store.getSingleBroadcast(useRoute().params.id);
})

</script>   