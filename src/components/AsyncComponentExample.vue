<!-- AsyncComponentExample.vue - 异步组件使用示例 -->
<template>
  <div class="example-container">
    <h2>异步组件加载示例</h2>
    
    <!-- 使用异步高阶组件加载大型业务组件 -->
    <AsyncHOC 
      :loader="loadHeavyBusinessComponent"
      :loading-component="CustomLoading"
      :error-component="CustomError"
      :timeout="8000"
      :max-retries="3"
      :delay="300"
      @custom-event="handleCustomEvent"
      :component-prop="exampleProp"
    />
  </div>
</template>

<script setup lang="ts">
import AsyncHOC from './AsyncComponent.vue'
import type { Component } from 'vue'

// 自定义加载组件
const CustomLoading: Component = {
  template: `
    <div class="custom-loading">
      <div class="loading-spinner"></div>
      <p>正在加载业务组件，请稍候...</p>
    </div>
  `
}

// 自定义错误组件
const CustomError: Component = {
  template: `
    <div class="custom-error">
      <p>😢 抱歉，组件加载失败</p>
      <p>{{ error.message }}</p>
      <button @click="retry">再试一次</button>
    </div>
  `,
  props: ['error', 'retry']
}

// 要传递给异步组件的属性
const exampleProp = '这是传递给异步组件的属性'

// 处理异步组件触发的事件
const handleCustomEvent = (data: any) => {
  console.log('收到异步组件的事件:', data)
}

// 定义异步加载的组件 - 实际项目中替换为真实的业务组件路径
const loadHeavyBusinessComponent = () => import('./modal.vue')
</script>

<style scoped>
.example-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

h2 {
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
}

/* 自定义加载样式 */
.custom-loading {
  text-align: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #e0e0e0;
  border-top: 5px solid #42b983;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
  margin: 0 auto 1rem;
}

/* 自定义错误样式 */
.custom-error {
  text-align: center;
  padding: 3rem;
  background-color: #fff5f5;
  border: 1px solid #ffe3e3;
  border-radius: 8px;
  color: #c0392b;
}

.custom-error button {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.custom-error button:hover {
  background-color: #359e75;
}
</style>
