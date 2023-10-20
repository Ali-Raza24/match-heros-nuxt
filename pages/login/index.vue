<template>
  <div class="relative flex items-center justify-center min-h-[100vh] w-full signinBg py-10">
        <div class="max-w-[400px] w-full flex flex-col items-center">
            <div class="block">
                <img src="/assets/images/logo.svg" class="max-h-24 md:max-h-28 lg:max-h-32 xl:max-h-40 2xl:max-h-48 w-auto" alt="" />
            </div>
            <h1 class="w-full block text-white xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold text-center 2xl:mb-9 xl:mb-8 lg:mb-7 md:mb-6 mb-5 2xl:mt-16 xl:mt-14 lg:mt-10 md:mt-8 mt-6">Sign In</h1>
            <div class="form-group">
                <label for="" class="form-label">Email</label>
                <input v-model="form.email" type="email" class="form-field">
            </div>
            <div class="form-group">
                <label for="" class="form-label">Password</label>
                <div class="relative">
                    <input v-model="form.password" type="password" class="form-field">
                    <button class="absolute top-[50%] -translate-y-[50%] right-4 z-10 p-1"><img src="/assets/images/eyeSlash.svg" alt=""></button>
                </div>
            </div>
            <button @click="userLogin" class="btn-theme w-full">Sign In</button>
            <!-- <div class="text-center mt-5 xl:mb-12 lg:mb-10 mb-5">
                <a href="#" class="inline-block text-[#6D92CA] font-bold text-sm p-2 smooth hover:text-white">Forgot Password?</a>
            </div> -->
            <!-- <div class="block text-center xl:mt-12 lg:mt-10 mt-8">
                <a href="#" class="inline-flex items-center gap-3 text-white text-base font-bold">Register <img src="/assets/images/arrow-right-green.svg" alt=""></a>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
const auth = useAuthStore();

const appConfig = useRuntimeConfig()
onMounted(() => {
  console.log('The initial count is',appConfig)
})
const form = reactive({
  email: '',
  password: ''
})

const errorMsg = ref('');

const userLogin = async () => {
  try {
    const { error,  } = await auth.signIn(form);
    if (error) throw error;
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = '';
    }, 3000);
  }
};
</script>
