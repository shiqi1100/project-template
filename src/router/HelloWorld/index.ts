export const helloWorldChildren = [
  {
    path: '/hello-world',
    name: 'hello-world',
    meta: {
      title: '你好世界'
    },
    component: () => import('@/components/HelloWorld.vue')
  },
  {
    path: '/a',
    name: 'a',
    meta: {
      title: '欢迎光临'
    },
    component: () => import('@/components/TheWelcome.vue')
  }
]
