// translate router.meta.title, be used in breadcrumb sidebar tags view
import i18n from "@/lang/index";

export function translateRouteTitle(title: string): string {
  // 判断是否存在国际化配置，如果没有原生返回
  const hasKey: Boolean = i18n.global.te("layout.route." + title);
  if (hasKey) {
    const translatedTitle = i18n.global.t("layout.route." + title);
    return translatedTitle;
  }
  return title;
}
