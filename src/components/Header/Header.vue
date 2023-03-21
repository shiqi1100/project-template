<template>
  <div class="container">
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> {{ title }} </span>
      </template>
    </el-page-header>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter()
const title = ref('返回')
const goBack = () => {
  router.back()
}
// 路由发生改变修改title
onBeforeRouteUpdate((to) => {
  title.value = to.meta?.title as string
})

</script>
<style scoped>
.container {
  height: 60px;
  display: flex;
  align-items: center;
}
</style>
