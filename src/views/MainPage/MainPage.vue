<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside">
        <Menu></Menu>
      </el-aside>
      <el-container class="main">
        <el-header>
          <Header></Header>
        </el-header>
        <el-main style="padding: 0">
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script lang="ts" setup>
import Menu from '@/components/Menu/Menu.vue'
import Header from "@/components/Header/Header.vue";
import Main from "@/components/Main/Main.vue";
</script>

<style scoped lang="less">
.common-layout {
  width: 100%;
  height: 100%;
  .aside {
    width: 200px;
    box-sizing: border-box;

  }

  .main {
    width: 100%;

  }
}
</style>
