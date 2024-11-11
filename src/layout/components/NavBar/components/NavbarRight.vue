<template>
  <div class="flex">
    <div class="setting-item" @click="toggle" id='screenFull'>
      <svg-icon
        :icon-class="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"
      />
    </div>
    
    <!-- 语言选择 -->
    <lang-select class="setting-item" id="translation" />
    <!-- 用户信息 -->
    <el-dropdown class="setting-item" trigger="click" id="userInfo">
      <div class="flex-center">
        <span>{{ userStore.user.userName }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item divided @click="logout">
            {{ $t("layout.navbar.logout") }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 设置 -->
    <template v-if="defaultSettings.showSettings">
      <div class="setting-item" @click="settingStore.settingsVisible = true" id="setting">
        <svg-icon icon-class="setting" />
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "NavbarRight",
});
import {
  useTagsViewStore,
  useUserStore,
  useSettingsStore,
} from "@/store";
import defaultSettings from "@/settings";

const tagsViewStore = useTagsViewStore();
const userStore = useUserStore();
const settingStore = useSettingsStore();

const route = useRoute();
const router = useRouter();

const { t } = useI18n();

const { isFullscreen, toggle } = useFullscreen();

/**
 * 注销
 */
function logout() {
  ElMessageBox.confirm(t("layout.logout.message"), t("layout.logout.title"), {
    confirmButtonText: t("common_button_confirm"),
    cancelButtonText: t("common_button_cancel"),
    type: "warning",
    lockScroll: false,
  }).then(() => {
    userStore
      .logout()
      .then(() => {
        tagsViewStore.delAllViews();
      })
      .then(() => {
        router.push(`/login?redirect=${route.fullPath}`);
      });
  });
}
</script>
<style lang="scss" scoped>
.setting-item {
  display: inline-block;
  min-width: 35px;
  height: $navbar-height;
  line-height: $navbar-height;
  color: var(--el-text-color);
  text-align: center;
  cursor: pointer;

  &:hover {
    background: rgb(0 0 0 / 10%);
  }
}

.dark .setting-item:hover {
  background: rgb(255 255 255 / 20%);
}
</style>