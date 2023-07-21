<template>
  <div class='main' v-if='visible'>
    <div class='content'>
      <div class='title'>提醒</div>
      <div class='btn'>
        <el-button type='primary' style='margin-right: 20px' @click='confirm'>确认</el-button>
        <el-button @click='cancel'>取消</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>

import { ref, watch } from 'vue'

const props = defineProps<{
  showModal: boolean,
  remove: Function,
  ok: Function
}>()

const visible = ref(false)

const type = ref('')

watch(() => props.showModal, (val) => {
  visible.value = val
}, {
  immediate: true
})

const confirm = () => {
  visible.value = false
  type.value = '1'
  props.ok('ok')
  props.remove()
}
const cancel = () => {
  visible.value = false
  type.value = '2'
  props.remove()
}

defineExpose({
  type
})

</script>

<style scoped lang='less'>
.main {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,15%);
  display: flex;
  align-items: center;
  justify-content: end;
  z-index: 999;
  .content {
    width: 500px;
    height: 300px;
    background: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .title {
      font-size: 36px;
      color: black;

    }

    .btn {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
