<template>
  <main>
    <TheWelcome :data="changeData"></TheWelcome>
    <br>
    num: {{ state.num }}
    <div>
      input: {{ inputStore().inputVal }}
    </div>
  </main>
</template>

<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import { computed, inject, provide, reactive } from "vue";
import { inputStore } from "@/stores/input";
const mainData = inject('mainData', 0)
const state = reactive({
  num: 4,
  data: '数据'
})

function changeState() {
  state.num = mainData
}

const changeData = computed(() => {
  if (state.num >= mainData) {
    return '改变数据'
  }
  return '还没到5不能改变数据'
})

// 提供一个方法接受孙的值
// provide('changeState', changeState)

</script>
