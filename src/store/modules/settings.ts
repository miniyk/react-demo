import defaultSettings from "@/settings";
import { genMixColor } from "@/utils/color";
import { setStyleProperty } from "@/utils";
import { ThemeEnum } from "@/enums/common/ThemeEnum";

type SettingsValue = boolean | string;

export const useSettingsStore = defineStore("setting", () => {
  // 是否显示设置
  const settingsVisible = ref(false);

  // 是否显示标签视图
  const tagsView = useStorage<boolean>("tagsView", defaultSettings.tagsView);

  // 是否显示侧边栏logo
  const sidebarLogo = useStorage<boolean>(
    "sidebarLogo",
    defaultSettings.sidebarLogo
  );

  // 是否固定头部
  const fixedHeader = useStorage<boolean>(
    "fixedHeader",
    defaultSettings.fixedHeader
  );

  /**
   * 指引显示相关
   */
  const hasShowedGuide = useStorage<boolean>("hasShowedGuide", false); // 是否被动展示过指引
  function onSetHasShowedGuide(val: boolean) { // 点击退出指引
    hasShowedGuide.value = val;
  }

  /**
   * 切换主题颜色相关
   */
  const themeColor = useStorage<string>(
    "themeColor",
    defaultSettings.themeColor
  );
  const theme = useStorage<string>("theme", defaultSettings.theme); // 主题：light-亮色(默认) dark-暗色
  function changeThemeColor(color: string) { //切换主题颜色
    themeColor.value = color;
  }
  function changeTheme(val: string) { // 切换主题
    theme.value = val;
  }
  watch(
    [theme, themeColor],
    ([newTheme, newThemeColor], [oldTheme, oldThemeColor]) => {
      if (newTheme !== oldTheme) {
        if (newTheme === ThemeEnum.DARK) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }

      if (newThemeColor !== oldThemeColor) {
        const { DEFAULT, dark, light } = genMixColor(newThemeColor);
        setStyleProperty(`--el-color-primary`, DEFAULT);
        setStyleProperty(`--el-color-primary-dark-2`, dark[2]);
        setStyleProperty(`--el-color-primary-light-3`, light[3]);
        setStyleProperty(`--el-color-primary-light-5`, light[5]);
        setStyleProperty(`--el-color-primary-light-7`, light[7]);
        setStyleProperty(`--el-color-primary-light-8`, light[8]);
        setStyleProperty(`--el-color-primary-light-9`, light[9]);
      }
    },
    {
      immediate: true, // 立即执行，确保在侦听器创建时执行一次
    }
  );

  /**
   *  显隐水印相关
   */
  const watermarkEnabled = ref<boolean>(true);// 是否开启水印
  function changeWatermark(val: boolean) {
    watermarkEnabled.value = val;
  }

  
  /**
   * state改变组合函数
   */
  const settingsMap: Record<string, Ref<SettingsValue>> = {
    fixedHeader,
    tagsView,
    sidebarLogo,
    watermarkEnabled,
  };
  function changeSetting({
    key,
    value,
  }: {
    key: string;
    value: SettingsValue;
  }) {
    const setting = settingsMap[key];
    if (setting) {
      setting.value = value;
    }
  }

  return {
    settingsVisible,
    hasShowedGuide,
    tagsView,
    fixedHeader,
    sidebarLogo,
    themeColor,
    theme,
    watermarkEnabled,
    changeSetting,
    onSetHasShowedGuide,
    changeTheme,
    changeThemeColor,
    changeWatermark,
  };
});
