<template>
  <!-- 风险密码重设 -->
  <el-card class="!border-none !bg-transparent !rounded-4% w-100 <sm:w-85">
    <div class="pl-10px relative">
      <h2>{{ $t('login.resetTitle') }}</h2>
      <el-tag class="ml-2 absolute-rt pos-top-[6px]">{{ defaultSettings.version }}</el-tag>
    </div>
    <div class="pl-10px">
      <el-tag type="warning">{{ $t('login.resetSubTitle') }}</el-tag>
    </div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="login-form"
      label-width="auto"
    >
      <!-- 新密码 -->
      <el-tooltip
        :visible="isCapslock"
        :content="$t('login.capsLock')"
        placement="right"
      >
        <el-form-item prop="pass">
          <div class="flex-y-center w-full">
            <svg-icon icon-class="lock" class="mx-2" />
            <el-input
              v-model="ruleForm.pass"
              :placeholder="$t('login.passwordNew')"
              type="password"
              name="password"
              @keyup="checkCapslock"
              @keyup.enter="onSubmit(ruleFormRef)"
              size="large"
              class="h-[48px] pr-2"
              show-password
              autocomplete="off"
            />
          </div>
        </el-form-item>
      </el-tooltip>

      <!-- 确认新密码 -->
      <el-tooltip
        :visible="isCapslock"
        :content="$t('login.capsLock')"
        placement="right"
      >
        <el-form-item prop="checkPass">
          <div class="flex-y-center w-full">
            <el-icon class="mx-2"><Refresh /></el-icon>
            <el-input
              v-model="ruleForm.checkPass"
              :placeholder="$t('login.confirmPasswordNew')"
              type="password"
              name="password"
              @keyup="checkCapslock"
              @keyup.enter="onSubmit(ruleFormRef)"
              size="large"
              class="h-[48px] pr-2"
              show-password
            />
          </div>
        </el-form-item>
      </el-tooltip>

      <!-- 按钮 -->
      <el-button
        :loading="loading"
        type="primary"
        size="large"
        class="w-full"
        @click="onSubmit(ruleFormRef)"
      >
        {{ $t("common_button_confirm") }}
      </el-button>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import defaultSettings from "@/settings";
import type { FormInstance, FormRules } from 'element-plus'
import { onSetRiskPwd } from '@/utils/passSDK';
import type { setPwdType, failCallBackParams } from '@/utils/passSDK';

defineOptions({
  name: "ResetRiskPwd",
});

const isResetRiskPwd = defineModel<Boolean>('isResetRiskPwd');
const temporaryToken = defineModel<string>('temporaryToken');

// Internationalization
const { t } = useI18n();

// Reactive states
const loading = ref(false); // 按钮loading
const isCapslock = ref(false); // 是否大写锁定
const ruleFormRef = ref<FormInstance>(); // 登录表单ref

const ruleForm = reactive({
  pass: '',
  checkPass: '',
})

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(t("login.message.password")))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => {})
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(t("login.message.password")))
  } else if (value !== ruleForm.pass) {
    callback(new Error(t("login.message.checkPassWord")))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur', required: true, }],
  checkPass: [{ validator: validatePass2, trigger: 'blur', required: true, }],
})


/**
 * 检查输入大小写
 */
function checkCapslock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapslock.value = event.getModifierState("CapsLock");
  }
}


/**
 * 重设密码失败
 */
function setRiskPwdFailCb(data: failCallBackParams) {
  ElMessage({
    type: 'error',
    message: data.errmsg,
    duration: 3000,
  });
  loading.value = false;
}

/**
 * 临时Token过期的回调，需要提示用户重新操作登录过程
 */
function tokenExpiredCb() {
  ElMessage({
    type: 'error',
    message: t("login.loginAgain"),
    duration: 3000,
    onClose: () => {
      isResetRiskPwd.value = false;
    }
  });
}

/**
 * 重设密码成功
 */
function setRiskPwdSuccessCb() {
  ElMessage({
    type: 'success',
    message: t("login.setPassSuc"),
    duration: 3000,
    onClose: () => {
      isResetRiskPwd.value = false;
    }
  });
}

const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true;
      const params: setPwdType = { 
        pwd: ruleForm.pass, 
        token: temporaryToken.value,
        failCallBack: setRiskPwdFailCb,
        successCallBack: setRiskPwdSuccessCb,
        tokenExpiredCallback: tokenExpiredCb,
      }
      onSetRiskPwd(params);
    }
  })
}
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
