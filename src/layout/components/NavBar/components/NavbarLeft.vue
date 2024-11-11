<template>
  <div class="flex">
    <Hamburger
      :is-active="appStore.sidebar.opened"
      @toggle-click="toggleSideBar"
    />
    <Breadcrumb />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "NavbarLeft",
});
import { useAppStore } from "@/store";

const appStore = useAppStore();

function toggleSideBar() {
  appStore.toggleSidebar();
}
</script>
