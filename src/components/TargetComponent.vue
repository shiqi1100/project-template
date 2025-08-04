<template>
    <div class="target-component">
      <h3>目标组件加载成功！</h3>
      <p>接收到的属性: {{ testProp }}</p>
      <button @click="sendEvent">触发事件</button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
// 定义接收的属性
defineProps({
  testProp: {
    type: String,
    required: true
  }
})
// 定义触发的事件
const emit = defineEmits(['test-event'])
// 发送事件
const sendEvent = () => {
  emit('test-event', { 
    message: '来自目标组件的消息',
    timestamp: new Date().toISOString()
  })
}
</script>