<template>
  <div class="wh-full layout-left" :class="classObj">
    <!-- 公用侧边栏 -->
    <Sidebar class="sidebar-container" />
    <!-- 左侧和顶部布局 -->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <NavBar />
        <TagsView v-if="showTagsView" />
      </div>
      <AppMain />
      <Settings v-if="defaultSettings.showSettings" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Layout",
});

import { useAppStore, useSettingsStore } from "@/store";
import defaultSettings from "@/settings";
import { useGuide } from "@/hooks/useGuide";

// 第一次进系统，会自动化展示，后续不在自动展示，设置里有点击入口
useGuide(true);

const appStore = useAppStore();
const settingsStore = useSettingsStore();

const fixedHeader = computed(() => settingsStore.fixedHeader); // 是否固定header
const showTagsView = computed(() => settingsStore.tagsView); // 是否显示tagsView

const classObj = computed(() => ({
  hideSidebar: !appStore.sidebar.opened,
  openSidebar: appStore.sidebar.opened,
}));

const width = useWindowSize().width;
const WIDTH = 1200; // 响应式布局容器固定宽度  大屏（>=1200px） 中屏（>=992px） 小屏（>=768px）

watchEffect(() => {
  if (width.value < WIDTH) {
    appStore.closeSideBar();
  } else {
    appStore.openSideBar();
  }
});

</script>

<style lang="scss" scoped>
@import "@/styles/layout";
</style>
