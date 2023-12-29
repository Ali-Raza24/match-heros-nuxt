<template>
    <input class="googleLocationSearch" ref="autocompleteInput" type="text" placeholder="Enter address">
</template>

<script setup>
import {  ref, onMounted, defineProps, watch } from 'vue'

const autocompleteInput = ref(null);
const emit = defineEmits(["address"]);

const props = defineProps({
    draggedAddress: {
        type: String,
        default: ""
    }
});

onMounted(() => {
    const options = {
        strictBounds: false,
    };
    const autocomplete = new google.maps.places.Autocomplete(autocompleteInput.value,options);
    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        emit('address', place);
    });

});

const getPlaceFromAddress = (address) => {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
      const placeId = results[0].place_id;
      new google.maps.places.PlacesService(document.createElement('div')).getDetails(
        { placeId },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            emit('address', place);
          }
        }
      );
    } else {
      console.error('Geocode was not successful for the following reason:', status);
    }
  });
};

watch(() => props.draggedAddress, (newVal) => {
    console.log('draggedAddress=>newVal', newVal); 
    if (newVal !== "") {
        autocompleteInput.value.value = newVal;
        getPlaceFromAddress(newVal);
    }
});

</script>