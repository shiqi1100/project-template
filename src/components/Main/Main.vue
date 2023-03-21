<template>
<div class="container">
  <slot></slot>
  <br>
  <h1>main组件</h1>
    <div style="width: 100px; margin: auto;border: none;">
      <el-input v-model="num"></el-input>
    </div>

</div>
</template>
<script lang="ts" setup>
import { provide, ref } from "vue";
const num = ref(4)
// 接受子组件传过来的值
function changeInputData(val: number) {
  num.value = val
}
function getNum() {
  return num.value
}
// 接受子组件传过来的值
provide('inputNum', changeInputData)
// 给子组件传值
provide('toTenOpen', getNum)

</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  background: #f2f5fa;
}
</style>
