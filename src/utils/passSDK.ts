import { type Ref } from "vue";
import PASS, { PassSupLang } from "@sftc/passport";
import defaultSettings from "@/settings";

type sucCallBackParams = {
  stoken: string;
  expireTime: string | number;
};

type failCallBackParams = {
  errno: number;
  errmsg: string;
};

type riskPwdCallBackParams = {
  errno: number;
  errmsg: string;
  token: string; // 时效性TOKEN 此TOKEN用于调用设置用户密码方法的输入
};

type loginPwdType = {
  captcha: string; // 图片验证码
  password: string; // 密码
  username: string; // 账户
  failCallBack: (err: failCallBackParams) => void;
  successCallBack: (data: sucCallBackParams) => void;
  refreshCaptchaCB: () => void;
  riskPwdCallBack: (data: riskPwdCallBackParams) => void;
};

type setPwdType = {
  pwd: string; // 新密码
  token: any; // temporaryToken
  failCallBack: (err: failCallBackParams) => void;
  successCallBack: () => void;
  tokenExpiredCallback: () => void;
};

export const passSDK = PASS({
  lang: defaultSettings.language as PassSupLang,
  platform: "GES-EXPRESS|ODk1",
  host: import.meta.env.VITE_API_PASS_URL,
});

console.log("passSDK", PASS, passSDK);

/**
 *
 * 点击更新图片验证码**/
const onRefreshCaptcha = (imageRef: Ref<string>) => {
  const successCallback = (args: { url: string }) => {
    if (args && args.url) {
      imageRef.value = args.url;
    }
  };
  const config = {
    color: "000000",
  };
  passSDK.refreshCaptcha(successCallback, config);
};

/**
 *
 * 点击登录, 账号密码登录**/
const onLoginPwd = (data: loginPwdType) => {
  const {
    username: account,
    password: pwd,
    successCallBack,
    failCallBack,
    refreshCaptchaCB,
    riskPwdCallBack,
    captcha,
  } = data;
  passSDK.loginPwd(
    account,
    pwd,
    captcha,
    successCallBack,
    failCallBack,
    refreshCaptchaCB,
    riskPwdCallBack,
    {
      autoSetStoken: false,
    }
  );
};

/**
 *
 * 设置密码方法(密码存在风险强制修改)**/
const onSetRiskPwd = (data: setPwdType) => {
  const { pwd, token, successCallBack, failCallBack, tokenExpiredCallback } =
    data;
  const config = {
    autoSetStoken: false,
  };
  passSDK.setPwd(
    pwd,
    token,
    successCallBack,
    tokenExpiredCallback,
    failCallBack,
    config
  );
};

export {
  riskPwdCallBackParams,
  sucCallBackParams,
  failCallBackParams,
  loginPwdType,
  setPwdType,
  onSetRiskPwd,
  onRefreshCaptcha,
  onLoginPwd,
};

export default passSDK;
