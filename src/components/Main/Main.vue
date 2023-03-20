<template>
<div class="container">
  <slot></slot>
</div>
</template>
<script lang="ts" setup>

</script>
<script>
export default {
  name: 'Main'
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  background: #f2f5fa;
}
</style>
