import router from "@/router";
import { useUserStore, usePermissionStore, useSettingsStore } from "@/store";
import NProgress from "@/utils/nprogress";
import { RouteRecordRaw } from "vue-router";

export function setupPermission() {
  // 白名单路由
  const whiteList = ["/login"];
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const hasToken = localStorage.getItem("accessToken");
    if (hasToken) {
      // 如果已登录，跳转首页
      if (to.path === "/login") {
        next({ path: "/" });
        NProgress.done();
      } else {
        const userStore = useUserStore();
        // eslint-disable-next-line prettier/prettier
        const hasInfo = !!userStore.user.userName;
        const permissionStore = usePermissionStore();
        if (hasInfo) {
          // 未匹配到任何路由，跳转404
          if (to.matched.length === 0) {
            from.name ? next({ name: from.name }) : next("/404");
          } else {
            // 匹配到路由，但无该路由权限跳转401
            const hasThisPageAuth = permissionStore.hasPermission(
              userStore.user.functionAuthList,
              to as unknown as RouteRecordRaw
            );
            hasThisPageAuth ? next() : next("/401");
          }
        } else {
          try {
            // TODO: 获取用户权限走接口时，去掉默认值
            const { functionAuthList = [1, 2, 3] } = await userStore.getUserInfo();
            await permissionStore.generateRoutes(functionAuthList);
            next({ ...to, replace: true });
          } catch (error) {
            // 移除 token 并跳转登录页
            await userStore.resetToken();
            next(`/login?redirect=${to.path}`);
            NProgress.done();
          }
        }
      }
    } else {
      // 未登录可以访问白名单页面
      if (whiteList.indexOf(to.path) !== -1) {
        const settingsStore = useSettingsStore();
        settingsStore.changeWatermark(false);
        next();
      } else {
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  });

  router.afterEach(() => {
    NProgress.done();
  });
}
