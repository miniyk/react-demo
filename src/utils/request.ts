import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStoreHook } from "@/store/modules/user";
import router, { resetRouter } from "@/router";
import defaultSettings from "@/settings";

// 创建 axios 实例
const service = axios.create({
  baseURL: 'ges-manage/web',
  timeout: 50000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    ENV_LANG: defaultSettings.language,
    'time-zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    const { errmsg: errMsg, errno } = response.data;
    // 预留axios实例配置项在此处的逻辑
    const config = response.config;
    if (errno === 0) {
      return response.data;
    }
    const module: any = await import("@/lang/index");
    const { t: i18nTranslation } = module.default.global;
    if (errno === 120004) {
      ElMessageBox.confirm(
        i18nTranslation("layout.logout.invalidation_message"),
        i18nTranslation("layout.logout.title"),
        {
          confirmButtonText: i18nTranslation("common_button.confirm"),
          cancelButtonText: i18nTranslation("common_button.cancel"),
          type: "warning",
        }
      ).then(() => {
        const userStore = useUserStoreHook();
        userStore.resetToken().then(() => {
          resetRouter(router.currentRoute.value.fullPath);
          // location.reload();
        });
      });
    }
    // 响应数据为二进制流处理(Excel导出)
    if (response.data instanceof ArrayBuffer) {
      return response;
    }
    ElMessage.error(errMsg || i18nTranslation("common_request_error_system"));
    return Promise.reject(new Error(errMsg || "Error"));
  },
  async (error: any) => {
    const module: any = await import("@/lang/index");
    const { t: i18nTranslation } = module.default.global;
    // 区分系统错误和网络错误
    if (error.response) {
      ElMessage.error(i18nTranslation("common_request_error_system"));
    } else if (error.request) {
      ElMessage.error(i18nTranslation("common_request_error_network"));
    }
    return Promise.reject(error.message);
  }
);

// 导出 axios 实例
export default service;
