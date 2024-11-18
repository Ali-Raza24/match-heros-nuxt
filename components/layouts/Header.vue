<template>
  <!-- Right Panel Topbar -->
  <div class="flex items-center border-b border-b-[#283054] xl:py-4 py-3 xl:px-9 px-5">
    <button id="sidebarOpener"
      class="h-10 min-w-[40px] rounded-full bg-white lg:hidden inline-flex mr-3 items-center justify-center">
      <img src="/assets/images/backArrow.svg" class="rotate-180 relative right-[1px]" alt="">
    </button>
    <h6 class="text-white text-base font-bold lg:block hidden">Welcom Back!</h6>
    <div class="inline-flex items-center ml-auto">
      <div class="flex items-center xl:mr-5 border border-[#283054] rounded-3xl px-5 lg:w-[400px] w-auto">
        <!-- <input type="text"
          class="bg-transparent border-none outline-none h-10 text-white placeholder:text-white text-xs font-regular w-full"
          placeholder="Search"> -->
        <el-input class="h-search" v-model="searchQuery" placeholder="Search..." @input="searchData" />
        <!-- <button class="h-10 ml-3">
          <img src="/assets/images/search.svg" alt="">
        </button> -->
      </div>
      <button class="h-10 w-10 bg-white xl:inline-flex hidden items-center justify-center rounded-[50px] border-none">
        <img src="/assets/images/bell.svg" class="max-h-5 w-auto" alt="">
      </button>
      <div class="xl:ml-10 ml-3 relative">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" style="display: flex; align-items: center;">
            <span class="mr-2 text-white font-bold text-base xl:block hidden">{{ auth.authUser.name }}</span>
            <el-avatar src="/assets/images/person.jpg"></el-avatar>
            <img src="/assets/images/caret-down.svg" class="h-[6px] w-auto ml-2" alt="">
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <div class="flex items-center gap-3 py-3 border-b border-b-white/10 mb-2 px-4">
                <img src="/assets/images/person.jpg" class="rounded-[50px] h-7 min-w-[28px] object-cover" alt="">
                <span class="text-white font-light text-xs block">{{ auth.authUser.name }}</span>
              </div>
              <el-dropdown-item v-for=" profile in profileDropdown" @click="handleItemClick(profile)">
                <el-icon><img :src="`/assets/images/${profile.icon}.svg`" class="h-full w-full object-contain"
                    alt="" /></el-icon>
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
const auth = useAuthStore();
const playerStore = usePlayerStore();
const venueStore = useVenueStore();
const gameStore = useGameStore();
const notificationsStore = useNotificationsStore();


const searchQuery = ref('')
const delayTimer = ref(null)

const profileDropdown = [
  // { label: 'Profile', icon: 'icon-players', route: '/profile' },
  // { label: 'Settings', icon: 'icon-dashboard', route: '/settings' },
  { label: 'Logout', icon: 'icon-logout', route: '/logout' },
]

const handleItemClick = (profile) => {
  if (profile.label === 'Logout') {
    logout();
  } else {
  }
}
const callApiMethod = () => {

  setTimeout(() => {
    // store.getSearchData(searchQuery.value)
    // const data = store.returnSearchData()
    if (useRoute().name == 'players') {
      playerStore.setSearchQuery(searchQuery.value)
      playerStore.setCurrentPage(1)
      playerStore.getPlayers(searchQuery.value);
    } else if (useRoute().name == 'games') {
      gameStore.setSearchQuery(searchQuery.value)
      gameStore.setCurrentPage(1)
      gameStore.getGame(searchQuery.value)
    } else if (useRoute().name == 'venues') {
      venueStore.setSearchQuery(searchQuery.value)
      venueStore.setCurrentPage(1)
      venueStore.getVenues(searchQuery.value);
    }
    else if (useRoute().name == 'notifications') {
      notificationsStore.setSearchQuery(searchQuery.value)
      notificationsStore.setCurrentPage(1)
      notificationsStore.getNotifications(searchQuery.value);
    }
    else if (useRoute().name == 'reports') {
      useReportStore().setSearchQuery(searchQuery.value)
      useReportStore().setCurrentPage(1)
      useReportStore().getReports(searchQuery.value);
    }
    else if (useRoute().name == 'reports-id') {
      useReportStore().setSearchQuery(searchQuery.value)
      useReportStore().setCurrentPage(1)
      useReportStore().getSingleReports(useRoute().params.id, useReportStore().activeName);
    }

  }, 0);
}
const searchData = () => {
  if (delayTimer.value) {
    clearTimeout(delayTimer.value);
  }
  delayTimer.value = setTimeout(() => {
    callApiMethod();
  }, 500);
}

const logout = async () => {
  await auth.logout();
}
</script>
<style lang="scss">
.el-dropdown-menu,
.el-dropdown__popper.el-popper {
  background-color: #1e2646;
  border: none !important;
}

.el-dropdown-menu {
  min-width: 160px;
}

.el-dropdown-menu .el-dropdown-menu__item {
  color: #fff;
  gap: 10px;
  background-color: transparent;
}

.el-dropdown-menu__item:hover,
.el-dropdown-menu__item:not(.is-disabled):focus {
  background-color: transparent !important;
  color: #fff !important;
}

.el-dropdown-menu__item:hover span {
  font-weight: bold;
  color: #fff;
}

.el-popper__arrow {
  display: none;
}

.h-search {
  .el-input__wrapper {
    background-color: transparent;
    box-shadow: none;

    input {
      min-height: 40px;
      color: #fff;
    }
  }
}
</style>