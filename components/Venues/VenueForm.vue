<template>
    <div class="flex lg:flex-row flex-col gap-4 items-start">
        <NuxtLink  :to="`/venues`" class="text-white text-base font-bold inline-flex items-center gap-2 py-1 mb-3 outline-none"><img 
            class=" max-h-[14px] w-auto" src="/assets/images/backArrow.svg" /> Back</NuxtLink>
     

    </div>

    <el-form :class="'xl:max-w-[700px] max-w-full xl:pr-20 block mx-auto'" :model="store.form" label-position="top"
        :rules="basicRules" ref="ruleFormRef">
        <el-row :gutter="30">
            <el-col :span="24">
                <h3 class="text-white text-[25px] font-regular mb-11 lg:text-left text-center xl:-mt-10">{{ capitalizeFirstLetter(store.buttonText) }}</h3>
            </el-col>
            <el-col :class="'mx-auto'" :sm="8" :xs="12">
                <el-form-item>
                    <el-upload class="avatar-uploader" action="#" :show-file-list="false" accept="image/*"
                        :auto-upload="false" :on-change="handleAvatarSuccess">
                        <el-avatar :src="displayedImage" class="avatar" />
                        <div
                            class="overflow-hidden absolute bottom-6 right-2 h-11 w-11 rounded-[50px] bg-gradient-to-b from-[#0b8140] to-[#0a5229] inline-flex items-center justify-center z-20">
                            <img src="/assets/images/camera.svg" class="h-4 w-auto" alt="" />
                        </div>
                    </el-upload>
                </el-form-item>
            </el-col>
            <el-col :sm="16" :xs="24">
                <div class="relative">
                    <el-upload
                        class="avatar-uploader bg-[#1E2646] flex items-center justify-center rounded-md overflow-hidden mb-16 border border-white/5 aspect-[16/6]"
                        action="#" :show-file-list="false" :on-change="handleBannerSuccess" accept="image/*"
                        :auto-upload="false">
                        <!-- <img :src="displayedBanner" class="w-25" /> -->
                        <el-avatar :class="'relative z-10'" shape="square" :size="200" fit="fill" :src="displayedBanner" />
                        <div class="text-sm text-white absolute">Add Banner Photo</div>
                        <div
                            class="absolute left-[50%] bottom-0 -translate-x-[50%] translate-y-[50%] h-11 w-11 rounded-[50px] bg-gradient-to-b from-[#0b8140] to-[#0a5229] inline-flex items-center justify-center z-20 after:content-['Optional'] after:absolute after:top-full after:pt-2 after:text-xs after:font-regular after:text-white">
                            <img src="/assets/images/plus.svg" class="h-4 w-auto" alt="">
                        </div>
                    </el-upload>
                </div>
            </el-col>
            <el-col :sm="12" :xs="24">
                <el-form-item label="Venue Name" prop="name">
                    <el-input v-model="store.form.name" /> </el-form-item></el-col>
            <el-col :sm="12" :xs="24">
                <el-form-item label="Country" prop="country_id">
                    <el-select v-model="store.form.country_id" placeholder="Select Country" size="large">
                        <el-option v-for="item in CountriesData" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>

                </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
                <el-form-item label="Venue Phone" prop="phone">
                    <el-input v-model="store.form.phone" /> </el-form-item></el-col>
            <el-col :sm="12" :xs="24">
                <el-form-item label="Town" prop="town">
                    <el-input v-model="store.form.town" /> </el-form-item></el-col>
            <el-col :sm="12" :xs="24">
                <el-form-item label="Venue Email" prop="email">
                    <el-input v-model="store.form.email" /> </el-form-item></el-col>
            <el-col :sm="12" :xs="24">
                <el-form-item label="€ Off Peak / On Peak" prop="off_on_peak">
                    <el-input v-model="store.form.off_on_peak" /> </el-form-item></el-col>
            <el-col :sm="12" :xs="24">
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
            <el-col :sm="12" :xs="24">
                <el-form-item label="Add venue message" prop="venue_message">
                    <el-input v-model="store.form.venue_message" /> 
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item>
            <el-button :class="'btn-theme'" type="success" v-loading="store.loading"
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
        return '../../assets/images/avatarBg.svg';
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

const capitalizeFirstLetter =(string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
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
<style lang="scss">
.avatar-uploader .el-upload .el-avatar {
    width: 100%;
    height: 100%;
    background: transparent;
}

.avatar-uploader .el-upload .el-avatar img {
    width: 100% !important;
}

.avatar-uploader,
.avatar-uploader .el-upload {
    width: 100%;
    height: 100%;
}
.el-avatar.el-avatar--circle.avatar {
    aspect-ratio: 1/1;
}

.el-form--label-top .el-form-item .el-form-item__label {
    @apply text-white xl:text-base md:text-sm text-xs font-normal flex flex-row-reverse mb-2 gap-1;
}

.el-form-item__content .el-input__wrapper {
    @apply bg-transparent p-0 border-none ring-0 outline-none shadow-none rounded-md overflow-hidden bg-[#1E2646];
}

.el-input__inner {
    @apply w-full h-12 xl:text-base text-sm rounded-sm border border-white border-opacity-5 outline-none text-white px-4 pb-[1px] focus:outline-0;
}

.el-select {
    @apply w-full;
}

.el-input__suffix-inner {
    padding-right: 10px;
}

.el-select,
.el-select * {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
}

.el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
    height: auto;
}

.el-icon svg {
    color: #0b8140;
}

.el-input__prefix-inner {
    padding-left: 10px;
}

.el-input__prefix+.el-input__inner {
    padding: 0;
}

.btn-theme {
    @apply border-none inline-flex items-center justify-center whitespace-nowrap outline-none xl:h-[45px] lg:h-10 h-9 xl:px-7 lg:px-6 px-5 bg-gradient-to-b from-[#0b8140] to-[#0a5229] rounded-[50px] text-white xl:text-sm md:text-xs text-[11px] font-bold uppercase tracking-wide scale-100 active:scale-[.97] mt-5;
}
@media(min-width:992px)
{
    .lg\:text-left
    {
        text-align: left;
    }
}
</style>