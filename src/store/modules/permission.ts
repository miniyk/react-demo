import { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router";
import { store } from "@/store";

// 预留接口获取路由，对component的转换能力
// import { listRoutes } from "@/api/menu";
// const modules = import.meta.glob("../../views/**/**.vue");
// const Layout = () => import("@/layout/index.vue");

/**
 * Use meta.auth to determine if the current user has permission
 *
 * @param auth_list 用户权限集合
 * @param route 路由
 * @returns
 */
const hasPermission = (auth_list: any, route: any) => {
  if (route?.meta?.auth) {
    // 路由配置了权限
    return auth_list.some((auth: any) => (route.meta.auth as any[]).includes(auth));
  }
  return true;
};

/**
 * 递归过滤有权限的异步(动态)路由
 *
 * @param routes 接口返回的异步(动态)路由
 * @param auth_list 用户权限集合
 * @returns 返回用户有权限的异步(动态)路由
 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], auth_list: number[]) => {
  const asyncRoutes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmpRoute = { ...route }; // ES6扩展运算符复制新对象
    if (!route.name) {
      tmpRoute.name = route.path;
    }
    // 判断用户(角色)是否有该路由的访问权限
    if (hasPermission(auth_list, tmpRoute)) {
      // 路由维护在前端，component已写死，后期如果菜单转接口获取，预留component的转换
      // if (tmpRoute.component?.toString() == "Layout") {
      //   tmpRoute.component = Layout;
      // } else {
      //   const component = modules[`../../views/${tmpRoute.component}.vue`];
      //   if (component) {
      //     tmpRoute.component = component;
      //   } else {
      //     tmpRoute.component = modules[`../../views/error-page/404.vue`];
      //   }
      // }

      if (tmpRoute.children) {
        tmpRoute.children = filterAsyncRoutes(tmpRoute.children, auth_list);
      }

      asyncRoutes.push(tmpRoute);
    }
  });

  return asyncRoutes;
};

// setup
export const usePermissionStore = defineStore("permission", () => {
  // state
  const routes = ref<RouteRecordRaw[]>([]);

  // actions
  function setRoutes(newRoutes: RouteRecordRaw[]) {
    routes.value = newRoutes;
  }
  /**
   * 生成动态路由
   *
   * @param auth_list 用户权限集合
   * @returns
   */
  function generateRoutes(auth_list: number[]) {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      // 预留接口获取所有路由
      // listRoutes()
      //   .then(({ data: asyncRoutes }) => {
      //     // 根据角色获取有访问权限的路由
      //     const accessedRoutes = filterAsyncRoutes(asyncRoutes, role);
      //     setRoutes(accessedRoutes);
      //     resolve(accessedRoutes);
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
      // TODO: 拿用户权限过滤菜单
      const accessedRoutes = filterAsyncRoutes(constantRoutes, auth_list);
      setRoutes(accessedRoutes);
      resolve(accessedRoutes);
    });
  }
  return {
    routes,
    setRoutes,
    generateRoutes,
    hasPermission,
  };
});

// 非setup
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
