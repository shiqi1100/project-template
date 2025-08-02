<!-- AsyncHOC.vue - 异步加载高阶组件封装 -->
<template>
  <component 
    :is="resolvedComponent" 
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, h } from 'vue'
import type { Component } from 'vue'

// 定义组件接收的属性
const props = defineProps({
  /** 异步加载组件的函数，通常使用 () => import('组件路径') */
  loader: {
    type: Function as import('vue').PropType<() => Promise<Component>>,
    required: true
  },
  
  /** 加载状态展示组件 */
  loadingComponent: {
    type: Object as () => Component,
      default: () => ({
      setup() {
        return () => h('div', { class: 'test-loading' }, [
          h('p', '加载中...')
        ])
      }
    })
  },
  
  /** 加载失败展示组件 */
  errorComponent: {
    type: Object as () => Component,
      default: () => ({
      setup() {
        return () => h('div', { class: 'test-loading' }, [
          h('p', '组件加载失败')
        ])
      }
    })
  },
  
  /** 加载超时时间(毫秒) */
  timeout: {
    type: Number,
    default: 10000
  },
  
  /** 最大重试次数 */
  maxRetries: {
    type: Number,
    default: 2
  },
  
  /** 延迟显示加载状态的时间(毫秒)，避免闪烁 */
  delay: {
    type: Number,
    default: 200
  }
})

// 当前重试次数
const retryCount = ref(0)

// 创建带重试和超时功能的加载函数
const createLoaderWithRetry = (): Promise<Component> => {
  return new Promise((resolve, reject) => {
    // 超时处理
    const timeoutId = setTimeout(() => {
      reject(new Error(`组件加载超时(${props.timeout}ms)`))
    }, props.timeout)

    // 加载组件的函数
    const loadComponent = () => {
      props.loader()
        .then(async (component: Component) => {
          console.log('组件加载成功:', component);
          clearTimeout(timeoutId)
          resolve(component)
        })
        .catch(error => {
          clearTimeout(timeoutId)
          
          // 如果还有重试次数，进行重试
          if (retryCount.value < props.maxRetries) {
            retryCount.value++
            loadComponent()
          } else {
            reject(error)
          }
        })
    }
    // 开始加载
    loadComponent()
  })
}

// 定义异步组件
const resolvedComponent = defineAsyncComponent({
  loader: createLoaderWithRetry,
  loadingComponent: props.loadingComponent,
  errorComponent: props.errorComponent,
  delay: props.delay,
  timeout: props.timeout
})
</script>

<style scoped>
/* 默认加载状态样式 */
.async-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #666;
}

/* 加载动画 */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 默认错误状态样式 */
.async-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #e74c3c;
}

.async-error button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.async-error button:hover {
  background-color: #2980b9;
}
</style>
