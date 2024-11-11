<script setup lang="ts">
defineOptions({
  name: "Page401",
});
const { t } = useI18n();
</script>

<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="24">
        <h1 class="text-jumbo text-ginormous">{{t("errorPage_common_title")}}</h1>
        <h2>{{t("errorPage_401_cxt")}}</h2>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .pan-back-btn {
    text-align: center;
    color: #fff;
    background: #008489;
    border: none !important;
  }

  .pan-gif {
    display: block;
    margin: 0 auto;
  }

  .pan-img {
    display: block;
    width: 100%;
    margin: 0 auto;
  }

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
