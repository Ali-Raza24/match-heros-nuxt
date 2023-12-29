<template>
  <div id="map" style="height: 400px"></div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from "vue";

const emit = defineEmits(['draggedAddress']);

const props = defineProps({
    location: {
        type: String,
        default: ""
    }
});

let map = null;
let marker = null;

const initMap = () => {
  // Fetch user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Initialize the map centered at the user's current location
        map = new google.maps.Map(document.getElementById('map'), {
          center: userLatLng,
          zoom: 12,
        });

        // Place a marker at the user's current location
        marker = new google.maps.Marker({
          position: userLatLng,
          map,
          title: 'Your Location',
          draggable: true,
        });
        const newPosition = marker.getPosition();
        getAddressFromLatLng(newPosition);
        // Event listener for marker position change
        google.maps.event.addListener(marker, 'dragend', () => {
          const newPosition = marker.getPosition();
          getAddressFromLatLng(newPosition);
          console.log('New marker position:', newPosition.toString());
        });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
};
onMounted(() => {
    initMap();
});

const getAddressFromLatLng = (latLng) => {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
      const address = results[0].formatted_address;
      emit('draggedAddress', address);
      // Perform actions with the retrieved address
    } else {
      console.error('Geocode was not successful for the following reason:', status);
    }
  });
};

const updateMarkerPosition = (address) => {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
      const { lat, lng } = results[0].geometry.location;
      // If map and marker exist, update marker position
      if (map && marker) {
        const newPosition = new google.maps.LatLng(lat(), lng());
        marker.setPosition(newPosition);
        map.setCenter(newPosition);
      } else {
        console.error('Map or Marker not initialized');
      }
    } else {
      console.error('Geocode was not successful for the following reason:', status);
    }
  });

};

watch(() => props.location, (newVal) => {
    if (newVal) {
        updateMarkerPosition(newVal)
    }
},{
    immediate:true
});
</script>
