<template>
    <NuxtLayout>
        <el-form :model="form" label-position="top" :rules="basicRules" ref="ruleFormRef">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item>
                        <el-upload class="avatar-uploader" action="#" :show-file-list="false"
                            :on-success="handleAvatarSuccess" accept="image/*">
                            <el-avatar v-if="ProfileImage" :src="ProfileImage" :size="160" src="https://empty"
                                class="avatar" />
                            <img src="../../assets/images/camera.svg" class="h-4 w-auto" alt="" />
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-success="handleBannerSuccess"
                        accept="image/*">
                        <img v-if="BannerImage" :src="BannerImage" class="w-25" />
                        <img src="../../assets/images/plus.svg" class="h-4 w-auto" alt="" />
                    </el-upload>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Venue Name" prop="name">
                        <el-input v-model="form.name" /> </el-form-item></el-col>
                <el-col :span="12">
                    <el-form-item label="Country" prop="country_id">
                        <el-input v-model="form.country_id" /> </el-form-item></el-col>
                <el-col :span="12">
                    <el-form-item label="Venue Phone" prop="phone">
                        <el-input v-model="form.phone" /> </el-form-item></el-col>
                <el-col :span="12">
                    <el-form-item label="Town" prop="town">
                        <el-input v-model="form.town" /> </el-form-item></el-col>
                <el-col :span="12">
                    <el-form-item label="Venue Email" prop="email">
                        <el-input v-model="form.email" /> </el-form-item></el-col>
                <el-col :span="12">
                    <el-form-item label="€ Off Peak / On Peak" prop="off_on_peak">
                        <el-input v-model="form.off_on_peak" /> </el-form-item></el-col>
                <el-col :span="12">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Open Time" prop="open_time">
                                <el-time-picker v-model="form.open_time" placeholder="Pick a time" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Close Time" prop="close_time">
                                <el-time-picker v-model="form.close_time" placeholder="Pick a time" />
                            </el-form-item></el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Add venue message" prop="venue_message">
                        <el-input v-model="form.venue_message" /> </el-form-item></el-col>
            </el-row>

            <el-form-item>
                <el-button type="success" @click="onSubmit(ruleFormRef)">CREATE A VENUE</el-button>
            </el-form-item>
        </el-form>
    </NuxtLayout>
</template>

<script setup>
import { useVenueStore } from "../../stores/venues";

const form = reactive({
    name: "",
    country_id: "",
    phone: "",
    town: "",
    email: "",
    off_on_peak: "",
    open_time: "",
    close_time: "",
    venue_message: "",
});
const ProfileImage = ref("");
const BannerImage = ref("");
const ruleFormRef = ref()

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
            trigger: "blur",
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
const handleAvatarSuccess = (response, uploadFile) => {
    ProfileImage.value = URL.createObjectURL(uploadFile.raw);
};
const handleBannerSuccess = (response, uploadFile) => {
    BannerImage.value = URL.createObjectURL(uploadFile.raw);
};
const store = useVenueStore();

const onSubmit = (formEl) => {
    form.photo= ProfileImage.value
    // form.value.banner= BannerImage.value
    
    console.log('ddasdasda', ProfileImage)

    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
    store.createVenues(form);


    console.log("submit!", form);
};
</script>
