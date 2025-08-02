<template>
  <div class="test-page">
    <h1>异步组件手动测试页面</h1>
    
    <div class="test-controls">
      <button @click="setTestCase('success')">测试正常加载</button>
      <button @click="setTestCase('error')">测试加载失败</button>
      <button @click="setTestCase('timeout')">测试加载超时</button>
      <button @click="setTestCase('slow')">测试慢速加载</button>
      
      <div class="settings">
        <label>
          超时时间(ms):
          <input type="number" v-model.number="timeout" min="100" step="100">
        </label>
        
        <label>
          重试次数:
          <input type="number" v-model.number="maxRetries" min="0" max="5">
        </label>
        
        <label>
          延迟显示(ms):
          <input type="number" v-model.number="delay" min="0" step="100">
        </label>
      </div>
      
      <button @click="refreshComponent">重新加载组件</button>
    </div>
    
    <div class="test-result">
      <h2>异步组件测试结果:</h2>
      <AsyncComponent 
        :loader="currentLoader"
        :timeout="timeout"
        :max-retries="maxRetries"
        :delay="delay"
        :test-prop="testMessage"  
        @test-event="handleTestEvent"
        :key="componentKey"
      />
      <h2 style="margin-top: 30px;">函数式异步组件测试结果:</h2>
      <AsyncHOCPage 
        :test-prop="testMessage" 
        @test-event="handleTestEvent"
        :key="componentKey"
       />
    </div>
    
    <div class="event-log">
      <h2>事件日志:</h2>
      <ul>
        <li v-for="(log, index) in eventLogs" :key="index" :class="log.type">
          <span class="time">{{ log.time }}</span>
          <span class="message">{{ log.message }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h, shallowReactive } from 'vue'
import type { Component } from 'vue'
import AsyncComponent from './AsyncComponent.vue'
// 引入异步加载组件的高阶函数
import { createAsyncComponent } from './Hooks/AsyncHOC'
// import TestLoading from './TestLoading.vue'
// import TestError from './TestError.vue'
// 测试配置
const timeout = ref(8000)
const maxRetries = ref(2)
const delay = ref(200)
const testCase = ref('success')
const componentKey = ref(1)
const testMessage = ref('prop-这是测试属性值')
const eventLogs = ref<Array<{time: string, message: string, type: string}>>([])

let AsyncHOCPage = shallowReactive<Component>({})

// 记录日志
const logEvent = (message: string, type: string = 'info') => {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.push({ time, message, type })
  // 只保留最近20条日志
  if (eventLogs.value.length > 20) {
    eventLogs.value.shift()
  }
}

// 处理组件事件
const handleTestEvent = (data: any) => {
  logEvent(`收到组件事件: ${JSON.stringify(data)}`, 'event')
  // 可以在这里处理接收到的事件数据
  confirm('emit事件触发：' + data.message)
}

// 刷新组件（强制重新加载）
const refreshComponent = () => {
  logEvent('开始重新加载组件')
  componentKey.value += 1

  // 通过高阶函数创建异步组件
  AsyncHOCPage = createAsyncComponent({
    loader: currentLoader.value,
    timeout: timeout.value,
    maxRetries: maxRetries.value,
    delay: delay.value
  })
}

// 设置测试用例
const setTestCase = (caseType: string) => {
  testCase.value = caseType
  logEvent(`切换到测试用例: ${caseType}`)
  refreshComponent()
}

// 根据测试用例提供不同的加载器
const currentLoader = computed((): (() => Promise<{ default: Component }>) => {
  switch(testCase.value) {
    case 'success':
      // 正常加载
      return () => import('./TargetComponent.vue')
      
    case 'error':
      // 加载失败
      return () => new Promise<{ default: Component }>((resolve, reject) => {
        logEvent('开始加载组件 (预期失败)')
        setTimeout(() => {
          reject(new Error('模拟加载失败 - 网络错误'))
        }, 1000)
      })
      
    case 'timeout':
      // 超时情况（永远不完成）
      return () => new Promise<{ default: Component }>(() => {
        logEvent('开始加载组件 (预期超时)')
        // 不调用resolve或reject，模拟超时
      })

    case 'slow':
      // 慢速加载但最终成功
      return () => new Promise<{ default: Component }>((resolve) => {
        logEvent('开始加载组件 (慢速加载)')
        setTimeout(() => {
          import('./TargetComponent.vue').then((module) => {
            resolve(module)
          })
        }, 3000) // 3秒延迟
      })
      
    default:
      return () => import('./TargetComponent.vue')
  }
})

// 通过高阶函数创建异步组件
AsyncHOCPage = createAsyncComponent({
  loader: currentLoader.value,
  timeout: timeout.value,
  maxRetries: maxRetries.value,
  delay: delay.value
})
</script>

<style scoped>
.test-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.test-controls {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.test-controls button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.test-controls button:hover {
  background-color: #359e75;
}

.settings {
  margin-left: auto;
  display: flex;
  gap: 15px;
  align-items: center;
}

.settings label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.settings input {
  width: 100px;
  padding: 4px;
}

.test-result {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  min-height: 200px;
}

.event-log {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.event-log ul {
  list-style: none;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
}

.event-log li {
  padding: 8px;
  margin-bottom: 4px;
  border-radius: 4px;
}

.event-log li.info {
  background-color: #e8f4fd;
}

.event-log li.error {
  background-color: #ffebee;
}

.event-log li.event {
  background-color: #e8f5e9;
}

.time {
  color: #666;
  margin-right: 10px;
  font-size: 0.9em;
}

/* 加载组件样式 */
.test-loading {
  text-align: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 错误组件样式 */
.test-error {
  text-align: center;
  padding: 40px;
  background-color: #fff5f5;
  border: 1px solid #ffe3e3;
  border-radius: 8px;
}

.test-error button {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* 目标组件样式 */
.target-component {
  padding: 20px;
  border: 1px solid #dcedc8;
  border-radius: 8px;
  background-color: #f1f8e9;
}
</style>
    