<script setup lang="ts">
import { Search, RefreshRight } from '@element-plus/icons-vue'
defineOptions({
  name: "ToolbarContainer",
});
const emit = defineEmits<{
  (e: 'search'): void
  (e: 'reset'): void
}>()

const show = ref<boolean>(true);

const onCollapse = () => {
  show.value = !show.value;
}
const search = () => {
  emit('search');
}
const reset = () => {
  emit('reset');
}
</script>

<template>
  <div class="mb-[10px] bg-white">
    <div class="flex flex-justify-between py-[12px] px-[16px]">
      <div>
        <slot name="buttonGroup">
        </slot>
      </div>
      <div>
        <span
          class="text-size-[10px] color-[#333] cursor-pointer mr-[16px]"
          @click="onCollapse"
        >
          {{ show ? "收起" : "展开" }}
          <img
            class="ml-[4px] position-relative top-[-1px]"
            :src="
              show
                ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAYAAACXU8ZrAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAABhSURBVAiZXczBDYAgEETRdewCmuCyhVARNdiBHXC0BrMJoQpiFRMvkqzMcfLyd3FT1RRCuGKM9xjjmT88IFlJHiSrqqYfmgBAbq2dALKHmwdm1tcygAySZQUiImbWv2J5AeYKOofLKoTHAAAAAElFTkSuQmCC'
                : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAYAAACXU8ZrAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAABxSURBVAiZXc2xCcQwEETR0aqKhS3CILaQK+FKcRUOXYJqUKzE6TUwKL0GVo4MRj9+8HMppZrZj+TAkrtvqnqIiOwRUd19W0FEVBHZM8lhZi0iqpk1kuMFPr33KwPAG6rqH8DxAABI62LOeaaUvg8AgBt1BDyFYC571wAAAABJRU5ErkJggg=='
            "
          />
        </span>
        <el-button
          size="small"
          type="primary"
          :icon="Search"
          @click="search"
          >查询</el-button
        >
        <el-button
          size="small"
          :icon="RefreshRight"
          @click="reset"
          >重置</el-button
        >
      </div>
    </div>
    <el-collapse-transition>
      <div v-show="show">
        <div class="pt-[16px] px-[16px] b-t-[1px] b-solid b-[#e4e7ed] filter-box">
          <slot name="filterArea"></slot>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<style lang="scss" scoped>
  :deep(button){
    width: 70px;
    height: 28px
  }
  .filter-box :deep(.el-form-item) {
    margin-bottom: 11px;
  }

  .filter-box :deep(.el-form-item__label) {
    font-size: 12px !important;
    margin-bottom: 3px !important;
    color: rgba(0, 0, 0, 0.9);
  }

  /* Media query for screens smaller than 1600px */
  @media (max-width: 1600px) {
    .filter-box :deep(.el-input) {
      width: 250px;
      height: 28px;
    }
    .filter-box :deep(.el-date-editor) {
      width: 250px;
      height: 28px;
    }

    .filter-box :deep(.el-select) {
      width: 250px;
      .el-select__wrapper {
        min-height: 28px;
      }
    }
  }

  /* Media query for screens 1600px and larger */
  @media (min-width: 1600px) {
    .filter-box :deep(.el-input) {
      width: 290px;
      height: 28px;
    }
    .filter-box :deep(.el-date-editor) {
      width: 290px;
      height: 28px;
    }

    .filter-box :deep(.el-select) {
      width: 290px;
      .el-select__wrapper {
        min-height: 28px;
      }
    }
  }
</style>
