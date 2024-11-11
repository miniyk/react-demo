import { store } from "@/store";
import defaultSettings from "@/settings";
// 导入 Element Plus 中英文语言包
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { LanguageEnum } from "@/enums/common/LanguageEnum";
import { SidebarStatusEnum } from "@/enums/common/SidebarStatusEnum";

// setup
export const useAppStore = defineStore("app", () => {
  // state
  const language = useStorage("language", defaultSettings.language);
  const sidebarStatus = useStorage("sidebarStatus", SidebarStatusEnum.CLOSED);

  const sidebar = reactive({
    opened: sidebarStatus.value === SidebarStatusEnum.OPENED,
    withoutAnimation: false,
  });
  /**
   * 根据语言标识读取对应的语言包
   */
  const locale = computed(() => {
    if (language?.value === LanguageEnum.EN) {
      return en;
    } else if (language?.value === LanguageEnum.zh_Hans) {
      return zhCn;
    } else {
      return en;
    }
  });

  // actions
  function toggleSidebar() {
    sidebar.opened = !sidebar.opened;
    sidebarStatus.value = sidebar.opened
      ? SidebarStatusEnum.OPENED
      : SidebarStatusEnum.CLOSED;
  }

  function closeSideBar() {
    sidebar.opened = false;
    sidebarStatus.value = SidebarStatusEnum.CLOSED;
  }

  function openSideBar() {
    sidebar.opened = true;
    sidebarStatus.value = SidebarStatusEnum.OPENED;
  }

  /**
   * 切换语言
   *
   * @param val
   */
  function changeLanguage(val: string) {
    language.value = val;
    // 切换语言后重刷页面
    location.reload();
  }
  return {
    sidebar,
    language,
    locale,
    changeLanguage,
    toggleSidebar,
    closeSideBar,
    openSideBar,
  };
});

// 手动提供给 useStore() 函数 pinia 实例
// https://pinia.vuejs.org/zh/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
export function useAppStoreHook() {
  return useAppStore(store);
}
