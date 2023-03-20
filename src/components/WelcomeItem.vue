<template>
  <div>
    <el-input-number v-model="num" :min="1" :max="10" />
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, watch } from "vue";

const num = ref(1)

// 依赖注入
// const injectNum = inject('changeState') as any

function getNum(val: number) {
  // injectNum(val)
}

// 监听孙的值传给爷爷
watch(num, (val) => {
  getNum(val)
}, {immediate: true})

</script>

<style lang="less" scoped>
.main {
  margin-top: 30px;
}
</style>
