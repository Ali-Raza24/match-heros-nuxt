<template>
    <div class="flex lg:flex-row flex-col gap-4 items-start">
        <NuxtLink :to="`/settings`"
            class="text-white text-base font-bold inline-flex items-center gap-2 py-1 mb-3 outline-none"><img
                class=" max-h-[14px] w-auto" src="/assets/images/backArrow.svg" /> Back</NuxtLink>
    </div>

    <el-form :class="'xl:max-w-[700px] max-w-full xl:pr-20 block mx-auto'" :model="store.form" label-position="top"
        :rules="basicRules" ref="ruleFormRef">
        <el-row :gutter="30">
            <el-col :span="24">
                <h3 class="text-white text-[25px] font-regular mb-11 lg:text-left text-center xl:-mt-10">{{
                    capitalizeFirstLetter(store.buttonText) }}</h3>
            </el-col>
            <el-col :sm="12" :xs="24">
                <el-form-item label="Key" prop="key">
                    <el-input v-model="store.form.key"
                        :disabled="store.buttonText === 'UPDATE A SETTING'" /></el-form-item></el-col>

            <el-col :sm="12" :xs="24">
                <el-form-item label="Value" prop="value">
                    <el-input v-model="store.form.value" type="number" /> </el-form-item></el-col>

        </el-row>

        <el-form-item>
            <el-button :class="'btn-theme'" type="success" :disabled="store.loading" v-loading="store.loading"
                @click=" store.buttonText === 'UPDATE A SETTING' ? updateForm(ruleFormRef) : onSubmit(ruleFormRef)"> {{
                    store.buttonText
                }} </el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { useSettingsStore } from "../../stores/settings";
import { onMounted, defineProps } from "vue";

const props = defineProps({
    isEditSubmit: {
        type: Boolean,
        default: false
    }
});
const store = useSettingsStore();

const { form } = store
const ruleFormRef = ref()
const loading = ref(false)
const isSubmit = ref(false)

const basicRules = ref({
    key: [
        {
            required: true,
            message: "The key field is required",
            trigger: "blur",
        },
    ],
    value: [
        {
            required: true,
            message: "The value field is required",
            trigger: "blur",
        },
    ],
});

onMounted(() => {
    isSubmit.value = props.isEditSubmit;
})

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const onSubmit = (formEl) => {

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
    })
    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            store.createSettings(form);
            loading.value = false
        } else {
            loading.value = false
            return
        }
    })
};
const updateForm = (formEl) => {
    const formData = new FormData();
    Object.keys(store.form).forEach((key) => {
        formData.append(key, store.form[key]);
    })

    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            store.updateSettings(store.form, store.form.id);
            loading.value = false
        } else {
            loading.value = false
            return
        }
    })
};

</script>
<style lang="scss">
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

.locationField .el-input__wrapper {
    @apply flex justify-center items-center;
}

.locationField .el-input__wrapper .el-input__inner {
    @apply grow-0 w-auto placeholder-[#0b8140] font-medium relative -top-[2px];
}

.locationField .el-input__wrapper .el-input__prefix .el-input__prefix-inner {
    @apply text-2xl;
}

.el-overlay {
    z-index: 100 !important;
}

// HAs value style

.locationField.hasValue .el-input__wrapper {
    @apply justify-start px-5;
}

.locationField+.btn-link {
    @apply hidden;
}

.locationField.hasValue+.btn-link {
    @apply block;
}

.locationField.hasValue+.btn-link span {
    @apply text-[#0A7F3F]
}

.locationField .el-input__wrapper .el-input__inner {
    @apply grow-0 w-auto placeholder-[#0b8140] font-medium relative -top-[2px];
}

.locationField .el-input__wrapper .el-input__prefix .el-input__prefix-inner {
    @apply text-2xl;
}

.locationField.hasValue .el-input__wrapper .el-input__prefix .el-input__prefix-inner {
    @apply hidden;
}

.locationField.hasValue .el-input__wrapper .el-input__inner {
    max-width: calc(100% - 100px);
    width: 100%;
}

@media(min-width:992px) {
    .lg\:text-left {
        text-align: left;
    }
}
</style>