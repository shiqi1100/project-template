<template>
  <div class="main">
    这是详情。。。
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
    <div>
      <welcome-item></welcome-item>
    </div>
    <div>
      <modal></modal>
    </div>

  </div>
</template>

<script lang="ts" setup>
import WelcomeItem from "@/components/WelcomeItem.vue";
import Modal from "@/components/modal.vue";

</script>

<style lang="less" scoped>
.main {
  margin-top: 30px;
}
</style>
