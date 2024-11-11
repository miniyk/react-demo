<template>
  <!-- 账号密码登录 -->
  <el-card class="!border-none !bg-transparent !rounded-4% w-100 <sm:w-85">
    <div class="text-center relative">
      <h2>{{ $t('login.title') }}</h2>
      <el-tag class="ml-2 absolute-rt pos-top-[6px]">{{ defaultSettings.version }}</el-tag>
    </div>

    <el-form
      ref="loginFormRef"
      :model="loginData"
      :rules="loginRules"
      class="login-form"
    >
      <!-- 账号 -->
      <el-form-item prop="username">
        <div class="flex-y-center w-full">
          <svg-icon icon-class="user" class="mx-2" />
          <el-input
            ref="username"
            v-model="loginData.username"
            :placeholder="$t('login.username')"
            name="username"
            size="large"
            class="h-[48px]"
          />
        </div>
      </el-form-item>

      <!-- 密码 -->
      <el-tooltip
        :visible="isCapslock"
        :content="$t('login.capsLock')"
        placement="right"
      >
        <el-form-item prop="password">
          <div class="flex-y-center w-full">
            <svg-icon icon-class="lock" class="mx-2" />
            <el-input
              v-model="loginData.password"
              :placeholder="$t('login.password')"
              type="password"
              name="password"
              @keyup="checkCapslock"
              @keyup.enter="onLogin"
              size="large"
              class="h-[48px] pr-2"
              show-password
            />
          </div>
        </el-form-item>
      </el-tooltip>

      <!-- 图形验证码 -->
      <el-form-item prop="captchaCode">
        <div class="flex-y-center w-full">
          <svg-icon icon-class="captcha" class="mx-2" />
          <el-input
            v-model="loginData.captchaCode"
            auto-complete="off"
            size="large"
            class="flex-1"
            :placeholder="$t('login.captchaCode')"
            @keyup.enter="onLogin"
          />
          <el-image
            @click="getCaptcha"
            :src="captchaUrl"
            class="rounded-tr-md rounded-br-md cursor-pointer h-[32px] w-[84px]"
          />
        </div>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button
        :loading="loading"
        type="primary"
        size="large"
        class="w-full"
        @click.prevent="onLogin"
        >{{ $t("login.login") }}
      </el-button>
    </el-form>
    <span>账户：18483284646 </span>
    <span> 密码：qwer1234</span>
  </el-card>
</template>

<script setup lang="ts">
import { LocationQuery, LocationQueryValue, useRoute } from "vue-router";
import router from "@/router";
import defaultSettings from "@/settings";
import { useSettingsStore } from "@/store";
import type { loginPwdType, sucCallBackParams, failCallBackParams, riskPwdCallBackParams } from '@/utils/passSDK'
import { onRefreshCaptcha, onLoginPwd } from '@/utils/passSDK';
import { setTokenApi } from "@/api/auth";

defineOptions({
  name: "PwdLogin",
});
const isResetRiskPwd = defineModel('isResetRiskPwd');
const temporaryToken = defineModel('temporaryToken');

// Stores
const settingsStore = useSettingsStore();

// Internationalization
const { t } = useI18n();
const route = useRoute();
// Reactive states
const loading = ref(false); // 按钮loading
const isCapslock = ref(false); // 是否大写锁定
const captchaUrl = ref(); // 验证码图片Base64字符串
const loginFormRef = ref(ElForm); // 登录表单ref
const loginInfoInit = {
  username: "",
  password: "",
  captchaCode: "",
}
const loginData = ref<{username: loginPwdType["username"], password: loginPwdType["password"], captchaCode: loginPwdType["captcha"]}>(loginInfoInit);

const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.username"),
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.password"),
      },
    ],
    captchaCode: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.captchaCode"),
      },
    ],
  };
});

/**
 * 获取验证码
 */
function getCaptcha() {
  onRefreshCaptcha(captchaUrl);
}

/**
 * 登录成功回调
 */
function loginSuccessCallBack(data: sucCallBackParams) {
  onRefreshCaptcha(captchaUrl);
  const { stoken } = data;
  // 服务端种token，本地存登录状态
  setTokenApi({STOKEN: stoken})
  .then((res: any) => {
    if (res.data) {
      ElMessage({
        type: 'success',
        message: t("login.loginSuc"),
        duration: 1500,
      });
      localStorage.setItem("accessToken", stoken);
      // 跳转登录前的页面
      const query: LocationQuery = route.query;
      const redirect = (query.redirect as LocationQueryValue) ?? "/";
      const [path, redirectQuery] = redirect.split('?');
      const param:any = {};
      if(redirectQuery) {
        param[redirectQuery.split('=')[0]] = parseInt(redirectQuery.split('=')[1]);
      } 
      const otherQueryParams = Object.keys(query).reduce(
        (acc: any, cur: string) => {
          if (cur !== "redirect") {
            acc[cur] = query[cur];
          }
          return acc;
        },
        {}
      );
      router.push({ path, query: {...param, ...otherQueryParams} });
      // 展示水印
      settingsStore.changeWatermark(true);
    }
  })
  .finally(() => {
    loading.value = false;
  })
}

/**
 * 登录失败回调
 */
function loginFailCallBack(data: failCallBackParams) {
  ElMessage.error(data.errmsg);
  onRefreshCaptcha(captchaUrl);
  loading.value = false;
}

/**
 * 登录认证无误情况下，发现用户密码处于危险状态，触发此回调方法
 */
function riskPwdCallBack(data: riskPwdCallBackParams) {
  isResetRiskPwd.value = true;
  temporaryToken.value = data.token;
}

/**
 * 登录
 */
function onLogin() {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      // isResetRiskPwd.value = true;
      loading.value = true;
      const params: loginPwdType = {
        captcha: loginData.value.captchaCode,
        password: loginData.value.password,
        username: loginData.value.username,
        failCallBack: loginFailCallBack,
        successCallBack: loginSuccessCallBack,
        refreshCaptchaCB: () => { onRefreshCaptcha(captchaUrl) },
        riskPwdCallBack: riskPwdCallBack,
      }
      onLoginPwd(params);
    }
  });
}

/**
 * 检查输入大小写
 */
function checkCapslock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapslock.value = event.getModifierState("CapsLock");
  }
}

onMounted(() => {
  onRefreshCaptcha(captchaUrl);
});
</script>

<style lang="scss" scoped>
.login-form {
  padding: 30px 10px;
}

.el-form-item {
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      /* 通过延时渲染背景色变相去除背景颜色 */
      transition: background-color 1000s ease-in-out 0s;
    }
  }
}
</style>