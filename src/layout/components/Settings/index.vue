<template>
  <el-drawer
    v-model="settingsVisible"
    size="300"
    :title="$t('layout.settings.project')"
  >
    <el-divider>{{ $t("layout.settings.theme") }}</el-divider>

    <div class="flex-center">
      <el-switch
        v-model="isDark"
        :active-icon="Moon"
        :inactive-icon="Sunny"
        @change="changeTheme"
      />
    </div>

    <el-divider>{{ $t("layout.settings.interface") }}</el-divider>

    <div class="settings-option">
      <span class="text-xs">{{ $t("layout.settings.themeColor") }}</span>
      <ThemeColorPicker
        v-model="settingsStore.themeColor"
        @update:model-value="changeThemeColor"
      />
    </div>

    <div class="settings-option">
      <span class="text-xs">{{ $t("layout.settings.tagsView") }}</span>
      <el-switch v-model="settingsStore.tagsView" />
    </div>

    <div class="settings-option">
      <span class="text-xs">{{ $t("layout.settings.fixedHeader") }}</span>
      <el-switch v-model="settingsStore.fixedHeader" />
    </div>

    <div class="settings-option">
      <span class="text-xs">{{ $t("layout.settings.sidebarLogo") }}</span>
      <el-switch v-model="settingsStore.sidebarLogo" />
    </div>

    <el-divider>{{ $t("layout.settings.guide") }}</el-divider>
    <div class="flex-center">
      <el-button type="primary" @click="guide">
        <el-icon><Compass /></el-icon>{{ $t("layout.settings.start") }}
      </el-button>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
defineOptions({
  name: "Settings",
});

import { useSettingsStore } from "@/store";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { ThemeEnum } from "@/enums/common/ThemeEnum";
import { useGuide } from "@/hooks/useGuide";

const onShowGuide = useGuide();
const settingsStore = useSettingsStore();

const settingsVisible = computed({
  get() {
    return settingsStore.settingsVisible;
  },
  set() {
    settingsStore.settingsVisible = false;
  },
});

/**
 * 切换主题颜色
 */
function changeThemeColor(color: string) {
  settingsStore.changeThemeColor(color);
}

/**
 * 打开引导
 */
function guide() {
  settingsStore.settingsVisible = false;
  onShowGuide();
}

/**
 * 切换主题
 */
const isDark = ref<boolean>(settingsStore.theme === ThemeEnum.DARK);
const changeTheme = (val: any) => {
  isDark.value = val;
  settingsStore.changeTheme(isDark.value ? ThemeEnum.DARK : ThemeEnum.LIGHT);
};
</script>

<style lang="scss" scoped>
.settings-option {
  @apply py-1 flex-x-between;
}
</style>