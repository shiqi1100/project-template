export const helloWorldChildren = [
  {
    path: '/hello-world',
    name: 'hello-world',
    component: () => import('@/components/HelloWorld.vue')
  },
  {
    path: '/a',
    name: 'a',
    component: () => import('@/components/TheWelcome.vue')
  }
]
