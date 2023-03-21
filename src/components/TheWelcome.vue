<template>
  <div class="container">
    <h1>详情页：</h1>
    <div>
      <hello-world>
        <template #header>
          <el-affix :offset="120">
            <el-button type="primary">Offset top 120px</el-button>
          </el-affix>
        </template>
        <template #footer>
          <el-button>购买</el-button>
        </template>
        <template #default>
          <div>
            插槽内容。。。。
          </div>
        </template>
      </hello-world>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HelloWorld from "@/components/HelloWorld.vue";
// const props = withDefaults(defineProps<{
//   data: string | null
// }>(), {
//   data: '还没收到'
// })
</script>

<style lang="less" scoped>
.container {
  border: 1px solid gray;
  margin: auto;
}
</style>
