<template>
  <div id="app">
    <RouterView/>
  </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
</script>
<style lang="less">
html,body {
  height: 100%;
}
#app {
  height: 100%;
}
.container {
  height: 100%;
  overflow-y: auto;
}
</style>
