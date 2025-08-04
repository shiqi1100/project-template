import { defineAsyncComponent, h } from 'vue'
import type { Component } from 'vue'

interface AsyncComponentOptions {
  /** 异步加载组件的函数，通常使用 () => import('组件路径') */
  loader: () => Promise<Component>
  
  /** 加载状态展示组件 */
  loadingComponent?: Component
  
  /** 加载失败展示组件 */
  errorComponent?: Component
  
  /** 加载超时时间(毫秒) */
  timeout?: number
  
  /** 最大重试次数 */
  maxRetries?: number
  
  /** 延迟显示加载状态的时间(毫秒)，避免闪烁 */
  delay?: number
}

/**
 * 创建异步组件的函数式封装
 * @param options 异步组件配置选项
 * @returns Vue异步组件
 */
export const createAsyncComponent = (options: AsyncComponentOptions) => {
  const {
    loader,
    loadingComponent = DefaultLoadingComponent,
    errorComponent = DefaultErrorComponent,
    timeout = 8000,
    maxRetries = 2,
    delay = 200
  } = options

  // 创建带重试和超时功能的加载函数
  const createLoaderWithRetry = (): Promise<Component> => {
    // 重试次数
    let retryCount = 0
    
    return new Promise((resolve, reject) => {
      // 超时处理
      const timeoutId = setTimeout(() => {
        reject(new Error(`组件加载超时(${timeout}ms)`))
      }, timeout)

      // 加载组件的函数
      const loadComponent = () => {
        loader()
          .then((component: Component) => {
            clearTimeout(timeoutId)
            resolve(component)
          })
          .catch(error => {
            clearTimeout(timeoutId)
            
            // 如果还有重试次数，进行重试
            if (retryCount < maxRetries) {
              retryCount++
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
  return defineAsyncComponent({
    loader: createLoaderWithRetry,
    loadingComponent,
    errorComponent,
    delay,
    timeout
  })
}

// 默认的加载组件
const DefaultLoadingComponent = {
  setup() {
    return () => h('div', { class: 'async-loading' }, [
      h('div', { class: 'spinner' }),
      h('p', '加载中...')
    ])
  }
}

// 默认的错误组件
const DefaultErrorComponent = {
  setup() {
    return () => h('div', { class: 'async-error' }, [
      h('p', '组件加载失败'),
      h('button', {
        style: { marginTop: '10px', padding: '5px 10px', cursor: 'pointer' },
        onClick: () => window.location.reload()
      }, '重新加载')
    ])
  }
}