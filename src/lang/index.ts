import { createI18n } from "vue-i18n";
import defaultSettings from "@/settings";
// 本地语英文言包
import en from './en.json';
// 本地语中文言包
import zh_cn from './zh_cn.json';

const messages = {
  "zh-Hans": {
    ...JSON.parse(JSON.stringify(zh_cn))
  },
  "en": {
    ...JSON.parse(JSON.stringify(en))
  },
};

const i18n: any = createI18n({
  legacy: false,
  locale: defaultSettings.language,
  messages: messages,
  globalInjection: true,
});

export default i18n;
