<template>
  <div v-if="isError" class="text-center">
    <span>{{ errorMessage }}</span>
  </div>
  <div v-else class="relative">
    <div id="map"></div>
    <el-tooltip
        class="box-item"
        effect="dark"
        content="Choose current location"
        placement="top-end"
      >
      <el-button
        class="getCurrentLocation absolute -top-16 !bg-transparent !border-0 !px-0 right-3"
        type="success"
        v-if="!isError"
        @click="requestLocationPermission"
        >                
        <img src="/assets/images/currentLocation.svg" class="max-h-24 md:max-h-28 lg:max-h-32 xl:max-h-40 2xl:max-h-48 w-auto" alt="" /></el-button
      >
    </el-tooltip>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from "vue";

const emit = defineEmits(["draggedAddress"]);

const props = defineProps({
  location: {
    type: String,
    default: "",
  },
  placeId: {
    type: String,
    default: null,
  },
});

let map = null;
let marker = null;
const isError = ref(false);
const errorMessage = ref("");

onMounted(() => {
  requestLocationPermission();
});

const requestLocationPermission = () => {
  if (navigator.permissions) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "denied") {
          // If geolocation permission is denied, ask for permission again
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log("denied");
              initializeMap(
                position.coords.latitude,
                position.coords.longitude
              );
            },
            (error) => {
              isError.value = true;
              errorMessage.value = error.message;
              console.error("Error getting user location:", error);
            }
          );
        } else if (permissionStatus.state === "granted") {
          // If geolocation permission is granted, initialize the map
          var options = {
            enableHighAccuracy: true,
          };
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log("granted");
              initializeMap(
                position.coords.latitude,
                position.coords.longitude
              );
            },
            (error) => {
              error.value = true;
              errorMessage.value = error.message;
              console.error("Error getting user location:", error);
            },
            options
          );
        }
      });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

const initializeMap = (lat, lng) => {
  const userLatLng = { lat, lng };
  // Initialize the map centered at the user's current location
  map = new google.maps.Map(document.getElementById("map"), {
    center: userLatLng,
    zoom: 12,
  });
  // Place a marker at the user's current location
  marker = new google.maps.Marker({
    position: userLatLng,
    map,
    title: "Your Location",
    draggable: true,
    optimized: true,
  });
  const newPosition = marker.getPosition();
  getAddressFromLatLng(newPosition);
  // Event listener for marker position change
  google.maps.event.addListener(marker, "dragend", () => {
    const newPosition = marker.getPosition();
    getAddressFromLatLng(newPosition);
  });
};

const getAddressFromLatLng = (latLng) => {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
      const address = results[0].formatted_address;
      emit("draggedAddress", address);
      // Perform actions with the retrieved address
    } else {
      console.error(
        "Geocode was not successful for the following reason:",
        status
      );
    }
  });
};

const updateMarkerPosition = (address, placeId) => {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ placeId: placeId }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
      const { lat, lng } = results[0].geometry.location;
      // If map and marker exist, update marker position
      if (map && marker) {
        const newPosition = new google.maps.LatLng(lat(), lng());
        marker.setPosition(newPosition);
        map.setCenter(newPosition);
      } else {
        console.error("Map or Marker not initialized");
      }
    } else {
      console.error(
        "Geocode was not successful for the following reason:",
        status
      );
    }
  });
};

watch(
  () => props.location,
  (newVal) => {
    if (newVal) {
      updateMarkerPosition(newVal, props.placeId);
    }
  },
  {
    immediate: true,
  }
);
</script>
<style>
#map {
  aspect-ratio: 16/7;
  width: 100%;
}
.getCurrentLocation span {
  background: linear-gradient(to bottom, #0B8140, #0A5129);
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  display: block;
}
</style>
