<template>
  <div :class="{ 'has-logo': sidebarLogo }">
    <SidebarLogo v-if="sidebarLogo" :collapse="!appStore.sidebar.opened" />
    <el-scrollbar>
      <SidebarMenu :menu-list="permissionStore.routes" />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Sidebar",
});

import { useSettingsStore, usePermissionStore, useAppStore } from "@/store";

const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();

const sidebarLogo = computed(() => settingsStore.sidebarLogo);
</script>

<style lang="scss" scoped>
.has-logo {
  .el-scrollbar {
    height: calc(100vh - $navbar-height);
  }
}
</style>
