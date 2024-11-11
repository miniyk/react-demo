<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
defineOptions({
  name: "Demo",
});

interface Params {
  name: string
  date: string
  dates: any
}

const params:Params = reactive({
  name: "",
  date: '',
  dates: [],
})

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
    phone: 12345,
    lc: '北京测试配送中心'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
    phone: 12345,
    lc: '北京测试配送中心'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
    phone: 12345,
    lc: '北京测试配送中心'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
    phone: 12345,
    lc: '北京测试配送中心'
  },
]

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
]

const onAdd = () => {
  console.log('onAdd');
}
const onSearch = () => {
  console.log('onSearch');
}
const onReset = () => {
  console.log('onReset');
}
</script>

<template>
  <div>
    <ToolbarContainer @search="onSearch" @reset="onReset">
      <template #buttonGroup>
        <el-button
          :icon="Plus"
          @click="onAdd" 
          type="primary"
          size="small"
          plain
        >
          新增
        </el-button>
      </template>
      <template #filterArea>
        <el-form 
          ref="formRef" :model="params" :inline="true"
          label-position="top"
        >
        <el-form-item prop="keywords" label="Process End Time">
          <el-input
            v-model="params.name"
            placeholder="角色名称"
            clearable
            @keyup.enter="onSearch"
          />
        </el-form-item>
        <el-form-item prop="keywords" label="label超长label超长label超长label超长超长">
          <el-input
            v-model="params.name"
            placeholder="角色名称"
            clearable
            @keyup.enter="onSearch"
          />
        </el-form-item>
        <el-form-item prop="keywords" label="关键字">
          <el-input
            v-model="params.name"
            placeholder="角色名称"
            clearable
            @keyup.enter="onSearch"
          />
        </el-form-item>
        <el-form-item prop="keywords" label="关键字">
          <el-input
            v-model="params.name"
            placeholder="角色名称"
            clearable
            @keyup.enter="onSearch"
          />
        </el-form-item>

        <el-form-item prop="keywords" label="关键字">
          <el-input
            v-model="params.name"
            placeholder="角色名称"
            clearable
            @keyup.enter="onSearch"
          />
        </el-form-item>
        <el-form-item prop="keywords" label="关键字">
          <el-input
            v-model="params.name"
            placeholder="角色名称"
            clearable
            @keyup.enter="onSearch"
          />
        </el-form-item>
        <el-form-item prop="keywords" label="关键字">
          <el-select
            v-model="params.name"
            placeholder="Select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="keywords" label="关键字">
          <el-date-picker
            v-model="params.dates"
            type="datetimerange"
            range-separator=""
            start-placeholder="Start date"
            end-placeholder="End date"
          />
        </el-form-item>
        <el-form-item prop="keywords" label="关键字">
          <el-date-picker
            v-model="params.date"
            type="date"
            placeholder="Pick a day"
          />
        </el-form-item>
        <el-form-item prop="keywords" label="关键字">
          <el-date-picker
            v-model="params.date"
            type="date"
            placeholder="Pick a day"
          />
        </el-form-item>
        <el-form-item prop="keywords" label="关键字关键字">
          <el-date-picker
            v-model="params.date"
            type="date"
            placeholder="Pick a day"
          />
        </el-form-item>
      </el-form>
      </template>
    </ToolbarContainer>

    <TableContainer 
      showUpload
      showDownload
      showActionArea
      :downLoadTemplate="() => {}"
      :importData="() => {}"
      :exportData="() => {}"
    >
      <template #toolBar>
        <el-button text type="primary" class="text-size-[12px]">
          下载全部内容
        </el-button>
      </template>
      <template #table>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="Date" width="200"/>
          <el-table-column prop="name" label="Name"  width="200"/>
          <el-table-column prop="state" label="State"  width="200"/>
          <el-table-column prop="city" label="City"  width="200"/>
          <el-table-column prop="address" label="Address"  width="200"/>
          <el-table-column prop="zip" label="Zip"  width="200"/>
          <el-table-column prop="phone" label="phone"  width="200"/>
          <el-table-column prop="lc" label="lc center"  width="200"/>
          <el-table-column fixed="right" label="Operations" width="150">
            <template #default>
              <el-button link type="primary" size="small">
                Detail
              </el-button>
              <el-button link type="primary" size="small">
                Edit
              </el-button>
              <el-button link type="primary" size="small">
                detail
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template #pagination>
        <el-pagination layout="prev, pager, next" :total="1000" />
      </template>
    </TableContainer>
  </div>
</template>

<style lang="scss" scoped></style>
