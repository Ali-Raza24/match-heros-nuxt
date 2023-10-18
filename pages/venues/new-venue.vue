<template>
    <NuxtLayout>
       <VenuesVenueForm></VenuesVenueForm>
    </NuxtLayout>
</template>

<script setup>

definePageMeta({
  middleware: 'auth',
})

import { useVenueStore } from "../../stores/venues";
 const store = useVenueStore();
onMounted(()=>{
 store.setText('CREATE A VENUE')
 store.resetForm();
})

</script>
