import { ThemeEnum } from "./enums/common/ThemeEnum";
import { LanguageEnum } from "./enums/common/LanguageEnum";

const { pkg } = __APP_INFO__;

const defaultSettings: AppSettings = {
  title: pkg.name, // 后台名
  version: pkg.version, // 版本
  showSettings: true, // 展示后台设置入口
  tagsView: true,
  fixedHeader: true,
  sidebarLogo: true,
  theme: ThemeEnum.LIGHT, // dark/light
  language: localStorage.getItem("language") || LanguageEnum.EN, // 语言环境默认值
  themeColor: "#409EFF", // 主题色默认值
  watermarkEnabled: true, // 水印开关
  watermarkContent: pkg.name, // 水印内容
};

export default defaultSettings;
