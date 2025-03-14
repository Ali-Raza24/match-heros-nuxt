<template>
    <NuxtLayout>
       <SettingsSettingForm></SettingsSettingForm>
    </NuxtLayout>
</template>

<script setup>

definePageMeta({
  middleware: ['auth','profile'],
})

import { useSettingsStore } from "../../stores/settings";
 const store = useSettingsStore();
onMounted(()=>{
 store.setText('CREATE A SETTING')
 store.resetForm();
})

</script>
