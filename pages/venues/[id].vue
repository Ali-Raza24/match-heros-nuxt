<template>
<NuxtLayout>
    <VenuesVenueForm></VenuesVenueForm>
</NuxtLayout>
</template>
<script setup>
import { useVenueStore } from "../../stores/venues";

 const store = useVenueStore();
 
onMounted(()=>{
 store.resetForm();
 store.getSingleVenues(useRoute().params.id);
})

</script>