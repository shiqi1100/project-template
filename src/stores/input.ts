import { ref } from "vue";
import { defineStore } from 'pinia'

export const inputStore = defineStore('inputStore', () => {
  const inputVal = ref('')


  return { inputVal }
},{
  persist: true,
})
