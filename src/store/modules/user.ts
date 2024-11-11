import { getUserInfoApi, logoutApi } from "@/api/auth";
import { UserInfo } from "@/api/auth/types";
import { store } from "@/store";


export const useUserStore = defineStore("user", () => {
  const user = ref<UserInfo>({
    functionAuthList	: [1, 2, 3],
  });

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      getUserInfoApi()
        .then(({ data }) => {
          if (!!data) {
            Object.assign(user.value, { ...data });
            resolve(data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // user logout
  function logout() {
    return new Promise<void>((resolve, reject) => {
      logoutApi()
        .then((res:any) => {
          if(res.errno === 0) {
            localStorage.setItem("accessToken", "");
            // location.reload(); // 清空路由
            resolve();
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // remove token
  function resetToken() {
    return new Promise<void>((resolve) => {
      localStorage.setItem("accessToken", "");
      resolve();
    });
  }

  return {
    user,
    getUserInfo,
    logout,
    resetToken,
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
