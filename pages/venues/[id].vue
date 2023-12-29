<template>
<NuxtLayout>
    <VenuesVenueForm :isEditSubmit="true" ></VenuesVenueForm>
</NuxtLayout>
</template>
<script setup>
import { useVenueStore } from "../../stores/venues";

definePageMeta({
  middleware: ['auth','profile'],
})

 const store = useVenueStore();
 
onMounted(()=>{
 store.setText('UPDATE A VENUE')
 store.resetForm();
 store.getSingleVenues(useRoute().params.id);
})

</script>