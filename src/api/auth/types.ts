/**
 * 后台账号基本信息响应
 */
export interface UserInfo {
  /**
   *  权限城市
   */
  cityAuthList?: any;
  /**
   *  权限
   */
  functionAuthList?: number[];
  /**
   * 超管
   */
  isSupper?: Boolean;
  /**
   * 用户id
   */
  passUid?: number;
  /**
   * 姓名
   */
  userName?: string;
  /**
   * 电话
   */
  userPhone?: string;
  /**
   * 姓名+电话
   */
  operator?: string;
}
