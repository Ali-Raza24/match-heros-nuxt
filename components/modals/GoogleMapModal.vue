<template>
    <div>
        <el-dialog :close-on-click-modal="false" v-model="props.visible" :show-close="false" append-to-body center
            style="width: 1000px; margin: 2.5rem auto; background:#0f1323"
            class="pt-[35px] px-[30px] pb-[20px] relative">
            <template #header>
                <div class="my-header float-right">
                    <el-button @click="closeDialog()" class="absolute top-3 right-5 !border-0 !bg-transparent !p-0">
                        <el-icon :size="25" class="closeColor">
                            <Close />
                        </el-icon>
                    </el-button>
                </div>
            </template>

            <h2 class="text-[#ffff] text-[25px] font-medium text-center mb-[25px]">Venue Location</h2>

            <label class="text-sm font-bold mb-2 block text-[#ffff]">Search by</label>
            <el-radio-group v-model="searchType" class="mb-4">
                <el-radio label="coordinates">Coordinates</el-radio>
                <el-radio label="address">Full Address</el-radio>
            </el-radio-group>

            <el-form :model="form" :rules="rules" ref="formRef" label-position="top" class="mb-4"
                @submit.native.prevent>
                <div v-if="searchType === 'coordinates'">
                    <el-form-item label="Latitude" prop="latitude">
                        <el-input v-model="form.latitude" placeholder="Enter latitude" />
                    </el-form-item>

                    <el-form-item label="Longitude" prop="longitude">
                        <el-input v-model="form.longitude" placeholder="Enter longitude" />
                    </el-form-item>

                    <el-form-item>
                        <el-button @click="validateAndSearchCoordinates" class="btn-theme mt-2" type="primary">Search
                            Location</el-button>
                    </el-form-item>
                </div>

                <div v-else>
                    <el-form-item label="Full Address" prop="addressInput">
                        <el-input v-model="form.addressInput" placeholder="Enter full address"
                            @keyup.enter.prevent="validateAndSearchAddress" />
                    </el-form-item>

                    <el-form-item>
                        <el-button @click="validateAndSearchAddress" class="btn-theme mt-2" type="primary">Search
                            Location</el-button>
                    </el-form-item>
                </div>
            </el-form>

            <div v-if="loading" class="text-center mt-4">
                <el-icon class="is-loading" style="font-size: 30px;">
                    <Loading />
                </el-icon>
            </div>

            <div v-show="mapReady && !loading" class="mt-4">
                <div id="map" style="width: 100%; height: 500px; border-radius: 10px;"></div>
            </div>

            <div class="text-right mt-4">
                <el-button @click="submitAddress" class="btn-theme" type="success">Add Location</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import axios from 'axios'
import { Close, Loading } from '@element-plus/icons-vue'
import { useVenueStore } from '../../stores/venues'

const store = useVenueStore()

const props = defineProps({
    visible: Boolean,
    address: String,
    lat: Number,
    lng: Number
})

const emit = defineEmits(['close', 'input-address'])

const apiKey = 'AIzaSyD8M1_FlTzwkv2ZdRBcRUXal39wUSHzSq8'

const searchType = ref('address')
const loading = ref(false)
const map = ref(null)
const marker = ref(null)
const mapReady = ref(false)

const formRef = ref(null)
const form = reactive({
    latitude: '',
    longitude: '',
    addressInput: '',
})

const rules = reactive({
    latitude: [
        { required: true, message: 'Latitude is required', trigger: 'blur' },
        {
            pattern: /^(-?(90(\.0+)?|([1-8]?\d(\.\d+)?)))$/,
            message: 'Latitude must be a number between -90.0000000 and 90.0000000',
            trigger: 'blur',
        },
    ],
    longitude: [
        { required: true, message: 'Longitude is required', trigger: 'blur' },
        {
            pattern: /^(-?(180(\.0+)?|(1[0-7]\d(\.\d+)?|[1-9]?\d(\.\d+)?)))$/,
            message: 'Longitude must be a number between -180.0000000 and 180.0000000',
            trigger: 'blur',
        },
    ],
    addressInput: [{ required: true, message: 'Address is required', trigger: 'blur' }],
})

const initMap = (lat, lng) => {
    const location = { lat: parseFloat(lat), lng: parseFloat(lng) }

    if (!map.value) {
        map.value = new window.google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 15,
        })

        marker.value = new window.google.maps.Marker({
            position: location,
            map: map.value,
            draggable: true,
        })

        marker.value.addListener('dragend', () => {
            const newPos = marker.value.getPosition()
            form.latitude = newPos.lat()
            form.longitude = newPos.lng()
            fetchAddressFromLatLng(newPos.lat(), newPos.lng())
        })
    } else {
        map.value.setCenter(location)
        marker.value.setPosition(location)
    }

    mapReady.value = true
}

const validateAndSearchCoordinates = () => {
    formRef.value.validateField(['latitude', 'longitude'], (valid) => {
        if (valid) {
            searchByCoordinates()
        }
    })
}

const validateAndSearchAddress = () => {
    formRef.value.validateField('addressInput', (valid) => {
        if (valid) {
            searchByAddress()
        }
    })
}

const searchByCoordinates = async () => {
    if (!form.latitude || !form.longitude) return
    loading.value = true
    initMap(form.latitude, form.longitude)
    await fetchAddressFromLatLng(form.latitude, form.longitude)
    loading.value = false
}

const searchByAddress = async () => {
    if (!form.addressInput.trim()) return
    loading.value = true
    try {
        const encoded = encodeURIComponent(form.addressInput)
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`)
        const result = data.results[0]
        if (result) {
            const loc = result.geometry.location
            form.latitude = loc.lat
            form.longitude = loc.lng
            initMap(loc.lat, loc.lng)
        }
    } catch (err) {
        console.error('Address lookup failed', err)
    } finally {
        loading.value = false
    }
}

const submitAddress = () => {
    formRef.value.validate((valid) => {
        if (!valid) return

        emit('input-address', {
            address: form.addressInput || 'Selected Location',
            latLng: {
                lat: parseFloat(form.latitude),
                lng: parseFloat(form.longitude),
            },
        })
    })
}

const closeDialog = () => {
    emit('close')
}

const fetchAddressFromLatLng = async (lat, lng) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
        )
        const result = response.data.results[0]
        if (result) {
            form.addressInput = result.formatted_address || 'Address not found'
        }
    } catch (err) {
        console.error('Failed to fetch address from coordinates', err)
    }
}

const getVenues = async (lat, lng) => {
    store.getVenuesByCoordinates(lat, lng, 20)
}

onMounted(() => {
    const loader = document.createElement('script')
    loader.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMapCallback`
    loader.async = true
    window.initMapCallback = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                form.latitude = position.coords.latitude
                form.longitude = position.coords.longitude
                await fetchAddressFromLatLng(form.latitude, form.longitude)
                await getVenues(form.latitude, form.longitude)
                initMap(form.latitude, form.longitude)
            })
        }
    }
    document.head.appendChild(loader)
})

watch(() => props.visible, async (newVal) => {
    if (newVal && window.google?.maps) {
        await nextTick();

        if (props.lat && props.lng) {
            // EDIT MODE - use DB values
            form.latitude = props.lat;
            form.longitude = props.lng;
            form.addressInput = props.address || '';

            await fetchAddressFromLatLng(props.lat, props.lng);
            initMap(props.lat, props.lng);
        } else {
            // CREATE MODE - use current geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    form.latitude = position.coords.latitude;
                    form.longitude = position.coords.longitude;
                    await fetchAddressFromLatLng(form.latitude, form.longitude);
                    await getVenues(form.latitude, form.longitude);
                    initMap(form.latitude, form.longitude);
                });
            }
        }

        mapReady.value = true;
    } else {
        mapReady.value = false;
    }
});


</script>

<style scoped>
.my-header {
    display: flex;
    justify-content: space-between;
}

.closeColor svg {
    @apply text-[#fffff]
}

.closeColor:hover svg {
    @apply text-red-700
}
</style>
