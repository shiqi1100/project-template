<template>
  <div class="container">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
    <menu-sub :data="menuList"></menu-sub>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import './hooks'
import MenuSub from './MenuSub.vue'
import { handleMenuData } from "@/components/Menu/hooks";
import { onMounted, ref } from "vue";
import type { Ref } from 'vue'
import type { PropsData } from "@/components/Menu/type";
// 定义处理后的菜单数据
const menuList: Ref<PropsData[] | null> = ref(null)

// 获取处理后的菜单数据
onMounted(async () => {
  menuList.value = await handleMenuData()
})


const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.container {
  background: #0056ff;
  height: calc(100vh - 60px);
  padding-top: 60px !important;

  .el-menu {
    background: unset;
    border-right: 0;
  }
}
</style>
