<template>
    <!-- Sidebar -->
    <div id="sideBar" class="bg-[#1E2646] w-[200px] flex flex-col items-center lg:relative absolute z-50 h-[100vh] smooth lg:translate-x-0 -translate-x-full">
      <!-- Brand -->
      <NuxtLink :to="'/dashboard'" class="flex justify-between py-7">
        <img src="/assets/images/logo.svg" class="max-h-[70px] w-auto" alt="" />
      </NuxtLink>
      <!-- Sidebar Closer -->
      <button id="sidebarCloser" class="h-10 min-w-[40px] rounded-full bg-white lg:hidden inline-flex items-center justify-center absolute top-3 right-0 invisible opacity-0 translate-x-full smooth">
        <img src="/assets/images/backArrow.svg" class="relative right-[1px]" alt="">
      </button>
      <!-- Sidebar Navs -->
      <div class="grow flex flex-col w-full items-start">
        <el-menu
        active-text-color="#fff"
        background-color="rgb(30 38 70 / var(--tw-bg-opacity))"
        class="el-menu-vertical-demo"
        text-color="#fff"
        :router="true"
      >
        <template :route="menu.route" v-for="menu in menus">
          <el-sub-menu v-if="menu.children" >
            <template #title :route="menu.route">
              <el-icon><img :src="`../../assets/images/${menu.icon}.svg`" class="h-full w-full object-contain" alt="" /></el-icon>
              <span>{{ menu.label }}</span>
            </template>
            <el-menu-item  v-for="child in menu.children" :index="child.route" :route="child.route"  >
              <template #title>{{ child.label }}</template>
              <!-- <el-menu-item :route="menu.route">{{ child.label }}</el-menu-item> -->
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item :index="menu.route" :route="menu.route" v-else>
            <el-icon><img :src="`/assets/images/${menu.icon}.svg`" class="h-full w-full object-contain" alt="" /></el-icon>
            <span>{{ menu.label }}</span>
          </el-menu-item>
        </template>
      </el-menu>
        <a class="sidebar-nav mt-auto" @click="logout()"> 
          <div class="h-5 w-5">
            <img src="/assets/images/icon-logout.svg" class="h-full w-full object-contain" alt="" />
          </div>
          <span>Logout</span>
        </a>
      </div>
    </div>
  </template>
  
<script setup>
const auth = useAuthStore();

const menus = [
  { label: 'Dashboard', route: '/dashboard', icon: 'icon-dashboard'},
  { label: 'Players', route: '/players', icon: 'icon-players'},
  { label: 'Venues', route: '/venues', icon: 'icon-venues',children:[
    { label: 'Venues', route: '/venues'},
    { label: 'Create Venue', route: '/venues/new-venue'},
  ]},
  { label: 'Credits Purchased', route: '/CreditsPurchased', icon: 'icon-credit'},
  { label: 'Games', route: '/games', icon: 'icon-games'},
  // { label: 'Teams', route: '/teams', icon: 'icon-teams'},
  { label: 'Notifications', route: '/notifications', icon: 'icon-notifications'},
]

const errorMsg = ref('');

const logout = async () => {
  try {
    const { error } = await auth.logout();
    if (error) throw error;
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = '';
    }, 3000);
  }
};
</script>

<style lang="scss">
@mixin menu-hover-border {
  position: absolute;
  left: 0px;
  height: 100%;
  width: 0.25rem;
  --tw-bg-opacity: 1;
  background-color: rgb(11 129 64 / 1);
  transition-duration: 75ms;
  content: var(--tw-content);
  transition-timing-function: linear;
}
.el-menu {
  border-right: none !important;
  width: 100%;
  font-family: 'Regular';
  .is-active {
    --tw-bg-opacity: 1;
    background-color: rgb(17 23 45 / 1);
    background-color: rgb(17 23 45 / var(--tw-bg-opacity));

    &::before {
      @include menu-hover-border;
    }
  }
  .el-menu-item:hover {
    &::before {
      @include menu-hover-border;
    }
  }
}
</style>
  