<template>
    <div class="relative flex items-center justify-center min-h-[100vh] w-full signinBg py-10">
        <div class="max-w-[400px] w-full flex flex-col items-center">
            <div class="block">
                <img src="assets/images/logo.svg" class="max-h-24 md:max-h-28 lg:max-h-32 xl:max-h-40 2xl:max-h-48 w-auto" alt="" />
            </div>
        </div>

        <slot />
    </div>
</template>
