import { reactive } from "vue";
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('main', () => {
  const state = reactive({
    token: '',
    companyId: null,
    authList: [],
    userInfo: {}
  })
  return { state }
},{
  persist: true,
})
