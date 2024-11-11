import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { UserInfo } from "./types";

/**
 *  服务端set Stoken
 *
 * @param data {LoginData}
 * @returns
 */
export function setTokenApi(params:{STOKEN: string}) {
  return request.get('/authentication/setStoken', {
    params,
  })
}

/**
 * 注销API
 */
export function logoutApi() {
  return request.get('/authentication/logout')
}

/**
 * 后台账号基本信息
 */
export function getUserInfoApi(): AxiosPromise<UserInfo> {
  return request.get('/authentication/getUserInfo')
}

// Vue.axios.post(`xxxx`, params).then((res) => res.data);