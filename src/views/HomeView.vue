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
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/stores/login";
import { computed, provide, reactive } from "vue";
import { inputStore } from "@/stores/input";

const { state: loginState } = storeToRefs(useLoginStore());

const state = reactive({
  num: 0,
  data: '数据'
})

function changeState(val: number) {
  state.num = val
}

const changeData = computed(() => {
  if (state.num >= 5) {
    return '改变数据'
  }
  return '还没到5不能改变数据'
})

// 提供一个方法接受孙的值
provide('changeState', changeState)

</script>
