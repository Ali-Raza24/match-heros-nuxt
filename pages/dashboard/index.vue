<template>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
            >
            
                <div v-for="(item, index) in items" :key="item.name">
                    <el-menu-item :index="index + 1" v-if="!item.childrens?.length">
                        {{ item.name }}
                    </el-menu-item>
                    <el-sub-menu :index="index + 1" v-if="item.childrens?.length">
                        <template #title>
                            <span>{{ item.name }}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(subitem, i) in item.childrens" :index="(index + 1) + '-' + (i + 1)">
                                {{ subitem.name}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </div>
            </el-menu>
        </el-aside>
        <el-container>
          <el-header>Header</el-header>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const items = [
    {
        name: "Dashboard",
        value: 'dashboard'
    },
    {
        name: "Players",
        value: 'players'
    },
    {
        name: "Vanues",
        value: 'vanues',
        childrens:[
            {
                name: 'Create Venue',
                value: 'create-venue'
            }
        ]
    },
    {
        name: "Credit Purchased",
        value: 'credits'
    },
    {
        name: "Games",
        value: 'games'
    },
    {
        name: "Teams",
        value: 'teams'
    },
    {
        name: "Notifications",
        value: 'notifications'
    }
]
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
