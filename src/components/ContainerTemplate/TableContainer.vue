<script setup lang="ts">
  defineOptions({
    name: "TableContainer",
  });

  // 定义 Props 类型
  interface MyProps {
    showActionArea?: boolean; // 是否表格操作区域
    showUpload?: boolean; // 是否展示上传按钮
    uploadText?: string; // 上传按钮自定义文案
    downloadText?: string; // 下载按钮自定义文案
    showDownload?: boolean; // 是否展示导出按钮
    downLoadTemplate?: () => void; // 下载模板handler
    importData?: () => void; // 导入数据handler
    exportData?: () => void; // 导入数据handler
  }

  // 使用 withDefaults 定义 props 和默认值
  withDefaults(
    defineProps<MyProps>(), 
    {
      showActionArea: false,
      showUpload: false,
      uploadText: "导入",
      showDownload: false,
      downloadText: '导出',
      downLoadTemplate: () => {},
      importData: () => {},
      exportData: () => {},
    }
  );
</script>

<template>
  <div class="bg-white">
    <div class="table-container-button py-[12px] px-[16px] flex flex-justify-end" v-if="showActionArea">
      <slot name="toolBar"></slot>
      <el-dropdown split-button class="ml-[3px]" v-if="showUpload" size="small">
        {{uploadText}}
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="downLoadTemplate">
              <i-ep-download />下载模板
            </el-dropdown-item>
            <el-dropdown-item @click="importData">
              <i-ep-top />导入数据
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button class="ml-[12px]" v-if="showDownload" @click="exportData" size="small">
        <template #icon><i-ep-download /></template>
        {{downloadText}}
      </el-button>
    </div>
    <div class="pt-[16px] px-[16px] b-t-[1px] b-solid b-[#e4e7ed]">
      <slot name="table"></slot>
    </div>
    <div class="flex flex-justify-end py-[5px]">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .table-container-button :deep(button) {
    height: 28px;
  }
  :deep(.el-table thead) {
    color: rgba(0, 0, 0, 0.9);
    th {
      font-weight: 500;
    }
  }
</style>
