<template>
    <el-form :model="store.form" label-position="top" :rules="basicRules" ref="ruleFormRef">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item>
                    <el-upload class="avatar-uploader" action="#" :show-file-list="false" accept="image/*"
                        :auto-upload="false" :on-change="handleAvatarSuccess">
                        <el-avatar :src="displayedImage" :size="160" class="avatar" />
                        <img src="../../assets/images/camera.svg" class="h-4 w-auto" alt="" />
                    </el-upload>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="handleBannerSuccess"
                    accept="image/*" :auto-upload="false">
                    <!-- <img :src="displayedBanner" class="w-25" /> -->
                    <el-avatar shape="square" :size="200" fit="fill" :src="displayedBanner" />

                    <img src="../../assets/images/plus.svg" class="h-4 w-auto" alt="" />
                </el-upload>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Venue Name" prop="name">
                    <el-input v-model="store.form.name" /> </el-form-item></el-col>
            <el-col :span="12">
                <el-form-item label="Country" prop="country_id">
                    <el-select v-model="store.form.country_id" class="m-2" placeholder="Select Country" size="large">
                        <el-option v-for="item in CountriesData" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>

                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Venue Phone" prop="phone">
                    <el-input v-model="store.form.phone" /> </el-form-item></el-col>
            <el-col :span="12">
                <el-form-item label="Town" prop="town">
                    <el-input v-model="store.form.town" /> </el-form-item></el-col>
            <el-col :span="12">
                <el-form-item label="Venue Email" prop="email">
                    <el-input v-model="store.form.email" /> </el-form-item></el-col>
            <el-col :span="12">
                <el-form-item label="€ Off Peak / On Peak" prop="off_on_peak">
                    <el-input v-model="store.form.off_on_peak" /> </el-form-item></el-col>
            <el-col :span="12">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Open Time" prop="open_time">
                            <el-time-picker v-model="store.form.open_time" placeholder="Pick a time" format="HH:mm"
                                value-format="HH:mm" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Close Time" prop="close_time">
                            <el-time-picker v-model="store.form.close_time" placeholder="Pick a time" format="HH:mm"
                                value-format="HH:mm" />
                        </el-form-item></el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Add venue message" prop="venue_message">
                    <el-input v-model="store.form.venue_message" /> </el-form-item></el-col>
        </el-row>

        <el-form-item>
            <el-button type="success" v-loading="loading"
                @click=" store.buttonText === 'UPDATE A VENUE' ? updateForm(ruleFormRef) : onSubmit(ruleFormRef)"> {{ store.buttonText
                }} </el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { useVenueStore } from "../../stores/venues";
const store = useVenueStore();
// console.log("Dsa",store)
// const form = reactive(store.form);
const { form } = store
const ProfileImage = ref("");
const BannerImage = ref("");
const ruleFormRef = ref()
const loading = ref(false)

const basicRules = ref({
    name: [
        {
            type: "text",
            required: true,
            message: "The name field is required",
            trigger: "blur",
        },
    ],
    email: [
        {
            type: "email",
            required: true,
            message: "The email field is required",
            trigger: "blur",
        },
    ],
    country_id: [
        {
            required: true,
            message: "The country field is required",
            trigger: "change",
        },
    ],
    phone: [
        {
            type: "text",
            required: true,
            message: "The phone field is required",
            trigger: "blur",
        },
    ],
    town: [
        {
            type: "text",
            required: true,
            message: "The town field is required",
            trigger: "blur",
        },
    ],
    off_on_peak: [
        {
            required: true,
            message: "The off and on peak field is required",
            trigger: "blur",
        },
    ],
    open_time: [
        {
            required: true,
            message: "The open time field is required",
            trigger: "change",
        },
    ],
    close_time: [
        {
            required: true,
            message: "The close time field is required",
            trigger: "change",
        },
    ],
    venue_message: [
        {
            type: "text",
            required: true,
            message: "The venue message field is required",
            trigger: "blur",
        },
    ],
});



const displayedImage = computed(() => {
    if (ProfileImage.value) {
        return ProfileImage.value;
    } else if (store.form.photo) {
        return store.form.photo;
    } else {
        return 'https://empty';
    }
});
const displayedBanner = computed(() => {
    if (BannerImage.value) {
        return BannerImage.value;
    } else if (store.form.banner) {
        return store.form.banner;
    } else {
        return 'https://empty';
    }
});


const handleAvatarSuccess = (raw, file) => {
    store.form.photo = raw.raw
    ProfileImage.value = URL.createObjectURL(raw.raw);
};
const handleBannerSuccess = (raw, file) => {
    store.form.banner = raw.raw
    BannerImage.value = URL.createObjectURL(raw.raw);
};


store.getCountry()

const CountriesData = computed(() => {
    return store.getCountries()
});

const onSubmit = (formEl) => {
    // loading.value = true
    // store.resetForm();
    // return;
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
        console.log(form[key])
        formData.append(key, form[key]);
    })
    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            store.createVenues(form);
            // formEl.resetFields()
            // ProfileImage.value=''
            // BannerImage.value=''
            loading.value = false
        } else {
            loading.value = false
            return
        }
    })
};
const updateForm = (formEl) => {
    // loading.value = true
    // store.resetForm();
    // return;
    const formData = new FormData();
    Object.keys(store.form).forEach((key) => {
        formData.append(key, store.form[key]);
    })
   console.log("form", store.form)
    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            store.updateVenue(store.form,store.form.id);
            // formEl.resetFields()
            // ProfileImage.value=''
            // BannerImage.value=''
            loading.value = false
        } else {
            loading.value = false
            return
        }
    })
};

</script>
