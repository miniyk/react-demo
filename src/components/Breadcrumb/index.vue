<template>
  <el-breadcrumb class="flex-y-center" id="breadcrumb">
    <transition-group
      enter-active-class="animate__animated animate__fadeInRight"
    >
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span
          v-if="
            item.redirect === 'noredirect' || index === breadcrumbs.length - 1
          "
          class="color-gray-400"
        >
          {{ translateRouteTitle(item.meta.title) }}
        </span>
        <span v-else>
          {{ translateRouteTitle(item.meta.title) }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
defineOptions({
  name: "Breadcrumb",
});
import { translateRouteTitle } from "@/utils/i18n";

const currentRoute = useRoute();
const breadcrumbs = ref<any>([]);

function getBreadcrumb() {
  const matched = currentRoute.matched.filter(
    (item) => item.meta && item.meta.title
  );
  breadcrumbs.value = matched.filter((item) => {
    return item.meta && item.meta.title && item.meta.breadcrumb !== false;
  });
}

watch(
  () => currentRoute.path,
  (path) => {
    if (path.startsWith("/redirect/")) {
      return;
    }
    getBreadcrumb();
  }
);

onBeforeMount(() => {
  getBreadcrumb();
});
</script>

<style lang="scss" scoped>
// 覆盖 element-plus 的样式
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}
</style>
