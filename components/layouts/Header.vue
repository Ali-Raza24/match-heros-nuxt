<template>
      <!-- Right Panel Topbar -->
      <div class="flex items-center border-b border-b-[#283054] xl:py-4 py-3 xl:px-9 px-5">
        <button id="sidebarOpener" class="h-10 min-w-[40px] rounded-full bg-white lg:hidden inline-flex mr-3 items-center justify-center">
          <img src="/assets/images/backArrow.svg" class="rotate-180 relative right-[1px]" alt="">
        </button>
        <h6 class="text-white text-base font-bold lg:block hidden">Welcom Back!</h6>
        <div class="inline-flex items-center ml-auto">
          <div class="flex items-center xl:mr-5 border border-[#283054] rounded-3xl px-5 lg:w-[400px] w-auto">
            <input type="text"
              class="bg-transparent border-none outline-none h-10 text-white placeholder:text-white text-xs font-regular w-full"
              placeholder="Search">
            <button class="h-10 ml-3">
              <img src="/assets/images/search.svg" alt="">
            </button>
          </div>
          <button class="h-10 w-10 bg-white xl:inline-flex hidden items-center justify-center rounded-[50px] border-none">
            <img src="/assets/images/bell.svg" class="max-h-5 w-auto" alt="">
          </button>
          <div class="xl:ml-10 ml-3 relative">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link" style="display: flex; align-items: center;">
                <span class="mr-2 text-white font-bold text-base xl:block hidden">John Smith</span>
                <el-avatar src="/assets/images/person.jpg" ></el-avatar>
                <img src="/assets/images/caret-down.svg" class="h-[6px] w-auto ml-2" alt="">
              </span>
              <template #dropdown >
                <el-dropdown-menu>
                  <div class="flex items-center gap-3 py-4 border-b border-b-white/10 mb-2">
                <img src="/assets/images/person.jpg" class="rounded-[50px] h-7 min-w-[28px] object-cover" alt="">
                <span class="text-black font-light text-xs block">John Smith</span>
              </div>
                  <el-dropdown-item v-for=" profile in profileDropdown">
                    <el-icon><img :src="`/assets/images/${profile.icon}.svg`" class="h-full w-full object-contain" alt="" /></el-icon>
                    <span>{{ profile.label }}</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
  </template>
  
<script setup>

  const profileDropdown = [
    { label: 'Profile', icon: 'icon-players', route: '/profile' },
    { label: 'Settings', icon: 'icon-dashboard', route: '/settings' },
    { label: 'Logout', icon: 'icon-logout', route: '/logout' },
  ]
  
</script>
  <style>
  </style>
  