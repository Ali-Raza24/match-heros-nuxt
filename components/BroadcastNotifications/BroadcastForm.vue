<template>
    <div class="flex lg:flex-row flex-col gap-4 items-start">
        <NuxtLink :to="`/settings`"
            class="text-white text-base font-bold inline-flex items-center gap-2 py-1 mb-3 outline-none"><img
                class=" max-h-[14px] w-auto" src="/assets/images/backArrow.svg" /> Back</NuxtLink>
    </div>

    <el-form :class="'xl:max-w-[700px] max-w-full xl:pr-20 block mx-auto'" :model="store.form" label-position="top"
        :rules="store.basicRules" ref="ruleFormRef">
        <el-row :gutter="30">
            <el-col :span="24">
                <el-form-item label="Broadcast Timing" prop="broadcast_timing">
                    <el-radio-group v-model="store.form.broadcast_timing" @change="handleBroadcastTimingChange">
                        <el-radio label="now">Now</el-radio>
                        <el-radio label="scheduled">Scheduled</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Message" prop="message">
                    <el-input v-model="store.form.message" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Notification Types" prop="notification_types">
                    <el-select v-model="store.form.notification_types" multiple>
                        <el-option v-for="type in store.notificationTypes" :key="type.value" :label="type.label"
                            :value="type.value" />
                    </el-select>
                </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
                <el-form-item label="Broadcast Start Date & Time" prop="broadcast_start_date">
                    <el-date-picker class="custom-date-picker" disabled v-model="store.form.broadcast_start_date"
                        format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" type="datetime"
                        :disabled-date="store.disablePastDates" />
                </el-form-item>
            </el-col> -->
            <el-col :span="12" v-if="store.form.notification_types.includes('broadcast')">
                <el-form-item label="Broadcast End Date & Time" prop="broadcast_end_date">
                    <el-date-picker v-model="store.form.broadcast_end_date" format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss" type="datetime"  :disabled-date="store.disablePastDates"/>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Category" prop="category">
                    <el-select v-model="store.form.category">
                        <el-option v-for="type in store.category" :key="type.value" :label="type.label"
                            :value="type.value" />
                    </el-select> </el-form-item>
            </el-col>
            <el-col :span="24" v-if="store.form.broadcast_timing === 'scheduled'">  
                <el-form-item label="Schedule Date & Time" prop="schedule_start_date">
                    <el-date-picker class="custom-date-picker" v-model="store.form.schedule_start_date"
                        format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" type="datetime"
                        :disabled-date="store.disablePastDates" />
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Users" prop="filter_users">
                    <el-select v-model="store.selectFilterUsers">
                        <el-option v-for="recipient in store.filterUsers" :key="recipient.value"
                            :label="recipient.label" :value="recipient.value" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24" v-if="store.selectFilterUsers === 'specific'">
                <el-form-item label="Users" prop="users">
                    <el-select v-model="store.form.recipients" multiple filterable>
                        <el-option v-for="user in store.users" :key="user.id" :label="user.name" :value="user.id">
                            <template #default>
                                <div class="flex items-center gap-2">
                                    <el-avatar :src="user.images.avatar" size="small"></el-avatar>
                                    <span>{{ user.name }}</span>
                                </div>
                            </template>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>



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
import { useBroadcastStore } from "../../stores/broadcasts";
import { onMounted, defineProps } from "vue";

const props = defineProps({
    isEditSubmit: {
        type: Boolean,
        default: false
    }
});
const store = useBroadcastStore();

const { form } = store
const ruleFormRef = ref()
const loading = ref(false)
const isSubmit = ref(false)

onMounted(() => {
    store.getPlayers()
    isSubmit.value = props.isEditSubmit;
})

const onSubmit = (formEl) => {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
    })
    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            store.createBroadcast(form);
            loading.value = false
        } else {
            loading.value = false
            return
        }
    })
};

const handleBroadcastTimingChange = () => {
    store.form.notification_types = []
}

</script>
<style lang="scss">
.el-picker-panel__body .el-date-picker__time-header .el-date-picker__editor-wrap .el-input__wrapper input {
    color: black !important;
}

.el-date-table td .el-date-table-cell {
    color: black !important;
}

.el-date-table th {
    color: white !important;
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