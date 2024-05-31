
<template>
    <div>
        <el-dialog  :close-on-click-modal="false" class="pt-[35px] px-[30px] pb-[20px] relative" v-model="props.visible" :show-close="false" :append-to-body="true" center style="width: 740px; margin: 2.5rem auto; background:white;">
            <template #header="{ close, titleId, titleClass }">
                <div class="my-header float-right">
                    <el-button @click="emit('close')" class="absolute top-3 right-5 !border-0 !bg-transparent !p-0">
                        <el-icon :size="25" class="closeColor"><Close /></el-icon>
                    </el-button>
                </div>
            </template>
            <h2 class="text-[#11172D] text-[25px] font-medium text-center mb-[25px]">Venue Location</h2>
            <label class="text-sm font-bold mb-2 block">Search location</label>
        
            <GoogleMapsCustomeAddress @address="getAddress($event)" :draggedAddress="address"  />

            <GoogleMapsCustomeMap :placeId="placeId" :location="formatedAddress" @draggedAddress="getDraggedAddress" />

            <div class="text-right">
                <el-button @click="submitAddress" :class="'btn-theme test-capitalize'" type="success">
                Add Location</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { Close } from '@element-plus/icons-vue'

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        default: ""
    }
});

const emit = defineEmits(['close', 'input-address']);

const formatedAddress = ref("");
const address = ref("");
const geometryLocation = ref({});
const placeId = ref(null);

onMounted(() => {
    requestUserLocation();
    console.log('onMounted', props.address);
});

const getDraggedAddress = (draggedAddress) => {
    address.value = draggedAddress;
};

const getAddress = (event) => {
    formatedAddress.value = event.formatted_address;
    placeId.value = event.place_id;
    address.value = "";
    geometryLocation.value = event.geometry.location;
}

const submitAddress = () => {
    emit('input-address',  { address: formatedAddress, latLng: geometryLocation }) 
}

const requestUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        geometryLocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        formatedAddress.value = 'Current Location';
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
};

</script>
  
<style scoped>
.my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.modalTitle
{
    @apply text-[#11172D] text-[25px] font-medium;
}
.googleLocationSearch
{
    @apply h-[45px] rounded-md border border-[#636C92] font-medium text-[#314164] w-full px-[20px] placeholder-[#11172D] text-sm mb-[25px] focus:ring-0 focus:outline-none;
}
.closeColor svg
{
    @apply text-[#11172D]
}
.closeColor:hover svg
{
    @apply text-red-700
}
</style>
  