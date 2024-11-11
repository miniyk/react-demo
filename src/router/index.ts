import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const Layout = () => import("@/layout/index.vue");
const Demo = () => import("@/views/system/demo/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/dashboard", // 根目录默认到dashboard
    meta: {
      title: "仪表台",
      icon: "el-icon-house",
      hidden: false,
      alwaysShow: true,
    },
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard", // 用于 keep-alive, 必须与SFC自动推导或者显示声明的组件name一致
        // https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
        meta: {
          title: "看板",
          icon: "homepage",
          affix: false, // 页签固定
          keepAlive: true, // 启用keepAlivtrue    
        },
      },
      {
        path: "401",
        component: () => import("@/views/error-page/401.vue"),
        meta: { hidden: true }, // 默认不展示此菜单
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404.vue"),
        meta: { hidden: true },
      },
    ],
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/demo1",
    name: "/system",
    meta: {
      title: "人员管理",
      icon: "system",
      hidden: false,
      alwaysShow: true,
      roles: ["ADMIN"], // 预留字段
    },
    children: [      
      {
        path: "demo1",
        component: Demo,
        name: "driver",
        meta: {
          title: "司机管理",
          icon: "role",
          hidden: false,
          roles: ["ADMIN", "ADMIN6", "GUEST"], // 预留字段
          keepAlive: true,
        },
      },
    ],
  },
  // {
  //   path: "/external",
  //   component: Layout,
  //   meta: {
  //     title: "external",
  //     icon: "system",
  //   },
  //   children: [
  //     {
  //       path: "https://www.sina.com.cn/",
  //       meta: { title: "externalLink", icon: "link" },
  //       component: Layout,
  //     }
  //   ]
  // }
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter(path: string) {
  router.replace({ path: `/login?redirect=${path}` });
}

export default router;
