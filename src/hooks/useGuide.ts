import i18n from "@/lang/index";
import "driver.js/dist/driver.css";
import { driver } from "driver.js";
import { useSettingsStore } from "@/store";

type GuideStep = {
  element: string | HTMLElement;
  popover: {
    title: string;
    description: string;
    position: string;
  };
};

const GUIDE_STEPS = [
  {
    popover: {
      title: i18n.global.t("guide_welcome.title"),
      description: i18n.global.t("guide_welcome.intro"),
    },
  },
  {
    element: "#hamburger-container",
    popover: {
      title: i18n.global.t("guide_one.title"),
      description: i18n.global.t("guide_one.intro"),
    },
  },
  {
    element: "#breadcrumb",
    popover: {
      title: i18n.global.t("guide_two.title"),
      description: i18n.global.t("guide_two.intro"),
    },
  },
  {
    element: "#screenFull",
    popover: {
      title: i18n.global.t("guide_three.title"),
      description: i18n.global.t("guide_three.intro"),
    },
  },
  {
    element: "#translation",
    popover: {
      title: i18n.global.t("guide_four.title"),
      description: i18n.global.t("guide_four.intro"),
    },
  },
  {
    element: "#userInfo",
    popover: {
      title: i18n.global.t("guide_five.title"),
      description: i18n.global.t("guide_five.intro"),
    },
  },
  {
    element: "#setting",
    popover: {
      title: i18n.global.t("guide_six.title"),
      description: i18n.global.t("guide_six.intro"),
    },
  },
  {
    element: "#tags-container",
    popover: {
      title: i18n.global.t("guide_seven.title"),
      description: i18n.global.t("guide_seven.intro"),
    },
  },
  {
    popover: {
      title: i18n.global.t("guide_eight.title"),
      description: i18n.global.t("guide_eight.intro"),
    },
  },
] as Partial<GuideStep>[];

export function useGuide(AutoShow?: boolean) {
  const settingsStore = useSettingsStore();

  const onShowGuide = () => {
    driver({
      showProgress: true,
      steps: GUIDE_STEPS,
      doneBtnText: i18n.global.t("guide_done"),
      nextBtnText: i18n.global.t("guide_next"),
      prevBtnText: i18n.global.t("guide_previous"),
    }).drive();
  };

  onMounted(() => {
    if (AutoShow) {
      if (!settingsStore.hasShowedGuide) {
        onShowGuide(); // auto show guide
        settingsStore.onSetHasShowedGuide(true);
      }
    }
  });

  return onShowGuide;
}
