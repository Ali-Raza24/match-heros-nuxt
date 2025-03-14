<template>
    <NuxtLayout>
        <SettingsSettingForm :isEditSubmit="true"></SettingsSettingForm>
    </NuxtLayout>
</template>
<script setup>
import { useSettingsStore } from "../../stores/settings";

definePageMeta({
    middleware: ['auth', 'profile'],
})

const store = useSettingsStore();

onMounted(() => {
    store.setText('UPDATE A SETTING')
    store.resetForm();
    store.getSingleSettings(useRoute().params.id);
})

</script>