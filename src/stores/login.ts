import { ref, computed, reactive } from "vue";
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('counter', () => {
  const count = ref(1)
  const state = reactive({
    token: '',
    companyId: null,
    authList: [],
    userInfo: {}
  })
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, state, increment }
},{
  persist: true,
})
