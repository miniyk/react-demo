<template>
  <div class="login-container">
    <!-- 顶部，暗夜模式和国际化入口 -->
    <div class="absolute-lt flex-x-end p-3 w-full">
      <el-switch
        v-model="isDark"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
        @change="toggleTheme"
      />
      <lang-select class="ml-3 cursor-pointer" size="1.8em"/>
    </div>
    <!-- 登录表单,密码登录主流程入口 -->
    <PwdLogin
      v-if="!isResetRiskPwd" 
      v-model:isResetRiskPwd="isResetRiskPwd"
      v-model:temporaryToken="temporaryToken"
    />
    <!-- pass反馈旧密码存在风险，让用户被动设置新密码入口 -->
    <ResetRiskPwd 
      v-else 
      v-model:isResetRiskPwd="isResetRiskPwd"
      v-model:temporaryToken="temporaryToken"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Login",
});
import { useSettingsStore } from "@/store";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { ThemeEnum } from "@/enums/common/ThemeEnum";

// Stores
const settingsStore = useSettingsStore();
// Reactive states
const isDark = ref(settingsStore.theme === ThemeEnum.DARK);
const icpVisible = ref(true);
// pass登录认证无误情况下，发现用户密码处于危险状态，触发riskPwdCallBack，此回调方法需要让用户进入设置新密码流程，展示ResetRiskPwd组件
const isResetRiskPwd = ref(false);
// setPwd需要的时效性TOKEN
const temporaryToken = ref('');
const { height } = useWindowSize();

/**
 * 主题切换
 */

const toggleTheme = () => {
  const newTheme =
    settingsStore.theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
  settingsStore.changeTheme(newTheme);
};

/**
 * 根据屏幕宽度切换设备模式
 */

watchEffect(() => {
  if (height.value < 600) {
    icpVisible.value = false;
  } else {
    icpVisible.value = true;
  }
});

</script>

<style lang="scss" scoped>
html.dark .login-container {
  background: url("@/assets/images/login-bg-dark.jpg") no-repeat center right;
}

.login-container {
  overflow-y: auto;
  background: url("@/assets/images/login-bg.jpg") no-repeat center right;
  @apply wh-full flex-center;
}
</style>