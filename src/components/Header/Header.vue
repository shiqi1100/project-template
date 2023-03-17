<template>
  <div class="container">
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> Title </span>
      </template>
    </el-page-header>
  </div>
</template>
<script lang="ts" setup>
const goBack = () => {
  console.log('go back')
}
</script>
<style scoped>
.container {
  height: 60px;
  display: flex;
  align-items: center;
}
</style>
